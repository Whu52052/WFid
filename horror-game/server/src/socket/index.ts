import { Server, Socket } from 'socket.io'
import { prisma } from './index'

interface Player {
  id: string
  nickname: string
  roomId: string
  userId: string
}

interface RoomState {
  players: Map<string, Player>
  roomCode: string
}

const rooms = new Map<string, RoomState>()

export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id)

    let currentUserId: string | null = null
    let currentRoomCode: string | null = null

    // Join room
    socket.on('room:join', async (data: { roomCode: string; userId: string; nickname: string }) => {
      try {
        const { roomCode, userId, nickname } = data

        const room = await prisma.gameRoom.findUnique({
          where: { roomCode: roomCode.toUpperCase() },
        })

        if (!room) {
          socket.emit('room:error', { message: '房间不存在' })
          return
        }

        // Join socket room
        socket.join(roomCode)
        currentUserId = userId
        currentRoomCode = roomCode

        // Initialize room state if not exists
        if (!rooms.has(roomCode)) {
          rooms.set(roomCode, {
            players: new Map(),
            roomCode,
          })
        }

        const roomState = rooms.get(roomCode)!
        roomState.players.set(socket.id, {
          id: socket.id,
          nickname,
          roomId: room.id,
          userId,
        })

        // Update player online status
        await prisma.playerProgress.update({
          where: {
            roomId_userId: {
              roomId: room.id,
              userId,
            },
          },
          data: { isOnline: true },
        })

        // Notify all players in room
        const players = Array.from(roomState.players.values())
        io.to(roomCode).emit('room:players', players)

        // Confirm join to the joining player
        socket.emit('room:joined', {
          roomCode,
          players,
        })

        console.log(`User ${nickname} joined room ${roomCode}`)
      } catch (error) {
        console.error('Room join error:', error)
        socket.emit('room:error', { message: '加入房间失败' })
      }
    })

    // Player move to scene
    socket.on('player:move', async (data: { sceneId: string }) => {
      if (!currentRoomCode || !currentUserId) return

      try {
        const roomState = rooms.get(currentRoomCode)
        if (!roomState) return

        const player = roomState.players.get(socket.id)
        if (!player) return

        // Update in database
        await prisma.playerProgress.update({
          where: {
            roomId_userId: {
              roomId: player.roomId,
              userId: player.userId,
            },
          },
          data: { currentSceneId: data.sceneId },
        })

        // Broadcast to room
        socket.to(currentRoomCode).emit('player:moved', {
          playerId: player.userId,
          nickname: player.nickname,
          sceneId: data.sceneId,
        })
      } catch (error) {
        console.error('Player move error:', error)
      }
    })

    // Player find item
    socket.on('player:find', async (data: { itemId: string; itemName: string }) => {
      if (!currentRoomCode || !currentUserId) return

      try {
        const roomState = rooms.get(currentRoomCode)
        if (!roomState) return

        const player = roomState.players.get(socket.id)
        if (!player) return

        // Broadcast to room
        socket.to(currentRoomCode).emit('player:found', {
          playerId: player.userId,
          nickname: player.nickname,
          itemId: data.itemId,
          itemName: data.itemName,
        })

        // Notify the finding player
        socket.emit('item:found', {
          itemId: data.itemId,
          itemName: data.itemName,
        })
      } catch (error) {
        console.error('Player find error:', error)
      }
    })

    // Player unlock note
    socket.on('player:note', async (data: { noteId: string; noteTitle: string }) => {
      if (!currentRoomCode || !currentUserId) return

      try {
        const roomState = rooms.get(currentRoomCode)
        if (!roomState) return

        const player = roomState.players.get(socket.id)
        if (!player) return

        // Broadcast to room
        socket.to(currentRoomCode).emit('player:noted', {
          playerId: player.userId,
          nickname: player.nickname,
          noteId: data.noteId,
          noteTitle: data.noteTitle,
        })
      } catch (error) {
        console.error('Player note error:', error)
      }
    })

    // Sync room state
    socket.on('room:sync', async () => {
      if (!currentRoomCode) return

      try {
        const roomState = rooms.get(currentRoomCode)
        if (!roomState) return

        const players = Array.from(roomState.players.values())
        socket.emit('room:sync', { players })
      } catch (error) {
        console.error('Room sync error:', error)
      }
    })

    // Send message
    socket.on('message:send', (data: { content: string }) => {
      if (!currentRoomCode || !currentUserId) return

      try {
        const roomState = rooms.get(currentRoomCode)
        if (!roomState) return

        const player = roomState.players.get(socket.id)
        if (!player) return

        const message = {
          id: `msg-${Date.now()}`,
          senderId: player.userId,
          senderName: player.nickname,
          content: data.content,
          timestamp: Date.now(),
        }

        // Broadcast to room
        io.to(currentRoomCode).emit('message:received', message)
      } catch (error) {
        console.error('Send message error:', error)
      }
    })

    // Leave room
    socket.on('room:leave', async () => {
      if (!currentRoomCode || !currentUserId) return

      try {
        const roomState = rooms.get(currentRoomCode)
        if (roomState) {
          const player = roomState.players.get(socket.id)
          if (player) {
            // Update online status
            await prisma.playerProgress.update({
              where: {
                roomId_userId: {
                  roomId: player.roomId,
                  userId: player.userId,
                },
              },
              data: { isOnline: false },
            }).catch(() => {})

            roomState.players.delete(socket.id)

            // Notify remaining players
            const players = Array.from(roomState.players.values())
            io.to(currentRoomCode).emit('room:players', players)
          }

          if (roomState.players.size === 0) {
            rooms.delete(currentRoomCode)
          }
        }

        socket.leave(currentRoomCode)
        console.log(`User left room ${currentRoomCode}`)

        currentUserId = null
        currentRoomCode = null
      } catch (error) {
        console.error('Leave room error:', error)
      }
    })

    // Disconnect
    socket.on('disconnect', async () => {
      console.log('Client disconnected:', socket.id)

      if (currentRoomCode && currentUserId) {
        try {
          const roomState = rooms.get(currentRoomCode)
          if (roomState) {
            const player = roomState.players.get(socket.id)
            if (player) {
              await prisma.playerProgress.update({
                where: {
                  roomId_userId: {
                    roomId: player.roomId,
                    userId: player.userId,
                  },
                },
                data: { isOnline: false },
              }).catch(() => {})

              roomState.players.delete(socket.id)

              const players = Array.from(roomState.players.values())
              io.to(currentRoomCode).emit('room:players', players)

              if (roomState.players.size === 0) {
                rooms.delete(currentRoomCode)
              }
            }
          }
        } catch (error) {
          console.error('Disconnect cleanup error:', error)
        }
      }
    })
  })
}

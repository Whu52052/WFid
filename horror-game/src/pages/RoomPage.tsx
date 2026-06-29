import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useMultiplayerStore, useGameStore } from '../store/gameStore'

export default function RoomPage() {
  const navigate = useNavigate()
  const { character } = useGameStore()
  const {
    isInRoom,
    roomCode,
    players,
    messages,
    setRoom,
    addMessage,
    leaveRoom,
  } = useMultiplayerStore()

  const [joinCode, setJoinCode] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [messageInput, setMessageInput] = useState('')

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleCreateRoom = () => {
    const newCode = generateRoomCode()
    setRoom(newCode, [
      {
        id: 'player-1',
        nickname: character?.nickname || '玩家1',
        isOnline: true,
        currentScene: 'entrance',
      },
    ])
  }

  const handleJoinRoom = () => {
    if (joinCode.length !== 6) return
    // Simulate joining a room
    setRoom(joinCode.toUpperCase(), [
      {
        id: 'player-1',
        nickname: '玩家1',
        isOnline: true,
        currentScene: 'entrance',
      },
      {
        id: 'player-2',
        nickname: character?.nickname || '玩家2',
        isOnline: true,
        currentScene: 'hall',
      },
    ])
  }

  const handleLeaveRoom = () => {
    leaveRoom()
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    addMessage({
      id: `msg-${Date.now()}`,
      senderId: 'player-1',
      senderName: character?.nickname || '你',
      content: messageInput.trim(),
      timestamp: Date.now(),
    })
    setMessageInput('')
  }

  if (!isInRoom) {
    return (
      <div className="min-h-screen p-4 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/game')}
            className="p-2 text-horror-text-secondary hover:text-horror-text-primary"
          >
            ← 返回
          </button>
          <h1 className="text-xl font-bold text-horror-text-primary">多人游戏</h1>
          <div className="w-12" />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm space-y-6">
            {/* Create room */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateRoom}
              className="w-full p-4 bg-horror-accent/80 border-2 border-horror-text-secondary text-horror-text-primary rounded"
            >
              <div className="text-2xl mb-2">➕</div>
              <div className="font-bold">创建房间</div>
              <div className="text-sm text-horror-text-secondary">创建新房间并邀请朋友</div>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-horror-border" />
              <span className="text-horror-text-secondary text-sm">或</span>
              <div className="flex-1 h-px bg-horror-border" />
            </div>

            {/* Join room */}
            <div className="space-y-3">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
                placeholder="输入房间码..."
                maxLength={6}
                className="w-full px-4 py-3 bg-horror-bg-secondary border-2 border-horror-border rounded text-center text-2xl tracking-widest text-horror-text-primary placeholder:text-horror-text-secondary/50 focus:outline-none focus:border-horror-accent transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleJoinRoom}
                disabled={joinCode.length !== 6}
                className="w-full p-4 bg-horror-bg-secondary border-2 border-horror-text-secondary text-horror-text-primary rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-2xl mb-2">🚪</div>
                <div className="font-bold">加入房间</div>
                <div className="text-sm text-horror-text-secondary">输入6位房间码加入</div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // In room view
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-horror-border bg-horror-bg-secondary/50">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLeaveRoom}
            className="p-2 text-horror-text-secondary hover:text-horror-text-primary"
          >
            离开
          </button>
          <div className="text-center">
            <div className="text-horror-text-secondary text-xs">房间码</div>
            <div className="text-2xl font-bold tracking-widest text-horror-text-primary">
              {roomCode}
            </div>
          </div>
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-2 text-horror-text-secondary hover:text-horror-text-primary"
          >
            💬
          </button>
        </div>
      </header>

      {/* Players */}
      <div className="p-4 border-b border-horror-border">
        <h2 className="text-horror-text-secondary text-sm mb-3">👥 玩家列表</h2>
        <div className="space-y-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 bg-horror-bg-secondary rounded"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-horror-text-primary">{player.nickname}</span>
              </div>
              <span className="text-horror-text-secondary text-sm">
                📍 {player.currentScene}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Room info */}
      <div className="flex-1 p-4">
        <div className="text-center text-horror-text-secondary">
          <p className="mb-4">等待其他玩家加入...</p>
          <p className="text-sm opacity-70">
            分享房间码 <span className="font-bold text-horror-accent">{roomCode}</span> 给你的朋友
          </p>
        </div>
      </div>

      {/* Chat panel */}
      {showChat && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="p-4 border-t border-horror-border bg-horror-bg-secondary"
        >
          <div className="h-40 overflow-y-auto mb-3 space-y-2">
            {messages.length === 0 ? (
              <div className="text-center text-horror-text-secondary text-sm">
                暂无消息
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <span className="text-horror-accent font-bold">{msg.senderName}: </span>
                  <span className="text-horror-text-primary">{msg.content}</span>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="发送消息..."
              className="flex-1 px-3 py-2 bg-horror-bg border border-horror-border rounded text-horror-text-primary placeholder:text-horror-text-secondary/50 focus:outline-none focus:border-horror-accent"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="px-4 py-2 bg-horror-accent rounded text-horror-text-primary"
            >
              发送
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Start button */}
      <div className="p-4 border-t border-horror-border">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/game')}
          className="w-full py-3 bg-horror-accent/80 border-2 border-horror-text-secondary text-horror-text-primary rounded"
        >
          开始游戏
        </motion.button>
      </div>
    </div>
  )
}

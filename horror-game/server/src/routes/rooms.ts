import { Router, Request, Response } from 'express'
import { prisma } from '../index'
import jwt from 'jsonwebtoken'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'horror-game-secret-key-2024'

// Middleware to verify token
const authMiddleware = async (req: Request, res: Response, next: Function) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: '未登录' })
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    ;(req as any).userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ error: '无效的令牌' })
  }
}

// Create room
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId

    // Generate unique room code
    const generateRoomCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase()
    }

    let roomCode = generateRoomCode()
    let attempts = 0
    while (attempts < 10) {
      const existing = await prisma.gameRoom.findUnique({
        where: { roomCode },
      })
      if (!existing) break
      roomCode = generateRoomCode()
      attempts++
    }

    const room = await prisma.gameRoom.create({
      data: {
        roomCode,
        creatorId: userId,
        status: 'waiting',
      },
    })

    // Create player progress for creator
    await prisma.playerProgress.create({
      data: {
        roomId: room.id,
        userId,
        currentSceneId: 'entrance',
      },
    })

    res.json({
      id: room.id,
      roomCode: room.roomCode,
      status: room.status,
    })
  } catch (error) {
    console.error('Create room error:', error)
    res.status(500).json({ error: '创建房间失败' })
  }
})

// Get room by code
router.get('/:code', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { code } = req.params

    const room = await prisma.gameRoom.findUnique({
      where: { roomCode: code.toUpperCase() },
      include: {
        players: {
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
              },
            },
          },
        },
      },
    })

    if (!room) {
      return res.status(404).json({ error: '房间不存在' })
    }

    res.json({
      id: room.id,
      roomCode: room.roomCode,
      status: room.status,
      currentChapter: room.currentChapter,
      players: room.players.map((p) => ({
        id: p.user.id,
        nickname: p.user.nickname,
        currentSceneId: p.currentSceneId,
        isOnline: p.isOnline,
      })),
    })
  } catch (error) {
    console.error('Get room error:', error)
    res.status(500).json({ error: '获取房间失败' })
  }
})

// Join room
router.post('/:code/join', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { code } = req.params
    const userId = (req as any).userId

    const room = await prisma.gameRoom.findUnique({
      where: { roomCode: code.toUpperCase() },
    })

    if (!room) {
      return res.status(404).json({ error: '房间不存在' })
    }

    if (room.status !== 'waiting') {
      return res.status(400).json({ error: '游戏已开始，无法加入' })
    }

    // Check if already in room
    const existingProgress = await prisma.playerProgress.findUnique({
      where: {
        roomId_userId: {
          roomId: room.id,
          userId,
        },
      },
    })

    if (existingProgress) {
      return res.json({
        roomId: room.id,
        roomCode: room.roomCode,
        message: '已加入房间',
      })
    }

    // Create player progress
    await prisma.playerProgress.create({
      data: {
        roomId: room.id,
        userId,
        currentSceneId: 'entrance',
      },
    })

    res.json({
      roomId: room.id,
      roomCode: room.roomCode,
      message: '加入成功',
    })
  } catch (error) {
    console.error('Join room error:', error)
    res.status(500).json({ error: '加入房间失败' })
  }
})

// Get player progress
router.get('/:id/progress', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = (req as any).userId

    const progress = await prisma.playerProgress.findUnique({
      where: {
        roomId_userId: {
          roomId: id,
          userId,
        },
      },
    })

    if (!progress) {
      return res.status(404).json({ error: '进度不存在' })
    }

    res.json({
      currentSceneId: progress.currentSceneId,
      inventory: JSON.parse(progress.inventory),
      notes: JSON.parse(progress.notes),
      exploredScenes: JSON.parse(progress.exploredScenes),
      solvedPuzzles: JSON.parse(progress.solvedPuzzles),
    })
  } catch (error) {
    console.error('Get progress error:', error)
    res.status(500).json({ error: '获取进度失败' })
  }
})

// Update player progress
router.put('/:id/progress', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = (req as any).userId
    const { currentSceneId, inventory, notes, exploredScenes, solvedPuzzles } = req.body

    const progress = await prisma.playerProgress.update({
      where: {
        roomId_userId: {
          roomId: id,
          userId,
        },
      },
      data: {
        currentSceneId: currentSceneId || undefined,
        inventory: inventory ? JSON.stringify(inventory) : undefined,
        notes: notes ? JSON.stringify(notes) : undefined,
        exploredScenes: exploredScenes ? JSON.stringify(exploredScenes) : undefined,
        solvedPuzzles: solvedPuzzles ? JSON.stringify(solvedPuzzles) : undefined,
      },
    })

    res.json({
      currentSceneId: progress.currentSceneId,
      inventory: JSON.parse(progress.inventory),
      notes: JSON.parse(progress.notes),
      exploredScenes: JSON.parse(progress.exploredScenes),
      solvedPuzzles: JSON.parse(progress.solvedPuzzles),
    })
  } catch (error) {
    console.error('Update progress error:', error)
    res.status(500).json({ error: '更新进度失败' })
  }
})

// Leave room
router.post('/:id/leave', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = (req as any).userId

    await prisma.playerProgress.update({
      where: {
        roomId_userId: {
          roomId: id,
          userId,
        },
      },
      data: {
        isOnline: false,
      },
    })

    res.json({ message: '已离开房间' })
  } catch (error) {
    console.error('Leave room error:', error)
    res.status(500).json({ error: '离开房间失败' })
  }
})

export default router

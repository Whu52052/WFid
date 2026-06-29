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

// Get all scenes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const scenes = await prisma.scene.findMany({
      orderBy: [{ chapterId: 'asc' }],
    })

    const formattedScenes = scenes.map((s) => ({
      id: s.id,
      chapterId: s.chapterId,
      name: s.name,
      description: s.description,
      imageAsset: s.imageAsset,
      connections: JSON.parse(s.connections),
      items: JSON.parse(s.items),
      puzzles: JSON.parse(s.puzzles),
      triggers: JSON.parse(s.triggers),
    }))

    res.json(formattedScenes)
  } catch (error) {
    console.error('Get scenes error:', error)
    res.status(500).json({ error: '获取场景列表失败' })
  }
})

// Get scene by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const scene = await prisma.scene.findUnique({
      where: { id },
    })

    if (!scene) {
      return res.status(404).json({ error: '场景不存在' })
    }

    res.json({
      id: scene.id,
      chapterId: scene.chapterId,
      name: scene.name,
      description: scene.description,
      imageAsset: scene.imageAsset,
      connections: JSON.parse(scene.connections),
      items: JSON.parse(scene.items),
      puzzles: JSON.parse(scene.puzzles),
      triggers: JSON.parse(scene.triggers),
    })
  } catch (error) {
    console.error('Get scene error:', error)
    res.status(500).json({ error: '获取场景失败' })
  }
})

// Get puzzles for a scene
router.get('/:id/puzzles', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const puzzles = await prisma.puzzle.findMany({
      where: { sceneId: id },
    })

    const formattedPuzzles = puzzles.map((p) => ({
      id: p.id,
      sceneId: p.sceneId,
      type: p.type,
      name: p.name,
      hint: p.hint,
      solution: p.solution,
      reward: JSON.parse(p.reward),
      isSolved: p.isSolved,
    }))

    res.json(formattedPuzzles)
  } catch (error) {
    console.error('Get puzzles error:', error)
    res.status(500).json({ error: '获取谜题失败' })
  }
})

// Solve puzzle
router.post('/:sceneId/puzzles/:puzzleId/solve', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { sceneId, puzzleId } = req.params
    const { solution } = req.body

    const puzzle = await prisma.puzzle.findUnique({
      where: { id: puzzleId },
    })

    if (!puzzle) {
      return res.status(404).json({ error: '谜题不存在' })
    }

    if (puzzle.sceneId !== sceneId) {
      return res.status(400).json({ error: '谜题与场景不匹配' })
    }

    if (puzzle.isSolved) {
      return res.status(400).json({ error: '谜题已解决' })
    }

    // Check solution (case insensitive)
    if (puzzle.solution.toLowerCase() !== solution.toLowerCase().trim()) {
      return res.status(400).json({ error: '答案错误' })
    }

    // Mark as solved
    await prisma.puzzle.update({
      where: { id: puzzleId },
      data: { isSolved: true },
    })

    res.json({
      success: true,
      reward: JSON.parse(puzzle.reward),
    })
  } catch (error) {
    console.error('Solve puzzle error:', error)
    res.status(500).json({ error: '解答谜题失败' })
  }
})

export default router

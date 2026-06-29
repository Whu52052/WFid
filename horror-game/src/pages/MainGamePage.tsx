import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { scenes } from '../data/scenes'
import { puzzles } from '../data/puzzles'

export default function MainGamePage() {
  const navigate = useNavigate()
  const {
    character,
    currentScene,
    setCurrentScene,
    chapter,
    inventory,
    addNote,
    markSceneExplored,
  } = useGameStore()

  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showChoices, setShowChoices] = useState(false)
  const [shake, setShake] = useState(false)

  const scene = scenes.find(s => s.id === currentScene) || scenes[0]

  // Typing effect
  useEffect(() => {
    setIsTyping(true)
    setShowChoices(false)
    setDisplayText('')

    let index = 0
    const text = scene.description
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        setShowChoices(true)
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [currentScene])

  // Auto save progress
  useEffect(() => {
    const progress = {
      character,
      currentScene,
      chapter,
      inventory,
      timestamp: Date.now()
    }
    localStorage.setItem('gameProgress', JSON.stringify(progress))
  }, [currentScene, chapter, inventory, character])

  const triggerShake = useCallback(() => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }, [])

  const handleExplore = (action: string) => {
    triggerShake()

    if (action === 'investigate') {
      // Add discovery based on scene
      if (scene.items && scene.items.length > 0) {
        const itemId = scene.items[0]
        const item = inventory.find(i => i.id === itemId)
        if (!item) {
          // Would add item from scene data
        }
      }
      // Add a note
      addNote({
        id: `${currentScene}-note-${Date.now()}`,
        title: `调查：${scene.name}`,
        content: `你在${scene.name}发现了一些线索...`,
        category: 'clue',
        unlockedAt: Date.now()
      })
    } else if (action.startsWith('go:')) {
      const nextScene = action.replace('go:', '')
      setCurrentScene(nextScene)
      markSceneExplored(nextScene)
    } else if (action.startsWith('puzzle:')) {
      // Handle puzzle interaction
      // TODO: Implement puzzle modal
    }
  }

  const choices = [
    { id: 'investigate', label: '🔍 调查环境', action: 'investigate' },
    ...scene.connections.map(conn => ({
      id: `go:${conn}`,
      label: `🚪 前往 ${scenes.find(s => s.id === conn)?.name || conn}`,
      action: `go:${conn}`
    })),
    ...(scene.puzzles?.map(p => ({
      id: `puzzle:${p}`,
      label: `🧩 ${puzzles.find(pu => pu.id === p)?.name || '解谜'}`,
      action: `puzzle:${p}`
    })) || [])
  ]

  return (
    <div className={`min-h-screen flex flex-col ${shake ? 'shake' : ''}`}>
      {/* Header */}
      <header className="p-3 border-b border-horror-border bg-horror-bg-secondary/50">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-horror-text-secondary text-sm">第{chapter + 1}章</span>
            <h1 className="font-bold text-horror-text-primary">{scene.name}</h1>
          </div>
          <div className="flex gap-2">
            <span className="text-horror-text-secondary text-xs">📍 {character?.nickname || '调查者'}</span>
          </div>
        </div>
      </header>

      {/* Scene Image */}
      <div className="relative h-48 bg-horror-bg-secondary overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🏚️
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-horror-bg to-transparent" />
      </div>

      {/* Story text */}
      <main className="flex-1 p-4 overflow-y-auto">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-horror-text-primary leading-relaxed whitespace-pre-wrap">
            {displayText}
            {isTyping && <span className="animate-pulse">▌</span>}
          </p>
        </motion.div>
      </main>

      {/* Choices */}
      <AnimatePresence>
        {showChoices && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 border-t border-horror-border bg-horror-bg-secondary/80 backdrop-blur"
          >
            <div className="grid grid-cols-1 gap-2">
              {choices.map((choice) => (
                <motion.button
                  key={choice.id}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 0, 0, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleExplore(choice.action)}
                  className="p-3 text-left bg-horror-bg/80 border border-horror-border rounded text-horror-text-primary hover:border-horror-accent transition-all"
                >
                  {choice.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom toolbar */}
      <footer className="p-2 border-t border-horror-border bg-horror-bg-secondary/50 flex justify-around">
        <button
          onClick={() => navigate('/inventory')}
          className="p-2 text-horror-text-secondary hover:text-horror-text-primary"
        >
          <span className="text-xl">🎒</span>
          <span className="block text-xs">物品</span>
        </button>
        <button
          onClick={() => navigate('/notes')}
          className="p-2 text-horror-text-secondary hover:text-horror-text-primary"
        >
          <span className="text-xl">📜</span>
          <span className="block text-xs">笔记</span>
        </button>
        <button
          onClick={() => navigate('/room')}
          className="p-2 text-horror-text-secondary hover:text-horror-text-primary"
        >
          <span className="text-xl">👥</span>
          <span className="block text-xs">多人</span>
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="p-2 text-horror-text-secondary hover:text-horror-text-primary"
        >
          <span className="text-xl">⚙️</span>
          <span className="block text-xs">设置</span>
        </button>
      </footer>
    </div>
  )
}

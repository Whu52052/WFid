import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

export default function InventoryPage() {
  const navigate = useNavigate()
  const { inventory } = useGameStore()

  const itemIcons: { [key: string]: string } = {
    'old-key': '🗝️',
    'invitation': '📧',
    'rope': '🪢',
    'old-newspaper': '📰',
    'book': '📖',
    'wine-bottle': '🍷',
    'diary-fragment': '📔',
    'brass-key': '🗝️',
    'kitchen-knife': '🔪',
    'necklace': '📿',
    'photo': '🖼️',
    'love-letters': '💌',
    'music-box': '🎵',
    'suicide-note': '📝',
    'revolver': '🔫',
    'ritual-knife': '🗡️',
    'cursed-book': '📕',
    'talisman': '📜',
    'family-tree': '🗺️',
    'wooden-box': '📦',
    'shovel': '⛏️',
    'silver-cross': '✝️',
    'mask': '🎭',
    'silver-key': '🔑',
    'diary': '📓',
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/game')}
          className="p-2 text-horror-text-secondary hover:text-horror-text-primary"
        >
          ← 返回
        </button>
        <h1 className="text-xl font-bold text-horror-text-primary">物品栏</h1>
        <div className="w-12" />
      </header>

      {/* Items grid */}
      {inventory.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-horror-text-secondary"
        >
          <span className="text-6xl mb-4 opacity-30">🎒</span>
          <p>还没有收集任何物品</p>
          <p className="text-sm mt-2 opacity-70">探索场景可以发现物品</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 gap-3"
        >
          {inventory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-horror-bg-secondary border border-horror-border rounded"
            >
              <div className="text-4xl mb-2 text-center">
                {itemIcons[item.id] || '📦'}
              </div>
              <h3 className="font-bold text-horror-text-primary text-center mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-horror-text-secondary text-center line-clamp-2">
                {item.description}
              </p>
              {item.combinable && (
                <div className="mt-2 text-xs text-horror-accent text-center">
                  可组合
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Combination hint */}
      <div className="mt-8 p-4 bg-horror-bg-secondary/50 border border-horror-border rounded">
        <h3 className="text-horror-text-secondary text-sm mb-2">💡 提示</h3>
        <p className="text-horror-text-secondary/70 text-xs">
          尝试组合不同的物品可能会产生新的线索。选中两个物品然后点击组合按钮。
        </p>
      </div>
    </div>
  )
}

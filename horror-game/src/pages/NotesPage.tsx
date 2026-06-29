import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

export default function NotesPage() {
  const navigate = useNavigate()
  const { notes } = useGameStore()

  const categoryIcons = {
    diary: '📔',
    clue: '🔍',
    dialogue: '💬',
  }

  const categoryLabels = {
    diary: '日记片段',
    clue: '调查线索',
    dialogue: '对话记录',
  }

  // Sort notes by unlock time, newest first
  const sortedNotes = [...notes].sort((a, b) => b.unlockedAt - a.unlockedAt)

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
        <h1 className="text-xl font-bold text-horror-text-primary">笔记</h1>
        <div className="w-12" />
      </header>

      {/* Notes list */}
      {notes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-horror-text-secondary"
        >
          <span className="text-6xl mb-4 opacity-30">📜</span>
          <p>还没有收集任何笔记</p>
          <p className="text-sm mt-2 opacity-70">调查场景可以发现线索</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {sortedNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-horror-bg-secondary border border-horror-border rounded paper-texture"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {categoryIcons[note.category] || '📜'}
                  </span>
                  <span className="text-horror-text-secondary text-sm">
                    {categoryLabels[note.category] || '笔记'}
                  </span>
                </div>
                <span className="text-horror-text-secondary/50 text-xs">
                  {new Date(note.unlockedAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <h3 className="font-bold text-horror-text-primary mb-2">
                {note.title}
              </h3>
              <p className="text-horror-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                {note.content}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 p-4 bg-horror-bg-secondary/50 border border-horror-border rounded">
        <h3 className="text-horror-text-secondary text-sm mb-2">📊 收集统计</h3>
        <div className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-horror-text-primary">
              {notes.filter(n => n.category === 'diary').length}
            </div>
            <div className="text-xs text-horror-text-secondary">日记</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-horror-text-primary">
              {notes.filter(n => n.category === 'clue').length}
            </div>
            <div className="text-xs text-horror-text-secondary">线索</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-horror-text-primary">
              {notes.filter(n => n.category === 'dialogue').length}
            </div>
            <div className="text-xs text-horror-text-secondary">对话</div>
          </div>
        </div>
      </div>
    </div>
  )
}

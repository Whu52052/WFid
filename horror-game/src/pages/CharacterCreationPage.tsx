import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

export default function CharacterCreationPage() {
  const navigate = useNavigate()
  const { setCharacter } = useGameStore()
  const [nickname, setNickname] = useState('')
  const [background, setBackground] = useState('journalist')

  const backgrounds = [
    { id: 'journalist', name: '灵异记者', desc: '为报社调查神秘事件，擅长记录和观察' },
    { id: 'detective', name: '私家侦探', desc: '受雇调查失踪案，精于推理和分析' },
    { id: 'scholar', name: '民俗学者', desc: '研究民间传说，对古老秘密有独到见解' },
    { id: 'doctor', name: '心理医生', desc: '探索人类潜意识，对心理压迫有抗性' },
  ]

  const handleStart = () => {
    if (!nickname.trim()) return
    setCharacter({ nickname: nickname.trim(), background })
    navigate('/room')
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Ma Shan Zheng' }}>
          创建角色
        </h2>

        {/* Nickname input */}
        <div className="mb-8">
          <label className="block text-horror-text-secondary mb-2 text-sm">昵称</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={12}
            placeholder="请输入你的名字..."
            className="w-full px-4 py-3 bg-horror-bg-secondary border-2 border-horror-border rounded text-horror-text-primary placeholder:text-horror-text-secondary/50 focus:outline-none focus:border-horror-accent transition-colors"
          />
        </div>

        {/* Background selection */}
        <div className="mb-8">
          <label className="block text-horror-text-secondary mb-3 text-sm">背景故事</label>
          <div className="grid grid-cols-1 gap-3">
            {backgrounds.map((bg) => (
              <motion.button
                key={bg.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setBackground(bg.id)}
                className={`p-4 rounded border-2 text-left transition-all ${
                  background === bg.id
                    ? 'border-horror-accent bg-horror-accent/20'
                    : 'border-horror-border bg-horror-bg-secondary hover:border-horror-text-secondary'
                }`}
              >
                <div className="font-bold text-horror-text-primary">{bg.name}</div>
                <div className="text-sm text-horror-text-secondary">{bg.desc}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <motion.button
          whileHover={{ scale: nickname.trim() ? 1.05 : 1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          disabled={!nickname.trim()}
          className="w-full py-4 bg-horror-accent/80 border-2 border-horror-text-secondary text-horror-text-primary text-xl rounded transition-all hover:bg-horror-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          创建角色
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="w-full mt-4 py-3 bg-transparent border-2 border-horror-border text-horror-text-secondary rounded transition-all hover:border-horror-text-secondary"
        >
          返回
        </motion.button>
      </motion.div>
    </div>
  )
}

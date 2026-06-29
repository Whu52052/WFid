import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function TitlePage() {
  const navigate = useNavigate()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    const savedProgress = localStorage.getItem('gameProgress')
    if (savedProgress) {
      navigate('/game')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-horror-bg via-horror-bg-secondary to-horror-bg opacity-50" />
      <div className="absolute inset-0 breathing" style={{ background: 'radial-gradient(circle at center, transparent 0%, #1A0A0A 70%)' }} />

      {/* Candle flickers */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-horror-accent rounded-full flicker" style={{ boxShadow: '0 0 20px #8B0000, 0 0 40px #8B0000' }} />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-horror-text-secondary rounded-full flicker" style={{ animationDelay: '0.5s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-2 text-horror-text-primary"
          style={{ fontFamily: 'Ma Shan Zheng, cursive', textShadow: '0 0 30px rgba(139, 0, 0, 0.5)' }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          旧宅诡事
        </motion.h1>

        <motion.p
          className="text-horror-text-secondary text-lg mb-12 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          REPUBLICAN ERA HORROR
        </motion.p>

        {/* Menu buttons */}
        <div className="flex flex-col gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139, 0, 0, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/create')}
            className="px-12 py-4 bg-horror-accent/80 border-2 border-horror-text-secondary text-horror-text-primary text-xl rounded transition-all hover:bg-horror-accent w-64"
          >
            开始游戏
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={!localStorage.getItem('gameProgress')}
            className="px-12 py-4 bg-transparent border-2 border-horror-border text-horror-text-secondary text-lg rounded transition-all hover:border-horror-text-secondary w-64 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            继续游戏
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/settings')}
            className="px-12 py-4 bg-transparent border-2 border-horror-border text-horror-text-secondary text-lg rounded transition-all hover:border-horror-text-secondary w-64"
          >
            设置
          </motion.button>
        </div>

        {/* Warning text */}
        <motion.p
          className="mt-16 text-horror-text-secondary/50 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 0.5 : 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          本游戏包含恐怖元素，请确保您的心理状态适合游玩
        </motion.p>
      </motion.div>

      {/* Version */}
      <div className="absolute bottom-4 text-horror-text-secondary/30 text-xs">
        v0.1.0 Alpha
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

export default function EndingPage() {
  const navigate = useNavigate()
  const { character, resetGame } = useGameStore()

  // This would be determined by choices made throughout the game
  const endingType = 'truth' // Placeholder

  const endings = {
    truth: {
      title: '真相大白',
      icon: '✨',
      description: `你成功解开了古宅的秘密。

林家的悲剧源于一场失败的仪式。他们试图通过献祭来换取家族的昌盛，但却唤醒了不该唤醒的东西。七十年后，诅咒终于被打破。

当第一缕阳光照进这座尘封的古宅时，你看到了大门缓缓打开。门外，是崭新的世界。

你可以离开了。`,
      color: 'text-yellow-500',
    },
    lost: {
      title: '迷失',
      icon: '🌀',
      description: `你永远无法离开这座古宅。

无论你如何尝试，门总是会在你即将触及的那一刻消失。你开始在无尽的时间中迷失，成为了这座古宅的一部分。

也许，下一个误入此地的人，会在某个角落看到你的身影...`,
      color: 'text-horror-text-secondary',
    },
    sacrifice: {
      title: '牺牲',
      icon: '💫',
      description: `为了拯救被困的灵魂，你献出了自己的生命。

你的牺牲终结了七十年的诅咒。被困的灵魂终于得到了安息，而你的名字，将被铭记在那本泛黄的日记里。

虽然你无法离开，但你知道，这是正确的选择。`,
      color: 'text-blue-500',
    },
    symbiosis: {
      title: '共生',
      icon: '🔮',
      description: `你与古宅的存在达成了某种协议。

作为交换，你获得了超越常人的能力，但也永远被束缚在这片土地。你成为了新的守护者，守护着这个阴阳交界的门户。

偶尔，会有迷路的旅人来到这里。你会指引他们安全的道路，就像曾经有人为你指引一样。`,
      color: 'text-purple-500',
    },
    cycle: {
      title: '轮回',
      icon: '♾️',
      description: `你成为了古宅的下一个传说。

在某个深夜，一群年轻人收到了神秘的邀请函。他们谈笑风生地来到这里，丝毫不知道等待他们的是什么。

而你，站在阴影中，静静地看着他们推开门...`,
      color: 'text-horror-accent',
    },
    awakening: {
      title: '觉醒',
      icon: '🌅',
      description: `你打破了轮回，释放了所有被困的灵魂。

七十年的悲剧在你的手中终结。被困的灵魂终于得到了安息，而这座古宅也终于可以安眠。

当你踏出大门的那一刻，天空中的阴霾散去，露出久违的星空。

你深吸一口气，感受着自由的空气。这个漫长的夜晚，终于结束了。`,
      color: 'text-green-500',
    },
    inheritance: {
      title: '继承',
      icon: '👑',
      description: `你继承了古宅的一切，成为了新的守护者。

这不是诅咒，而是责任。你明白了林家祖先的苦衷，也明白了一代又一代守护者的牺牲。

你会在每个月的圆夜点燃香烛，为那些迷失的灵魂指引方向。

这就是你的使命，直到下一个继承者出现。`,
      color: 'text-gold-500',
    },
  }

  const ending = endings[endingType as keyof typeof endings] || endings.truth

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-lg text-center"
      >
        {/* Ending icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-8xl mb-6"
        >
          {ending.icon}
        </motion.div>

        {/* Ending title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`text-4xl font-bold mb-8 ${ending.color}`}
          style={{ fontFamily: 'Ma Shan Zheng' }}
        >
          {ending.title}
        </motion.h1>

        {/* Ending description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="p-6 bg-horror-bg-secondary border border-horror-border rounded mb-8 text-left"
        >
          <p className="text-horror-text-primary leading-relaxed whitespace-pre-line">
            {ending.description}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-8 text-horror-text-secondary"
        >
          <p className="text-sm">
            玩家：{character?.nickname || '调查者'}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="space-y-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              resetGame()
              navigate('/')
            }}
            className="w-full py-3 bg-horror-accent/80 border-2 border-horror-text-secondary text-horror-text-primary rounded"
          >
            返回标题
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/notes')}
            className="w-full py-3 bg-transparent border-2 border-horror-border text-horror-text-secondary rounded"
          >
            查看笔记
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Credits hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        className="fixed bottom-4 text-horror-text-secondary/50 text-xs"
      >
        感谢游玩《旧宅诡事》
      </motion.p>
    </div>
  )
}

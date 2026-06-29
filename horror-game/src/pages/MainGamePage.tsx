import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { scenes } from '../data/scenes'
import { puzzles } from '../data/puzzles'
import { getItemById } from '../data/items'

export default function MainGamePage() {
  const navigate = useNavigate()
  const {
    character,
    currentScene,
    setCurrentScene,
    chapter,
    inventory,
    addItem,
    addNote,
    markSceneExplored,
  } = useGameStore()

  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showChoices, setShowChoices] = useState(false)
  const [shake, setShake] = useState(false)
  const [investigatedScenes, setInvestigatedScenes] = useState<string[]>([])
  const [showItemFound, setShowItemFound] = useState<{ name: string; icon: string } | null>(null)
  const [showNoteFound, setShowNoteFound] = useState<{ title: string; content: string } | null>(null)

  const scene = scenes.find(s => s.id === currentScene) || scenes[0]

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
    }, 40)

    return () => clearInterval(timer)
  }, [currentScene, scene.description])

  useEffect(() => {
    const saved = localStorage.getItem('investigatedScenes')
    if (saved) {
      setInvestigatedScenes(JSON.parse(saved))
    }
  }, [])

  const triggerShake = useCallback(() => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }, [])

  const handleInvestigate = () => {
    triggerShake()

    if (investigatedScenes.includes(currentScene)) {
      addNote({
        id: `${currentScene}-reinvestigate-${Date.now()}`,
        title: `再次调查：${scene.name}`,
        content: `你再次仔细检查了${scene.name}，但没有发现新的东西...也许该去别的地方看看。`,
        category: 'clue',
        unlockedAt: Date.now()
      })
      setShowNoteFound({
        title: '没有新发现',
        content: '你仔细检查了周围，但没有发现新的线索。也许该去别的地方看看。'
      })
      setTimeout(() => setShowNoteFound(null), 2500)
      return
    }

    const sceneItems = scene.items || []
    const newItems = sceneItems.filter(itemId => {
      const found = inventory.find(i => i.id === itemId)
      return !found
    })

    let foundItem = null
    if (newItems.length > 0) {
      const itemId = newItems[0]
      const item = getItemById(itemId)
      if (item) {
        addItem(item)
        foundItem = { name: item.name, icon: item.icon }
        setShowItemFound(foundItem)
        setTimeout(() => setShowItemFound(null), 2500)
      }
    }

    const noteContent = getInvestigationNote(currentScene, foundItem)
    addNote({
      id: `${currentScene}-note-${Date.now()}`,
      title: `调查：${scene.name}`,
      content: noteContent,
      category: 'clue',
      unlockedAt: Date.now()
    })

    const newInvestigated = [...investigatedScenes, currentScene]
    setInvestigatedScenes(newInvestigated)
    localStorage.setItem('investigatedScenes', JSON.stringify(newInvestigated))

    markSceneExplored(currentScene)
  }

  const getInvestigationNote = (sceneId: string, foundItem: { name: string; icon: string } | null): string => {
    const notes: { [key: string]: string } = {
      'entrance': `你仔细检查了古宅大门。\n\n门上的铜环已经锈迹斑斑，但上面的"林"字依然清晰可辨。门柱上刻着一副对联，字迹已经模糊不清了。\n\n${foundItem ? `你在门槛旁边发现了${foundItem.name}。` : ''}`,
      'hall': `你仔细打量着前厅。\n\n墙上的老照片让你感到不安——每一张照片的人脸都被刮花了。八仙桌上的油灯似乎还能用，但油已经不多了。\n\n${foundItem ? `你在桌子底下发现了${foundItem.name}。` : ''}`,
      'living-room': `你在客厅里四处查看。\n\n壁炉上方的油画里，那个女子的脸被涂得面目全非。你凑近看了看，颜料还是新的...有人最近来过这里。\n\n${foundItem ? `沙发上的${foundItem.name}引起了你的注意。` : ''}`,
      'dining-room': `你仔细检查了餐厅。\n\n餐具摆放得整整齐齐，仿佛主人们随时会回来用餐。墙上的钟已经停了，指针指向凌晨三点。\n\n${foundItem ? `酒柜里的${foundItem.name}看起来很可疑。` : ''}`,
      'study': `你在书房里翻找着。\n\n书桌上的日记只写了一半，最后一页被撕掉了。书架上的书大多是关于民俗和宗教的，其中一本《湘西异闻录》里夹着一张纸条。\n\n${foundItem ? `你找到了${foundItem.name}。` : ''}`,
      'kitchen': `你小心翼翼地走进厨房。\n\n灶台上的大锅散发着一股令人作呕的味道。墙上的刀具都生了锈，但有一把似乎最近被使用过...\n\n${foundItem ? `你在角落里发现了${foundItem.name}。` : ''}`,
      'bedroom': `你屏住呼吸走进主卧室。\n\n床上的尸体已经风干成了木乃伊状，身上的寿衣还保存完好。衣柜里的衣服散发出一股霉味。\n\n${foundItem ? `地上的${foundItem.name}在月光下闪闪发光。` : ''}`,
      'attic': `你爬上了阁楼。\n\n灰尘在光柱中飞舞。那面落地镜里的人影，你越看越觉得熟悉...就像是另一个你。\n\n${foundItem ? `你在一个箱子里发现了${foundItem.name}。` : ''}`,
      'upstairs-hallway': `你站在二楼走廊里。\n\n墙上的照片让你感到一阵寒意——所有照片都是同一栋宅子的正门，在不同的季节、不同的年代。其中一张里的那个人，长得和你几乎一模一样。\n\n${foundItem ? `你在墙角发现了${foundItem.name}。` : ''}`,
      'master-bedroom': `你走进了主人的卧室。\n\n梳妆台上的口红还没拧回去，镜子上的字触目惊心。床头柜里的遗书，字迹潦草而狂乱。\n\n${foundItem ? `你发现了${foundItem.name}。` : ''}`,
      'basement': `你来到了地下室。\n\n墙壁上的壁画描绘着一场血腥的仪式。祭坛上的罐子密封得很紧，但你能感觉到里面有什么东西在动。\n\n${foundItem ? `祭坛旁的${foundItem.name}引起了你的注意。` : ''}`,
      'secret-room': `密室里的镜子让你头晕目眩。\n\n无数个你的倒影在做着不同的动作。有些在笑，有些在哭，有些...已经倒在了血泊中。\n\n${foundItem ? `石台上的${foundItem.name}散发着诡异的光芒。` : ''}`,
      'corridor': `走廊里的帷幔在无风自动。\n\n你总觉得身后有什么东西跟着你，但每次回头，都只有飘动的白色帷幔。\n\n${foundItem ? `你在帷幔后面发现了${foundItem.name}。` : ''}`,
      'temple': `祠堂里弥漫着香烛的味道。\n\n牌位上的名字密密麻麻，有些已经模糊不清了。香灰的形状让你感到不安——像一只伸向天空的手。\n\n${foundItem ? `供桌上的${foundItem.name}看起来很重要。` : ''}`,
      'backyard': `后院长满了荒草。\n\n古井里传来阵阵阴寒的气息。那棵枯树的树皮上，刻着一道道血痕。树下的泥土是新翻过的...\n\n${foundItem ? `你在树下发现了${foundItem.name}。` : ''}`,
      'shrine': '祭司居里的神像面目模糊。\n\n墙上的面具让你感到一阵眩晕——它们似乎在盯着你看。祭坛上的供品早已腐烂，但那根银十字架却一尘不染。\n\n' + (foundItem ? `你在神像后面发现了${foundItem.name}。` : ''),
      'deep-shrine': '你站在地下洞穴的祭坛前。\n\n七根蜡烛围成一个圆圈，烛火在无风的洞穴里跳动着。墙壁上的文字记载着林家七代人的秘密——每一代，都有一个"祭品"。\n\n' + (foundItem ? `你在祭坛上发现了${foundItem.name}。` : ''),
      'choice-room': '最后的抉择就在眼前。\n\n那个和你长得一模一样的人影正看着你，嘴角挂着诡异的微笑。"七十年了，终于有人来了..."他说，"你，就是第七个。"\n\n' + (foundItem ? `你在祭坛上发现了${foundItem.name}。` : ''),
    }
    return notes[sceneId] || `你仔细调查了${scene.name}，发现了一些有趣的线索...`
  }

  const handleExplore = (action: string) => {
    triggerShake()

    if (action === 'investigate') {
      handleInvestigate()
    } else if (action.startsWith('go:')) {
      const nextScene = action.replace('go:', '')
      setCurrentScene(nextScene)
      markSceneExplored(nextScene)
    } else if (action.startsWith('puzzle:')) {
      // TODO: Implement puzzle modal
    }
  }

  const choices = [
    {
      id: 'investigate',
      label: investigatedScenes.includes(currentScene) ? '🔍 再次调查' : '🔍 调查环境',
      action: 'investigate'
    },
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

      <div className="relative h-48 bg-horror-bg-secondary overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
          🏚️
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-horror-bg to-transparent" />
      </div>

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

      <AnimatePresence>
        {showItemFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-horror-bg-secondary border-2 border-horror-accent rounded-lg p-6 text-center shadow-2xl glow">
              <div className="text-5xl mb-3">{showItemFound.icon}</div>
              <div className="text-horror-accent text-sm mb-1">发现物品</div>
              <div className="text-horror-text-primary font-bold text-lg">{showItemFound.name}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNoteFound && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-horror-bg-secondary border border-horror-text-secondary rounded-lg p-4 text-center shadow-lg max-w-xs">
              <div className="text-horror-text-primary text-sm">{showNoteFound.content}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <footer className="p-2 border-t border-horror-border bg-horror-bg-secondary/50 flex justify-around">
        <button
          onClick={() => navigate('/inventory')}
          className="p-2 text-horror-text-secondary hover:text-horror-text-primary relative"
        >
          <span className="text-xl">🎒</span>
          <span className="block text-xs">物品</span>
          {inventory.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-horror-accent text-white text-xs rounded-full flex items-center justify-center">
              {inventory.length}
            </span>
          )}
        </button>
        <button
          onClick={() => navigate('/notes')}
          className="p-2 text-horror-text-secondary hover:text-horror-text-primary relative"
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

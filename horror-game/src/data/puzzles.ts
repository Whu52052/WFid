export interface Puzzle {
  id: string
  name: string
  type: 'password' | 'logic' | 'combination' | 'interaction'
  description: string
  hint: string
  solution: string
  reward: {
    items?: string[]
    notes?: string[]
    scenes?: string[]
  }
}

export const puzzles: Puzzle[] = [
  // 序章谜题
  {
    id: 'gate-lock',
    name: '大门密码锁',
    type: 'password',
    description: '大门上有一把四位数字密码锁。邀请函的角落有一行小字..."民国十二年，九月十八日，记得那天的事吗？"',
    hint: '邀请函上的日期可能隐藏着线索...',
    solution: '0918',
    reward: {
      scenes: ['hall'],
    },
  },
  {
    id: 'desk-drawer',
    name: '书桌抽屉',
    type: 'combination',
    description: '书桌上的抽屉被锁住了。锁上刻着一行字："林家的兴盛，始于哪一个年代？"',
    hint: '书房里有很多书籍，也许有关于林家的记载...',
    solution: '1880',
    reward: {
      items: ['diary'],
      notes: ['diary-secret'],
    },
  },
  // 第一章谜题
  {
    id: 'music-box-puzzle',
    name: '八音盒',
    type: 'combination',
    description: '八音盒上有三个旋转的圆筒，每个圆筒上有六个符号。你需要按正确的顺序排列它们。',
    hint: '阁楼里的信件中提到过一首诗..."月落乌啼，霜满天..."',
    solution: '月亮-乌鸦-星星',
    reward: {
      items: ['silver-key'],
      notes: ['love-secret'],
    },
  },
  // 第二章谜题
  {
    id: 'basin-puzzle',
    name: '祭坛凹槽',
    type: 'logic',
    description: '祭坛中央的凹槽需要放入正确的东西。凹槽旁边刻着："以眼还眼，以血还血..."',
    hint: '祭坛上的罐子里似乎装着什么东西...',
    solution: '祭祀之眼',
    reward: {
      scenes: ['secret-room'],
      notes: ['ritual-truth'],
    },
  },
  {
    id: 'talisman-puzzle',
    name: '符咒之谜',
    type: 'password',
    description: '门上的符咒需要正确的顺序激活。符咒上写着："天地人鬼神，五行相生..."',
    hint: '祠堂里的家谱也许有线索...',
    solution: '天地人',
    reward: {
      scenes: ['temple'],
    },
  },
  {
    id: 'well-puzzle',
    name: '古井之秘',
    type: 'combination',
    description: '井口的石栏上刻着八卦符号，但缺了几个。你需要补全它们才能打开井底的密道。',
    hint: '祭司居里的面具也许暗示着什么...',
    solution: '乾坤震巽',
    reward: {
      scenes: ['deep-shrine'],
      notes: ['well-secret'],
    },
  },
  // 最终谜题
  {
    id: 'final-puzzle',
    name: '轮回之匙',
    type: 'logic',
    description: '祭坛上有七根蜡烛，但只有点燃正确的蜡烛才能打开通往自由的门。蜡烛下各有一个字："爱、恨、情、仇、生、死、轮回"',
    hint: '记住你所发现的真相，选择最关键的那个...',
    solution: '轮回',
    reward: {
      scenes: ['choice-room'],
    },
  },
]

export const getPuzzleById = (id: string): Puzzle | undefined => {
  return puzzles.find(p => p.id === id)
}

export const getPuzzlesByScene = (sceneId: string): Puzzle[] => {
  const scenePuzzleIds: { [key: string]: string[] } = {
    'entrance': ['gate-lock'],
    'study': ['desk-drawer'],
    'attic': ['music-box-puzzle'],
    'basement': ['basin-puzzle'],
    'corridor': ['talisman-puzzle'],
    'backyard': ['well-puzzle'],
    'deep-shrine': ['final-puzzle'],
  }
  const puzzleIds = scenePuzzleIds[sceneId] || []
  return puzzles.filter(p => puzzleIds.includes(p.id))
}

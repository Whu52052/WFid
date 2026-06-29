import type { TarotCard, TarotSpread, TarotDrawnCard } from '../../types';

// 22张大阿卡纳牌
export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'fool',
    name: '愚者',
    arcana: 'major',
    number: 0,
    image: '🃏',
    uprightMeaning: '新的开始、天真、冒险、自由、潜力',
    reversedMeaning: '鲁莽、冒险、冲动、天真、失败',
    keywords: ['新开始', '冒险', '自由', '天真'],
    description: '愚者代表着无限的可能性和新的开始。他站在悬崖边，却毫不畏惧，眼神中充满对未来的期待和憧憬。愚者提醒我们要保持初心，勇敢地踏上新的旅程。',
  },
  {
    id: 'magician',
    name: '魔术师',
    arcana: 'major',
    number: 1,
    image: '🎩',
    uprightMeaning: '创造力、技能、意志力、行动、潜力',
    reversedMeaning: '欺骗、操纵、技能不足、拖延',
    keywords: ['创造力', '意志力', '行动', '技能'],
    description: '魔术师拥有将想法变为现实的能力。他的桌上放着四元素的象征，代表他拥有实现目标所需的一切资源。魔术师提醒我们：你已经拥有实现梦想所需的一切。',
  },
  {
    id: 'high-priestess',
    name: '女祭司',
    arcana: 'major',
    number: 2,
    image: '🌙',
    uprightMeaning: '直觉、神秘、内在智慧、潜意识、直觉',
    reversedMeaning: '秘密、表面认知、直觉被忽视',
    keywords: ['直觉', '智慧', '神秘', '潜意识'],
    description: '女祭司代表着深层的直觉和内在的智慧。她安静地坐在两根柱子之间，守护着神秘的知识。女祭司提醒我们：答案就在你内心深处，静下心来倾听。',
  },
  {
    id: 'empress',
    name: '女皇',
    arcana: 'major',
    number: 3,
    image: '👑',
    uprightMeaning: '丰饶、母性、自然、创造力、感官',
    reversedMeaning: '创造力受阻、依赖、空虚、占有欲',
    keywords: ['丰饶', '母性', '创造力', '自然'],
    description: '女皇是丰饶和创造力的象征。她被大自然环绕，孕育着生命和美好。女皇提醒我们：拥抱你的创造力，享受生活的美好，滋养你自己和你爱的人。',
  },
  {
    id: 'emperor',
    name: '皇帝',
    arcana: 'major',
    number: 4,
    image: '🏰',
    uprightMeaning: '权威、结构、控制、父亲形象、稳定',
    reversedMeaning: '暴政、僵化、冷酷、缺乏纪律',
    keywords: ['权威', '稳定', '结构', '领导力'],
    description: '皇帝代表着权威和秩序。他坐在坚固的宝座上，统治着他的王国。皇帝提醒我们：建立稳固的基础，承担责任，用智慧和纪律实现你的目标。',
  },
  {
    id: 'hierophant',
    name: '教皇',
    arcana: 'major',
    number: 5,
    image: '⛪',
    uprightMeaning: '传统、信仰、宗教、指导、学习',
    reversedMeaning: '挑战传统、新的信仰、非常规方法',
    keywords: ['传统', '信仰', '指导', '学习'],
    description: '教皇代表着传统和精神指导。他是连接神与人的桥梁，传授着古老的智慧。教皇提醒我们：寻找导师，学习传统智慧，但也要保持独立思考。',
  },
  {
    id: 'lovers',
    name: '恋人',
    arcana: 'major',
    number: 6,
    image: '💕',
    uprightMeaning: '爱情、关系、价值观、选择、和谐',
    reversedMeaning: '不和谐、失衡、错误的价值观',
    keywords: ['爱情', '选择', '关系', '和谐'],
    description: '恋人牌不仅代表爱情，更代表重要的选择和价值观的抉择。它提醒我们：忠于自己的内心，做出符合你价值观的选择。',
  },
  {
    id: 'chariot',
    name: '战车',
    arcana: 'major',
    number: 7,
    image: '🏇',
    uprightMeaning: '胜利、意志力、决心、控制、成就',
    reversedMeaning: '失控、攻击性、失败、缺乏方向',
    keywords: ['胜利', '意志力', '决心', '掌控'],
    description: '战车代表着意志力的胜利。骑士驾驭着两匹方向相反的马，却能保持平衡和前进。战车提醒我们：用意志力掌控你的人生，坚定地朝着目标前进。',
  },
  {
    id: 'strength',
    name: '力量',
    arcana: 'major',
    number: 8,
    image: '🦁',
    uprightMeaning: '勇气、耐心、同情心、内在力量、控制',
    reversedMeaning: '自我怀疑、软弱、不安全感',
    keywords: ['勇气', '内在力量', '耐心', '温柔'],
    description: '力量牌展现的不是蛮力，而是温柔的力量。女子用爱和耐心驯服了凶猛的狮子。力量提醒我们：真正的力量来自内心，温柔比暴力更有力量。',
  },
  {
    id: 'hermit',
    name: '隐士',
    arcana: 'major',
    number: 9,
    image: '🏮',
    uprightMeaning: '内省、孤独、寻求真理、指引、内在探索',
    reversedMeaning: '孤立、孤独、迷失方向、拒绝帮助',
    keywords: ['内省', '孤独', '智慧', '探索'],
    description: '隐士独自站在山顶，手提灯笼寻找真理。他代表着向内探索和寻求智慧。隐士提醒我们：有时候需要独处，才能找到真正的答案。',
  },
  {
    id: 'wheel-of-fortune',
    name: '命运之轮',
    arcana: 'major',
    number: 10,
    image: '🎡',
    uprightMeaning: '命运、轮回、转折点、机会、变化',
    reversedMeaning: '厄运、抗拒改变、坏运气、恶性循环',
    keywords: ['命运', '变化', '机遇', '轮回'],
    description: '命运之轮象征着生命的起伏和变化。好运不会永远持续，厄运也终会过去。命运之轮提醒我们：接受变化，把握机遇，在起伏中保持平衡。',
  },
  {
    id: 'justice',
    name: '正义',
    arcana: 'major',
    number: 11,
    image: '⚖️',
    uprightMeaning: '公正、真理、因果、平衡、法律',
    reversedMeaning: '不公、逃避责任、不诚实',
    keywords: ['公正', '真理', '平衡', '因果'],
    description: '正义女神手持天平，代表着公正和因果。她的眼睛被蒙上，象征着不偏不倚。正义提醒我们：种瓜得瓜，种豆得豆；做正确的事，承担你的责任。',
  },
  {
    id: 'hanged-man',
    name: '倒吊人',
    arcana: 'major',
    number: 12,
    image: '😌',
    uprightMeaning: '牺牲、换个角度、暂停、放手、新视角',
    reversedMeaning: '抗拒改变、无谓的牺牲、停滞',
    keywords: ['牺牲', '新视角', '暂停', '放手'],
    description: '倒吊人倒挂在树上，却神情平静。他选择了这个位置，以获得新的视角。倒吊人提醒我们：有时候需要停下来，换个角度看问题，放手反而能得到更多。',
  },
  {
    id: 'death',
    name: '死神',
    arcana: 'major',
    number: 13,
    image: '💀',
    uprightMeaning: '结束、转变、重生、放下、新开始',
    reversedMeaning: '抗拒改变、停滞、无法放下',
    keywords: ['转变', '重生', '结束', '新开始'],
    description: '死神牌并不代表肉体的死亡，而是象征着结束和重生。旧的不去，新的不来。死神提醒我们：勇敢地放下过去，迎接生命的新篇章。',
  },
  {
    id: 'temperance',
    name: '节制',
    arcana: 'major',
    number: 14,
    image: '🧪',
    uprightMeaning: '平衡、适度、耐心、炼金术、和谐',
    reversedMeaning: '失衡、过度、缺乏长远眼光',
    keywords: ['平衡', '适度', '耐心', '融合'],
    description: '节制天使将水在两个杯子之间倒来倒去，保持着完美的平衡。节制提醒我们：找到生活的平衡点，耐心地调和，中庸之道才是长久之计。',
  },
  {
    id: 'devil',
    name: '恶魔',
    arcana: 'major',
    number: 15,
    image: '😈',
    uprightMeaning: '束缚、物质主义、成瘾、性、阴影自我',
    reversedMeaning: '解脱、觉醒、克服诱惑',
    keywords: ['束缚', '诱惑', '物质', '阴影'],
    description: '恶魔代表着束缚和诱惑，但他的锁链其实很松，随时可以解开。恶魔提醒我们：你以为的束缚其实是自我设限，你有能力挣脱。',
  },
  {
    id: 'tower',
    name: '高塔',
    arcana: 'major',
    number: 16,
    image: '🗼',
    uprightMeaning: '突变、混乱、觉醒、毁灭、启示',
    reversedMeaning: '避免灾难、恐惧改变、推迟不可避免的事',
    keywords: ['突变', '觉醒', '毁灭', '重建'],
    description: '高塔被闪电击中，人们从顶端坠落。这是一张令人恐惧的牌，但它也代表着虚假基础的崩塌和真相的揭示。高塔提醒我们：有时候破坏是必要的，废墟之上才能建立更坚固的东西。',
  },
  {
    id: 'star',
    name: '星星',
    arcana: 'major',
    number: 17,
    image: '⭐',
    uprightMeaning: '希望、信念、灵感、宁静、疗愈',
    reversedMeaning: '绝望、缺乏信仰、失去希望',
    keywords: ['希望', '灵感', '疗愈', '宁静'],
    description: '在高塔的毁灭之后，星星带来了希望和宁静。女子在星空下倒水，疗愈着大地。星星提醒我们：无论经历了什么，希望永远存在，相信未来会更好。',
  },
  {
    id: 'moon',
    name: '月亮',
    arcana: 'major',
    number: 18,
    image: '🌙',
    uprightMeaning: '幻觉、恐惧、潜意识、直觉、迷惑',
    reversedMeaning: '释放恐惧、压抑情绪、神秘被揭开',
    keywords: ['幻觉', '恐惧', '潜意识', '迷惑'],
    description: '月亮照亮了夜晚，但也带来了阴影和幻觉。狼和狗在嚎叫，龙虾从水中爬出。月亮提醒我们：事物可能不像表面看起来那样，相信你的直觉，穿越恐惧。',
  },
  {
    id: 'sun',
    name: '太阳',
    arcana: 'major',
    number: 19,
    image: '☀️',
    uprightMeaning: '快乐、成功、活力、积极、真理',
    reversedMeaning: '暂时的消沉、不切实际、过度乐观',
    keywords: ['快乐', '成功', '活力', '喜悦'],
    description: '太阳是塔罗牌中最积极的牌之一。阳光普照，孩子快乐地骑在马上，一切都充满生机。太阳提醒我们：保持乐观，享受生活，你正在迎来成功和快乐。',
  },
  {
    id: 'judgement',
    name: '审判',
    arcana: 'major',
    number: 20,
    image: '📯',
    uprightMeaning: '审判、复活、觉醒、召唤、宽恕',
    reversedMeaning: '自我怀疑、拒绝召唤、无法原谅',
    keywords: ['觉醒', '重生', '召唤', '审判'],
    description: '审判号角吹响，死者从坟墓中复活，接受最终的审判。这张牌代表着觉醒和新的开始。审判提醒我们：是时候觉醒了，听从你内心的召唤，获得重生。',
  },
  {
    id: 'world',
    name: '世界',
    arcana: 'major',
    number: 21,
    image: '🌍',
    uprightMeaning: '完成、整合、成就、旅行、圆满',
    reversedMeaning: '未完成、缺乏闭环、停滞',
    keywords: ['完成', '圆满', '成就', '整合'],
    description: '世界牌是大阿卡纳的最后一张，代表着完成和圆满。舞者在花环中舞蹈，四元素的生物环绕四周。世界提醒我们：你已经完成了一个重要的周期，是时候庆祝你的成就，然后开始新的旅程。',
  },
];

// 所有塔罗牌
export const ALL_TAROT_CARDS: TarotCard[] = [...MAJOR_ARCANA];

// 牌阵定义
export const TAROT_SPREADS: Record<TarotSpread, { name: string; description: string; positions: string[]; cardCount: number }> = {
  single: {
    name: '单牌阵',
    description: '抽取一张牌，为你当下的困惑提供指引。简单直接，适合快速占卜。',
    positions: ['当下指引'],
    cardCount: 1,
  },
  'three-card': {
    name: '三牌阵',
    description: '经典的时间流牌阵，揭示过去、现在、未来的发展趋势。',
    positions: ['过去', '现在', '未来'],
    cardCount: 3,
  },
  'love': {
    name: '爱情牌阵',
    description: '为感情问题专门设计的牌阵，洞察对方心意和关系发展。',
    positions: ['你自己', '对方', '关系现状', '挑战', '结果'],
    cardCount: 5,
  },
  'career': {
    name: '事业牌阵',
    description: '为事业和工作问题提供指引，分析现状、挑战和机遇。',
    positions: ['现状', '挑战', '机会', '行动建议', '结果'],
    cardCount: 5,
  },
  'celtic-cross': {
    name: '凯尔特十字',
    description: '最经典最全面的牌阵，深入分析问题的各个层面。',
    positions: ['现状', '影响因素', '潜意识', '过去', '可能性', '近期未来', '自我态度', '外部环境', '希望/恐惧', '最终结果'],
    cardCount: 10,
  },
};

// 洗牌并抽牌
export const drawTarotCards = (spread: TarotSpread, question: string): TarotDrawnCard[] => {
  const spreadInfo = TAROT_SPREADS[spread];
  const shuffled = [...ALL_TAROT_CARDS].sort(() => Math.random() - 0.5);
  
  const drawn: TarotDrawnCard[] = [];
  for (let i = 0; i < spreadInfo.cardCount; i++) {
    drawn.push({
      card: shuffled[i],
      position: spreadInfo.positions[i],
      isReversed: Math.random() > 0.7, // 30%概率逆位
    });
  }
  
  return drawn;
};

// 生成解读
export const generateReading = (cards: TarotDrawnCard[], question: string): string => {
  let reading = '';
  
  reading += `针对你的问题「${question}」，以下是塔罗牌为你带来的指引：\n\n`;
  
  cards.forEach((card, index) => {
    const meaning = card.isReversed ? card.card.reversedMeaning : card.card.uprightMeaning;
    reading += `【${card.position}】：${card.card.name}${card.isReversed ? '（逆位）' : '（正位）'}\n`;
    reading += `${meaning}\n\n`;
  });
  
  reading += `---\n\n`;
  reading += `🌟 综合解读：\n\n`;
  reading += `塔罗牌为你揭示了问题的各个层面。请记住，塔罗牌只是指引，最终的选择和决定在于你自己。相信你的直觉，跟随内心的声音。\n\n`;
  reading += `祝你一切顺利！✨`;
  
  return reading;
};
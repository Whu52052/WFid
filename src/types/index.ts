// ============================================================================
// 趣味测试平台 - 完整类型系统
// ============================================================================

// 测试分类
export type TestCategory = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

// 分类信息
export const CATEGORY_INFO: Record<TestCategory, {
  name: string;
  description: string;
  emoji: string;
  gradient: string;
  iconBg: string;
}> = {
  A: {
    name: '人格与心理',
    description: '深度解析你的内心世界，探索真实的自己',
    emoji: '🧠',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    iconBg: 'bg-violet-500/20'
  },
  B: {
    name: '星座与神秘',
    description: '探索宇宙的奥秘，解读星辰的指引',
    emoji: '✨',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    iconBg: 'bg-blue-500/20'
  },
  C: {
    name: '关系与情感',
    description: '理解你的情感连接，经营美好关系',
    emoji: '💕',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    iconBg: 'bg-pink-500/20'
  },
  D: {
    name: '趣味娱乐',
    description: '放松心情的趣味测试，欢乐不停歇',
    emoji: '🎮',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    iconBg: 'bg-emerald-500/20'
  },
  E: {
    name: '职业与发展',
    description: '规划你的成长路径，解锁职业潜能',
    emoji: '💼',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    iconBg: 'bg-orange-500/20'
  },
  F: {
    name: '生活方式',
    description: '优化你的日常生活，提升幸福感',
    emoji: '🌟',
    gradient: 'from-cyan-500 via-sky-500 to-blue-500',
    iconBg: 'bg-cyan-500/20'
  }
};

// 测试元信息
export interface TestMeta {
  id: string;
  name: string;
  category: TestCategory;
  description: string;
  shortDescription: string;
  questionCount: number;
  estimatedTime: number;
  difficulty: number;
  popularity: number;
  tags: string[];
  isFree: boolean;
  premiumPrice?: number;
  emoji: string;
  gradient: string;
  scoringType: ScoringType;
  dimensions?: string[];
  resultTypes?: string[];
}

export type ScoringType = 
  | 'mbti' 
  | 'bigfive' 
  | 'enneagram' 
  | 'disc'
  | 'percentage' 
  | 'category' 
  | 'zodiac'
  | 'tarot'
  | 'custom';

// 题目
export interface TestQuestion {
  id: string;
  text: string;
  options: TestOption[];
  dimensions?: string[];
  imageUrl?: string;
}

// 选项
export interface TestOption {
  id: string;
  text: string;
  scores: Record<string, number>;
  value?: number;
}

// 测试结果
export interface TestResult {
  type: string;
  title: string;
  emoji: string;
  shortDescription: string;
  detailedDescription: string;
  dimensionScores: Record<string, number>;
  percentages?: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  careerSuggestions?: string[];
  relationshipTips?: string;
  famousPeople?: string[];
  growthPath?: string;
}

// MBTI结果
export interface MBTIResult extends TestResult {
  typeCode: string;
  percentages: {
    E: number; I: number;
    S: number; N: number;
    T: number; F: number;
    J: number; P: number;
  };
  cognitiveFunctions: string[];
}

// Big Five结果
export interface BigFiveResult extends TestResult {
  scores: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  percentiles: Record<string, number>;
}

// 九型人格结果
export interface EnneagramResult extends TestResult {
  typeNumber: number;
  wing: string;
  levelsOfDevelopment: string;
}

// 用户数据
export interface UserData {
  userId: string;
  nickname: string;
  avatar: string;
  isVIP: boolean;
  vipExpiry?: string;
  testHistory: TestRecord[];
  favoriteTests: string[];
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  language: 'zh-CN' | 'en-US';
  fontSize: 'small' | 'medium' | 'large';
  animationsEnabled: boolean;
}

// 测试记录
export interface TestRecord {
  testId: string;
  sessionId: string;
  completedAt: string;
  resultType: string;
  resultTitle: string;
  resultEmoji: string;
  resultData: any;
  isPremium: boolean;
  sharedCount: number;
}

// 测试进度
export interface TestProgress {
  sessionId: string;
  testId: string;
  currentQuestion: number;
  totalQuestions: number;
  answers: Answer[];
  startedAt: string;
  lastUpdated: string;
}

// 答案
export interface Answer {
  questionId: string;
  selectedOptionId: string;
  answeredAt: string;
  optionScores: Record<string, number>;
}

// 星座相关
export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  quality: 'cardinal' | 'fixed' | 'mutable';
  rulingPlanet: string;
  dateRange: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  likes: string[];
  dislikes: string[];
  bestCompatibility: string[];
  worstCompatibility: string[];
  luckyNumbers: number[];
  luckyColor: string;
  description: string;
  lovePersonality: string;
  careerPath: string;
}

// 星座配对
export interface ZodiacMatch {
  sign1: string;
  sign2: string;
  overallScore: number;
  loveScore: number;
  friendshipScore: number;
  workScore: number;
  description: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

// 塔罗牌
export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  suit?: string;
  number: number;
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  description: string;
}

export type TarotSpread = 'single' | 'three-card' | 'celtic-cross' | 'love' | 'career';

export interface TarotReading {
  spread: TarotSpread;
  question: string;
  cards: TarotDrawnCard[];
  interpretation: string;
}

export interface TarotDrawnCard {
  card: TarotCard;
  position: string;
  isReversed: boolean;
}

// 生命灵数
export interface NumerologyResult {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  descriptions: Record<string, string>;
}

// 分享卡片
export interface ShareCardData {
  testName: string;
  resultType: string;
  resultTitle: string;
  resultEmoji: string;
  shortDescription: string;
  dimensionScores?: Record<string, number>;
  userName?: string;
  testUrl: string;
}

// 分页参数
export interface PaginationParams {
  page: number;
  pageSize: number;
  total: number;
}

// 排序选项
export type SortOption = 'popularity' | 'newest' | 'most-taken' | 'rating';

// 全局应用状态
export interface AppState {
  isLoading: boolean;
  currentRoute: string;
  showMobileNav: boolean;
  searchQuery: string;
  selectedCategory: TestCategory | null;
  sortBy: SortOption;
}

// ============================================================================
// 55个测试的完整列表
// ============================================================================
export const ALL_TESTS: TestMeta[] = [
  // A类：人格与心理 (15个)
  {
    id: 'mbti',
    name: 'MBTI人格测试',
    category: 'A',
    description: '基于荣格心理学的专业人格测试，帮你发现真实的自己。通过93道精心设计的题目，深入分析你在四个维度上的偏好倾向。',
    shortDescription: '93题专业版，16种人格类型深度解读',
    questionCount: 93,
    estimatedTime: 15,
    difficulty: 3,
    popularity: 98,
    tags: ['MBTI', '人格', '心理学', '经典', '专业'],
    isFree: true,
    emoji: '🧠',
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    scoringType: 'mbti',
    dimensions: ['外向E', '内向I', '感觉S', '直觉N', '思考T', '情感F', '判断J', '知觉P'],
    resultTypes: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP']
  },
  {
    id: 'sbti',
    name: 'SBTI趣味人格测试',
    category: 'A',
    description: '超火的网络梗人格测试！31道题快速测出你是哪种网络人。包含"吗喽"、"死者"、"伪人"、"现充"等27种趣味类型。',
    shortDescription: '31题快速测，27种网络梗人格',
    questionCount: 31,
    estimatedTime: 5,
    difficulty: 1,
    popularity: 95,
    tags: ['趣味', '社交', '网络梗', '分享必发'],
    isFree: true,
    emoji: '🎮',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    scoringType: 'category'
  },
  {
    id: 'bigfive',
    name: 'Big Five大五人格测试',
    category: 'A',
    description: '心理学界最权威的人格模型之一，从开放性、尽责性、外向性、宜人性、神经质五个维度科学评估你的人格特质。',
    shortDescription: '科学心理学，五维度深度分析',
    questionCount: 60,
    estimatedTime: 10,
    difficulty: 3,
    popularity: 85,
    tags: ['科学', '心理学', '专业', 'OCEAN'],
    isFree: true,
    emoji: '📊',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    scoringType: 'bigfive',
    dimensions: ['开放性', '尽责性', '外向性', '宜人性', '神经质']
  },
  {
    id: 'enneagram',
    name: '九型人格测试',
    category: 'A',
    description: '源自古老智慧的人格体系，深入探索9种核心性格类型及其动机、恐惧和成长路径。发现你的核心型号和翅膀类型。',
    shortDescription: '9型人格，深层动机探索',
    questionCount: 45,
    estimatedTime: 12,
    difficulty: 3,
    popularity: 80,
    tags: ['九型', '灵性', '成长', '自我认知'],
    isFree: true,
    emoji: '⭐',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    scoringType: 'enneagram',
    dimensions: ['1号完美型', '2号助人型', '3号成就型', '4号艺术型', '5号理智型', '6号忠诚型', '7号活跃型', '8号领袖型', '9号和平型']
  },
  {
    id: 'disc',
    name: 'DISC行为风格测试',
    category: 'A',
    description: '全球500强广泛使用的行为评估工具，从支配型、影响型、稳健型、谨慎型四个维度分析你的行为风格和沟通方式。',
    shortDescription: '职场行为分析，500强都在用',
    questionCount: 28,
    estimatedTime: 8,
    difficulty: 2,
    popularity: 75,
    tags: ['DISC', '职场', '行为', '团队'],
    isFree: true,
    emoji: '🎯',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    scoringType: 'disc',
    dimensions: ['支配D', '影响I', '稳健S', '谨慎C']
  },
  {
    id: 'brain-type',
    name: '脑型测试（左脑/右脑）',
    category: 'A',
    description: '测测你是左脑型还是右脑型？左脑偏逻辑分析，右脑偏直觉创造。了解你的思维偏好，找到最适合你的学习和工作方式。',
    shortDescription: '左脑逻辑？右脑创意？',
    questionCount: 20,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 78,
    tags: ['脑科学', '认知', '趣味', '快速'],
    isFree: true,
    emoji: '🧠',
    gradient: 'from-fuchsia-500 via-purple-500 to-violet-500',
    scoringType: 'percentage',
    dimensions: ['左脑', '右脑']
  },
  {
    id: 'color-personality',
    name: '色彩性格测试',
    category: 'A',
    description: '通过直觉选择颜色，揭示你潜意识中的性格特质。色彩心理学认为，你对颜色的偏好反映了你真实的内心世界。',
    shortDescription: '色彩心理学，直觉选择测试',
    questionCount: 15,
    estimatedTime: 2,
    difficulty: 1,
    popularity: 70,
    tags: ['色彩', '心理学', '直觉', '快速'],
    isFree: true,
    emoji: '🎨',
    gradient: 'from-pink-500 via-purple-500 to-indigo-500',
    scoringType: 'category'
  },
  {
    id: 'animal-personality',
    name: '动物人格测试',
    category: 'A',
    description: '你像哪种动物？50+种动物类型，生动形象地解读你的性格特征。从凶猛的狮子到机灵的狐狸，找到属于你的动物原型。',
    shortDescription: '50+动物类型，趣味人格分析',
    questionCount: 25,
    estimatedTime: 4,
    difficulty: 1,
    popularity: 88,
    tags: ['动物', '趣味', '人格', '社交'],
    isFree: true,
    emoji: '🦁',
    gradient: 'from-amber-500 via-yellow-500 to-lime-500',
    scoringType: 'category'
  },
  {
    id: 'hsp',
    name: 'HSP高敏感人群测试',
    category: 'A',
    description: '你是高敏感人群吗？高敏感人群（HSP）拥有更深度的处理信息能力和更强的情绪反应。来测测你的敏感程度吧。',
    shortDescription: '高敏感特质评估',
    questionCount: 27,
    estimatedTime: 5,
    difficulty: 2,
    popularity: 65,
    tags: ['HSP', '敏感', '心理', '自我认知'],
    isFree: true,
    emoji: '🌸',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    scoringType: 'percentage'
  },
  {
    id: 'attachment-style',
    name: '依恋类型测试',
    category: 'A',
    description: '探索你的依恋风格——安全型、焦虑型、回避型还是恐惧型？了解早年依恋模式如何影响你现在的亲密关系。',
    shortDescription: '四种依恋风格，关系模式分析',
    questionCount: 30,
    estimatedTime: 6,
    difficulty: 2,
    popularity: 72,
    tags: ['依恋', '关系', '心理', '情感'],
    isFree: true,
    emoji: '💝',
    gradient: 'from-rose-500 via-red-500 to-orange-500',
    scoringType: 'category',
    dimensions: ['安全型', '焦虑型', '回避型', '恐惧型']
  },
  {
    id: 'eq-test',
    name: '情绪智力EQ测试',
    category: 'A',
    description: '情商（EQ）比智商（IQ）更能预测人生成功。测试你的五大情商维度——自我觉察、自我管理、社交觉察、关系管理、情绪运用。',
    shortDescription: '五大情商维度评估',
    questionCount: 40,
    estimatedTime: 8,
    difficulty: 2,
    popularity: 76,
    tags: ['情商', 'EQ', '情绪', '社交'],
    isFree: true,
    emoji: '😇',
    gradient: 'from-yellow-500 via-amber-500 to-orange-500',
    scoringType: 'percentage',
    dimensions: ['自我觉察', '自我管理', '社交觉察', '关系管理', '情绪运用']
  },
  {
    id: 'stress-test',
    name: '压力指数测试',
    category: 'A',
    description: '你现在的压力有多大？通过专业心理量表评估你当前的压力水平，识别压力来源，并获得科学的缓解策略建议。',
    shortDescription: '当前压力水平评估',
    questionCount: 20,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 82,
    tags: ['压力', '心理', '健康', '快测'],
    isFree: true,
    emoji: '😰',
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    scoringType: 'percentage'
  },
  {
    id: 'self-esteem',
    name: '自尊水平测试',
    category: 'A',
    description: '你的自信程度如何？罗森伯格自尊量表（RSES）是心理学界最经典的自尊测量工具，帮你了解真实的自我价值感。',
    shortDescription: '经典罗森伯格自尊量表',
    questionCount: 10,
    estimatedTime: 2,
    difficulty: 1,
    popularity: 68,
    tags: ['自尊', '自信', '心理学', '经典'],
    isFree: true,
    emoji: '💪',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    scoringType: 'percentage'
  },
  {
    id: 'resilience',
    name: '心理韧性测试',
    category: 'A',
    description: '面对逆境时，你有多强的恢复力？心理韧性是抗压能力的核心指标。测试你的韧性水平，获得成长型思维提升建议。',
    shortDescription: '抗压恢复力评估',
    questionCount: 25,
    estimatedTime: 5,
    difficulty: 2,
    popularity: 60,
    tags: ['韧性', '抗压', '成长', '心理'],
    isFree: true,
    emoji: '🏋️',
    gradient: 'from-indigo-500 via-blue-500 to-cyan-500',
    scoringType: 'percentage'
  },
  {
    id: 'mental-drain',
    name: '内耗指数测试',
    category: 'A',
    description: '你是不是经常想太多、精神内耗严重？测试你的内耗程度，识别思维陷阱，学会为自己的心灵减负。',
    shortDescription: '精神内耗程度评估',
    questionCount: 18,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 90,
    tags: ['内耗', '心理', '焦虑', '自我成长'],
    isFree: true,
    emoji: '🌀',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    scoringType: 'percentage'
  },

  // B类：星座与神秘学 (12个)
  {
    id: 'zodiac-personality',
    name: '星座完整分析',
    category: 'B',
    description: '你的太阳星座是什么？深度解读12星座的性格特质、优点缺点、爱情观、事业方向。更有月亮星座和上升星座分析！',
    shortDescription: '12星座深度性格解读',
    questionCount: 12,
    estimatedTime: 2,
    difficulty: 1,
    popularity: 96,
    tags: ['星座', '性格', '太阳星座', '经典'],
    isFree: true,
    emoji: '✨',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    scoringType: 'zodiac'
  },
  {
    id: 'zodiac-match',
    name: '星座配对分析',
    category: 'B',
    description: '你和TA的星座配吗？输入两个星座，获取爱情、友情、事业三维度配对指数，详细的相处建议和化解冲突方案。',
    shortDescription: '12x12星座配对指数',
    questionCount: 2,
    estimatedTime: 1,
    difficulty: 1,
    popularity: 97,
    tags: ['星座', '配对', '爱情', '关系'],
    isFree: true,
    emoji: '💕',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    scoringType: 'zodiac'
  },
  {
    id: 'zodiac-fortune',
    name: '每日星座运势',
    category: 'B',
    description: '查看今天、本周、本月、本年的星座运势！爱情运、事业运、财运、健康运全面解析，还有幸运数字和幸运色哦。',
    shortDescription: '日/周/月/年运势预测',
    questionCount: 2,
    estimatedTime: 1,
    difficulty: 1,
    popularity: 94,
    tags: ['运势', '星座', '每日', '幸运数字'],
    isFree: true,
    emoji: '🌟',
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    scoringType: 'zodiac'
  },
  {
    id: 'moon-sign',
    name: '月亮星座深度分析',
    category: 'B',
    description: '太阳星座是外在表现，月亮星座才是内在真实的你！探索你的月亮星座，揭示潜意识深处的情感需求和情绪模式。',
    shortDescription: '内在情感需求分析',
    questionCount: 12,
    estimatedTime: 3,
    difficulty: 2,
    popularity: 75,
    tags: ['月亮星座', '潜意识', '情感', '内在'],
    isFree: true,
    emoji: '🌙',
    gradient: 'from-indigo-500 via-purple-500 to-violet-500',
    scoringType: 'zodiac'
  },
  {
    id: 'rising-sign',
    name: '上升星座分析',
    category: 'B',
    description: '上升星座是你的人格面具，决定了别人对你的第一印象。探索你的上升星座，了解你对外展示的形象和社交风格。',
    shortDescription: '外在形象与第一印象',
    questionCount: 12,
    estimatedTime: 3,
    difficulty: 2,
    popularity: 72,
    tags: ['上升星座', '形象', '社交', '面具'],
    isFree: true,
    emoji: '👤',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    scoringType: 'zodiac'
  },
  {
    id: 'tarot-single',
    name: '塔罗牌单牌占卜',
    category: 'B',
    description: '抽一张塔罗牌，为你当下的困惑指引方向。78张完整塔罗牌库，正逆位解读，为生活中的问题提供启示。',
    shortDescription: '单牌快速占卜指引',
    questionCount: 1,
    estimatedTime: 1,
    difficulty: 1,
    popularity: 85,
    tags: ['塔罗', '占卜', '指引', '单牌'],
    isFree: true,
    emoji: '🃏',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    scoringType: 'tarot'
  },
  {
    id: 'tarot-three',
    name: '塔罗牌三牌阵',
    category: 'B',
    description: '经典三牌阵——过去、现在、未来。三张牌为你揭示事件的来龙去脉，帮你看清局势，做出更好的选择。',
    shortDescription: '过去现在未来三牌阵',
    questionCount: 1,
    estimatedTime: 2,
    difficulty: 2,
    popularity: 82,
    tags: ['塔罗', '三牌阵', '时间流', '深度'],
    isFree: true,
    emoji: '🎴',
    gradient: 'from-violet-500 via-purple-500 to-indigo-500',
    scoringType: 'tarot'
  },
  {
    id: 'tarot-love',
    name: '塔罗牌爱情占卜',
    category: 'B',
    description: '他/她对你的心意如何？这段感情会怎样发展？专用爱情牌阵为你揭示感情的真相，洞察对方的想法。',
    shortDescription: '感情发展与对方心意',
    questionCount: 1,
    estimatedTime: 2,
    difficulty: 2,
    popularity: 88,
    tags: ['塔罗', '爱情', '感情', '恋爱'],
    isFree: true,
    emoji: '💕',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    scoringType: 'tarot'
  },
  {
    id: 'numerology',
    name: '生命灵数分析',
    category: 'B',
    description: '通过你的出生日期和姓名，计算五大核心数字——生命路径、表达数、灵魂 urge、个性数、生日数。揭示你的天赋与使命。',
    shortDescription: '五大核心数字解读',
    questionCount: 3,
    estimatedTime: 2,
    difficulty: 2,
    popularity: 68,
    tags: ['灵数', '数字命理学', '生日', '天赋'],
    isFree: true,
    emoji: '🔢',
    gradient: 'from-cyan-500 via-teal-500 to-emerald-500',
    scoringType: 'custom'
  },
  {
    id: 'chakra-test',
    name: '脉轮能量测试',
    category: 'B',
    description: '你身体的七大脉轮能量平衡吗？测试每个脉轮的活跃程度，找出堵塞的能量中心，获得平衡建议。',
    shortDescription: '7大脉轮能量评估',
    questionCount: 35,
    estimatedTime: 6,
    difficulty: 2,
    popularity: 55,
    tags: ['脉轮', '能量', '灵性', '平衡'],
    isFree: true,
    emoji: '🌈',
    gradient: 'from-red-500 via-yellow-500 to-blue-500',
    scoringType: 'percentage',
    dimensions: ['海底轮', '脐轮', '太阳神经丛', '心轮', '喉轮', '眉心轮', '顶轮']
  },
  {
    id: 'aura-color',
    name: '气场颜色测试',
    category: 'B',
    description: '每个人都有独特的气场颜色，它反映了你的能量状态、人格特质和灵性发展水平。来看看你的气场是什么颜色吧！',
    shortDescription: '能量场颜色分析',
    questionCount: 15,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 70,
    tags: ['气场', '能量', '灵视', '趣味'],
    isFree: true,
    emoji: '💫',
    gradient: 'from-fuchsia-500 via-violet-500 to-blue-500',
    scoringType: 'category'
  },
  {
    id: 'birth-chart',
    name: '星盘生成器',
    category: 'B',
    description: '输入你的出生信息，生成专属的个人星盘图。包含行星位置、宫位分布、相位关系，提供详细的星盘解读报告。',
    shortDescription: '个人专属星盘生成',
    questionCount: 5,
    estimatedTime: 3,
    difficulty: 3,
    popularity: 78,
    tags: ['星盘', '占星', '出生图', '专业'],
    isFree: true,
    emoji: '🌌',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    scoringType: 'custom'
  },

  // C类：关系与情感 (10个)
  {
    id: 'love-style',
    name: '恋爱风格测试',
    category: 'C',
    description: '你在恋爱中是什么样子的？五种恋爱风格——奉献型、掌控型、依赖型、回避型、成长型，找到属于你的恋爱模式。',
    shortDescription: '五种恋爱类型识别',
    questionCount: 25,
    estimatedTime: 5,
    difficulty: 2,
    popularity: 85,
    tags: ['恋爱', '风格', '关系', '情感'],
    isFree: true,
    emoji: '💕',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    scoringType: 'category',
    dimensions: ['奉献型', '掌控型', '依赖型', '回避型', '成长型']
  },
  {
    id: 'love-language',
    name: '爱情语言测试',
    category: 'C',
    description: '每个人感受爱的方式不同。五种爱的语言——肯定的言词、精心的时刻、接受礼物、服务的行动、身体的接触。你是哪一种？',
    shortDescription: '盖瑞·查普曼五种爱语',
    questionCount: 30,
    estimatedTime: 6,
    difficulty: 2,
    popularity: 90,
    tags: ['爱情语言', '爱语', '关系', '沟通'],
    isFree: true,
    emoji: '❤️',
    gradient: 'from-red-500 via-pink-500 to-rose-500',
    scoringType: 'bigfive',
    dimensions: ['肯定言词', '精心时刻', '接受礼物', '服务行动', '身体接触']
  },
  {
    id: 'relationship-satisfaction',
    name: '关系满意度评估',
    category: 'C',
    description: '你对目前的感情关系满意吗？从沟通、亲密、信任、共同成长等多维度评估关系质量，识别问题区域，获得改善建议。',
    shortDescription: '多维度关系质量评估',
    questionCount: 20,
    estimatedTime: 4,
    difficulty: 2,
    popularity: 72,
    tags: ['关系', '满意度', '感情', '评估'],
    isFree: true,
    emoji: '💑',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    scoringType: 'percentage',
    dimensions: ['沟通', '亲密', '信任', '共同成长', '冲突处理']
  },
  {
    id: 'friendship-quality',
    name: '友情质量测试',
    category: 'C',
    description: '你的友谊质量如何？评估你和朋友之间的信任度、支持度、相处时间、共同兴趣等维度，了解你当前的友情状态。',
    shortDescription: '朋友关系质量评估',
    questionCount: 18,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 60,
    tags: ['友情', '朋友', '关系', '社交'],
    isFree: true,
    emoji: '👯',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    scoringType: 'percentage'
  },
  {
    id: 'family-relationship',
    name: '家庭关系测试',
    category: 'C',
    description: '你的家庭氛围如何？从家庭成员沟通、情感支持、家庭规则、冲突处理等方面评估家庭关系健康度。',
    shortDescription: '家庭氛围与关系评估',
    questionCount: 22,
    estimatedTime: 4,
    difficulty: 2,
    popularity: 58,
    tags: ['家庭', '关系', '亲情', '沟通'],
    isFree: true,
    emoji: '👨‍👩‍👧‍👦',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    scoringType: 'percentage'
  },
  {
    id: 'social-style',
    name: '人际关系风格测试',
    category: 'C',
    description: '你是社交达人还是社恐患者？了解你的人际互动模式、社交能量来源、人际交往偏好，找到最适合你的社交方式。',
    shortDescription: '社交倾向与互动模式',
    questionCount: 24,
    estimatedTime: 4,
    difficulty: 1,
    popularity: 75,
    tags: ['社交', '人际', '风格', '社恐'],
    isFree: true,
    emoji: '🤝',
    gradient: 'from-teal-500 via-cyan-500 to-sky-500',
    scoringType: 'category'
  },
  {
    id: 'trust-level',
    name: '信任度测试',
    category: 'C',
    description: '你容易相信别人吗？还是总是保持警惕？测试你的一般信任水平和人际信任模式，了解信任如何影响你的关系。',
    shortDescription: '信任能力与模式分析',
    questionCount: 20,
    estimatedTime: 3,
    difficulty: 2,
    popularity: 55,
    tags: ['信任', '人际', '心理', '关系'],
    isFree: true,
    emoji: '🤲',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    scoringType: 'percentage'
  },
  {
    id: 'communication-style',
    name: '沟通风格测试',
    category: 'C',
    description: '你是怎么和人沟通的？是直接型、委婉型、理性型还是情感型？了解自己的沟通风格，提升沟通效率和人际关系质量。',
    shortDescription: '沟通方式与表达风格',
    questionCount: 20,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 65,
    tags: ['沟通', '表达', '人际', '职场'],
    isFree: true,
    emoji: '💬',
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    scoringType: 'category'
  },
  {
    id: 'intimacy-fear',
    name: '亲密关系恐惧测试',
    category: 'C',
    description: '你害怕亲密关系吗？深入了解你对亲密的恐惧程度，识别情感防御机制，学习如何敞开心扉，建立健康的亲密关系。',
    shortDescription: '亲密障碍与防御机制',
    questionCount: 22,
    estimatedTime: 4,
    difficulty: 2,
    popularity: 70,
    tags: ['亲密', '恐惧', '情感', '关系'],
    isFree: true,
    emoji: '😨',
    gradient: 'from-slate-500 via-gray-500 to-zinc-500',
    scoringType: 'percentage'
  },
  {
    id: 'crush-index',
    name: '心动指数测试',
    category: 'C',
    description: '你对TA是真心喜欢还是一时好感？通过20道题测出你对某人的真实心动程度，帮你认清自己的心意。',
    shortDescription: '好感度与心动程度',
    questionCount: 20,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 88,
    tags: ['心动', '喜欢', '暗恋', '恋爱'],
    isFree: true,
    emoji: '💓',
    gradient: 'from-pink-500 via-red-500 to-orange-500',
    scoringType: 'percentage'
  },

  // D类：趣味娱乐 (8个)
  {
    id: 'anime-character',
    name: '动漫角色匹配测试',
    category: 'D',
    description: '你最像哪个动漫角色？100+热门动漫人物库，从性格、行为、价值观多维度匹配，找到你的动漫灵魂角色！',
    shortDescription: '100+动漫角色匹配',
    questionCount: 20,
    estimatedTime: 4,
    difficulty: 1,
    popularity: 92,
    tags: ['动漫', '二次元', '趣味', '匹配'],
    isFree: true,
    emoji: '🎭',
    gradient: 'from-pink-500 via-fuchsia-500 to-purple-500',
    scoringType: 'category'
  },
  {
    id: 'which-animal',
    name: '你是哪种动物测试',
    category: 'D',
    description: '如果把你比作一种动物，你会是什么？50+种动物类型，从生存本能、社交方式、性格特征全面分析你的动物原型。',
    shortDescription: '50+动物原型匹配',
    questionCount: 18,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 85,
    tags: ['动物', '趣味', '人格', '社交'],
    isFree: true,
    emoji: '🦊',
    gradient: 'from-amber-500 via-yellow-500 to-lime-500',
    scoringType: 'category'
  },
  {
    id: 'past-life',
    name: '你的前世是谁测试',
    category: 'D',
    description: '你的前世是古代皇帝、江湖侠客、文人墨客还是青楼女子？趣味穿越设定，为你生成一段精彩的前世故事！',
    shortDescription: '前世身份趣味测试',
    questionCount: 15,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 80,
    tags: ['前世', '穿越', '趣味', '故事'],
    isFree: true,
    emoji: '⏳',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    scoringType: 'category'
  },
  {
    id: 'team-role',
    name: '你在团队中的角色',
    category: 'D',
    description: '你是团队中的领导者、创意担当、实干家还是润滑剂？测测你在团队中最擅长扮演什么角色，发现你的团队价值。',
    shortDescription: '团队角色定位',
    questionCount: 18,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 70,
    tags: ['团队', '角色', '职场', '趣味'],
    isFree: true,
    emoji: '👥',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    scoringType: 'category'
  },
  {
    id: 'hidden-talent',
    name: '你的隐藏技能是什么',
    category: 'D',
    description: '每个人都有自己不知道的天赋！这个测试帮你发掘潜在的隐藏技能，找到你最容易取得成就的领域。',
    shortDescription: '潜能天赋发现',
    questionCount: 20,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 78,
    tags: ['天赋', '潜能', '技能', '发现'],
    isFree: true,
    emoji: '✨',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    scoringType: 'category'
  },
  {
    id: 'island-survival',
    name: '荒岛求生测试',
    category: 'D',
    description: '如果把你扔到荒岛上，你能活多久？测试你的生存技能、应急反应、决策能力，看看你是求生大神还是第一个挂掉的人。',
    shortDescription: '生存技能与应变能力',
    questionCount: 20,
    estimatedTime: 4,
    difficulty: 2,
    popularity: 72,
    tags: ['生存', '荒岛', '趣味', '挑战'],
    isFree: true,
    emoji: '🏝️',
    gradient: 'from-teal-500 via-emerald-500 to-green-500',
    scoringType: 'percentage'
  },
  {
    id: 'soul-color',
    name: '你的灵魂颜色测试',
    category: 'D',
    description: '每个人的灵魂都有独特的颜色。红色灵魂热情奔放，蓝色灵魂深邃内敛...你的灵魂是什么颜色？',
    shortDescription: '精神能量颜色分析',
    questionCount: 15,
    estimatedTime: 2,
    difficulty: 1,
    popularity: 82,
    tags: ['灵魂', '颜色', '趣味', '灵性'],
    isFree: true,
    emoji: '🌈',
    gradient: 'from-red-500 via-yellow-500 to-blue-500',
    scoringType: 'category'
  },
  {
    id: 'parallel-world',
    name: '平行世界身份测试',
    category: 'D',
    description: '在另一个平行宇宙里，你过着怎样的人生？是魔法世界的魔法师、赛博朋克的黑客，还是宫廷中的贵族？',
    shortDescription: '异世界身份设定',
    questionCount: 12,
    estimatedTime: 2,
    difficulty: 1,
    popularity: 76,
    tags: ['平行世界', '异世界', '设定', '趣味'],
    isFree: true,
    emoji: '🌀',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    scoringType: 'category'
  },

  // E类：职业与发展 (6个)
  {
    id: 'career-interest',
    name: '职业兴趣测试',
    category: 'E',
    description: '基于霍兰德（Holland）职业兴趣理论，从现实型、研究型、艺术型、社会型、企业型、常规型六个维度评估你的职业兴趣。',
    shortDescription: '霍兰德职业兴趣理论',
    questionCount: 48,
    estimatedTime: 10,
    difficulty: 2,
    popularity: 78,
    tags: ['职业', '兴趣', 'Holland', '规划'],
    isFree: true,
    emoji: '💼',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    scoringType: 'bigfive',
    dimensions: ['现实型R', '研究型I', '艺术型A', '社会型S', '企业型E', '常规型C']
  },
  {
    id: 'work-values',
    name: '职场价值观测试',
    category: 'E',
    description: '对你来说，工作中最重要的是什么？高薪？成长？稳定？还是自由？测试你的核心工作价值观，找到最适合你的职场环境。',
    shortDescription: '工作价值观排序',
    questionCount: 24,
    estimatedTime: 5,
    difficulty: 2,
    popularity: 68,
    tags: ['职场', '价值观', '工作', '选择'],
    isFree: true,
    emoji: '🏢',
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    scoringType: 'category'
  },
  {
    id: 'leadership-assessment',
    name: '领导力评估',
    category: 'E',
    description: '你有领导者的潜质吗？从战略思维、沟通协调、决策能力、团队激励等多维度评估你的领导力水平，发现你的领导风格。',
    shortDescription: '领导风格与能力评估',
    questionCount: 30,
    estimatedTime: 6,
    difficulty: 3,
    popularity: 62,
    tags: ['领导力', '管理', '职场', '团队'],
    isFree: true,
    emoji: '👑',
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    scoringType: 'percentage',
    dimensions: ['战略思维', '沟通协调', '决策能力', '团队激励', '执行能力']
  },
  {
    id: 'entrepreneur-potential',
    name: '创业潜能测试',
    category: 'E',
    description: '你适合创业吗？从创新思维、风险承受、行动力、领导力等维度评估你的创业潜质，看看你有没有老板命。',
    shortDescription: '创业特质与潜力评估',
    questionCount: 25,
    estimatedTime: 5,
    difficulty: 2,
    popularity: 65,
    tags: ['创业', '潜能', '商业', '风险'],
    isFree: true,
    emoji: '🚀',
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    scoringType: 'percentage'
  },
  {
    id: 'learning-style',
    name: '学习能力测试',
    category: 'E',
    description: '你是视觉型、听觉型还是动觉型学习者？了解你的学习风格和认知优势，找到最适合你的学习方法，提升学习效率。',
    shortDescription: '学习风格与认知优势',
    questionCount: 20,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 72,
    tags: ['学习', '风格', '效率', '成长'],
    isFree: true,
    emoji: '📚',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    scoringType: 'category'
  },
  {
    id: 'time-management',
    name: '时间管理能力测试',
    category: 'E',
    description: '你的时间管理能力如何？从计划制定、优先级判断、拖延程度、执行效率等方面评估你的时间管理水平。',
    shortDescription: '时间使用效率评估',
    questionCount: 20,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 70,
    tags: ['时间管理', '效率', '拖延', '自律'],
    isFree: true,
    emoji: '⏰',
    gradient: 'from-lime-500 via-green-500 to-emerald-500',
    scoringType: 'percentage'
  },

  // F类：生活方式 (4个)
  {
    id: 'life-habits',
    name: '生活习惯测试',
    category: 'F',
    description: '你的生活习惯健康吗？从作息、饮食、运动、心理健康等多维度评估你的生活方式健康度，获得个性化改善建议。',
    shortDescription: '生活方式健康度评估',
    questionCount: 25,
    estimatedTime: 4,
    difficulty: 1,
    popularity: 65,
    tags: ['生活习惯', '健康', '作息', '饮食'],
    isFree: true,
    emoji: '🏃',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    scoringType: 'percentage'
  },
  {
    id: 'sleep-quality',
    name: '睡眠质量测试',
    category: 'F',
    description: '你的睡眠质量好吗？使用匹兹堡睡眠质量指数（PSQI）评估你的睡眠质量，识别睡眠问题，获得科学的睡眠改善建议。',
    shortDescription: 'PSQI睡眠质量评估',
    questionCount: 18,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 78,
    tags: ['睡眠', '健康', 'PSQI', '失眠'],
    isFree: true,
    emoji: '😴',
    gradient: 'from-indigo-500 via-purple-500 to-violet-500',
    scoringType: 'percentage'
  },
  {
    id: 'spending-style',
    name: '消费风格测试',
    category: 'F',
    description: '你是月光族还是存钱达人？测试你的消费观念和理财风格，了解你的金钱观，获得适合你的消费和理财建议。',
    shortDescription: '消费习惯与理财风格',
    questionCount: 20,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 68,
    tags: ['消费', '理财', '金钱观', '生活'],
    isFree: true,
    emoji: '💰',
    gradient: 'from-yellow-500 via-amber-500 to-orange-500',
    scoringType: 'category'
  },
  {
    id: 'travel-style',
    name: '旅行风格测试',
    category: 'F',
    description: '你是哪种旅行者？是背包客、度假派、美食家还是文化探索者？了解你的旅行偏好，为你推荐最适合的目的地。',
    shortDescription: '旅行偏好与目的地推荐',
    questionCount: 15,
    estimatedTime: 3,
    difficulty: 1,
    popularity: 72,
    tags: ['旅行', '风格', '目的地', '兴趣'],
    isFree: true,
    emoji: '✈️',
    gradient: 'from-sky-500 via-cyan-500 to-teal-500',
    scoringType: 'category'
  }
];

// 获取测试元信息
export const getTestById = (id: string): TestMeta | undefined => {
  return ALL_TESTS.find(t => t.id === id);
};

// 按分类获取测试
export const getTestsByCategory = (category: TestCategory): TestMeta[] => {
  return ALL_TESTS.filter(t => t.category === category);
};
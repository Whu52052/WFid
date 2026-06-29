import type { ZodiacSign, ZodiacMatch } from '../../types';

// 12星座完整数据
export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    name: '白羊座',
    symbol: '♈',
    element: 'fire',
    quality: 'cardinal',
    rulingPlanet: '火星',
    dateRange: '3月21日 - 4月19日',
    traits: ['热情', '勇敢', '直接', '冲动', '乐观', '好胜'],
    strengths: ['有冲劲', '行动力强', '勇敢无畏', '乐观向上', '诚实直率', '有领导力'],
    weaknesses: ['急躁冲动', '缺乏耐心', '容易发怒', '好斗', '粗心大意', '自我中心'],
    likes: ['挑战', '冒险', '比赛', '新事物', '领导', '自由'],
    dislikes: ['等待', '被限制', '被忽视', '失败', '无聊', '弱者'],
    bestCompatibility: ['leo', 'sagittarius', 'gemini', 'aquarius'],
    worstCompatibility: ['cancer', 'capricorn', 'libra'],
    luckyNumbers: [1, 9, 18, 27],
    luckyColor: '红色',
    description: '白羊座是黄道第一宫，象征着新生和开始。白羊座的人充满活力和勇气，喜欢挑战和冒险。他们直接坦率，有什么说什么，从不拐弯抹角。白羊座的人天生具有领导才能，喜欢冲锋在前，但有时会显得冲动和急躁。',
    lovePersonality: '白羊座在爱情中热情直接，喜欢谁就会主动追求。他们爱得轰轰烈烈，但可能来得快去得也快。他们需要一个能跟上他们节奏、同样充满活力的伴侣。',
    careerPath: '白羊座适合有挑战性的工作，如企业家、运动员、军人、消防员、销售人员等需要勇气和行动力的职业。',
  },
  {
    id: 'taurus',
    name: '金牛座',
    symbol: '♉',
    element: 'earth',
    quality: 'fixed',
    rulingPlanet: '金星',
    dateRange: '4月20日 - 5月20日',
    traits: ['稳重', '务实', '耐心', '固执', '感官', '忠诚'],
    strengths: ['踏实可靠', '有耐心', '忠诚专一', '感官敏锐', '理财能力强', '持之以恒'],
    weaknesses: ['固执倔强', '占有欲强', '过于务实', '不喜欢改变', '懒惰', '物质主义'],
    likes: ['美食', '舒适', '美丽事物', '金钱', '稳定', '自然'],
    dislikes: ['变化', '不稳定', '被催促', '贫穷', '嘈杂', '混乱'],
    bestCompatibility: ['virgo', 'capricorn', 'cancer', 'pisces'],
    worstCompatibility: ['leo', 'aquarius', 'aries'],
    luckyNumbers: [2, 6, 15, 24],
    luckyColor: '绿色',
    description: '金牛座是稳重务实的代表，追求稳定和安全感。金牛座的人脚踏实地，有耐心和毅力，一旦决定的事情就会坚持到底。他们对美食、艺术和美好的事物有独特的品味。金牛座的人虽然平时温和，但一旦被激怒会非常固执。',
    lovePersonality: '金牛座在爱情中忠诚专一，占有欲强。他们是慢热型，但一旦爱上就会非常投入。他们喜欢稳定的关系，不喜欢变化和不确定。',
    careerPath: '金牛座适合金融、艺术、美食、农业等领域，如银行家、厨师、艺术家、农民、会计师等。',
  },
  {
    id: 'gemini',
    name: '双子座',
    symbol: '♊',
    element: 'air',
    quality: 'mutable',
    rulingPlanet: '水星',
    dateRange: '5月21日 - 6月21日',
    traits: ['聪明', '善变', '好奇', '社交', '多才多艺', '机智'],
    strengths: ['机智聪明', '沟通能力强', '适应力强', '好奇心强', '多才多艺', '幽默风趣'],
    weaknesses: ['善变', '三心二意', '容易分心', '不够深入', '话多', '难以专注'],
    likes: ['聊天', '阅读', '旅行', '学习新事物', '社交', '变化'],
    dislikes: ['无聊', '单调', '沉闷', '被束缚', '例行公事', '愚蠢的人'],
    bestCompatibility: ['libra', 'aquarius', 'leo', 'aries'],
    worstCompatibility: ['virgo', 'pisces', 'cancer'],
    luckyNumbers: [3, 5, 12, 21],
    luckyColor: '黄色',
    description: '双子座是风象星座的代表，思维敏捷，善于沟通。双子座的人好奇心强，对什么都感兴趣，但也容易三分钟热度。他们机智幽默，能言善辩，是社交场合的宠儿。双子座的人有两面性，有时让人捉摸不透。',
    lovePersonality: '双子座在爱情中追求新鲜感和刺激，讨厌沉闷的关系。他们需要一个能和他们智力交流、一起探索世界的伴侣。他们的爱情充满趣味和变化。',
    careerPath: '双子座适合沟通和信息相关的工作，如记者、编辑、教师、销售人员、公关、翻译等。',
  },
  {
    id: 'cancer',
    name: '巨蟹座',
    symbol: '♋',
    element: 'water',
    quality: 'cardinal',
    rulingPlanet: '月亮',
    dateRange: '6月22日 - 7月22日',
    traits: ['敏感', '温柔', '顾家', '情绪化', '保护欲强', '怀旧'],
    strengths: ['体贴入微', '有同情心', '重视家庭', '忠诚', '直觉强', '有保护欲'],
    weaknesses: ['情绪化', '敏感多疑', '怀旧', '容易受伤', '依赖性强', '缺乏安全感'],
    likes: ['家', '家人', '美食', '回忆', '水', '照顾别人'],
    dislikes: ['被拒绝', '不安全感', '批评', '孤独', '陌生人', '冲突'],
    bestCompatibility: ['scorpio', 'pisces', 'taurus', 'virgo'],
    worstCompatibility: ['aries', 'libra', 'capricorn'],
    luckyNumbers: [2, 7, 11, 20],
    luckyColor: '白色',
    description: '巨蟹座是最顾家的星座，温柔敏感，有强烈的保护欲。巨蟹座的人重视家庭和亲情，对所爱之人非常体贴和关怀。他们有很强的直觉，但也容易情绪化。巨蟹座的人外表坚硬，内心柔软，像螃蟹一样用壳保护自己柔软的内心。',
    lovePersonality: '巨蟹座在爱情中非常温柔体贴，把爱人照顾得无微不至。他们需要安全感，容易缺乏自信。他们是最忠诚的伴侣之一，但也容易过度依赖。',
    careerPath: '巨蟹座适合照顾和关怀类的工作，如护士、幼教、厨师、社工、人力资源、心理咨询师等。',
  },
  {
    id: 'leo',
    name: '狮子座',
    symbol: '♌',
    element: 'fire',
    quality: 'fixed',
    rulingPlanet: '太阳',
    dateRange: '7月23日 - 8月22日',
    traits: ['自信', '大方', '热情', '骄傲', '有创造力', '领导力强'],
    strengths: ['自信大方', '有领导力', '慷慨大方', '热情洋溢', '创造力强', '正直勇敢'],
    weaknesses: ['骄傲自大', '虚荣心强', '自我中心', '爱面子', '控制欲强', '不能接受批评'],
    likes: ['赞美', '关注', '舞台', '奢侈品', '派对', '被崇拜'],
    dislikes: ['被忽视', '批评', '被超越', '小气', '平庸', '失败'],
    bestCompatibility: ['aries', 'sagittarius', 'gemini', 'libra'],
    worstCompatibility: ['taurus', 'scorpio', 'capricorn'],
    luckyNumbers: [1, 4, 10, 19],
    luckyColor: '金色',
    description: '狮子座是王者星座，自信、大方、有魅力。狮子座的人天生具有领导气质，喜欢成为关注的焦点。他们慷慨大方，重情重义，对朋友非常好。狮子座的人自尊心强，爱面子，需要被赞美和崇拜。',
    lovePersonality: '狮子座在爱情中热情浪漫，喜欢给爱人最好的。他们需要被崇拜和欣赏，有点霸道总裁/女王的气质。他们忠诚但也需要对方的付出和回应。',
    careerPath: '狮子座适合需要领导力和表现力的工作，如演员、政治家、企业家、管理者、设计师、公关等。',
  },
  {
    id: 'virgo',
    name: '处女座',
    symbol: '♍',
    element: 'earth',
    quality: 'mutable',
    rulingPlanet: '水星',
    dateRange: '8月23日 - 9月22日',
    traits: ['细致', '完美主义', '分析', '务实', '谦虚', '服务'],
    strengths: ['细致入微', '分析能力强', '务实可靠', '勤劳努力', '谦虚', '有服务精神'],
    weaknesses: ['完美主义', '挑剔', '过于理性', '容易焦虑', '过于谦虚', '容易钻牛角尖'],
    likes: ['整洁', '秩序', '细节', '健康', '服务', '效率'],
    dislikes: ['混乱', '邋遢', '错误', '不理性', '懒惰', '庸俗'],
    bestCompatibility: ['taurus', 'capricorn', 'cancer', 'scorpio'],
    worstCompatibility: ['gemini', 'sagittarius', 'pisces'],
    luckyNumbers: [5, 7, 14, 23],
    luckyColor: '米色',
    description: '处女座是完美主义的代表，细致、理性、有条理。处女座的人追求完美，注重细节，有很强的分析能力。他们务实可靠，做事认真负责。处女座的人有服务精神，总是默默付出，但也容易因为完美主义而焦虑。',
    lovePersonality: '处女座在爱情中比较含蓄，不会轻易表达感情。他们挑剔，但一旦爱上就会非常认真。他们用实际行动表达爱意，把爱人照顾得很好。',
    careerPath: '处女座适合需要细心和分析的工作，如会计师、程序员、医生、研究员、编辑、质量检查员等。',
  },
  {
    id: 'libra',
    name: '天秤座',
    symbol: '♎',
    element: 'air',
    quality: 'cardinal',
    rulingPlanet: '金星',
    dateRange: '9月23日 - 10月23日',
    traits: ['优雅', '公正', '社交', '犹豫', '爱美', '和谐'],
    strengths: ['优雅有魅力', '公正客观', '社交能力强', '审美能力好', '善于协调', '追求和谐'],
    weaknesses: ['犹豫不决', '优柔寡断', '追求表面', '逃避冲突', '过于在意他人看法', '懒惰'],
    likes: ['美', '和谐', '社交', '艺术', '公平', '恋爱'],
    dislikes: ['冲突', '丑陋', '不公正', '孤独', '粗俗', '被迫做决定'],
    bestCompatibility: ['gemini', 'aquarius', 'leo', 'sagittarius'],
    worstCompatibility: ['cancer', 'capricorn', 'aries'],
    luckyNumbers: [6, 9, 15, 24],
    luckyColor: '粉色',
    description: '天秤座是优雅公正的代表，追求和谐与平衡。天秤座的人有魅力，善于社交，是天生的外交家。他们审美品味高，喜欢美好的事物。天秤座的人最害怕冲突和不和谐，有时会为了和谐而妥协自己。',
    lovePersonality: '天秤座在爱情中浪漫优雅，追求平等和和谐。他们喜欢恋爱的感觉，很有魅力。他们需要一个能和他们并肩前行、同样有品味的伴侣。',
    careerPath: '天秤座适合外交和艺术相关的工作，如外交官、律师、设计师、公关、人力资源、艺术家等。',
  },
  {
    id: 'scorpio',
    name: '天蝎座',
    symbol: '♏',
    element: 'water',
    quality: 'fixed',
    rulingPlanet: '冥王星',
    dateRange: '10月24日 - 11月22日',
    traits: ['神秘', '深刻', '执着', '强烈', '洞察力强', '占有欲强'],
    strengths: ['洞察力强', '意志坚定', '有深度', '忠诚', '魅力十足', '重生能力强'],
    weaknesses: ['占有欲强', '嫉妒心重', '报复心强', '多疑', '极端', '控制欲强'],
    likes: ['神秘', '深度', '真相', '权力', '激情', '掌控'],
    dislikes: ['肤浅', '背叛', '被控制', '谎言', '失败', '被看透'],
    bestCompatibility: ['cancer', 'pisces', 'virgo', 'capricorn'],
    worstCompatibility: ['leo', 'aquarius', 'taurus'],
    luckyNumbers: [4, 8, 13, 22],
    luckyColor: '黑色',
    description: '天蝎座是最神秘、最有深度的星座。天蝎座的人洞察力极强，能够看透人心。他们感情强烈，爱憎分明，一旦爱上就会非常投入和忠诚。天蝎座的人意志坚定，有很强的重生能力，但也容易走极端。',
    lovePersonality: '天蝎座在爱情中深刻而强烈，追求灵魂的交融。他们占有欲强，嫉妒心重，但也最忠诚最深情。他们需要深度的连接和绝对的忠诚。',
    careerPath: '天蝎座适合需要深度和洞察力的工作，如心理学家、侦探、医生、科学家、金融分析师、艺术家等。',
  },
  {
    id: 'sagittarius',
    name: '射手座',
    symbol: '♐',
    element: 'fire',
    quality: 'mutable',
    rulingPlanet: '木星',
    dateRange: '11月23日 - 12月21日',
    traits: ['乐观', '自由', '冒险', '直率', '哲学', '好动'],
    strengths: ['乐观向上', '热爱自由', '诚实直率', '有智慧', '喜欢冒险', '心胸开阔'],
    weaknesses: ['冲动鲁莽', '缺乏耐心', '太直接伤人', '不切实际', '难以承诺', '过度乐观'],
    likes: ['旅行', '自由', '哲学', '冒险', '学习', '动物'],
    dislikes: ['被束缚', '无聊', '琐碎', '悲观', '欺骗', '狭窄的空间'],
    bestCompatibility: ['aries', 'leo', 'libra', 'aquarius'],
    worstCompatibility: ['virgo', 'pisces', 'gemini'],
    luckyNumbers: [3, 7, 12, 21],
    luckyColor: '紫色',
    description: '射手座是乐观自由的哲学家，热爱探索和冒险。射手座的人追求自由和真理，对世界充满好奇心。他们乐观开朗，心胸开阔，总是看到事物好的一面。射手座的人直率坦诚，但有时会因为太直接而伤人。',
    lovePersonality: '射手座在爱情中追求自由和成长，讨厌被束缚。他们需要一个能和他们一起探索世界、一起成长的伴侣。他们诚实坦率，但可能不够浪漫。',
    careerPath: '射手座适合需要探索和自由的工作，如旅行家、记者、大学教授、哲学家、运动员、外交官等。',
  },
  {
    id: 'capricorn',
    name: '摩羯座',
    symbol: '♑',
    element: 'earth',
    quality: 'cardinal',
    rulingPlanet: '土星',
    dateRange: '12月22日 - 1月19日',
    traits: ['务实', '有野心', '自律', '稳重', '传统', '责任感强'],
    strengths: ['有责任感', '务实可靠', '有野心', '自律性强', '稳重成熟', '持之以恒'],
    weaknesses: ['过于严肃', '工作狂', '缺乏情趣', '悲观', '固执', '冷漠'],
    likes: ['成功', '地位', '传统', '秩序', '责任', '历史'],
    dislikes: ['失败', '无能', '轻浮', '混乱', '不专业', '懒惰'],
    bestCompatibility: ['taurus', 'virgo', 'scorpio', 'pisces'],
    worstCompatibility: ['aries', 'leo', 'libra'],
    luckyNumbers: [4, 8, 17, 26],
    luckyColor: '棕色',
    description: '摩羯座是务实稳重的代表，有强烈的事业心和责任感。摩羯座的人目标明确，脚踏实地，一步一个脚印地向上攀登。他们自律性强，能吃苦，有很强的毅力。摩羯座的人外表冷静严肃，但内心也有柔软的一面。',
    lovePersonality: '摩羯座在爱情中比较内敛，不善于表达感情。他们认真负责，是可靠的伴侣。他们可能不够浪漫，但会用实际行动证明爱意。',
    careerPath: '摩羯座适合需要稳重和责任感的工作，如企业家、管理者、会计师、工程师、建筑师、政治家等。',
  },
  {
    id: 'aquarius',
    name: '水瓶座',
    symbol: '♒',
    element: 'air',
    quality: 'fixed',
    rulingPlanet: '天王星',
    dateRange: '1月20日 - 2月18日',
    traits: ['独立', '创新', '人道主义', '理性', '叛逆', '独特'],
    strengths: ['独立思考', '创新能力强', '人道主义', '理性客观', '有远见', '独特'],
    weaknesses: ['过于理性', '叛逆', '疏离', '固执', '情绪化', '不可预测'],
    likes: ['自由', '创新', '科技', '朋友', '人道主义', '独特'],
    dislikes: ['束缚', '传统', '无聊', '狭隘', '虚伪', '从众'],
    bestCompatibility: ['gemini', 'libra', 'aries', 'sagittarius'],
    worstCompatibility: ['taurus', 'scorpio', 'leo'],
    luckyNumbers: [3, 7, 11, 20],
    luckyColor: '蓝色',
    description: '水瓶座是独立创新的思想家，走在时代的前沿。水瓶座的人有独特的想法和视角，不随波逐流。他们理性客观，有很强的人道主义精神。水瓶座的人重视友谊，朋友众多，但内心可能比较疏离。',
    lovePersonality: '水瓶座在爱情中需要空间和自由，讨厌被束缚。他们追求精神上的共鸣，喜欢和伴侣做朋友。他们可能不够热情，但非常真诚和忠诚。',
    careerPath: '水瓶座适合创新和科技相关的工作，如科学家、发明家、IT工程师、社会活动家、设计师、未来学家等。',
  },
  {
    id: 'pisces',
    name: '双鱼座',
    symbol: '♓',
    element: 'water',
    quality: 'mutable',
    rulingPlanet: '海王星',
    dateRange: '2月19日 - 3月20日',
    traits: ['敏感', '浪漫', '有同情心', '梦幻', '艺术', '牺牲'],
    strengths: ['有同情心', '浪漫', '艺术感强', '直觉强', '包容', '有灵性'],
    weaknesses: ['敏感脆弱', '逃避现实', '容易受骗', '缺乏自信', '优柔寡断', '不切实际'],
    likes: ['浪漫', '艺术', '做梦', '帮助别人', '音乐', '海洋'],
    dislikes: ['现实', '批评', '冲突', '丑陋', '被拒绝', '孤独'],
    bestCompatibility: ['cancer', 'scorpio', 'taurus', 'capricorn'],
    worstCompatibility: ['gemini', 'virgo', 'sagittarius'],
    luckyNumbers: [3, 9, 12, 21],
    luckyColor: '海蓝色',
    description: '双鱼座是最浪漫、最有灵性的星座。双鱼座的人敏感温柔，有丰富的想象力和创造力。他们有很强的同理心，能够深深理解他人的感受。双鱼座的人喜欢做梦，有时会逃避现实，但他们的艺术天赋和灵性是独一无二的。',
    lovePersonality: '双鱼座在爱情中浪漫至极，为爱而生。他们温柔体贴，愿意为爱情牺牲一切。他们需要一个能保护他们、给他们安全感的伴侣。',
    careerPath: '双鱼座适合艺术和帮助他人的工作，如艺术家、音乐家、演员、诗人、心理咨询师、社工、护士等。',
  },
];

// 星座配对数据生成函数
export const getZodiacMatch = (sign1Id: string, sign2Id: string): ZodiacMatch => {
  const sign1 = ZODIAC_SIGNS.find(s => s.id === sign1Id);
  const sign2 = ZODIAC_SIGNS.find(s => s.id === sign2Id);
  
  if (!sign1 || !sign2) {
    return {
      sign1: sign1Id,
      sign2: sign2Id,
      overallScore: 50,
      loveScore: 50,
      friendshipScore: 50,
      workScore: 50,
      description: '未知配对',
      strengths: [],
      challenges: [],
      advice: '多多了解彼此',
    };
  }

  // 基于元素和品质计算匹配度
  const elementScores: Record<string, number> = {
    'fire-fire': 85,
    'fire-air': 90,
    'fire-water': 50,
    'fire-earth': 55,
    'air-air': 85,
    'air-water': 60,
    'air-earth': 65,
    'water-water': 85,
    'water-earth': 80,
    'earth-earth': 85,
  };

  const elements = [sign1.element, sign2.element].sort().join('-');
  const baseScore = elementScores[elements] || 60;

  // 最佳配对加成
  if (sign1.bestCompatibility.includes(sign2.id)) {
    return {
      sign1: sign1Id,
      sign2: sign2Id,
      overallScore: Math.min(98, baseScore + 10),
      loveScore: Math.min(100, baseScore + 12),
      friendshipScore: Math.min(95, baseScore + 8),
      workScore: Math.min(95, baseScore + 5),
      description: `${sign1.name}和${sign2.name}是非常契合的一对！你们有很多共同点，能够互相理解和支持。`,
      strengths: [
        `价值观高度契合`,
        `性格互补`,
        `有共同话题`,
        `互相吸引`,
      ],
      challenges: [
        `可能过于相似而缺乏新鲜感`,
        `需要保持各自的独立性`,
      ],
      advice: '珍惜这段缘分，多给彼此一些空间和自由，你们的关系会更加美好。',
    };
  }

  // 最差配对
  if (sign1.worstCompatibility.includes(sign2.id)) {
    return {
      sign1: sign1Id,
      sign2: sign2Id,
      overallScore: Math.max(30, baseScore - 20),
      loveScore: Math.max(25, baseScore - 25),
      friendshipScore: Math.max(35, baseScore - 15),
      workScore: Math.max(40, baseScore - 10),
      description: `${sign1.name}和${sign2.name}的差异比较大，需要更多的努力和包容才能相处融洽。`,
      strengths: [
        `可以从对方身上学到很多`,
        `差异带来新鲜感`,
      ],
      challenges: [
        `性格差异大`,
        `沟通方式不同`,
        `价值观可能有冲突`,
        `需要更多包容和理解`,
      ],
      advice: '每对情侣都需要磨合。多站在对方的角度思考，学习欣赏差异，你们也可以很幸福。',
    };
  }

  // 普通配对
  return {
    sign1: sign1Id,
    sign2: sign2Id,
    overallScore: baseScore,
    loveScore: baseScore,
    friendshipScore: Math.min(90, baseScore + 5),
    workScore: baseScore,
    description: `${sign1.name}和${sign2.name}是不错的一对，既有共同点也有差异。`,
    strengths: [
      `有一定的吸引力`,
      `可以互相学习`,
      `性格有互补之处`,
    ],
    challenges: [
      `需要时间磨合`,
      `有些方面需要互相适应`,
    ],
    advice: '好的关系需要经营。多沟通、多理解，你们的关系会越来越好。',
  };
};

// 根据ID获取星座
export const getZodiacById = (id: string): ZodiacSign | undefined => {
  return ZODIAC_SIGNS.find(s => s.id === id);
};

// 根据出生日期获取星座
export const getZodiacByBirthday = (month: number, day: number): ZodiacSign => {
  const dates = [
    { id: 'capricorn', start: [1, 1], end: [1, 19] },
    { id: 'aquarius', start: [1, 20], end: [2, 18] },
    { id: 'pisces', start: [2, 19], end: [3, 20] },
    { id: 'aries', start: [3, 21], end: [4, 19] },
    { id: 'taurus', start: [4, 20], end: [5, 20] },
    { id: 'gemini', start: [5, 21], end: [6, 21] },
    { id: 'cancer', start: [6, 22], end: [7, 22] },
    { id: 'leo', start: [7, 23], end: [8, 22] },
    { id: 'virgo', start: [8, 23], end: [9, 22] },
    { id: 'libra', start: [9, 23], end: [10, 23] },
    { id: 'scorpio', start: [10, 24], end: [11, 22] },
    { id: 'sagittarius', start: [11, 23], end: [12, 21] },
    { id: 'capricorn', start: [12, 22], end: [12, 31] },
  ];

  const found = dates.find(d => {
    const [startMonth, startDay] = d.start;
    const [endMonth, endDay] = d.end;
    
    if (month === startMonth && month === endMonth) {
      return day >= startDay && day <= endDay;
    } else if (month === startMonth) {
      return day >= startDay;
    } else if (month === endMonth) {
      return day <= endDay;
    }
    return false;
  });

  return ZODIAC_SIGNS.find(s => s.id === found?.id) || ZODIAC_SIGNS[0];
};
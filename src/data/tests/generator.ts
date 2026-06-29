// ============================================================================
// 通用测试题库生成器 - 用于快速生成各类测试的题目
// ============================================================================

import type { TestQuestion } from '../../types';

// 生成百分比测试题目
export const generatePercentageQuestions = (count: number, dimensions: string[]): TestQuestion[] => {
  const questionTemplates = [
    { text: '在社交场合中，你更倾向于：', pos: '积极主动，享受社交', neg: '安静观察，保持低调' },
    { text: '面对新挑战时，你的第一反应是：', pos: '兴奋地迎接挑战', neg: '先评估风险再说' },
    { text: '你的工作风格更偏向：', pos: '快速行动，边做边想', neg: '深思熟虑，谋定后动' },
    { text: '做决定时，你更依赖：', pos: '直觉和感觉', neg: '逻辑和分析' },
    { text: '你更喜欢的工作环境是：', pos: '充满变化和挑战', neg: '稳定且有秩序' },
    { text: '面对压力时，你通常：', pos: '积极应对，越挫越勇', neg: '需要时间消化恢复' },
    { text: '你对细节的关注度如何？', pos: '更关注整体和大局', neg: '非常注重细节' },
    { text: '你更喜欢的休闲方式是：', pos: '和朋友出去玩', neg: '一个人安静待着' },
    { text: '你对未知事物的态度是：', pos: '充满好奇，想去探索', neg: '有些担心，偏好已知' },
    { text: '你处理冲突的方式是：', pos: '直面问题，积极沟通', neg: '尽量避免，寻求和谐' },
    { text: '你对规则的态度是：', pos: '灵活变通，不拘一格', neg: '遵守规则，按章办事' },
    { text: '你更看重什么？', pos: '成就和结果', neg: '关系和和谐' },
    { text: '你的学习风格更偏向：', pos: '实践中学习', neg: '理论研究学习' },
    { text: '你对时间的态度是：', pos: '活在当下', neg: '规划未来' },
    { text: '你更容易被什么说服？', pos: '情感和故事', neg: '事实和数据' },
    { text: '你更喜欢的团队角色是：', pos: '领导者/发起者', neg: '支持者/执行者' },
    { text: '你对变化的适应能力如何？', pos: '很快适应新环境', neg: '需要时间适应' },
    { text: '你更认同哪句话？', pos: '人生苦短，及时行乐', neg: '未雨绸缪，有备无患' },
    { text: '你处理问题的方式是：', pos: '快速找到解决方案', neg: '深入分析根本原因' },
    { text: '你对自己的要求如何？', pos: '差不多就行，开心最重要', neg: '高标准，追求完美' },
  ];

  const questions: TestQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    const template = questionTemplates[i % questionTemplates.length];
    const dim = dimensions[i % Math.max(dimensions.length, 1)];
    
    questions.push({
      id: `q${i + 1}`,
      text: template.text,
      options: [
        {
          id: 'a',
          text: template.pos,
          scores: { [dim]: 5 },
        },
        {
          id: 'b',
          text: template.neg,
          scores: { [dim]: 1 },
        },
      ],
      dimensions: [dim],
    });
  }

  return questions;
};

// 生成分类测试题目
export const generateCategoryQuestions = (count: number, categories: string[]): TestQuestion[] => {
  const questionTemplates = [
    '你周末更喜欢做什么？',
    '你最欣赏的品质是？',
    '你理想的职业是？',
    '你遇到问题时的第一反应是？',
    '你更喜欢的动物是？',
    '你最喜欢的颜色是？',
    '你更认同哪种生活方式？',
    '你在团队中通常扮演什么角色？',
    '你最看重朋友的什么特质？',
    '你喜欢的音乐类型是？',
    '你理想的旅行目的地是？',
    '你放松的方式是？',
    '你更擅长什么？',
    '你吃饭时更看重什么？',
    '你买东西时更关注？',
    '你更喜欢的游戏类型是？',
    '你看电影时更关注？',
    '你觉得自己更像？',
    '你对未来的期望是？',
    '你更喜欢的天气是？',
  ];

  const optionTemplates: Record<string, string[]> = {
    '外向': ['参加派对认识新朋友', '在人群中闪闪发光', '到处都是朋友', '主动出击解决问题', '热情活泼的狗狗', '明亮的暖色系', '热闹非凡的生活', '领导者/带头人', '热情开朗', '流行音乐/电子音乐', '繁华的大城市', '和朋友聚会', '社交和沟通', '氛围和环境', '品牌和外观', '多人在线游戏', '剧情和人物', '小太阳', '充满精彩冒险', '阳光明媚'],
    '内向': ['在家看书看电影', '安静地做自己的事', '几个知心好友', '先自己思考分析', '高冷独立的猫咪', '深邃的冷色系', '宁静平和的生活', '思考者/幕后支持', '真诚靠谱', '古典音乐/纯音乐', '风景优美的自然', '一个人发呆', '深度思考研究', '口味和品质', '性价比和实用性', '单人剧情游戏', '画面和音乐', '月亮', '平静安稳幸福', '细雨绵绵'],
    '思考': ['逻辑分析找原因', '理性客观公正', '聪明智慧', '冷静分析再行动', '睿智的猫头鹰', '理性的蓝色', '理性高效的生活', '战略规划师', '聪明有才华', '摇滚/独立音乐', '博物馆/历史古迹', '学习新技能', '分析和解决问题', '营养健康', '功能和质量', '策略/益智游戏', '逻辑和设定', '计算机', '事业有成', '秋高气爽'],
    '情感': ['感同身受去理解', '温暖有同理心', '善良体贴', '先照顾他人感受', '温柔的鹿', '温暖的粉色', '充满爱的生活', '团队协调者', '善良有爱心', '抒情/治愈音乐', '浪漫的海边', '和爱人依偎', '关心和照顾他人', '味道和心情', '设计和美感', '角色扮演/治愈游戏', '情感和共鸣', '玫瑰花', '被爱包围', '春暖花开'],
    '狮子': ['百兽之王，霸气侧漏', '自信满满，有王者风范', '热情大方', '喜欢成为焦点', '草原之王', '金色', '王者般的生活', '领导者', '勇敢自信', '气势磅礴的音乐', '非洲大草原', '开派对招待朋友', '领导和组织', '豪华大餐', '奢华品牌', '竞技类游戏', '英雄主义', '霸王龙', '成就一番伟业', '烈日当空'],
    '狐狸': ['聪明机智，古灵精怪', '敏锐的洞察力', '适应力强', '善于观察', '森林精灵', '橙色', '灵活多变的生活', '智囊团', '聪慧狡黠', '灵动的音乐', '神秘的森林', '探索新事物', '谋略和策划', '精致小食', '独特设计', '解谜冒险游戏', '悬疑和反转', '精灵', '自由自在地生活', '多云变幻'],
  };

  const questions: TestQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    const template = questionTemplates[i % questionTemplates.length];
    const options = categories.map((cat, index) => {
      const catOptions = optionTemplates[cat] || ['选项A', '选项B'];
      return {
        id: `option_${index}`,
        text: catOptions[i % catOptions.length],
        scores: { [cat]: 1 },
      };
    });

    questions.push({
      id: `q${i + 1}`,
      text: template,
      options,
      dimensions: categories,
    });
  }

  return questions;
};

// 生成Big Five测试题目
export const generateBigFiveQuestions = (count: number): TestQuestion[] => {
  const dims = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
  const questions: TestQuestion[] = [];

  interface BFQuestion { q: string; pos: boolean; }
  
  const questionsByDim: Record<string, BFQuestion[]> = {
    openness: [
      { q: '你喜欢尝试新事物和新体验。', pos: true },
      { q: '你对艺术和美学有浓厚兴趣。', pos: true },
      { q: '你经常思考抽象的概念和理论。', pos: true },
      { q: '你喜欢挑战传统观念。', pos: true },
      { q: '你的想象力很丰富。', pos: true },
      { q: '你更喜欢常规和熟悉的事物。', pos: false },
    ],
    conscientiousness: [
      { q: '你做事有条理、有计划。', pos: true },
      { q: '你总是努力做到最好。', pos: true },
      { q: '你很有责任感，说到做到。', pos: true },
      { q: '你注重细节，追求完美。', pos: true },
      { q: '你能坚持完成长期目标。', pos: true },
      { q: '你有时会拖延任务。', pos: false },
    ],
    extraversion: [
      { q: '你喜欢社交活动，善于与人交往。', pos: true },
      { q: '你精力充沛，充满活力。', pos: true },
      { q: '你喜欢成为关注的焦点。', pos: true },
      { q: '你善于表达自己的想法。', pos: true },
      { q: '你有很多朋友。', pos: true },
      { q: '你更喜欢独处。', pos: false },
    ],
    agreeableness: [
      { q: '你乐于帮助他人。', pos: true },
      { q: '你很容易原谅别人。', pos: true },
      { q: '你相信人性本善。', pos: true },
      { q: '你重视和谐，避免冲突。', pos: true },
      { q: '你很有同理心。', pos: true },
      { q: '你有时会与人发生争执。', pos: false },
    ],
    neuroticism: [
      { q: '你经常感到焦虑或紧张。', pos: true },
      { q: '你的情绪波动比较大。', pos: true },
      { q: '你容易担心事情。', pos: true },
      { q: '你对批评很敏感。', pos: true },
      { q: '你有时会感到沮丧。', pos: true },
      { q: '你通常情绪稳定。', pos: false },
    ],
  };

  for (let i = 0; i < count; i++) {
    const dim = dims[i % dims.length];
    const dimQuestions = questionsByDim[dim];
    const qIndex = Math.floor(i / dims.length) % dimQuestions.length;
    const qData = dimQuestions[qIndex];
    
    const scorePositive = qData.pos ? 5 : 1;
    const scoreNegative = qData.pos ? 1 : 5;

    questions.push({
      id: `bf_${i + 1}`,
      text: qData.q,
      options: [
        { id: '1', text: '非常不同意', scores: { [dim]: scoreNegative } },
        { id: '2', text: '不同意', scores: { [dim]: scoreNegative + 1 } },
        { id: '3', text: '中立', scores: { [dim]: 3 } },
        { id: '4', text: '同意', scores: { [dim]: scorePositive - 1 } },
        { id: '5', text: '非常同意', scores: { [dim]: scorePositive } },
      ],
      dimensions: [dim],
    });
  }

  return questions;
};

// 生成九型人格测试题目
export const generateEnneagramQuestions = (count: number): TestQuestion[] => {
  const types = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const questions: TestQuestion[] = [];

  const typeQuestions: Record<number, string[]> = {
    1: ['我追求完美，对自己和他人要求很高。', '我有很强的是非观和原则。'],
    2: ['我总是乐于帮助别人，甚至忽略自己。', '我通过付出来获得爱和认可。'],
    3: ['我追求成功和成就，希望被认可。', '我很有野心，目标明确。'],
    4: ['我渴望独特和真实，讨厌平凡。', '我有丰富的情感和艺术气质。'],
    5: ['我喜欢独处和思考，追求知识。', '我不善表达情感，比较理性。'],
    6: ['我比较谨慎，容易担心和焦虑。', '我忠诚可靠，重视安全感。'],
    7: ['我喜欢新鲜刺激，讨厌无聊。', '我乐观积极，总是寻找快乐。'],
    8: ['我强势果断，喜欢掌控局面。', '我保护欲强，敢于面对冲突。'],
    9: ['我温和友善，追求和谐和平。', '我容易妥协，避免冲突。'],
  };

  for (let i = 0; i < count; i++) {
    const type1 = types[i % types.length];
    const type2 = types[(i + 1) % types.length];
    const qIndex = Math.floor(i / types.length) % 2;
    
    questions.push({
      id: `en_${i + 1}`,
      text: '以下哪个描述更符合你？',
      options: [
        { id: 'a', text: typeQuestions[type1][qIndex], scores: { [type1]: 1 } },
        { id: 'b', text: typeQuestions[type2][qIndex], scores: { [type2]: 1 } },
      ],
      dimensions: [type1.toString(), type2.toString()],
    });
  }

  return questions;
};

// 生成DISC测试题目
export const generateDISCQuestions = (count: number): TestQuestion[] => {
  const questions: TestQuestion[] = [];
  const dims = ['D', 'I', 'S', 'C'];

  const questionTemplates = [
    '在团队中，你更倾向于：',
    '面对问题时，你的第一反应是：',
    '你最看重的是：',
    '你的沟通风格是：',
    '你更喜欢的工作方式是：',
    '你压力下的表现是：',
  ];

  const optionsByQ: Record<number, Record<string, string>> = {
    0: { D: '主动担当，带领团队', I: '活跃气氛，激励他人', S: '支持配合，默默付出', C: '分析问题，提供建议' },
    1: { D: '快速决策，立即行动', I: '寻求帮助，集思广益', S: '谨慎评估，稳步推进', C: '深入分析，找出原因' },
    2: { D: '结果和成就', I: '认可和赞赏', S: '稳定和和谐', C: '准确和完美' },
    3: { D: '直接果断', I: '热情有趣', S: '温和耐心', C: '严谨细致' },
    4: { D: '快速高效，结果导向', I: '灵活多变，创意十足', S: '按部就班，稳扎稳打', C: '精益求精，注重细节' },
    5: { D: '更加强势，掌控局面', I: '寻求支持，找人倾诉', S: '默默承受，保持稳定', C: '更加谨慎，反复检查' },
  };

  for (let i = 0; i < count; i++) {
    const qIndex = i % questionTemplates.length;
    const opts = optionsByQ[qIndex];
    
    questions.push({
      id: `disc_${i + 1}`,
      text: questionTemplates[qIndex],
      options: dims.map(dim => ({
        id: dim.toLowerCase(),
        text: opts[dim],
        scores: { [dim]: 1 },
      })),
      dimensions: dims,
    });
  }

  return questions;
};

// 通用获取测试题目函数
export const getTestQuestions = (testId: string, count: number, scoringType: string, dimensions?: string[]): TestQuestion[] => {
  switch (scoringType) {
    case 'mbti':
      // 专门在mbti.ts中处理
      return [];
    case 'bigfive':
      return generateBigFiveQuestions(count);
    case 'enneagram':
      return generateEnneagramQuestions(count);
    case 'disc':
      return generateDISCQuestions(count);
    case 'category':
      return generateCategoryQuestions(count, dimensions || ['类型A', '类型B', '类型C', '类型D']);
    case 'percentage':
    default:
      return generatePercentageQuestions(count, dimensions || ['维度1', '维度2']);
  }
};
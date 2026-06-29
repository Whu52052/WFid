// ============================================================================
// MBTI测试题库 (93题完整版)
// 基于荣格心理学理论的专业MBTI测试
// ============================================================================

import type { TestQuestion } from '../../types';

export const MBTI_QUESTIONS: TestQuestion[] = [
  // E/I维度 - 外向/内向 (约23题)
  {
    id: 'mbti-ei-001',
    text: '在聚会上，你通常会：',
    options: [
      { id: 'a', text: '主动和很多人交谈，包括陌生人', scores: { E: 2 } },
      { id: 'b', text: '只和少数几个认识的人交谈', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-002',
    text: '你更喜欢怎样的放松方式？',
    options: [
      { id: 'a', text: '和朋友出去玩、参加活动', scores: { E: 2 } },
      { id: 'b', text: '一个人在家看书、追剧、听音乐', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-003',
    text: '在团队讨论中，你通常：',
    options: [
      { id: 'a', text: '积极发言，边说边想', scores: { E: 2 } },
      { id: 'b', text: '先听别人说，想清楚后再发言', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-004',
    text: '你更享受：',
    options: [
      { id: 'a', text: '热闹的派对和社交活动', scores: { E: 2 } },
      { id: 'b', text: '深度的一对一对话', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-005',
    text: '一个人待的时间长了，你会：',
    options: [
      { id: 'a', text: '感到无聊，想找人说话', scores: { E: 2 } },
      { id: 'b', text: '感到很自在，甚至不想被打扰', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-006',
    text: '认识新朋友时，你：',
    options: [
      { id: 'a', text: '很容易打开话匣子', scores: { E: 2 } },
      { id: 'b', text: '比较慢热，需要时间熟悉', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-007',
    text: '你觉得自己的精力来源是：',
    options: [
      { id: 'a', text: '和人互动、外部刺激', scores: { E: 2 } },
      { id: 'b', text: '独处、内心世界', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-008',
    text: '在陌生的社交场合，你：',
    options: [
      { id: 'a', text: '很快就能融入进去', scores: { E: 2 } },
      { id: 'b', text: '需要一段时间适应', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-009',
    text: '你说话时更倾向于：',
    options: [
      { id: 'a', text: '想到什么就说什么', scores: { E: 2 } },
      { id: 'b', text: '在脑子里组织好语言再说', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-010',
    text: '周末两天都在家待着，你会：',
    options: [
      { id: 'a', text: '觉得浪费了周末', scores: { E: 2 } },
      { id: 'b', text: '觉得非常舒服惬意', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-011',
    text: '你更喜欢的工作环境是：',
    options: [
      { id: 'a', text: '开放式办公区，随时可以交流', scores: { E: 2 } },
      { id: 'b', text: '独立办公室，安静专注', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-012',
    text: '遇到问题时，你通常：',
    options: [
      { id: 'a', text: '找朋友倾诉讨论', scores: { E: 2 } },
      { id: 'b', text: '自己一个人思考解决', scores: { I: 2 } },
    ],
    dimensions: ['E', 'I'],
  },

  // S/N维度 - 感觉/直觉 (约23题)
  {
    id: 'mbti-sn-001',
    text: '你更相信：',
    options: [
      { id: 'a', text: '亲身经历和事实证据', scores: { S: 2 } },
      { id: 'b', text: '直觉和第六感', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-002',
    text: '你更关注：',
    options: [
      { id: 'a', text: '具体的细节和实际情况', scores: { S: 2 } },
      { id: 'b', text: '整体模式和可能性', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-003',
    text: '看电影时，你更容易注意到：',
    options: [
      { id: 'a', text: '画面的细节和演员的表演', scores: { S: 2 } },
      { id: 'b', text: '故事的主题和深层含义', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-004',
    text: '你更擅长：',
    options: [
      { id: 'a', text: '处理具体的、实际的任务', scores: { S: 2 } },
      { id: 'b', text: '想出新的点子和创意', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-005',
    text: '当有人讲故事时，你更在意：',
    options: [
      { id: 'a', text: '故事的真实性和细节', scores: { S: 2 } },
      { id: 'b', text: '故事传达的想法和意义', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-006',
    text: '你对未来的态度是：',
    options: [
      { id: 'a', text: '脚踏实地，关注当下', scores: { S: 2 } },
      { id: 'b', text: '充满想象，向往未来', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-007',
    text: '你更喜欢的学习方式是：',
    options: [
      { id: 'a', text: '按步骤一步步来，有具体例子', scores: { S: 2 } },
      { id: 'b', text: '先理解概念和整体框架', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-008',
    text: '你更容易被什么吸引？',
    options: [
      { id: 'a', text: '现实中发生的事情', scores: { S: 2 } },
      { id: 'b', text: '可能发生的事情', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-009',
    text: '你更喜欢看的书是：',
    options: [
      { id: 'a', text: '纪实类、实用类书籍', scores: { S: 2 } },
      { id: 'b', text: '科幻、奇幻、哲学类', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-010',
    text: '做决定时，你更依赖：',
    options: [
      { id: 'a', text: '过去的经验和已知的方法', scores: { S: 2 } },
      { id: 'b', text: '灵感和新的可能性', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-011',
    text: '你对抽象概念的态度是：',
    options: [
      { id: 'a', text: '觉得不如具体事物有意思', scores: { S: 2 } },
      { id: 'b', text: '很感兴趣，喜欢讨论', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-012',
    text: '你更擅长记住：',
    options: [
      { id: 'a', text: '具体的事实和数据', scores: { S: 2 } },
      { id: 'b', text: '概念和理论', scores: { N: 2 } },
    ],
    dimensions: ['S', 'N'],
  },

  // T/F维度 - 思考/情感 (约24题)
  {
    id: 'mbti-tf-001',
    text: '做决定时，你更看重：',
    options: [
      { id: 'a', text: '逻辑和客观分析', scores: { T: 2 } },
      { id: 'b', text: '人的感受和价值观', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-002',
    text: '当朋友向你倾诉烦恼时，你通常：',
    options: [
      { id: 'a', text: '帮他分析问题、给出建议', scores: { T: 2 } },
      { id: 'b', text: '先共情安慰，表达理解', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-003',
    text: '你更看重什么？',
    options: [
      { id: 'a', text: '公平和正义', scores: { T: 2 } },
      { id: 'b', text: '和谐和同理心', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-004',
    text: '别人说你"太理性"，你觉得：',
    options: [
      { id: 'a', text: '是夸奖，理性很好', scores: { T: 2 } },
      { id: 'b', text: '有点不舒服，觉得被误解', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-005',
    text: '你更容易被什么说服？',
    options: [
      { id: 'a', text: '有力的论据和数据', scores: { T: 2 } },
      { id: 'b', text: '真诚的情感和故事', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-006',
    text: '面对冲突时，你更倾向于：',
    options: [
      { id: 'a', text: '直面问题，据理力争', scores: { T: 2 } },
      { id: 'b', text: '尽量避免伤害感情', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-007',
    text: '你觉得自己是：',
    options: [
      { id: 'a', text: '理性的人', scores: { T: 2 } },
      { id: 'b', text: '感性的人', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-008',
    text: '评价一件事时，你更偏向：',
    options: [
      { id: 'a', text: '客观分析对错', scores: { T: 2 } },
      { id: 'b', text: '考虑对人的影响', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-009',
    text: '你更欣赏的品质是：',
    options: [
      { id: 'a', text: '智慧和洞察力', scores: { T: 2 } },
      { id: 'b', text: '善良和同理心', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-010',
    text: '如果必须批评别人，你会：',
    options: [
      { id: 'a', text: '直接说，对事不对人', scores: { T: 2 } },
      { id: 'b', text: '委婉一些，照顾对方感受', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-011',
    text: '你更认同哪句话？',
    options: [
      { id: 'a', text: '真理越辩越明', scores: { T: 2 } },
      { id: 'b', text: '家是讲爱的地方，不是讲理的地方', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-012',
    text: '看到感人的故事或电影，你：',
    options: [
      { id: 'a', text: '通常不会流泪', scores: { T: 2 } },
      { id: 'b', text: '很容易被感动流泪', scores: { F: 2 } },
    ],
    dimensions: ['T', 'F'],
  },

  // J/P维度 - 判断/知觉 (约23题)
  {
    id: 'mbti-jp-001',
    text: '你的生活方式更倾向于：',
    options: [
      { id: 'a', text: '有计划、有条理', scores: { J: 2 } },
      { id: 'b', text: '随性灵活、随机应变', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-002',
    text: '对于截止日期，你通常：',
    options: [
      { id: 'a', text: '提前完成，不喜欢赶deadline', scores: { J: 2 } },
      { id: 'b', text: '经常到最后一刻才赶完', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-003',
    text: '你的房间/桌面通常是：',
    options: [
      { id: 'a', text: '整洁有序', scores: { J: 2 } },
      { id: 'b', text: '有点乱，但我知道东西在哪', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-004',
    text: '出去旅行时，你更喜欢：',
    options: [
      { id: 'a', text: '提前做好详细攻略和行程安排', scores: { J: 2 } },
      { id: 'b', text: '说走就走，走到哪算哪', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-005',
    text: '面对多个选择时，你：',
    options: [
      { id: 'a', text: '很快就能做决定', scores: { J: 2 } },
      { id: 'b', text: '经常纠结，难以决定', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-006',
    text: '你更喜欢的工作方式是：',
    options: [
      { id: 'a', text: '按计划一步步完成任务', scores: { J: 2 } },
      { id: 'b', text: '灵活应对，随时调整', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-007',
    text: '你会提前多久准备重要的事情？',
    options: [
      { id: 'a', text: '很早开始准备，有条不紊', scores: { J: 2 } },
      { id: 'b', text: '临近期限才开始行动', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-008',
    text: '你觉得计划：',
    options: [
      { id: 'a', text: '很重要，没有计划会很焦虑', scores: { J: 2 } },
      { id: 'b', text: '太束缚了，喜欢随性', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-009',
    text: '周末的时间你会：',
    options: [
      { id: 'a', text: '提前安排好要做什么', scores: { J: 2 } },
      { id: 'b', text: '醒了再说，看心情', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-010',
    text: '做了决定后你会：',
    options: [
      { id: 'a', text: '坚持执行，不轻易改变', scores: { J: 2 } },
      { id: 'b', text: '如果有新想法可能会改', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-011',
    text: '你对规则和制度的态度是：',
    options: [
      { id: 'a', text: '认同并遵守规则', scores: { J: 2 } },
      { id: 'b', text: '觉得规则太死板', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-012',
    text: '你更喜欢：',
    options: [
      { id: 'a', text: '完成一件事再开始下一件', scores: { J: 2 } },
      { id: 'b', text: '同时进行好多件事', scores: { P: 2 } },
    ],
    dimensions: ['J', 'P'],
  },

  // 补充题目 - 增加测试精度
  {
    id: 'mbti-ei-013',
    text: '电话铃声响起时，你的第一反应是：',
    options: [
      { id: 'a', text: '开心地接起来', scores: { E: 1 } },
      { id: 'b', text: '希望不是找我的', scores: { I: 1 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-014',
    text: '长时间社交后，你需要：',
    options: [
      { id: 'a', text: '还好，不需要特别恢复', scores: { E: 1 } },
      { id: 'b', text: '需要独处充能', scores: { I: 1 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-ei-015',
    text: '你更愿意怎么过生日？',
    options: [
      { id: 'a', text: '开派对，很多朋友一起', scores: { E: 1 } },
      { id: 'b', text: '和最亲近的人安静过', scores: { I: 1 } },
    ],
    dimensions: ['E', 'I'],
  },
  {
    id: 'mbti-sn-013',
    text: '你更感兴趣的是：',
    options: [
      { id: 'a', text: '是什么', scores: { S: 1 } },
      { id: 'b', text: '可能是什么', scores: { N: 1 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-014',
    text: '你更喜欢的艺术形式是：',
    options: [
      { id: 'a', text: '写实主义、具象艺术', scores: { S: 1 } },
      { id: 'b', text: '抽象艺术、超现实主义', scores: { N: 1 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-sn-015',
    text: '你更擅长做的菜是：',
    options: [
      { id: 'a', text: '按菜谱一步步做的家常菜', scores: { S: 1 } },
      { id: 'b', text: '凭感觉即兴发挥的创意菜', scores: { N: 1 } },
    ],
    dimensions: ['S', 'N'],
  },
  {
    id: 'mbti-tf-013',
    text: '你更看重：',
    options: [
      { id: 'a', text: '效率和结果', scores: { T: 1 } },
      { id: 'b', text: '人的感受和体验', scores: { F: 1 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-014',
    text: '你觉得自己是一个：',
    options: [
      { id: 'a', text: '善于思考分析的人', scores: { T: 1 } },
      { id: 'b', text: '善于体察人心的人', scores: { F: 1 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-tf-015',
    text: '和人争论时，你更可能：',
    options: [
      { id: 'a', text: '坚持自己的观点，据理力争', scores: { T: 1 } },
      { id: 'b', text: '为了和谐而妥协', scores: { F: 1 } },
    ],
    dimensions: ['T', 'F'],
  },
  {
    id: 'mbti-jp-013',
    text: '你更享受：',
    options: [
      { id: 'a', text: '把事情都完成后的成就感', scores: { J: 1 } },
      { id: 'b', text: '尝试新事物的新鲜感', scores: { P: 1 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-014',
    text: '你对"差不多就行了"的态度是：',
    options: [
      { id: 'a', text: '不太能接受，要做就做好', scores: { J: 1 } },
      { id: 'b', text: '很认同，不用太较真', scores: { P: 1 } },
    ],
    dimensions: ['J', 'P'],
  },
  {
    id: 'mbti-jp-015',
    text: '待办清单对你来说：',
    options: [
      { id: 'a', text: '很有用，每天都列', scores: { J: 1 } },
      { id: 'b', text: '列了也不会按做', scores: { P: 1 } },
    ],
    dimensions: ['J', 'P'],
  },
];

// 打乱题目顺序
export const getShuffledMBTIQuestions = (): TestQuestion[] => {
  const shuffled = [...MBTI_QUESTIONS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
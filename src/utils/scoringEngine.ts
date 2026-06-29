import type { Answer, TestResult, MBTIResult, BigFiveResult, EnneagramResult, TestQuestion } from '../types';
import { MBTI_RESULTS, BIGFIVE_RESULTS, ENNEAGRAM_RESULTS } from '../data/results';

// ============================================================================
// 计分引擎 - 支持多种测试类型的计分算法
// ============================================================================

// MBTI计分算法
export const calculateMBTI = (answers: Answer[]): MBTIResult => {
  const scores: Record<string, number> = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0,
  };

  answers.forEach(answer => {
    Object.entries(answer.optionScores).forEach(([dim, score]) => {
      if (scores.hasOwnProperty(dim)) {
        scores[dim] += score;
      }
    });
  });

  const eTotal = scores.E + scores.I || 1;
  const sTotal = scores.S + scores.N || 1;
  const tTotal = scores.T + scores.F || 1;
  const jTotal = scores.J + scores.P || 1;

  const typeCode = 
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');

  const percentages = {
    E: Math.round((scores.E / eTotal) * 100),
    I: Math.round((scores.I / eTotal) * 100),
    S: Math.round((scores.S / sTotal) * 100),
    N: Math.round((scores.N / sTotal) * 100),
    T: Math.round((scores.T / tTotal) * 100),
    F: Math.round((scores.F / tTotal) * 100),
    J: Math.round((scores.J / jTotal) * 100),
    P: Math.round((scores.P / jTotal) * 100),
  };

  const resultData = MBTI_RESULTS[typeCode] || MBTI_RESULTS['INTJ'];

  return {
    ...resultData,
    typeCode,
    percentages,
    dimensionScores: {
      '外向E': percentages.E,
      '内向I': percentages.I,
      '感觉S': percentages.S,
      '直觉N': percentages.N,
      '思考T': percentages.T,
      '情感F': percentages.F,
      '判断J': percentages.J,
      '知觉P': percentages.P,
    },
  };
};

// Big Five计分算法
export const calculateBigFive = (answers: Answer[]): BigFiveResult => {
  const dimensions = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
  const dimScores: Record<string, number[]> = {
    openness: [],
    conscientiousness: [],
    extraversion: [],
    agreeableness: [],
    neuroticism: [],
  };

  answers.forEach(answer => {
    Object.entries(answer.optionScores).forEach(([dim, score]) => {
      if (dimScores.hasOwnProperty(dim)) {
        dimScores[dim].push(score);
      }
    });
  });

  const finalScores: Record<string, number> = {};
  dimensions.forEach(dim => {
    const scores = dimScores[dim];
    if (scores.length > 0) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      finalScores[dim] = Math.min(100, Math.max(0, avg * 20));
    } else {
      finalScores[dim] = 50;
    }
  });

  const percentiles = {
    openness: Math.round(finalScores.openness),
    conscientiousness: Math.round(finalScores.conscientiousness),
    extraversion: Math.round(finalScores.extraversion),
    agreeableness: Math.round(finalScores.agreeableness),
    neuroticism: Math.round(finalScores.neuroticism),
  };

  const dominantDim = Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0][0];
  const resultData = BIGFIVE_RESULTS[dominantDim] || BIGFIVE_RESULTS['openness'];

  return {
    ...resultData,
    scores: {
      openness: Math.round(finalScores.openness),
      conscientiousness: Math.round(finalScores.conscientiousness),
      extraversion: Math.round(finalScores.extraversion),
      agreeableness: Math.round(finalScores.agreeableness),
      neuroticism: Math.round(finalScores.neuroticism),
    },
    percentiles,
    dimensionScores: {
      '开放性': Math.round(finalScores.openness),
      '尽责性': Math.round(finalScores.conscientiousness),
      '外向性': Math.round(finalScores.extraversion),
      '宜人性': Math.round(finalScores.agreeableness),
      '神经质': Math.round(finalScores.neuroticism),
    },
  };
};

// 九型人格计分算法
export const calculateEnneagram = (answers: Answer[]): EnneagramResult => {
  const typeScores: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
  };

  answers.forEach(answer => {
    Object.entries(answer.optionScores).forEach(([type, score]) => {
      const typeNum = parseInt(type);
      if (typeScores.hasOwnProperty(typeNum)) {
        typeScores[typeNum] += score;
      }
    });
  });

  const sortedTypes = Object.entries(typeScores).sort((a, b) => {
    // 先按分数降序排序，分数相同时按类型号升序排序（保证稳定性）
    if (b[1] !== a[1]) return b[1] - a[1];
    return parseInt(a[0]) - parseInt(b[0]);
  });
  const primaryType = parseInt(sortedTypes[0][0]);
  const wingType = parseInt(sortedTypes[1][0]);

  const resultData = ENNEAGRAM_RESULTS[primaryType] || ENNEAGRAM_RESULTS[1];

  return {
    ...resultData,
    typeNumber: primaryType,
    wing: `${primaryType}w${wingType}`,
    levelsOfDevelopment: '平均发展水平',
    dimensionScores: {
      '1号': typeScores[1],
      '2号': typeScores[2],
      '3号': typeScores[3],
      '4号': typeScores[4],
      '5号': typeScores[5],
      '6号': typeScores[6],
      '7号': typeScores[7],
      '8号': typeScores[8],
      '9号': typeScores[9],
    },
  };
};

// DISC计分算法
export const calculateDISC = (answers: Answer[]): TestResult => {
  const scores = { D: 0, I: 0, S: 0, C: 0 };
  
  answers.forEach(answer => {
    Object.entries(answer.optionScores).forEach(([dim, score]) => {
      if (scores.hasOwnProperty(dim)) {
        (scores as any)[dim] += score;
      }
    });
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const percentages = {
    D: Math.round((scores.D / total) * 100),
    I: Math.round((scores.I / total) * 100),
    S: Math.round((scores.S / total) * 100),
    C: Math.round((scores.C / total) * 100),
  };

  const dominant = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  
  const discResults: Record<string, TestResult> = {
    D: {
      type: 'D',
      title: '支配型',
      emoji: '🦁',
      shortDescription: '你是天生的领导者，果断直接，追求结果。',
      detailedDescription: '支配型（Dominance）的你喜欢掌控局面，行动力强，敢于挑战。你直接果断，关注结果和目标达成。在压力下你可能会显得不耐烦或过于强势。',
      dimensionScores: {
        '支配D': percentages.D,
        '影响I': percentages.I,
        '稳健S': percentages.S,
        '谨慎C': percentages.C,
      },
      strengths: ['领导力强', '行动迅速', '目标导向', '敢于决策'],
      weaknesses: ['可能不够耐心', '容易忽视他人感受', '对细节不够关注', '过度竞争'],
      recommendations: ['多倾听他人意见', '培养耐心', '关注团队协作', '平衡工作与生活'],
    },
    I: {
      type: 'I',
      title: '影响型',
      emoji: '🎉',
      shortDescription: '你是天生的社交达人，热情开朗，善于沟通。',
      detailedDescription: '影响型（Influence）的你性格外向，乐观热情，善于与人建立关系。你喜欢表达自己，享受成为焦点的感觉。在团队中你是氛围的带动者。',
      dimensionScores: {
        '支配D': percentages.D,
        '影响I': percentages.I,
        '稳健S': percentages.S,
        '谨慎C': percentages.C,
      },
      strengths: ['社交能力强', '乐观积极', '善于激励他人', '沟通能力出色'],
      weaknesses: ['可能缺乏条理', '容易分心', '过于在意他人看法', '有时不够专注'],
      recommendations: ['培养时间管理能力', '学习专注', '注意细节', '平衡社交与工作'],
    },
    S: {
      type: 'S',
      title: '稳健型',
      emoji: '🐢',
      shortDescription: '你是可靠的团队成员，稳重耐心，重视和谐。',
      detailedDescription: '稳健型（Steadiness）的你性格温和，做事稳重，有始有终。你重视安全感和稳定性，是团队中可靠的支持者。你善于倾听，乐于助人。',
      dimensionScores: {
        '支配D': percentages.D,
        '影响I': percentages.I,
        '稳健S': percentages.S,
        '谨慎C': percentages.C,
      },
      strengths: ['可靠稳定', '耐心细致', '善于倾听', '团队协作出色'],
      weaknesses: ['可能过于保守', '不善于表达需求', '变化适应慢', '容易过度迁就'],
      recommendations: ['勇于表达自己', '接受变化', '设定边界', '培养自信'],
    },
    C: {
      type: 'C',
      title: '谨慎型',
      emoji: '🔍',
      shortDescription: '你是追求完美的思考者，理性谨慎，注重细节。',
      detailedDescription: '谨慎型（Conscientiousness）的你思维严谨，追求精确和完美。你善于分析，重视数据和事实。你做事有条理，注重质量，但可能过度追求完美。',
      dimensionScores: {
        '支配D': percentages.D,
        '影响I': percentages.I,
        '稳健S': percentages.S,
        '谨慎C': percentages.C,
      },
      strengths: ['分析能力强', '注重细节', '追求完美', '逻辑清晰'],
      weaknesses: ['可能过度分析', '决策慢', '过于挑剔', '容易陷入细节'],
      recommendations: ['接受不完美', '培养决断力', '关注大局', '学会放手'],
    },
  };

  return discResults[dominant];
};

// 百分比计分（通用）
export const calculatePercentage = (answers: Answer[]): { score: number; dimensionScores: Record<string, number> } => {
  if (answers.length === 0) return { score: 50, dimensionScores: {} };

  let totalScore = 0;
  let maxScore = 0;
  const dimScores: Record<string, number> = {};
  const dimMax: Record<string, number> = {};

  answers.forEach(answer => {
    Object.entries(answer.optionScores).forEach(([dim, score]) => {
      dimScores[dim] = (dimScores[dim] || 0) + score;
      dimMax[dim] = (dimMax[dim] || 0) + 5;
    });
    
    const maxOption = Math.max(...Object.values(answer.optionScores), 1);
    const selectedScore = answer.optionScores[Object.keys(answer.optionScores)[0]] || 0;
    totalScore += selectedScore;
    maxScore += maxOption;
  });

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 50;
  
  const finalDimScores: Record<string, number> = {};
  Object.entries(dimScores).forEach(([dim, score]) => {
    const max = dimMax[dim] || 1;
    finalDimScores[dim] = Math.round((score / max) * 100);
  });

  return {
    score: percentage,
    dimensionScores: finalDimScores,
  };
};

// 分类计分（选择得分最高的类别）
export const calculateCategory = (answers: Answer[]): { category: string; scores: Record<string, number> } => {
  const categoryScores: Record<string, number> = {};

  answers.forEach(answer => {
    Object.entries(answer.optionScores).forEach(([cat, score]) => {
      categoryScores[cat] = (categoryScores[cat] || 0) + score;
    });
  });

  const sorted = Object.entries(categoryScores).sort((a, b) => b[1] - a[1]);
  const topCategory = sorted[0]?.[0] || 'default';

  return {
    category: topCategory,
    scores: categoryScores,
  };
};

// 通用计分函数
export const calculateResult = (scoringType: string, answers: Answer[]): any => {
  switch (scoringType) {
    case 'mbti':
      return calculateMBTI(answers);
    case 'bigfive':
      return calculateBigFive(answers);
    case 'enneagram':
      return calculateEnneagram(answers);
    case 'disc':
      return calculateDISC(answers);
    case 'percentage':
    case 'category':
    default:
      return null;
  }
};

// 生成结果等级描述
export const getLevelDescription = (score: number): { level: string; emoji: string; description: string; color: string } => {
  if (score >= 90) {
    return {
      level: '非常高',
      emoji: '🏆',
      description: '你的得分非常高，在这方面表现出色！',
      color: 'from-yellow-400 to-orange-500',
    };
  } else if (score >= 75) {
    return {
      level: '较高',
      emoji: '🌟',
      description: '你的得分高于平均水平，在这方面表现不错。',
      color: 'from-green-400 to-emerald-500',
    };
  } else if (score >= 50) {
    return {
      level: '中等',
      emoji: '👍',
      description: '你的得分处于平均水平，有提升空间。',
      color: 'from-blue-400 to-cyan-500',
    };
  } else if (score >= 25) {
    return {
      level: '较低',
      emoji: '💪',
      description: '你的得分低于平均水平，需要多加关注。',
      color: 'from-orange-400 to-red-500',
    };
  } else {
    return {
      level: '非常低',
      emoji: '🌱',
      description: '你的得分较低，这方面需要特别关注和提升。',
      color: 'from-red-400 to-pink-500',
    };
  }
};
import { MBTI_QUESTIONS, getShuffledMBTIQuestions } from './mbti';
import { getTestQuestions } from './generator';
import type { TestQuestion } from '../../types';
import { getTestById, ALL_TESTS } from '../../types';

// 获取测试题目
export const getQuestionsForTest = (testId: string): TestQuestion[] => {
  const test = getTestById(testId);
  
  if (!test) return [];
  
  // 特殊测试单独处理
  if (testId === 'mbti') {
    return getShuffledMBTIQuestions();
  }
  
  // 使用通用生成器
  return getTestQuestions(testId, test.questionCount, test.scoringType, test.dimensions);
};

export { MBTI_QUESTIONS, getShuffledMBTIQuestions };
export * from './generator';
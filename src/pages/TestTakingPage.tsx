import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, X } from 'lucide-react';
import { getTestById } from '../types';
import { getQuestionsForTest } from '../data/tests';
import { useTestSessionStore, useUserStore } from '../stores';
import { calculateResult, getLevelDescription } from '../utils/scoringEngine';
import type { TestQuestion, Answer } from '../types';

const TestTakingPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const test = getTestById(testId || '');
  const questions = getQuestionsForTest(testId || '');
  const { currentProgress, startTest, answerQuestion, goToQuestion, completeTest, resetTest } = useTestSessionStore();
  const { addTestRecord } = useUserStore();
  
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    if (test && questions.length > 0) {
      if (!currentProgress || currentProgress.testId !== testId) {
        startTest(testId!, questions.length);
      }
    }
  }, [testId, test, questions.length]);

  if (!test || !currentProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const currentIndex = currentProgress.currentQuestion;
  const totalQuestions = currentProgress.totalQuestions;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const currentQuestion: TestQuestion | undefined = questions[currentIndex];
  const currentAnswer = currentProgress.answers.find(a => a.questionId === currentQuestion?.id);

  const handleAnswer = (optionId: string, scores: Record<string, number>) => {
    if (!currentQuestion) return;
    answerQuestion(currentQuestion.id, optionId, scores);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      goToQuestion(currentIndex + 1);
    } else {
      // 完成测试
      const result = calculateResult(test.scoringType, currentProgress.answers);
      
      if (result) {
        completeTest(result);
        
        const record = {
          testId: test.id,
          sessionId: currentProgress.sessionId,
          completedAt: new Date().toISOString(),
          resultType: result.type || result.typeCode || 'unknown',
          resultTitle: result.title || '测试完成',
          resultEmoji: result.emoji || '✨',
          resultData: result,
          isPremium: false,
          sharedCount: 0,
        };
        
        addTestRecord(record);
        navigate(`/test/${testId}/result/${currentProgress.sessionId}`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    resetTest();
    navigate(`/test/${testId}`);
  };

  // 百分比测试结果计算
  const percentageResult = (() => {
    if (test.scoringType !== 'percentage') return null;
    let totalScore = 0;
    let maxScore = 0;
    currentProgress.answers.forEach(answer => {
      const maxOpt = Math.max(...Object.values(answer.optionScores), 1);
      const score = answer.optionScores[Object.keys(answer.optionScores)[0]] || 0;
      totalScore += score;
      maxScore += maxOpt;
    });
    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  })();

  if (!currentQuestion) return null;

  const isAnswered = !!currentAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleExit}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock className="w-4 h-4" />
              <span>约 {Math.ceil((totalQuestions - currentIndex) * 0.3)} 分钟</span>
            </div>
            
            <div className="text-sm font-medium">
              {currentIndex + 1} / {totalQuestions}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${test.gradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question Number */}
              <div className="text-center mb-8">
                <span className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${test.gradient} text-sm font-medium`}>
                  第 {currentIndex + 1} 题
                </span>
              </div>

              {/* Question Text */}
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentQuestion.text}
              </motion.h2>

              {/* Options */}
              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = currentAnswer?.selectedOptionId === option.id;
                  
                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      whileHover={{ scale: isSelected ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.id, option.scores)}
                      className={`w-full p-5 md:p-6 rounded-2xl text-left transition-all ${
                        isSelected
                          ? `bg-gradient-to-r ${test.gradient} border-2 border-white/50 shadow-lg shadow-purple-500/30`
                          : 'bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-white/30 text-white' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-lg">{option.text}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 z-20 bg-black/30 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: currentIndex > 0 ? 1.05 : 1 }}
            whileTap={{ scale: currentIndex > 0 ? 0.95 : 1 }}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition ${
              currentIndex === 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            上一题
          </motion.button>

          {/* Question Dots */}
          <div className="hidden md:flex gap-1">
            {[...Array(Math.min(totalQuestions, 20))].map((_, i) => {
              const answered = currentProgress.answers.some(a => {
                const qIndex = questions.findIndex(q => q.id === a.questionId);
                return qIndex === i;
              });
              const isCurrent = i === currentIndex;
              
              return (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    isCurrent ? `w-6 bg-gradient-to-r ${test.gradient}` :
                    answered ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                />
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: isAnswered ? 1.05 : 1 }}
            whileTap={{ scale: isAnswered ? 0.95 : 1 }}
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition ${
              !isAnswered
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : `bg-gradient-to-r ${test.gradient} hover:shadow-lg hover:shadow-purple-500/30`
            }`}
          >
            {currentIndex === totalQuestions - 1 ? '查看结果' : '下一题'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Mini Progress (mobile) */}
      {test.scoringType === 'percentage' && percentageResult !== null && (
        <div className="fixed right-4 top-24 bg-black/50 backdrop-blur px-4 py-2 rounded-full text-sm">
          当前得分: {percentageResult}%
        </div>
      )}

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowExitConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">确定要退出吗？</h3>
              <p className="text-gray-400 mb-6">
                你的测试进度将会丢失。确定要退出当前测试吗？
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 py-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition"
                >
                  继续测试
                </button>
                <button
                  onClick={confirmExit}
                  className="flex-1 py-3 bg-red-500 rounded-xl hover:bg-red-600 transition"
                >
                  确定退出
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestTakingPage;
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ArrowLeft, Share2, Download, Heart, RefreshCw, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import { getTestById, CATEGORY_INFO } from '../types';
import { useTestSessionStore, useUserStore } from '../stores';
import { getLevelDescription } from '../utils/scoringEngine';

const ResultPage: React.FC = () => {
  const { testId, sessionId } = useParams<{ testId: string; sessionId: string }>();
  const navigate = useNavigate();
  const test = getTestById(testId || '');
  const { currentResult, resetTest } = useTestSessionStore();
  const { user, toggleFavorite, isFavorite } = useUserStore();
  
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isFavoriteTest, setIsFavoriteTest] = useState(isFavorite(testId || ''));

  if (!test || !currentResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4">
        <p className="text-xl mb-4">暂无测试结果</p>
        <Link to={`/test/${testId}`} className="text-purple-400 hover:text-purple-300">
          去做测试
        </Link>
      </div>
    );
  }

  const categoryInfo = CATEGORY_INFO[test.category];
  const result = currentResult;
  
  // 准备雷达图数据
  const radarData = result.dimensionScores 
    ? Object.entries(result.dimensionScores).map(([name, value]) => ({
        subject: name,
        value: typeof value === 'number' ? value : 50,
        fullMark: 100,
      }))
    : [];

  // 准备柱状图数据
  const barData = result.dimensionScores
    ? Object.entries(result.dimensionScores).map(([name, value]) => ({
        name,
        value: typeof value === 'number' ? value : 50,
      }))
    : [];

  const handleFavorite = () => {
    toggleFavorite(test.id);
    setIsFavoriteTest(!isFavoriteTest);
  };

  const handleRetake = () => {
    resetTest();
    navigate(`/test/${testId}/start`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('链接已复制到剪贴板！');
  };

  // 百分比类型测试
  const isPercentageType = test.scoringType === 'percentage';
  const percentageScore = isPercentageType && (result.score || 50);
  const levelInfo = isPercentageType ? getLevelDescription(percentageScore as number) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-8 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/tests" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span>更多测试</span>
          </Link>
        </motion.div>

        {/* Result Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br ${test.gradient} mb-8 text-center`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="text-8xl mb-6"
            >
              {result.emoji || '✨'}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-5xl font-bold mb-3"
            >
              {result.type || result.typeCode || ''} · {result.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              {result.shortDescription}
            </motion.p>

            {isPercentageType && levelInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 inline-block"
              >
                <div className={`px-6 py-3 rounded-full bg-white/20 text-lg font-bold`}>
                  得分：{percentageScore}分 · {levelInfo.level}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Charts Section */}
        {radarData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {/* Radar Chart */}
            {radarData.length >= 3 && (
              <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">维度分析</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 10 }} />
                      <Radar
                        name="得分"
                        dataKey="value"
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Bar Chart */}
            {barData.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">各维度得分</h3>
                <div className="h-64 overflow-auto">
                  <ResponsiveContainer width="100%" height={Math.max(barData.length * 40, 200)}>
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${260 + index * 10}, 80%, 60%)`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* MBTI Percentages */}
        {result.percentages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700 mb-8"
          >
            <h3 className="text-xl font-bold mb-6">四维度倾向</h3>
            <div className="space-y-4">
              {[
                { left: 'E 外向', right: 'I 内向', leftVal: result.percentages.E, rightVal: result.percentages.I },
                { left: 'S 感觉', right: 'N 直觉', leftVal: result.percentages.S, rightVal: result.percentages.N },
                { left: 'T 思考', right: 'F 情感', leftVal: result.percentages.T, rightVal: result.percentages.F },
                { left: 'J 判断', right: 'P 知觉', leftVal: result.percentages.J, rightVal: result.percentages.P },
              ].map((dim, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={dim.leftVal > dim.rightVal ? 'text-purple-400 font-medium' : 'text-gray-400'}>
                      {dim.left} ({dim.leftVal}%)
                    </span>
                    <span className={dim.rightVal > dim.leftVal ? 'text-pink-400 font-medium' : 'text-gray-400'}>
                      {dim.right} ({dim.rightVal}%)
                    </span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dim.leftVal}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dim.rightVal}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-l from-pink-500 to-pink-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Detailed Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700 mb-8"
        >
          <button
            onClick={() => setShowFullAnalysis(!showFullAnalysis)}
            className="w-full flex items-center justify-between text-xl font-bold"
          >
            <span>📝 详细解读</span>
            {showFullAnalysis ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          
          <AnimatePresence>
            {showFullAnalysis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 space-y-6">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {result.detailedDescription}
                  </p>

                  {result.strengths && result.strengths.length > 0 && (
                    <div>
                      <h4 className="font-bold text-green-400 mb-3">✨ 你的优势</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {result.strengths.map((s, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-300">
                            <span className="text-green-400">✓</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.weaknesses && result.weaknesses.length > 0 && (
                    <div>
                      <h4 className="font-bold text-orange-400 mb-3">⚡ 需要改进</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {result.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-300">
                            <span className="text-orange-400">!</span>
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.recommendations && result.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-bold text-blue-400 mb-3">💡 发展建议</h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <span className="text-blue-400 mt-1">{i + 1}.</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.careerSuggestions && result.careerSuggestions.length > 0 && (
                    <div>
                      <h4 className="font-bold text-purple-400 mb-3">💼 适合职业</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.careerSuggestions.map((c, i) => (
                          <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.famousPeople && result.famousPeople.length > 0 && (
                    <div>
                      <h4 className="font-bold text-yellow-400 mb-3">🌟 同类型名人</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.famousPeople.map((p, i) => (
                          <span key={i} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.relationshipTips && (
                    <div>
                      <h4 className="font-bold text-pink-400 mb-3">💕 感情建议</h4>
                      <p className="text-gray-300">{result.relationshipTips}</p>
                    </div>
                  )}

                  {result.growthPath && (
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-3">🌱 成长路径</h4>
                      <p className="text-gray-300">{result.growthPath}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!showFullAnalysis && (
            <p className="text-gray-400 mt-4 line-clamp-2">
              {result.shortDescription}
            </p>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition"
          >
            <Share2 className="w-5 h-5" />
            分享结果
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFavorite}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition ${
              isFavoriteTest
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavoriteTest ? 'fill-white' : ''}`} />
            {isFavoriteTest ? '已收藏' : '收藏'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetake}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-full font-medium hover:bg-gray-600 transition"
          >
            <RefreshCw className="w-5 h-5" />
            再测一次
          </motion.button>
        </motion.div>

        {/* Premium Card */}
        {!user.isVIP && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-5xl">👑</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">解锁 VIP 深度报告</h3>
                <p className="text-gray-300">
                  获得更详细的个性化分析、职业规划、感情建议和成长指南
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full font-bold text-gray-900 flex items-center gap-2"
              >
                <Crown className="w-5 h-5" />
                立即解锁
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* More Tests */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <h3 className="text-xl font-bold mb-6">更多有趣测试</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['bigfive', 'enneagram', 'disc', 'zodiac-personality'].map((id) => {
              const t = getTestById(id);
              if (!t) return null;
              return (
                <Link
                  key={id}
                  to={`/test/${id}`}
                  className="p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition border border-gray-700 hover:border-purple-500"
                >
                  <div className="text-3xl mb-2">{t.emoji}</div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{t.questionCount}题 · {t.estimatedTime}分钟</div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-6 text-center">分享测试结果</h3>
              
              {/* Share Card Preview */}
              <div className={`bg-gradient-to-br ${test.gradient} rounded-xl p-6 mb-6`}>
                <div className="text-center">
                  <div className="text-5xl mb-3">{result.emoji}</div>
                  <div className="font-bold text-lg">{result.title}</div>
                  <div className="text-sm text-white/80">{result.type}</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {['微信', '朋友圈', '微博', 'QQ'].map((platform) => (
                  <button
                    key={platform}
                    className="p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition text-sm"
                    onClick={() => alert(`${platform}分享功能开发中...`)}
                  >
                    <div className="text-2xl mb-1">{platform === '微信' ? '💬' : platform === '朋友圈' ? '📱' : platform === '微博' ? '🐦' : '🐧'}</div>
                    {platform}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyLink}
                className="w-full py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                复制链接
              </button>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-full mt-3 py-3 text-gray-400 hover:text-white transition"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultPage;
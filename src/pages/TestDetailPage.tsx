import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BarChart3, Star, ArrowRight, Heart, Share2 } from 'lucide-react';
import { getTestById, CATEGORY_INFO } from '../types';
import { useUserStore } from '../stores';

const TestDetailPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const test = getTestById(testId || '');
  const { toggleFavorite, isFavorite } = useUserStore();
  
  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-2xl mb-4">测试不存在</p>
          <Link to="/tests" className="text-purple-400 hover:text-purple-300">返回测试列表</Link>
        </div>
      </div>
    );
  }

  const categoryInfo = CATEGORY_INFO[test.category];
  const isFav = isFavorite(test.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/tests" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>返回测试列表</span>
          </Link>
        </motion.div>

        {/* Test Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br ${test.gradient} mb-8`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {categoryInfo.emoji} {categoryInfo.name}
                  </span>
                  {!test.isFree && (
                    <span className="px-3 py-1 bg-yellow-500/80 rounded-full text-sm">
                      👑 VIP
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4">
                  <span className="text-6xl">{test.emoji}</span>
                  {test.name}
                </h1>
                
                <p className="text-xl text-white/90 max-w-2xl">
                  {test.description}
                </p>
              </div>
              
              <button
                onClick={() => toggleFavorite(test.id)}
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
              >
                <Heart className={`w-6 h-6 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>约 {test.estimatedTime} 分钟</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                <span>{test.questionCount} 道题</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < test.difficulty ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`} />
                ))}
                <span className="ml-2">难度</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔥</span>
                <span>{test.popularity}% 热度</span>
              </div>
            </div>

            {/* Start Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10"
            >
              <Link
                to={`/test/${test.id}/start`}
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-gray-900 rounded-full text-xl font-bold hover:shadow-xl hover:shadow-white/30 transition-all"
              >
                开始测试
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {test.tags.map(tag => (
            <span key={tag} className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* Test Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              📝 测试说明
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                请根据你的第一直觉选择答案，没有对错之分
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                测试过程中可以随时返回修改答案
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                结果会自动保存在本地，可以在历史记录中查看
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                支持一键生成精美图片分享到社交平台
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              💡 温馨提示
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">⭐</span>
                本测试仅供娱乐和自我探索参考
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">⭐</span>
                如需专业心理评估，请咨询专业人士
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">⭐</span>
                你的数据仅保存在本地，不会上传服务器
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">⭐</span>
                建议在安静的环境中完成测试，效果最佳
              </li>
            </ul>
          </div>
        </motion.div>

        {/* What You'll Get */}
        {test.dimensions && test.dimensions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700 mb-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              📊 你将获得哪些维度的分析
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {test.dimensions.map((dim, i) => (
                <motion.div
                  key={dim}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${test.gradient} text-center`}
                >
                  <div className="text-3xl mb-2">✨</div>
                  <div className="font-medium">{dim}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Share & Start */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
          >
            <Share2 className="w-5 h-5" />
            分享给朋友
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/test/${test.id}/start`}
              className={`flex items-center gap-3 px-10 py-4 bg-gradient-to-r ${test.gradient} rounded-full text-xl font-bold hover:shadow-xl transition-all`}
            >
              立即开始
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestDetailPage;
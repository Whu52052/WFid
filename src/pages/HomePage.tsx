import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Star, Heart, Gamepad2, Briefcase, Zap, User, LogIn } from 'lucide-react';
import { CATEGORY_INFO, TestCategory } from '../types';
import { useUserStore } from '../stores';

const HomePage: React.FC = () => {
  const { user } = useUserStore();
  const isLoggedIn = user.userId && !user.userId.startsWith('guest_');

  const categories = Object.entries(CATEGORY_INFO).map(([key, value]) => ({
    id: key as TestCategory,
    ...value
  }));

  const handleLogout = () => {
    localStorage.removeItem('wfid_token');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            ✨ 趣味测试
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/tests" className="text-sm text-gray-300 hover:text-white transition">
              全部测试
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/user" className="p-2 hover:bg-white/10 rounded-full transition">
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-white/20 transition"
                >
                  退出登录
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-medium hover:shadow-lg transition">
                <LogIn className="w-4 h-4" />
                登录
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        className="relative h-screen flex flex-col items-center justify-center px-4 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          className="text-center z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-16 h-16 text-purple-400" />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            趣味测试平台
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            探索你的内心世界 · 发现隐藏的自我 · 55+精选测试等你来挑战
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/tests"
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 inline-block"
            >
              开始探索 ✨
            </Link>
          </motion.div>

          <div className="mt-12 flex gap-4 justify-center text-sm text-gray-400">
            <span>🧠 55+精选测试</span>
            <span>📊 科学分析</span>
            <span>⚡ 即时结果</span>
            <span>🔒 匿名免费</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Categories Section */}
      <div className="py-20 px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          探索六大测试领域
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group"
            >
              <Link
                to={`/tests?category=${category.id}`}
                className={`block p-8 rounded-2xl bg-gradient-to-br ${category.gradient} hover:shadow-xl transition-all duration-300`}
              >
                <div className="text-5xl mb-4">{category.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-200">{category.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Tests */}
      <div className="py-20 px-4 bg-black/30">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
          热门测试推荐
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { id: 'mbti', name: 'MBTI人格测试', emoji: '🧠', desc: '93题专业版', color: 'from-purple-500 to-indigo-600' },
            { id: 'sbti', name: 'SBTI趣味测试', emoji: '🎮', desc: '31题快速版', color: 'from-pink-500 to-rose-600' },
            { id: 'bigfive', name: 'Big Five科学测试', emoji: '📊', desc: '科学心理学', color: 'from-blue-500 to-cyan-600' },
            { id: 'zodiac', name: '星座配对分析', emoji: '✨', desc: '12星座详解', color: 'from-yellow-500 to-orange-600' },
          ].map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <Link
                to={`/test/${test.id}`}
                className={`block p-6 rounded-xl bg-gradient-to-br ${test.color} hover:shadow-lg transition-all`}
              >
                <div className="text-4xl mb-3">{test.emoji}</div>
                <h4 className="text-xl font-bold mb-1">{test.name}</h4>
                <p className="text-sm text-gray-200">{test.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 px-4 text-center text-gray-500 border-t border-gray-800">
        <p>© 2026 趣味测试平台 · 探索自我，发现更多可能</p>
      </div>
    </div>
  );
};

export default HomePage;
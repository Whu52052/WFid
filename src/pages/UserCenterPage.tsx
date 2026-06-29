import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Clock, Heart, Settings, Crown, ArrowLeft, Trash2, ChevronRight } from 'lucide-react';
import { useUserStore } from '../stores';
import { getTestById } from '../types';

const UserCenterPage: React.FC = () => {
  const { user } = useUserStore();
  const testHistory = user.testHistory;
  const favoriteTests = user.favoriteTests;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span>返回首页</span>
          </Link>
        </motion.div>

        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="text-7xl">{user.avatar}</div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold">{user.nickname}</h1>
                {user.isVIP && (
                  <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                    <Crown className="w-4 h-4 inline mr-1" />
                    VIP
                  </span>
                )}
              </div>
              <p className="text-white/80 mb-4">
                已完成 {testHistory.length} 个测试 · 收藏 {favoriteTests.length} 个
              </p>
              <div className="flex gap-3 justify-center md:justify-start">
                <button className="px-4 py-2 bg-white/20 rounded-full text-sm hover:bg-white/30 transition">
                  编辑资料
                </button>
                {!user.isVIP && (
                  <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold hover:bg-yellow-300 transition">
                    升级VIP
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Menu Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Test History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur rounded-2xl border border-gray-700 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">测试历史</h3>
                  <p className="text-sm text-gray-400">{testHistory.length} 个已完成测试</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>
            
            <div className="p-4 max-h-64 overflow-auto">
              {testHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>还没有测试记录</p>
                  <Link to="/tests" className="text-purple-400 hover:text-purple-300 text-sm">
                    去做第一个测试
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {testHistory.slice(0, 5).map((record) => {
                    const test = getTestById(record.testId);
                    return (
                      <Link
                        key={record.sessionId}
                        to={`/test/${record.testId}/result/${record.sessionId}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700/50 transition"
                      >
                        <div className="text-2xl">{record.resultEmoji || test?.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{test?.name || record.resultTitle}</div>
                          <div className="text-sm text-gray-400">{record.resultType} · {new Date(record.completedAt).toLocaleDateString()}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>

          {/* Favorites */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur rounded-2xl border border-gray-700 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">我的收藏</h3>
                  <p className="text-sm text-gray-400">{favoriteTests.length} 个收藏</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>
            
            <div className="p-4 max-h-64 overflow-auto">
              {favoriteTests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>还没有收藏的测试</p>
                  <Link to="/tests" className="text-purple-400 hover:text-purple-300 text-sm">
                    发现喜欢的测试
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {favoriteTests.map((testId) => {
                    const test = getTestById(testId);
                    if (!test) return null;
                    return (
                      <Link
                        key={testId}
                        to={`/test/${testId}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700/50 transition"
                      >
                        <div className="text-2xl">{test.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{test.name}</div>
                          <div className="text-sm text-gray-400">{test.questionCount}题 · {test.estimatedTime}分钟</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur rounded-2xl border border-gray-700 overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-500/20 rounded-xl">
                <Settings className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">设置</h3>
                <p className="text-sm text-gray-400">个性化你的体验</p>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-700">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌙</span>
                <span>深色模式</span>
              </div>
              <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔊</span>
                <span>动画效果</span>
              </div>
              <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <span>语言</span>
              </div>
              <span className="text-gray-400">简体中文</span>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">清除数据</h3>
              <p className="text-sm text-gray-400 mb-4">
                清除所有本地数据，包括测试历史、收藏和设置。此操作不可撤销。
              </p>
              <button 
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm"
                onClick={() => {
                  if (confirm('确定要清除所有数据吗？')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
              >
                清除所有数据
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserCenterPage;
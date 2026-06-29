import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { CATEGORY_INFO, TestCategory } from '../types';

const TestListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') as TestCategory | null;
  const [searchQuery, setSearchQuery] = useState('');

  const tests = [
    { id: 'mbti', name: 'MBTI人格测试', category: 'A', emoji: '🧠', time: 15, questions: 93, desc: '专业版人格测试' },
    { id: 'sbti', name: 'SBTI趣味测试', category: 'A', emoji: '🎮', time: 5, questions: 31, desc: '网络梗人格测试' },
    { id: 'bigfive', name: 'Big Five科学测试', category: 'A', emoji: '📊', time: 10, questions: 60, desc: '科学心理学测试' },
    { id: 'enneagram', name: '九型人格测试', category: 'A', emoji: '⭐', time: 12, questions: 36, desc: '深层动机分析' },
    { id: 'disc', name: 'DISC行为风格', category: 'A', emoji: '🎯', time: 8, questions: 28, desc: '职场行为分析' },
    { id: 'brain-type', name: '脑型测试', category: 'A', emoji: '🧠', time: 3, questions: 20, desc: '左脑/右脑分析' },
    { id: 'color', name: '色彩性格测试', category: 'A', emoji: '🎨', time: 2, questions: 10, desc: '色彩心理学' },
    { id: 'animal', name: '动物人格测试', category: 'A', emoji: '🦁', time: 3, questions: 20, desc: '趣味动物类比' },
    { id: 'zodiac', name: '星座完整分析', category: 'B', emoji: '✨', time: 3, questions: 12, desc: '12星座详解' },
    { id: 'zodiac-match', name: '星座配对分析', category: 'B', emoji: '💕', time: 1, questions: 2, desc: '星座配对指数' },
    { id: 'love-style', name: '恋爱风格测试', category: 'C', emoji: '💕', time: 5, questions: 25, desc: '五种恋爱类型' },
    { id: 'love-language', name: '爱情语言测试', category: 'C', emoji: '❤️', time: 5, questions: 30, desc: '爱的语言识别' },
    { id: 'anime', name: '动漫角色匹配', category: 'D', emoji: '🎭', time: 5, questions: 20, desc: '动漫角色匹配' },
    { id: 'animal-type', name: '你是哪种动物', category: 'D', emoji: '🦊', time: 3, questions: 15, desc: '50+动物类型' },
    { id: 'career', name: '职业兴趣测试', category: 'E', emoji: '💼', time: 10, questions: 48, desc: 'Holland职业类型' },
    { id: 'leadership', name: '领导力评估', category: 'E', emoji: '👑', time: 8, questions: 30, desc: '领导风格识别' },
  ];

  const filteredTests = tests.filter(test => {
    const matchesCategory = !selectedCategory || test.category === selectedCategory;
    const matchesSearch = !searchQuery || test.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Object.entries(CATEGORY_INFO);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white px-4 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          探索全部测试
        </motion.h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索测试..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 py-2 rounded-lg ${!selectedCategory ? 'bg-purple-600' : 'bg-gray-800'} hover:bg-purple-600 transition`}
            >
              全部
            </button>
            {categories.map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSearchParams({ category: key })}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${selectedCategory === key ? 'bg-purple-600' : 'bg-gray-800'} hover:bg-purple-600 transition`}
              >
                <span>{value.emoji}</span>
                <span>{value.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={`/test/${test.id}`}
                className="block p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all border border-gray-700 hover:border-purple-500"
              >
                <div className="text-4xl mb-3">{test.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{test.name}</h3>
                <p className="text-gray-400 mb-3">{test.desc}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{test.questions}题</span>
                  <span>{test.time}分钟</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl">没有找到相关测试</p>
            <p className="mt-2">试试其他关键词或分类</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestListPage;
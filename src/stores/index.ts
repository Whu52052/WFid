import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserData, TestRecord, TestProgress, Answer, TestCategory, SortOption, UserPreferences } from '../types';

interface UserStore {
  user: UserData;
  setUser: (user: UserData) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  addTestRecord: (record: TestRecord) => void;
  toggleFavorite: (testId: string) => void;
  isFavorite: (testId: string) => boolean;
  setVIP: (isVIP: boolean) => void;
}

const defaultUser: UserData = {
  userId: `guest_${Date.now()}`,
  nickname: '访客用户',
  avatar: '😎',
  isVIP: false,
  testHistory: [],
  favoriteTests: [],
  preferences: {
    theme: 'dark',
    language: 'zh-CN',
    fontSize: 'medium',
    animationsEnabled: true,
  },
  createdAt: new Date().toISOString(),
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      
      setUser: (user) => set({ user }),
      
      updatePreferences: (prefs) => set((state) => ({
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...prefs },
        },
      })),
      
      addTestRecord: (record) => set((state) => {
        const exists = state.user.testHistory.find(r => r.sessionId === record.sessionId);
        if (exists) return state;
        return {
          user: {
            ...state.user,
            testHistory: [record, ...state.user.testHistory].slice(0, 100),
          },
        };
      }),
      
      toggleFavorite: (testId) => set((state) => {
        const isFav = state.user.favoriteTests.includes(testId);
        return {
          user: {
            ...state.user,
            favoriteTests: isFav
              ? state.user.favoriteTests.filter(id => id !== testId)
              : [...state.user.favoriteTests, testId],
          },
        };
      }),
      
      isFavorite: (testId) => {
        return get().user.favoriteTests.includes(testId);
      },
      
      setVIP: (isVIP) => set((state) => ({
        user: { ...state.user, isVIP },
      })),
    }),
    {
      name: 'fun-test-user-storage',
    }
  )
);

// 测试状态管理
interface TestSessionStore {
  currentProgress: TestProgress | null;
  currentResult: any;
  isTakingTest: boolean;
  isTestComplete: boolean;
  
  startTest: (testId: string, totalQuestions: number) => void;
  answerQuestion: (questionId: string, optionId: string, scores: Record<string, number>) => void;
  goToQuestion: (index: number) => void;
  completeTest: (result: any) => void;
  resetTest: () => void;
}

export const useTestSessionStore = create<TestSessionStore>()(
  persist(
    (set, get) => ({
      currentProgress: null,
      currentResult: null,
      isTakingTest: false,
      isTestComplete: false,
      
      startTest: (testId, totalQuestions) => {
        const progress: TestProgress = {
          sessionId: `sess_${Date.now()}`,
          testId,
          currentQuestion: 0,
          totalQuestions,
          answers: [],
          startedAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        };
        set({
          currentProgress: progress,
          isTakingTest: true,
          isTestComplete: false,
          currentResult: null,
        });
      },
      
      answerQuestion: (questionId, optionId, scores) => set((state) => {
        if (!state.currentProgress) return state;
        
        const existingIndex = state.currentProgress.answers.findIndex(a => a.questionId === questionId);
        const newAnswer: Answer = {
          questionId,
          selectedOptionId: optionId,
          answeredAt: new Date().toISOString(),
          optionScores: scores,
        };
        
        let newAnswers = [...state.currentProgress.answers];
        if (existingIndex >= 0) {
          newAnswers[existingIndex] = newAnswer;
        } else {
          newAnswers.push(newAnswer);
        }
        
        return {
          currentProgress: {
            ...state.currentProgress,
            answers: newAnswers,
            lastUpdated: new Date().toISOString(),
          },
        };
      }),
      
      goToQuestion: (index) => set((state) => {
        if (!state.currentProgress) return state;
        return {
          currentProgress: {
            ...state.currentProgress,
            currentQuestion: index,
          },
        };
      }),
      
      completeTest: (result) => set((state) => ({
        currentResult: result,
        isTestComplete: true,
      })),
      
      resetTest: () => set({
        currentProgress: null,
        currentResult: null,
        isTakingTest: false,
        isTestComplete: false,
      }),
    }),
    {
      name: 'fun-test-session-storage',
    }
  )
);

// 应用全局状态
interface AppStore {
  searchQuery: string;
  selectedCategory: TestCategory | null;
  sortBy: SortOption;
  showMobileNav: boolean;
  showShareModal: boolean;
  shareData: any;
  
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: TestCategory | null) => void;
  setSortBy: (sort: SortOption) => void;
  setShowMobileNav: (show: boolean) => void;
  openShareModal: (data: any) => void;
  closeShareModal: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  searchQuery: '',
  selectedCategory: null,
  sortBy: 'popularity',
  showMobileNav: false,
  showShareModal: false,
  shareData: null,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setShowMobileNav: (show) => set({ showMobileNav: show }),
  openShareModal: (data) => set({ showShareModal: true, shareData: data }),
  closeShareModal: () => set({ showShareModal: false, shareData: null }),
}));
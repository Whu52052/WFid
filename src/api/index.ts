import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('wfid_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('wfid_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      nickname: string;
      avatar: string;
      bio: string;
      isVIP: boolean;
      vipExpiry?: string;
      createdAt: string;
    };
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      nickname: string;
      avatar: string;
      bio: string;
      isVIP: boolean;
      vipExpiry?: string;
      createdAt: string;
    };
  };
}

export interface SyncData {
  user: {
    id: string;
    username: string;
    nickname: string;
    avatar: string;
    bio: string;
    isVIP: boolean;
    vipExpiry?: string;
  };
  preferences: {
    theme: string;
    language: string;
    fontSize: string;
    animations: boolean;
  };
  testRecords: any[];
  favorites: string[];
}

export interface SyncResponse {
  success: boolean;
  message: string;
  data: SyncData;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  sender?: {
    id: string;
    nickname: string;
    avatar: string;
  };
}

export interface Conversation {
  userId: string;
  nickname: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const authAPI = {
  login: (username: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { username, password }),

  register: (username: string, password: string, nickname?: string) =>
    api.post<RegisterResponse>('/auth/register', { username, password, nickname }),

  changePassword: (oldPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { oldPassword, newPassword }),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),

  updateProfile: (data: { nickname?: string; avatar?: string; bio?: string; preferences?: any }) =>
    api.put('/user/profile', data),

  getSync: () => api.get<SyncResponse>('/user/sync'),

  postSync: (data: { testRecords?: any[]; favorites?: string[]; preferences?: any; userInfo?: any }) =>
    api.post<SyncResponse>('/user/sync', data),

  getTestRecords: (params?: { testId?: string; page?: number; pageSize?: number }) =>
    api.get('/user/test-records', { params }),
};

export const messageAPI = {
  getConversations: () => api.get<{ success: boolean; data: Conversation[] }>('/message/conversations'),

  getMessages: (userId: string, params?: { before?: string; limit?: number }) =>
    api.get<{ success: boolean; data: Message[] }>(`/message/messages/${userId}`, { params }),

  sendMessage: (receiverId: string, content: string, type?: string) =>
    api.post<{ success: boolean; data: Message }>('/message/messages', { receiverId, content, type }),

  markRead: (userId: string) =>
    api.post(`/message/messages/read/${userId}`),

  getUnreadCount: () => api.get<{ success: boolean; data: { count: number } }>('/message/unread-count'),

  searchUsers: (keyword: string) =>
    api.get<{ success: boolean; data: any[] }>('/message/search', { params: { keyword } }),
};

export default api;
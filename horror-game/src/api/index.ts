const API_BASE = '/api'

interface ApiResponse<T> {
  data?: T
  error?: string
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('authToken')

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || '请求失败' }
    }

    return { data }
  } catch (error) {
    return { error: '网络错误，请检查连接' }
  }
}

// Auth API
export const authApi = {
  register: (username: string, password: string, nickname: string) =>
    request<{ token: string; user: { id: string; username: string; nickname: string } }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({ username, password, nickname }),
      }
    ),

  login: (username: string, password: string) =>
    request<{ token: string; user: { id: string; username: string; nickname: string } }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }
    ),

  getMe: () =>
    request<{ id: string; username: string; nickname: string; lastOnlineAt: string }>(
      '/auth/me'
    ),
}

// Rooms API
export const roomsApi = {
  create: () =>
    request<{ id: string; roomCode: string; status: string }>(
      '/rooms',
      { method: 'POST' }
    ),

  getByCode: (code: string) =>
    request<{
      id: string
      roomCode: string
      status: string
      currentChapter: number
      players: { id: string; nickname: string; currentSceneId: string; isOnline: boolean }[]
    }>(`/rooms/${code}`),

  join: (code: string) =>
    request<{ roomId: string; roomCode: string; message: string }>(
      `/rooms/${code}/join`,
      { method: 'POST' }
    ),

  getProgress: (roomId: string) =>
    request<{
      currentSceneId: string
      inventory: any[]
      notes: any[]
      exploredScenes: string[]
      solvedPuzzles: string[]
    }>(`/rooms/${roomId}/progress`),

  updateProgress: (
    roomId: string,
    data: {
      currentSceneId?: string
      inventory?: any[]
      notes?: any[]
      exploredScenes?: string[]
      solvedPuzzles?: string[]
    }
  ) =>
    request<any>(`/rooms/${roomId}/progress`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  leave: (roomId: string) =>
    request<{ message: string }>(`/rooms/${roomId}/leave`, { method: 'POST' }),
}

// Scenes API
export const scenesApi = {
  getAll: () =>
    request<
      {
        id: string
        chapterId: number
        name: string
        description: string
        connections: string[]
        items: string[]
        puzzles: string[]
      }[]
    >('/scenes'),

  getById: (id: string) =>
    request<{
      id: string
      chapterId: number
      name: string
      description: string
      connections: string[]
      items: string[]
      puzzles: string[]
    }>(`/scenes/${id}`),

  getPuzzles: (sceneId: string) =>
    request<
      {
        id: string
        sceneId: string
        type: string
        name: string
        hint: string
        solution: string
        reward: any
        isSolved: boolean
      }[]
    >(`/scenes/${sceneId}/puzzles`),

  solvePuzzle: (sceneId: string, puzzleId: string, solution: string) =>
    request<{ success: boolean; reward: any }>(`/scenes/${sceneId}/puzzles/${puzzleId}/solve`, {
      method: 'POST',
      body: JSON.stringify({ solution }),
    }),
}

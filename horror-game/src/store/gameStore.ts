import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Item {
  id: string
  name: string
  description: string
  icon: string
  combinable: boolean
  combinableWith?: string[]
}

export interface Note {
  id: string
  title: string
  content: string
  category: 'diary' | 'clue' | 'dialogue'
  unlockedAt: number
}

export interface Scene {
  id: string
  name: string
  description: string
  image?: string
  connections: string[]
  items: string[]
  puzzles: string[]
  explored: boolean
}

export interface Character {
  nickname: string
  background: string
}

interface GameState {
  character: Character | null
  currentScene: string
  chapter: number
  inventory: Item[]
  notes: Note[]
  exploredScenes: string[]
  solvedPuzzles: string[]
  isPlaying: boolean
  roomCode: string | null

  setCharacter: (character: Character) => void
  setCurrentScene: (sceneId: string) => void
  setChapter: (chapter: number) => void
  addItem: (item: Item) => void
  removeItem: (itemId: string) => void
  addNote: (note: Note) => void
  markSceneExplored: (sceneId: string) => void
  solvePuzzle: (puzzleId: string) => void
  startGame: (roomCode?: string) => void
  resetGame: () => void
}

const initialState = {
  character: null,
  currentScene: 'entrance',
  chapter: 0,
  inventory: [],
  notes: [],
  exploredScenes: [],
  solvedPuzzles: [],
  isPlaying: false,
  roomCode: null,
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,

      setCharacter: (character) => set({ character }),

      setCurrentScene: (sceneId) => set({ currentScene: sceneId }),

      setChapter: (chapter) => set({ chapter }),

      addItem: (item) => set((state) => ({
        inventory: state.inventory.some(i => i.id === item.id)
          ? state.inventory
          : [...state.inventory, item]
      })),

      removeItem: (itemId) => set((state) => ({
        inventory: state.inventory.filter(i => i.id !== itemId)
      })),

      addNote: (note) => set((state) => ({
        notes: state.notes.some(n => n.id === note.id)
          ? state.notes
          : [...state.notes, note]
      })),

      markSceneExplored: (sceneId) => set((state) => ({
        exploredScenes: state.exploredScenes.includes(sceneId)
          ? state.exploredScenes
          : [...state.exploredScenes, sceneId]
      })),

      solvePuzzle: (puzzleId) => set((state) => ({
        solvedPuzzles: state.solvedPuzzles.includes(puzzleId)
          ? state.solvedPuzzles
          : [...state.solvedPuzzles, puzzleId]
      })),

      startGame: (roomCode) => set({
        isPlaying: true,
        roomCode: roomCode || null
      }),

      resetGame: () => set(initialState),
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({
        character: state.character,
        currentScene: state.currentScene,
        chapter: state.chapter,
        inventory: state.inventory,
        notes: state.notes,
        exploredScenes: state.exploredScenes,
        solvedPuzzles: state.solvedPuzzles,
        isPlaying: state.isPlaying,
        roomCode: state.roomCode,
      }),
    }
  )
)

// Multiplayer state
interface MultiplayerState {
  isInRoom: boolean
  roomCode: string | null
  players: { id: string; nickname: string; isOnline: boolean; currentScene: string }[]
  messages: { id: string; senderId: string; senderName: string; content: string; timestamp: number }[]

  setRoom: (code: string | null, players?: any[]) => void
  addPlayer: (player: any) => void
  removePlayer: (playerId: string) => void
  updatePlayerScene: (playerId: string, sceneId: string) => void
  addMessage: (message: any) => void
  leaveRoom: () => void
}

export const useMultiplayerStore = create<MultiplayerState>((set) => ({
  isInRoom: false,
  roomCode: null,
  players: [],
  messages: [],

  setRoom: (code, players = []) => set({ isInRoom: !!code, roomCode: code, players }),

  addPlayer: (player) => set((state) => ({
    players: state.players.some(p => p.id === player.id)
      ? state.players
      : [...state.players, player]
  })),

  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId)
  })),

  updatePlayerScene: (playerId, sceneId) => set((state) => ({
    players: state.players.map(p =>
      p.id === playerId ? { ...p, currentScene: sceneId } : p
    )
  })),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),

  leaveRoom: () => set({
    isInRoom: false,
    roomCode: null,
    players: [],
    messages: []
  }),
}))

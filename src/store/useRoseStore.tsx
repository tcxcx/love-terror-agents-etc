import { create } from 'zustand';
import { Rose } from '@/types';

interface GameState {
  id: string;
  created_at: string;
  roses_game: boolean;
  ascii_game: boolean;
  guess_game: boolean;
  poem_game: boolean;
  roses: Rose[];
  valentines_user?: string;
  valentines_user_id?: string;
  claimed?: boolean;
}

interface RoseStore {
  gameState: GameState | null;
  setGameState: (state: GameState) => void;
  getRoses: () => Rose[];
  getCurrentRose: () => Rose | undefined;
  updateGame: (updates: Partial<GameState>) => void;
}

export const useRoseStore = create<RoseStore>((set, get) => ({
  gameState: null,
  setGameState: (state) => set({ gameState: state }),
  getRoses: () => get().gameState?.roses || [],
  getCurrentRose: () => get().gameState?.roses[0],
  updateGame: (updates) => 
    set((state) => ({
      gameState: state.gameState ? { ...state.gameState, ...updates } : null
    })),
}));
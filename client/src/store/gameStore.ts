import {create} from 'zustand';

interface GameStoreState {
    gameStarted: boolean;
    setGameStarted: (value:boolean) => void;
}

export const useGameStore = create<GameStoreState>((set) => ({
    gameStarted: false,
    setGameStarted: (value: boolean) => set({ gameStarted: value }),  // Correctly update state based on input
}));
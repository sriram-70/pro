import { create } from 'zustand';

interface ScrollStore {
    scrollProgress: number; // 0.0 to 1.0
    scrollY: number;
    setScrollProgress: (progress: number) => void;
    setScrollY: (y: number) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
    scrollProgress: 0,
    scrollY: 0,
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setScrollY: (y) => set({ scrollY: y }),
}));

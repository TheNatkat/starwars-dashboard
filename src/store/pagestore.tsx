import { create } from 'zustand';

interface PageStoreState {
  page: string;
  isGrid: boolean;
  setPage: (newPage: string) => void;
  setIsGrid: (state: boolean) => void;
  flipGrid: () => void;
}

const usePageStore = create<PageStoreState>((set) => ({
  page: 'Home',
  isGrid: true,
  setPage: (newPage) => set({ page: newPage }),
  setIsGrid: (state) => set({ isGrid: state }),
  flipGrid: () => set((prev) => ({ isGrid: !prev.isGrid })),
}));



export default usePageStore;

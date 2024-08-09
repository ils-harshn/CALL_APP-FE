import { create } from "zustand";

const useTabState = create((set) => ({
  firstTab: 0,
  secondTab0: 0,
  secondTab1: 0,
  changeFirstTab: (newValue) => set({ firstTab: newValue }),
  changeSecondTab0: (newValue) => set({ secondTab0: newValue }),
  changeSecondTab1: (newValue) => set({ secondTab1: newValue }),
}));

export default useTabState;

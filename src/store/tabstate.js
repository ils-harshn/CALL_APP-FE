import { create } from "zustand";

const useTabState = create((set) => ({
  firstTab: 0,
  changeFirstTab: (newValue) => set({ firstTab: newValue }),

  secondTab0: 0,
  changeSecondTab0: (newValue) => set({ secondTab0: newValue }),

  secondTab1: 0,
  changeSecondTab1: (newValue) => set({ secondTab1: newValue }),

  // Chat selection
  dTSelection: null,
  changeDTSelection: (newValue) => set({ dTSelection: newValue }),

  gtSelection: null,
  changeGtSelection: (newValue) => set({ gtSelection: newValue }),

  // Call selection
  cAllSelection: null,
  changeCAllSelection: (newValue) => set({ cAllSelection: newValue }),

  cIncSelection: null,
  changeCIncSelection: (newValue) => set({ cIncSelection: newValue }),

  cOutSelection: null,
  changeCOutSelection: (newValue) => set({ cOutSelection: newValue }),

  cMisSelection: null,
  changeCMisSelection: (newValue) => set({ cMisSelection: newValue }),

  // Contact Selection
  conTactselection: null,
  changeConTactselection: (newValue) => set({ conTactselection: newValue }),
}));

export default useTabState;

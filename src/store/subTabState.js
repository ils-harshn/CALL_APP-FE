import { create } from "zustand";

export const SUB_TABS = {
  ADD_FRIEND: 0,
};

const useSubTabState = create((set) => ({
  tab: null,
  changeTab: (newValue) => set({ tab: newValue }),
}));

export default useSubTabState;

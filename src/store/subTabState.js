import { create } from "zustand";

export const SUB_TABS = {
  ADD_FRIEND: 0,
  NOTIFICATIONS: 1,
};

const useSubTabState = create((set) => ({
  tab: null,
  changeTab: (newValue) => set({ tab: newValue }),
}));

export default useSubTabState;

import { create } from "zustand";

export const messagesSeenStatusStore = create((set) => ({
  cache: (newValue) => set({ [newValue.key]: newValue.value }),
  clear: () =>
    set(
      (state) => ({
        cache: state.cache,
        clear: state.clear,
      }),
      true
    ),
}));

import { create } from "zustand";

export const messagesStore = create((set) => ({
  cache: {},
  addMessage: (newValue) =>
    set((state) => ({
      cache: {
        ...state.cache,
        [newValue.key]: state.cache[newValue.key]
          ? [...state.cache[newValue.key], newValue.value]
          : [newValue.value],
      },
    })),
  clear: () =>
    set(
      (state) => ({
        cache: {},
        clear: state.clear,
      }),
      true
    ),
}));

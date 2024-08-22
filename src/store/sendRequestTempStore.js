import { create } from "zustand";

export const sendRequestTempStore = create((set) => ({
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

export const acceptOrRejectRequestTempStore = create((set) => ({
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

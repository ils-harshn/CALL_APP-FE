import { create } from "zustand";

const sendRequestTempStore = create((set) => ({
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

export default sendRequestTempStore;

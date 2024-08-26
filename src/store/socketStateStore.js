import { create } from "zustand";

const useSocketStore = create((set) => ({
  socket: null,
  set_socket: (newValue) => set({ socket: newValue }),
}));

export default useSocketStore;

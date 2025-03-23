import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Visit } from "@/types/models";

type State = {
  visitBooking: Visit | null;
};

type Actions = {
  setVisitDetails: (data: Partial<Visit>) => void;
  resetVisit: () => void;
};

export const useBooking = create<State & Actions>()(
  immer((set, get) => ({
    visitBooking: null,
    setVisitDetails: (data) =>
      set((state) => {
        state.visitBooking = { ...state.visitBooking, ...data };
      }),
    resetVisit: () => set({ visitBooking: null }),
  }))
);

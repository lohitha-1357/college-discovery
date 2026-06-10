import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { College } from "@/types";

type CompareStore = {
  selected: College[];
  add: (college: College) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      selected: [],
      add: (college) => {
        if (
          get().selected.length < 3 &&
          !get().selected.find((c) => c.id === college.id)
        ) {
          set((s) => ({ selected: [...s.selected, college] }));
        }
      },
      remove: (id) =>
        set((s) => ({ selected: s.selected.filter((c) => c.id !== id) })),
      clear: () => set({ selected: [] }),
    }),
    { name: "compare-store" }
  )
);
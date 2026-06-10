import { create } from "zustand";
import type { FilterState } from "@/types";

type FilterStore = FilterState & {
  set: (patch: Partial<FilterState>) => void;
  reset: () => void;
};

const defaults: FilterState = {
  search: "",
  type: [],
  minRating: 0,
  maxFees: 2000000,
  location: "",
};

export const useFilterStore = create<FilterStore>()((set) => ({
  ...defaults,
  set: (patch) => set((s) => ({ ...s, ...patch })),
  reset: () => set(defaults),
}));
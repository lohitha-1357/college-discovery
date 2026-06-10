"use client";
import { useFilterStore } from "@/lib/store/filterStore";

const COLLEGE_TYPES = ["IIT", "NIT", "Private", "Deemed"];

export function FilterPanel() {
  const { type, minRating, maxFees, set, reset } = useFilterStore();

  return (
    <aside className="w-64 shrink-0 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Filters</h2>
        <button onClick={reset} className="text-xs text-blue-600 hover:underline">
          Reset all
        </button>
      </div>

      {/* Type */}
      <div>
        <p className="text-sm font-medium text-gray-900 mb-2">College Type</p>
        <div className="space-y-1.5">
          {COLLEGE_TYPES.map((t) => (
  <label
    key={t}
    className="flex items-center gap-2 text-sm cursor-pointer text-gray-900"
  >
          
              <input
                type="checkbox"
                checked={type.includes(t)}
                onChange={() =>
                  set({ type: type.includes(t)
                    ? type.filter(x => x !== t)
                    : [...type, t] })
                }
                className="rounded"
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-sm font-medium text-gray-900 mb-2">
          Min Rating: {minRating}+
        </p>
        <input
          type="range" min={0} max={5} step={0.5}
          value={minRating}
          onChange={e => set({ minRating: parseFloat(e.target.value) })}
          className="w-full accent-blue-600"
        />
      </div>

      {/* Fees */}
      <div>
        <p className="text-sm font-medium text-gray-900 mb-2">
          Max Fees: ₹{(maxFees / 100000).toFixed(0)}L/yr
        </p>
        <input
          type="range" min={100000} max={2000000} step={50000}
          value={maxFees}
          onChange={e => set({ maxFees: parseInt(e.target.value) })}
          className="w-full accent-blue-600"
        />
      </div>
    </aside>
  );
}
"use client";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { CollegeCard } from "@/components/college/CollegeCard";
import { FilterPanel } from "@/components/college/FilterPanel";
import { useFilterStore } from "@/lib/store/filterStore";
import { useColleges } from "@/lib/hooks/useColleges";
import { CompareBar } from "@/components/college/CompareBar";

const PAGE_SIZE = 6;

export default function HomePage() {
  const filter = useFilterStore();
  const [page, setPage] = useState(1);
  const { colleges, status } = useColleges();

  const filtered = useMemo(() => {
    return colleges.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        c.location.toLowerCase().includes(filter.search.toLowerCase());
      const matchType =
        filter.type.length === 0 || filter.type.includes(c.type);
      const matchRating = c.rating >= filter.minRating;
      const matchFees = c.fees <= filter.maxFees;
      return matchSearch && matchType && matchRating && matchFees;
    });
  }, [filter, colleges]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          value={filter.search}
          onChange={(e) => {
            filter.set({ search: e.target.value });
            setPage(1);
          }}
          placeholder="Search colleges, locations..."
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
        />
      </div>

      <div className="flex gap-8">
        <FilterPanel />
        <div className="flex-1">

          {/* Loading state */}
          {status === "loading" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-6" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {status === "error" && (
            <div className="text-center py-20">
              <p className="text-red-500 font-medium">Failed to load colleges.</p>
              <p className="text-gray-500 text-sm mt-1">Please refresh the page.</p>
            </div>
          )}

          {/* Success state */}
          {status === "success" && (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {filtered.length} colleges found
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginated.map((c) => (
                  <CollegeCard key={c.id} college={c} />
                ))}
              </div>
              {paginated.length < filtered.length && (
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="mt-8 w-full py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition bg-white"
                >
                  Load more ({filtered.length - paginated.length} remaining)
                </button>
              )}
            </>
          )}

        </div>
      </div>
      <CompareBar />
    </main>
  );
}
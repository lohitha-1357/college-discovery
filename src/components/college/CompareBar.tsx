"use client";
import { useCompareStore } from "@/lib/store/compareStore";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export function CompareBar() {
  const { selected, remove, clear } = useCompareStore();
  const router = useRouter();
  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg px-6 py-3
      flex items-center justify-between z-50">
      <div className="flex gap-3 items-center">
        {selected.map(c => (
          <div key={c.id}
            className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-sm">
            {c.name}
            <button onClick={() => remove(c.id)}><X size={12} /></button>
          </div>
        ))}
        {selected.length < 3 && (
          <span className="text-sm text-gray-400">
            Add {3 - selected.length} more
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <button onClick={clear} className="text-sm text-gray-500 hover:underline">Clear</button>
        <button
          onClick={() => router.push("/compare")}
          disabled={selected.length < 2}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg
            disabled:opacity-40 hover:bg-blue-700 transition">
          Compare Now
        </button>
      </div>
    </div>
  );
}
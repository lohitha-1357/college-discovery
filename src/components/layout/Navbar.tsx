"use client";
import Link from "next/link";
import { useCompareStore } from "@/lib/store/compareStore";

export function Navbar() {
  const { selected } = useCompareStore();

  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between bg-white sticky top-0 z-40">
      <Link href="/" className="font-bold text-blue-600 text-lg">
        CollegeSearch
      </Link>
      <div className="flex gap-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Colleges
        </Link>
        <Link href="/predict" className="hover:text-blue-600">
          Predictor
        </Link>
        <Link href="/compare" className="relative hover:text-blue-600">
          Compare
          {selected.length > 0 && (
            <span className="absolute -top-1 -right-3 bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {selected.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
"use client";
import { useCompareStore } from "@/lib/store/compareStore";
import { X } from "lucide-react";
import Link from "next/link";
import type { College } from "@/types";

const ROWS: {
  label: string;
  key: string | ((c: College) => string);
  format?: (v: number) => string;
}[] = [
  { label: "Location", key: "location" },
  { label: "Type", key: "type" },
  { label: "Rating", key: "rating" },
  {
    label: "Fees/yr",
    key: "fees",
    format: (v) => `₹${(v / 100000).toFixed(1)}L`,
  },
  { label: "Avg Package", key: (c) => `₹${c.placements.avgPackage}L` },
  { label: "Highest Package", key: (c) => `₹${c.placements.highestPackage}L` },
  { label: "Placement %", key: (c) => `${c.placements.placementRate}%` },
];

type CollegeRecord = Record<string, string | number>;

export default function ComparePage() {
  const { selected, remove } = useCompareStore();

  if (selected.length < 2) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">
          Add at least 2 colleges to compare.
        </p>
        <Link href="/" className="text-blue-600 text-sm underline">
          Browse colleges
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 overflow-x-auto">
      <h1 className="text-xl font-bold mb-6">Compare Colleges</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-3 text-gray-500 font-medium w-36">
              Attribute
            </th>
            {selected.map((c) => (
              <th key={c.id} className="py-3 text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-semibold text-gray-900">{c.name}</span>
                  <button
                    onClick={() => remove(c.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-t">
              <td className="py-3 text-gray-700 font-medium">{row.label}</td>
              {selected.map((c) => (
                <td key={c.id} className="py-3 text-center font-medium text-gray-900">
                  {typeof row.key === "function"
                    ? row.key(c)
                    : row.format
                    ? row.format((c as unknown as CollegeRecord)[row.key] as number)
                    : String((c as unknown as CollegeRecord)[row.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
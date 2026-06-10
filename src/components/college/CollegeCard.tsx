import { useCompareStore } from "@/lib/store/compareStore";
import { MapPin, IndianRupee, Star, GitCompare } from "lucide-react";
import Link from "next/link";
import type { College } from "@/types";

export function CollegeCard({ college }: { college: College }) {
  const { add, remove, selected } = useCompareStore();
  const isSelected = selected.some(c => c.id === college.id);

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={`/college/${college.id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {college.name}
            </h3>
          </Link>
          <div className="flex gap-3 mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {college.location}
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400" /> {college.rating}
            </span>
          </div>
        </div>
        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
          {college.type}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
          <IndianRupee size={13} />
          {(college.fees / 100000).toFixed(1)}L/yr
        </span>
        <button
          onClick={() => isSelected ? remove(college.id) : add(college)}
          className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors
            ${isSelected
              ? "bg-blue-600 text-white"
              : "border border-gray-300 text-gray-600 hover:border-blue-400"}`}
        >
          <GitCompare size={12} />
          {isSelected ? "Added" : "Compare"}
        </button>
      </div>
    </div>
  );
}
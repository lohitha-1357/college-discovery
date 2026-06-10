"use client";
import { useState } from "react";
import { colleges } from "@/lib/data/colleges";
import { CollegeCard } from "@/components/college/CollegeCard";
import { CompareBar } from "@/components/college/CompareBar";

const EXAMS = ["JEE Main", "JEE Advanced", "KCET", "COMEDK"];

const rankRanges: Record<string, [number, number]> = {
  IIT: [1, 3000],
  NIT: [1, 25000],
  Deemed: [1, 100000],
  Private: [1, 200000],
};

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [results, setResults] = useState<typeof colleges | null>(null);

  const predict = () => {
    const r = parseInt(rank);
    if (isNaN(r)) return;

    const matched = colleges
      .filter((c) => {
        const range = rankRanges[c.type];
        return range && r >= range[0] && r <= range[1];
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);

    setResults(matched);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
  <h1 className="text-xl font-bold mb-2 text-gray-900">College Predictor</h1>
  <p className="text-gray-600 text-sm mb-8">
    
        Enter your exam and rank to see colleges likely to admit you.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-900">Exam</label>
          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {EXAMS.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-900">Rank</label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="e.g. 5000"
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={predict}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          Predict Colleges
        </button>
      </div>

      {results && (
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">
            {results.length} colleges matched for {exam} rank {rank}
          </p>
          <div className="grid gap-4">
            {results.map((c) => (
              <CollegeCard key={c.id} college={c} />
            ))}
          </div>
        </div>
      )}
      <CompareBar />
    </main>
  );
}
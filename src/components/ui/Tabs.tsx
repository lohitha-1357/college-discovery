"use client";
import { useState } from "react";

export function Tabs({ tabs, children }: {
  tabs: string[];
  children: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div>
      <div className="flex border-b mb-6">
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px
              ${active === i
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {tab}
          </button>
        ))}
      </div>
      {childArray[active]}
    </div>
  );
}
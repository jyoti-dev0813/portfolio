"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; panel: React.ReactNode };

export function Tabs({ label, tabs }: { label: string; tabs: Tab[] }) {
  const [current, setCurrent] = useState(tabs[0]?.id ?? "");

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === current);
    if (index < 0) return;
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== index) {
      event.preventDefault();
      const id = tabs[next]?.id;
      if (!id) return;
      setCurrent(id);
      document.getElementById(`tab-${id}`)?.focus();
    }
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2" onKeyDown={onKeyDown}>
        {tabs.map((tab) => {
          const selected = tab.id === current;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "rounded-full border px-4 py-2 text-sm",
                selected ? "border-violet/40 bg-white/10 text-paper" : "border-white/10 text-mist",
              )}
              onClick={() => setCurrent(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== current}
          className="pt-6"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

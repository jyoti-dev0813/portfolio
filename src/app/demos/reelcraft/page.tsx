"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { reelFrames, reelLayouts } from "@/data/social";

export default function ReelCraftPage() {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = reelFrames[frame] ?? reelFrames[0];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setFrame((value) => (value + 1) % reelFrames.length);
    }, 800);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <main id="content" className="min-h-screen bg-[#100c0c] px-5 py-8 text-[#f6efe9]">
      <p className="font-mono text-[11px] tracking-[0.18em] text-[#ff5a3c]">CONCEPT PROJECT</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-5xl">Lumen Hour</h1>
        <Link href="/#work" className="text-sm underline">
          Back to Shivonix
        </Link>
      </div>
      <p className="mt-3 max-w-xl text-[#d9cdc4]">A 15-second promo told in frames. Animated placeholders only. No client footage and no audio.</p>
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]" aria-label="Frame player">
        <div className="flex min-h-72 flex-col justify-between rounded-3xl bg-[#1a1212] p-6">
          <p className="font-mono text-sm text-[#ff5a3c]">{current.time}</p>
          <h2 className="text-5xl">{current.title}</h2>
          <p>{current.note}</p>
        </div>
        <div>
          <button
            type="button"
            className="rounded-full bg-[#ff5a3c] px-4 py-2 text-[#1a0d0b]"
            onClick={() => {
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              if (reduce) {
                setFrame((value) => (value + 1) % reelFrames.length);
                return;
              }
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play frames"}
          </button>
          <ol className="mt-4 grid gap-2">
            {reelFrames.map((item, index) => (
              <li key={item.time}>
                <button type="button" className={`w-full rounded-xl px-3 py-2 text-left text-sm ${index === frame ? "bg-white/10" : ""}`} onClick={() => setFrame(index)}>
                  <span className="font-mono text-[#ff5a3c]">{item.time}</span> {item.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <h2 className="mt-10 text-2xl">Promo layouts</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {reelLayouts.map((layout) => (
          <li key={layout.title} className="rounded-2xl border border-white/10 p-4">
            <p className="text-xl">{layout.title}</p>
            <p className="mt-2 text-sm text-[#d9cdc4]">{layout.line}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

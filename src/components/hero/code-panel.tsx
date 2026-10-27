"use client";

import { useEffect, useState } from "react";

const lines = [
  "export function Signal() {",
  "  return (",
  "    <article>",
  "      <p>Shivonix</p>",
  "      <strong>Idea, refracted.</strong>",
  "      <span>Ready</span>",
  "    </article>",
  "  );",
  "}",
];

const full = lines.join("\n");

export function CodePanel() {
  const [count, setCount] = useState(full.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let value = 0;
    const timer = window.setInterval(() => {
      value += 1;
      setCount(value);
      if (value >= full.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, []);

  const typed = lines.join("\n").slice(0, count);
  const shownLines = typed.split("\n").length;

  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-ink-2/80 p-3 md:grid-cols-2">
      <pre className="overflow-hidden rounded-xl bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-mist" aria-hidden>
        <code>{typed}</code>
        <span className="ml-0.5 inline-block h-4 w-px bg-beam align-middle" />
      </pre>
      <p className="sr-only">
        A short React component named Signal renders a card labeled Shivonix, with the line Idea, refracted, and a Ready state. The panel beside it builds that card as the code appears.
      </p>
      <article className="flex flex-col justify-between rounded-xl border border-white/10 bg-panel p-4" aria-hidden>
        <p className={`font-mono text-[11px] tracking-[0.18em] text-violet ${shownLines >= 4 ? "opacity-100" : "opacity-0"}`}>
          SHIVONIX
        </p>
        <strong className={`mt-6 font-display text-2xl tracking-tight ${shownLines >= 5 ? "opacity-100" : "opacity-0"}`}>
          Idea, refracted.
        </strong>
        <span className={`mt-6 inline-flex w-fit rounded-full border border-beam/40 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-beam ${shownLines >= 6 ? "opacity-100" : "opacity-0"}`}>
          READY
        </span>
      </article>
    </div>
  );
}

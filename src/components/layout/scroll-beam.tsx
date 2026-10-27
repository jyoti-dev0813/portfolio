"use client";

import { useEffect, useState } from "react";
import { beamMarks } from "@/config/site";

export function ScrollBeam() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? root.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const nodes = beamMarks
      .map((mark) => document.getElementById(mark.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed top-1/2 left-4 z-20 hidden h-[46vh] -translate-y-1/2 lg:block" aria-hidden>
      <div className="relative h-full w-px bg-white/10">
        <div className="absolute top-0 left-0 w-px bg-beam" style={{ height: `${progress * 100}%` }} />
        {beamMarks.map((mark, index) => (
          <span
            key={mark.id}
            className="absolute left-3 -translate-y-1/2 font-mono text-[10px] tracking-[0.16em] uppercase"
            style={{
              top: `${(index / (beamMarks.length - 1)) * 100}%`,
              color: active === mark.id ? "#d7f6ff" : "#a3a3b8",
            }}
          >
            {mark.label}
          </span>
        ))}
      </div>
    </div>
  );
}

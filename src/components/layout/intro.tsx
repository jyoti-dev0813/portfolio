"use client";

import { useEffect } from "react";
import { PrismFallback } from "@/components/brand/prism-fallback";

export function Intro() {
  useEffect(() => {
    if (document.documentElement.dataset.intro !== "on") return;
    const timer = window.setTimeout(() => {
      document.documentElement.dataset.intro = "off";
      sessionStorage.setItem("shivonix-intro", "1");
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  function skip() {
    document.documentElement.dataset.intro = "off";
    sessionStorage.setItem("shivonix-intro", "1");
  }

  return (
    <div className="intro-overlay pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-ink">
      <div className="pointer-events-auto grid justify-items-center gap-5 px-6 text-center">
        <div className="h-24 w-24">
          <PrismFallback />
        </div>
        <p className="intro-beam h-px w-40 bg-beam" />
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet">
          Idea → Prism → Experience
        </p>
        <button type="button" className="text-sm text-mist underline-offset-4 hover:underline" onClick={skip}>
          Skip
        </button>
      </div>
    </div>
  );
}

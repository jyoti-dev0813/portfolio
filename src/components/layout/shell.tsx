"use client";

import { Suspense, useEffect } from "react";
import { CommandPalette } from "@/components/layout/command-palette";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { Footer } from "@/components/layout/footer";
import { Header, HeaderFallback } from "@/components/layout/header";
import { Intro } from "@/components/layout/intro";
import { ScrollBeam } from "@/components/layout/scroll-beam";

function useLightSweep() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-sweep]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove);
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

export function Shell({ children }: { children: React.ReactNode }) {
  useLightSweep();
  return (
    <>
      <Intro />
      <CursorGlow />
      <ScrollBeam />
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <CommandPalette />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}

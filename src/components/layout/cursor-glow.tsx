"use client";

import { useEffect, useState } from "react";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", onChange);
  reduce.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    reduce.removeEventListener("change", onChange);
  };
}

function glowEnabled() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CursorGlow() {
  const on = useSyncExternalStore(subscribe, glowEnabled, () => false);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!on) return;
    const move = (event: PointerEvent) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [on]);

  if (!on) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: pos.x,
        top: pos.y,
        background: "radial-gradient(circle, rgba(215,246,255,0.55), rgba(139,108,255,0.05) 70%, transparent 72%)",
      }}
    />
  );
}

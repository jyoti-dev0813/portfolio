"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { PrismFallback } from "@/components/brand/prism-fallback";

const PrismCanvas = dynamic(() => import("@/components/brand/prism-canvas"), {
  ssr: false,
  loading: () => <PrismFallback />,
});

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  const narrow = window.matchMedia("(max-width: 767px)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  narrow.addEventListener("change", onChange);
  reduce.addEventListener("change", onChange);
  return () => {
    narrow.removeEventListener("change", onChange);
    reduce.removeEventListener("change", onChange);
  };
}

function webglSnapshot() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowPower = Boolean(connection?.saveData) || (memory !== undefined && memory <= 2);
  return !reduce && !narrow && !lowPower && canUseWebGL();
}

export function Prism() {
  const webgl = useSyncExternalStore(subscribe, webglSnapshot, () => false);

  return (
    <div className="h-full w-full">
      {webgl ? <PrismCanvas /> : <PrismFallback />}
    </div>
  );
}

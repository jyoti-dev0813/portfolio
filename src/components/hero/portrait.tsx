"use client";

import Image from "next/image";

export function Portrait() {
  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--px", `${x * 12}px`);
    event.currentTarget.style.setProperty("--py", `${y * 10}px`);
  }

  return (
    <figure className="relative mx-auto w-full max-w-[420px]">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.6rem] border border-violet/40" aria-hidden />
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] shadow-[0_30px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
        onPointerMove={onMove}
      >
        <Image
          src="/images/jyoti-shivonix.png"
          alt="Jyoti Agarwal, founder of Shivonix, with long dark hair and a teal floral outfit, standing in front of the Shivonix logo."
          fill
          priority
          sizes="(max-width: 768px) 88vw, 420px"
          className="object-cover object-[center_16%] md:object-[center_22%]"
          style={{ transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(196,181,253,0.45),inset_0_0_50px_rgba(91,47,224,0.28)]"
        />
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] tracking-[0.18em] text-faint uppercase">
        Jyoti Agarwal · Founder
      </figcaption>
    </figure>
  );
}

import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-8 w-8", className)} aria-hidden="true">
      <defs>
        <linearGradient id="sx-mark" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4DCFF" />
          <stop offset="0.45" stopColor="#8B6CFF" />
          <stop offset="1" stopColor="#5B2FE0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#sx-mark)"
        d="M10.2 7h16.4c3.2 0 5 3.6 3.1 6.1L24.2 21l5.5 7.9c1.9 2.7.1 6.1-3.1 6.1H12.4c-2.2 0-3.6-2.4-2.4-4.3L15.2 21 10 11.3C8.8 9.4 10.2 7 12.4 7h-2.2z"
      />
      <path fill="#D7F6FF" opacity="0.85" d="M18 14.5h8.2L22.4 21l3.8 6.5H18l4.2-6.5L18 14.5z" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark />
      {compact ? null : (
        <span className="font-display text-sm font-medium tracking-[0.22em]">SHIVONIX</span>
      )}
    </span>
  );
}

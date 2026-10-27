import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "violet",
}: {
  children: React.ReactNode;
  tone?: "violet" | "neutral" | "warn";
}) {
  const tones = {
    violet: "border-violet/30 bg-violet/10 text-violet",
    neutral: "border-white/15 bg-white/5 text-mist",
    warn: "border-[#ffd7a8]/40 bg-[#ffd7a8]/10 text-[#ffd7a8]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

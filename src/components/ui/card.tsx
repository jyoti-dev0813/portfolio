import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-sweep
      className={cn("sweep rounded-2xl border border-white/10 bg-panel/80", className)}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-ink-2/95 p-5 text-paper shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        className,
      )}
      onClose={onClose}
      onMouseDown={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 id={titleId} className="font-display text-2xl tracking-tight">
          {title}
        </h2>
        <button
          type="button"
          className="rounded-full border border-white/15 px-3 py-1 text-sm text-mist"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      {children}
    </dialog>
  );
}

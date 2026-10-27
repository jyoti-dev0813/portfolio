"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { discussProject } from "@/lib/discuss";
import { cn } from "@/lib/utils";
import { GalleryArt } from "@/components/lab/gallery-art";
import { Modal } from "@/components/ui/modal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Lab() {
  const router = useRouter();
  const [filter, setFilter] = useState<GalleryCategory>("All");
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  const visible = gallery.filter((piece) => filter === "All" || piece.category === filter);
  const current = visible[index];

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setIndex((value) => (value + 1) % visible.length);
      if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + visible.length) % visible.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, visible.length]);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <section id="lab" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <SectionHeading
          index="04"
          label="Creative Lab"
          title="Concept pieces. No borrowed clients."
          lede="Posts, posters, thumbnails, and boards made as studies. Every item is original artwork for this site."
        />
        <div className="mt-8 flex flex-wrap gap-2" role="toolbar" aria-label="Filter concept work">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm",
                filter === category ? "border-violet/40 bg-white/10" : "border-white/10 text-mist",
              )}
              onClick={() => {
                setFilter(category);
                setIndex(0);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((piece, pieceIndex) => (
            <li key={piece.id}>
              <button
                type="button"
                className="block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
                onClick={(event) => {
                  trigger.current = event.currentTarget;
                  setIndex(pieceIndex);
                  setOpen(true);
                }}
              >
                <GalleryArt piece={piece} />
                <span className="flex items-center justify-between gap-3 bg-ink px-3 py-3">
                  <span>
                    <span className="block text-sm">{piece.title}</span>
                    <span className="block text-xs text-faint">{piece.category} · Concept</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <button type="button" className="rounded-full bg-violet-deep px-5 py-3 text-sm text-white" onClick={() => discussProject("branding", router.push)}>
            Ask for a custom design
          </button>
        </div>
      </div>
      {current ? (
        <Modal open={open} onClose={close} title={current.title} className="max-w-3xl">
          <div className="overflow-hidden rounded-xl">
            <GalleryArt piece={current} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mist">{current.description}</p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">Concept work · not a commission</p>
          <div className="mt-4 flex gap-2">
            <button type="button" className="rounded-full border border-white/15 px-4 py-2 text-sm" onClick={() => setIndex((value) => (value - 1 + visible.length) % visible.length)}>
              Previous
            </button>
            <button type="button" className="rounded-full border border-white/15 px-4 py-2 text-sm" onClick={() => setIndex((value) => (value + 1) % visible.length)}>
              Next
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { PreviewArt } from "@/components/work/preview-art";
import { cn } from "@/lib/utils";

const filters = ["All", "References", "Concepts"] as const;

export function WorkSection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter((project) => {
    if (filter === "References") return project.kind === "reference";
    if (filter === "Concepts") return project.kind === "demo";
    return true;
  });

  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <SectionHeading
          index="03"
          label="Work"
          title="References, then concepts I built to show the craft."
          lede="Milieu Solar is a real public site I worked on. The six studios below are labeled concepts. They are not client work."
        />
        <div className="mt-8 flex flex-wrap gap-2" role="toolbar" aria-label="Filter work">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              className={cn(
                "rounded-full border px-4 py-2 text-sm",
                filter === item ? "border-violet/40 bg-white/10" : "border-white/10 text-mist",
              )}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {visible.map((project) => (
            <article key={project.slug} data-sweep className="sweep overflow-hidden rounded-2xl border border-white/10 bg-panel/60">
              <Link href={`/work/${project.slug}`} className="block h-40">
                <PreviewArt kind={project.preview} />
              </Link>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {project.badge ? <Badge tone="warn">{project.badge}</Badge> : <Badge tone="neutral">Project reference</Badge>}
                  <Badge>{project.yearLabel}</Badge>
                </div>
                <h3 className="mt-3 font-display text-3xl tracking-tight">
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <Link href={`/work/${project.slug}`} className="text-paper underline decoration-white/20 underline-offset-4">
                    Case study
                  </Link>
                  {project.demoHref ? (
                    <Link href={project.demoHref} className="text-paper underline decoration-white/20 underline-offset-4">
                      Open demo
                    </Link>
                  ) : null}
                  {project.externalHref ? (
                    <a href={project.externalHref} className="text-paper underline decoration-white/20 underline-offset-4" target="_blank" rel="noopener noreferrer">
                      Live site
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

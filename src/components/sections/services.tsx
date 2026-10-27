"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  Clapperboard,
  Code,
  Layers,
  Megaphone,
  Palette,
  Share2,
  ShoppingBag,
} from "lucide-react";
import { services, type ServiceIcon } from "@/data/services";
import { discussProject } from "@/lib/discuss";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

const icons: Record<ServiceIcon, typeof Layers> = {
  layers: Layers,
  code: Code,
  bag: ShoppingBag,
  palette: Palette,
  share: Share2,
  megaphone: Megaphone,
  clapper: Clapperboard,
  bot: Bot,
};

export function Services() {
  const router = useRouter();
  const [open, setOpen] = useState<string>("full-stack");

  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <SectionHeading
          index="02"
          label="Services"
          title="Eight ways an idea becomes something you can ship."
          lede="Depth varies by brief. Full-stack work is the direction I am growing. Creative services sit beside the engineering, not instead of it."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const Icon = icons[service.icon];
            const expanded = open === service.id;
            return (
              <article
                key={service.id}
                data-sweep
                className={cn(
                  "sweep rounded-2xl border border-white/10 bg-panel/70 p-5",
                  service.featured && "md:col-span-2",
                )}
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet/30 text-violet">
                    <Icon aria-hidden size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl tracking-tight">{service.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{service.summary}</p>
                  </div>
                </div>
                <div className={cn("grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-mist">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="text-sm text-paper underline decoration-white/20 underline-offset-4"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? "" : service.id)}
                  >
                    {expanded ? "Hide deliverables" : "Show deliverables"}
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-violet-deep px-4 py-2 text-sm text-white"
                    onClick={() => discussProject(service.id, router.push)}
                  >
                    Discuss Your Project
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

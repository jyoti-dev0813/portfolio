"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { nav, recruiterMailto, site, whatsappUrl } from "@/config/site";
import { projects } from "@/data/projects";
import { Modal } from "@/components/ui/modal";

type Item = { id: string; group: string; label: string; href?: string; external?: boolean };

const items: Item[] = [
  ...nav.map((item) => ({ id: item.id, group: "Sections", label: item.label, href: item.href })),
  ...projects.map((project) => ({
    id: project.slug,
    group: "Work",
    label: project.title,
    href: project.demoHref ?? `/work/${project.slug}`,
  })),
  { id: "email", group: "Contact", label: "Email Jyoti", href: `mailto:${site.email}` },
  { id: "whatsapp", group: "Contact", label: "WhatsApp", href: whatsappUrl, external: true },
  { id: "resume", group: "Contact", label: "Download resume", href: site.resumePath },
  { id: "role", group: "Contact", label: "Recruiter email", href: recruiterMailto },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(needle) || item.group.toLowerCase().includes(needle));
  }, [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        setCursor(0);
      }
    };
    const onOpen = () => {
      setOpen(true);
      setCursor(0);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("shivonix:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("shivonix:palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, [open]);

  function go(item: Item | undefined) {
    if (!item?.href) return;
    setOpen(false);
    setQuery("");
    if (item.external || item.href.startsWith("mailto:") || item.href.startsWith("http")) {
      window.open(item.href, item.href.startsWith("mailto:") ? "_self" : "_blank", "noopener,noreferrer");
      return;
    }
    router.push(item.href);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((value) => Math.min(results.length - 1, value + 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((value) => Math.max(0, value - 1));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      go(results[cursor]);
    }
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} title="Jump to" className="max-w-xl">
      <input
        ref={inputRef}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setCursor(0);
        }}
        onKeyDown={onKeyDown}
        placeholder="Sections, projects, contact"
        aria-label="Search the site"
        className="w-full rounded-xl border border-white/10 bg-ink px-3 py-3"
      />
      <ul className="mt-3 max-h-80 overflow-auto" role="listbox" aria-label="Results">
        {results.length === 0 ? <li className="px-2 py-3 text-sm text-mist">No matches.</li> : null}
        {results.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              role="option"
              aria-selected={index === cursor}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left ${index === cursor ? "bg-white/10" : ""}`}
              onMouseEnter={() => setCursor(index)}
              onClick={() => go(item)}
            >
              <span>{item.label}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{item.group}</span>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeaderFallback() {
  return <div className="h-20" />;
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const nodes = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return () => {
      document.body.style.overflow = "";
    };
    const root = document.getElementById("mobile-nav");
    const nodes = root ? Array.from(root.querySelectorAll<HTMLElement>("a, button")) : [];
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    first?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = !onHome && pathname.startsWith("/work") ? "work" : onHome ? active : "";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 border-b transition-colors",
        scrolled || open ? "border-white/10 bg-ink/80 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1120px] items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/#top" aria-label="Shivonix home" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={current === item.id ? "true" : undefined}
              className={cn(
                "text-sm",
                current === item.id ? "text-paper" : "text-mist hover:text-paper",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden rounded-full border border-white/15 px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-mist xl:inline-flex"
            onClick={() => window.dispatchEvent(new Event("shivonix:palette"))}
          >
            Ctrl K
          </button>
          <Button href="/#contact" className="hidden sm:inline-flex">
            Start a Project
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 px-5 py-4 lg:hidden">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-lg"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/#contact" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Start a Project
          </Button>
        </nav>
      ) : null}
    </header>
  );
}

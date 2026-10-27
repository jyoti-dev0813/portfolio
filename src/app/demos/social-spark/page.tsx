"use client";

import { useState } from "react";
import Link from "next/link";
import { sparkFilters, sparkPosts, sparkWeek, type SparkFilter } from "@/data/social";

export default function SocialSparkPage() {
  const [filter, setFilter] = useState<SparkFilter>("All");
  const [open, setOpen] = useState<string | null>(null);
  const posts = sparkPosts.filter((post) => filter === "All" || post.kind === filter);
  const current = sparkPosts.find((post) => post.id === open);
  return (
    <main id="content" className="min-h-screen bg-[#fff4ee] px-5 py-8 text-[#2a130e]">
      <p className="text-xs tracking-[0.18em] text-[#e23d1a]">CONCEPT PROJECT</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-5xl tracking-tight">Paper & Pine</h1>
        <Link href="/#work" className="text-sm underline">
          Back to Shivonix
        </Link>
      </div>
      <p className="mt-3 max-w-xl">A one-week content system for a fictional stationery brand. No client and no scheduler.</p>
      <section className="mt-8 grid gap-3 rounded-3xl bg-[#2a130e] p-5 text-[#fff4ee] md:grid-cols-4">
        {["#2a130e", "#e23d1a", "#fff4ee", "#c4a484"].map((color) => (
          <div key={color}>
            <span className="block h-12 rounded-xl border border-white/20" style={{ background: color }} />
            <p className="mt-2 font-mono text-xs">{color}</p>
          </div>
        ))}
      </section>
      <div className="mt-8 flex flex-wrap gap-2" role="toolbar" aria-label="Post types">
        {sparkFilters.map((item) => (
          <button key={item} type="button" aria-pressed={filter === item} className={`rounded-full px-3 py-1 ${filter === item ? "bg-[#2a130e] text-[#fff4ee]" : "border border-[#2a130e]/20"}`} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <button type="button" className="w-full rounded-2xl bg-white p-4 text-left" onClick={() => setOpen(post.id)}>
              <p className="text-xs tracking-[0.16em] text-[#e23d1a]">{post.kind}</p>
              <p className="mt-6 text-3xl">{post.title}</p>
              <p className="mt-2 text-sm">{post.line}</p>
            </button>
          </li>
        ))}
      </ul>
      <h2 className="mt-10 text-2xl">Week</h2>
      <ol className="mt-3 grid gap-2 sm:grid-cols-7">
        {sparkWeek.map((day) => (
          <li key={day.day} className="rounded-xl bg-white p-3 text-sm">
            <p className="text-xs text-[#e23d1a]">{day.day}</p>
            <p className="mt-2">{day.item}</p>
          </li>
        ))}
      </ol>
      {current ? (
        <div role="dialog" aria-modal="true" aria-labelledby="spark-title" className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#fff4ee] p-6">
            <h2 id="spark-title" className="text-3xl">{current.title}</h2>
            <p className="mt-2">{current.line}</p>
            <p className="mt-3 text-sm">Concept frame. Not a scheduled post.</p>
            <button type="button" className="mt-4 underline" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

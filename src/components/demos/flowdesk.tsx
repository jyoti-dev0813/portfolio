"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { flowMonths, flowTasks, pipelineSeed, type PipelineRow, type PipelineStatus } from "@/data/flowdesk";
import { useBrowserJson, writeBrowserJson } from "@/lib/browser-json";
import { formatUsd } from "@/lib/utils";

const links = [
  ["/demos/flowdesk", "Overview"],
  ["/demos/flowdesk/pipeline", "Pipeline"],
  ["/demos/flowdesk/profile", "Profile"],
  ["/demos/flowdesk/settings", "Settings"],
];

export function FlowNav() {
  const pathname = usePathname();
  return (
    <aside className="border-b border-white/10 p-4 md:min-h-screen md:w-56 md:border-r md:border-b-0">
      <p className="font-mono text-[11px] tracking-[0.16em] text-[#34d399]">SELF-INITIATED DEMO</p>
      <p className="mt-2 text-lg">FlowDesk</p>
      <nav aria-label="FlowDesk" className="mt-4 grid gap-1">
        {links.map(([href, label]) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`rounded-lg px-3 py-2 text-sm ${pathname === href ? "bg-white/10" : ""}`}>
            {label}
          </Link>
        ))}
      </nav>
      <Link href="/#work" className="mt-6 block px-3 text-sm text-[#93a4bd]">
        Back to Shivonix
      </Link>
    </aside>
  );
}

export function FlowOverview() {
  const [active, setActive] = useState<(typeof flowMonths)[number]["label"]>("Oct");
  const max = Math.max(...flowMonths.map((month) => month.value));
  const selected = flowMonths.find((month) => month.label === active) ?? flowMonths[0];
  return (
    <div className="p-5 md:p-8">
      <h1 className="text-3xl">Overview</h1>
      <p className="mt-2 max-w-xl text-sm text-[#93a4bd]">Sample figures for a fictional studio. They are not a client’s results.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-4">
        {[
          ["Open projects", "12"],
          ["Sample clients", "7"],
          ["Sample month", formatUsd(320000)],
          ["Tasks due", "5"],
        ].map(([label, value]) => (
          <li key={label} className="rounded-xl border border-white/10 p-4">
            <p className="text-xs text-[#93a4bd]">{label}</p>
            <p className="mt-2 text-2xl text-[#34d399]">{value}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-lg">Sample revenue</h2>
        <div className="mt-4 flex h-40 items-end gap-3" role="group" aria-label="Sample revenue by month">
          {flowMonths.map((month) => (
            <button key={month.label} type="button" aria-pressed={active === month.label} className="flex flex-1 flex-col items-center gap-2" onClick={() => setActive(month.label)}>
              <span className="w-full rounded-t bg-[#34d399]" style={{ height: `${(month.value / max) * 100}%` }} />
              <span className="text-xs">{month.label}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm" role="status">
          {selected.label} sample: {formatUsd(selected.value * 100)}
        </p>
      </div>
      <h2 className="mt-8 text-lg">Due this week</h2>
      <ul className="mt-3 grid gap-2">
        {flowTasks.map((task) => (
          <li key={task} className="rounded-lg border border-white/10 px-3 py-2 text-sm">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FlowPipeline() {
  const [rows, setRows] = useState<PipelineRow[]>(pipelineSeed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | PipelineStatus | "Archived">("All");
  const [sort, setSort] = useState<{ key: "project" | "value"; dir: "asc" | "desc" }>({ key: "project", dir: "asc" });
  const visible = useMemo(() => {
    const filtered = rows.filter((row) => {
      const matchesQuery = `${row.project} ${row.client}`.toLowerCase().includes(query.trim().toLowerCase());
      const matchesStatus = status === "All" ? true : status === "Archived" ? false : row.status === status;
      return matchesQuery && matchesStatus;
    });
    return [...filtered].sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;
      if (sort.key === "value") return (a.value - b.value) * dir;
      return a.project.localeCompare(b.project) * dir;
    });
  }, [query, rows, sort, status]);

  return (
    <div className="p-5 md:p-8">
      <h1 className="text-3xl">Pipeline</h1>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Search
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-lg border border-white/10 bg-transparent px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className="rounded-lg border border-white/10 bg-[#0b1220] px-3 py-2">
            {["All", "Active", "In review", "Waiting", "Sync paused", "Archived"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      {visible.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-white/15 p-6">No rows match. Archived is empty on purpose.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[#93a4bd]">
                <th aria-sort={sort.key === "project" ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                  <button type="button" onClick={() => setSort((value) => ({ key: "project", dir: value.dir === "asc" ? "desc" : "asc" }))}>
                    Project
                  </button>
                </th>
                <th>Client</th>
                <th>Status</th>
                <th aria-sort={sort.key === "value" ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                  <button type="button" onClick={() => setSort((value) => ({ key: "value", dir: value.dir === "asc" ? "desc" : "asc" }))}>
                    Value
                  </button>
                </th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className="border-b border-white/10">
                  <td className="py-3">{row.project}</td>
                  <td>{row.client}</td>
                  <td>
                    {row.status}
                    {row.status === "Sync paused" ? (
                      <button
                        type="button"
                        className="ml-2 underline"
                        onClick={() => setRows((current) => current.map((item) => (item.id === row.id ? { ...item, status: "In review" } : item)))}
                      >
                        Retry
                      </button>
                    ) : null}
                  </td>
                  <td>{formatUsd(row.value * 100)}</td>
                  <td>{row.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function FlowProfile() {
  return (
    <div className="p-5 md:p-8">
      <h1 className="text-3xl">Profile</h1>
      <p className="mt-2 text-sm text-[#93a4bd]">Sample profile. This is not Jyoti’s account.</p>
      <dl className="mt-6 grid max-w-md gap-3 text-sm">
        <div className="rounded-xl border border-white/10 p-4">
          <dt className="text-[#93a4bd]">Name</dt>
          <dd>Demo user</dd>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <dt className="text-[#93a4bd]">Role</dt>
          <dd>Studio owner</dd>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <dt className="text-[#93a4bd]">Email</dt>
          <dd>demo.user@flowdesk.test</dd>
        </div>
      </dl>
      <Link href="/demos/flowdesk/settings" className="mt-6 inline-block underline">
        Edit settings
      </Link>
    </div>
  );
}

function readSettings(raw: string | null) {
  const fallback = { name: "Demo user", notes: true, zone: "Asia/Kolkata" };
  if (!raw) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return fallback;
    const data = parsed as { name?: unknown; notes?: unknown; zone?: unknown };
    return {
      name: typeof data.name === "string" ? data.name : fallback.name,
      notes: typeof data.notes === "boolean" ? data.notes : fallback.notes,
      zone: typeof data.zone === "string" ? data.zone : fallback.zone,
    };
  } catch {
    return fallback;
  }
}

export function FlowSettings() {
  const raw = useBrowserJson("flowdesk-settings");
  if (raw === null) return <p className="p-8 text-sm text-[#93a4bd]">Loading settings…</p>;
  return <SettingsForm key={raw} initial={readSettings(raw)} />;
}

function SettingsForm({ initial }: { initial: { name: string; notes: boolean; zone: string } }) {
  const [name, setName] = useState(initial.name);
  const [notes, setNotes] = useState(initial.notes);
  const [zone, setZone] = useState(initial.zone);
  const [phase, setPhase] = useState<"idle" | "saving" | "saved">("idle");

  return (
    <form
      className="grid max-w-md gap-4 p-5 md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setPhase("saving");
        window.setTimeout(() => {
          writeBrowserJson("flowdesk-settings", { name, notes, zone });
          setPhase("saved");
        }, 400);
      }}
    >
      <h1 className="text-3xl">Settings</h1>
      <label className="grid gap-1 text-sm">
        Display name
        <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-lg border border-white/10 bg-transparent px-3 py-2" />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={notes} onChange={(event) => setNotes(event.target.checked)} />
        Sample email notes
      </label>
      <label className="grid gap-1 text-sm">
        Timezone
        <select value={zone} onChange={(event) => setZone(event.target.value)} className="rounded-lg border border-white/10 bg-[#0b1220] px-3 py-2">
          <option>Asia/Kolkata</option>
          <option>Asia/Kuala_Lumpur</option>
          <option>UTC</option>
        </select>
      </label>
      <button type="submit" className="rounded-full bg-[#34d399] px-4 py-2 text-[#06281c]" disabled={phase === "saving"}>
        {phase === "saving" ? "Saving…" : "Save on this device"}
      </button>
      <p role="status" className="text-sm text-[#93a4bd]">
        {phase === "saved" ? "Saved in this browser. Nothing was sent to a server." : ""}
      </p>
    </form>
  );
}

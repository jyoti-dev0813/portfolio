"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { examplePrompts, fallbackReply, scriptedReplies } from "@/data/assist";
import { useBrowserJson, writeBrowserJson } from "@/lib/browser-json";

type Message = { role: "user" | "demo"; text: string };
type Thread = { id: string; title: string; messages: Message[] };

const storageKey = "shivonix-ai-assist";

function replyTo(input: string) {
  const lower = input.toLowerCase();
  const match = scriptedReplies.find((item) => item.keywords.some((keyword) => lower.includes(keyword)));
  return match?.text ?? fallbackReply;
}

function createThread(id: string = crypto.randomUUID()): Thread {
  return {
    id,
    title: "New chat",
    messages: [{ role: "demo", text: "Demo mode. Replies are scripted and stay in this browser. No model is connected." }],
  };
}

function parseThreads(raw: string | null): Thread[] | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.length) return null;
    return parsed as Thread[];
  } catch {
    return null;
  }
}

export default function AssistPage() {
  const raw = useBrowserJson(storageKey);
  const starter = useMemo(() => [createThread("starter")], []);
  const stored = useMemo(() => parseThreads(raw), [raw]);
  const threads = stored ?? starter;
  const [picked, setPicked] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const current = picked && threads.some((item) => item.id === picked) ? picked : threads[0]?.id;
  const thread = threads.find((item) => item.id === current);

  function commit(next: Thread[], id?: string) {
    writeBrowserJson(storageKey, next);
    if (id) setPicked(id);
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || !current) {
      setError("Write a message first.");
      return;
    }
    setError("");
    setDraft("");
    commit(
      threads.map((item) =>
        item.id === current
          ? {
              ...item,
              title: item.messages.length < 2 ? trimmed.slice(0, 32) : item.title,
              messages: [
                ...item.messages,
                { role: "user" as const, text: trimmed },
                { role: "demo" as const, text: replyTo(trimmed) },
              ],
            }
          : item,
      ),
    );
  }

  if (raw === null) return <main id="content" className="min-h-screen bg-[#0e1412] p-8 text-[#e7f2ec]">Loading demo chat…</main>;

  return (
    <main id="content" className="grid min-h-screen bg-[#0e1412] text-[#e7f2ec] md:grid-cols-[240px_1fr]">
      <aside className="border-b border-white/10 p-4 md:border-r md:border-b-0">
        <p className="font-mono text-[11px] tracking-[0.16em] text-[#8ee0c2]">SELF-INITIATED DEMO</p>
        <h1 className="mt-2 text-2xl">AI Assist</h1>
        <button
          type="button"
          className="mt-4 w-full rounded-lg border border-white/15 px-3 py-2 text-sm"
          onClick={() => {
            const next = createThread();
            commit([next, ...threads], next.id);
          }}
        >
          New chat
        </button>
        <ul className="mt-4 grid gap-1">
          {threads.map((item) => (
            <li key={item.id}>
              <button type="button" className={`w-full rounded-lg px-2 py-2 text-left text-sm ${item.id === current ? "bg-white/10" : ""}`} onClick={() => setPicked(item.id)}>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <Link href="/#work" className="mt-6 block text-sm text-[#8ee0c2]">
          Back to Shivonix
        </Link>
      </aside>
      <section className="flex min-h-screen flex-col p-4">
        <p className="rounded-xl border border-[#8ee0c2]/30 px-3 py-2 text-sm">Demo mode. These replies are not from a live model.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {examplePrompts.map((prompt) => (
            <button key={prompt} type="button" className="rounded-full border border-white/15 px-3 py-1 text-sm" onClick={() => send(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
        <div className="mt-4 flex-1 space-y-3">
          {thread?.messages.map((message, index) => (
            <article key={`${message.role}-${index}`} className={`max-w-xl rounded-2xl px-4 py-3 ${message.role === "user" ? "ml-auto bg-white/10" : "bg-[#13201c]"}`}>
              {message.role === "demo" ? <p className="mb-1 font-mono text-[10px] tracking-[0.14em] text-[#8ee0c2]">DEMO</p> : null}
              <p>{message.text}</p>
            </article>
          ))}
          {!thread?.messages.length ? <p>This chat is empty.</p> : null}
        </div>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            send(draft);
          }}
        >
          <label className="sr-only" htmlFor="assist-draft">
            Message
          </label>
          <input id="assist-draft" value={draft} onChange={(event) => setDraft(event.target.value)} className="flex-1 rounded-xl border border-white/15 bg-transparent px-3 py-3" />
          <button type="submit" className="rounded-xl bg-[#8ee0c2] px-4 text-[#06281c]">
            Send
          </button>
        </form>
        {error ? (
          <p role="alert" className="mt-2 text-sm text-[#ffb4c0]">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className="mt-3 self-start text-sm underline"
          onClick={() => commit(threads.map((item) => (item.id === current ? { ...item, messages: [], title: "New chat" } : item)))}
        >
          Clear this chat
        </button>
      </section>
    </main>
  );
}

"use client";

import { createContext, useContext, useMemo } from "react";
import { useBrowserJson, writeBrowserJson } from "@/lib/browser-json";

export type CartLine = { id: string; qty: number };

type CartApi = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartApi | null>(null);

function isLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as { id?: unknown; qty?: unknown };
  return typeof line.id === "string" && typeof line.qty === "number" && line.qty > 0 && line.qty <= 9;
}

function parseLines(raw: string | null) {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isLine) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ storageKey, children }: { storageKey: string; children: React.ReactNode }) {
  const raw = useBrowserJson(storageKey);
  const lines = useMemo(() => parseLines(raw), [raw]);
  const ready = raw !== null;

  function commit(next: CartLine[]) {
    writeBrowserJson(storageKey, next);
  }

  const api: CartApi = {
    lines,
    ready,
    count: lines.reduce((sum, line) => sum + line.qty, 0),
    add: (id) => {
      const found = lines.find((line) => line.id === id);
      commit(found ? lines.map((line) => (line.id === id ? { ...line, qty: Math.min(9, line.qty + 1) } : line)) : [...lines, { id, qty: 1 }]);
    },
    setQty: (id, qty) => {
      commit(qty <= 0 ? lines.filter((line) => line.id !== id) : lines.map((line) => (line.id === id ? { ...line, qty: Math.min(9, qty) } : line)));
    },
    clear: () => commit([]),
  };

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Cart is missing a provider");
  return value;
}

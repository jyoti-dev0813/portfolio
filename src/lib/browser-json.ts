"use client";

import { useSyncExternalStore } from "react";

export function useBrowserJson(key: string) {
  const subscribe = (onChange: () => void) => {
    const name = `local:${key}`;
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) onChange();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(name, onChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(name, onChange);
    };
  };
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? "",
    () => null,
  );
}

export function writeBrowserJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(`local:${key}`));
}

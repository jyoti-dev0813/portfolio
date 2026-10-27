import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assist",
  description: "Chat interface demo with scripted replies. No model is connected.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
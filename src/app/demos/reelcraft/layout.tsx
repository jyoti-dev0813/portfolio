import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReelCraft",
  description: "Storyboard concept with animated placeholders.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SocialSpark",
  description: "Concept campaign for a fictional stationery brand.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

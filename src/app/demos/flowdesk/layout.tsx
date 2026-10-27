import type { Metadata } from "next";
import { Suspense } from "react";
import { FlowNav } from "@/components/demos/flowdesk";

export const metadata: Metadata = {
  title: "FlowDesk",
  description: "Sample operations dashboard. Figures are invented.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1220] text-[#e7eef8] md:flex">
      <Suspense fallback={<div className="h-16 md:w-56" />}>
        <FlowNav />
      </Suspense>
      <main id="content" className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}

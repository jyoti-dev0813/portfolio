import type { Metadata } from "next";
import { Suspense } from "react";
import { CartProvider } from "@/components/demos/cart";
import { NovaHeader } from "@/components/demos/nova";

export const metadata: Metadata = {
  title: "NovaCart",
  description: "Concept storefront demo. Nothing is for sale.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider storageKey="novacart-cart">
      <div className="min-h-screen bg-[#14110e] text-[#f3eadf]">
        <Suspense fallback={<div className="h-16 border-b border-[#3a2a22]" />}>
          <NovaHeader />
        </Suspense>
        <main id="content">{children}</main>
      </div>
    </CartProvider>
  );
}

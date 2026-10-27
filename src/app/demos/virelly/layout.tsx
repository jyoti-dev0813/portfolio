import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Suspense } from "react";
import { CartProvider } from "@/components/demos/cart";
import { VirellyHeader } from "@/components/demos/virelly";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Virelly Jewellers",
  description: "Luxury jewellery concept. Not a real shop.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider storageKey="virelly-cart">
      <div className={`${serif.variable} min-h-screen bg-[#f4efe6] text-[#1c1915]`} style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
        <Suspense fallback={<div className="h-20" />}>
          <VirellyHeader />
        </Suspense>
        <main id="content">{children}</main>
      </div>
    </CartProvider>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { VirellyProduct } from "@/components/demos/virelly";
import { findVirelly, virellyProducts } from "@/data/catalogs";

export function generateStaticParams() {
  return virellyProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/demos/virelly/p/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = findVirelly(slug);
  return { title: product ? product.name : "Piece" };
}

export default function Page({ params }: PageProps<"/demos/virelly/p/[slug]">) {
  return (
    <Suspense fallback={<p className="px-6 py-10">Loading piece…</p>}>
      <Piece params={params} />
    </Suspense>
  );
}

async function Piece({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findVirelly(slug);
  if (!product) notFound();
  return <VirellyProduct product={product} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { NovaProduct } from "@/components/demos/nova";
import { findNova, novaProducts } from "@/data/catalogs";

export function generateStaticParams() {
  return novaProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/demos/nova-cart/p/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = findNova(slug);
  return { title: product ? product.name : "Product", description: product?.summary };
}

export default function Page({ params }: PageProps<"/demos/nova-cart/p/[slug]">) {
  return (
    <Suspense fallback={<p className="px-5 py-10">Loading product…</p>}>
      <Product params={params} />
    </Suspense>
  );
}

async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findNova(slug);
  if (!product) notFound();
  return <NovaProduct product={product} />;
}

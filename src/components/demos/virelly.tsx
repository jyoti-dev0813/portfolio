"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { virellyCategories, virellyProducts, type CatalogProduct } from "@/data/catalogs";
import { formatUsd } from "@/lib/utils";
import { useCart } from "@/components/demos/cart";
import { ProductMark } from "@/components/demos/marks";

const gold = "#9a7b4f";

export function VirellyHeader() {
  const pathname = usePathname();
  const { count } = useCart();
  return (
    <header className="flex items-center justify-between px-6 py-6">
      <Link href="/demos/virelly" className="text-2xl tracking-[0.18em]">
        VIRELLY
      </Link>
      <nav aria-label="Virelly" className="flex gap-5 text-sm">
        <Link href="/demos/virelly" aria-current={pathname === "/demos/virelly" ? "page" : undefined}>
          Collection
        </Link>
        <Link href="/demos/virelly/cart" aria-current={pathname === "/demos/virelly/cart" ? "page" : undefined}>
          Reserve ({count})
        </Link>
        <Link href="/#work">Shivonix</Link>
      </nav>
    </header>
  );
}

export function VirellyCatalog() {
  const [category, setCategory] = useState<(typeof virellyCategories)[number]>("All");
  const products = useMemo(
    () => virellyProducts.filter((product) => category === "All" || product.category === category),
    [category],
  );
  return (
    <div className="px-6 py-8">
      <p className="text-xs tracking-[0.22em] text-[#9a7b4f]">CONCEPT PROJECT</p>
      <h1 className="mt-3 max-w-xl text-6xl leading-none">Quiet pieces for an imagined house.</h1>
      <p className="mt-4 max-w-lg text-[#5c5348]">Virelly is not a jeweller. Prices are samples. Drawings are original.</p>
      <div className="mt-8 flex flex-wrap gap-3" role="toolbar" aria-label="Categories">
        {virellyCategories.map((item) => (
          <button key={item} type="button" aria-pressed={category === item} className={category === item ? "underline" : ""} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-12">
        {products.map((product) => (
          <li key={product.slug} className="grid items-center gap-6 border-t border-[#e4d8c8] pt-8 md:grid-cols-[180px_1fr_auto]">
            <div className="h-36">
              <ProductMark mark={product.mark} accent={gold} />
            </div>
            <div>
              <h2 className="text-4xl">{product.name}</h2>
              <p className="mt-2 text-[#5c5348]">{product.summary}</p>
            </div>
            <div className="text-right">
              <p>{formatUsd(product.price)}</p>
              <Link href={`/demos/virelly/p/${product.slug}`} className="mt-3 inline-block border-b border-[#9a7b4f]">
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VirellyProduct({ product }: { product: CatalogProduct }) {
  const { add } = useCart();
  const [note, setNote] = useState("");
  return (
    <div className="grid gap-10 px-6 py-10 md:grid-cols-2">
      <div className="p-8">
        <ProductMark mark={product.mark} accent={gold} />
      </div>
      <div className="max-w-md">
        <p className="text-xs tracking-[0.2em] text-[#9a7b4f]">CONCEPT PIECE</p>
        <h1 className="mt-3 text-6xl leading-none">{product.name}</h1>
        <p className="mt-4">{formatUsd(product.price)} · sample</p>
        <p className="mt-4 text-[#5c5348]">{product.details}</p>
        <button
          type="button"
          className="mt-8 border border-[#1c1915] px-6 py-3"
          onClick={() => {
            add(product.slug);
            setNote("Saved to the reserve list in this browser.");
          }}
        >
          Reserve in this demo
        </button>
        <p role="status" className="mt-3 text-sm">
          {note}
        </p>
      </div>
    </div>
  );
}

export function VirellyCart() {
  const { lines, setQty, clear, ready } = useCart();
  const [reserved, setReserved] = useState(false);
  const rows = lines
    .map((line) => ({ line, product: virellyProducts.find((product) => product.slug === line.id) }))
    .filter((row): row is { line: (typeof lines)[number]; product: CatalogProduct } => Boolean(row.product));
  if (!ready) return <p className="px-6 py-10">Loading the list…</p>;
  if (reserved) {
    return (
      <div className="px-6 py-16" role="status">
        <h1 className="text-5xl">Noted.</h1>
        <p className="mt-3 max-w-md text-[#5c5348]">This reserve stayed on this device. No enquiry was sent and no payment was taken.</p>
      </div>
    );
  }
  if (!rows.length) {
    return (
      <div className="px-6 py-16">
        <h1 className="text-5xl">Nothing reserved.</h1>
        <Link href="/demos/virelly" className="mt-4 inline-block border-b border-[#9a7b4f]">
          Return to the collection
        </Link>
      </div>
    );
  }
  return (
    <div className="px-6 py-10">
      <h1 className="text-5xl">Reserve list</h1>
      <ul className="mt-8 grid gap-4">
        {rows.map(({ line, product }) => (
          <li key={line.id} className="flex items-center justify-between border-b border-[#e4d8c8] pb-3">
            <span>{product.name}</span>
            <span className="flex items-center gap-2">
              <button type="button" aria-label={`Decrease ${product.name}`} onClick={() => setQty(line.id, line.qty - 1)}>
                −
              </button>
              {line.qty}
              <button type="button" aria-label={`Increase ${product.name}`} onClick={() => setQty(line.id, line.qty + 1)}>
                +
              </button>
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-8 border border-[#1c1915] px-6 py-3"
        onClick={() => {
          clear();
          setReserved(true);
        }}
      >
        Confirm local reserve
      </button>
    </div>
  );
}

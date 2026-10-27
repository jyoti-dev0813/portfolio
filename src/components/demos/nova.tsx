"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { novaCategories, novaProducts, type CatalogProduct } from "@/data/catalogs";
import { formatUsd } from "@/lib/utils";
import { ProductMark } from "@/components/demos/marks";
import { useCart } from "@/components/demos/cart";

const accent = "#e08a4f";

export function NovaHeader() {
  const pathname = usePathname();
  const { count } = useCart();
  const links = [
    ["/demos/nova-cart", "Shop"],
    ["/demos/nova-cart/cart", `Cart (${count})`],
  ];
  return (
    <header className="flex items-center justify-between gap-4 border-b border-[#3a2a22] px-5 py-4">
      <Link href="/demos/nova-cart" className="font-mono text-sm tracking-[0.22em]">
        NOVACART
      </Link>
      <nav aria-label="NovaCart" className="flex items-center gap-4 text-sm">
        {links.map(([href, label]) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={pathname === href ? "text-[#e08a4f]" : ""}>
            {label}
          </Link>
        ))}
        <Link href="/#work" className="text-[#b6a394]">
          Shivonix
        </Link>
      </nav>
    </header>
  );
}

export function NovaCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof novaCategories)[number]>("All");
  const [sort, setSort] = useState("featured");
  const products = useMemo(() => {
    const list = novaProducts.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery = `${product.name} ${product.summary}`.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  return (
    <div className="px-5 py-8">
      <p className="font-mono text-[11px] tracking-[0.18em] text-[#e08a4f]">CONCEPT PROJECT</p>
      <h1 className="mt-2 text-4xl tracking-tight">Goods for a desk and a room.</h1>
      <p className="mt-3 max-w-xl text-[#d8c7b6]">Sample prices. Nothing is for sale. This is a frontend demo with no database.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <label className="grid gap-1 text-sm">
          Search
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-lg border border-[#3a2a22] bg-transparent px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value as (typeof novaCategories)[number])} className="rounded-lg border border-[#3a2a22] bg-[#14110e] px-3 py-2">
            {novaCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Sort
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-[#3a2a22] bg-[#14110e] px-3 py-2">
            <option value="featured">Featured</option>
            <option value="low">Price, low to high</option>
            <option value="high">Price, high to low</option>
          </select>
        </label>
      </div>
      <p className="mt-4 text-sm text-[#b6a394]" role="status">
        Showing {products.length} {products.length === 1 ? "product" : "products"}.
      </p>
      {products.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-[#3a2a22] p-6">No products match that search. Clear the filters and try again.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.slug}>
              <Link href={`/demos/nova-cart/p/${product.slug}`} className="block rounded-2xl border border-[#3a2a22] p-3">
                <div className="aspect-square rounded-xl bg-[#1d1612] p-4">
                  <ProductMark mark={product.mark} accent={accent} />
                </div>
                <p className="mt-3">{product.name}</p>
                <p className="text-sm text-[#e08a4f]">{formatUsd(product.price)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function NovaProduct({ product }: { product: CatalogProduct }) {
  const { add } = useCart();
  const [note, setNote] = useState("");
  return (
    <div className="grid gap-8 px-5 py-8 md:grid-cols-2">
      <div className="aspect-square rounded-3xl bg-[#1d1612] p-10">
        <ProductMark mark={product.mark} accent={accent} />
      </div>
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-[#e08a4f]">CONCEPT PRODUCT</p>
        <h1 className="mt-2 text-5xl tracking-tight">{product.name}</h1>
        <p className="mt-3 text-2xl text-[#e08a4f]">{formatUsd(product.price)}</p>
        <p className="mt-4 text-[#d8c7b6]">{product.details}</p>
        <ul className="mt-4 grid gap-1 text-sm text-[#b6a394]">
          {product.notes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-6 rounded-full bg-[#e08a4f] px-5 py-3 text-[#1a100c]"
          onClick={() => {
            add(product.slug);
            setNote(`${product.name} is in the cart.`);
          }}
        >
          Add to cart
        </button>
        <p role="status" className="mt-3 text-sm">
          {note}
        </p>
      </div>
    </div>
  );
}

export function NovaCartView() {
  const { lines, setQty, ready } = useCart();
  const rows = lines
    .map((line) => ({ line, product: novaProducts.find((product) => product.slug === line.id) }))
    .filter((row): row is { line: (typeof lines)[number]; product: CatalogProduct } => Boolean(row.product));
  const total = rows.reduce((sum, row) => sum + row.product.price * row.line.qty, 0);
  if (!ready) return <p className="px-5 py-8">Loading cart…</p>;
  if (!rows.length) {
    return (
      <div className="px-5 py-16">
        <h1 className="text-4xl">The cart is empty.</h1>
        <Link href="/demos/nova-cart" className="mt-4 inline-block underline">
          Browse the shop
        </Link>
      </div>
    );
  }
  return (
    <div className="px-5 py-8">
      <h1 className="text-4xl">Cart</h1>
      <ul className="mt-6 grid gap-4">
        {rows.map(({ line, product }) => (
          <li key={line.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3a2a22] pb-4">
            <span>{product.name}</span>
            <span className="flex items-center gap-2">
              <button type="button" aria-label={`Decrease quantity of ${product.name}`} className="h-9 w-9 rounded-full border border-[#3a2a22]" onClick={() => setQty(line.id, line.qty - 1)}>
                −
              </button>
              <span>{line.qty}</span>
              <button type="button" aria-label={`Increase quantity of ${product.name}`} className="h-9 w-9 rounded-full border border-[#3a2a22]" onClick={() => setQty(line.id, line.qty + 1)}>
                +
              </button>
            </span>
            <span>{formatUsd(product.price * line.qty)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xl">Subtotal {formatUsd(total)}</p>
      <p className="text-sm text-[#b6a394]">Sample total. No tax and no shipping, because nothing is sold.</p>
      <Link href="/demos/nova-cart/checkout" className="mt-4 inline-block rounded-full bg-[#e08a4f] px-5 py-3 text-[#1a100c]">
        Mock checkout
      </Link>
    </div>
  );
}

export function NovaCheckout() {
  const { count, clear } = useCart();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [card, setCard] = useState("");
  if (done) {
    return (
      <div className="px-5 py-16" role="status">
        <h1 className="text-4xl">Demo complete.</h1>
        <p className="mt-3 max-w-lg text-[#d8c7b6]">No payment was processed and no order was sent. The cart in this browser was cleared.</p>
      </div>
    );
  }
  return (
    <form
      className="grid max-w-lg gap-3 px-5 py-8"
      onSubmit={(event) => {
        event.preventDefault();
        if (!count) {
          setError("The cart is empty.");
          return;
        }
        if (card.trim().toUpperCase() !== "DEMO") {
          setError("This demo does not process cards. Type DEMO to simulate a checkout.");
          return;
        }
        clear();
        setDone(true);
      }}
    >
      <h1 className="text-4xl">Mock checkout</h1>
      <p className="text-sm text-[#d8c7b6]">Type DEMO in the card field. Nothing is charged.</p>
      <label className="grid gap-1 text-sm">
        Name
        <input required name="name" className="rounded-lg border border-[#3a2a22] bg-transparent px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm">
        Card
        <input value={card} onChange={(event) => setCard(event.target.value)} aria-describedby="card-help" className="rounded-lg border border-[#3a2a22] bg-transparent px-3 py-2" />
      </label>
      <p id="card-help" className="text-xs text-[#b6a394]">
        Demo only. No real card number is accepted.
      </p>
      {error ? (
        <p role="alert" className="text-sm text-[#ffb4a8]">
          {error}
        </p>
      ) : null}
      <button type="submit" className="rounded-full bg-[#e08a4f] px-5 py-3 text-[#1a100c]">
        Place demo order
      </button>
      <Suspense>
        <span className="sr-only">{count} items</span>
      </Suspense>
    </form>
  );
}

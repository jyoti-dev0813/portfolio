export type CatalogProduct = {
  slug: string;
  name: string;
  price: number;
  category: string;
  summary: string;
  details: string;
  notes: string[];
  mark: string;
};

export const novaProducts: CatalogProduct[] = [
  {
    slug: "arc-lamp",
    name: "Arc Lamp",
    price: 18600,
    category: "Home",
    summary: "A low brass arc for a desk, drawn as a concept product.",
    details: "Matte shade, weighted base, and a cord you can actually hide. Sample product for the NovaCart demo.",
    notes: ["Concept product", "Sample price", "Not for sale"],
    mark: "lamp",
  },
  {
    slug: "field-notebook",
    name: "Field Notebook",
    price: 2400,
    category: "Work",
    summary: "Plain paper, stitched binding, no logo from a real brand.",
    details: "A pocket notebook used to show a simple catalog card and a product page.",
    notes: ["64 pages", "Concept product"],
    mark: "book",
  },
  {
    slug: "pour-over",
    name: "Pour-over",
    price: 4200,
    category: "Kitchen",
    summary: "A ceramic dripper with a quiet profile.",
    details: "Included so the kitchen filter has something to show. No manufacturer is implied.",
    notes: ["Concept product", "Hand-drawn mark"],
    mark: "cup",
  },
  {
    slug: "wool-throw",
    name: "Wool Throw",
    price: 9800,
    category: "Home",
    summary: "A folded textile, shown as geometry rather than a photo.",
    details: "Useful for a second home item with a higher sample price.",
    notes: ["Concept product", "Sample price"],
    mark: "textile",
  },
  {
    slug: "desk-speaker",
    name: "Desk Speaker",
    price: 12400,
    category: "Work",
    summary: "A small speaker for a desk scene.",
    details: "The demo does not play audio. The page is about layout, not a sound demo.",
    notes: ["No audio", "Concept product"],
    mark: "speaker",
  },
  {
    slug: "ink-pen",
    name: "Ink Pen",
    price: 3600,
    category: "Work",
    summary: "A capped pen with a brass clip.",
    details: "A lower-priced work item so sort-by-price has a spread.",
    notes: ["Concept product"],
    mark: "pen",
  },
  {
    slug: "travel-tumbler",
    name: "Travel Tumbler",
    price: 3200,
    category: "Carry",
    summary: "A lidded cup for the carry category.",
    details: "Exists so the category filter is not a single lonely group.",
    notes: ["Concept product", "Sample price"],
    mark: "bottle",
  },
  {
    slug: "linen-apron",
    name: "Linen Apron",
    price: 6400,
    category: "Kitchen",
    summary: "An apron reduced to straps and a pocket.",
    details: "Pairs with the pour-over in the kitchen filter.",
    notes: ["Concept product"],
    mark: "apron",
  },
];

export const novaCategories = ["All", "Home", "Work", "Kitchen", "Carry"] as const;

export const virellyProducts: CatalogProduct[] = [
  {
    slug: "line-ring",
    name: "Line Ring",
    price: 240000,
    category: "Rings",
    summary: "A thin band with one stone, drawn as a concept.",
    details: "Virelly is not a jeweller. This ring exists to show a luxury product page.",
    notes: ["Concept piece", "Sample price", "Not for sale"],
    mark: "ring",
  },
  {
    slug: "drop-necklace",
    name: "Drop Necklace",
    price: 410000,
    category: "Necklaces",
    summary: "A single drop on a fine chain.",
    details: "Line art stands in for photography so the demo does not borrow a maison’s images.",
    notes: ["Concept piece"],
    mark: "necklace",
  },
  {
    slug: "stud-pair",
    name: "Stud Pair",
    price: 180000,
    category: "Earrings",
    summary: "Two small stones, evenly set.",
    details: "The quieter entry in the catalog, still marked as a concept.",
    notes: ["Concept piece", "Sample price"],
    mark: "studs",
  },
  {
    slug: "open-cuff",
    name: "Open Cuff",
    price: 320000,
    category: "Bracelets",
    summary: "An open cuff with a brushed finish in the drawing.",
    details: "Used to give the bracelet category its own page.",
    notes: ["Concept piece"],
    mark: "cuff",
  },
  {
    slug: "seed-pendant",
    name: "Seed Pendant",
    price: 275000,
    category: "Necklaces",
    summary: "A small oval pendant.",
    details: "A second necklace so the category filter returns more than one piece.",
    notes: ["Concept piece"],
    mark: "pendant",
  },
  {
    slug: "plain-band",
    name: "Plain Band",
    price: 150000,
    category: "Rings",
    summary: "An unadorned band.",
    details: "The lowest sample price in the set, still fictional.",
    notes: ["Concept piece", "Sample price"],
    mark: "band",
  },
];

export const virellyCategories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"] as const;

export function findNova(slug: string) {
  return novaProducts.find((product) => product.slug === slug);
}

export function findVirelly(slug: string) {
  return virellyProducts.find((product) => product.slug === slug);
}

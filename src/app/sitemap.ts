import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { novaProducts, virellyProducts } from "@/data/catalogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const paths = [
    "",
    ...projects.map((project) => `/work/${project.slug}`),
    "/demos/nova-cart",
    ...novaProducts.map((product) => `/demos/nova-cart/p/${product.slug}`),
    "/demos/nova-cart/cart",
    "/demos/nova-cart/checkout",
    "/demos/flowdesk",
    "/demos/flowdesk/pipeline",
    "/demos/flowdesk/profile",
    "/demos/flowdesk/settings",
    "/demos/virelly",
    ...virellyProducts.map((product) => `/demos/virelly/p/${product.slug}`),
    "/demos/virelly/cart",
    "/demos/social-spark",
    "/demos/reelcraft",
    "/demos/ai-assist",
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}

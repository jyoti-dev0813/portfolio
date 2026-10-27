import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SHIVONIX",
    short_name: "SHIVONIX",
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#07070b",
    theme_color: "#07070b",
  };
}

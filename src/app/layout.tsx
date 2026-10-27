import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import Script from "next/script";
import { site, socials } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SHIVONIX · Jyoti Agarwal",
    template: "%s · SHIVONIX",
  },
  description: site.supporting,
  applicationName: "SHIVONIX",
  authors: [{ name: site.founder }],
  creator: site.founder,
  keywords: ["Shivonix", "Jyoti Agarwal", "full-stack developer", "frontend developer", "freelance"],
  openGraph: {
    type: "website",
    title: "SHIVONIX · Ideas into digital experiences",
    description: site.supporting,
    siteName: "SHIVONIX",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIVONIX · Jyoti Agarwal",
    description: site.supporting,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#07070b",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.founder,
      jobTitle: "Full-Stack Developer",
      email: `mailto:${site.email}`,
      url: site.url,
      sameAs: socials.filter((item) => item.external).map((item) => item.href),
    },
    {
      "@type": "Organization",
      name: "Shivonix",
      url: site.url,
      email: site.email,
      slogan: site.tagline,
      founder: { "@type": "Person", name: site.founder },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrains.variable} h-full antialiased`}
      data-intro="on"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script id="intro-flag" strategy="beforeInteractive">
          {`try{var r=matchMedia("(prefers-reduced-motion: reduce)").matches;var s=sessionStorage.getItem("shivonix-intro");document.documentElement.dataset.intro=(r||s)?"off":"on";}catch(e){document.documentElement.dataset.intro="off";}`}
        </Script>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

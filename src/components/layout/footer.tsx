import Link from "next/link";
import { nav, site, socials } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { SocialIcon } from "@/components/brand/social-icon";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">{site.tagline}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-faint">{site.supporting}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-2 text-sm text-mist">
            {nav.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid content-start gap-3 text-sm">
          <a className="text-mist hover:text-paper" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="text-mist hover:text-paper" href={`tel:+${site.phoneE164}`}>
            {site.phoneDisplay}
          </a>
          <ul className="mt-2 flex flex-wrap gap-2">
            {socials.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mist hover:text-paper"
                  aria-label={item.external ? `${item.label} (opens in a new tab)` : item.label}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <SocialIcon id={item.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 border-t border-white/10 px-5 py-4 text-xs text-faint md:px-8">
        <p>© 2026 {site.founder}. Shivonix.</p>
        <a href="#top" className="text-mist hover:text-paper">
          Back to top
        </a>
      </div>
    </footer>
  );
}

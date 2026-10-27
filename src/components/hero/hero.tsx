import Link from "next/link";
import { heroDescription } from "@/data/home";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { Prism } from "@/components/brand/prism";
import { Button } from "@/components/ui/button";
import { CodePanel } from "@/components/hero/code-panel";
import { Marquee } from "@/components/hero/marquee";
import { Portrait } from "@/components/hero/portrait";
import { PreviewArt } from "@/components/work/preview-art";

const lead = ["BUILDING", "DIGITAL", "EXPERIENCES"];
const tail = ["THAT", "MOVE", "BUSINESSES", "FORWARD."];

export function Hero() {
  const tiles = ["milieu-solar", "novacart", "flowdesk"]
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(91,47,224,0.28),transparent_68%)]"
      />
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="order-2 lg:order-1">
          <p className="max-w-xl font-mono text-xs tracking-[0.18em] text-violet uppercase">
            00 / Idea · {site.tagline}
          </p>
          <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.05rem,4.6vw,4.35rem)] leading-[0.94] font-medium tracking-[-0.045em]">
            <span className="block">
              {lead.map((word, index) => (
                <span
                  key={word}
                  className={`word-rise ${word === "DIGITAL" ? "text-violet" : ""}`}
                  style={{ animationDelay: `${index * 50}ms`, paddingRight: "0.22em" }}
                >
                  {word}
                </span>
              ))}
            </span>
            <span className="mt-1 block">
              {tail.map((word, index) => (
                <span key={word} className="word-rise" style={{ animationDelay: `${(index + lead.length) * 50}ms`, paddingRight: "0.22em" }}>
                  {word}
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg">{heroDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/#contact">LET&apos;S BUILD SOMETHING</Button>
            <Button href="/#work" variant="secondary">
              EXPLORE MY WORK
            </Button>
            <Button href={site.resumePath} variant="ghost" download>
              DOWNLOAD RESUME
            </Button>
          </div>
        </div>
        <div className="relative order-1 lg:order-2">
          <Portrait />
          <div className="absolute -bottom-2 left-0 h-28 w-28 md:h-40 md:w-40 lg:-left-10">
            <Prism />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 grid w-full max-w-[1120px] gap-4 px-5 md:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <CodePanel />
        <div className="grid gap-3">
          {tiles.map((project) => (
            <Link
              key={project.slug}
              href={project.demoHref ?? `/work/${project.slug}`}
              className="grid grid-cols-[88px_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-panel/70 p-2"
            >
              <div className="h-16 overflow-hidden rounded-xl">
                <PreviewArt kind={project.preview} />
              </div>
              <span>
                <span className="block text-sm">{project.title}</span>
                <span className="block text-xs text-faint">{project.badge ?? "Project reference"}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Marquee />
      </div>
      <a href="#about" className="mx-auto mt-8 flex w-fit flex-col items-center gap-2 text-xs tracking-[0.18em] text-faint uppercase">
        Scroll
        <span className="block h-10 w-px bg-gradient-to-b from-beam to-transparent" />
      </a>
    </section>
  );
}

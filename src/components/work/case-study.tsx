import Link from "next/link";
import { site } from "@/config/site";
import { getAdjacent, type Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { PreviewArt } from "@/components/work/preview-art";
import { DiscussButton } from "@/components/work/discuss-button";

const toc = [
  ["overview", "Overview"],
  ["objectives", "Objectives"],
  ["design", "Design direction"],
  ["features", "Features"],
  ["stack", "Technology"],
  ["preview", "Preview"],
  ["contribution", "Contribution"],
  ["challenges", "Challenges"],
] as const;

export function CaseStudy({ project }: { project: Project }) {
  const { prev, next } = getAdjacent(project.slug);
  const verifiedStack = project.stack.filter((item) => item.status === "verified");

  return (
    <article className="mx-auto w-full max-w-[1120px] px-5 pt-28 pb-20 md:px-8">
      <Link href="/#work" className="text-sm text-mist underline decoration-white/20 underline-offset-4">
        All work
      </Link>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.badge ? <Badge tone="warn">{project.badge}</Badge> : <Badge tone="neutral">Project reference</Badge>}
        <Badge>{project.yearLabel}</Badge>
      </div>
      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_200px]">
        <div>
          <h1 className="font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] tracking-[-0.045em]">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{project.summary}</p>
          <p className="mt-4 text-sm leading-relaxed text-paper">{project.role}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.externalHref ? (
              <a className="rounded-full border border-white/15 px-4 py-2 text-sm" href={project.externalHref} target="_blank" rel="noopener noreferrer">
                Visit live site
              </a>
            ) : null}
            {project.demoHref ? (
              <Link className="rounded-full bg-violet-deep px-4 py-2 text-sm text-white" href={project.demoHref}>
                Open demo
              </Link>
            ) : null}
          </div>

          <section id="overview" className="scroll-mt-28 mt-12">
            <h2 className="font-display text-3xl">Overview</h2>
            <p className="mt-3 leading-relaxed text-mist">{project.overview}</p>
          </section>
          <section id="objectives" className="scroll-mt-28 mt-10">
            <h2 className="font-display text-3xl">{project.objectivesTitle}</h2>
            <ul className="mt-3 grid gap-2">
              {project.objectives.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-mist">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section id="design" className="scroll-mt-28 mt-10">
            <h2 className="font-display text-3xl">Design direction</h2>
            <p className="mt-3 leading-relaxed text-mist">{project.designDirection}</p>
          </section>
          <section id="features" className="scroll-mt-28 mt-10">
            <h2 className="font-display text-3xl">Main features</h2>
            <ul className="mt-3 grid gap-2">
              {project.features.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-mist">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section id="stack" className="scroll-mt-28 mt-10">
            <h2 className="font-display text-3xl">Technology stack</h2>
            {verifiedStack.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {verifiedStack.map((item) => (
                  <li key={item.name}>
                    <Badge>{item.name}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-mist">
                Technologies are not listed yet. They can be added in the project file once confirmed.
              </p>
            )}
          </section>
          <section id="preview" className="scroll-mt-28 mt-10">
            <h2 className="font-display text-3xl">Preview</h2>
            <p className="mt-2 text-sm text-faint">
              {project.kind === "reference"
                ? "Interpretive preview. Not a screenshot, and not the client’s logo."
                : "Original preview made for this concept."}
            </p>
            <div className="mt-4 h-64 overflow-hidden rounded-2xl border border-white/10">
              <PreviewArt kind={project.preview} />
            </div>
          </section>
          <section id="contribution" className="scroll-mt-28 mt-10">
            <h2 className="font-display text-3xl">My contribution</h2>
            <p className="mt-3 leading-relaxed text-mist">{project.contribution}</p>
          </section>
          <section id="challenges" className="scroll-mt-28 mt-10">
            <h2 className="font-display text-3xl">Challenges and solutions</h2>
            <ul className="mt-3 grid gap-3">
              {project.challenges.map((item) => (
                <li key={item.text} className="rounded-xl border border-white/10 p-3 text-sm leading-relaxed text-mist">
                  {item.status === "hypothetical" ? (
                    <span className="mb-2 block font-mono text-[10px] tracking-[0.14em] text-[#ffd7a8] uppercase">
                      Hypothetical, for the demo
                    </span>
                  ) : null}
                  {item.text}
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-12 rounded-2xl border border-white/10 p-5">
            <h2 className="font-display text-3xl">A similar project</h2>
            <p className="mt-2 text-sm text-mist">{site.availability}</p>
            <div className="mt-4">
              <DiscussButton serviceId={project.serviceId}>Discuss a similar project</DiscussButton>
            </div>
          </div>
          <nav className="mt-10 flex justify-between gap-4 text-sm" aria-label="More projects">
            {prev ? <Link href={`/work/${prev.slug}`}>Previous · {prev.title}</Link> : <span />}
            {next ? <Link href={`/work/${next.slug}`}>Next · {next.title}</Link> : <span />}
          </nav>
        </div>
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28 grid gap-2 text-sm text-mist">
            {toc.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="hover:text-paper">
                {label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </article>
  );
}

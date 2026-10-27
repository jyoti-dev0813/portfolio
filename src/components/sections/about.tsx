import Link from "next/link";
import { recruiterMailto, site } from "@/config/site";
import { aboutIntro, interests } from "@/data/home";
import { skillGroups } from "@/data/skills";
import { timeline } from "@/data/timeline";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs } from "@/components/ui/tabs";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8">
        <SectionHeading
          index="01"
          label="About"
          title="A developer building the studio in public."
          lede="More than one year of frontend work, and a growing full-stack practice. Shivonix is the name on the work."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-lg leading-relaxed text-mist">
            {aboutIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <Link
                href="https://www.linkedin.com/in/jyoti-agarwal-a01663402/"
                className="text-paper underline decoration-white/30 underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn profile (opens in a new tab)
              </Link>
            </p>
          </div>
          <ul className="grid gap-3">
            {interests.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 p-4">
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-3xl tracking-tight">Technology stack</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
            Daily use means regular work. Exploring means it is in play and the depth is still growing. Edit every row in <span className="font-mono text-paper">data/skills.ts</span>.
          </p>
          <div className="mt-6">
            <Tabs
              label="Technology groups"
              tabs={skillGroups.map((group) => ({
                id: group.id,
                label: group.label,
                panel: (
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item.name} className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3">
                        <span>{item.name}</span>
                        <span className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
                          {item.practice === "daily" ? "Daily use" : "Exploring"}
                        </span>
                      </li>
                    ))}
                  </ul>
                ),
              }))}
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-3xl tracking-tight">Timeline</h3>
          <ol className="mt-6 grid gap-4">
            {timeline.map((item) => (
              <li key={item.id} className="grid gap-2 border-l border-white/15 py-1 pl-5 md:grid-cols-[180px_1fr]">
                <p className="font-mono text-xs tracking-[0.14em] text-violet uppercase">{item.period}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg">{item.title}</h4>
                    {item.state === "confirm" ? (
                      <span className="rounded-full border border-[#ffd7a8]/40 px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-[#ffd7a8] uppercase">
                        Confirm
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 p-5">
            <h3 className="font-display text-2xl">For clients</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              A site, a store, a brand set, or a small application. The next step is a short brief.
            </p>
            <Button href="/#contact" className="mt-5">
              Start a project
            </Button>
          </article>
          <article className="rounded-2xl border border-white/10 p-5">
            <h3 className="font-display text-2xl">For recruiters</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{site.availability}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={recruiterMailto}>Email about a role</Button>
              <Button href={site.resumePath} variant="secondary" download>
                Download resume
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

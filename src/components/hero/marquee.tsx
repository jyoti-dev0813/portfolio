import { techStrip } from "@/data/home";

export function Marquee() {
  const items = techStrip.map((item) => (
    <li key={item} className="font-mono text-xs tracking-[0.18em] text-faint uppercase">
      {item}
    </li>
  ));
  return (
    <div className="marquee overflow-hidden border-y border-white/10 py-3">
      <p className="sr-only">A short selection of technologies. Practice levels are in the skills section.</p>
      <ul className="flex w-max animate-marquee gap-8 motion-reduce:animate-none hover:[animation-play-state:paused]">
        {items}
        <li className="contents motion-reduce:hidden" aria-hidden>
          {techStrip.map((item) => (
            <span key={`${item}-copy`} className="font-mono text-xs tracking-[0.18em] text-faint uppercase">
              {item}
            </span>
          ))}
        </li>
      </ul>
    </div>
  );
}

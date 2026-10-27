export function SectionHeading({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet">
        {index} / {label}
      </p>
      <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[0.95] tracking-[-0.045em]">
        {title}
      </h2>
      {lede ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">{lede}</p> : null}
    </div>
  );
}

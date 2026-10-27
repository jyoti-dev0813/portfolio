import type { GalleryPiece } from "@/data/gallery";

export function GalleryArt({ piece }: { piece: GalleryPiece }) {
  const style = { background: piece.paper, color: piece.ink };
  if (piece.layout === "poster") {
    return (
      <div className="flex h-full min-h-64 flex-col justify-between p-4" style={style}>
        <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: piece.accent }}>
          {piece.kicker}
        </p>
        <p className="font-display text-4xl leading-none tracking-tight">{piece.headline}</p>
        <p className="text-sm">{piece.detail}</p>
      </div>
    );
  }
  if (piece.layout === "wide") {
    return (
      <div className="flex h-full min-h-40 items-center justify-between gap-3 p-4" style={style}>
        <div>
          <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: piece.accent }}>
            {piece.kicker}
          </p>
          <p className="mt-2 font-display text-3xl leading-none">{piece.headline}</p>
        </div>
        <span className="h-12 w-12 shrink-0 rounded-full" style={{ background: piece.accent }} />
      </div>
    );
  }
  if (piece.layout === "brand") {
    return (
      <div className="flex h-full min-h-52 flex-col justify-between p-4" style={style}>
        <div className="flex gap-2">
          {[piece.ink, piece.accent, piece.paper].map((color) => (
            <span key={color} className="h-8 w-8 rounded-full border border-black/10" style={{ background: color }} />
          ))}
        </div>
        <p className="font-display text-3xl tracking-[0.08em]">{piece.headline}</p>
        <p className="text-xs tracking-[0.16em] uppercase">{piece.detail}</p>
      </div>
    );
  }
  if (piece.layout === "campaign") {
    return (
      <div className="grid h-full min-h-52 grid-cols-3 gap-1 p-2" style={style}>
        {["01", "02", "03"].map((label) => (
          <div key={label} className="flex items-end p-2" style={{ background: label === "02" ? piece.accent : piece.ink, color: piece.paper }}>
            <span className="font-display text-2xl">{label}</span>
          </div>
        ))}
      </div>
    );
  }
  if (piece.layout === "device") {
    return (
      <div className="flex h-full min-h-64 items-center justify-center p-4" style={style}>
        <div className="w-28 rounded-[1.2rem] border border-white/20 p-2">
          <div className="rounded-xl p-3" style={{ background: piece.accent, color: piece.paper }}>
            <p className="font-display text-lg leading-none">{piece.headline}</p>
            <p className="mt-2 text-[10px]">{piece.detail}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-56 flex-col justify-between p-4" style={style}>
      <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: piece.accent }}>
        {piece.kicker}
      </p>
      <p className="font-display text-4xl leading-[0.9]">{piece.headline}</p>
      <p className="text-sm">{piece.detail}</p>
    </div>
  );
}

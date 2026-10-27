import type { Project } from "@/data/projects";

export function PreviewArt({ kind }: { kind: Project["preview"] }) {
  if (kind === "milieu") {
    return (
      <div className="grid h-full grid-rows-[1.2fr_0.8fr] bg-white text-[#10233f]">
        <div className="relative bg-[#16324f]">
          <div className="absolute inset-2 grid grid-cols-4 gap-1 opacity-80">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index} className="border border-[#8fb4d6]/50 bg-[#0d2238]" />
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <p className="text-[10px] font-semibold tracking-wide text-[#1d4f91]">SOLAR PV</p>
          <p className="text-sm leading-tight font-semibold">Malaysia · homes and industry</p>
        </div>
      </div>
    );
  }
  if (kind === "doctors") {
    return (
      <div className="flex h-full flex-col justify-between bg-[#1c1a17] p-3 text-[#f3ecdf]">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#d7b48a]">NEEDS CONFIRMATION</p>
        <p className="text-sm leading-snug">Reference on file. Description not verified.</p>
      </div>
    );
  }
  if (kind === "novacart") {
    return (
      <div className="flex h-full items-end bg-[#241910] p-3 text-[#f3eadf]">
        <span className="mr-auto h-10 w-6 rounded-t-full bg-[#e08a4f]" />
        <p className="font-mono text-[10px] tracking-[0.16em]">NOVACART</p>
      </div>
    );
  }
  if (kind === "flowdesk") {
    return (
      <div className="grid h-full grid-cols-[18px_1fr] bg-[#0b1220]">
        <div className="bg-[#132033]" />
        <div className="flex items-end gap-1 p-2">
          {[40, 65, 50, 80].map((height) => (
            <span key={height} className="w-2 bg-[#34d399]" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "virelly") {
    return (
      <div className="flex h-full flex-col justify-between bg-[#f4efe6] p-3 text-[#1c1915]">
        <span className="mx-auto mt-2 h-8 w-8 rounded-full border border-[#9a7b4f]" />
        <p className="text-center font-serif text-sm">Virelly</p>
      </div>
    );
  }
  if (kind === "socialspark") {
    return (
      <div className="grid h-full grid-cols-3 gap-1 bg-[#fff4ee] p-2">
        <span className="bg-[#e23d1a]" />
        <span className="col-span-2 bg-[#2a130e]" />
        <span className="col-span-2 bg-[#ffd7c8]" />
        <span className="bg-[#e23d1a]" />
      </div>
    );
  }
  if (kind === "reelcraft") {
    return (
      <div className="flex h-full items-center justify-between bg-[#100c0c] px-3 text-[#f6efe9]">
        <span className="font-mono text-[10px]">00:08</span>
        <span className="h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-[#ff5a3c]" />
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col justify-between bg-[#0e1412] p-3 text-[#e7f2ec]">
      <span className="h-2 w-2 rounded-full bg-[#8ee0c2]" />
      <p className="font-mono text-[10px] tracking-[0.14em]">DEMO REPLIES</p>
    </div>
  );
}

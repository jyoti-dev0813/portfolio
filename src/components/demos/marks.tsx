export function ProductMark({ mark, accent }: { mark: string; accent: string }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      {mark === "lamp" ? <path d="M30 28h60l-14 28H44L30 28zm30 28v40M42 96h36" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "book" ? <path d="M34 28h40v64H34zM42 40h24M42 52h24" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "cup" ? <path d="M40 36h32l-4 48H44L40 36zm32 10h10a12 12 0 0 1 0 20H72" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "textile" ? <path d="M28 36h64v48H28zM28 52h64M44 36v48" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "speaker" ? <rect x="36" y="28" width="48" height="64" rx="8" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "pen" ? <path d="M78 24L46 84l-8 12 14-6z" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "bottle" ? <path d="M52 24h16v12H52zM46 36h28v56H46z" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "apron" ? <path d="M48 24h24l8 72H40L48 24zM60 24v20" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "ring" ? <circle cx="60" cy="68" r="22" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "necklace" ? <path d="M30 40c16 36 44 36 60 0M60 76v16" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "studs" ? (
        <>
          <circle cx="44" cy="60" r="8" stroke={accent} fill="none" strokeWidth="3" />
          <circle cx="76" cy="60" r="8" stroke={accent} fill="none" strokeWidth="3" />
        </>
      ) : null}
      {mark === "cuff" ? <path d="M30 46c20 28 40 28 60 0" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "pendant" ? <ellipse cx="60" cy="70" rx="14" ry="20" stroke={accent} fill="none" strokeWidth="3" /> : null}
      {mark === "band" ? <rect x="28" y="52" width="64" height="16" rx="8" stroke={accent} fill="none" strokeWidth="3" /> : null}
    </svg>
  );
}

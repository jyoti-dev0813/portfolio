export function PrismFallback({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`prism-spin h-full w-full ${className}`} role="img" aria-label="Faceted Shivonix prism">
      <defs>
        <linearGradient id="prism-face" x1="40" y1="20" x2="170" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4F0FF" />
          <stop offset="0.4" stopColor="#8B6CFF" />
          <stop offset="1" stopColor="#3B1DB3" />
        </linearGradient>
      </defs>
      <path d="M100 18 L168 58 L168 142 L100 182 L32 142 L32 58 Z" fill="url(#prism-face)" />
      <path d="M100 18 L168 58 L100 98 Z" fill="#D7F6FF" opacity="0.55" />
      <path d="M100 98 L32 58 L32 142 Z" fill="#1A1038" opacity="0.35" />
      <path d="M100 98 L168 142 L100 182 Z" fill="#07070B" opacity="0.28" />
      <path d="M28 100 H92" stroke="#D7F6FF" strokeWidth="2" opacity="0.9" />
    </svg>
  );
}

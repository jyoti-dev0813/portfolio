import type { SocialId } from "@/config/site";

export function SocialIcon({ id }: { id: SocialId }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true as const,
  };
  if (id === "email") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    );
  }
  if (id === "whatsapp" || id === "channel") {
    return (
      <svg {...common}>
        <path d="M6 18l1.2-3A7 7 0 1 1 9 18.2L6 18z" />
        <path d="M9 10.5c.3 1.6 2 3 3.6 3.3" />
      </svg>
    );
  }
  if (id === "linkedin") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 11v5M8 8h.01M12 16v-3.2a1.8 1.8 0 1 1 3.6 0V16" />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <circle cx="16.5" cy="7.5" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  if (id === "facebook") {
    return (
      <svg {...common}>
        <path d="M14 8h2V5h-2c-2 0-3 1.2-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8c0-.4.2-.6.7-.6z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (id === "telegram") {
    return (
      <svg {...common}>
        <path d="M5 12l14-6-4 14-4-4-4 1 2-5z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="7" />
      <path d="M15 9a4 4 0 0 0-6 4 4 4 0 0 0 6 0" />
    </svg>
  );
}

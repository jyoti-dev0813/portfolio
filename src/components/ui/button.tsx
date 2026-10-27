import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  href?: string;
  external?: boolean;
  download?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

const variants = {
  primary: "bg-violet-deep text-white hover:bg-[#4c27c4]",
  secondary: "border border-white/15 bg-white/5 text-paper hover:border-white/30",
  ghost: "text-mist hover:text-paper",
};

export function Button({
  children,
  variant = "primary",
  className,
  href,
  external,
  download,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: Props) {
  const classes = cn(
    "sweep inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href) {
    if (external || download || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          data-sweep
          aria-label={ariaLabel}
          download={download || undefined}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        data-sweep
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      data-sweep
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

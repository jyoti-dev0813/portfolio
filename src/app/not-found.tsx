import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main id="content" className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-5">
      <Logo />
      <h1 className="mt-8 font-display text-5xl tracking-tight">That page is not here.</h1>
      <p className="mt-3 text-mist">The link may be old, or the project slug is not in the site data.</p>
      <Link href="/" className="mt-6 text-paper underline decoration-white/30 underline-offset-4">
        Back to Shivonix
      </Link>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { discussProject } from "@/lib/discuss";

export function DiscussButton({
  serviceId,
  children,
}: {
  serviceId: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="rounded-full bg-violet-deep px-5 py-3 text-sm text-white"
      onClick={() => discussProject(serviceId, router.push)}
    >
      {children}
    </button>
  );
}

"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="px-5 py-16">
      <h1 className="text-3xl">The shop view failed to load.</h1>
      <button type="button" className="mt-4 underline" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

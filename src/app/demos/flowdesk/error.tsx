"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="p-8">
      <h1 className="text-2xl">This desk view failed.</h1>
      <button type="button" className="mt-3 underline" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

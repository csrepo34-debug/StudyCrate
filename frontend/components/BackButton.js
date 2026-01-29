"use client";

import { useRouter } from 'next/navigation';

export default function BackButton({ className = '' }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`flex items-center gap-2 text-sm px-3 py-1 rounded-md border hover:bg-gray-100 transition ${className}`}
      aria-label="Go back"
      style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
    >
      <span
        aria-hidden="true"
        style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center' }}
      >
        &larr;
      </span>
      Back
    </button>
  );
}

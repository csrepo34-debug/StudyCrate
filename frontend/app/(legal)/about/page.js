"use client";
import { useRouter } from 'next/navigation';
export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <div className="space-y-8">
      const router = useRouter();
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition mb-2"
        aria-label="Go back"
        style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
      >
        <span aria-hidden="true" style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center' }}>&larr;</span>
        Back
      </button>
      {/* ...existing code... */}
      <h1 className="text-2xl font-semibold">About StudyCrate</h1>
      <p>StudyCrate is an independent educational platform focused on building strong foundations in Computer Science and Machine Learning through structured explanations, practical code, and carefully curated study resources.</p>
      <p>The platform is designed for students and early-stage engineers who want to understand how things work internally, not just how to use tools. StudyCrate emphasizes clarity, correctness, and depth across core CS areas such as data structures and algorithms, programming languages, web concepts, machine learning, deep learning, and applied AI.</p>
      <p>All content on StudyCrate is created with a learning-first mindset. Resources are developed as notes, tutorials, code examples, and small projects that balance theory with practical implementation. Wherever possible, explanations are kept minimal, precise, and reproducible.</p>
      <p>Some resources are offered as paid downloadable materials to support the continued development and maintenance of the platform. Purchased content is intended for individual use and long-term reference.</p>
      <p>As StudyCrate evolves, the goal remains the same:
to serve as a reliable study repository for learners who value fundamentals, clean code, and disciplined problem-solving.</p>
    </div>
  );
}

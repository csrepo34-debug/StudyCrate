"use client";
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { PRODUCTS } from '../../../lib/products';

export default function ProgrammingLanguagesPage() {
  const router = useRouter();
  const languageProducts = PRODUCTS.filter((p) => p.category === 'Programming Languages');
  return (
    <div className="space-y-4">
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
      <header className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold mx-auto" style={{ color: 'var(--color-text-primary)' }}>
          Programming Language Kits
        </h1>
        <p className="text-sm mx-auto max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
          Move from syntax to real programs with structured paths for Python and C, split into beginner and intermediate levels.
        </p>
      </header>

      {/* Read. Practice. Test. Section */}
      <section className="my-8">
        <h2 className="text-xl font-semibold mb-4 text-center" style={{ color: 'var(--color-text-primary)' }}>
          Read. Practice. Test.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Read */}
          <div className="card flex flex-col h-full items-center p-4">
            <div className="flex-1 flex items-center justify-center w-full mb-3" style={{ minHeight: 120 }}>
              <img src="/prog-lang-main-page/read.png" alt="Read Python and C" width={320} height={120} className="rounded-md object-cover" />
            </div>
            <h3 className="font-semibold mb-2 text-center">Read</h3>
            <p className="text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
              Start with well-structured PDFs and guides that explain Python and C programming concepts, syntax, and best practices in a clear, concise way. Each unit breaks down ideas step by step with practical examples and checklists.
            </p>
          </div>
          {/* Practice */}
          <div className="card flex flex-col h-full items-center p-4">
            <div className="flex-1 flex items-center justify-center w-full mb-3" style={{ minHeight: 120 }}>
              <video src="/prog-lang-main-page/practice.mp4" controls width={320} height={120} className="rounded-md object-cover bg-black" preload="metadata" />
            </div>
            <h3 className="font-semibold mb-2 text-center">Practice</h3>
            <p className="text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
              Apply what you learn using hands-on coding exercises and projects for Python and C. These practical tasks help you implement programming techniques, explore language features, and build confidence through guided practice.
            </p>
          </div>
          {/* Test */}
          <div className="card flex flex-col h-full items-center p-4">
            <div className="flex-1 flex items-center justify-center w-full mb-3" style={{ minHeight: 120 }}>
              <video src="/prog-lang-main-page/test.mp4" controls width={320} height={120} className="rounded-md object-cover bg-black" preload="metadata" />
            </div>
            <h3 className="font-semibold mb-2 text-center">Test</h3>
            <p className="text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
              Test your understanding with exercise-based coding challenges and quizzes that reinforce core programming concepts and prepare you for real-world projects and interviews.
            </p>
          </div>
        </div>
      </section>
      <div className="grid md:grid-cols-2 gap-4">
        {languageProducts.map((p) => {
          // Map product id to banner image path
          let bannerSrc = '';
          if (p._id.startsWith('python')) {
            if (p._id.includes('beginner')) {
              bannerSrc = '/prog-lang-main-page/python/python-beginner-banner.png';
            } else {
              bannerSrc = '/prog-lang-main-page/python/python-intermediate-banner.png';
            }
          } else if (p._id.startsWith('c')) {
            if (p._id.includes('beginner')) {
              bannerSrc = '/prog-lang-main-page/c/c-beginner-banner.png';
            } else {
              bannerSrc = '/prog-lang-main-page/c/c-intermediate-banner.png';
            }
          }
          return (
            <article key={p._id} className="card flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center w-full mb-3" style={{ minHeight: 180 }}>
                {bannerSrc && (
                  <Image
                    src={bannerSrc}
                    alt={`${p.title} Banner`}
                    width={400}
                    height={120}
                    className="rounded-md object-cover"
                  />
                )}
              </div>
              <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                {p.title}
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {p.description}
              </p>
              <p className="mt-2 text-brand-accent font-bold">₹{p.price}</p>
              <div className="flex justify-center mt-3">
                <a className="btn-primary" href={`/products/${p._id}`}>
                  View details
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

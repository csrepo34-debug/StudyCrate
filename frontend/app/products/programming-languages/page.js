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
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Programming language kits
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Move from syntax to real programs with structured paths for Python and C,
          split into beginner and intermediate levels.
        </p>
      </header>
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
            <article key={p._id} className="card flex flex-col">
              {bannerSrc && (
                <div className="w-full aspect-[3/1] relative rounded-t-md overflow-hidden mb-2">
                  <Image
                    src={bannerSrc}
                    alt={`${p.title} Banner`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              )}
              <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                {p.title}
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {p.description}
              </p>
              <p className="mt-2 text-brand-accent font-bold">₹{p.price}</p>
              <a className="btn-primary inline-block mt-3" href={`/products/${p._id}`}>
                View details
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '../../../lib/products';
import BackButton from '../../../components/BackButton';
import ProgrammingHero from '../../../components/ProgrammingHero';
import ProgrammingIntro from '../../../components/ProgrammingIntro';
import ProgrammingAlternatingSection from '../../../components/ProgrammingAlternatingSection';

export default function ProgrammingLanguagesPage() {
  const productsRef = useRef(null);
  const languageProducts = PRODUCTS.filter((p) => p.category === 'Programming Languages');

  const handleCTAClick = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8">
      <BackButton className="mb-2" />
      <ProgrammingHero onCTAClick={handleCTAClick} />
      <ProgrammingIntro />
      <ProgrammingAlternatingSection />
      <section ref={productsRef} className="pt-8">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Programming Language Kits
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
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
              <div
                className="flex-1 flex items-center justify-center w-full mb-3"
                style={{ minHeight: 180 }}
              >
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
              <h3
                className="font-semibold text-lg"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {p.description}
              </p>
              <p className="mt-2 text-brand-accent font-bold">₹{p.price}</p>
              <div className="w-full flex justify-center mt-3">
                <a className="btn-primary" href={`/products/${p._id}`}>
                  View details
                </a>
              </div>
            </article>
          );
        })}
        </div>
      </section>
    </div>
  );
}

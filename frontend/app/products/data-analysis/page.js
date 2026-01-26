"use client";

import { PRODUCTS } from '../../../lib/products';
import { useRef } from 'react';
import DataAnalysisHero from '../../../components/DataAnalysisHero';
import DataAnalysisIntro from '../../../components/DataAnalysisIntro';
import AlternatingSection from '../../../components/AlternatingSection';

export default function DataAnalysisPage() {
  const productsRef = useRef(null);
  const dataProducts = PRODUCTS.filter((p) => p.category.toLowerCase() === 'data analysis');

  const handleCTAClick = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8">
      <DataAnalysisHero onCTAClick={handleCTAClick} />
      <DataAnalysisIntro />
      <AlternatingSection />
      <section ref={productsRef} className="pt-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          Data Analysis Kits
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {dataProducts.map((p) => (
            <article key={p._id} className="card">
              <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                {p.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {p.description}
              </p>
              <p className="mt-2 text-brand-accent font-bold">₹{p.price}</p>
              <a className="btn-primary inline-block mt-3" href={`/products/${p._id}`}>
                View details
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

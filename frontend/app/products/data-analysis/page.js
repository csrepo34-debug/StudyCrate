"use client";

import { PRODUCTS } from '../../../lib/products';
import { useRef } from 'react';
import Image from 'next/image';
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
            <article key={p._id} className="card flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center w-full mb-3" style={{ minHeight: 180 }}>
                {p._id === 'eda-beginner-level' && (
                  <Image
                    src="/eda-main-page/beginner/eda-beginner-banner.png"
                    alt="EDA Beginner Banner"
                    width={400}
                    height={120}
                    className="rounded-md object-cover"
                  />
                )}
                {p._id === 'eda-intermediate-level' && (
                  <Image
                    src="/eda-main-page/intermediate/eda-intermediate-banner.png"
                    alt="EDA Intermediate Banner"
                    width={400}
                    height={120}
                    className="rounded-md object-cover"
                  />
                )}
              </div>
              <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                {p.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {p._id === 'eda-beginner-level'
                  ? 'Beginner-friendly EDA units covering data exploration, data cleaning, and basic analysis. Each unit includes a theory PDF, a practice notebook, and exercise-based tests to help you understand datasets from scratch.'
                  : p._id === 'eda-intermediate-level'
                  ? 'Intermediate-level EDA units focused on feature engineering, advanced visualizations, and deeper data insights. Learn through structured PDFs, hands-on notebooks, and applied exercises using real datasets.'
                  : p.description}
              </p>
              <p className="mt-2 text-brand-accent font-bold">₹{p.price}</p>
              <div className="w-full flex justify-center mt-3">
                <a className="btn-primary" href={`/products/${p._id}`}>
                  View details
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

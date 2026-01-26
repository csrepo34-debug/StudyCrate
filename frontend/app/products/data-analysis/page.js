import { PRODUCTS } from '../../../lib/products';

import { useRouter } from 'next/navigation';
export default function DataAnalysisPage() {
  const router = useRouter();
  const dataProducts = PRODUCTS.filter((p) => p.category.toLowerCase() === 'data analysis');

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Data analysis kits
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Learn Exploratory Data Analysis (EDA) by working through guided notebooks and
          checklists on real-world style datasets.
        </p>
      </header>
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
      <div className="grid md:grid-cols-2 gap-4">
        {dataProducts.map((p) => (
          <article key={p._id} className="card">
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
        ))}
      </div>
    </div>
  );
}

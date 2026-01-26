import { PRODUCTS } from '../../../lib/products';

export default function ProgrammingLanguagesPage() {
  const languageProducts = PRODUCTS.filter((p) => p.category === 'Programming Languages');

  return (
    <div className="space-y-4">
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
        {languageProducts.map((p) => (
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

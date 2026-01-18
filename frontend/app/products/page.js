import { PRODUCTS } from '../../lib/products';

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <h1
        className="text-2xl font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Products
      </h1>
      <div className="grid md:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <article key={p._id} className="card">
            <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
              {p.title}
            </h2>
            <p
              className="text-sm line-clamp-3"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {p.description}
            </p>
            <p className="mt-2 text-brand-accent font-bold">₹{p.price}</p>
            <a className="btn-primary inline-block mt-3" href={`/products/${p._id}`}>
              View & buy
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

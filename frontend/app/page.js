import Link from 'next/link';

const categories = ['Programming', 'DSA', 'ML', 'DS', 'DAA', 'Others'];

const sampleDownloadUrl = `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'}/api/sample-download`;

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-3">
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          StudyCrate – Digital study kits for hustling programmers
        </h1>
        <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          Secure PDFs, code packs, and notes.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link className="btn-primary" href="/products">
            Browse products
          </Link>
          <Link
            className="px-4 py-2 rounded border"
            href="/login"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            Login
          </Link>
          <a
            className="px-4 py-2 rounded border"
            href={sampleDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            Download sample
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c} className="card">
            <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
              {c}
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Carefully curated digital resources. Pay once, access securely.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

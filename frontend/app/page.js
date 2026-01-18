import Link from 'next/link';

const categories = ['Programming', 'DSA', 'ML', 'DS', 'DAA', 'Others'];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">StudyCrate – Digital study kits for hustling students</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Secure PDFs, code packs, and notes.
        </p>
        <div className="flex justify-center gap-3">
          <Link className="btn-primary" href="/products">
            Browse products
          </Link>
          <Link className="px-4 py-2 rounded border border-slate-300" href="/login">
            Login
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c} className="card">
            <h3 className="font-semibold text-lg">{c}</h3>
            <p className="text-sm text-slate-600">Carefully curated digital resources. Pay once, access securely.</p>
          </div>
        ))}
      </section>
    </div>
  );
}

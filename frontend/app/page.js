import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Programming',
    icon: '💻',
    description:
      'Python and C learning paths that take you from first lines of code to building real-world, interview-ready projects.'
  },
  {
    name: 'Data analysis',
    icon: '📊',
    description:
      'Hands-on EDA notebooks and checklists that show you how to clean, visualize, and interpret real-world datasets.'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-3">
        <div className="flex flex-col items-center gap-3">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/80 shadow-sm overflow-hidden">
            <Image
              src="/studycrate-logo.png"
              alt="StudyCrate alpha logo"
              fill
              className="object-contain"
              sizes="80px"
              priority
            />
          </div>
          <div className="space-y-1">
            <h1
              className="text-3xl md:text-4xl font-semibold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              StudyCrate
            </h1>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--color-text-muted)' }}>
              alpha
            </p>
          </div>
        </div>
        <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          Curated digital study kits for Python, C, and exploratory data analysis.
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
          <Link
            className="px-4 py-2 rounded border"
            href="/download/sample"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            Download sample
          </Link>
          <Link
            className="px-4 py-2 rounded border"
            href="/download/sample-notebook"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            Download sample notebook
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8" aria-label="Product categories">
        {categories.map((category, index) => (
          <div
            key={category.name}
            className={`card flex flex-col items-center text-center gap-2 ${index === 1 ? 'md:col-start-3' : ''}`}
          >
            <span
              className="text-4xl mb-1"
              role="img"
              aria-label={category.name + ' icon'}
            >
              {category.icon}
            </span>
            <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
              {category.name}
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {category.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

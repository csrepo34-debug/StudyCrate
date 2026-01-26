import Link from 'next/link';
import Image from 'next/image';

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

      <section className="card space-y-3 max-w-3xl mx-auto text-left">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          A focused digital shelf for self-learners
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          StudyCrate is a small, carefully curated store for students and working
          professionals who want to learn by doing. Instead of endless theory, each kit
          gives you practical notes, solved examples, and ready-to-run projects so you
          can move from &quot;I&apos;ve watched a course&quot; to &quot;I can actually build this&quot;.
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Start with programming language kits to build a strong base in Python or C,
          then explore data analysis through hands-on EDA workflows. Buy once, download
          instantly, and revisit the material whenever you need a quick refresher.
        </p>
      </section>
    </div>
  );
}

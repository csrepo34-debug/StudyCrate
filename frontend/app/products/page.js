export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1
          className="text-2xl font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          StudyCrate products
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Choose where you want to go deeper first: build a strong foundation in
          programming languages, or learn how to explore and explain real datasets with
          data analysis.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <article className="card flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Programming languages
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Step-by-step Python and C kits that move from absolute basics to
              intermediate projects—ideal if you&apos;re starting out or tightening your
              fundamentals.
            </p>
          </div>
          <div className="mt-4">
            <a className="btn-primary" href="/products/programming-languages">
              View language kits
            </a>
          </div>
        </article>

        <article className="card flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Data analysis
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Exploratory Data Analysis (EDA) kits focused on cleaning, visualising, and
              interpreting data so you can tell clear stories with numbers.
            </p>
          </div>
          <div className="mt-4">
            <a className="btn-primary" href="/products/data-analysis">
              View analysis kits
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

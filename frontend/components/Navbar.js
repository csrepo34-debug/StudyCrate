import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl" style={{ color: 'var(--color-text-primary)' }}>
          StudyCrate
        </Link>
        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <nav className="flex items-center gap-4">
            <Link href="/products">Products</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

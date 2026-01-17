import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-brand">StudyCrate</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/products">Products</Link>
          <Link href="/(legal)/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

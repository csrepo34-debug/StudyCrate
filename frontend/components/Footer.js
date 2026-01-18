import Link from 'next/link';

const links = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/refund', label: 'Refund & Cancellation' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' }
];

export default function Footer() {
  return (
    <footer className="border-t mt-10" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
      <div
        className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-3 text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <div className="flex flex-wrap gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:underline"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p>© {new Date().getFullYear()} StudyCrate. Personal-use license only. No redistribution.</p>
      </div>
    </footer>
  );
}

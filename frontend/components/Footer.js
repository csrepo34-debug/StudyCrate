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
    <footer className="border-t border-slate-200 bg-white mt-10">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-3 text-sm text-slate-600">
        <div className="flex flex-wrap gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand">
              {l.label}
            </Link>
          ))}
        </div>
        <p>© {new Date().getFullYear()} StudyCrate. Personal-use license only. No redistribution.</p>
      </div>
    </footer>
  );
}

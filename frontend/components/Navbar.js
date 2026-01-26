"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { me, logout, getToken } from '../lib/auth';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!getToken()) return;
        const current = await me();
        if (current) setUser(current);
      } catch {
        // If the token is invalid, keep showing logged-out state
        setUser(null);
      }
    };
    loadUser();
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  const mainLinks = [
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/80 shadow-sm overflow-hidden">
            <Image
              src="/studycrate-logo.png"
              alt="StudyCrate logo"
              fill
              className="object-contain"
              sizes="36px"
              priority
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className="font-semibold text-lg tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              StudyCrate
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
              alpha
            </span>
          </span>
        </Link>
        <nav
          className="flex items-center gap-4 text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="Primary"
        >
          <div
            className="hidden sm:flex items-center gap-1 rounded-full bg-white/60 px-1 py-0.5 shadow-sm relative min-h-[38px]"
            style={{ position: 'relative' }}
          >
            {/* Animated active indicator, perfectly aligned */}
            {mainLinks.some(l => pathname.startsWith(l.href)) && (
              <div
                className="absolute z-0 transition-all duration-300"
                style={{
                  top: 4,
                  left: mainLinks.reduce((acc, l, idx) => {
                    if (idx < mainLinks.findIndex(l2 => pathname.startsWith(l2.href))) {
                      // Each link's width: 0.5rem (px-3) left + text + 0.5rem right + gap-1 (0.25rem)
                      // Approximate: 24px padding + 8px gap + 8px per char
                      return acc + 24 + (l.label.length * 8) + 4;
                    }
                    return acc;
                  }, 8),
                  height: 36,
                  borderRadius: 9999,
                  background: 'var(--color-accent)',
                  width: 24 + (mainLinks[mainLinks.findIndex(l => pathname.startsWith(l.href))].label.length * 8),
                }}
                aria-hidden="true"
              />
            )}
            {mainLinks.map((link, i) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative z-10 px-6 py-2 rounded-full font-medium transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'hover:bg-[var(--color-accent)]/10'
                  }`}
                  tabIndex={0}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/purchases">My Purchases</Link>
                <Link href="/account">My Account</Link>
                <button onClick={handleLogout} className="underline text-xs sm:text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

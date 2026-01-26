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
          <div className="hidden sm:flex items-center gap-1 rounded-full bg-white/60 px-1 py-0.5 shadow-sm relative min-h-[38px]">
            {/* Animated active indicator */}
            {mainLinks.some(l => pathname.startsWith(l.href)) && (
              <div
                className="absolute top-1 left-0 h-7 w-20 rounded-full bg-[var(--color-accent)] z-0 transition-all duration-300"
                style={{
                  transform: `translateX(${mainLinks.findIndex(l => pathname.startsWith(l.href)) * 88}px)`
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
                  className={`relative z-10 px-3 py-1 rounded-full transition-colors ${
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

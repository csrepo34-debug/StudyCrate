"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { me, logout, getToken } from '../lib/auth';

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

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl" style={{ color: 'var(--color-text-primary)' }}>
          StudyCrate
        </Link>
        <nav className="flex items-center gap-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
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
        </nav>
      </div>
    </header>
  );
}

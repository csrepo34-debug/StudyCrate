"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const extractEmail = (token) => {
  if (!token) return '';
  try {
    const payload = token.split('.')[1];
    if (!payload) return '';
    const decoded = JSON.parse(atob(payload));
    return decoded?.email || '';
  } catch (err) {
    return '';
  }
};

export default function Navbar() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const sync = () => {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      setUserEmail(extractEmail(token));
    };

    sync();
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const logout = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
    setUserEmail('');
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
          {!userEmail ? (
            <Link href="/login">Login</Link>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm" title={userEmail}>
                Signed in as {userEmail}
              </span>
              <button
                type="button"
                className="px-2 py-1 border rounded"
                style={{ borderColor: 'var(--color-border)' }}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

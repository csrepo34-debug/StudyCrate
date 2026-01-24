"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { me, getToken } from '../../lib/auth';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        if (!getToken()) {
          router.replace('/login?next=/account');
          return;
        }
        const current = await me();
        if (!current) {
          router.replace('/login?next=/account');
          return;
        }
        setUser(current);
      } catch (err) {
        setError('Unable to load account details');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  if (loading) {
    return <div className="max-w-md mx-auto card">Loading account...</div>;
  }

  if (error) {
    return <div className="max-w-md mx-auto card text-red-600 text-sm">{error}</div>;
  }

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-xl font-semibold">My Account</h1>
      <div className="space-y-2 text-sm">
        <p><span className="font-medium">Name:</span> {user.name || '—'}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        {user.role && <p><span className="font-medium">Role:</span> {user.role}</p>}
      </div>
      <p className="text-xs text-slate-500">These details come from your StudyCrate account.</p>
    </div>
  );
}

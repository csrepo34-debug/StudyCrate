"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '../../../lib/auth';

export const metadata = { title: 'Login' };

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      const next = searchParams.get('next') || '/products';
      router.push(next);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid email or password';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-xl font-semibold">Login</h1>
      <p className="text-sm text-slate-600">
        Log in to buy products, access your purchases, and unlock exclusive content.
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          className="w-full border px-3 py-2 rounded text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          className="w-full border px-3 py-2 rounded text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-primary w-full text-sm" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <p className="text-xs text-slate-500 text-center">
        New here? <a href="/register" className="underline">Create an account</a>
      </p>
    </div>
  );
}

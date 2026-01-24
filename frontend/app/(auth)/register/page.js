"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { register } from '../../../lib/auth';

export const metadata = { title: 'Register' };

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await register(name, email, password);
      const next = searchParams.get('next') || '/products';
      router.push(next);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Unable to register with those details';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-xl font-semibold">Create an account</h1>
      <p className="text-sm text-slate-600">
        Create a StudyCrate account to buy products and unlock extra content.
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border px-3 py-2 rounded text-sm"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full border px-3 py-2 rounded text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border px-3 py-2 rounded text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary w-full text-sm" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <p className="text-xs text-slate-500 text-center">
        Already have an account? <a href="/login" className="underline">Log in</a>
      </p>
    </div>
  );
}

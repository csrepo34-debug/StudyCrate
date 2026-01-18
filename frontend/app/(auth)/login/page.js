"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post('/api/login', { email, password });
      localStorage.setItem('token', data.token);
      router.push('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-xl font-semibold">Login to continue</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        You must be logged in to complete a purchase. Explore all pages freely,
        then sign in when you&apos;re ready to buy.
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border px-3 py-2 rounded text-sm"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full border px-3 py-2 rounded text-sm"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Login'}
        </button>
      </form>
    </div>
  );
}

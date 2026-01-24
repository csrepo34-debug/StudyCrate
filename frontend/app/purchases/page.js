"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { getToken } from '../../lib/auth';

export default function PurchasesPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        if (!getToken()) {
          router.replace('/login?next=/purchases');
          return;
        }
        const { data } = await api.get('/api/my-orders');
        setOrders(data?.orders || []);
      } catch (err) {
        if (err?.response?.status === 401) {
          router.replace('/login?next=/purchases');
          return;
        }
        setError('Unable to load your purchases right now');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  if (loading) {
    return <div className="max-w-2xl mx-auto card">Loading your purchases...</div>;
  }

  if (error) {
    return <div className="max-w-2xl mx-auto card text-red-600 text-sm">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto card space-y-4">
      <h1 className="text-xl font-semibold">My Purchases</h1>
      {orders.length === 0 ? (
        <p className="text-sm text-slate-600">You haven&apos;t bought any products yet.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {orders.map((order) => (
            <li key={order.id} className="border border-slate-200 rounded p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{order.productTitle}</p>
                <p className="text-xs text-slate-500">
                  Ordered on {order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{order.amount}</p>
                <p className="text-xs text-slate-500 capitalize">{order.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-slate-500">
        These are the products you&apos;ve purchased with this account.
      </p>
    </div>
  );
}

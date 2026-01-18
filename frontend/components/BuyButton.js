"use client";
import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function BuyButton({ productId, price, title }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const startPayment = async () => {
    if (!email || !name) {
      alert('Please enter your name and email');
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post('/api/checkout', { productId, amount: price, productTitle: title });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'StudyCrate',
        description: title,
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await api.post('/api/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customer_email: email,
              customer_name: name
            });
            alert(`Payment successful! Download link sent to ${email}`);
            setShowForm(false);
            setEmail('');
            setName('');
          } catch (err) {
            alert('Payment verified but email failed. Please contact support.');
          }
        },
        prefill: { email, name },
        notes: { productId }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || 'Unable to start payment');
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button className="btn-primary" onClick={() => setShowForm(true)}>
        Buy now for ₹{price}
      </button>
    );
  }

  return (
    <div className="border border-slate-300 rounded p-4 space-y-3 bg-slate-50">
      <p className="text-sm font-semibold">Enter your details for receipt</p>
      <input
        className="w-full border px-3 py-2 rounded text-sm"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full border px-3 py-2 rounded text-sm"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="btn-primary flex-1 text-sm" onClick={startPayment} disabled={loading}>
          {loading ? 'Processing...' : 'Proceed to payment'}
        </button>
        <button className="border border-slate-300 px-3 py-2 rounded text-sm" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

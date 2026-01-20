"use client";
import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function BuyButton({ productId, price, title }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

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
      setError('');
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
            setVerifying(true);
            setError('');
            const verifyRes = await api.post('/api/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customer_email: email,
              customer_name: name
            });
            const token = verifyRes.data?.token;
            if (!token) throw new Error('Missing download token');
            const directUrl =
              verifyRes.data?.downloadLink || `${api.defaults.baseURL}/api/download/${token}`;
            setDownloadInfo({
              url: directUrl,
              productId,
              title
            });
            setShowForm(false);
            setEmail('');
            setName('');
          } catch (err) {
            const backendMsg = err?.response?.data?.message || err?.message;
            const fallback = 'Payment succeeded but we couldn\'t verify it. Please contact support with your payment id.';
            const message = backendMsg || fallback;
            const paymentId = response?.razorpay_payment_id;
            setError(paymentId ? `${message} (Payment ID: ${paymentId})` : message);
          }
          setVerifying(false);
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

  return (
    <div className="space-y-4">
      {verifying && !downloadInfo && (
        <div className="border border-sky-200 bg-sky-50 rounded p-4 space-y-1">
          <p className="text-sm font-medium text-sky-800">Verifying payment this may take a few seconds.</p>
          <p className="text-xs text-sky-800">Check your email for the download link.</p>
        </div>
      )}

      {error && (
        <div className="border border-red-200 bg-red-50 rounded p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {downloadInfo && (
        <div className="border border-emerald-200 bg-emerald-50 rounded p-4 space-y-2">
          <p className="text-sm font-semibold text-emerald-800">
            Payment successful! Your download for {downloadInfo.title} is ready.
          </p>
          <a
            className="btn-primary inline-flex items-center justify-center"
            href={downloadInfo.url}
            target="_blank"
            rel="noreferrer"
          >
            Download file
          </a>
          <p className="text-xs text-emerald-700">Link stays active for 7 days. Check your email for the link too.</p>
        </div>
      )}

      {!showForm ? (
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          Buy now for ₹{price}
        </button>
      ) : (
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
      )}
    </div>
  );
}

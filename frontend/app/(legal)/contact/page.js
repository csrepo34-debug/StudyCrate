"use client";

import { useState } from 'react';
import api from '../../../lib/api';

export const metadata = { title: 'Contact & Comments' };

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    try {
      setSubmitting(true);
      await api.post('/api/contact', { name, email, message });
      alert('Thank you for your comment! Your message has been sent.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Unable to send your message right now. Please try again later or email csrepo34@gmail.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Contact &amp; Comments</h1>
        <p>
          Have questions, feedback, or suggestions for StudyCrate? You can reach out using the form below or by email.
        </p>
        <p>
          <strong>Email:</strong> csrepo34@gmail.com (official StudyCrate inbox)
        </p>
        <p className="text-sm text-gray-600">
          For order issues, please include your Razorpay order ID and the email address used during checkout.
        </p>
      </div>

      <form className="space-y-4 border rounded-md p-4 bg-white/5" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">Leave a Comment or Question</h2>
        <p className="text-sm text-gray-600">
          This form collects your name, email, and message so that we can respond to your query. By submitting, you
          agree to the Terms, Privacy Policy, and Ethical Use Policy.
        </p>

        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm bg-white text-gray-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm bg-white text-gray-900"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="message">
            Comment or Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm bg-white text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Submit Comment'}
        </button>

        <p className="text-xs text-gray-500">
          Note: Your comment will be emailed to the StudyCrate inbox. For urgent issues, you can also write directly to
          csrepo34@gmail.com.
        </p>
      </form>
    </div>
  );
}

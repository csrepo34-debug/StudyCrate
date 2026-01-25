'use client';
import { useState } from 'react';
import { PRODUCTS } from '../../../lib/products';
import BuyButton from '../../../components/BuyButton';

export default function ProductDetail({ params }) {
  const product = PRODUCTS.find((p) => p._id === params.id);
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p
          className="text-sm uppercase"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {product.category}
        </p>
        <h1
          className="text-3xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {product.title}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {product.description}
        </p>
        <p className="text-2xl font-semibold text-brand-accent">₹{product.price}</p>
        <BuyButton
          productId={product._id}
          price={product.price}
          title={product.title}
        />
      </div>

      <section className="border rounded-md p-4 space-y-2" style={{ borderColor: 'var(--color-border)' }}>
        <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          DOWNLOAD
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Once your payment is completed, your download link will appear on the thank-you page and a copy will be sent to your email address.
        </p>
        <ul className="list-disc pl-5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <li>
            Sometimes download emails may be delayed, sent to spam, or blocked by your email provider.
          </li>
          <li>
            If you do not see the email, please check your spam or promotions folder first. If it still has not arrived, contact us and we will resend the link.
          </li>
          <li>
            Thank you for purchasing from us and supporting our work.
          </li>
          <li>
            Have a great day and enjoy your new resources!
          </li>
        </ul>
      </section>
    </div>
  );
}

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
          Your download link will be available immediately after payment on the thank-you page, and a copy will also be sent to your email.
        </p>
        <ul className="list-disc pl-5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <li>
            Didn’t receive the email? Please check your spam or promotions folder first—sometimes emails take a little longer to arrive.
          </li>
          <li>
            Still no luck? Just contact us and we’ll resend your download link as soon as possible.
          </li>
          <li>
            Thanks for choosing us and supporting what we do.
          </li>
          <li>
            Happy learning and enjoy your purchase!
          </li>
        </ul>
      </section>
    </div>
  );
}

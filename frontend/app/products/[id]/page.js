'use client';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import BuyButton from '@/components/BuyButton';

export default function ProductDetail({ params }) {
  const product = PRODUCTS.find((p) => p._id === params.id);
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 uppercase">{product.category}</p>
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-slate-700">{product.description}</p>
      <p className="text-2xl font-semibold text-brand-accent">₹{product.price}</p>
      <BuyButton productId={product._id} price={product.price} title={product.title} />
    </div>
  );
}

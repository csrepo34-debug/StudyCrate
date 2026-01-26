"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const ref = useRef();
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) {
      ref.current.classList.remove('opacity-0');
      ref.current.classList.add('opacity-100');
    }
    return () => {
      if (ref.current) {
        ref.current.classList.remove('opacity-100');
        ref.current.classList.add('opacity-0');
      }
    };
  }, [pathname]);
  return (
    <div
      ref={ref}
      className="transition-opacity duration-300 opacity-0"
      style={{ minHeight: '100%' }}
    >
      {children}
    </div>
  );
}

import '../styles/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'StudyCrate | Programming & Data Analysis Kits',
  description:
    'Downloadable study kits for Python, C programming, and exploratory data analysis (EDA) with real-world examples.',
  openGraph: {
    title: 'StudyCrate | Programming & Data Analysis Kits',
    description: 'Downloadable study kits for Python, C programming, and exploratory data analysis (EDA) with real-world examples.',
    url: 'https://studycrate.com',
    siteName: 'StudyCrate',
    images: [
      {
        url: '/studycrate-logo.png',
        width: 400,
        height: 400,
        alt: 'StudyCrate logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'StudyCrate | Programming & Data Analysis Kits',
    description: 'Downloadable study kits for Python, C programming, and exploratory data analysis (EDA) with real-world examples.',
    images: ['/studycrate-logo.png'],
    site: '@studycrate',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  metadataBase: new URL('https://studycrate.com'),
};

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

function PageTransition({ children }) {
  const ref = useRef();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jetbrainsMono.variable} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

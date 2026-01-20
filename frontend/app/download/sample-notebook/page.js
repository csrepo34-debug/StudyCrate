"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';
const sampleNotebookUrl = `${apiBase}/api/sample-notebook`;

export default function SampleNotebookDownloadPage() {
  const [status, setStatus] = useState('starting');
  const [error, setError] = useState('');

  useEffect(() => {
    const start = async () => {
      try {
        setStatus('preparing');
        const res = await fetch(sampleNotebookUrl);
        if (!res.ok) throw new Error('Download failed');
        const blob = await res.blob();
        const disposition = res.headers.get('content-disposition') || '';
        let filename = 'StudyCrate-sample-notebook.ipynb';
        const match = disposition.match(/filename="?([^";]+)"?/i);
        if (match?.[1]) filename = match[1];
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setStatus('done');
      } catch (err) {
        console.error('Sample notebook download failed', err);
        setError('Unable to start download. Please try again in a moment.');
        setStatus('error');
      }
    };
    start();
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-3 text-center">
        <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Preparing your sample notebook
        </h1>
        {status !== 'error' && (
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            We are fetching your notebook from the server. This may take a few seconds on the first request.
          </p>
        )}
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          You can close this tab after the download starts.
        </p>
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 text-sm rounded border"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

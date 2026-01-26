"use client";
import { useRouter } from 'next/navigation';
export const metadata = { title: 'Contact' };

export default function ContactPage() {
  const router = useRouter();
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition mb-2"
        aria-label="Go back"
        style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
      >
        <span aria-hidden="true" style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center' }}>&larr;</span>
        Back
      </button>
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p>
        For any questions about StudyCrate products, collaborations, or support, please reach out directly via email.
      </p>
      <p>
        <strong>Email:</strong> csrepo34@gmail.com
      </p>
      <div className="flex flex-wrap items-center gap-4 mt-2">
        <a
          href="https://www.instagram.com/studycrate_alpha/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:opacity-80"
        >
          <img src="/instagram.png" alt="Instagram logo" width="32" height="32" style={{ borderRadius: '8px' }} />
        </a>
        <a
          href="https://www.linkedin.com/in/studycrate-alpha/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:opacity-80"
        >
          <img src="/linkedin.png" alt="LinkedIn logo" width="32" height="32" style={{ borderRadius: '8px' }} />
        </a>
        <a
          href="https://www.youtube.com/@StudyCrate-Alpha"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:opacity-80"
        >
          <img src="/youtube.png" alt="YouTube logo" width="32" height="32" style={{ borderRadius: '8px' }} />
        </a>
        <a
          href="https://x.com/CsRepo40935"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="hover:opacity-80"
        >
          <img src="/X%20twitter.png" alt="X (Twitter) logo" width="32" height="32" style={{ borderRadius: '8px' }} />
        </a>
      </div>
      <p className="text-sm text-gray-600">
        For order-related queries, include your Razorpay order ID, the email used during checkout, and the product
        name. You will receive your download link on the website after successful payment; email is only used for
        manual follow-ups.
      </p>
    </div>
  );
}

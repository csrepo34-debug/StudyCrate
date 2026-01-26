export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="space-y-4 max-w-xl">
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
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#E1306C"/><path d="M12 8.4A3.6 3.6 0 1 0 12 15.6 3.6 3.6 0 0 0 12 8.4Zm0 5.9A2.3 2.3 0 1 1 12 9.7a2.3 2.3 0 0 1 0 4.6Zm4.5-6.1a.84.84 0 1 1-1.68 0 .84.84 0 0 1 1.68 0ZM17.6 7.2a4.4 4.4 0 0 0-1.2-1.2A5.6 5.6 0 0 0 12 5.6a5.6 5.6 0 0 0-4.4 1.2 4.4 4.4 0 0 0-1.2 1.2A5.6 5.6 0 0 0 5.6 12a5.6 5.6 0 0 0 1.2 4.4 4.4 4.4 0 0 0 1.2 1.2A5.6 5.6 0 0 0 12 18.4a5.6 5.6 0 0 0 4.4-1.2 4.4 4.4 0 0 0 1.2-1.2A5.6 5.6 0 0 0 18.4 12a5.6 5.6 0 0 0-1.2-4.4Zm-1.1 7.7a3.9 3.9 0 0 1-2.2 2.2c-.6.2-1.2.3-2.3.3s-1.7-.1-2.3-.3a3.9 3.9 0 0 1-2.2-2.2c-.2-.6-.3-1.2-.3-2.3s.1-1.7.3-2.3a3.9 3.9 0 0 1 2.2-2.2c.6-.2 1.2-.3 2.3-.3s1.7.1 2.3.3a3.9 3.9 0 0 1 2.2 2.2c.2.6.3 1.2.3 2.3s-.1 1.7-.3 2.3Z" fill="#fff"/></svg>
        </a>
        <a
          href="https://www.linkedin.com/in/studycrate-alpha/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:opacity-80"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#0077B5"/><path d="M8.1 17.1H5.7V9.6h2.4v7.5ZM6.9 8.5a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Zm10.2 8.6h-2.4v-3.6c0-.9-.3-1.5-1.1-1.5-.6 0-.9.4-1.1.8-.1.2-.1.5-.1.8v3.5h-2.4s.1-5.7 0-7.5h2.4v1.1c.3-.5.9-1.3 2.2-1.3 1.6 0 2.8 1 2.8 3.2v4.5Z" fill="#fff"/></svg>
        </a>
        <a
          href="https://www.youtube.com/@StudyCrate-Alpha"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:opacity-80"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#FF0000"/><path d="M16.8 10.2c-.1-.5-.5-.9-1-.9-1.1-.1-2.3-.1-3.4-.1s-2.3 0-3.4.1c-.5 0-.9.4-1 .9-.1.7-.2 1.5-.2 2.3s.1 1.6.2 2.3c.1.5.5.9 1 .9 1.1.1 2.3.1 3.4.1s2.3 0 3.4-.1c.5 0 .9-.4 1-.9.1-.7.2-1.5.2-2.3s-.1-1.6-.2-2.3Zm-6.1 3.2v-2.8l2.6 1.4-2.6 1.4Z" fill="#fff"/></svg>
        </a>
        <a
          href="https://x.com/CsRepo40935"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="hover:opacity-80"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#000"/><path d="M16.7 7.2h-1.6l-2.1 2.7-2.1-2.7H7.3l2.9 3.7-3.1 4.1h1.6l2.3-3 2.3 3h1.6l-3.1-4.1 2.9-3.7Z" fill="#fff"/></svg>
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

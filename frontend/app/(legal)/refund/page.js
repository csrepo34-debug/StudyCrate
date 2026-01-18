export const metadata = { title: 'Refund & Cancellation' };

export default function RefundPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">1. Refund & Cancellation</h1>
      <p>At StudyCrate, we offer digital educational content delivered electronically. Please read this policy carefully before making a purchase.</p>
      
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.1 Nature of Products</h2>
        <p>All products available on StudyCrate are digital goods, including but not limited to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Downloadable files (PDF, DOCX, Markdown)</li>
          <li>Source code files (C, C++, Python, Java, notebooks, etc.)</li>
          <li>Project materials and documentation</li>
        </ul>
        <p>Once purchased, these files are delivered via direct download and/or email.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.2 No Cancellation After Purchase</h2>
        <p>Due to the digital nature of the products:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><b>Orders cannot be cancelled once the payment is successfully completed</b></li>
          <li>Access to purchased content is granted immediately after payment</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.3 No Refund After Download</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><b>No refunds are provided once a file has been downloaded</b></li>
          <li>This policy exists to prevent unauthorized copying or misuse of digital content</li>
        </ul>
        <p>By completing a purchase, you acknowledge and agree to this condition.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.4 Refund Eligibility (Exceptional Cases Only)</h2>
        <p>Refunds are only considered under the following circumstances:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>The delivered file is corrupted</li>
          <li>The delivered file is inaccessible or cannot be opened using standard software</li>
          <li>The issue persists even after reasonable support assistance</li>
        </ul>
        <p>To request a refund in such cases, users must contact support with:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Order ID</li>
          <li>Registered email address</li>
          <li>Description of the issue (screenshots may be requested)</li>
        </ul>
        <p>Refund requests must be raised within 7 days of purchase.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.5 Resolution Before Refund</h2>
        <p>Before issuing a refund, StudyCrate may:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Re-send the file</li>
          <li>Provide an alternative download link</li>
          <li>Correct delivery issues</li>
        </ul>
        <p>If the issue is resolved through these means, no refund will be issued.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.6 Payment Processing</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>All payments are securely processed via Razorpay</li>
          <li>StudyCrate does not store card details, UPI IDs, or bank information</li>
          <li>Payment handling is subject to Razorpay’s own terms and policies</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.7 Processing of Approved Refunds</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Approved refunds will be processed to the original payment method</li>
          <li>Refund timelines depend on Razorpay and the user’s bank/payment provider</li>
          <li>StudyCrate is not responsible for delays caused by third-party payment systems</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.8 Policy Updates</h2>
        <p>StudyCrate reserves the right to update or modify this policy at any time.</p>
        <p>Changes will be effective immediately upon posting on the website.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.9 Contact</h2>
        <p>For refund-related queries, contact:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Email: (official StudyCrate support email)</li>
        </ul>
      </section>

      <p className="text-sm text-gray-600">Last Updated: 2026</p>
    </div>
  );
}

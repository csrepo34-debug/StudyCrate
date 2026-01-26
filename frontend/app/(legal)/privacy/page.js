export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <a
        href="#"
        onClick={e => { e.preventDefault(); window.history.back(); }}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition mb-2"
        aria-label="Go back"
        style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-border)' }}
      >
        <span aria-hidden="true" style={{ fontSize: '1.1em', display: 'flex', alignItems: 'center' }}>&larr;</span>
        Back
      </a>
      <h1 className="text-2xl font-semibold">1. Privacy Policy</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.1 Information Collected</h2>
        <p>StudyCrate may collect the following information:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Name</li>
          <li>Email address</li>
          <li>Contact form or feedback form data</li>
          <li>Payment-related metadata processed via third-party payment providers</li>
          <li>Basic analytics and usage data</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.2 Use of Information</h2>
        <p>Collected data is used to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Deliver purchased files and digital products</li>
          <li>Respond to inquiries and support requests</li>
          <li>Improve content, services, and user experience</li>
          <li>Communicate updates or new offerings (if you have opted in)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.3 Data Sharing</h2>
        <p>
          StudyCrate does not sell personal data. Data may be shared only with trusted third parties such as payment
          processors, email delivery services, and analytics providers, solely for the purpose of operating the
          platform. All third parties are required to maintain confidentiality.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.4 Data Security</h2>
        <p>
          Reasonable technical and organizational measures are used to protect user data. However, no system is 100%
          secure, and absolute security cannot be guaranteed.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1.5 User Rights</h2>
        <p>Users may request:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access to their personal data held by StudyCrate</li>
          <li>Correction of inaccurate data</li>
          <li>Deletion of personal data, subject to legal and operational requirements</li>
        </ul>
        <p>Requests can be made via the official contact email listed on the Contact page.</p>
      </section>

      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Last Updated: 2026
      </p>
    </div>
  );
}

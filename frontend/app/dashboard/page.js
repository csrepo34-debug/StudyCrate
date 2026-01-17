'use client';

export default function DashboardPage() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-semibold">Success!</h1>
      <p className="text-slate-600">Your download link has been sent to your email.</p>
      <p className="text-sm text-slate-500">Link valid for 7 days. Check spam if not found.</p>
      <a href="/" className="btn-primary inline-block">
        Back to home
      </a>
    </div>
  );
}

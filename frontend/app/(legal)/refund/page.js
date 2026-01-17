export const metadata = { title: 'Refund & Cancellation' };

export default function RefundPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Refund & Cancellation</h1>
      <p>No refunds are provided after a file has been downloaded.</p>
      <p>Refunds are only considered if the delivered file is corrupted or inaccessible; contact support with order details.</p>
      <p>Payments are handled by Razorpay; no card, UPI, or bank data is stored on this site.</p>
    </div>
  );
}

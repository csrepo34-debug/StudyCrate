export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>
      <p>We collect only necessary information (email, login data, and purchase records) to deliver your digital files.</p>
      <p>No payment details are stored; Razorpay handles payment processing and KYC.</p>
      <p>Data is used solely to provide access, receipts, and support. You may request deletion of your account data.</p>
    </div>
  );
}

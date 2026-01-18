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
      <p className="text-sm text-gray-600">
        For order-related queries, include your Razorpay order ID, the email used during checkout, and the product
        name. You will receive your download link on the website after successful payment; email is only used for
        manual follow-ups.
      </p>
    </div>
  );
}

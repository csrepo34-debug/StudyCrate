import ContactForm from '../../../components/ContactForm';

export const metadata = { title: 'Contact & Comments' };

export default function ContactPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Contact &amp; Comments</h1>
        <p>
          Have questions, feedback, or suggestions for StudyCrate? You can reach out using the form below or by email.
        </p>
        <p>
          <strong>Email:</strong> csrepo34@gmail.com (official StudyCrate inbox)
        </p>
        <p className="text-sm text-gray-600">
          For order issues, please include your Razorpay order ID and the email address used during checkout.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}

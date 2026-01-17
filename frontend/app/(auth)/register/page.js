export const metadata = { title: 'Register' };

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-xl font-semibold">No registration needed</h1>
      <p>
        StudyCrate works without user accounts. You just choose a product and
        pay with Razorpay; we only ask for your name and email during payment.
      </p>
      <p>
        This keeps things simple and protects your privacy.
      </p>
      <a href="/products" className="btn-primary inline-block w-full text-center">
        Browse products
      </a>
    </div>
  );
}

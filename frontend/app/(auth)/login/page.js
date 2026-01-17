export const metadata = { title: 'Login' };

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h1 className="text-xl font-semibold">Login not required</h1>
      <p>
        You don&apos;t need an account to buy notes. Just pick a product on the
        Products page and pay directly as a guest.
      </p>
      <p>
        After successful payment you&apos;ll get a download link on the screen
        and by email.
      </p>
      <a href="/products" className="btn-primary inline-block w-full text-center">
        View products
      </a>
    </div>
  );
}

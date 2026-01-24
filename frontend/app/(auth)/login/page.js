import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata = { title: 'Login' };

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto card">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

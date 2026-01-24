import { Suspense } from 'react';
import RegisterForm from './RegisterForm';

export const metadata = { title: 'Register' };

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto card">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}

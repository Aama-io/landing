import { Footer } from '@/components/Footer/Footer';
import { AuthHeader } from './AuthHeader/AuthHeader';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
        {children}
      <Footer />
    </>
  );
}
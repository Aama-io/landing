import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}
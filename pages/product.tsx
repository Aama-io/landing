import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Problems } from '../components/Problems/Problems';
import { Product } from '../components/Product/Product';
import { Footer } from '../components/Footer/Footer';
import { SEO } from '@/components/SEO/SEO';

export default function ProductPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <SEO 
        title="Fund Management Platform | AAMA"
        description="Our comprehensive fund-as-a-service platform enables asset managers to launch and operate mutual funds, REITs, VC/PE funds, and tokenized funds with full compliance."
        keywords="fund management platform, mutual funds, private capital, REITs, tokenized funds, fund operations, investor services"
      />
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Product />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
} 
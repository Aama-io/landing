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
        title="Aama.io | Fund Management and Administration Platform"
        description="AAMA.io is a comprehensive fund management and administration platform that provides a complete suite of services for investors, fund managers, and fund administrators. Launch and manage mutual funds, VC/PE funds, REITs, and tokenized funds with ease."
        keywords="fund management platform, fund administration, investment management, investor portal, mutual funds, private capital, REITs, tokenized funds, blockchain finance, fund-as-a-service"
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
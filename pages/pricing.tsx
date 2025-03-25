import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { PricingHero } from '../components/PricingHero/PricingHero';
import { PricingTables } from '../components/PricingTables/PricingTables';
import { PricingFAQ } from '../components/PricingFAQ/PricingFAQ';
import { PricingSection } from '../components/PricingSection/PricingSection';
import { Footer } from '../components/Footer/Footer';
import { SEO } from '@/components/SEO/SEO';

export default function PricingPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <SEO 
        title="Pricing | AAMA"
        description="Transparent pricing plans for AAMA's fund management platform. Choose from Professional, Professional Plus, or Enterprise plans to suit your asset management needs."
        keywords="fund management pricing, asset management cost, mutual fund platform, fund administration fees, pricing plans, AUM pricing"
      />
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <PricingHero />
        <PricingTables />
        <PricingFAQ />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
} 
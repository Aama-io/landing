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
        description="AAMA.io offers institutional-grade fund management software at startup-friendly pricing with plans for funds of all sizes. Choose from Starter, Growth, or Pro plans with no hidden fees."
        keywords="fund management pricing, SaaS pricing, fund platform costs, startup-friendly pricing, Singapore fund management, AUM-based pricing"
      />
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <PricingHero />
        <PricingTables />
        <PricingSection />
        <PricingFAQ />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
} 
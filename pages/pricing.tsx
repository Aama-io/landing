import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { PricingHero } from '../components/PricingHero/PricingHero';
import { PricingTables } from '../components/PricingTables/PricingTables';
import { PricingFAQ } from '../components/PricingFAQ/PricingFAQ';
import { PricingSection } from '../components/PricingSection/PricingSection';
import { Footer } from '../components/Footer/Footer';

export default function PricingPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
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
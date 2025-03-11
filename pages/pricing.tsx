import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { PricingSection } from '../components/PricingSection/PricingSection';
import { Footer } from '../components/Footer/Footer';

export default function PricingPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <PricingSection />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
} 
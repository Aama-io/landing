import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { ContactSection } from '../components/ContactSection/ContactSection';
import { Footer } from '../components/Footer/Footer';

export default function ContactPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <ContactSection />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
} 
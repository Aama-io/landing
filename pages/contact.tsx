import { AppShell, Container } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { ContactHero } from '../components/ContactHero/ContactHero';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { Footer } from '../components/Footer/Footer';
import { SEO } from '@/components/SEO/SEO';

export default function ContactPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <SEO 
        title="Contact Us | AAMA"
        description="Get in touch with AAMA for fund management solutions, technical support, or partnership inquiries. We're here to help you succeed."
      />
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <ContactHero />
        <ContactForm />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
} 
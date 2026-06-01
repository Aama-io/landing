import { PageShell } from '@/components/ui/PageShell';
import { ContactHero } from '../components/ContactHero/ContactHero';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { SEO } from '@/components/SEO/SEO';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us | aama.io"
        description="Get in touch with aama.io for fund management solutions, technical support, or partnership inquiries. We're here to help you succeed."
      />
      <PageShell>
        <ContactHero />
        <ContactForm />
      </PageShell>
    </>
  );
}

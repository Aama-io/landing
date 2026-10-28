import { PageShell } from '@/components/ui/PageShell';
import { ContactHero } from '../components/ContactHero/ContactHero';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { SEO } from '@/components/SEO/SEO';
import { PageSchema } from '@/components/SEO/PageSchema';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us | aama.io"
        description="Get in touch with aama.io for fund management solutions, technical support, or partnership inquiries. We're here to help you succeed."
      />
      <PageSchema type="ContactPage" name="Contact aama.io" description="Contact aama.io about fund administration software, support or partnerships." path="/contact" />
      <PageShell>
        <ContactHero />
        <ContactForm />
      </PageShell>
    </>
  );
}

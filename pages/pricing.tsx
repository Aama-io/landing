import { PageShell } from '@/components/ui/PageShell';
import { PricingHero } from '../components/PricingHero/PricingHero';
import { PricingTables } from '../components/PricingTables/PricingTables';
import { PricingFAQ } from '../components/PricingFAQ/PricingFAQ';
import { PricingSection } from '../components/PricingSection/PricingSection';
import { SEO } from '@/components/SEO/SEO';

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing | aama.io"
        description="Institutional-grade fund management software at startup-friendly pricing, with plans for funds of all sizes and no hidden fees."
        keywords="fund management pricing, SaaS pricing, fund software costs, startup-friendly pricing, Singapore fund management, AUM-based pricing"
      />
      <PageShell>
        <PricingHero />
        <PricingTables />
        <PricingSection />
        <PricingFAQ />
      </PageShell>
    </>
  );
}

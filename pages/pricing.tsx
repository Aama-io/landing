import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { PricingHero } from '../components/PricingHero/PricingHero';
import { PricingTables } from '../components/PricingTables/PricingTables';
import { PricingFAQ } from '../components/PricingFAQ/PricingFAQ';
import { PricingSection } from '../components/PricingSection/PricingSection';
import { SEO } from '@/components/SEO/SEO';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'aama.io',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Fund management, administration and accounting software for VC/PE firms, family offices and fund administrators.',
  url: 'https://aama.io/pricing',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '625',
    highPrice: '5000',
    offerCount: '12',
    url: 'https://aama.io/pricing',
  },
  provider: {
    '@type': 'Organization',
    name: 'aama.io',
    url: 'https://aama.io',
  },
};

const breadcrumbData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aama.io' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://aama.io/pricing' },
  ],
};

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing | aama.io"
        description="Institutional-grade fund management software at startup-friendly pricing, with plans for funds of all sizes and no hidden fees."
        keywords="fund management pricing, SaaS pricing, fund software costs, startup-friendly pricing, Singapore fund management, AUM-based pricing"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
      </Head>
      <PageShell>
        <PricingHero />
        <PricingTables />
        <PricingSection />
        <PricingFAQ />
      </PageShell>
    </>
  );
}

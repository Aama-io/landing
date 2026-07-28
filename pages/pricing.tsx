import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { PricingHero } from '../components/PricingHero/PricingHero';
import { PricingTables } from '../components/PricingTables/PricingTables';
import { PricingFAQ, faqData } from '../components/PricingFAQ/PricingFAQ';
import { PricingSection } from '../components/PricingSection/PricingSection';
import { SEO } from '@/components/SEO/SEO';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'aama.io',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Fund administration and accounting software for SPVs and syndicates, VC/PE and private credit funds, family offices, and fund administrators across Singapore and APAC.',
  url: 'https://aama.io/pricing',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '625',
    highPrice: '6500',
    offerCount: '21',
    url: 'https://aama.io/pricing',
  },
  provider: {
    '@type': 'Organization',
    name: 'aama.io',
    url: 'https://aama.io',
  },
};

// Built from the visible pricing FAQ so the structured data always matches the page.
const faqPageData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
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
        title="Pricing — SPV, Fund Administration & Accounting Software | aama.io"
        description="Transparent pricing: per-deal SPVs from USD 4,900, accounting-only plans for fund administrators from USD 1,500/month, and fund-manager subscriptions from USD 625/month. Singapore & APAC, no hidden fees."
        keywords="SPV pricing Singapore, fund administration software pricing, fund accounting software pricing, SPV cost, syndicate SPV fees, fund admin software cost, private credit fund administration pricing, transparent fund software pricing"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageData) }}
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

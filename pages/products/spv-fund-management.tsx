import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { SpvFundManagement, SPV_FAQS } from '@/components/SpvFundManagement/SpvFundManagement';

const SITE = 'https://aama.io';
const URL = `${SITE}/products/spv-fund-management`;
const DESCRIPTION =
  'End-to-end SPV fund management in one platform: vehicle formation, cap table, KYC/AML, capital calls, lead carry, distributions, general ledger, NAV and member reporting.';

// Literal route: takes precedence over the dynamic /products/[slug] template, so
// the flagship SPV product gets its own bespoke page while the other platforms
// keep using the shared template.
export default function SpvFundManagementPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'aama.io SPV Fund Management',
      description: DESCRIPTION,
      url: URL,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      provider: { '@type': 'Organization', name: 'aama.io', url: SITE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: SPV_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Products', item: `${SITE}/product` },
        { '@type': 'ListItem', position: 2, name: 'SPV Fund Management', item: URL },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="SPV Fund Management Software: Formation to Accounting"
        description={DESCRIPTION}
        keywords="SPV fund management software, SPV administration software, SPV accounting, syndicate management platform, special purpose vehicle software, SPV formation, lead carry, deal-by-deal waterfall, end-to-end SPV platform, Singapore SPV"
        ogUrl={URL}
      />
      <Head>
        {jsonLd.map((data, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
      </Head>
      <PageShell>
        <SpvFundManagement />
      </PageShell>
    </>
  );
}

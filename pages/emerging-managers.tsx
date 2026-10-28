import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { EmergingManagers, EM_FAQS } from '@/components/EmergingManagers/EmergingManagers';

const SITE = 'https://aama.io';
const URL = `${SITE}/emerging-managers`;
const DESCRIPTION =
  'Run your first fund or SPV on the aama.io LP portal, free through your first close. Larger funds and SPVs pay when they collect. Open worldwide.';

export default function EmergingManagersPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Launch Free for emerging fund managers',
      description: DESCRIPTION,
      url: URL,
      isPartOf: { '@type': 'WebSite', name: 'AAMA', url: SITE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: EM_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Launch Free', item: URL },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Free LP Portal for Emerging Fund Managers | aama.io"
        description={DESCRIPTION}
        keywords="emerging manager platform, free LP portal, free fund management software, fund management software free, first-time fund manager, SPV administration free, LP portal for emerging managers"
        ogUrl={URL}
      />
      <Head>
        {jsonLd.map((data, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
      </Head>
      <PageShell>
        <EmergingManagers />
      </PageShell>
    </>
  );
}

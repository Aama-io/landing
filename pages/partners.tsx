import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { Partners, PARTNER_FAQS } from '@/components/Partners/Partners';

const SITE = 'https://aama.io';
const URL = `${SITE}/partners`;
const DESCRIPTION =
  'Partner with aama.io: referral arrangements, joint solutions and integrations for fund-formation firms, accounting practices, fund administrators and fintech providers.';

export default function PartnersPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Partner with aama.io',
      description: DESCRIPTION,
      url: URL,
      isPartOf: { '@type': 'WebSite', name: 'AAMA', url: SITE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: PARTNER_FAQS.map((f) => ({
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
        { '@type': 'ListItem', position: 2, name: 'Partners', item: URL },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Partners: Referral, Joint Solutions and Integrations"
        description={DESCRIPTION}
        keywords="fund administration software partners, fund formation partner, VCC formation referral, accounting practice fund software, fund administrator white label portal, fintech integration fund management, aama.io partners"
        ogUrl={URL}
      />
      <Head>
        {jsonLd.map((data, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
      </Head>
      <PageShell>
        <Partners />
      </PageShell>
    </>
  );
}

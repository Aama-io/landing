import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { AboutHero } from '../components/AboutHero/AboutHero';
import { Team } from '../components/Team/Team';
import { SEO } from '@/components/SEO/SEO';

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'aama.io',
  legalName: 'UXQode Pte Ltd',
  url: 'https://aama.io',
  logo: 'https://aama.io/aama-logo.svg',
  description:
    'aama.io is fund management, administration and accounting software that runs the entire fund lifecycle on one platform.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'SG',
  },
  founder: {
    '@type': 'Person',
    name: 'Sunil Chaulagain',
    jobTitle: 'Chief Executive Officer',
  },
  employee: [
    { '@type': 'Person', name: 'Sunil Chaulagain', jobTitle: 'Chief Executive Officer' },
    { '@type': 'Person', name: 'Prashant Chaulagain', jobTitle: 'Chief Technology Officer' },
    { '@type': 'Person', name: 'Luis Lim', jobTitle: 'Chief Operations Officer' },
    { '@type': 'Person', name: 'Pragati Adhikari', jobTitle: 'Chief Marketing Officer' },
    { '@type': 'Person', name: 'Chetana Adhikari', jobTitle: 'Chief Finance Officer' },
  ],
};

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us | aama.io"
        description="Learn about aama.io's mission to modernize fund management, the team behind the platform, and the journey so far."
        keywords="aama team, fund management team, fintech experts, fund innovation, financial technology"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
      </Head>
      <PageShell>
        <AboutHero />
        <Team />
      </PageShell>
    </>
  );
}

import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { PersonaTools } from '@/components/ToolsHub/PersonaTools';
import { toolsForPersona } from '@/lib/tools';

const SITE = 'https://aama.io';

export default function AdminToolsPage() {
  const title = 'Fund Tools for Fund Administrators — Accruals, NAV & LP Docs | aama.io';
  const description = 'Free tools for fund administrators: management fee accruals, expense-ratio benchmarking, IRR/TVPI/DPI for LP packs, capital-call schedules and drawdown-notice generation for month-end and reporting. No sign-up.';
  const url = `${SITE}/tools/admin`;
  const tools = toolsForPersona('admin');

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'aama.io fund tools for fund administrators',
    description,
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}${t.href}`,
      name: t.label,
    })),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="fund administration, management fee accrual, expense ratio, NAV, capital call, drawdown notice, month-end close, LP reporting, fund admin tools" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE}/product-investment-portal.png`} />
        <meta property="og:site_name" content="aama.io" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE}/product-investment-portal.png`} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      </Head>
      <PageShell>
        <PersonaTools persona="admin" />
      </PageShell>
    </>
  );
}

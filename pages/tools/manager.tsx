import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { PersonaTools } from '@/components/ToolsHub/PersonaTools';
import { toolsForPersona } from '@/lib/tools';

const SITE = 'https://aama.io';

export default function ManagerToolsPage() {
  const title = 'Fund Tools for Fund Managers — Returns, Carry & Capital Calls | aama.io';
  const description = 'Free tools for active fund managers: IRR/TVPI/DPI/RVPI returns, distribution waterfalls, management fee and carried-interest modelling, capital-call schedules, co-investment and vintage benchmarking. No sign-up.';
  const url = `${SITE}/tools/manager`;
  const tools = toolsForPersona('manager');

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'aama.io fund tools for fund managers',
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
        <meta name="keywords" content="IRR calculator, TVPI DPI RVPI, waterfall calculator, carried interest, capital call schedule, co-investment, fund benchmarking, fund manager tools, LP reporting" />
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
        <PersonaTools persona="manager" />
      </PageShell>
    </>
  );
}

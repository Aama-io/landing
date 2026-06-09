import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { PersonaTools } from '@/components/ToolsHub/PersonaTools';
import { toolsForPersona } from '@/lib/tools';

const SITE = 'https://aama.io';

export default function FounderToolsPage() {
  const title = 'Fund Tools for Founders & GPs — Launch a VCC in Singapore | aama.io';
  const description = 'Free tools for first-time fund founders and GPs: VCC structure comparison, MAS licensing pathways, setup-cost estimates, waterfalls and carried-interest modelling — everything to structure your fund before first close. No sign-up.';
  const url = `${SITE}/tools/founder`;
  const tools = toolsForPersona('founder');

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'aama.io fund tools for founders & GPs',
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
        <meta name="keywords" content="VCC fund setup, launch VCC Singapore, MAS licensing, fund setup cost, GP economics, carried interest, fund founder tools, private equity fund structure" />
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
        <PersonaTools persona="founder" />
      </PageShell>
    </>
  );
}

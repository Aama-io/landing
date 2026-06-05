import Head from 'next/head';
import { PageShell } from '@/components/ui/PageShell';
import { ToolsHub } from '@/components/ToolsHub/ToolsHub';
import { ALL_TOOLS } from '@/lib/tools';

const SITE = 'https://aama.io';

export default function ToolsIndexPage() {
  const title = 'Free Fund Tools for GPs, LPs & Fund Managers | aama.io';
  const description = 'A free toolkit for fund managers — Singapore VCC structuring, MAS licensing, waterfalls, carried interest, IRR/TVPI/DPI, capital calls, co-investment and fund benchmarking. No sign-up.';
  const url = `${SITE}/tools`;

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'aama.io free fund tools',
    description,
    numberOfItems: ALL_TOOLS.length,
    itemListElement: ALL_TOOLS.map((t, i) => ({
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
        <meta name="keywords" content="fund tools, VCC calculator, waterfall calculator, IRR calculator, carried interest, capital call, fund management Singapore, private equity tools, venture capital tools" />
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
        <ToolsHub />
      </PageShell>
    </>
  );
}

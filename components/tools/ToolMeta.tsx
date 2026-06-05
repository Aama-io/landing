import Head from 'next/head';
import { TOOL_CONTENT } from '@/lib/toolContent';
import { ALL_TOOLS } from '@/lib/tools';

const SITE = 'https://aama.io';
const OG_IMAGE = '/product-investment-portal.png';

/**
 * Self-contained SEO head for a tool page: correct per-page canonical, Open
 * Graph / Twitter cards, and JSON-LD structured data (SoftwareApplication +
 * BreadcrumbList + FAQPage) so search engines and answer engines can index and
 * cite the tool. The FAQ JSON-LD mirrors the visible FAQ in ToolContentSection.
 */
export function ToolMeta({ slug }: { slug: string }) {
  const c = TOOL_CONTENT[slug];
  const tool = ALL_TOOLS.find((t) => t.href === slug);
  if (!c) return null;

  const url = `${SITE}${slug}`;
  const title = `${c.seoTitle} | aama.io`;
  const name = tool?.label ?? c.seoTitle;

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description: c.seoDescription,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web browser',
    url,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: true,
    publisher: { '@type': 'Organization', name: 'aama.io', url: SITE },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${SITE}/tools` },
      { '@type': 'ListItem', position: 3, name, item: url },
    ],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={c.seoDescription} />
      <meta name="keywords" content={c.keywords} />
      <meta name="author" content="UXQode Pte Ltd" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={c.seoDescription} />
      <meta property="og:image" content={`${SITE}${OG_IMAGE}`} />
      <meta property="og:site_name" content="aama.io" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={c.seoDescription} />
      <meta name="twitter:image" content={`${SITE}${OG_IMAGE}`} />
      <meta name="twitter:creator" content="@uxqode" />

      {/* Icons / manifest */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
    </Head>
  );
}

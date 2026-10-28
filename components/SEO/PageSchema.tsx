import Head from 'next/head';

const SITE = 'https://aama.io';

export interface Crumb {
  name: string;
  path: string;
}

interface PageSchemaProps {
  /** Schema.org page type, e.g. WebPage, AboutPage, ContactPage, CollectionPage. */
  type?: string;
  name: string;
  description: string;
  path: string;
  /** Breadcrumb trail after Home, ending with this page. */
  crumbs?: Crumb[];
  faqs?: { q: string; a: string }[];
  /** Extra JSON-LD nodes (e.g. SoftwareApplication). */
  extra?: Record<string, unknown>[];
}

/** Page-level JSON-LD: WebPage + BreadcrumbList, plus FAQPage when FAQs are given. */
export function PageSchema({ type = 'WebPage', name, description, path, crumbs, faqs, extra = [] }: PageSchemaProps) {
  const url = `${SITE}${path}`;
  const trail = [{ name: 'Home', path: '' }, ...(crumbs ?? [{ name, path }])];
  const nodes: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': type,
      name,
      description,
      url,
      isPartOf: { '@type': 'WebSite', name: 'aama.io', url: SITE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: `${SITE}${c.path}`,
      })),
    },
    ...extra,
  ];
  if (faqs?.length) {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return (
    <Head>
      {nodes.map((n, i) => (
        <script key={`ld-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(n) }} />
      ))}
    </Head>
  );
}

import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import { ProductDetail } from '@/components/ProductDetail/ProductDetail';
import { PLATFORMS, PLATFORM_LINKS, platformBySlug } from '@/lib/platforms';

// Products = the platforms aama.io licenses (LP Portal, Fund Administration,
// Fund Accounting). Statically generated from lib/platforms. Icons are read
// from the imported module (not passed through getStaticProps) so they never
// need to be serialised.
export default function PlatformPage({ slug }: { slug: string }) {
  const data = platformBySlug(slug)!;
  const related = PLATFORM_LINKS.filter((l) => l.href !== `/products/${slug}`);

  const structured = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', category: data.category },
    provider: { '@type': 'Organization', name: 'aama.io', url: 'https://aama.io' },
  };

  return (
    <InnerLayout>
      <SEO title={data.name} description={data.description} keywords={data.keywords} ogUrl={`https://aama.io/products/${data.slug}`} />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
      </Head>
      <ProductDetail data={data} backHref="/product" backLabel="Products" related={related} relatedHeading="Other products" />
    </InnerLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: PLATFORMS.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  if (!platformBySlug(slug)) return { notFound: true };
  return { props: { slug } };
};

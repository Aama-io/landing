import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import {
  IconBuildingBank, IconChartBar, IconChartPie, IconShield, IconShieldLock,
  IconCurrencyDollar, IconActivity, IconUsers, IconUsersGroup, IconWorld,
  IconLock, IconFileAnalytics, IconReportMoney, IconBriefcase, IconCheck,
} from '@tabler/icons-react';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import { ProductDetail, type DetailData } from '@/components/ProductDetail/ProductDetail';
import { SOLUTIONS, DYNAMIC_SOLUTION_SLUGS } from '@/lib/solutions';
import { products, type ProductData } from '@/pages/api/products';

const iconMap: Record<string, typeof IconCheck> = {
  IconBuildingBank, IconChartBar, IconChartPie, IconShield, IconShieldLock,
  IconCurrencyDollar, IconActivity, IconUsers, IconUsersGroup, IconWorld,
  IconLock, IconFileAnalytics, IconReportMoney, IconBriefcase, IconCheck,
};
const ic = (name: string) => iconMap[name] || IconCheck;

// Solutions = by who you are (audience / fund type). Statically generated from
// the shared products dataset; icon strings are mapped to components here.
export default function SolutionPage({ product }: { product: ProductData }) {
  const data: DetailData = {
    slug: product.slug,
    name: product.title,
    shortName: product.shortTitle,
    category: product.category,
    icon: ic(product.icon),
    image: product.image,
    heroDescription: product.heroDescription,
    description: product.description,
    keywords: `${product.category}, fund management software, fund administration, fund accounting, ${product.shortTitle.toLowerCase()}`,
    benefits: product.benefits.map((b) => ({ title: b.title, description: b.description, icon: ic(b.icon) })),
    featureGroups: product.features,
    useCases: product.useCases,
    keyFeatures: product.keyFeatures,
    faqs: product.faq.map((f) => ({ q: f.question, a: f.answer })),
  };
  const related = SOLUTIONS.filter((sol) => sol.slug !== product.slug);

  const structured = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.title,
    description: product.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', category: product.category },
    provider: { '@type': 'Organization', name: 'aama.io', url: 'https://aama.io' },
  };

  return (
    <InnerLayout>
      <SEO title={product.title} description={product.description} keywords={data.keywords} ogUrl={`https://aama.io/solutions/${product.slug}`} />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
      </Head>
      <ProductDetail data={data} backHref="/solutions" backLabel="Solutions" related={related} relatedHeading="Other solutions" />
    </InnerLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: DYNAMIC_SOLUTION_SLUGS.map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { notFound: true };
  return { props: { product } };
};

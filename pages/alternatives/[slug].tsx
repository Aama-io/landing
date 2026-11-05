import type { GetStaticPaths, GetStaticProps } from 'next';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import { PageSchema } from '@/components/SEO/PageSchema';
import { AlternativesPageView } from '@/components/Compare/Compare';
import { ALTERNATIVES, alternativesBySlug, type AlternativesPage } from '@/lib/compare';

export default function AlternativesRoute({ page: p }: { page: AlternativesPage }) {
  const path = `/alternatives/${p.slug}`;
  return (
    <InnerLayout>
      <SEO title={p.title} description={p.metaDescription} keywords={p.keywords} ogUrl={`https://aama.io${path}`} />
      <PageSchema
        name={p.title}
        description={p.metaDescription}
        path={path}
        crumbs={[{ name: p.title, path }]}
        faqs={p.faqs}
      />
      <AlternativesPageView p={p} />
    </InnerLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ALTERNATIVES.map((a) => ({ params: { slug: a.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = alternativesBySlug(params?.slug as string);
  if (!page) {return { notFound: true };}
  return { props: { page } };
};

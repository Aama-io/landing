import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import { PageSchema } from '@/components/SEO/PageSchema';
import { AlternativesPageView } from '@/components/Compare/Compare';
import { ALTERNATIVES_HUB as p } from '@/lib/compare';

export default function AlternativesHub() {
  const path = '/alternatives';
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

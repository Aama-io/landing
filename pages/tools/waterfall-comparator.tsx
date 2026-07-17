import dynamic from 'next/dynamic';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolHero } from '@/components/tools/ToolHero';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const WaterfallAmEu = dynamic(() => import('@/components/WaterfallAmEu/WaterfallAmEu'), {
  ssr: false,
  loading: () => <ToolHero slug="/tools/waterfall-comparator" />,
});

export default function WaterfallComparatorPage() {
  return (
    <>
      <ToolMeta slug="/tools/waterfall-comparator" />
      <PageShell>
        <WaterfallAmEu />
        <ToolContentSection slug="/tools/waterfall-comparator" />
      </PageShell>
    </>
  );
}

import dynamic from 'next/dynamic';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolHero } from '@/components/tools/ToolHero';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const WaterfallCalculator = dynamic(
  () => import('@/components/WaterfallCalculator/WaterfallCalculator'),
  { ssr: false, loading: () => <ToolHero slug="/tools/waterfall" /> }
);

export default function WaterfallCalculatorPage() {
  return (
    <>
      <ToolMeta slug="/tools/waterfall" />
      <PageShell>
        <WaterfallCalculator />
        <ToolContentSection slug="/tools/waterfall" />
      </PageShell>
    </>
  );
}

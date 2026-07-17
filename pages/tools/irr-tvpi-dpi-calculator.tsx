import dynamic from 'next/dynamic';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolHero } from '@/components/tools/ToolHero';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const CashflowMetrics = dynamic(() => import('@/components/CashflowMetrics/CashflowMetrics'), {
  ssr: false,
  loading: () => <ToolHero slug="/tools/irr-tvpi-dpi-calculator" />,
});

export default function IrrTvpiDpiPage() {
  return (
    <>
      <ToolMeta slug="/tools/irr-tvpi-dpi-calculator" />
      <PageShell>
        <CashflowMetrics />
        <ToolContentSection slug="/tools/irr-tvpi-dpi-calculator" />
      </PageShell>
    </>
  );
}

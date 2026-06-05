import dynamic from 'next/dynamic';
import { Center, Loader } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const CashflowMetrics = dynamic(() => import('@/components/CashflowMetrics/CashflowMetrics'), {
  ssr: false,
  loading: () => (<Center style={{ minHeight: '80vh' }}><Loader color="blue" /></Center>),
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

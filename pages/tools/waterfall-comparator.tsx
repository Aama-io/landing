import dynamic from 'next/dynamic';
import { Center, Loader } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const WaterfallAmEu = dynamic(() => import('@/components/WaterfallAmEu/WaterfallAmEu'), {
  ssr: false,
  loading: () => (<Center style={{ minHeight: '80vh' }}><Loader color="blue" /></Center>),
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

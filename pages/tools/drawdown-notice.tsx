import dynamic from 'next/dynamic';
import { Center, Loader } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const DrawdownNotice = dynamic(
  () => import('@/components/DrawdownNotice/DrawdownNotice'),
  { ssr: false, loading: () => (<Center style={{ minHeight: '80vh' }}><Loader color="blue" /></Center>) }
);

export default function DrawdownNoticePage() {
  return (
    <>
      <ToolMeta slug="/tools/drawdown-notice" />
      <PageShell>
        <DrawdownNotice />
        <ToolContentSection slug="/tools/drawdown-notice" />
      </PageShell>
    </>
  );
}

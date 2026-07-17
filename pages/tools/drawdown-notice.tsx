import dynamic from 'next/dynamic';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolHero } from '@/components/tools/ToolHero';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const DrawdownNotice = dynamic(
  () => import('@/components/DrawdownNotice/DrawdownNotice'),
  { ssr: false, loading: () => <ToolHero slug="/tools/drawdown-notice" /> }
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

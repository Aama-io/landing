import dynamic from 'next/dynamic';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolHero } from '@/components/tools/ToolHero';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const CapitalCallBuilder = dynamic(
  () => import('@/components/CapitalCallBuilder/CapitalCallBuilder'),
  { ssr: false, loading: () => <ToolHero slug="/tools/capital-call-schedule" /> }
);

export default function CapitalCallSchedulePage() {
  return (
    <>
      <ToolMeta slug="/tools/capital-call-schedule" />
      <PageShell>
        <CapitalCallBuilder />
        <ToolContentSection slug="/tools/capital-call-schedule" />
      </PageShell>
    </>
  );
}

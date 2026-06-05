import dynamic from 'next/dynamic';
import { Center, Loader } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const CapitalCallBuilder = dynamic(
  () => import('@/components/CapitalCallBuilder/CapitalCallBuilder'),
  { ssr: false, loading: () => (<Center style={{ minHeight: '80vh' }}><Loader color="blue" /></Center>) }
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

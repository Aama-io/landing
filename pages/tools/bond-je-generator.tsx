import dynamic from 'next/dynamic';
import { Center, Loader } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const BondJEGenerator = dynamic(
  () => import('@/components/BondJEGenerator/BondJEGenerator'),
  { ssr: false, loading: () => (<Center style={{ minHeight: '80vh' }}><Loader color="blue" /></Center>) }
);

export default function BondJEGeneratorPage() {
  return (
    <>
      <ToolMeta slug="/tools/bond-je-generator" />
      <PageShell>
        <BondJEGenerator />
        <ToolContentSection slug="/tools/bond-je-generator" />
      </PageShell>
    </>
  );
}

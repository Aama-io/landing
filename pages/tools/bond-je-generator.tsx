import dynamic from 'next/dynamic';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolHero } from '@/components/tools/ToolHero';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const BondJEGenerator = dynamic(
  () => import('@/components/BondJEGenerator/BondJEGenerator'),
  { ssr: false, loading: () => <ToolHero slug="/tools/bond-je-generator" /> }
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

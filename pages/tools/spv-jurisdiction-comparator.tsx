import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { SpvJurisdictionComparator } from '@/components/SpvJurisdictionComparator/SpvJurisdictionComparator';

export default function SpvJurisdictionComparatorPage() {
  return (
    <>
      <ToolMeta slug="/tools/spv-jurisdiction-comparator" />
      <PageShell>
        <SpvJurisdictionComparator />
        <ToolContentSection slug="/tools/spv-jurisdiction-comparator" />
      </PageShell>
    </>
  );
}

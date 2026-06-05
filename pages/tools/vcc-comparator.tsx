import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { VccComparator } from '@/components/VccComparator/VccComparator';

export default function VccComparatorPage() {
  return (
    <>
      <ToolMeta slug="/tools/vcc-comparator" />
      <PageShell>
        <VccComparator />
        <ToolContentSection slug="/tools/vcc-comparator" />
      </PageShell>
    </>
  );
}

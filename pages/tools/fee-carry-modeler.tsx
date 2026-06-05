import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { FeeCarryModeler } from '@/components/FeeCarryModeler/FeeCarryModeler';

export default function FeeCarryModelerPage() {
  return (
    <>
      <ToolMeta slug="/tools/fee-carry-modeler" />
      <PageShell>
        <FeeCarryModeler />
        <ToolContentSection slug="/tools/fee-carry-modeler" />
      </PageShell>
    </>
  );
}

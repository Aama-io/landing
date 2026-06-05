import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { CoInvestModeler } from '@/components/CoInvestModeler/CoInvestModeler';

export default function CoInvestmentModelerPage() {
  return (
    <>
      <ToolMeta slug="/tools/co-investment-modeler" />
      <PageShell>
        <CoInvestModeler />
        <ToolContentSection slug="/tools/co-investment-modeler" />
      </PageShell>
    </>
  );
}

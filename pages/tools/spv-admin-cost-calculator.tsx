import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { SpvAdminCostCalculator } from '@/components/SpvAdminCostCalculator/SpvAdminCostCalculator';

export default function SpvAdminCostCalculatorPage() {
  return (
    <>
      <ToolMeta slug="/tools/spv-admin-cost-calculator" />
      <PageShell>
        <SpvAdminCostCalculator />
        <ToolContentSection slug="/tools/spv-admin-cost-calculator" />
      </PageShell>
    </>
  );
}

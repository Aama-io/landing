import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { SpvCostEstimator } from '@/components/SpvCostEstimator/SpvCostEstimator';

export default function SpvCostEstimatorPage() {
  return (
    <>
      <ToolMeta slug="/tools/spv-cost-estimator" />
      <PageShell>
        <SpvCostEstimator />
        <ToolContentSection slug="/tools/spv-cost-estimator" />
      </PageShell>
    </>
  );
}

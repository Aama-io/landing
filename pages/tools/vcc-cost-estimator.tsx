import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { VccCostEstimator } from '@/components/VccCostEstimator/VccCostEstimator';

export default function VccCostEstimatorPage() {
  return (
    <>
      <ToolMeta slug="/tools/vcc-cost-estimator" />
      <PageShell>
        <VccCostEstimator />
        <ToolContentSection slug="/tools/vcc-cost-estimator" />
      </PageShell>
    </>
  );
}

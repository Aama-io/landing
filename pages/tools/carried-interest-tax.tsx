import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { CarryTaxEstimator } from '@/components/CarryTaxEstimator/CarryTaxEstimator';

export default function CarriedInterestTaxPage() {
  return (
    <>
      <ToolMeta slug="/tools/carried-interest-tax" />
      <PageShell>
        <CarryTaxEstimator />
        <ToolContentSection slug="/tools/carried-interest-tax" />
      </PageShell>
    </>
  );
}

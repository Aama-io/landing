import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { DataEntryTimeEstimator } from '@/components/DataEntryTimeEstimator/DataEntryTimeEstimator';

export default function DataEntryTimeEstimatorPage() {
  return (
    <>
      <ToolMeta slug="/tools/fund-accounting-data-entry-time-estimator" />
      <PageShell>
        <DataEntryTimeEstimator />
        <ToolContentSection slug="/tools/fund-accounting-data-entry-time-estimator" />
      </PageShell>
    </>
  );
}

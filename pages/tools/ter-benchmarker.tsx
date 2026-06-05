import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { VccTerBenchmark } from '@/components/VccTerBenchmark/VccTerBenchmark';

export default function TerBenchmarkerPage() {
  return (
    <>
      <ToolMeta slug="/tools/ter-benchmarker" />
      <PageShell>
        <VccTerBenchmark />
        <ToolContentSection slug="/tools/ter-benchmarker" />
      </PageShell>
    </>
  );
}

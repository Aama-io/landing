import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { VintageBenchmark } from '@/components/VintageBenchmark/VintageBenchmark';

export default function VintageBenchmarkerPage() {
  return (
    <>
      <ToolMeta slug="/tools/vintage-benchmarker" />
      <PageShell>
        <VintageBenchmark />
        <ToolContentSection slug="/tools/vintage-benchmarker" />
      </PageShell>
    </>
  );
}

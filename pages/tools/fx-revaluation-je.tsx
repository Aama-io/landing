import dynamic from 'next/dynamic';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolHero } from '@/components/tools/ToolHero';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const FxRevaluationJE = dynamic(
  () => import('@/components/FxRevaluationJE/FxRevaluationJE'),
  { ssr: false, loading: () => <ToolHero slug="/tools/fx-revaluation-je" /> }
);

export default function FxRevaluationJEPage() {
  return (
    <>
      <ToolMeta slug="/tools/fx-revaluation-je" />
      <PageShell>
        <FxRevaluationJE />
        <ToolContentSection slug="/tools/fx-revaluation-je" />
      </PageShell>
    </>
  );
}

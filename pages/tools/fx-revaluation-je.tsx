import dynamic from 'next/dynamic';
import { Center, Loader } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const FxRevaluationJE = dynamic(
  () => import('@/components/FxRevaluationJE/FxRevaluationJE'),
  { ssr: false, loading: () => (<Center style={{ minHeight: '80vh' }}><Loader color="blue" /></Center>) }
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

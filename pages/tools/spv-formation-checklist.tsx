import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { SpvFormationChecklist } from '@/components/SpvFormationChecklist/SpvFormationChecklist';

export default function SpvFormationChecklistPage() {
  return (
    <>
      <ToolMeta slug="/tools/spv-formation-checklist" />
      <PageShell>
        <SpvFormationChecklist />
        <ToolContentSection slug="/tools/spv-formation-checklist" />
      </PageShell>
    </>
  );
}

import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { DelawareSpvCalendar } from '@/components/DelawareSpvCalendar/DelawareSpvCalendar';

export default function DelawareSpvCalendarPage() {
  return (
    <>
      <ToolMeta slug="/tools/delaware-spv-compliance-calendar" />
      <PageShell>
        <DelawareSpvCalendar />
        <ToolContentSection slug="/tools/delaware-spv-compliance-calendar" />
      </PageShell>
    </>
  );
}

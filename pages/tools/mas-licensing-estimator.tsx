import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';
import { MasLicensing } from '@/components/MasLicensing/MasLicensing';

export default function MasLicensingPage() {
  return (
    <>
      <ToolMeta slug="/tools/mas-licensing-estimator" />
      <PageShell>
        <MasLicensing />
        <ToolContentSection slug="/tools/mas-licensing-estimator" />
      </PageShell>
    </>
  );
}

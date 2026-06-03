import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { VccComparator } from '@/components/VccComparator/VccComparator';

export default function VccComparatorPage() {
  return (
    <>
      <SEO
        title="Umbrella vs Standalone VCC Comparator | aama.io"
        description="A free Singapore VCC structure comparator — see whether an umbrella VCC with sub-funds or a standalone VCC fits your fund plans, with a full side-by-side comparison of cost, ring-fencing, setup time and governance."
        keywords="VCC, Variable Capital Company, umbrella VCC, sub-fund, standalone VCC, Singapore fund structure, MAS, VCC comparison, fund structuring"
      />
      <PageShell>
        <VccComparator />
      </PageShell>
    </>
  );
}

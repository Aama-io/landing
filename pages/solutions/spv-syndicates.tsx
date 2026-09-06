import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { SpvSyndicates } from '@/components/SpvSyndicates/SpvSyndicates';

// Bespoke solution page for the SPV / syndicate audience. A literal route file
// takes precedence over the dynamic /solutions/[slug] template, so this page
// overrides the generic solution template for this one priority audience.
export default function SpvSyndicatesPage() {
  return (
    <>
      <SEO
        title="SPV & Syndicate Administration & Accounting Software"
        description="Launch and administer SPVs & syndicates in days — cap table, KYC/AML, lead carry, distributions and IFRS-ready accounting, on aama.io."
        keywords="SPV administration software, special purpose vehicle, syndicate management, single-asset fund, deal-by-deal carry, angel syndicate, co-investment, SPV accounting, fund administration, lead carry, cap table"
        ogUrl="https://aama.io/solutions/spv-syndicates"
      />
      <PageShell>
        <SpvSyndicates />
      </PageShell>
    </>
  );
}

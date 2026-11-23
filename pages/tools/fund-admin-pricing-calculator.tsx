import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { FundAdminPricingCalculator } from '@/components/FundAdminPricingCalculator/FundAdminPricingCalculator';

export default function FundAdminPricingCalculatorPage() {
  return (
    <>
      <SEO
        title="Fund Administrator Pricing Calculator | aama.io"
        description="Estimate Studio, Practice or Firm pricing from the number of client funds you administer. Plans from USD 1,500/month."
        keywords="fund administrator pricing, fund admin software cost, CSP fund accounting pricing calculator"
      />
      <PageShell>
        <FundAdminPricingCalculator />
      </PageShell>
    </>
  );
}

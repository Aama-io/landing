import { PageShell } from '@/components/ui/PageShell';
import { Product } from '../components/Product/Product';
import { SEO } from '@/components/SEO/SEO';

export default function ProductPage() {
  return (
    <>
      <SEO
        title="aama.io | Fund Management, Administration & Accounting Platform"
        description="aama.io is a comprehensive fund management and administration platform with two flagship products — a multi-instrument Fund Accounting engine and a white-labeled Investor/LP portal. Built for mutual funds, VC/PE, family offices, hedge funds, REITs and single-asset SPVs."
        keywords="fund management software, fund accounting, fund administration, investor portal, LP portal, mutual funds, private capital, VC, PE, family office, hedge funds, REITs, SPV, special purpose vehicle, syndicate, deal-by-deal, angel syndicate, fund-as-a-service"
      />
      <PageShell>
        <Product />
      </PageShell>
    </>
  );
}

import { PageShell } from '@/components/ui/PageShell';
import { Product } from '../components/Product/Product';
import { SEO } from '@/components/SEO/SEO';

export default function ProductPage() {
  return (
    <>
      <SEO
        title="aama.io | Fund Administration and Accounting Software"
        description="aama.io is fund administration and accounting software with two flagship products — a multi-instrument fund accounting engine (IFRS 9 / SFRS(I) 9) and a white-labeled investor/LP portal. Built for mid-market VC/PE, family offices, hedge funds, REITs and single-asset SPVs in Singapore and APAC."
        keywords="fund administration software, private equity fund administration software, venture capital fund administration software, fund administration software, fund accounting software, LP portal for fund managers, software for fund administrators, capital call software, distribution waterfall software, NAV calculation software, IFRS 9 fund accounting, SPV administration, Singapore fund administration"
      />
      <PageShell>
        <Product />
      </PageShell>
    </>
  );
}

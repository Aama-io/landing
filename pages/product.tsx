import { PageShell } from '@/components/ui/PageShell';
import { Product } from '../components/Product/Product';
import { SEO } from '@/components/SEO/SEO';

export default function ProductPage() {
  return (
    <>
      <SEO
        title="Fund Administration and Accounting Software"
        description="aama.io: fund accounting (IFRS 9 / SFRS(I) 9) and a white-labeled LP portal for mid-market VC/PE, family offices and SPVs across Singapore & APAC."
        keywords="fund administration software, private equity fund administration software, venture capital fund administration software, fund administration software, fund accounting software, LP portal for fund managers, software for fund administrators, capital call software, distribution waterfall software, NAV calculation software, IFRS 9 fund accounting, SPV administration, Singapore fund administration"
      />
      <PageShell>
        <Product />
      </PageShell>
    </>
  );
}

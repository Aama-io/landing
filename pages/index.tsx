import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { Hero } from '../components/Hero/Hero';
import { TrustBar } from '../components/TrustBar/TrustBar';
import { ProblemSolution } from '../components/ProblemSolution/ProblemSolution';
import { ProductShowcase } from '../components/ProductShowcase/ProductShowcase';
import { PainPoints } from '@/components/PainPoints/PainPoints';
import { CTA } from '@/components/CTA/CTA';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Fund Administration Software in Singapore & APAC"
        description="Fund administration and fund accounting software for mid-market PE and VC fund managers and boutique fund administrators in Singapore and APAC — capital calls, NAV, IFRS 9 / SFRS(I) 9 accounting, an LP portal for fund managers and SPV administration, without enterprise complexity."
        keywords="fund administration software Singapore, private equity fund administration software, venture capital fund administration software, fund accounting software, fund accounting software IFRS 9 Singapore, LP portal for fund managers, software for fund administrators, in-house fund administration software, fund administration for emerging managers, capital call software, distribution waterfall software, NAV calculation software, SPV administration software Singapore, VCC fund administration, VCC sub-fund accounting, boutique fund admin software Singapore"
      />
      <PageShell>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <ProductShowcase />
        <PainPoints />
        <CTA />
      </PageShell>
    </>
  );
}

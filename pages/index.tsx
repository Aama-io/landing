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
        title="aama.io | Fund Management, Administration & Accounting Software"
        description="aama.io empowers fund administrators and fund managers with comprehensive software for in-house fund administration, accounting, and investor servicing — KYC/AML onboarding, NAV calculations, capital calls, automated compliance and a white-labeled investor portal. Built for every fund type, from multi-asset funds to single-asset SPVs."
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

import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { Hero } from '../components/Hero/Hero';
import { TrustBar } from '../components/TrustBar/TrustBar';
import { ProblemSolution } from '../components/ProblemSolution/ProblemSolution';
import { ProductShowcase } from '../components/ProductShowcase/ProductShowcase';
import { PainPoints } from '@/components/PainPoints/PainPoints';
import { Metrics } from '@/components/Metrics/Metrics';
import { CTA } from '@/components/CTA/CTA';

export default function HomePage() {
  return (
    <>
      <SEO
        title="aama.io | End-to-End Fund Management Software"
        description="aama.io empowers fund administrators and fund managers with comprehensive software for in-house fund administration, accounting, and investor servicing — KYC/AML onboarding, NAV calculations, capital calls, automated compliance and a white-labeled investor portal."
      />
      <PageShell>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <ProductShowcase />
        <PainPoints />
        <Metrics />
        <CTA />
      </PageShell>
    </>
  );
}

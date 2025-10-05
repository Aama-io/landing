import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { ProblemSolution } from '../components/ProblemSolution/ProblemSolution';
import { Features } from '../components/Features/Features';
import { Footer } from '../components/Footer/Footer';
import { CTA } from '@/components/CTA/CTA';
import { SEO } from '@/components/SEO/SEO';
import { PainPoints } from '@/components/PainPoints/PainPoints';
import { Metrics } from '@/components/Metrics/Metrics';
import { ProductShowcase } from '@/components/ProductShowcase/ProductShowcase';
import { MotionConfig } from 'framer-motion';

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user" transition={{
      type: "spring",
      bounce: 0.25,
      duration: 0.5
    }}>
      <AppShell header={{ height: 60 }} padding={0}>
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <SEO
            title="aama.io | AI-powered end-to-end fund operating system"
            description="Aama.io empowers fund administrators and fund managers with a comprehensive software for in-house fund administration, accounting, and investor servicing. The system supports KYC/AML-compliant onboarding, NAV calculations, capital calls, AI-powered compliance monitoring, automated regulatory reporting, and real-time compliance dashboards, while the white-labeled investor portal provides secure, real-time access to fund performance, documents, and transactions."
          />
          <Hero />
          <ProblemSolution />
          <ProductShowcase />
          <PainPoints />
          <CTA />
          <Footer />
        </AppShell.Main>
      </AppShell>
    </MotionConfig>
  );
}

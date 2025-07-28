import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { ProblemSolution } from '../components/ProblemSolution/ProblemSolution';
import { Features } from '../components/Features/Features';
import { Footer } from '../components/Footer/Footer';
import { CTA } from '@/components/CTA/CTA';
import { SEO } from '@/components/SEO/SEO';
import { PainPoints } from '@/components/PainPoints/PainPoints';
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
            title="AAMA.io | Fund Management and Administration Platform"
            description="Aama.io is a modern investment infrastructure platform helping fund managers launch and operate mutual funds in Singapore with compliance, transparency, and technology at the core."
          />
          <Hero />
          <ProblemSolution />
          <PainPoints />
          <Features />
          <CTA />
          <Footer />
        </AppShell.Main>
      </AppShell>
    </MotionConfig>
  );
}

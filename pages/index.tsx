import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { ProblemSolution } from '../components/ProblemSolution/ProblemSolution';
import { Features } from '../components/Features/Features';
import { Footer } from '../components/Footer/Footer';
import { Tokenomics } from '@/components/Tokenomics/Tokenomics';
import { CTA } from '@/components/CTA/CTA';
import { SEO } from '@/components/SEO/SEO';
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
          <SEO />
          <Hero />
          <ProblemSolution />
          <Features />
          <CTA />
          <Footer />
        </AppShell.Main>
      </AppShell>
    </MotionConfig>
  );
}

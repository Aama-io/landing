import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { ProblemSolution } from '../components/ProblemSolution/ProblemSolution';
import { Features } from '../components/Features/Features';
import { Footer } from '../components/Footer/Footer';
import { Tokenomics } from '@/components/Tokenomics/Tokenomics';
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
            title="Fund Management Platform | AAMA"
            description="AAMA.io is a comprehensive fund management platform that combines traditional finance with blockchain technology. Launch and manage mutual funds, VC/PE funds, REITs, and tokenized funds with ease."
            keywords="fund management platform, mutual funds, private capital, REITs, tokenized funds, blockchain finance, fund-as-a-service"
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

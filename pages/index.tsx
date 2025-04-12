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
            description="AAMA.io is a comprehensive fund management and administration platform that provides a complete suite of services for investors, fund managers, and fund administrators. Launch and manage mutual funds, VC/PE funds, REITs, and tokenized funds with ease."
            keywords="fund management platform, fund administration, investment management, investor portal, mutual funds, private capital, REITs, tokenized funds, blockchain finance, fund-as-a-service"
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

import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { ProblemSolution } from '../components/ProblemSolution/ProblemSolution';
import { Features } from '../components/Features/Features';
import { Footer } from '../components/Footer/Footer';
import { Tokenomics } from '@/components/Tokenomics/Tokenomics';
import { CTA } from '@/components/CTA/CTA';

export default function HomePage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Hero />
        <ProblemSolution />
        <CTA />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}

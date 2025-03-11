import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { ProblemSolution } from '../components/ProblemSolution/ProblemSolution';
import { Features } from '../components/Features/Features';
import { Footer } from '../components/Footer/Footer';
import { Tokenomics } from '@/components/Tokenomics/Tokenomics';

export default function HomePage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Hero />
        <ProblemSolution />
        <Tokenomics />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}

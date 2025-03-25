import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { AboutHero } from '../components/AboutHero/AboutHero';
import { Team } from '../components/Team/Team';
import { Footer } from '../components/Footer/Footer';
import { Milestones } from '../components/Milestones/Milestones';
export default function AboutPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <AboutHero />
        <Milestones />
        <Team />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
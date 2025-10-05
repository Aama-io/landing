import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { AboutHero } from '../components/AboutHero/AboutHero';
import { Team } from '../components/Team/Team';
import { Footer } from '../components/Footer/Footer';
import { Milestones } from '../components/Milestones/Milestones';
import { SEO } from '@/components/SEO/SEO';

export default function AboutPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <SEO 
        title="About Us | AAMA"
        description="Learn about AAMA's mission to revolutionize fund management through our blockchain-enabled software, our expert team, and our journey."
        keywords="AAMA team, fund management team, fintech experts, blockchain finance, fund innovation, financial technology"
      />
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <AboutHero />
        {/* <Milestones /> */}
        <Team />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
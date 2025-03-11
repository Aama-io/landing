 import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { AboutHero } from '../components/AboutHero/AboutHero';
import { Team } from '../components/Team/Team';
import { Footer } from '../components/Footer/Footer';
import classes from '../styles/About.module.css';

export default function AboutPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <AboutHero />
        <Team />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
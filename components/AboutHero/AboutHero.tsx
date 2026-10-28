import { Button, Container } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import s from './About.module.css';

const GLANCE = [
  { value: '2022', text: 'Founded in Singapore by people from fund compliance and cloud engineering.' },
  { value: '2+ yrs', text: 'In production at regulated capital-markets firms, calculating NAV daily.' },
  { value: '15+', text: 'Open- and closed-end funds running on the fund accounting engine.' },
];

export function AboutHero() {
  return (
    <section className={s.hero}>
      <div className={s.heroGlow} />
      <Container size="xl" className={s.heroInner}>
        <div>
          <span className={s.badge}>About aama.io</span>
          <h1 className={s.title}>Fund software, built by the people who have run funds</h1>
          <p className={s.heroDesc}>
            aama.io pairs fund administration and compliance experience with modern engineering. We build the
            tools that fund managers, fund administrators, GPs and family offices want to open on a Monday morning.
          </p>
          <div className={s.ctaRow}>
            <Button component={Link} href="/contact" size="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>
              Talk to the team
            </Button>
            <Button component={Link} href="/product" size="md" variant="default" className={s.secondary}>
              See the products
            </Button>
          </div>
        </div>

        <div className={s.glance}>
          <div className={s.glanceLabel}>aama.io at a glance</div>
          {GLANCE.map((g) => (
            <div key={g.value + g.text} className={s.glanceRow}>
              <div className={s.glanceVal}>{g.value}</div>
              <div className={s.glanceText}>{g.text}</div>
            </div>
          ))}
          <p className={s.glanceNote}>
            We cover funds of many types, and we work alongside fund managers and administrators to fit their
            workflow, so their teams run fund operations efficiently.
          </p>
        </div>
      </Container>
    </section>
  );
}

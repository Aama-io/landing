import { Button, Container } from '@mantine/core';
import { IconArrowRight, IconCalendarEvent, IconRocket, IconTools } from '@tabler/icons-react';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';
import s from '../AboutHero/About.module.css';

const DEMO = 'https://cal.com/aamaio/30min';

const PATHS = [
  { icon: IconCalendarEvent, title: 'Book a walkthrough', sub: '30 minutes with the team, on your fund type', href: DEMO, external: true },
  { icon: IconRocket, title: 'Start free', sub: 'LP portal free through your first close', href: '/emerging-managers' },
  { icon: IconTools, title: 'Try the free tools', sub: 'Waterfalls, IRR, SPV costs and more, no sign-up', href: '/tools' },
];

export function AboutCTA() {
  return (
    <section className={s.ctaSection}>
      <Container size="xl">
        <Reveal>
          <div className={s.ctaCard}>
            <div>
              <h2 className={s.ctaTitle}>Run your funds on books that always agree</h2>
              <p className={s.ctaDesc}>
                Talk to the people who build aama.io. Tell us what you run today and we will show you how it looks on
                the platform.
              </p>
              <div className={s.ctaRow}>
                <Button component={Link} href="/contact" size="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>
                  Talk to the team
                </Button>
                <Button component={Link} href="/product" size="md" variant="default" className={s.secondary}>
                  See the products
                </Button>
              </div>
              <p className={s.ctaMail}>
                Or write to <a href="mailto:contact@aama.io">contact@aama.io</a>
              </p>
            </div>

            <div className={s.paths}>
              {PATHS.map((p) => {
                const body = (
                  <>
                    <span className={s.pathIcon}><p.icon size={20} stroke={1.7} /></span>
                    <span className={s.pathText}>
                      <span className={s.pathTitle}>{p.title}</span>
                      <span className={s.pathSub}>{p.sub}</span>
                    </span>
                    <IconArrowRight size={18} className={s.pathArrow} />
                  </>
                );
                return p.external ? (
                  <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className={s.pathRow}>{body}</a>
                ) : (
                  <Link key={p.title} href={p.href} className={s.pathRow}>{body}</Link>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

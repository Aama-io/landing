import { Container, Text } from '@mantine/core';
import {
  IconArrowUpRight,
  IconUsersGroup,
  IconClock,
  IconShieldCheck,
  IconChartLine,
} from '@tabler/icons-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import classes from './SocialProof.module.css';

const clients = ['Kumari Capital', 'Prabhu Capital', 'Sanima Capital', 'Siddhartha Capital', 'LS Capital'];

const stats = [
  {
    icon: IconArrowUpRight,
    value: '566%',
    label: 'Investor growth in the 12 months after go-live',
  },
  {
    icon: IconUsersGroup,
    value: '5×',
    label: 'Growth in daily transactions and clients — same operations headcount',
  },
  {
    icon: IconChartLine,
    value: '15+',
    label: 'Open- and closed-end mutual funds with NAV calculated daily',
  },
  {
    icon: IconClock,
    value: '1–2 hrs/day',
    label: 'Saved by automating client actions: amendments, DRIPs, cancellations',
  },
  {
    icon: IconShieldCheck,
    value: '0',
    label: 'Data-loss incidents across every client migration',
  },
];

export function SocialProof() {
  return (
    <section className={`${classes.wrapper} section`}>
      <Container size="xl">
        <SectionHeading
          eyebrow="Live in production, not a pilot"
          title="The same engine behind this platform already runs at 5 regulated capital-markets institutions"
          description="The fund-accounting core behind aama.io has been in production for years, calculating NAV every day across each institution's open- and closed-end funds, processing transactions and regulatory reporting for institutional clients — with a zero-data-loss record across every migration."
        />

        <Reveal delay={0.1}>
          <div className={classes.logoStrip}>
            <span className={classes.logoStripLabel}>Live in production at</span>
            <div className={classes.logoRow}>
              {clients.map((name) => (
                <span key={name} className={classes.logo}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className={classes.caseStudy}>
            <div className={classes.caseStudyHead}>
              <span className={classes.caseStudyBadge}>Case study</span>
              <Text className={classes.caseStudyTitle}>
                Kumari Capital: 5× the transaction volume, on the same team
              </Text>
              <Text className={classes.caseStudyBody}>
                When Kumari Capital replaced its legacy mutual fund system, daily transactions and
                clients grew roughly five-fold — handled by the same operations headcount, while
                the engine calculates NAV every day across its open- and closed-end funds.
                Automating client actions that previously needed manual authorization freed up
                1–2 hours a day for the operations and call-centre teams, correct NAV and DP-fee
                computation removed recurring reconciliation errors, and investor numbers grew 566%
                in the 12 months after go-live.
              </Text>
            </div>

            <div className={classes.statGrid}>
              {stats.map((s) => (
                <div key={s.label} className={classes.stat}>
                  <s.icon size={18} className={classes.statIcon} stroke={1.8} />
                  <Text className={classes.statValue}>{s.value}</Text>
                  <Text className={classes.statLabel}>{s.label}</Text>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

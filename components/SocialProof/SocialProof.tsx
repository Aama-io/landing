import {
  IconArrowUpRight,
  IconChartLine,
  IconClock,
  IconShieldCheck,
  IconUsersGroup,
} from '@tabler/icons-react';
import { Container, Text } from '@mantine/core';
import { ClientLogos } from '../ClientLogos/ClientLogos';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import classes from './SocialProof.module.css';

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
    label: 'open-end and closed-end mutual funds with NAV calculated daily',
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
          eyebrow="In production for over two years"
          title="The fund accounting engine behind 15+ regulated funds"
          description="For over two years, the fund-accounting core behind aama.io has calculated NAV daily across more than 15 open-end and closed-end funds at regulated capital-markets firms, with zero data loss across every migration."
        />

        <Reveal delay={0.1}>
          <div className={classes.logoStrip}>
            <span className={classes.logoStripLabel}>Trusted by</span>
            <ClientLogos />
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
                clients grew roughly five-fold — handled by the same operations headcount, while the
                engine calculates NAV every day across its open-end and closed-end funds. Automating
                client actions that previously needed manual authorization freed up 1–2 hours a day
                for the operations and call-centre teams, correct NAV and DP-fee computation removed
                recurring reconciliation errors, and investor numbers grew 566% in the 12 months
                after go-live.
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

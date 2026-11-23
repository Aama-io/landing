import {
  IconArrowRight,
  IconArrowUpRight,
  IconChartLine,
  IconClock,
  IconShieldCheck,
  IconUsersGroup,
} from '@tabler/icons-react';
import { Container, Text } from '@mantine/core';
import Link from 'next/link';
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
                A fund manager: 5× the transaction volume, on the same team
              </Text>
              <Text className={classes.caseStudyBody}>
                A fund manager replaced a legacy mutual-fund system. Daily transactions and clients
                grew roughly five-fold on the same operations team, while the engine calculates NAV
                every day across its open-end and closed-end funds.
              </Text>
              <Link href="/case-studies/kumari-capital" className={classes.caseStudyLink}>
                Read the full case study <IconArrowRight size={15} />
              </Link>
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

import { Container, Text } from '@mantine/core';
import {
  IconArrowRight,
  IconFileReport,
  IconCalculator,
  IconCloud,
  IconDeviceMobile,
  IconUpload,
  IconShieldCheck,
} from '@tabler/icons-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import classes from './PainPoints.module.css';

const challenges = [
  {
    id: 'regulatory',
    title: 'Heavy regulatory burden',
    description: 'MAS compliance, IFRS reporting, KYC/AML checks — constant, expensive, time-consuming.',
    icon: IconFileReport,
    solution: 'Built-in IFRS accounting with automated KYC and MAS-aligned reporting.',
  },
  {
    id: 'operations',
    title: 'Manual operations',
    description: 'Spreadsheets, reconciliation errors and admin backlogs slow down your growth.',
    icon: IconCalculator,
    solution: 'Automated NAV calculation, reconciliation and investor reporting.',
  },
  {
    id: 'software',
    title: 'Expensive software',
    description: 'Enterprise systems are overpriced and out of reach for boutique firms.',
    icon: IconCloud,
    solution: 'Modern cloud software at a fraction of enterprise pricing.',
  },
  {
    id: 'investor',
    title: 'Poor investor experience',
    description: "Today's investors expect mobile access — not email PDFs and delays.",
    icon: IconDeviceMobile,
    solution: 'A mobile app and real-time investor dashboard for a digital-first experience.',
  },
  {
    id: 'scalability',
    title: 'Scaling bottlenecks',
    description: 'As AUM grows, so do errors, costs and compliance risk.',
    icon: IconUpload,
    solution: 'An automated back-office that scales without scaling your team.',
  },
  {
    id: 'security',
    title: 'Security & audit risk',
    description: 'Data breaches or compliance gaps can cost you your license.',
    icon: IconShieldCheck,
    solution: 'VAPT-certified security and a fully auditable architecture.',
  },
];

export function PainPoints() {
  return (
    <section className={`${classes.wrapper} section`}>
      <Container size="lg">
        <SectionHeading
          eyebrow="Built for Singapore fund managers"
          title="We know the problems you face — and we built the answers."
          description="Fund management is heavily regulated, operationally intense and increasingly tech-driven. Yet boutique firms lack affordable tools built for their needs. aama.io changes that."
        />

        <div className={classes.grid}>
          {challenges.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.08}>
              <div className={classes.card}>
                <div className={classes.cardHead}>
                  <span className={classes.icon}>
                    <c.icon size={22} stroke={1.8} />
                  </span>
                  <Text className={classes.cardTitle}>{c.title}</Text>
                </div>
                <Text className={classes.cardDesc}>{c.description}</Text>
                <div className={classes.solution}>
                  <IconArrowRight size={16} className={classes.solutionIcon} />
                  <Text className={classes.solutionText}>{c.solution}</Text>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

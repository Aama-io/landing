import { Container, Text, ThemeIcon } from '@mantine/core';
import {
  IconUsers,
  IconServer,
  IconChartBar,
  IconCheck,
  IconBolt,
  IconShieldLock,
  IconPlugConnected,
} from '@tabler/icons-react';
import Link from 'next/link';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import classes from './ProblemSolution.module.css';

const pillars = [
  {
    title: 'Investor Portal',
    href: '/products/fund-administration',
    description:
      'A white-labeled investor portal with enterprise-grade security and real-time access.',
    icon: IconUsers,
    features: [
      'AI-powered KYC/AML onboarding',
      'Real-time portfolio dashboard',
      'Automated capital call notifications',
      'Document vault with e-signatures',
    ],
  },
  {
    title: 'Fund Administration',
    href: '/products/fund-administration',
    description: 'Comprehensive back-office automation for fund administrators and managers.',
    icon: IconServer,
    features: [
      'Automated investor servicing',
      'Distribution & redemption processing',
      'Capital call management',
      'Role-based permissions & audit trail',
    ],
  },
  {
    title: 'Fund Accounting',
    href: '/products/fund-accounting',
    description:
      'An accounting platform with intelligent automation and built-in regulatory compliance.',
    icon: IconChartBar,
    features: [
      'IFRS-compliant accounting',
      'Automated NAV calculations',
      'Regulatory reporting automation',
      'Risk management dashboards',
    ],
  },
];

const benefits = [
  {
    title: 'Rapid fund launch',
    description: 'Pre-configured templates and automated setup cut time-to-market by up to 75%.',
    icon: IconBolt,
  },
  {
    title: 'Enterprise security',
    description: 'End-to-end encryption, granular access controls and a 99.9% uptime SLA.',
    icon: IconShieldLock,
  },
  {
    title: 'One connected system',
    description: 'No more data silos — every module stays in real-time sync, end to end.',
    icon: IconPlugConnected,
  },
];

export function ProblemSolution() {
  return (
    <section className={`${classes.wrapper} section`}>
      <Container size="lg">
        <SectionHeading
          eyebrow="Fund administration, accounting & investor portal"
          title="One system for the whole fund operation."
          description="Fund accounting, fund administration and a white-labeled investor portal on a single data model — so fund administrators and the managers they service stop reconciling between disconnected tools. IFRS 9 / SFRS(I) 9 ready."
        />

        <div className={classes.pillars}>
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <Link href={pillar.href} className={classes.card} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <ThemeIcon size={48} radius="md" className={classes.icon}>
                  <pillar.icon size={24} stroke={1.7} />
                </ThemeIcon>
                <Text className={classes.cardTitle}>{pillar.title}</Text>
                <Text className={classes.cardDesc}>{pillar.description}</Text>
                <ul className={classes.featureList}>
                  {pillar.features.map((f) => (
                    <li key={f}>
                      <IconCheck size={17} className={classes.checkIcon} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className={classes.benefits}>
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className={classes.benefit}>
                <span className={classes.benefitIcon}>
                  <b.icon size={20} stroke={1.8} />
                </span>
                <div>
                  <Text className={classes.benefitTitle}>{b.title}</Text>
                  <Text className={classes.benefitDesc}>{b.description}</Text>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

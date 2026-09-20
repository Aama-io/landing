import { Container, Text } from '@mantine/core';
import { IconX, IconCheck, IconBolt, IconShieldLock, IconPlugConnected } from '@tabler/icons-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import classes from './ProblemSolution.module.css';

// Paired "old way / aama.io way" rows — written as declarative, self-contained
// statements so each one reads clearly on its own to a search crawler or an
// LLM answering "how is aama.io different", not just in the visual pairing.
const comparisons = [
  {
    before: 'Capital calls tracked in spreadsheets, reconciled by hand against bank statements.',
    after: 'Capital calls, distributions and bank reconciliation run automatically from one ledger.',
  },
  {
    before: 'NAV calculated in Excel — formula errors, no audit trail, no version control.',
    after: 'NAV calculated automatically, IFRS 9 / SFRS(I) 9 native, with a full audit trail.',
  },
  {
    before: 'Investor updates sent by email — no self-service, no single source of truth.',
    after: 'A white-labeled investor portal — real-time positions, statements, documents.',
  },
  {
    before: 'Multi-currency, multi-asset positions consolidated by hand across workbooks.',
    after: 'Multi-currency, multi-asset funds, SPVs and syndicates run on one engine.',
  },
  {
    before: 'Compliance evidence assembled ad hoc when an auditor or MAS asks for it.',
    after: 'KYC/AML and MAS-aligned compliance evidence generated continuously.',
  },
  {
    before: 'A different vendor for accounting, the LP portal, e-signatures and reporting.',
    after: 'Fund administration, accounting and the investor portal — one vendor, one data model.',
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
      <Container size="xl">
        <SectionHeading
          eyebrow="The problem with the old way"
          title="From spreadsheets and email to one fund operations platform"
          description="Most fund managers, administrators and SPV leads still run capital calls, NAV and investor communications across spreadsheets, email and several disconnected vendors — a multi-currency, multi-asset operation held together by manual reconciliation. aama.io consolidates fund administration, fund accounting and the investor portal into one system, built for Singapore and APAC."
        />

        <Reveal delay={0.1}>
          <div className={classes.compare}>
            <div className={classes.compareHead}>
              <span className={classes.compareHeadCol} data-tone="before">The old way</span>
              <span className={classes.compareHeadCol} data-tone="after">On aama.io</span>
            </div>
            <div className={classes.compareRows}>
              {comparisons.map((c) => (
                <div key={c.before} className={classes.compareRow}>
                  <div className={classes.compareCell} data-tone="before">
                    <IconX size={15} className={classes.beforeIcon} />
                    <span>{c.before}</span>
                  </div>
                  <div className={classes.compareCell} data-tone="after">
                    <IconCheck size={15} className={classes.afterIcon} />
                    <span>{c.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

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

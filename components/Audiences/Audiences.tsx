import Link from 'next/link';
import { IconArrowRight, IconCheck } from '@tabler/icons-react';
import { Container, Text, Title } from '@mantine/core';
import { SOLUTIONS } from '@/lib/solutions';
import { Reveal } from '../ui/Reveal';
import classes from './Audiences.module.css';

// Homepage-only detail layered onto the shared SOLUTIONS data (lib/solutions.ts) —
// kept local so the Header's nav dropdown, which uses the same array, is untouched.
const DETAIL: Record<string, { kicker: string; capabilities: string[] }> = {
  'vc-pe-firms': {
    kicker: 'Closed-end funds',
    capabilities: [
      'Distribution waterfalls & carry',
      'Capital calls & LP notices',
      'LP portal & statements',
    ],
  },
  'private-credit': {
    kicker: 'Direct lending & credit',
    capabilities: ['Amortised cost & ECL staging', 'Interest accruals', 'Loan & covenant tracking'],
  },
  'family-offices': {
    kicker: 'Single & multi-family',
    capabilities: ['Multi-entity consolidation', '13O / 13U reporting', 'CDR, LBS & UBO tracking'],
  },
  'spv-syndicates': {
    kicker: 'Deal-by-deal vehicles',
    capabilities: ['Templated vehicle setup', 'Investor onboarding & KYC', 'Automated lead carry'],
  },
};

export function Audiences() {
  const [featured, ...rest] = SOLUTIONS;
  const featuredDetail = DETAIL[featured.slug];

  return (
    <section className={`${classes.wrapper} section`}>
      <Container size="xl">
        <Reveal>
          <div className={classes.header}>
            <div>
              <span className={classes.eyebrow}>Solutions</span>
              <Title order={2} className={classes.title}>
                Built for how you deploy capital
              </Title>
              <Text className={classes.lede}>
                One fund-accounting engine, configured for how venture and private equity, private
                credit, family offices and SPVs actually run.
              </Text>
            </div>
            <Link href="/solutions" className={classes.allLink}>
              All solutions
              <IconArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className={classes.grid}>
          {SOLUTIONS.map((solution, i) => {
            const detail = DETAIL[solution.slug];
            return (
              <Reveal key={solution.slug} delay={i * 0.06} className={classes.gridItem}>
                <Link href={solution.href} className={classes.card}>
                  <span className={classes.iconWrap}>
                    <solution.icon size={22} stroke={1.7} />
                  </span>

                  {detail && <span className={classes.kicker}>{detail.kicker}</span>}
                  <Text className={classes.cardTitle}>{solution.label}</Text>
                  <Text className={classes.cardBlurb}>{solution.blurb}</Text>

                  {detail && (
                    <ul className={classes.list}>
                      {detail.capabilities.map((c) => (
                        <li key={c} className={classes.listItem}>
                          <IconCheck size={14} stroke={2.4} className={classes.listIcon} />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className={classes.cardLink}>
                    Explore {solution.label}
                    <IconArrowRight size={15} className={classes.cardArrow} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

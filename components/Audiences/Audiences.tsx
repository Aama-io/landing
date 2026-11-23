import Link from 'next/link';
import { IconArrowRight, IconCheck } from '@tabler/icons-react';
import { Container, Text, Title } from '@mantine/core';
import { SOLUTIONS } from '@/lib/solutions';
import { Reveal } from '../ui/Reveal';
import classes from './Audiences.module.css';

// Homepage-only detail layered onto the shared SOLUTIONS data (lib/solutions.ts) —
// kept local so the Header's nav dropdown, which uses the same array, is untouched.
const DETAIL: Record<string, { kicker: string; capabilities: string[] }> = {
  'fund-administrators': {
    kicker: 'Singapore · your biggest fit',
    capabilities: [
      'Segregated books per client fund',
      'VCC umbrella and sub-fund view',
      'White-label client reporting',
    ],
  },
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
  return (
    <section className={`${classes.wrapper} section`}>
      <Container size="xl">
        <Reveal>
          <div className={classes.header}>
            <div>
              <span className={classes.eyebrow}>Solutions</span>
              <Title order={2} className={classes.title}>
                Fund administrators first, then the managers you service
              </Title>
              <Text className={classes.lede}>
                Singapore fund administrators and CSPs are who we sell to. The same platform also
                runs the VC, credit, family-office and SPV vehicles those firms administer.
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
              <Reveal
                key={solution.slug}
                delay={i * 0.06}
                className={i === 0 ? `${classes.gridItem} ${classes.leadItem}` : classes.gridItem}
              >
                <Link href={solution.href} className={i === 0 ? `${classes.card} ${classes.leadCard}` : classes.card}>
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

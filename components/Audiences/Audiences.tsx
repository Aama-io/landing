import { Container, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { SOLUTIONS } from '@/lib/solutions';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import classes from './Audiences.module.css';

// Homepage-only detail layered onto the shared SOLUTIONS data (lib/solutions.ts) —
// kept local so the Header's nav dropdown, which uses the same array, is untouched.
const DETAIL: Record<string, { tag: string; capabilities: string }> = {
  'vc-pe-firms': {
    tag: '60% less admin',
    capabilities: 'Waterfall automation · Capital calls · LP portal & K-1s',
  },
  'spv-syndicates': {
    tag: 'Live in days',
    capabilities: 'Templated vehicle setup · Automated lead carry',
  },
  'family-offices': {
    tag: 'Built for 13O/13U',
    capabilities: 'Multi-entity consolidation · CDR, LBS & UBO tracking',
  },
  'private-credit': {
    tag: 'Built for IFRS 9',
    capabilities: 'Amortised cost & ECL staging · Loan & covenant tracking',
  },
};

export function Audiences() {
  return (
    <section className={`${classes.wrapper} section`}>
      <Container size="xl">
        <SectionHeading
          eyebrow="Solutions"
          title="Built for how you deploy capital"
          description="Venture and private equity, private credit, family offices, single-deal SPVs and syndicates — the same fund-accounting engine, configured for how each one actually runs."
        />

        <Reveal delay={0.1}>
          <div className={classes.matrix}>
            {SOLUTIONS.map((solution) => {
              const detail = DETAIL[solution.slug];
              return (
                <Link key={solution.slug} href={solution.href} className={classes.cell}>
                  <div className={classes.cellHead}>
                    <solution.icon size={22} stroke={1.6} className={classes.cellIcon} />
                    {detail && <span className={classes.tag}>{detail.tag}</span>}
                  </div>

                  <Text className={classes.cellTitle}>{solution.label}</Text>
                  <Text className={classes.cellBlurb}>{solution.blurb}</Text>

                  {detail && <Text className={classes.capabilities}>{detail.capabilities}</Text>}

                  <span className={classes.cellLink}>
                    Explore
                    <IconArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

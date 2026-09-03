import { useEffect, useRef, useState } from 'react';
import { Title, Text, Button } from '@mantine/core';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCircleCheckFilled,
  IconShieldCheck,
  IconTrendingUp,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import classes from './Hero.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  'Built for VCC sub-funds and standalone SPVs',
  'Automated Capital calls, KYC, and  distributions',
  'Go live in weeks, not quarters',
];

const ledgerRows = [
  { label: 'Capital called', value: 'S$32,500,000' },
  { label: 'Distributions', value: 'S$8,120,000' },
  { label: 'Management fee (1.5%)', value: 'S$487,500' },
  { label: 'Active investors', value: '128' },
];

const NAV_TARGET = 48214932;

function formatSgd(n: number) {
  return `S$${Math.round(n).toLocaleString('en-SG')}`;
}

/** Counts up to the target NAV once, on mount — the hero's one authored motion moment. */
function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = useState(Math.round(target * 0.9));
  const started = useRef(false);

  useEffect(() => {
    if (started.current) {return;}
    started.current = true;
    const start = Math.round(target * 0.9);
    const t0 = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - p) ** 3;
      setValue(start + (target - start) * eased);
      if (p < 1) {raf = requestAnimationFrame(tick);}
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export function Hero() {
  const nav = useCountUp(NAV_TARGET);

  return (
    <section className={classes.root}>
      {/* Ambient light */}
      <div className={classes.glowA} />
      <div className={classes.glowB} />
      <div className={`${classes.ledgerLines} ${classes.maskFade}`} />

      <div className={classes.layout}>
        <motion.div
          className={classes.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Title className={classes.title}>
            Run every fund, SPV, and syndicate on{' '}
            <span className={classes.highlight}>
              <span className={classes.highlightMark} aria-hidden="true" />
              <span className={classes.highlightText}>one platform.</span>
            </span>
          </Title>

          <Text className={classes.subtitle}>
            PE, VC, and SPV fund managers, syndicate leads, and the administrators who service them still juggle spreadsheets, email, and disconnected tools. <span className={classes.highlight}>
              <span className={classes.highlightMark} aria-hidden="true" />
              <span className={classes.highlightText}>aama.io</span>
            </span> unifies fund administration and IFRS 9 / SFRS(I) 9 accounting in one integrated system. Singapore-first, built for APAC & beyond.
          </Text>

          <div className={classes.actions}>
            <Button
              component={Link}
              href="/contact"
              size="md"
              radius="md"
              className={classes.primary}
              rightSection={<IconArrowRight size={18} />}
            >
              Book a demo
            </Button>
            <Button
              component={Link}
              href="/product"
              size="md"
              radius="md"
              variant="default"
              className={classes.secondary}
            >
              Explore the platform
            </Button>
          </div>

          <ul className={classes.capabilities}>
            {capabilities.map((c) => (
              <li key={c} className={classes.capability}>
                <IconCircleCheckFilled size={15} className={classes.capabilityIcon} />
                {c}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className={classes.showcase}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <div className={classes.stack}>
            <div className={classes.backdrop} />

            <div className={classes.ledger}>
              <div className={classes.ledgerHead}>
                <span className={classes.fundTag}>
                  <span className={classes.fundDot} />
                  Meridian Growth Fund II
                </span>
                <span className={classes.ledgerBadge}>MAS-ready · Singapore</span>
              </div>

              <div className={classes.navBlock}>
                <Text className={classes.navLabel}>Net asset value</Text>
                <div className={classes.navRow}>
                  <span className={classes.navValue}>{formatSgd(nav)}</span>
                  <span className={classes.navDelta}>
                    <IconTrendingUp size={13} stroke={2.2} />
                    2.4%
                  </span>
                </div>
                <Text className={classes.navMeta}>Recalculated today, 06:00 SGT</Text>
              </div>

              <div className={classes.ledgerRows}>
                {ledgerRows.map((r) => (
                  <div key={r.label} className={classes.ledgerRow}>
                    <span className={classes.rowLabel}>{r.label}</span>
                    <span className={classes.rowValue}>{r.value}</span>
                  </div>
                ))}
              </div>

              <div className={classes.ledgerFoot}>
                <IconShieldCheck size={14} stroke={2} />
                Every recalculation is logged to an audit trail
              </div>
            </div>

            <motion.div
              className={`${classes.floatCard} ${classes.floatNav}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.75, ease }}
            >
              <span className={classes.floatIcon} data-tone="green">
                <IconArrowUpRight size={17} />
              </span>
              <div>
                <Text className={classes.floatLabel}>Capital call sent</Text>
                <Text className={classes.floatValue}>S$2.1M drawn down</Text>
              </div>
            </motion.div>

            <motion.div
              className={`${classes.floatCard} ${classes.floatKyc}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.95, ease }}
            >
              <span className={classes.floatIcon} data-tone="blue">
                <IconShieldCheck size={17} />
              </span>
              <div>
                <Text className={classes.floatLabel}>KYC approved</Text>
                <Text className={classes.floatValue}>Investor onboarded</Text>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

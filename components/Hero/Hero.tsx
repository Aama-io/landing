import { Container, Title, Text, Button, Group } from '@mantine/core';
import {
  IconArrowRight,
  IconCircleCheckFilled,
  IconShieldCheck,
  IconSparkles,
  IconTrendingUp,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import classes from './Hero.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className={classes.root}>
      {/* Ambient light */}
      <div className={classes.glowA} />
      <div className={classes.glowB} />
      <div className={`${classes.grid} ${classes.maskFade}`} />

      <Container size="lg" className={classes.container}>
        <motion.div
          className={classes.content}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Link href="/product" className={classes.badge}>
            <IconSparkles size={15} />
            <span>End-to-end fund management platform</span>
            <IconArrowRight size={14} className={classes.badgeArrow} />
          </Link>

          <Title className={classes.title}>
            Run your entire fund on{' '}
            <span className={classes.highlight}>one platform.</span>
          </Title>

          <Text className={classes.subtitle}>
            From KYC-compliant investor onboarding to real-time NAV, automated compliance and a
            white-labeled investor portal — aama.io replaces the spreadsheets and disconnected tools
            fund managers rely on today.
          </Text>

          <Group gap="md" justify="center" className={classes.actions}>
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
          </Group>

          <div className={classes.assurance}>
            <span className={classes.assuranceItem}>
              <IconCircleCheckFilled size={16} className={classes.assuranceIcon} />
              No engineering required
            </span>
            <span className={classes.assuranceItem}>
              <IconCircleCheckFilled size={16} className={classes.assuranceIcon} />
              MAS &amp; IFRS aligned
            </span>
            <span className={classes.assuranceItem}>
              <IconCircleCheckFilled size={16} className={classes.assuranceIcon} />
              Live in weeks, not quarters
            </span>
          </div>
        </motion.div>

        <motion.div
          className={classes.showcase}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <div className={classes.frame}>
            <div className={classes.frameBar}>
              <span className={classes.dot} data-c="r" />
              <span className={classes.dot} data-c="y" />
              <span className={classes.dot} data-c="g" />
              <span className={classes.url}>app.aama.io/funds</span>
            </div>
            <div className={classes.frameBody}>
              <Image
                src="/images/client-fund.png"
                alt="aama.io fund management dashboard"
                width={1280}
                height={820}
                className={classes.shot}
                priority
              />
            </div>
          </div>

          <motion.div
            className={`${classes.floatCard} ${classes.floatNav}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease }}
          >
            <span className={classes.floatIcon} data-tone="green">
              <IconTrendingUp size={18} />
            </span>
            <div>
              <Text className={classes.floatLabel}>NAV updated</Text>
              <Text className={classes.floatValue}>+2.4% this month</Text>
            </div>
          </motion.div>

          <motion.div
            className={`${classes.floatCard} ${classes.floatKyc}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9, ease }}
          >
            <span className={classes.floatIcon} data-tone="blue">
              <IconShieldCheck size={18} />
            </span>
            <div>
              <Text className={classes.floatLabel}>KYC approved</Text>
              <Text className={classes.floatValue}>Investor onboarded</Text>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

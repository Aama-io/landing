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
            <span>Fund administration software · Singapore &amp; APAC</span>
            <IconArrowRight size={14} className={classes.badgeArrow} />
          </Link>

          <Title className={classes.title}>
            Run your entire fund operations on{' '}
            <span className={classes.highlight}>one platform.</span>
          </Title>

          <Text className={classes.subtitle}>
            Mid-market PE and VC fund managers — and the boutique fund administrators who service
            them — still run on spreadsheets, email and a stack of disconnected tools. aama.io brings
            fund administration and fund accounting into one
            MAS-ready system, with IFRS 9 / SFRS(I) 9 accounting built in. Singapore-first, built for APAC.
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
              MAS-ready, built for VCC sub-funds
            </span>
            <span className={classes.assuranceItem}>
              <IconCircleCheckFilled size={16} className={classes.assuranceIcon} />
              IFRS 9 / SFRS(I) 9 fund accounting
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
                alt="aama.io fund administration dashboard"
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

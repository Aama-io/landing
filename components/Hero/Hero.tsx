import { Container, Title, Text, Button, Group, Badge } from '@mantine/core';
import { IconArrowRight, IconPlayerPlay, IconStar } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import classes from './Hero.module.css';
import Link from 'next/link';

export function Hero() {
  return (
    <div className={classes.root}>
      {/* Simple Background */}
      <div className={classes.heroGrid}>
        <div className={classes.heroGridItem1}></div>
        <div className={classes.heroGridItem2}></div>
        <div className={classes.heroGridItem3}></div>
      </div>

      {/* Simple Floating Elements */}
      <div className={classes.floatingElements}>
        <div className={classes.floatingElement}>
          <IconStar size={24} />
        </div>
        <div className={classes.floatingElement2}>
          <div className={classes.floatingDot}></div>
        </div>
      </div>

      <Container size="xl">
        <div className={classes.centeredLayout}>
          <motion.div
            className={classes.contentCenter}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge size="xl" radius="md" className={classes.modernBadge}>
              End-to-End Fund Management Software
            </Badge>

            <Title className={classes.modernTitle}>
              The <span className={classes.gradientHighlight}>fund management platform</span>
              <br />
              transforming fund operations
            </Title>

            <Text className={classes.modernDescription}>
              Streamline your entire fund lifecycle with enterprise-grade automation. From KYC-compliant
              investor onboarding to real-time NAV calculations, regulatory reporting, and investor servicing -
              <span className={classes.highlightText}> reduce operational overhead by 80%</span> while ensuring full regulatory compliance.
            </Text>

            <Group className={classes.modernControls} justify="center">
              <Button
                component={Link}
                href="/contact"
                size="xl"
                className={classes.primaryButton}
                rightSection={<IconArrowRight size={20} />}
              >
                Get Started
              </Button>

              <Button
                component={Link}
                href="/contact"
                size="xl"
                variant="outline"
                className={classes.secondaryButton}
                leftSection={<IconPlayerPlay size={18} />}
              >
                Book a Demo
              </Button>
            </Group>
          </motion.div>

          <motion.div
            className={classes.imageContainer}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={classes.imageWrapper}>
              <Image
                src="/images/client-fund.png"
                alt="Fund Platform Dashboard"
                width={900}
                height={600}
                className={classes.modernHeroImage}
                priority
              />
              <div className={classes.imageGlow}></div>
            </div>
          </motion.div>

          <motion.div
            className={classes.modernStats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Group className={classes.statsGrid} justify="center">
              {[
                { value: "$30M+", label: "Assets Managed" },
                { value: "3+", label: "Active Funds" },
                { value: "99.9%", label: "Uptime" }
              ].map((stat, index) => (
                <div key={index} className={classes.statCard}>
                  <Text className={classes.statValue}>{stat.value}</Text>
                  <Text className={classes.statLabel}>{stat.label}</Text>
                </div>
              ))}
            </Group>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
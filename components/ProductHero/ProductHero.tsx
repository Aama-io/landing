import { Container, Title, Text, Button, Group } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import classes from './ProductHero.module.css';

export function ProductHero() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <div className={classes.inner}>
          <motion.div
            className={classes.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title className={classes.title}>
              <Text component="span" className={classes.highlight} inherit>
                End-to-End Fund Management
              </Text>
              <Text mt="md" fz={32} fw={700}>
                For Open & Closed-End Funds
              </Text>
            </Title>

            <Text className={classes.description} mt={30}>
              Our comprehensive platform combines fund management and investment solutions, enabling fund managers to launch and manage both open and closed-end funds with automated operations, enhanced investor access, and full regulatory compliance.
            </Text>

            <Group justify="center" mt={40}>
              <Link href="/contact" passHref>
                <Button
                  size="lg"
                  className={classes.control}
                  rightSection={<IconArrowRight size={20} />}
                >
                  Get Started
                </Button>
              </Link>
            </Group>
          </motion.div>

          <motion.div
            className={classes.features}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Group gap={50} justify="center" className={classes.stats}>
              <div>
                <Text className={classes.statCount}>100%</Text>
                <Text className={classes.statTitle}>Automated</Text>
              </div>
              <div>
                <Text className={classes.statCount}>24/7</Text>
                <Text className={classes.statTitle}>Access</Text>
              </div>
              <div>
                <Text className={classes.statCount}>Global</Text>
                <Text className={classes.statTitle}>Reach</Text>
              </div>
            </Group>
          </motion.div>
        </div>
      </Container>
    </div>
  );
} 
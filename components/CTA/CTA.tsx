import { Container, Text, Title, Button, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowRight, IconCheck } from '@tabler/icons-react';
import classes from './CTA.module.css';

const points = ['No setup fees', 'Monthly subscription', 'Free investor portal', 'Scale as you grow'];

export function CTA() {
  return (
    <section className={`${classes.wrapper} section`}>
      <Container size="lg">
        <motion.div
          className={classes.card}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={classes.glowA} />
          <div className={classes.glowB} />
          <div className={`${classes.grid} ${classes.maskFade}`} />

          <div className={classes.inner}>
            <span className={classes.pill}>Get started</span>
            <Title className={classes.title}>Move your fund operation onto one platform</Title>
            <Text className={classes.description}>
              Replace spreadsheets and disconnected tools with one system for fund accounting,
              investor reporting, deal flow and SPV management — built for fund managers and fund
              administrators across Singapore and APAC, with IFRS 9 / SFRS(I) 9 accounting and VCC
              sub-fund support.
            </Text>

            <div className={classes.points}>
              {points.map((p) => (
                <span key={p} className={classes.point}>
                  <IconCheck size={16} className={classes.pointIcon} />
                  {p}
                </span>
              ))}
            </div>

            <Group justify="center" gap="md" mt={36}>
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
                href="/pricing"
                size="md"
                radius="md"
                variant="white"
                className={classes.secondary}
              >
                View pricing
              </Button>
            </Group>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

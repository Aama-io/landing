import { Container, Button } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import c from './AboutStory.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutCTA() {
  return (
    <section className={c.section}>
      <Container size="lg">
        <motion.div
          className={c.ctaBand}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
        >
          <div className={c.ctaGlow} />
          <h2 className={c.ctaTitle}>See aama.io in action</h2>
          <p className={c.ctaDesc}>
            Book a walkthrough with our team, or explore the free tools we've built for GPs, LPs and fund
            administrators — no signup required.
          </p>
          <div className={c.ctaRow}>
            <Button
              component={Link}
              href="/contact"
              size="md"
              radius="md"
              rightSection={<IconArrowRight size={18} />}
            >
              Book a demo
            </Button>
            <Button component={Link} href="/tools" size="md" radius="md" variant="white" color="dark">
              Explore the free tools
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

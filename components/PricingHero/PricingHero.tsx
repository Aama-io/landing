import type { CSSProperties } from 'react';
import { Container, Title, Text, Group } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import s from '@/components/ui/tool.module.css';

const ease = [0.22, 1, 0.36, 1] as const;
const item: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14.5, color: 'var(--text-muted)' };

export function PricingHero() {
  return (
    <section className={s.hero}>
      <div className={s.heroGlow} />
      <Container size="lg" className={s.heroInner}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <span className={s.pill}>Pricing</span>
          <Title className={s.heroTitle}>
            Institutional-grade at <span className={s.accent}>startup-friendly pricing</span>
          </Title>
          <Text className={s.heroDesc}>
            Institutional-grade fund management software at startup-friendly pricing — designed to help Singaporean fund
            managers scale, stay compliant and delight investors.
          </Text>
          <Group justify="center" gap={28} mt={28}>
            <span style={item}><IconCircleCheck size={18} style={{ color: 'var(--mantine-color-blue-6)' }} /><span><strong style={{ color: 'var(--text-strong)' }}>SaaS subscription</strong> — monthly or yearly</span></span>
            <span style={item}><IconCircleCheck size={18} style={{ color: 'var(--mantine-color-blue-6)' }} /><span><strong style={{ color: 'var(--text-strong)' }}>All-inclusive</strong> — support &amp; maintenance</span></span>
          </Group>
        </motion.div>
      </Container>
    </section>
  );
}

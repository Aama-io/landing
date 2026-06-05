import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Container, Text, Title, Group } from '@mantine/core';
import { IconMail, IconCalendar } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';
import s from '@/components/ui/tool.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

const card: CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
  width: 190, padding: '20px 18px', borderRadius: 16, background: 'var(--surface)',
  border: '1px solid var(--border)', boxShadow: 'var(--mantine-shadow-xs)', textDecoration: 'none',
};
const iconChip: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42,
  borderRadius: 11, background: 'var(--gradient-brand)', color: '#fff', boxShadow: '0 8px 18px rgba(31,90,255,0.26)',
};

export function ContactHero() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { styles: { branding: { brandColor: '#1f5aff' } } });
    })();
  }, []);

  return (
    <section className={s.hero}>
      <div className={s.heroGlow} />
      <Container size="lg" className={s.heroInner}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <span className={s.pill}>Contact us</span>
          <Title className={s.heroTitle}>
            Ready to transform your <span className={s.accent}>fund management?</span>
          </Title>
          <Text className={s.heroDesc}>
            Have questions about our fund management platform? Our team is ready to assist you with personalized support.
          </Text>

          <Group justify="center" gap={16} mt={32}>
            <a href="mailto:contact@aama.io" style={card}>
              <span style={iconChip}><IconMail size={20} stroke={1.7} /></span>
              <Text fw={700} mt="sm" size="sm">Email us</Text>
              <Text size="sm" c="dimmed">contact@aama.io</Text>
            </a>
            <a href="https://cal.com/aamaio/30min" target="_blank" rel="noopener noreferrer" style={card}>
              <span style={iconChip}><IconCalendar size={20} stroke={1.7} /></span>
              <Text fw={700} mt="sm" size="sm">Schedule a meeting</Text>
              <Text size="sm" c="dimmed">Book a time</Text>
            </a>
          </Group>
        </motion.div>
      </Container>
    </section>
  );
}

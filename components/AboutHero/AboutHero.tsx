import { Container, Title, Text } from '@mantine/core';
import { IconCalendarStats, IconUsersGroup, IconAward } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import s from '@/components/ui/tool.module.css';

const stats = [
  { icon: IconCalendarStats, value: '2022', label: 'Founded' },
  { icon: IconUsersGroup, value: '10+', label: 'Team members' },
  { icon: IconAward, value: '10+', label: 'Years of experience' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutHero() {
  return (
    <section className={s.hero}>
      <div className={s.heroGlow} />
      <Container size="lg" className={s.heroInner}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <span className={s.pill}>Our vision</span>
          <Title className={s.heroTitle}>
            Revolutionizing fund administration <br />through <span className={s.accent}>technology</span>
          </Title>
          <Text className={s.heroDesc}>
            aama.io combines deep fund-administration expertise with modern technology to build the next generation of
            tools that fund managers, fund admins, GPs and family offices actually want to use.
          </Text>
        </motion.div>

        <motion.div
          className={s.kpiGrid}
          data-cols="3"
          style={{ maxWidth: 620, margin: '40px auto 0' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          {stats.map((st) => (
            <div key={st.label} className={s.kpiCard} style={{ textAlign: 'center' }}>
              <span className={s.kpiIcon}><st.icon size={18} stroke={1.7} /></span>
              <div className={s.kpiVal} style={{ marginTop: 10 }}>{st.value}</div>
              <div className={s.kpiLabel}>{st.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

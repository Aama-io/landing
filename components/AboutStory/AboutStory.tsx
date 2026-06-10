import { Container } from '@mantine/core';
import { IconBriefcase, IconShieldCheck, IconLayoutGrid, IconSparkles } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import s from '@/components/ui/tool.module.css';
import c from './AboutStory.module.css';

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const panelStats = [
  { value: '2022', label: 'Founded in Singapore' },
  { value: '13+', label: 'Free fund tools' },
  { value: '100%', label: 'IFRS-based accounting' },
];

const values = [
  {
    icon: IconBriefcase,
    title: 'Built by operators',
    desc: 'We pair deep fund-management and compliance experience with modern engineering — so the platform reflects how funds actually run, not how software thinks they should.',
  },
  {
    icon: IconShieldCheck,
    title: 'Accuracy is the product',
    desc: 'NAVs, capital accounts and ledgers leave no room for "close enough". Everything is IFRS-based and audit-ready by default.',
  },
  {
    icon: IconLayoutGrid,
    title: 'One platform, end to end',
    desc: 'Administration, accounting and the investor portal share one source of truth — no handoffs, no rekeying, no reconciliation between disconnected systems.',
  },
  {
    icon: IconSparkles,
    title: 'Tools people enjoy using',
    desc: 'From the GP dashboard to our free calculators, we obsess over clarity. Powerful underneath, effortless on the surface.',
  },
];

export function AboutStory() {
  return (
    <>
      {/* Our story */}
      <section className={c.section}>
        <Container size="lg">
          <motion.div className={c.head} {...reveal} transition={{ duration: 0.55, ease }}>
            <span className={c.eyebrow}>Our story</span>
            <h2 className={c.title}>
              Fund operations were stuck in <span className={s.accent}>spreadsheets</span>
            </h2>
            <p className={c.lead}>
              So we set out to replace the patchwork of disconnected admin tools, accounting systems and email
              threads with a single platform built for the way modern funds actually operate.
            </p>
          </motion.div>

          <div className={c.storyGrid}>
            <motion.div {...reveal} transition={{ duration: 0.55, delay: 0.05, ease }}>
              <p className={c.storyPara}>
                aama.io began in 2022, born from a simple frustration: the people running funds — GPs, family
                offices and fund administrators — were spending more time wrangling reconciliations and rebuilding
                reports than making decisions. The tools were fragmented, the data never agreed, and every
                month-end felt like starting over.
              </p>
              <p className={c.storyPara}>
                Our founders had lived both sides of the problem — <strong>traditional finance and compliance</strong>{' '}
                on one hand, <strong>scalable, cloud-native engineering</strong> on the other. They believed fund
                administration, accounting and investor reporting belonged on one connected platform, with accuracy
                and transparency built in rather than bolted on.
              </p>
              <p className={c.storyPara}>
                Today, from our base in Singapore, that belief drives everything we ship — and a growing suite of{' '}
                <strong>free, no-signup tools</strong> that put the same rigour in the hands of the whole industry.
              </p>
            </motion.div>

            <motion.div
              className={c.panel}
              {...reveal}
              transition={{ duration: 0.6, delay: 0.12, ease }}
            >
              <div className={c.panelGlow} />
              <p className={c.panelQuote}>
                “We're building the operating system for the modern fund — one place where the numbers always agree.”
              </p>
              <div className={c.panelDivider} />
              <div className={c.panelStats}>
                {panelStats.map((st) => (
                  <div key={st.label}>
                    <div className={c.panelStatVal}>{st.value}</div>
                    <div className={c.panelStatLabel}>{st.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* What we believe */}
      <section className={`${c.section} ${c.sectionAlt}`}>
        <Container size="lg">
          <motion.div className={c.head} {...reveal} transition={{ duration: 0.55, ease }}>
            <span className={c.eyebrow}>What we believe</span>
            <h2 className={c.title}>
              The principles behind <span className={s.accent}>every release</span>
            </h2>
            <p className={c.lead}>
              Four convictions shape what we build and how we build it.
            </p>
          </motion.div>

          <div className={c.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...reveal}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease }}
              >
                <div className={c.valueCard}>
                  <span className={c.valueIcon}>
                    <v.icon size={22} stroke={1.7} />
                  </span>
                  <div className={c.valueTitle}>{v.title}</div>
                  <p className={c.valueDesc}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

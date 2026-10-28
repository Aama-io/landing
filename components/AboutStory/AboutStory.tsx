import { Container } from '@mantine/core';
import { IconBriefcase, IconShieldCheck, IconLayoutGrid, IconSparkles } from '@tabler/icons-react';
import { Reveal } from '../ui/Reveal';
import { ClientLogos } from '../ClientLogos/ClientLogos';
import s from '../AboutHero/About.module.css';

const TIMELINE = [
  {
    when: '2022',
    title: 'Founded in Singapore',
    body: 'The founders had worked both sides of the problem: traditional finance and compliance on one side, cloud-native engineering on the other. They set out to put fund administration, accounting and investor reporting on one connected platform.',
  },
  {
    when: 'In production',
    title: 'Proven at regulated firms',
    body: 'The fund accounting core went live at regulated capital-markets firms, calculating NAV daily across open- and closed-end funds. It has run there for over two years, with zero data loss across migrations.',
  },
  {
    when: 'Today',
    title: 'From funds to SPVs, with free tools',
    body: 'The same engine now runs SPVs and syndicates, an LP portal that is free through your first close, and a growing set of free fund tools for the whole industry.',
  },
];

const PRINCIPLES = [
  {
    icon: IconBriefcase,
    title: 'Built by operators',
    desc: 'We pair fund-management and compliance experience with engineering, so the platform reflects how funds actually run, not how software assumes they do.',
  },
  {
    icon: IconShieldCheck,
    title: 'Accuracy is the product',
    desc: 'NAVs, capital accounts and ledgers leave no room for "close enough". Accounting follows IFRS and every change leaves an audit trail.',
  },
  {
    icon: IconLayoutGrid,
    title: 'One platform, end to end',
    desc: 'Administration, accounting and the investor portal share one source of truth, so nothing is re-keyed or reconciled between disconnected systems.',
  },
  {
    icon: IconSparkles,
    title: 'Tools people enjoy using',
    desc: 'From the GP dashboard to our free calculators, we work on clarity. Capable underneath, simple on the surface.',
  },
];

export function AboutStory() {
  return (
    <>
      {/* Clients */}
      <section className={s.proof}>
        <Container size="xl">
          <span className={s.proofLabel}>Trusted by</span>
          <ClientLogos />
        </Container>
      </section>

      {/* Story */}
      <section className={s.section}>
        <Container size="xl">
          <div className={s.split}>
            <Reveal>
              <div className={s.splitIntro}>
                <span className={s.eyebrow}>Our story</span>
                <h2 className={s.h2}>Fund operations were stuck in spreadsheets</h2>
                <p className={s.lead}>
                  People running funds were spending more time reconciling and rebuilding reports than making
                  decisions. The tools were fragmented, the data never agreed, and every month-end started over.
                </p>
                <p className={s.quote}>We are building the operating system for the modern fund: one place where the numbers always agree.</p>
              </div>
            </Reveal>

            <ol className={s.timeline}>
              {TIMELINE.map((t, i) => (
                <li key={t.title} className={s.tItem}>
                  <span className={s.tDot} />
                  <Reveal delay={i * 0.06}>
                    <div className={s.tWhen}>{t.when}</div>
                    <h3 className={s.tTitle}>{t.title}</h3>
                    <p className={s.tBody}>{t.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="xl">
          <Reveal>
            <span className={s.eyebrow}>What we believe</span>
            <h2 className={s.h2}>The principles behind every release</h2>
          </Reveal>
          <div className={s.rows}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title}>
                <div className={s.row}>
                  <span className={s.rowNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={s.rowTitle}>
                    <span className={s.rowIcon}><p.icon size={20} stroke={1.7} /></span>
                    {p.title}
                  </div>
                  <p className={s.rowBody}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

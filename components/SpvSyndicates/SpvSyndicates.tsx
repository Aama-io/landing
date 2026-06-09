import { Container, Title, Text, Button, Accordion } from '@mantine/core';
import {
  IconArrowRight, IconArrowLeft, IconRocket, IconUsersGroup, IconShieldCheck,
  IconReportMoney, IconCheck, IconReportAnalytics, IconCircleCheckFilled,
  IconCoin, IconArrowsExchange, IconCurrencyDollar, IconUserCheck, IconBriefcase,
  IconFileText, IconWallet, IconLayoutDashboard, IconBuildingBank,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import s from './SpvSyndicates.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

const audiences = [
  { icon: IconUsersGroup, title: 'Syndicate leads', desc: 'Pool members into a deal, automate your carry and keep everyone updated.' },
  { icon: IconRocket, title: 'Emerging managers', desc: 'Run deal-by-deal without standing up a full fund for every opportunity.' },
  { icon: IconBriefcase, title: 'Co-investors & family offices', desc: 'Spin up fee-light sidecars alongside the main fund, cleanly separated.' },
  { icon: IconBuildingBank, title: 'Founders raising', desc: 'Take many investors onto one clean cap table through a single vehicle.' },
];

const steps = [
  { n: '01', icon: IconRocket, title: 'Spin up the vehicle', desc: 'Templated SPV or syndicate setup with subscription documents, share classes and an automated cap table — live in days.' },
  { n: '02', icon: IconUserCheck, title: 'Onboard members', desc: 'Invite members and collect commitments with built-in KYC/AML, accreditation checks and e-signatures.' },
  { n: '03', icon: IconReportMoney, title: 'Run the deal', desc: 'Track capital, automate lead carry and deal fees, and model deal-by-deal distribution waterfalls to the cent.' },
  { n: '04', icon: IconReportAnalytics, title: 'Account & report', desc: 'NAV, a full general ledger and IFRS-ready statements — plus member capital accounts, statements and tax packs.' },
];

const pillars = [
  { icon: IconLayoutDashboard, title: 'Vehicle formation & cap table', desc: 'Stand up a single-asset SPV or syndicate and manage ownership from day one.', items: ['Launch in days, not weeks', 'Automated cap table & ownership ledger', 'Multiple share classes & side letters'] },
  { icon: IconShieldCheck, title: 'Member KYC & onboarding', desc: 'Bring members in with compliance built into every step.', items: ['KYC/AML with e-signatures', 'Accreditation & eligibility checks', 'Commitment & funding tracking'] },
  { icon: IconFileText, title: 'Documents & data room', desc: 'Every agreement, notice and statement in one secure place.', items: ['Subscription & side-letter docs', 'Deal-level document vault', 'Secure member messaging'] },
  { icon: IconWallet, title: 'Capital & payments', desc: 'Move money in and out without the spreadsheet chase.', items: ['Capital collection & tracking', 'Distributions & payout instructions', 'Reconciliation with bank accounts'] },
  { icon: IconUsersGroup, title: 'Investor portal', desc: 'A white-labeled portal that gives members a real-time view.', items: ['Real-time positions & statements', 'Deal updates & notices', 'Tax and year-end packs'] },
  { icon: IconReportMoney, title: 'Economics & accounting', desc: 'The differentiator — a real fund-accounting engine, not a spreadsheet.', items: ['Lead carry & deal-fee automation', 'NAV, general ledger & IFRS statements', 'Deal-by-deal distribution waterfalls'] },
];

const accountingTools = [
  { href: '/tools/bond-je-generator', icon: IconCoin, label: 'Bond Accounting JE', desc: 'IFRS 9 amortised cost' },
  { href: '/tools/fx-revaluation-je', icon: IconArrowsExchange, label: 'FX Revaluation JE', desc: 'IAS 21 closing rate' },
  { href: '/tools/subscription-redemption-je', icon: IconCurrencyDollar, label: 'Subscription / Redemption JE', desc: 'Unit pricing & NAV impact' },
];

const useCases = [
  { title: 'Angel & operator syndicates', desc: 'Pool angels into a single deal with a clean cap table, fast onboarding and automated carry for the lead.', metrics: [['Setup', 'Days'], ['Members / deal', '100+'], ['Carry', 'Automated']] },
  { title: 'Co-investment sidecars', desc: 'Run fee-light co-invest vehicles alongside the main fund, with separate accounting and reporting.', metrics: [['Reporting', '75% faster'], ['Fee models', 'Flexible']] },
  { title: 'Single-deal SPVs', desc: 'Hold a single asset or company in a dedicated vehicle with full administration and investor servicing.', metrics: [['Time saved', '15 hrs/deal'], ['Accuracy', '99.9%']] },
];

const faqs = [
  { q: 'Is an SPV just a single-asset fund?', a: 'Effectively, yes. An SPV is administered as a focused, single-asset fund — one deal or asset, a lead and a group of members. You get the same accounting engine, investor portal and compliance that runs multi-asset funds, scaled to the simpler structure.' },
  { q: 'How quickly can I launch an SPV or syndicate?', a: 'Most single-asset vehicles can be stood up in a few days. Templated setup, subscription documents and e-signature onboarding let you open a vehicle, invite members and start collecting commitments without building anything from scratch.' },
  { q: 'Can the platform handle lead carry and deal fees?', a: 'Yes. Configure carried interest, management or one-off deal fees and a hurdle per vehicle. The system calculates the lead’s carry and member distributions on a deal-by-deal basis and produces statements automatically.' },
  { q: 'Do members get their own portal?', a: 'Every member gets a white-labeled portal with real-time positions, capital account statements, documents and deal updates — the same investor experience your fund LPs receive.' },
  { q: 'Can I run many SPVs at once?', a: 'Yes. The platform is multi-entity by design, so serial dealmakers can manage dozens of SPVs and syndicates from one dashboard with consolidated cap tables, accounting and reporting across every vehicle.' },
];

export function SpvSyndicates() {
  return (
    <>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <div className={s.heroCopy}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <Link href="/solutions" className={s.back}><IconArrowLeft size={15} /> All solutions</Link>
              <span className={s.pill}>Single-asset funds · SPVs &amp; syndicates</span>
              <Title className={s.title}>
                Launch and run SPVs <span className={s.accent}>in days.</span> We handle the rest.
              </Title>
              <Text className={s.subtitle}>
                An SPV is a single-asset fund — and aama.io administers it end to end: rapid vehicle setup, member
                KYC/AML onboarding, lead carry and deal-by-deal distributions, all on a real fund-accounting engine
                with NAV, a general ledger and IFRS-ready reporting.
              </Text>
              <div className={s.ctaRow}>
                <Button component={Link} href="/contact" size="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>Book a demo</Button>
                <Button component={Link} href="/product" size="md" variant="default" className={s.secondary}>Explore the platform</Button>
              </div>
              <div className={s.assurance}>
                <span className={s.assItem}><IconCircleCheckFilled size={16} className={s.assIcon} /> Live in days</span>
                <span className={s.assItem}><IconCircleCheckFilled size={16} className={s.assIcon} /> KYC/AML built in</span>
                <span className={s.assItem}><IconCircleCheckFilled size={16} className={s.assIcon} /> MAS &amp; IFRS aligned</span>
              </div>
            </motion.div>
          </div>

          <motion.div className={s.heroShot} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}>
            <div className={s.frame}>
              <div className={s.frameBar}>
                <span className={s.dot} data-c="r" /><span className={s.dot} data-c="y" /><span className={s.dot} data-c="g" />
                <span className={s.url}>app.aama.io/vehicles</span>
              </div>
              <div className={s.frameBody}>
                <Image src="/images/fund-investors.png" alt="aama.io SPV investor portal" width={1280} height={820} className={s.shot} priority />
              </div>
            </div>
            <motion.div className={s.floatCard} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8, ease }}>
              <span className={s.floatIcon}><IconReportMoney size={18} /></span>
              <div>
                <Text className={s.floatLabel}>Lead carry</Text>
                <Text className={s.floatValue}>Automated · 20%</Text>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Audiences */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="lg">
          <SectionHeading
            eyebrow="Who it's for"
            title="Built for the people running deals"
            description="Syndicate leads, emerging managers and co-investors use aama.io to run single-asset vehicles with the rigour of a fund — and a fraction of the overhead."
          />
          <div className={s.audGrid}>
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 0.07}>
                <div className={s.audCard}>
                  <span className={s.audIcon}><a.icon size={22} stroke={1.7} /></span>
                  <div className={s.audTitle}>{a.title}</div>
                  <div className={s.audDesc}>{a.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className={s.section}>
        <Container size="lg">
          <SectionHeading eyebrow="How it works" title="From a handshake to a closed deal" description="Four steps from opening a vehicle to accounting for it — most leads get from setup to first commitment in days." />
          <div className={s.steps}>
            {steps.map((st, i) => (
              <Reveal key={st.n} delay={(i % 4) * 0.06}>
                <div className={s.step}>
                  <div className={s.stepTop}>
                    <span className={s.stepNum}>{st.n}</span>
                    <span className={s.stepIcon}><st.icon size={20} stroke={1.7} /></span>
                  </div>
                  <div className={s.stepTitle}>{st.title}</div>
                  <div className={s.stepDesc}>{st.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Capability pillars */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="lg">
          <SectionHeading eyebrow="Everything in one place" title="The full SPV stack — plus the accounting" description="Formation, compliance, documents, payments and an investor portal — and, unlike a pure SPV administrator, a real fund-accounting engine underneath." />
          <div className={s.pillarGrid}>
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.07}>
                <div className={s.pillar} data-feature={p.title === 'Economics & accounting' ? '' : undefined}>
                  <span className={s.pillarIcon}><p.icon size={22} stroke={1.7} /></span>
                  <div className={s.pillarTitle}>{p.title}</div>
                  <div className={s.pillarDesc}>{p.desc}</div>
                  <ul className={s.pillarList}>
                    {p.items.map((it) => (
                      <li key={it}><IconCheck size={15} className={s.pillarCheck} /> {it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Accounting differentiator */}
      <section className={s.section}>
        <Container size="lg">
          <div className={s.acctBand}>
            <div className={s.acctCopy}>
              <span className={s.acctEyebrow}>Why aama.io</span>
              <h2 className={s.acctTitle}>A real fund-accounting engine, not a spreadsheet</h2>
              <p className={s.acctDesc}>
                Most SPV platforms stop at formation and admin. aama.io runs the books too — the same multi-instrument
                accounting that powers multi-asset funds, scaled to a single-deal vehicle. NAV, a general ledger,
                IFRS-ready statements and automated fee, carry and waterfall logic.
              </p>
              <Link href="/tools" className={s.acctLink}>Try our free fund-accounting tools <IconArrowRight size={16} /></Link>
            </div>
            <div className={s.acctTools}>
              {accountingTools.map((t) => (
                <Link key={t.href} href={t.href} className={s.toolCard}>
                  <span className={s.toolIcon}><t.icon size={20} stroke={1.7} /></span>
                  <div className={s.toolBody}>
                    <div className={s.toolLabel}>{t.label}</div>
                    <div className={s.toolDesc}>{t.desc}</div>
                  </div>
                  <IconArrowRight size={16} className={s.toolArrow} />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="lg">
          <SectionHeading eyebrow="Use cases" title="One vehicle, many ways to use it" />
          <div className={s.useGrid}>
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={(i % 3) * 0.07}>
                <div className={s.useCard}>
                  <div className={s.useTitle}>{u.title}</div>
                  <div className={s.useDesc}>{u.desc}</div>
                  <div className={s.useMetrics}>
                    {u.metrics.map(([label, value]) => (
                      <div key={label} className={s.useMetric}>
                        <span className={s.useMetricLabel}>{label}</span>
                        <span className={s.useMetricValue}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className={s.section}>
        <Container size="md">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <Reveal>
            <Accordion variant="separated" radius="md" chevronPosition="right" className={s.faq}>
              {faqs.map((f, i) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control><span className={s.faqQ}>{f.q}</span></Accordion.Control>
                  <Accordion.Panel><span className={s.faqA}>{f.a}</span></Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className={s.ctaSection}>
        <Container size="lg">
          <div className={s.ctaCard}>
            <div className={s.ctaGlow} />
            <h2 className={s.ctaTitle}>Launch your next SPV on aama.io</h2>
            <p className={s.ctaDesc}>Set up the vehicle, onboard members and account for the deal — all in one place. See it on your own structure.</p>
            <div className={s.ctaRow}>
              <Button component={Link} href="/contact" size="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>Book a demo</Button>
              <Button component={Link} href="/pricing" size="md" variant="white" className={s.ctaSecondary}>View pricing</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

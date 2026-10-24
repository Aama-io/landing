import { Accordion, Button, Container, ThemeIcon } from '@mantine/core';
import {
  IconArrowRight, IconArrowUpRight, IconChartLine, IconCheck, IconCircleCheckFilled, IconFileText,
  IconFlag, IconReportMoney, IconRocket, IconSend, IconShieldCheck, IconUserPlus,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import s from './EmergingManagers.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

const APPLY_HREF = '/contact';

// The LP portal as described on the product pages: onboarding, positions, capital calls,
// statements and a document vault. Fund accounting is deliberately not in this list.
const heroPoints = [
  'Free through your first close, then pay for what you run',
  'Up to 10 investors, your own entity not counted',
  'No card required, open to fund managers worldwide',
];

const offerRows = [
  { label: 'Investors', value: 'Up to 10' },
  { label: 'Capital calls', value: 'Included' },
  { label: 'Document sharing', value: 'Included' },
  { label: 'Fund accounting', value: 'Add when you raise' },
];

const included = [
  { icon: IconRocket, title: 'Fund set-up', body: 'Create your fund and its investor register in minutes.' },
  { icon: IconUserPlus, title: 'Invite investors', body: 'Bring LPs into the aama.io portal with a single invite.' },
  { icon: IconShieldCheck, title: 'KYC/AML onboarding', body: 'Collect investor identity and compliance details in one place.' },
  { icon: IconReportMoney, title: 'Capital calls', body: 'Send capital calls. LPs pay your bank account and record the payment.' },
  { icon: IconChartLine, title: 'Positions and statements', body: 'Investors see their positions and statements in the portal.' },
  { icon: IconFileText, title: 'Document sharing', body: 'Share subscription documents, notices and reports through a secure vault.' },
];

const paths = [
  {
    tag: 'First fund',
    title: 'Free through your first close',
    text: 'Up to 10 investors, and your own entity does not count towards the 10.',
    points: [
      'Fund set-up, investor invites and KYC/AML onboarding',
      'Capital calls, payment tracking and document sharing',
      'Mark your first close, then choose your plan',
    ],
    primary: true,
  },
  {
    tag: 'Larger funds',
    title: 'Pay when you collect',
    text: 'More than 10 investors, or a bigger raise? You never pay before the fund raises.',
    points: [
      'The same LP portal, with no fees until your first LP payment is recorded',
      'The paid plan for your fund type starts after that payment',
      'You are told before anything is charged',
    ],
    primary: false,
  },
];

const journey = [
  {
    when: 'Step one',
    title: 'Bring your fund, or form one with us',
    body: 'Already formed? Set it up on aama.io. Not formed yet? We can help you form it. Third-party formation costs are charged at cost.',
  },
  {
    when: 'Step two',
    title: 'Raise your capital',
    body: 'Invite investors into the aama.io portal, onboard them, send capital calls and share documents. LPs pay your fund’s bank account directly and record the payment.',
  },
  {
    when: 'First close',
    title: 'Close your first round',
    body: 'Investors see their positions, notices and documents in one place, without email attachments. Still free.',
  },
  {
    when: 'Step three',
    title: 'Run full operations',
    body: 'Once you have raised, move to the plan for your fund type and run the whole fund on aama.io: fund accounting, NAV, waterfalls, IFRS 9 / SFRS(I) 9 and reporting.',
  },
];

const comparison: { label: string; emerging: string; collect: string }[] = [
  { label: 'Who it is for', emerging: 'First fund, up to 10 investors', collect: 'Larger funds, or more than 10 investors' },
  { label: 'Free until', emerging: 'Your first close is completed', collect: 'Your first LP payment is recorded' },
  { label: 'Raising capital: LP portal, invites, capital calls, documents', emerging: 'Free', collect: 'Free until the first payment' },
  { label: 'Investor portal', emerging: 'The aama.io portal', collect: 'The aama.io portal' },
  { label: 'Running the fund: accounting, NAV, waterfalls, IFRS 9', emerging: 'Paid plans', collect: 'Paid plans' },
  { label: 'White-label branding, API access', emerging: 'Paid plans', collect: 'Paid plans' },
  { label: 'After the free period', emerging: 'Plan for your fund type', collect: 'Plan for your fund type' },
  { label: 'Legal formation, registration fees, e-KYC checks', emerging: 'At cost', collect: 'At cost' },
];

export const EM_FAQS: { q: string; a: string }[] = [
  {
    q: 'What does the free offer include?',
    a: 'The aama.io LP portal: set up your fund, invite investors, onboard them with KYC/AML, send capital calls, track the payments LPs record, and share documents. Fund accounting is not included.',
  },
  {
    q: 'Do I need a fund that is already formed?',
    a: 'No. If your fund is already formed, you set it up on aama.io. If it is not, we can help you form it, and third-party formation costs are charged at cost. Then you raise your capital on the LP portal.',
  },
  {
    q: 'What happens once I have raised capital?',
    a: 'You move to the plan for your fund type and run full fund operations on aama.io, including fund accounting, NAV, waterfalls and IFRS 9 / SFRS(I) 9 reporting.',
  },
  {
    q: 'Does it include fund accounting?',
    a: 'No. The free offer covers the LP portal only. Fund accounting, including the ledger, NAV, waterfalls and IFRS 9 / SFRS(I) 9, is part of the paid plans, and you can add it when you are ready.',
  },
  {
    q: 'What does “pay when you collect” mean?',
    a: 'You pay nothing until your first LP records a payment against a capital call. If no payment has been recorded 60 days after your first investor accepts an invite, the paid plan starts anyway.',
  },
  {
    q: 'How long is the Emerging Manager offer free?',
    a: 'It is free through your first close, for one fund with up to 10 investors. Your own entity does not count towards the 10. After the first close you move to the plan for your fund type, and we tell you before anything is charged.',
  },
  {
    q: 'What counts as the first close?',
    a: 'You mark it in the platform when you close the first round of commitments. If you have not marked a close within 90 days of your first recorded payment, the paid plan starts.',
  },
  {
    q: 'Does aama.io hold our money?',
    a: 'No. LPs pay your fund’s bank account directly and record the payment in the platform. aama.io does not receive or move investor funds.',
  },
  {
    q: 'What happens if I add an 11th investor or a second fund?',
    a: 'You move to the plan for your fund type. We tell you before anything is charged.',
  },
  {
    q: 'Is anything not free?',
    a: 'Third-party costs such as legal formation, registration fees and e-KYC checks are charged at cost. Fund accounting, white-label branding and API access are part of paid plans. Your investors use the aama.io portal.',
  },
  {
    q: 'Will this offer last?',
    a: 'No. Launch Free is a founding offer and we will close it without notice. Apply while it is open.',
  },
  {
    q: 'Can I use Launch Free for debt funds or note programmes?',
    a: 'Yes. The LP portal supports note issuance, including principal, interest, maturity and conversion terms, so promissory notes and convertible note can be raised and tracked alongside funds. Choose “Debt or note programme” as your fund type when you apply, and we will confirm how the free period applies to your structure. Whether and how you can offer notes to investors depends on your jurisdiction, so check with your legal adviser.',
  },
  {
    q: 'Who is Launch Free for?',
    a: 'First-time and emerging fund managers, SPV leads, syndicate leads and debt or note issuers, anywhere in the world. We review each application to make sure the platform fits your fund.',
  },
];

export function EmergingManagers() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.glowA} />
        <div className={s.glowB} />
        <div className={s.layout}>
          <motion.div
            className={s.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className={s.pill}><IconFlag size={14} /> Founding offer · Open worldwide</span>
            <h1 className={s.title}>
              Your first close,{' '}
              <span className={s.highlight}>
                <span className={s.highlightMark} aria-hidden="true" />
                <span className={s.highlightText}>on us.</span>
              </span>
            </h1>
            <p className={s.subtitle}>
              Already have a fund, or want us to help you form one? Raise your capital on the aama.io LP portal:
              invite investors, call capital and share documents, free through your first close. Once you have
              raised, you run the whole fund on aama.io.
            </p>
            <div className={s.actions}>
              <Button component={Link} href={APPLY_HREF} size="md" radius="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>
                Claim your founding spot
              </Button>
              <Button component="a" href="#how" size="md" radius="md" variant="default" className={s.secondary}>
                See how it works
              </Button>
            </div>
            <ul className={s.capabilities}>
              {heroPoints.map((c) => (
                <li key={c} className={s.capability}>
                  <IconCircleCheckFilled size={15} className={s.capabilityIcon} />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={s.showcase}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <div className={s.stack}>
              <div className={s.backdrop} />
              <div
                className={s.offerCard}
                role="img"
                aria-label="Launch Free offer: zero platform fees until your first close, up to 10 investors, capital calls and document sharing included"
              >
                <div className={s.cardHead}>
                  <span className={s.cardTag}><span className={s.liveDot} />Launch Free</span>
                  <span className={s.cardBadge}>Founding offer · Ends without notice</span>
                </div>
                <div className={s.amountBlock}>
                  <div className={s.amountLabel}>Platform fees until your first close</div>
                  <div className={s.amountValue}>$0</div>
                  <div className={s.amountMeta}>No card required</div>
                </div>
                <div className={s.cardRows}>
                  {offerRows.map((r) => (
                    <div key={r.label} className={s.cardRow}>
                      <span className={s.cardRowLabel}>{r.label}</span>
                      <span className={s.cardRowValue}>{r.value}</span>
                    </div>
                  ))}
                </div>
                <div className={s.cardFoot}>
                  <IconShieldCheck size={14} stroke={2} />
                  Open to fund managers worldwide
                </div>
              </div>
              <motion.div
                className={s.floatCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.75, ease }}
              >
                <span className={s.floatIcon}><IconArrowUpRight size={17} /></span>
                <div>
                  <span className={s.floatLabel}>After your first close</span>
                  <span className={s.floatValue}>Run full operations</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={s.section}>
        <Container size="xl">
          <div className={s.split}>
            <div className={s.splitIntro}>
              <span className={s.eyebrow}>What you get free</span>
              <h2 className={s.h2}>The full LP portal, from set-up to statements</h2>
              <p className={s.lead}>
                Everything you need to run the investor side of your first fund. Fund accounting is a paid upgrade
                when you are ready for it.
              </p>
            </div>
            <ul className={s.rows}>
              {included.map((f, i) => (
                <Reveal key={f.title} delay={(i % 2) * 0.06}>
                  <li className={s.rowItem}>
                    <ThemeIcon size={40} radius="md" variant="light"><f.icon size={20} stroke={1.7} /></ThemeIcon>
                    <div>
                      <h3 className={s.featureTitle}>{f.title}</h3>
                      <p className={s.featureBody}>{f.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="xl">
          <div className={s.leftHead}>
            <span className={s.eyebrow}>The offer</span>
            <h2 className={s.h2}>Two ways in. You pay when the fund is working.</h2>
          </div>
          <div className={s.fork}>
            {paths.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className={p.primary ? `${s.pathPanel} ${s.pathPrimary}` : s.pathPanel}>
                  <span className={s.pathTag}>{p.tag}</span>
                  <h3 className={s.pathTitle}>{p.title}</h3>
                  <p className={s.pathText}>{p.text}</p>
                  <ul className={s.pathList}>
                    {p.points.map((pt) => (
                      <li key={pt}><IconCircleCheckFilled size={16} className={s.pathCheck} />{pt}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className={s.section} id="how">
        <Container size="xl">
          <SectionHeading
            eyebrow="Your first fund"
            title="Form it. Raise it. Then run it."
          />
          <ol className={s.timeline}>
            {journey.map((st, i) => (
              <Reveal key={st.title} delay={i * 0.07}>
                <li className={s.tlItem}>
                  <span className={s.tlDot}>{i + 1}</span>
                  <span className={s.stepWhen}>{st.when}</span>
                  <h3 className={s.stepTitle}>{st.title}</h3>
                  <p className={s.stepBody}>{st.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className={s.whySection}>
        <Container size="xl">
          <div className={s.whyCard}>
            <div className={s.whyGlow} />
            <div className={s.whyInner}>
              <span className={s.whyEyebrow}>Why we are doing this</span>
              <h2 className={s.whyTitle}>Every great fund starts with a first close.</h2>
              <p className={s.whyBody}>
                A first close can take well over a year, and first-time managers carry the most risk and the
                least tooling. We would rather help you raise properly than ask you to pay before a single dollar
                lands. We are opening this to the first funds who build on aama.io, and we will close it without
                notice.
              </p>
              <Button component={Link} href={APPLY_HREF} size="md" radius="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>
                Claim your founding spot
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="lg">
          <SectionHeading
            eyebrow="What is free"
            title="No fine print you have to hunt for"
            description="Here is exactly what costs nothing and what does not."
          />
          <Reveal delay={0.1}>
            <div className={s.table} role="table" aria-label="Launch Free offers compared">
              <div className={s.tableHead} role="row">
                <span role="columnheader" />
                <span role="columnheader">Emerging Manager</span>
                <span role="columnheader">Pay when you collect</span>
              </div>
              {comparison.map((r) => (
                <div key={r.label} className={s.tableRow} role="row">
                  <span className={s.rowLabel} role="rowheader">{r.label}</span>
                  <span className={s.rowCell} role="cell"><span className={s.mobileLabel}>Emerging Manager</span>{r.emerging}</span>
                  <span className={s.rowCell} role="cell"><span className={s.mobileLabel}>Pay when you collect</span>{r.collect}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className={s.section}>
        <Container size="lg">
          <div className={s.faqSplit}>
            <div className={s.faqIntro}>
              <span className={s.eyebrow}>FAQ</span>
              <h2 className={s.h2}>Questions before you apply</h2>
              <p className={s.lead}>
                Need pricing for larger funds or fund accounting? See <Link href="/pricing">pricing</Link>.
              </p>
            </div>
            <Accordion variant="separated" radius="md" chevronPosition="right">
              {EM_FAQS.map((f, i) => (
                <Accordion.Item key={f.q} value={`em-faq-${i}`}>
                  <Accordion.Control><span className={s.faqQ}>{f.q}</span></Accordion.Control>
                  <Accordion.Panel><span className={s.faqA}>{f.a}</span></Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      <section className={s.ctaSection}>
        <Container size="xl">
          <div className={s.ctaCard}>
            <div className={s.ctaGlow} />
            <div className={s.ctaCopy}>
              <span className={s.ctaChip}>Founding offer</span>
              <h2 className={s.ctaTitle}>Your first close, on us.</h2>
              <p className={s.ctaDesc}>
                The aama.io LP portal, free through your first close. This founding offer will end without notice, so
                tell us about your fund while it is open.
              </p>
              <div className={s.ctaRow}>
                <Button component={Link} href={APPLY_HREF} size="md" radius="md" className={s.primary} rightSection={<IconSend size={18} />}>
                  Claim your founding spot
                </Button>
                <Button component={Link} href="/pricing" size="md" radius="md" variant="default" className={s.secondary}>
                  See pricing
                </Button>
              </div>
              <ul className={s.ctaProof}>
                <li><IconCheck size={15} stroke={2.6} /> No card required</li>
                <li><IconCheck size={15} stroke={2.6} /> Up to 10 investors</li>
                <li><IconCheck size={15} stroke={2.6} /> Open worldwide</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import { Container, Accordion } from '@mantine/core';
import { IconArrowRight, IconChartLine, IconReportAnalytics, IconUsersGroup } from '@tabler/icons-react';
import Link from 'next/link';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import classes from './HomeFAQ.module.css';

// Three equal, genuinely parallel entry points — not a generic "book a demo"
// aimed at everyone. Each routes to the page that actually answers that
// visitor's question, not a booking form first.
const paths = [
  {
    icon: IconChartLine,
    label: 'Fund manager',
    desc: 'Capital calls, waterfalls, carry and LP reporting for your fund type.',
    cta: 'See the manager workflow',
    href: '/solutions/vc-pe-firms',
  },
  {
    icon: IconReportAnalytics,
    label: 'Fund administrator',
    desc: 'White-label the platform for every fund you service.',
    cta: 'See white-label options',
    href: '/products/fund-administration',
  },
  {
    icon: IconUsersGroup,
    label: 'SPV / syndicate lead',
    desc: 'Launch and administer a single-deal vehicle in days.',
    cta: 'See how SPVs launch',
    href: '/solutions/spv-syndicates',
  },
];

// Short, positioning-level FAQ for the homepage — the questions a first-time
// visitor asks before they've decided aama.io is relevant. Deeper, more
// technical questions (pricing tiers, IFRS specifics, waterfall mechanics)
// live on /faq and aren't repeated here. Exported so pages/index.tsx can build
// matching FAQPage JSON-LD from the same source.
export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: 'What is aama.io?',
    a: 'aama.io is an end-to-end fund operating system — fund administration, fund accounting and a white-labeled LP portal on one platform, built for mid-market PE, VC, private credit and family office managers, boutique fund administrators, and SPV or syndicate leads across Singapore and APAC.',
  },
  {
    q: 'Is aama.io only for Singapore funds and VCCs?',
    a: "No — aama.io is Singapore-first, with native MAS alignment and VCC sub-fund support, but it isn't Singapore-only. The same platform runs funds and single-deal SPVs structured in Cayman, BVI or Delaware, with IFRS 9 / SFRS(I) 9 accounting throughout.",
  },
  {
    q: 'Can I use aama.io for a single SPV or syndicate, not a full fund?',
    a: 'Yes. A single-deal or multi-asset SPV can be set up and administered on its own — cap table, KYC/AML, lead carry and IFRS-ready accounting — without standing up a full fund first.',
  },
  {
    q: 'How is this different from running a fund on spreadsheets or generic accounting software?',
    a: "Spreadsheets and generic bookkeeping tools don't know what a capital call, a waterfall or a preferred return is — every fund-specific calculation gets rebuilt by hand, in a new file, every time. aama.io's general ledger, NAV engine and investor portal share one data model, so capital calls, distributions, fees and carry are calculated automatically and stay reconciled.",
  },
  {
    q: 'Who is aama.io built for?',
    a: "Mid-market PE and VC fund managers, private credit managers, family offices, boutique fund administrators who service other managers' funds, and syndicate leads or founders running a single-deal SPV — anyone currently stitched together across spreadsheets, a separate LP portal and outside accounting help.",
  },
  {
    q: 'Does aama.io use AI?',
    a: 'Yes, in fund accounting. AI reads supplier invoices, bank statements and custodian statements, returns structured fields for a person to check, suggests ledger mapping and learns from earlier mappings. Nothing is posted until someone accepts it, a person posts the journal voucher, and the ledger stays the source of truth.',
  },
  {
    q: 'How much does aama.io cost?',
    a: 'Pricing scales with how you operate: fund-manager subscriptions run USD 625–5,000/month by fund type and AUM, accounting-only plans for fund administrators start at USD 1,500/month, and a single-asset SPV is a flat USD 3,900.',
  },
];

export function HomeFAQ() {
  return (
    <section className={`${classes.wrapper} section`}>
      <Container size="xl">
        <Reveal>
          <div className={classes.start}>
            <div className={classes.startGlow} aria-hidden="true" />
            <div className={classes.startCopy}>
              <h3 className={classes.startTitle}>What do you run?</h3>
              <p className={classes.startLede}>Pick the closest fit and go straight to the page built for it.</p>
              <p className={classes.startAlt}>Not sure, or just want to talk?</p>
              <div className={classes.startActions}>
                <Link href="/contact" className={classes.btnPrimary}>
                  Book a demo <IconArrowRight size={16} />
                </Link>
                <Link href="/pricing" className={classes.btnGhost}>View pricing</Link>
              </div>
            </div>

            <div className={classes.paths}>
              {paths.map((p) => (
                <Link key={p.label} href={p.href} className={classes.path}>
                  <span className={classes.pathIcon}><p.icon size={22} stroke={1.7} /></span>
                  <span className={classes.pathBody}>
                    <span className={classes.pathLabel}>{p.label}</span>
                    <span className={classes.pathDesc}>{p.desc}</span>
                    <span className={classes.pathLink}>{p.cta}</span>
                  </span>
                  <IconArrowRight size={18} className={classes.pathArrow} />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <div className={classes.divider} />

        <SectionHeading
          eyebrow="FAQ"
          title="Before you talk to us"
          description="The questions we hear most before a demo. For pricing detail, IFRS specifics and platform mechanics, see the full FAQ."
        />

        <Reveal delay={0.1}>
          <Accordion variant="separated" radius="md" chevronPosition="right" className={classes.faq}>
            {HOME_FAQS.map((f, i) => (
              <Accordion.Item key={f.q} value={`faq-${i}`}>
                <Accordion.Control><span className={classes.faqQ}>{f.q}</span></Accordion.Control>
                <Accordion.Panel><span className={classes.faqA}>{f.a}</span></Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Reveal>

        <Link href="/faq" className={classes.seeAll}>
          See all FAQs <IconArrowRight size={16} />
        </Link>
      </Container>
    </section>
  );
}

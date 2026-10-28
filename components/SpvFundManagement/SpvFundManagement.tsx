import { useState } from 'react';
import { Accordion, Badge, Button, Container, Paper, SegmentedControl, Tabs, ThemeIcon } from '@mantine/core';
import {
  IconArrowRight, IconBox, IconBook2, IconCalculator, IconCheck, IconCircleCheckFilled, IconDatabase, IconFileText,
  IconLayoutDashboard, IconReportAnalytics, IconReportMoney, IconRocket, IconUserCheck, IconUsersGroup, IconVocabulary,
  IconWallet, IconX,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ToolDemoCal } from '@/components/tools/ToolDemoCal';
import s from './SpvFundManagement.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

export const SPV_FAQS = [
  {
    q: 'How is it different from a pure SPV administration tool?',
    a: 'Most SPV tools stop at formation, documents and capital collection, and leave the books to an accountant. aama.io also runs a double-entry general ledger, NAV and IFRS-ready financial statements, so the accounting is produced from the same records as the cap table and the waterfall.',
  },
  {
    q: 'Do I pay before my SPV raises?',
    a: 'No. Under the founding offer you set up your SPV, invite your investors and call capital first. The SPV fee starts once your first LP payment is recorded, or 60 days after your first investor accepts an invite if no payment has been recorded by then. It applies to single SPVs and to syndicates. Government and registry fees are extra and paid at cost, and are not included in the SPV fee. The offer ends without notice.',
  },
  {
    q: 'Do I still need a fund administrator or accountant?',
    a: 'You can run the vehicle yourself on the platform, or give your administrator and accountant access to the same records. The software does not replace the legal, tax and audit advice an SPV still needs.',
  },
  {
    q: 'How quickly can an SPV go live?',
    a: 'Most vehicles can be stood up in a few days. Templated setup, subscription documents and e-signature onboarding mean you can open a vehicle, invite members and start collecting commitments without building anything first.',
  },
  {
    q: 'Can I run many SPVs at once?',
    a: 'Yes. The platform is multi-entity by design, so serial dealmakers can manage many SPVs and syndicates from one dashboard, with consolidated cap tables, accounting and reporting across every vehicle.',
  },
  {
    q: 'Does it support single-asset and multi-asset SPVs?',
    a: 'Yes. A vehicle can hold one asset or several. You get the same onboarding, economics, accounting and member portal either way.',
  },
  {
    q: 'Is this a product or a solution?',
    a: 'It is a product: a complete SPV management platform you license. It is built on aama.io Fund Administration & Investor Portal and Fund Accounting, which share one data model, and it is configured for single- and multi-asset SPVs and syndicates.',
  },
  {
    q: 'What is end-to-end SPV fund management?',
    a: 'It means one system covers the whole life of a deal vehicle: forming the SPV and cap table, onboarding members with KYC/AML, collecting capital, calculating lead carry and distributions, keeping the general ledger and NAV, and giving members a portal with statements. Nothing is re-keyed between tools.',
  },
];

const without = [
  'A member asks for their position and you rebuild it from three files',
  'A side letter lands and the carry is recalculated by hand',
  'A wire arrives and nobody can say which member and which call it belongs to',
  'The accountant sees the numbers weeks after the deal closes',
];

const withAama = [
  'A position is one screen, with every transaction behind it',
  'Side-letter terms flow into the waterfall when they are set',
  'Each payment is matched to a member and a capital call',
  'The books update as events post, so year-end is a review, not a rebuild',
];

const stages = [
  {
    n: '01', icon: IconRocket, title: 'Form the vehicle',
    desc: 'Stand up a single- or multi-asset SPV or syndicate from a template.',
    items: ['Templated vehicle and subscription documents', 'Share classes and an automated cap table', 'Multi-entity: many SPVs from one dashboard'],
    links: [['Formation checklist','/tools/spv-formation-checklist'],['Jurisdiction comparator','/tools/spv-jurisdiction-comparator'],['Formation cost','/tools/spv-cost-estimator'],['SPV best practices','/blog/spv-administration-best-practices']],
  },
  {
    n: '02', icon: IconUserCheck, title: 'Onboard members',
    desc: 'Bring members in with compliance built into each step.',
    items: ['KYC/AML and accreditation checks', 'E-signatures and commitment tracking', 'Entity and joint-holder support'],
    links: [['What is a syndicate?','/learn/fund-operations/syndicate'],['Syndicates vs invite links','/blog/true-syndicates-vs-invite-links'],['Why founders use SPVs','/blog/why-vcs-founders-use-spvs']],
  },
  {
    n: '03', icon: IconWallet, title: 'Collect and move capital',
    desc: 'Raise, call and pay out without the spreadsheet chase.',
    items: ['Capital calls and funding tracking', 'Payment instructions and bank reconciliation', 'Commitments against unfunded capital'],
    links: [['What is a capital call?','/learn/fund-operations/capital-call'],['Capital call schedule','/tools/capital-call-schedule'],['Drawdown notice','/tools/drawdown-notice']],
  },
  {
    n: '04', icon: IconReportMoney, title: 'Run the deal economics',
    desc: 'Get carry, fees and distributions right, deal by deal.',
    items: ['Lead carry, hurdle and catch-up', 'Management and one-off deal fees', 'Per-member side-letter overrides'],
    links: [['Carried interest','/learn/fund-economics/carried-interest'],['Distribution waterfall','/learn/fund-economics/distribution-waterfall'],['Side letter','/learn/fund-operations/side-letter'],['Waterfall calculator','/tools/waterfall'],['Fee & carry modeler','/tools/fee-carry-modeler']],
  },
  {
    n: '05', icon: IconReportAnalytics, title: 'Account for it',
    desc: 'A real fund-accounting engine, not an export to your accountant.',
    items: ['Double-entry general ledger and chart of accounts', 'NAV and per-unit NAV, valuation and FX', 'Balance sheet, P&L and capital account statements'],
    links: [['What is NAV?','/learn/fund-accounting/nav'],['IFRS 9 / SFRS(I) 9','/learn/fund-accounting/ifrs-9-sfrs-i-9'],['Fair value hierarchy','/learn/fund-accounting/fair-value-hierarchy'],['Subscription JE','/tools/subscription-redemption-je'],['FX revaluation JE','/tools/fx-revaluation-je']],
  },
  {
    n: '06', icon: IconUsersGroup, title: 'Keep members informed',
    desc: 'A white-labeled portal gives members their own view.',
    items: ['Live positions and statements', 'Deal updates, notices and secure messaging', 'Tax and year-end packs'],
    links: [['TVPI, DPI, RVPI','/learn/lp-reporting/tvpi-dpi-rvpi'],['IRR vs MOIC','/learn/lp-reporting/irr-vs-moic'],['Returns calculator','/tools/irr-tvpi-dpi-calculator'],['What LPs expect next','/blog/future-of-spv-administration']],
  },
  {
    n: '07', icon: IconFileText, title: 'Distribute and close out',
    desc: 'Pay out proceeds and keep the record audit-ready.',
    items: ['Deal-by-deal distribution waterfalls', 'Distribution notices and payout tracking', 'Full audit trail and document vault'],
    links: [['American vs European waterfall','/blog/american-vs-european-waterfall'],['Waterfall comparator','/tools/waterfall-comparator'],['Carry tax estimator','/tools/carried-interest-tax'],['Fix SPV admin','/blog/how-to-fix-spv-administration']],
  },
];

const engines = [
  {
    href: '/products/fund-administration',
    icon: IconLayoutDashboard,
    title: 'Fund Administration & Investor Portal',
    desc: 'Investor register, waterfalls, fees and carry, compliance monitoring and a white-labeled portal. The same layer funds use to serve their LPs.',
  },
  {
    href: '/products/fund-accounting',
    icon: IconReportMoney,
    title: 'Fund Accounting',
    desc: 'Double-entry ledger, NAV from daily to quarterly, multi-currency, corporate actions and 12+ audit-ready reports. Complete enough to run on its own.',
  },
];

const resources = [
  {
    title: 'Guides',
    items: [
      ['Free and low-cost SPV administration', '/blog/free-low-cost-spv-administration'],
      ['Why VCs and founders use SPVs', '/blog/why-vcs-founders-use-spvs'],
      ['SPV administration best practices', '/blog/spv-administration-best-practices'],
      ['7 SPV administration problems', '/blog/spv-administration-problems'],
      ['How to fix SPV administration', '/blog/how-to-fix-spv-administration'],
      ['The future of SPV administration', '/blog/future-of-spv-administration'],
      ['True syndicates vs invite links', '/blog/true-syndicates-vs-invite-links'],
      ['Continuation vehicles for emerging managers', '/blog/continuation-vehicles-spv-admin'],
      ['Side letters and month-end', '/blog/side-letters-fund-operations-pain-points'],
      ['American vs European waterfalls', '/blog/american-vs-european-waterfall'],
      ['How to start a fund in Singapore', '/blog/how-to-start-a-fund-singapore'],
      ['How to set up a VCC in Singapore', '/blog/how-to-set-up-a-vcc-singapore'],
      ['Section 13O vs 13U', '/blog/section-13o-vs-13u-singapore'],
      ['IFRS 9 / SFRS(I) 9 for funds', '/blog/ifrs-9-sfrs-i-9-fund-accounting'],
    ],
  },
  {
    title: 'Key terms',
    items: [
      ['Syndicate', '/learn/fund-operations/syndicate'],
      ['Continuation vehicle', '/learn/fund-operations/continuation-vehicle'],
      ['Capital call', '/learn/fund-operations/capital-call'],
      ['Side letter', '/learn/fund-operations/side-letter'],
      ['Fund administrator', '/learn/fund-operations/fund-administrator'],
      ['Distribution waterfall', '/learn/fund-economics/distribution-waterfall'],
      ['Carried interest', '/learn/fund-economics/carried-interest'],
      ['Management fee', '/learn/fund-economics/management-fee'],
      ['NAV', '/learn/fund-accounting/nav'],
      ['Fair value hierarchy', '/learn/fund-accounting/fair-value-hierarchy'],
      ['IFRS 9 / SFRS(I) 9', '/learn/fund-accounting/ifrs-9-sfrs-i-9'],
      ['TVPI, DPI and RVPI', '/learn/lp-reporting/tvpi-dpi-rvpi'],
      ['IRR vs MOIC', '/learn/lp-reporting/irr-vs-moic'],
      ['VCC', '/learn/singapore-fund-structures/vcc'],
      ['Section 13O and 13U', '/learn/singapore-fund-structures/13o-13u'],
    ],
  },
  {
    title: 'Free tools',
    items: [
      ['SPV formation checklist', '/tools/spv-formation-checklist'],
      ['SPV jurisdiction comparator', '/tools/spv-jurisdiction-comparator'],
      ['SPV formation cost estimator', '/tools/spv-cost-estimator'],
      ['SPV admin cost calculator', '/tools/spv-admin-cost-calculator'],
      ['Delaware SPV compliance calendar', '/tools/delaware-spv-compliance-calendar'],
      ['Capital call schedule builder', '/tools/capital-call-schedule'],
      ['Drawdown notice generator', '/tools/drawdown-notice'],
      ['Waterfall calculator', '/tools/waterfall'],
      ['American vs European comparator', '/tools/waterfall-comparator'],
      ['Management fee and carry modeler', '/tools/fee-carry-modeler'],
      ['Carried interest tax estimator', '/tools/carried-interest-tax'],
      ['Co-investment return modeler', '/tools/co-investment-modeler'],
      ['IRR, TVPI, DPI, RVPI calculator', '/tools/irr-tvpi-dpi-calculator'],
      ['Subscription and redemption JE', '/tools/subscription-redemption-je'],
      ['FX revaluation JE', '/tools/fx-revaluation-je'],
    ],
  },
];

const resourceIcons = [IconBook2, IconVocabulary, IconCalculator];

const recordItems = ['Cap table', 'Commitments', 'Waterfall', 'Ledger', 'Member statements'];

// Links already shown inside the lifecycle panels are not repeated in "Go deeper".
const usedHrefs = new Set(stages.flatMap((st) => st.links.map(([, href]) => href)));
const moreResources = resources
  .map((r) => ({ ...r, items: r.items.filter(([, href]) => !usedHrefs.has(href)) }))
  .filter((r) => r.items.length > 0);

export function SpvFundManagement() {
  const [view, setView] = useState<'stitched' | 'one'>('one');
  const [stage, setStage] = useState<string | null>(stages[0].n);

  return (
    <>
      {/* 1 · Hero — split, with the stacked module card */}
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="xl" className={s.heroInner}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className={s.pill}><IconBox size={14} /> SPV Fund Management Platform</span>
            <h1 className={s.title}>
              SPV fund management, <span className={s.accent}>end to end in one box.</span>
            </h1>
            <p className={s.subtitle}>
              From forming the vehicle to closing the books. aama.io runs your SPV or syndicate on one system: cap
              table, member KYC/AML, capital calls, carry and distributions, the general ledger, NAV and member
              reporting. Single- or multi-asset, live in days.
            </p>
            <div className={s.ctaRow}>
              <Button component={Link} href="/contact" size="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>Book a demo</Button>
              <Button component={Link} href="/solutions/spv-syndicates" size="md" variant="default" className={s.secondary}>See the SPV solution</Button>
            </div>
            <div className={s.assurance}>
              <span className={s.assItem}><IconCircleCheckFilled size={16} className={s.assIcon} /> Live in days</span>
              <span className={s.assItem}><IconCircleCheckFilled size={16} className={s.assIcon} /> KYC/AML built in</span>
              <span className={s.assItem}><IconCircleCheckFilled size={16} className={s.assIcon} /> IFRS-ready accounting</span>
              <span className={s.assItem}><IconCircleCheckFilled size={16} className={s.assIcon} /> Pay when you collect</span>
            </div>
          </motion.div>

          <motion.div className={s.stack} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }} aria-hidden="true">
            <div className={s.stackHead}>
              <span>Example SPV · Series A co-invest</span>
              <span className={s.stackBadge}>Illustrative</span>
            </div>
            <div className={s.kpis}>
              <div className={s.kpi}><span className={s.kpiLabel}>Committed</span><span className={s.kpiValue}>$2.4M</span></div>
              <div className={s.kpi}><span className={s.kpiLabel}>Members</span><span className={s.kpiValue}>18</span></div>
              <div className={s.kpi}><span className={s.kpiLabel}>Funded</span><span className={s.kpiValue}>100%</span></div>
            </div>
            <div className={s.stackRow}>
              <span className={s.stackLabel}>KYC/AML cleared</span>
              <Badge variant="light" color="teal" size="sm">18 of 18</Badge>
            </div>
            <div className={s.stackRow}>
              <span className={s.stackLabel}>Lead carry accrued</span>
              <Badge variant="light" size="sm">20%</Badge>
            </div>
            <div className={s.stackRow}>
              <span className={s.stackLabel}>NAV · general ledger</span>
              <Badge variant="light" color="teal" size="sm">Balanced</Badge>
            </div>
            <div className={s.stackRow}>
              <span className={s.stackLabel}>Member statements</span>
              <Badge variant="light" size="sm">Ready</Badge>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Founding offer for SPV managers: single SPVs and syndicates */}
      <section className={s.section} id="launch-offer">
        <Container size="xl">
          <div className={s.offerCard}>
            <div className={s.offerGlow} />
            <div className={s.offerGrid}>
              <div>
                <span className={s.offerChip}>Founding offer · SPV managers</span>
                <h2 className={s.offerTitle}>Launch your SPV. Pay when you collect.</h2>
                <p className={s.offerDesc}>
                  Set up your SPV, invite your investors and call capital on aama.io. The SPV fee starts once your
                  first LP payment is recorded, so you never pay before the raise. This founding offer ends without
                  notice.
                </p>
                <div className={s.ctaRow}>
                  <Button component={Link} href="/contact" size="md" radius="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>Claim your founding spot</Button>
                  <Button component={Link} href="/pricing" size="md" radius="md" variant="default" className={s.secondary}>See SPV pricing</Button>
                </div>
                <ul className={s.offerProof}>
                  <li><IconCheck size={15} stroke={2.6} /> No card required</li>
                  <li><IconCheck size={15} stroke={2.6} /> Single SPVs and syndicates</li>
                  <li><IconCheck size={15} stroke={2.6} /> Fee shown up front</li>
                </ul>
              </div>

              <div className={s.offerPanel}>
                <div className={s.offerPanelHead}>
                  <span>What you pay, and when</span>
                  <span className={s.offerBadge}>Pay when you collect</span>
                </div>
                <div className={s.offerRow}>
                  <span className={s.offerRowLabel}>Single SPV</span>
                  <span className={s.offerRowValue}>USD 3,900 flat</span>
                  <span className={s.offerRowNote}>One lead, one round. Due at your first recorded LP payment.</span>
                </div>
                <div className={s.offerRow}>
                  <span className={s.offerRowLabel}>Syndicate SPV</span>
                  <span className={s.offerRowValue}>2% of the raise</span>
                  <span className={s.offerRowNote}>Minimum USD 3,500, maximum USD 10,000. Due at your first recorded LP payment.</span>
                </div>
                <div className={s.offerRow}>
                  <span className={s.offerRowLabel}>Several deals a year?</span>
                  <span className={s.offerRowValue}>Platform plan</span>
                  <span className={s.offerRowNote}>Volume pricing for leads who run multiple SPVs.</span>
                </div>
                <p className={s.offerFine}>Government and registry fees are extra and paid at cost. They are not included in the SPV fee.</p>
                <Link href="/partners" className={s.offerPartner}>
                  SPV administrator or formation firm? See our partner programme <IconArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 · Why one box — interactive toggle */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="lg">
          <div className={s.whySplit}>
            <Reveal>
              <span className={s.eyebrow}>Where SPV admin breaks</span>
              <h2 className={s.h2}>SPVs rarely fail at formation. They fail at the moments after.</h2>
              <p className={s.lead}>
                A late wire, a side letter, a member question, the year-end packs. These are the moments that decide
                whether an SPV feels professional to the people who put money into it.
              </p>
              <SegmentedControl
                fullWidth
                size="md"
                radius="xl"
                value={view}
                onChange={(v) => setView(v as 'stitched' | 'one')}
                data={[
                  { value: 'stitched', label: 'Without aama.io' },
                  { value: 'one', label: 'With aama.io' },
                ]}
                className={s.toggle}
              />
            </Reveal>

            <Paper withBorder radius="lg" p="lg" className={s.whyCard} data-win={view === 'one' || undefined}>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={view}
                  className={s.whyList}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  {(view === 'one' ? withAama : without).map((x) => (
                    <li key={x}>
                      <ThemeIcon size={24} radius="xl" variant="light" color={view === 'one' ? 'blue' : 'red'}>
                        {view === 'one' ? <IconCheck size={14} stroke={2.8} /> : <IconX size={14} stroke={2.8} />}
                      </ThemeIcon>
                      <span>{x}</span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </Paper>
          </div>
        </Container>
      </section>

      {/* 3 · Lifecycle — vertical tabs */}
      <section className={s.section}>
        <Container size="xl">
          <SectionHeading
            eyebrow="The full lifecycle"
            title="How an SPV runs on aama.io, stage by stage"
            description="Pick a stage to see what you set up, what the platform handles, and what to read before you start."
          />
          <Tabs
            value={stage}
            onChange={setStage}
            orientation="vertical"
            variant="pills"
            radius="lg"
            classNames={{ root: s.tabsRoot, list: s.tabsList, tab: s.tab, panel: s.tabPanel }}
          >
            <Tabs.List>
              {stages.map((st) => (
                <Tabs.Tab key={st.n} value={st.n} leftSection={<st.icon size={18} stroke={1.8} />}>
                  <span className={s.tabNum}>{st.n}</span> {st.title}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {stages.map((st) => (
              <Tabs.Panel key={st.n} value={st.n}>
                <div className={s.panelHead}>
                  <ThemeIcon size={46} radius="md" variant="light"><st.icon size={24} stroke={1.7} /></ThemeIcon>
                  <div>
                    <Badge variant="light" size="sm">Stage {st.n}</Badge>
                    <h3 className={s.panelTitle}>{st.title}</h3>
                  </div>
                </div>
                <p className={s.panelDesc}>{st.desc}</p>
                <ul className={s.panelList}>
                  {st.items.map((it) => (
                    <li key={it}><IconCircleCheckFilled size={18} className={s.panelCheck} /> {it}</li>
                  ))}
                </ul>
                <div className={s.panelLinksLabel}>Read and try</div>
                <div className={s.stageLinks}>
                  {st.links.map(([label, href]) => (
                    <Link key={href} href={href} className={s.chip}>{label}</Link>
                  ))}
                </div>
              </Tabs.Panel>
            ))}
          </Tabs>
        </Container>
      </section>

      {/* 4 · Inside the box — diagram */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="xl">
          <SectionHeading
            eyebrow="Under the hood"
            title="Not a lightweight SPV tool"
            description="Most SPV tools stop at documents and capital collection. This one sits on aama.io's full administration layer and a double-entry fund-accounting engine, the same products used for funds."
          />
          <div className={s.diagram}>
            <Reveal>
              <Link href={engines[0].href} className={s.engineCard}>
                <ThemeIcon size={44} radius="md" variant="light"><IconLayoutDashboard size={22} stroke={1.7} /></ThemeIcon>
                <span className={s.engineTitle}>{engines[0].title}</span>
                <span className={s.engineDesc}>{engines[0].desc}</span>
                <span className={s.engineGo}>Explore <IconArrowRight size={14} /></span>
              </Link>
            </Reveal>

            <Reveal delay={0.08}>
              <div className={s.core}>
                <ThemeIcon size={52} radius="xl" variant="filled"><IconDatabase size={26} stroke={1.7} /></ThemeIcon>
                <span className={s.coreTitle}>Shared data model</span>
                <div className={s.coreTags}>
                  {recordItems.map((r) => (<Badge key={r} variant="white" size="md">{r}</Badge>))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <Link href={engines[1].href} className={s.engineCard}>
                <ThemeIcon size={44} radius="md" variant="light"><IconReportMoney size={22} stroke={1.7} /></ThemeIcon>
                <span className={s.engineTitle}>{engines[1].title}</span>
                <span className={s.engineDesc}>{engines[1].desc}</span>
                <span className={s.engineGo}>Explore <IconArrowRight size={14} /></span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 5 · Book a demo */}
      <ToolDemoCal />

      {/* 6 · FAQ — sticky intro beside the accordion */}
      <section className={s.section}>
        <Container size="lg">
          <div className={s.faqSplit}>
            <div className={s.faqIntro}>
              <span className={s.eyebrow}>FAQ</span>
              <h2 className={s.h2}>Questions, answered</h2>
              <p className={s.lead}>Still unsure how it fits your deal flow? Talk to the team.</p>
              <Button component={Link} href="/contact" variant="default" radius="xl" rightSection={<IconArrowRight size={16} />}>
                Contact us
              </Button>
            </div>
            <Accordion variant="contained" radius="lg" chevronPosition="left" defaultValue="faq-0" className={s.faq}>
              {SPV_FAQS.map((f, i) => (
                <Accordion.Item key={f.q} value={`faq-${i}`}>
                  <Accordion.Control><span className={s.faqQ}>{f.q}</span></Accordion.Control>
                  <Accordion.Panel><span className={s.faqA}>{f.a}</span></Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* 7 · Go deeper — pill tabs over link cards */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="xl">
          <SectionHeading
            eyebrow="Go deeper"
            title="More to read, define and try"
            description="The rest of what we have published on running an SPV, beyond the links in each stage above."
          />
          <Tabs defaultValue={moreResources[0].title} variant="pills" radius="xl" classNames={{ root: s.resRoot, list: s.resTabs, tab: s.resTab }}>
            <Tabs.List justify="center">
              {moreResources.map((r) => {
                const i = resources.findIndex((x) => x.title === r.title);
                const Icon = resourceIcons[i];
                return (
                  <Tabs.Tab key={r.title} value={r.title} leftSection={<Icon size={16} />} rightSection={<Badge size="xs" circle variant="light">{r.items.length}</Badge>}>
                    {r.title}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
            {moreResources.map((r) => (
              <Tabs.Panel key={r.title} value={r.title}>
                <div className={s.resGrid}>
                  {r.items.map(([label, href]) => (
                    <Link key={href} href={href} className={s.resCard}>
                      <span>{label}</span>
                      <IconArrowRight size={15} className={s.resArrow} />
                    </Link>
                  ))}
                </div>
              </Tabs.Panel>
            ))}
          </Tabs>
          <div className={s.resFoot}>
            <Link href="/solutions/spv-syndicates" className={s.chip}>SPV &amp; Syndicate solution</Link>
            <Link href="/blog" className={s.chip}>All blog posts</Link>
            <Link href="/learn" className={s.chip}>Full glossary</Link>
            <Link href="/tools" className={s.chip}>All free tools</Link>
          </div>
        </Container>
      </section>
    </>
  );
}

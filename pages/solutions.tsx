import { Accordion, Button, Container } from '@mantine/core';
import { IconArrowRight, IconCalendarEvent, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { PageSchema } from '@/components/SEO/PageSchema';
import { Reveal } from '@/components/ui/Reveal';
import { SOLUTIONS } from '@/lib/solutions';
import s from '../styles/Solutions.module.css';

// Per-audience detail layered onto the shared SOLUTIONS list (lib/solutions.ts).
const DETAIL: Record<string, { kicker: string; body: string; points: string[]; fit: { label: string; href: string }[] }> = {
  'vc-pe-firms': {
    kicker: 'Closed-end funds',
    body: 'Raise, call and distribute capital without rebuilding the same spreadsheet each quarter. The waterfall, the notices and the LP statements all come from one set of books.',
    points: [
      'Capital calls with per-investor notices and payment tracking',
      'Distribution waterfalls, hurdle and carry',
      'LP portal with statements and a document vault',
      'IFRS 9 / SFRS(I) 9 ready accounting',
    ],
    fit: [
      { label: 'Fund Administration', href: '/products/fund-administration' },
      { label: 'Fund Accounting', href: '/products/fund-accounting' },
    ],
  },
  'private-credit': {
    kicker: 'Direct lending and credit',
    body: 'Credit funds need accounting that follows the loan: amortised cost, interest accruals and expected credit loss, plus note programmes and convertible debt.',
    points: [
      'Amortised cost, interest accruals and ECL staging',
      'Loan and covenant tracking',
      'Note issuance: principal, interest, maturity and conversion',
      'Investor reporting from the same ledger',
    ],
    fit: [
      { label: 'Fund Accounting', href: '/products/fund-accounting' },
      { label: 'Fund Administration', href: '/products/fund-administration' },
    ],
  },
  'family-offices': {
    kicker: 'Single and multi-family',
    body: 'Several entities, several asset classes and the Singapore incentive conditions to track. One consolidated view instead of a folder of workbooks.',
    points: [
      'Multi-entity, multi-asset consolidation',
      '13O / 13U reporting',
      'CDR, LBS and UBO tracking',
      'Reports ready for auditors and advisers',
    ],
    fit: [
      { label: 'Fund Accounting', href: '/products/fund-accounting' },
      { label: 'Fund Administration', href: '/products/fund-administration' },
    ],
  },
  'spv-syndicates': {
    kicker: 'Deal-by-deal vehicles',
    body: 'Set up a vehicle, invite members, collect commitments and distribute proceeds. Single-asset or multi-asset, with fees that start when you collect.',
    points: [
      'Templated vehicle setup and member onboarding',
      'KYC/AML and e-signature subscriptions',
      'Lead carry and deal fees, calculated per deal',
      'Free LP portal through your first close',
    ],
    fit: [
      { label: 'SPV administration', href: '/products/spv-fund-management' },
      { label: 'Launch Free offer', href: '/emerging-managers' },
    ],
  },
};

const ONE_MODEL = [
  { title: 'One ledger for every vehicle', body: 'SPV administration, fund accounting and LP reporting read from the same books, so a number means the same thing everywhere.' },
  { title: 'Start small, grow without re-platforming', body: 'Begin with a single SPV or the LP portal. Add accounting and more vehicles later without moving your data.' },
  { title: 'Investors see what you see', body: 'Statements and portal balances come from the ledger, not a separate report someone has to reconcile.' },
];

const STEPS = [
  { t: 'Onboarding', d: 'Investor invites, KYC/AML and subscription documents.' },
  { t: 'Capital', d: 'Commitments, capital calls and payment tracking.' },
  { t: 'Accounting', d: 'General ledger, NAV and fee calculations.' },
  { t: 'Distributions', d: 'Waterfalls, carry and investor payments.' },
  { t: 'Reporting', d: 'LP statements, audit trail and regulatory reports.' },
];

const FAQS = [
  { q: 'Which solution should I start with?', a: 'Pick the one that matches the vehicle you run today. A syndicate lead starts with SPVs & Syndicates, a first-time manager can start on the free LP portal, and an established VC, PE or credit fund usually starts with Fund Administration and Fund Accounting.' },
  { q: 'Can I start with only the LP portal?', a: 'Yes. The LP portal is free through your first close for eligible emerging managers and SPV operators. You can add full accounting later when the vehicle needs it.' },
  { q: 'How does the platform handle regulatory requirements?', a: 'Reporting and accounting follow IFRS 9 / SFRS(I) 9, with Singapore items such as 13O / 13U and VCC structures supported. Regulatory obligations stay with the manager; the software gives you the records and reports to meet them.' },
  { q: 'Can I connect my existing systems?', a: 'Yes. Data can be imported and exported in common formats, and integrations with banks and other tools can be scoped with the team.' },
  { q: 'How is customer data protected?', a: 'Access is role-based and every change is recorded in an audit trail. Ask for the security overview during a demo if your investors or auditors need detail.' },
];

const DEMO = 'https://cal.com/aamaio/30min';

export default function SolutionsPage() {
  return (
    <>
      <SEO
        title="Fund Administration & Accounting Software | Solutions"
        description="Fund administration & accounting for VC/PE, private credit, family offices and SPVs — onboarding to NAV, reporting and compliance, Singapore & APAC."
        keywords="fund administration software, fund accounting software, LP portal for fund managers, investor onboarding, fund reporting, Singapore fund administration, APAC fund accounting"
      />
      <PageSchema
        type="CollectionPage"
        name="Fund administration and accounting solutions"
        description="Fund administration and accounting for VC/PE, private credit, family offices and SPVs."
        path="/solutions"
        faqs={FAQS.map((f) => ({ q: f.q, a: f.a }))}
      />
      <PageShell>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroGlow} />
          <Container size="xl" className={s.heroInner}>
            <div>
              <span className={s.badge}>Solutions</span>
              <h1 className={s.title}>Fund administration, set up for the way you raise capital</h1>
              <p className={s.heroDesc}>
                A syndicate lead, a first-time manager and a multi-fund PE firm need different things on day one.
                Choose your path, and run it on the same books, from first investor to final report.
              </p>
              <div className={s.ctaRow}>
                <Button component="a" href={DEMO} target="_blank" rel="noopener noreferrer" size="md" className={s.primary} leftSection={<IconCalendarEvent size={18} />}>
                  Book a demo
                </Button>
                <Button component={Link} href="/product" size="md" variant="default" className={s.secondary} rightSection={<IconArrowRight size={18} />}>
                  See the products
                </Button>
              </div>
            </div>

            <nav className={s.path} aria-label="Choose your path">
              <div className={s.pathLabel}>Choose your path</div>
              {SOLUTIONS.map((sol) => (
                <Link key={sol.slug} href={sol.href} className={s.pathRow}>
                  <span className={s.pathIcon}><sol.icon size={20} stroke={1.7} /></span>
                  <span className={s.pathText}>
                    <span className={s.pathTitle}>{sol.label}</span>
                    <span className={s.pathSub}>{DETAIL[sol.slug]?.kicker}</span>
                  </span>
                  <IconArrowRight size={18} className={s.pathArrow} />
                </Link>
              ))}
            </nav>
          </Container>
        </section>

        {/* Audiences */}
        <section className={`${s.section} ${s.sectionMuted}`}>
          <Container size="xl">
            <div className={s.head}>
              <span className={s.eyebrow}>By audience</span>
              <h2 className={s.h2}>Four ways teams run funds on aama.io</h2>
            </div>
            {SOLUTIONS.map((sol, i) => {
              const d = DETAIL[sol.slug];
              return (
                <Reveal key={sol.slug}>
                  <div className={`${s.audience} ${i % 2 ? s.audienceFlip : ''}`}>
                    <div className={s.audienceCopy}>
                      <span className={s.audienceNum}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={s.audienceKicker}>{d.kicker}</span>
                      <h3 className={s.audienceTitle}>{sol.label}</h3>
                      <p className={s.audienceBody}>{d.body}</p>
                      <Link href={sol.href} className={s.audienceLink}>
                        Explore {sol.label} <IconArrowRight size={16} />
                      </Link>
                    </div>
                    <div className={s.audienceCard}>
                      <div className={s.cardLabel}>What you get</div>
                      <ul className={s.points}>
                        {d.points.map((p) => (
                          <li key={p} className={s.point}>
                            <span className={s.pointCheck}><IconCheck size={13} stroke={2.6} /></span>
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div className={s.fit}>
                        <span className={s.fitLabel}>Runs on</span>
                        {d.fit.map((f) => (
                          <Link key={f.href} href={f.href} className={s.fitChip}>{f.label}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </Container>
        </section>

        {/* One data model */}
        <section className={s.bandSection}>
          <Container size="xl">
            <div className={s.inkCard}>
              <div className={s.inkGlow} />
              <div className={s.inkInner}>
                <div className={s.inkEyebrow}>Why it fits together</div>
                <h2 className={s.inkTitle}>The same books under every vehicle you run</h2>
                <div className={s.inkGrid}>
                  {ONE_MODEL.map((m) => (
                    <div key={m.title}>
                      <div className={s.inkItemTitle}>{m.title}</div>
                      <div className={s.inkItemDesc}>{m.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Lifecycle */}
        <section className={s.section}>
          <Container size="xl">
            <div className={s.head}>
              <span className={s.eyebrow}>The lifecycle</span>
              <h2 className={s.h2}>From first investor to final report</h2>
              <p className={s.lead}>Every solution covers the same five stages, so nothing is re-keyed between them.</p>
            </div>
            <ol className={s.steps} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {STEPS.map((st, i) => (
                <li key={st.t} className={s.step}>
                  <div className={s.stepNum}>{String(i + 1).padStart(2, '0')}</div>
                  <div className={s.stepTitle}>{st.t}</div>
                  <div className={s.stepDesc}>{st.d}</div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* FAQ */}
        <section className={`${s.section} ${s.sectionMuted}`}>
          <Container size="xl">
            <div className={s.split}>
              <div className={s.splitIntro}>
                <span className={s.eyebrow}>FAQ</span>
                <h2 className={s.h2}>Choosing a solution</h2>
                <p className={s.lead}>Not sure where you fit? <Link href="/contact" style={{ color: 'var(--brand-700)', fontWeight: 600 }}>Talk to the team</Link>.</p>
              </div>
              <Accordion variant="separated" radius="md" chevronPosition="right">
                {FAQS.map((f, i) => (
                  <Accordion.Item key={f.q} value={`faq-${i}`}>
                    <Accordion.Control><span className={s.faqQ}>{f.q}</span></Accordion.Control>
                    <Accordion.Panel><span className={s.faqA}>{f.a}</span></Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className={s.ctaSection}>
          <Container size="xl">
            <div className={s.ctaCard}>
              <div>
                <h2 className={s.ctaTitle}>See it set up for your vehicle</h2>
                <p className={s.ctaDesc}>Book a 30-minute walkthrough and we will show your fund type on the platform, or start free with the LP portal.</p>
                <div className={s.ctaRow}>
                  <Button component="a" href={DEMO} target="_blank" rel="noopener noreferrer" size="md" className={s.primary} leftSection={<IconCalendarEvent size={18} />}>
                    Book a demo
                  </Button>
                  <Button component={Link} href="/emerging-managers" size="md" variant="default" className={s.secondary}>
                    Start free
                  </Button>
                </div>
              </div>
              <div className={s.ctaPanel}>
                {SOLUTIONS.map((sol) => (
                  <Link key={sol.slug} href={sol.href} className={s.ctaPanelRow}>
                    <span>
                      <div className={s.ctaPanelTitle}>{sol.label}</div>
                      <div className={s.ctaPanelSub}>{DETAIL[sol.slug]?.kicker}</div>
                    </span>
                    <IconArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </PageShell>
    </>
  );
}

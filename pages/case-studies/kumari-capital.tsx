import { Container, Title, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { PageSchema } from '@/components/SEO/PageSchema';
import classes from './kumari-capital.module.css';

const METRICS = [
  { value: '5×', label: 'Daily transactions and clients, on the same operations headcount' },
  { value: '566%', label: 'Investor growth in the 12 months after go-live' },
  { value: '15+', label: 'Open-end and closed-end mutual funds with daily NAV' },
  { value: '1–2 hrs', label: 'Saved each day by automating amendments, DRIPs and cancellations' },
  { value: '0', label: 'Data-loss incidents across the migration' },
];

const CHANGES = [
  'Daily NAV across more than 15 open-end and closed-end mutual funds',
  'Amendments, DRIPs and cancellations handled without a manual authorisation step',
  'NAV and DP-fee computation that removed a recurring class of reconciliation errors',
  'A migration completed with zero data-loss incidents',
];

const METHOD = [
  {
    term: 'Period',
    detail: '12 months after go-live, against the pre-migration baseline reported by Kumari Capital operations.',
  },
  {
    term: '5× volume',
    detail: 'Combined growth in daily transactions and clients. Operations headcount stayed the same.',
  },
  {
    term: '566%',
    detail: 'Change in investor count over that same 12-month window.',
  },
  {
    term: '0 data loss',
    detail: 'Across this migration, as reported by the client. Not a lifetime or platform-wide guarantee.',
  },
  {
    term: 'Permission',
    detail: 'Name and metrics used with permission. Figures are not independently audited for this page.',
  },
];

export default function KumariCapitalCaseStudy() {
  return (
    <>
      <SEO
        title="Kumari Capital Case Study | aama.io Fund Accounting"
        description="How Kumari Capital replaced a legacy mutual-fund system and grew transaction volume five-fold on the same operations team — with daily NAV across 15+ funds."
        keywords="Kumari Capital case study, fund accounting case study, mutual fund NAV software, fund operations automation"
      />
      <PageSchema
        name="Kumari Capital case study"
        description="Case study: Kumari Capital on the aama.io fund accounting engine."
        path="/case-studies/kumari-capital"
        crumbs={[
          { name: 'Case studies', path: '/case-studies/kumari-capital' },
          { name: 'Kumari Capital', path: '/case-studies/kumari-capital' },
        ]}
      />
      <PageShell>
        <article className={classes.page}>
          <Container size="xl">
            <header className={classes.hero}>
              <Title order={1} className={classes.title}>
                5× the transaction volume, on the same team
              </Title>
              <Text className={classes.lede}>
                Kumari Capital, a regulated mutual-fund operator, replaced a legacy system that
                could not keep up. In the 12 months after go-live, daily transactions and clients
                grew about five-fold. The operations team did not.
              </Text>
            </header>

            <div className={classes.stats}>
              {METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className={classes.statValue}>{metric.value}</div>
                  <div className={classes.statLabel}>{metric.label}</div>
                </div>
              ))}
            </div>

            <div className={classes.story}>
              <section className={classes.block}>
                <h2>The constraint</h2>
                <p>
                  Kumari Capital ran open-end and closed-end mutual funds on a system that could
                  not absorb more investors or more transactions. Daily NAV, amendments, DRIPs and
                  cancellations waited on manual authorisation. NAV and DP-fee reconciliation
                  errors kept coming back. Operations and the call centre were already at capacity.
                </p>
              </section>

              <section className={classes.block}>
                <h2>What the engine took over</h2>
                <p>
                  The firm moved onto the fund-accounting engine that now powers aama.io. The books
                  are double-entry. NAV is calculated every day. Client actions that used to need
                  a person to authorise them now run from the ledger.
                </p>
                <ul className={classes.changes}>
                  {CHANGES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className={classes.block}>
                <h2>The 12 months after</h2>
                <p>
                  Daily transactions and clients grew roughly five-fold while operations headcount
                  stayed flat. Investor numbers grew 566%. Automating amendments, DRIPs and
                  cancellations returned about 1–2 hours a day to the operations and call-centre
                  teams.
                </p>
              </section>

              <aside className={classes.note}>
                <h2>What a PE, VC or credit buyer should take from this</h2>
                <p>
                  Kumari Capital is a mutual-fund operator, not a private-equity or venture GP.
                  The transferable part is the accounting core: the same engine, under that volume,
                  is what aama.io runs for PE, VC, private credit, family offices and SPVs. A
                  double-entry ledger, daily NAV, an audit trail, and a migration with no reported
                  data loss. For a reference shaped like your own funds, ask in a demo.
                </p>
              </aside>

              <section className={classes.block}>
                <h2>How to read the numbers</h2>
                <dl className={classes.method}>
                  {METHOD.map((row) => (
                    <div key={row.term}>
                      <dt>{row.term}</dt>
                      <dd>{row.detail}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <div className={classes.actions}>
                <Link href="/contact" className={classes.primary}>
                  Talk through your migration
                  <IconArrowRight size={16} />
                </Link>
                <Link href="/products/fund-accounting" className={classes.secondary}>
                  Explore Fund Accounting
                </Link>
              </div>
            </div>
          </Container>
        </article>
      </PageShell>
    </>
  );
}

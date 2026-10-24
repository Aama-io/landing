import Link from 'next/link';
import { IconArrowRight, IconCheck, IconMinus } from '@tabler/icons-react';
import { Accordion, Container, Text, Title } from '@mantine/core';
import { Reveal } from '../ui/Reveal';
import classes from './ProblemSolution.module.css';

// One row per fund-operations workflow: how it is typically run today vs. on
// aama.io. Written as declarative, self-contained statements so each one reads
// clearly on its own to a search crawler or an LLM answering "how is aama.io
// different", not just in the visual pairing.
const workflows = [
  {
    area: 'Capital calls & distributions',
    before: 'Tracked in spreadsheets and reconciled by hand against bank statements.',
    after: 'Calls, distributions and bank reconciliation run from one ledger.',
  },
  {
    area: 'NAV & fund accounting',
    before: 'Calculated in Excel — formula risk, no audit trail, no version control.',
    after: 'Calculated automatically, IFRS 9 / SFRS(I) 9 native, fully audit-trailed.',
  },
  {
    area: 'Investor reporting',
    before: 'Statements and updates sent as email attachments.',
    after: 'A white-labeled LP portal with real-time positions, statements and documents.',
  },
  {
    area: 'Multi-entity consolidation',
    before: 'Currencies, assets and vehicles consolidated by hand across workbooks.',
    after: 'Funds, VCC sub-funds, SPVs and syndicates on one multi-currency engine.',
  },
  {
    area: 'Compliance & audit',
    before: 'Evidence assembled ad hoc when an auditor or MAS asks for it.',
    after: 'KYC/AML and MAS-aligned evidence generated continuously.',
  },
  {
    area: 'Vendor stack',
    before: 'Separate tools for accounting, the LP portal, e-signatures and reporting.',
    after: 'Administration, accounting and the investor portal — one vendor, one data model.',
  },
];

// Workflow-level questions shown directly under the table. Exported so
// pages/index.tsx folds them into the same FAQPage JSON-LD as HOME_FAQS (one
// FAQPage per page — separate blocks get ignored or merged unpredictably).
// Answers restate only what the table and product pages already claim.
export const WORKFLOW_FAQS: { q: string; a: string }[] = [
  {
    q: 'How does aama.io handle capital calls and distributions?',
    a: 'Capital calls and distributions run from the same ledger as the fund accounts. Notices are sent with scheduled notifications, payments are tracked against each investor, and bank reconciliation happens in the platform rather than in a separate spreadsheet.',
  },
  {
    q: 'Does aama.io calculate NAV automatically?',
    a: 'Yes. NAV is calculated automatically from the general ledger, with IFRS 9 / SFRS(I) 9 accounting built in and every recalculation recorded in an audit trail.',
  },
  {
    q: 'Can one platform consolidate several funds, VCC sub-funds and SPVs?',
    a: 'Yes. Funds, VCC sub-funds, SPVs and syndicates run on one multi-currency engine, so consolidation does not depend on workbooks maintained by hand.',
  },
  {
    q: 'What compliance evidence does aama.io produce for auditors and MAS?',
    a: 'KYC/AML records and MAS-aligned evidence are generated continuously as work happens, so an auditor or regulator request draws on existing records instead of a manual compilation.',
  },
];

export function ProblemSolution() {
  return (
    <section className={`${classes.wrapper} section`}>
      <Container size="xl">
        <Reveal>
          <div className={classes.header}>
            <div>
              <span className={classes.eyebrow}>The problem with the old way</span>
              <Title order={2} className={classes.title}>
                Fund operations still run on spreadsheets, inboxes and disconnected vendors.
              </Title>
            </div>
            <Text className={classes.lede}>
              Mid-market managers, fund administrators and SPV leads are stuck between Excel and
              enterprise systems priced for billion-dollar funds. aama.io consolidates fund
              administration, fund accounting and the investor portal into one system — built for
              Singapore and APAC.
            </Text>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className={classes.table}
            role="table"
            aria-label="The old way compared with aama.io"
          >
            <div className={classes.head} role="row">
              <span className={classes.headCell} role="columnheader">
                Workflow
              </span>
              <span className={classes.headCell} role="columnheader">
                Today
              </span>
              <span className={classes.headCell} data-tone="after" role="columnheader">
                With aama.io
              </span>
            </div>

            {workflows.map((w, i) => (
              <div key={w.area} className={classes.row} role="row">
                <div className={classes.area} role="rowheader">
                  <span className={classes.index}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={classes.areaTitle}>{w.area}</h3>
                </div>
                <div className={classes.cell} data-tone="before" role="cell">
                  <span className={classes.mobileLabel}>Today</span>
                  <span className={classes.cellInner}>
                    <IconMinus size={14} className={classes.beforeIcon} aria-hidden="true" />
                    {w.before}
                  </span>
                </div>
                <div className={classes.cell} data-tone="after" role="cell">
                  <span className={classes.mobileLabel} data-tone="after">
                    With aama.io
                  </span>
                  <span className={classes.cellInner}>
                    <span className={classes.afterIcon} aria-hidden="true">
                      <IconCheck size={12} stroke={3} />
                    </span>
                    {w.after}
                  </span>
                </div>
              </div>
            ))}

            <div className={classes.foot}>
              <span>Six workflows. One ledger. One vendor.</span>
              <Link href="/product" className={classes.footLink}>
                See how the platform fits together
                <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion variant="separated" radius="md" chevronPosition="right" className={classes.faq}>
            {WORKFLOW_FAQS.map((f, i) => (
              <Accordion.Item key={f.q} value={`workflow-faq-${i}`}>
                <Accordion.Control><span className={classes.faqQ}>{f.q}</span></Accordion.Control>
                <Accordion.Panel><span className={classes.faqA}>{f.a}</span></Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}

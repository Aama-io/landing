import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, SegmentedControl, Switch, Checkbox, Button } from '@mantine/core';
import { IconArrowRight, IconCalendarEvent, IconFileText, IconCoin, IconAlertTriangle } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import classes from './DelawareSpvCalendar.module.css';

type Entity = 'llc' | 'lp' | 'smllc' | 'corp';
type Kind = 'statutory' | 'investor' | 'practice';

type Obligation = {
  id: string;
  when: string;
  /** Month*100 + day, used to order dated items. Undated items use 0. */
  sort: number;
  label: string;
  form?: string;
  kind: Kind;
  note: string;
};

const ENTITY_OPTIONS = [
  { label: 'LLC', value: 'llc' },
  { label: 'LP', value: 'lp' },
  { label: '1-member LLC', value: 'smllc' },
  { label: 'Corp', value: 'corp' },
];

const ENTITY_LABEL: Record<Entity, string> = {
  llc: 'Delaware LLC (taxed as a partnership)',
  lp: 'Delaware LP (taxed as a partnership)',
  smllc: 'Delaware single-member LLC (disregarded)',
  corp: 'Delaware C-corporation',
};

const KIND_LABEL: Record<Kind, string> = {
  statutory: 'Statutory',
  investor: 'Investor-facing',
  practice: 'Best practice',
};

const isPartnership = (e: Entity) => e === 'llc' || e === 'lp';

function buildObligations(entity: Entity, nonUs: boolean, extension: boolean): Obligation[] {
  const out: Obligation[] = [];

  out.push({
    id: 'agent',
    when: 'Ongoing',
    sort: 0,
    label: 'Maintain a Delaware registered agent and registered office',
    kind: 'statutory',
    note: 'Required at all times. If the agent resigns or your fee lapses, the entity can fall out of good standing — diarise the annual renewal.',
  });

  if (entity === 'corp') {
    out.push({
      id: 'franchise',
      when: 'Mar 1',
      sort: 301,
      label: 'Delaware annual report and franchise tax',
      form: 'Annual report',
      kind: 'statutory',
      note: 'Amount depends on authorised shares and the calculation method; the assumed-par-value method usually gives a much lower figure for a small SPV. Late payment accrues a penalty plus monthly interest.',
    });
  } else {
    out.push({
      id: 'de-tax',
      when: 'Jun 1',
      sort: 601,
      label: 'Delaware annual tax — flat $300',
      form: 'Annual tax (no return)',
      kind: 'statutory',
      note: 'Paid online to the Division of Corporations. Late payment adds a penalty and monthly interest, and prolonged non-payment can cost the entity its good standing. Delaware has no annual report for LLCs and LPs.',
    });
  }

  if (isPartnership(entity)) {
    out.push({
      id: 'k1-collect',
      when: 'Jan – Feb',
      sort: 201,
      label: 'Year-end close, final capital accounts and tax package to the preparer',
      kind: 'practice',
      note: 'The K-1 can only be as good as the capital accounts behind it. Reconcile contributions, distributions and fee allocations per investor before the preparer starts.',
    });
    out.push({
      id: '1065',
      when: extension ? 'Sep 15 (extended)' : 'Mar 15',
      sort: extension ? 915 : 315,
      label: 'Partnership return and one Schedule K-1 per investor',
      form: 'Form 1065 + K-1',
      kind: 'statutory',
      note: 'The IRS late-filing penalty accrues per partner, per month — so it scales with investor count. LPs need the K-1 to file their own returns, so late K-1s are the most visible compliance failure.',
    });
    if (extension) {
      out.push({
        id: '7004',
        when: 'Mar 15',
        sort: 316,
        label: 'File the six-month extension request',
        form: 'Form 7004',
        kind: 'statutory',
        note: 'An extension extends the time to file, not to pay. Tell investors in advance that K-1s will arrive late summer, not March.',
      });
    }
  }

  if (entity === 'smllc') {
    if (nonUs) {
      out.push({
        id: '5472',
        when: extension ? 'Oct 15 (extended)' : 'Apr 15',
        sort: extension ? 1015 : 415,
        label: 'Information return for a foreign-owned disregarded LLC, filed with a pro forma Form 1120',
        form: 'Form 5472',
        kind: 'statutory',
        note: 'Required when a single-member LLC has one foreign owner, even if the LLC had no income. The penalty for failing to file is a flat $25,000 per form, so this one is worth a calendar reminder.',
      });
      if (extension) {
        out.push({
          id: '7004-sm',
          when: 'Apr 15',
          sort: 416,
          label: 'File the extension request',
          form: 'Form 7004',
          kind: 'statutory',
          note: 'Extends the time to file the pro forma Form 1120 and Form 5472 by six months.',
        });
      }
    } else {
      out.push({
        id: 'smllc-us',
        when: 'With the owner’s return',
        sort: 1,
        label: 'No separate federal return — the LLC’s activity is reported on the US owner’s own return',
        kind: 'practice',
        note: 'If a second member is admitted, the LLC is by default taxed as a partnership and the Form 1065 / K-1 obligations apply from that point.',
      });
    }
  }

  if (entity === 'corp') {
    out.push({
      id: '1120',
      when: extension ? 'Oct 15 (extended)' : 'Apr 15',
      sort: extension ? 1015 : 415,
      label: 'Corporate income tax return',
      form: 'Form 1120',
      kind: 'statutory',
      note: 'A C-corporation pays entity-level US tax on its income, which is why most pooled-investment SPVs use an LLC or LP instead.',
    });
    if (extension) {
      out.push({
        id: '7004-corp',
        when: 'Apr 15',
        sort: 416,
        label: 'File the six-month extension request',
        form: 'Form 7004',
        kind: 'statutory',
        note: 'Extends the time to file, not to pay any tax due.',
      });
    }
    out.push({
      id: '1099div',
      when: 'Jan 31',
      sort: 131,
      label: 'Dividend statements to US shareholders',
      form: 'Form 1099-DIV',
      kind: 'investor',
      note: 'Only if the corporation paid dividends in the prior year.',
    });
  }

  if (nonUs) {
    out.push({
      id: 'w8',
      when: 'At subscription; refresh every 3 years',
      sort: 2,
      label: 'Collect Form W-8 (BEN / BEN-E / IMY) from every non-US investor; Form W-9 from US investors',
      form: 'W-8 / W-9',
      kind: 'investor',
      note: 'A W-8 generally stays valid to the end of the third calendar year after it is signed, unless circumstances change. Missing forms mean the administrator must withhold at default rates.',
    });
    out.push({
      id: '1042',
      when: 'Mar 15',
      sort: 315,
      label: 'Report US-source income paid or allocated to foreign investors and the tax withheld',
      form: 'Form 1042 + 1042-S',
      kind: 'statutory',
      note: 'Applies where the vehicle withholds on US-source fixed or determinable income (for example dividends or interest). The 1042-S is also what the investor uses to claim credit for tax withheld.',
    });
    if (isPartnership(entity)) {
      out.push({
        id: '8804',
        when: extension ? 'Sep 15 (extended)' : 'Mar 15',
        sort: extension ? 915 : 315,
        label: 'Annual return and per-partner statements for tax withheld on effectively connected income',
        form: 'Form 8804 + 8805',
        kind: 'statutory',
        note: 'Only if the vehicle has income effectively connected with a US trade or business allocable to foreign partners. A vehicle that only holds shares in a C-corporation usually does not — confirm with your tax adviser.',
      });
      out.push({
        id: '1446',
        when: 'Apr 15 · Jun 15 · Sep 15 · Dec 15',
        sort: 415,
        label: 'Quarterly installments of the withholding tax',
        form: 'Form 8813',
        kind: 'statutory',
        note: 'The same condition as Form 8804 applies. Dates are for a calendar-year partnership.',
      });
    }
  }

  out.push({
    id: 'quarterly',
    when: 'Quarterly',
    sort: 3,
    label: 'Investor statements: capital account, NAV and portfolio update',
    kind: 'practice',
    note: 'Not a Delaware or IRS requirement, but what LPs and any bank or fund-of-funds investor will ask for. Easier to produce quarterly than to rebuild at year-end.',
  });
  out.push({
    id: 'boi',
    when: 'Watch',
    sort: 4,
    label: 'Federal beneficial ownership (BOI) reporting',
    kind: 'practice',
    note: 'Under FinCEN’s March 2025 interim final rule, entities formed in the US are exempt from BOI reporting. Rules in this area have changed repeatedly, so confirm the current position before relying on this.',
  });

  return out;
}

export function DelawareSpvCalendar() {
  const [entity, setEntity] = useState<Entity>('llc');
  const [investors, setInvestors] = useState(25);
  const [nonUs, setNonUs] = useState(true);
  const [extension, setExtension] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    applyParams({
      e: (v) => (v in ENTITY_LABEL ? setEntity(v as Entity) : null),
      n: (v) => setInvestors(Math.min(150, Math.max(1, parseInt(v, 10) || 25))),
      x: (v) => setNonUs(v === '1'),
      ex: (v) => setExtension(v === '1'),
    });
  }, []);
  useEffect(() => {
    syncParams({ e: entity, n: investors, x: nonUs ? 1 : 0, ex: extension ? 1 : 0 });
  }, [entity, investors, nonUs, extension]);

  const items = useMemo(() => buildObligations(entity, nonUs, extension), [entity, nonUs, extension]);

  // Reset ticks when the inputs change the list itself.
  useEffect(() => { setDone({}); }, [entity, nonUs, extension]);

  const dated = items.filter((o) => o.sort >= 100).sort((a, b) => a.sort - b.sort);
  const recurring = items.filter((o) => o.sort < 100).sort((a, b) => a.sort - b.sort);
  const statutoryDated = dated.filter((o) => o.kind === 'statutory').length;
  const completed = Object.values(done).filter(Boolean).length;

  const docs =
    isPartnership(entity)
      ? { label: 'Schedule K-1s to issue', val: String(investors) }
      : entity === 'corp'
        ? { label: 'Investor tax statements', val: 'Per dividend payment' }
        : { label: 'Investor tax statements', val: 'None (one owner)' };

  const kpis = [
    { icon: IconCalendarEvent, label: 'Dated filings this year', val: `${dated.length} (${statutoryDated} statutory)` },
    { icon: IconFileText, label: docs.label, val: docs.val },
    { icon: IconCoin, label: 'Delaware annual charge', val: entity === 'corp' ? 'Franchise tax (varies)' : '$300 flat' },
    { icon: IconAlertTriangle, label: 'Items ticked off', val: `${completed} of ${items.length}` },
  ];

  const renderItem = (o: Obligation) => (
    <div key={o.id} className={classes.stepItem} data-done={done[o.id] || undefined}>
      <Checkbox
        checked={!!done[o.id]}
        onChange={(e) => setDone((d) => ({ ...d, [o.id]: e.currentTarget.checked }))}
        color="blue"
        className={classes.stepCheckbox}
      />
      <div className={classes.stepBody}>
        <div className={classes.stepLabel}>
          {o.label}
          {o.form && <span className={classes.formTag}>{o.form}</span>}
        </div>
        <div className={classes.stepNote}>{o.note}</div>
      </div>
      <div className={`${classes.stepDays} ${classes.stepDaysWide}`}>
        {o.when}
        <span className={`${classes.parallelTag} ${o.kind === 'statutory' ? classes.kindStatutory : ''}`}>
          {KIND_LABEL[o.kind]}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · SPV administration</span>
          <Title className={classes.heroTitle}>
            Delaware SPV <span className={classes.accent}>compliance calendar</span>
          </Title>
          <Text className={classes.heroDesc}>
            Every recurring state and federal obligation for a Delaware SPV, in date order. Pick your entity type and
            investor mix to see what is due, when, and which forms your investors will be waiting for.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="xl">
          <div className={classes.layout}>
            <aside className={classes.controls}>
              <div className={classes.panelTitle}>Your SPV</div>

              <label className={classes.fieldLabel}>Entity type</label>
              <SegmentedControl
                fullWidth size="xs" className={classes.segmented}
                value={entity} onChange={(v) => setEntity(v as Entity)}
                data={ENTITY_OPTIONS}
              />

              {isPartnership(entity) && (
                <>
                  <div className={classes.sliderTop} style={{ marginTop: 16 }}>
                    <span className={classes.fieldLabel} style={{ margin: 0 }}>Investors in the SPV</span>
                    <span className={classes.sliderVal}>{investors}</span>
                  </div>
                  <Slider value={investors} onChange={setInvestors} min={1} max={150} step={1} color="blue" size="sm" label={null} />
                </>
              )}

              <div className={classes.divider} />

              <Switch
                className={classes.switchRow}
                label={entity === 'smllc' ? 'The owner is a non-US person' : 'Includes non-US investors'}
                checked={nonUs}
                onChange={(e) => setNonUs(e.currentTarget.checked)}
                color="blue" size="md"
              />
              <Switch
                className={classes.switchRow}
                label="File on extension"
                checked={extension}
                onChange={(e) => setExtension(e.currentTarget.checked)}
                color="blue" size="md"
              />

              <div className={classes.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>
                Get SPV administration support
              </Button>
              <ShareLinkButton fullWidth className={classes.shareBtn} />
            </aside>

            <div className={classes.results}>
              <div className={classes.kpiGrid}>
                {kpis.map((k) => (
                  <div key={k.label} className={classes.kpiCard}>
                    <span className={classes.kpiIcon}><k.icon size={18} stroke={1.7} /></span>
                    <div className={classes.kpiLabel}>{k.label}</div>
                    <div className={classes.kpiValSm}>{k.val}</div>
                  </div>
                ))}
              </div>

              <div className={classes.sectionLabel}>{ENTITY_LABEL[entity]} — dated obligations (calendar year)</div>
              <div className={classes.stepList}>{dated.map(renderItem)}</div>

              <div className={classes.sectionLabel} style={{ marginTop: 24 }}>Ongoing and recurring</div>
              <div className={classes.stepList}>{recurring.map(renderItem)}</div>

              <div className={classes.noteCard}>
                <IconAlertTriangle size={18} className={classes.noteIcon} />
                <div>
                  <strong>Dates assume a calendar-year entity.</strong>
                  <span className={classes.noteMuted}>
                    {' '}When a date falls on a weekend or US holiday the deadline moves to the next business day.
                    A fiscal-year entity shifts every federal date relative to its year-end.
                  </span>
                </div>
              </div>

              <Text className={classes.disclaimer}>
                General information for planning only — not legal or tax advice. Filing requirements depend on how the
                SPV is structured, what it holds and who invests, and the rules and fees change. Confirm each item with
                your US tax adviser and registered agent. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

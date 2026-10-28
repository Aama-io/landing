import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, NumberInput, Button } from '@mantine/core';
import { IconArrowRight, IconClockEdit, IconEyeCheck, IconArrowsExchange, IconCalendarStats, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import classes from './DataEntryTimeEstimator.module.css';

// An illustration, not a claim. The visitor supplies every number; the maths only moves their own
// hours from keying documents by hand to checking an extract. Starting values are placeholders.
type DocId = 'inv' | 'bank' | 'cust';
type Row = { volume: number; manual: number; review: number };

const DOCS: { id: DocId; label: string; unit: string; start: Row }[] = [
  { id: 'inv', label: 'Supplier invoices', unit: 'invoices per month', start: { volume: 40, manual: 5, review: 1 } },
  { id: 'bank', label: 'Bank statement lines', unit: 'lines per month', start: { volume: 300, manual: 1.5, review: 0.3 } },
  { id: 'cust', label: 'Custodian statement rows', unit: 'holdings and movements per month', start: { volume: 120, manual: 1, review: 0.3 } },
];

const fmt = (n: number) => n.toLocaleString('en-SG', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const clean = (v: number | string) => {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export function DataEntryTimeEstimator() {
  const [rows, setRows] = useState<Record<DocId, Row>>(() =>
    Object.fromEntries(DOCS.map((d) => [d.id, d.start])) as Record<DocId, Row>
  );
  const set = (id: DocId, key: keyof Row, v: number | string) =>
    setRows((r) => ({ ...r, [id]: { ...r[id], [key]: clean(v) } }));

  useEffect(() => {
    const handlers: Record<string, (v: string) => void> = {};
    DOCS.forEach((d) => {
      (['volume', 'manual', 'review'] as const).forEach((k) => {
        handlers[`${d.id}_${k[0]}`] = (v) => set(d.id, k, parseFloat(v));
      });
    });
    applyParams(handlers);
  }, []);
  useEffect(() => {
    const state: Record<string, number> = {};
    DOCS.forEach((d) => (['volume', 'manual', 'review'] as const).forEach((k) => { state[`${d.id}_${k[0]}`] = rows[d.id][k]; }));
    syncParams(state);
  }, [rows]);

  const calc = useMemo(() => {
    const per = DOCS.map((d) => {
      const r = rows[d.id];
      return { ...d, keying: (r.volume * r.manual) / 60, checking: (r.volume * r.review) / 60, volume: r.volume };
    });
    const keying = per.reduce((t, p) => t + p.keying, 0);
    const checking = per.reduce((t, p) => t + p.checking, 0);
    return { per, keying, checking, moved: keying - checking };
  }, [rows]);

  const kpis = [
    { icon: IconClockEdit, label: 'Keying by hand', val: `${fmt(calc.keying)} h`, sub: 'per month' },
    { icon: IconEyeCheck, label: 'Checking extracts', val: `${fmt(calc.checking)} h`, sub: 'per month' },
    { icon: IconArrowsExchange, label: 'Moved to checking', val: calc.moved > 0 ? `${fmt(calc.moved)} h` : 'None', sub: calc.moved > 0 ? 'per month' : 'at these timings', key: true },
    { icon: IconCalendarStats, label: 'Over a year', val: calc.moved > 0 ? `${fmt(calc.moved * 12)} h` : 'None', sub: 'same volumes each month' },
  ];

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · Fund accounting</span>
          <Title className={classes.heroTitle}>
            Fund accounting <span className={classes.accent}>data-entry time estimator</span>
          </Title>
          <Text className={classes.heroDesc}>
            See how many hours a month your team spends keying invoices, bank statement lines and custodian statement
            rows, and how much of that becomes checking an extract instead. You supply every number.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="xl">
          <div className={classes.layout}>
            <aside className={classes.controls}>
              <div className={classes.panelTitle}>Your volumes and timings</div>
              <p className={classes.panelHint}>The starting values are placeholders. Replace them with your own.</p>

              {DOCS.map((d) => (
                <fieldset key={d.id} className={classes.group}>
                  <legend className={classes.groupLegend}>{d.label}</legend>
                  <NumberInput label={`How many ${d.unit}`} value={rows[d.id].volume} min={0} hideControls onChange={(v) => set(d.id, 'volume', v)} />
                  <NumberInput label="Minutes to key one by hand" value={rows[d.id].manual} min={0} decimalScale={1} hideControls onChange={(v) => set(d.id, 'manual', v)} />
                  <NumberInput label="Minutes to check one extract" value={rows[d.id].review} min={0} decimalScale={1} hideControls onChange={(v) => set(d.id, 'review', v)} />
                </fieldset>
              ))}

              <div className={classes.divider} />
              <Button component={Link} href="/products/fund-accounting" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>
                See AI-assisted fund accounting
              </Button>
              <ShareLinkButton fullWidth className={classes.shareBtn} />
            </aside>

            <div className={classes.results} aria-live="polite">
              <div className={classes.kpiGrid}>
                {kpis.map((k) => (
                  <div key={k.label} className={`${classes.kpiCard} ${k.key ? classes.kpiCardKey : ''}`}>
                    <span className={classes.kpiIcon}><k.icon size={18} stroke={1.7} /></span>
                    <div className={classes.kpiLabel}>{k.label}</div>
                    <div className={classes.kpiVal}>{k.val}</div>
                    <div className={classes.kpiSub}>{k.sub}</div>
                  </div>
                ))}
              </div>

              <div className={classes.sectionLabel}>By document, hours per month</div>
              <div className={classes.table} role="table" aria-label="Hours per month by document type">
                <div className={classes.tHead} role="row">
                  <span role="columnheader">Document</span>
                  <span className={classes.tNum} role="columnheader">Volume</span>
                  <span className={classes.tNum} role="columnheader">Keying by hand</span>
                  <span className={classes.tNum} role="columnheader">Checking</span>
                </div>
                {calc.per.map((p) => (
                  <div key={p.id} className={classes.tRow} role="row">
                    <span role="rowheader">{p.label}</span>
                    <span className={classes.tNum} role="cell">{p.volume.toLocaleString('en-SG')}</span>
                    <span className={classes.tNum} role="cell">{fmt(p.keying)} h</span>
                    <span className={classes.tNum} role="cell">{fmt(p.checking)} h</span>
                  </div>
                ))}
              </div>

              <div className={classes.note}>
                <IconInfoCircle size={18} className={classes.noteIcon} />
                <div>
                  <strong>Checking does not disappear.</strong> A person still reviews every extract, corrects anything
                  that looks wrong and posts each journal voucher. This estimate moves time from typing to checking; it
                  does not remove the review. Suggested ledger mapping and learning are not modelled.
                </div>
              </div>

              <Text className={classes.disclaimer}>
                Illustrative only, not a guarantee or a forecast. Real time depends on your fund size, how often you
                process each document, document quality and how long your team takes to key and to check. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

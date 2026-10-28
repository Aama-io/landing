import { useState } from 'react';
import { NumberInput } from '@mantine/core';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import s from './ProductDetail.module.css';

// An illustration, not a claim: the visitor supplies volumes and timings, and the maths only
// moves their own hours from "keying by hand" to "checking an extract". The starting values are
// placeholders to show how it works, and the copy says so.
type Row = { id: string; label: string; unit: string; volume: number; manual: number; review: number };

const START: Row[] = [
  { id: 'invoices', label: 'Supplier invoices', unit: 'per month', volume: 40, manual: 5, review: 1 },
  { id: 'bank', label: 'Bank statement lines', unit: 'per month', volume: 300, manual: 1.5, review: 0.3 },
  { id: 'custodian', label: 'Custodian statement rows', unit: 'per month', volume: 120, manual: 1, review: 0.3 },
];

const hours = (minutes: number) => minutes / 60;
const fmt = (n: number) => n.toLocaleString('en-SG', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function AiTimeIllustration() {
  const [rows, setRows] = useState<Row[]>(START);

  const set = (id: string, key: 'volume' | 'manual' | 'review', value: number | string) => {
    const n = typeof value === 'number' ? value : Number(value);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: Number.isFinite(n) && n >= 0 ? n : 0 } : r)));
  };

  const keying = hours(rows.reduce((t, r) => t + r.volume * r.manual, 0));
  const reviewing = hours(rows.reduce((t, r) => t + r.volume * r.review, 0));
  const shifted = keying - reviewing;

  return (
    <Reveal>
      <div className={s.illus}>
        <div className={s.illusForm}>
          <span className={s.illusEyebrow}>Illustration</span>
          <h3 className={s.illusTitle}>Try it with your own volumes</h3>
          <p className={s.illusText}>
            How much time this moves depends on your fund size, how often you process each document and how long
            your team takes. Enter your own numbers; the starting values are placeholders.
          </p>
          <div className={s.illusRows}>
            {rows.map((r) => (
              <fieldset key={r.id} className={s.illusRow}>
                <legend className={s.illusLegend}>{r.label}</legend>
                <NumberInput label={`How many ${r.unit}`} value={r.volume} min={0} hideControls onChange={(v) => set(r.id, 'volume', v)} />
                <NumberInput label="Minutes to key one by hand" value={r.manual} min={0} decimalScale={1} hideControls onChange={(v) => set(r.id, 'manual', v)} />
                <NumberInput label="Minutes to check one extract" value={r.review} min={0} decimalScale={1} hideControls onChange={(v) => set(r.id, 'review', v)} />
              </fieldset>
            ))}
          </div>
        </div>

        <div className={s.illusResult} aria-live="polite">
          <div className={s.illusResultHead}>Hours per month, at your numbers</div>
          <div className={s.illusStat}>
            <span className={s.illusStatLabel}>Keying by hand</span>
            <span className={s.illusStatValue}>{fmt(keying)} h</span>
          </div>
          <div className={s.illusStat}>
            <span className={s.illusStatLabel}>Checking the extracts</span>
            <span className={s.illusStatValue}>{fmt(reviewing)} h</span>
          </div>
          <div className={s.illusBig}>
            {shifted > 0 ? (
              <>
                <span className={s.illusBigValue}>{fmt(shifted)} h</span>
                <span className={s.illusBigLabel}>moves from typing to checking each month</span>
              </>
            ) : (
              <span className={s.illusBigLabel}>At these timings, checking takes as long as keying.</span>
            )}
          </div>
          <Link href="/tools/fund-accounting-data-entry-time-estimator" className={s.illusLink}>
            Open the full estimator →
          </Link>
          <p className={s.illusFine}>
            Illustrative only, not a guarantee. A person still checks every extract and posts every journal voucher.
            Suggested ledger mapping and learning are not modelled here.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

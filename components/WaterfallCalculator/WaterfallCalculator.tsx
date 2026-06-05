// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Tabs, Slider, NumberInput, TextInput, Select, Button, ActionIcon } from '@mantine/core';
import { IconPlus, IconX, IconAlertTriangle, IconCircleCheck, IconArrowRight } from '@tabler/icons-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Legend, BarChart, Bar, CartesianGrid,
} from 'recharts';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import classes from './WaterfallCalculator.module.css';

// ══════════════════════════════════════════════════════════════════
// MATH ENGINE — European (whole-fund) waterfall with date-based pref
// ══════════════════════════════════════════════════════════════════

function yearFraction(investDate, distDate, convention) {
  const a = new Date(investDate);
  const b = new Date(distDate);
  if (isNaN(a) || isNaN(b) || b <= a) return 0;
  if (convention === '30360') {
    let d1 = Math.min(a.getDate(), 30);
    let d2 = b.getDate();
    if (d2 === 31 && d1 === 30) d2 = 30;
    const days = 360 * (b.getFullYear() - a.getFullYear()) + 30 * (b.getMonth() - a.getMonth()) + (d2 - d1);
    return days / 360;
  }
  const days = (b - a) / 86400000;
  return days / (convention === 'act360' ? 360 : 365);
}

function prefFactor(ratePct, years, compounding) {
  const r = ratePct / 100;
  if (years <= 0) return 0;
  return compounding === 'simple' ? r * years : Math.pow(1 + r, years) - 1;
}

// invested → proceeds over `years`: closed-form IRR for a single in/out flow
function irr(invested, proceeds, years) {
  if (invested <= 0 || proceeds <= 0 || years <= 0) return 0;
  return (Math.pow(proceeds / invested, 1 / years) - 1) * 100;
}

function computeWaterfall({ investors, proceeds, preferredReturn, promote, catchupRate, years, compounding }) {
  const gp = investors.find((g) => g.type === 'gp');
  const lps = investors.filter((g) => g.type === 'lp');
  const totalCapital = investors.reduce((s, g) => s + g.capital, 0);
  const lpCapital = lps.reduce((s, g) => s + g.capital, 0);
  const gpCapital = gp ? gp.capital : 0;
  const pf = prefFactor(preferredReturn, years, compounding);
  const frac = (g) => (totalCapital > 0 ? g.capital / totalCapital : 0);
  const lpFrac = totalCapital > 0 ? lpCapital / totalCapital : 0;
  const gpFrac = totalCapital > 0 ? gpCapital / totalCapital : 0;

  const recv = {};
  investors.forEach((g) => { recv[g.id] = 0; });
  let remaining = proceeds;
  const tiers = [];

  // Tier 1 — Return of Capital (pro-rata to committed capital)
  const roc = Math.min(remaining, totalCapital);
  investors.forEach((g) => { recv[g.id] += roc * frac(g); });
  remaining -= roc;
  tiers.push({ key: 'roc', label: 'Return of Capital', total: roc, lp: roc * lpFrac, gp: roc * gpFrac, status: roc >= totalCapital - 1 ? 'Full' : 'Partial' });

  // Tier 2 — Preferred Return (accrued over the period)
  const prefDue = totalCapital * pf;
  const prefPaid = Math.min(remaining, prefDue);
  investors.forEach((g) => { recv[g.id] += prefPaid * frac(g); });
  remaining -= prefPaid;
  tiers.push({ key: 'pref', label: 'Preferred Return', total: prefPaid, lp: prefPaid * lpFrac, gp: prefPaid * gpFrac, status: prefDue <= 1 ? 'None' : prefPaid >= prefDue - 1 ? 'Full' : 'Partial' });

  // Tier 3 — GP Catch-Up
  let catchup = 0;
  if (remaining > 0 && catchupRate > 0 && promote > 0 && gp) {
    const p = promote / 100;
    const target = (p * prefPaid) / (1 - p);
    catchup = Math.min(remaining, target * (catchupRate / 100));
    recv[gp.id] += catchup;
    remaining -= catchup;
  }
  tiers.push({ key: 'catchup', label: 'GP Catch-Up', total: catchup, lp: 0, gp: catchup, status: catchup <= 1 ? 'None' : 'Full' });

  // Tier 4 — Profit Split (carry)
  let gpCarryPromote = 0;
  let splitLP = 0;
  let splitGP = 0;
  if (remaining > 0) {
    const p = promote / 100;
    gpCarryPromote = remaining * p;
    const lpSide = remaining - gpCarryPromote;
    investors.forEach((g) => { recv[g.id] += lpSide * frac(g); });
    if (gp) recv[gp.id] += gpCarryPromote;
    splitLP = lpSide * lpFrac;
    splitGP = gpCarryPromote + lpSide * gpFrac;
    remaining = 0;
  }
  tiers.push({ key: 'split', label: 'Profit Split', total: splitLP + splitGP, lp: splitLP, gp: splitGP, status: splitLP + splitGP > 1 ? 'Full' : 'None' });

  const groupsOut = investors.map((g) => ({
    ...g,
    received: recv[g.id],
    profit: recv[g.id] - g.capital,
    multiple: g.capital > 0 ? recv[g.id] / g.capital : 0,
  }));
  const lpReceived = lps.reduce((s, g) => s + recv[g.id], 0);
  const gpReceived = gp ? recv[gp.id] : 0;
  const effectiveCarry = catchup + gpCarryPromote;

  return {
    years, pf, prefDue, totalCapital, proceeds, tiers, groups: groupsOut,
    lpCapital, gpCapital, lpReceived, gpReceived, effectiveCarry,
    moic: totalCapital > 0 ? proceeds / totalCapital : 0,
    lpMoic: lpCapital > 0 ? lpReceived / lpCapital : 0,
    gpMoic: gpCapital > 0 ? gpReceived / gpCapital : 0,
  };
}

// Aggregate helper (single LP + GP) — used by scenarios / IRR / clawback
function aggWaterfall({ totalInvested, gpCommitPct, proceeds, preferredReturn, promote, catchupRate, years, compounding }) {
  const gpCap = totalInvested * (gpCommitPct / 100);
  return computeWaterfall({
    investors: [
      { id: 'lp', type: 'lp', capital: totalInvested - gpCap },
      { id: 'gp', type: 'gp', capital: gpCap },
    ],
    proceeds, preferredReturn, promote, catchupRate, years, compounding,
  });
}

// ══════════════════════════════════════════════════════════════════
// FORMATTING + PALETTE
// ══════════════════════════════════════════════════════════════════

const fmt = (n) => (n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n / 1e3).toFixed(0)}K` : `$${Math.round(n)}`);
const pct = (n, t) => (t > 0 ? ((n / t) * 100).toFixed(1) + '%' : '0%');

const COL = { lp: '#1f5aff', gp: '#d97706', gross: '#94a3b8', green: '#16a34a', red: '#e8553e', amber: '#d97706', axis: '#94a3b8', text: '#475569', grid: '#eef2f7' };
const moicColor = (v) => (v >= 2.5 ? COL.green : v >= 1.5 ? COL.lp : v >= 1 ? COL.amber : COL.red);
const irrColor = (v) => (v >= 20 ? COL.green : v >= 12 ? COL.lp : v >= 0 ? COL.amber : COL.red);
const statusClass = (s) => (s === 'Full' ? classes.statusFull : s === 'Partial' ? classes.statusPartial : classes.statusNone);
const statusLabel = (s) => (s === 'Full' ? 'Fully paid' : s === 'Partial' ? 'Partial' : '—');

const tooltipStyle = { background: '#ffffff', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 12px 30px rgba(15,23,42,0.10)', fontSize: 12 };
const DAYCOUNTS = [{ value: 'act365', label: 'Actual / 365' }, { value: 'act360', label: 'Actual / 360' }, { value: '30360', label: '30 / 360' }];
const COMPOUNDING = [{ value: 'compound', label: 'Compounded annually' }, { value: 'simple', label: 'Simple' }];
const TABS = ['Waterfall', 'Scenarios', 'IRR Curves', 'Clawback'];

function LabeledSlider({ label, value, onChange, min, max, step = 1, suffix = '', hint }) {
  return (
    <div className={classes.sliderRow}>
      <div className={classes.sliderTop}>
        <span className={classes.fieldLabel}>{label}</span>
        <span className={classes.sliderVal}>{value}{suffix}</span>
      </div>
      <Slider value={value} onChange={onChange} min={min} max={max} step={step} label={null} size="sm" color="blue" />
      {hint && <div className={classes.hint}>{hint}</div>}
    </div>
  );
}

function Kpi({ label, value, color, sub }) {
  return (
    <div className={classes.kpi}>
      <div className={classes.kpiVal} style={{ color: color || 'var(--text-strong)' }}>{value}</div>
      {sub && <div className={classes.kpiSub}>{sub}</div>}
      <div className={classes.kpiLabel}>{label}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════

export default function WaterfallCalculator() {
  const [tab, setTab] = useState('Waterfall');

  const [groups, setGroups] = useState([
    { name: 'LP Group A', capital: 60 },
    { name: 'LP Group B', capital: 39 },
  ]);
  const [gpCapital, setGpCapital] = useState(1);
  const [proceeds, setProceeds] = useState(185);
  const [terms, setTerms] = useState({ preferredReturn: 8, promote: 20, catchupRate: 100, compounding: 'compound' });
  const [dates, setDates] = useState({ invest: '2021-06-30', dist: '2024-12-31', dayCount: 'act365' });

  // Restore the core economics from a shared link on mount, then keep the URL in sync.
  useEffect(() => {
    applyParams({
      g: (v) => { const a = JSON.parse(v); if (Array.isArray(a) && a.length) setGroups(a.map((x) => ({ name: String(x.name ?? 'LP Group'), capital: Number(x.capital) || 0 }))); },
      gp: (v) => setGpCapital(Number(v) || 0),
      pr: (v) => setProceeds(Number(v) || 0),
      pref: (v) => setTerms((t) => ({ ...t, preferredReturn: Number(v) || 0 })),
      promo: (v) => setTerms((t) => ({ ...t, promote: Number(v) || 0 })),
      cu: (v) => setTerms((t) => ({ ...t, catchupRate: Number(v) || 0 })),
      comp: (v) => (['simple', 'compound'].includes(v) ? setTerms((t) => ({ ...t, compounding: v })) : null),
      di: (v) => setDates((d) => ({ ...d, invest: v })),
      dd: (v) => setDates((d) => ({ ...d, dist: v })),
      dc: (v) => (['act365', 'act360', '30360'].includes(v) ? setDates((d) => ({ ...d, dayCount: v })) : null),
      tab: (v) => setTab(v),
    });
  }, []);
  useEffect(() => {
    syncParams({
      g: JSON.stringify(groups), gp: gpCapital, pr: proceeds,
      pref: terms.preferredReturn, promo: terms.promote, cu: terms.catchupRate, comp: terms.compounding,
      di: dates.invest, dd: dates.dist, dc: dates.dayCount, tab,
    });
  }, [groups, gpCapital, proceeds, terms, dates, tab]);

  const updateGroup = (i, k, v) => setGroups((p) => p.map((g, j) => (j === i ? { ...g, [k]: v } : g)));
  const removeGroup = (i) => setGroups((p) => (p.length > 1 ? p.filter((_, j) => j !== i) : p));
  const addGroup = () => setGroups((p) => [...p, { name: `LP Group ${String.fromCharCode(65 + p.length)}`, capital: 25 }]);

  const totalInvested = useMemo(() => groups.reduce((s, g) => s + (Number(g.capital) || 0), 0) + (Number(gpCapital) || 0), [groups, gpCapital]);
  const gpCommitPct = totalInvested > 0 ? (gpCapital / totalInvested) * 100 : 0;
  const years = useMemo(() => yearFraction(dates.invest, dates.dist, dates.dayCount), [dates]);

  const investors = useMemo(() => [
    ...groups.map((g, i) => ({ id: `lp${i}`, name: g.name, type: 'lp', capital: (Number(g.capital) || 0) * 1e6 })),
    { id: 'gp', name: 'GP (co-invest)', type: 'gp', capital: (Number(gpCapital) || 0) * 1e6 },
  ], [groups, gpCapital]);

  const result = useMemo(() => computeWaterfall({
    investors, proceeds: proceeds * 1e6, preferredReturn: terms.preferredReturn, promote: terms.promote, catchupRate: terms.catchupRate, years, compounding: terms.compounding,
  }), [investors, proceeds, terms, years]);

  const currentIRR = useMemo(() => irr(result.totalCapital, result.proceeds, years), [result, years]);
  const lpIRR = useMemo(() => irr(result.lpCapital, result.lpReceived, years), [result, years]);

  // Scenarios (tied to live fund size / terms; vary proceeds multiple, promote, pref)
  const [scenarios, setScenarios] = useState([
    { name: 'Bear', proceedsMultiple: 1.2, promote: 20, preferredReturn: 8, color: COL.red },
    { name: 'Base', proceedsMultiple: 1.85, promote: 20, preferredReturn: 8, color: COL.lp },
    { name: 'Bull', proceedsMultiple: 3.2, promote: 20, preferredReturn: 8, color: COL.green },
  ]);
  const setSc = (i, k) => (v) => setScenarios((p) => p.map((s, j) => (j === i ? { ...s, [k]: Number(v) || 0 } : s)));
  const scenarioCalc = (s) => aggWaterfall({ totalInvested: totalInvested * 1e6, gpCommitPct, proceeds: totalInvested * s.proceedsMultiple * 1e6, preferredReturn: s.preferredReturn, promote: s.promote, catchupRate: terms.catchupRate, years, compounding: terms.compounding });

  const irrCurve = useMemo(() => {
    const pts = [];
    for (let m = 0.5; m <= 4.01; m += 0.1) {
      const proc = totalInvested * m * 1e6;
      const r = aggWaterfall({ totalInvested: totalInvested * 1e6, gpCommitPct, proceeds: proc, preferredReturn: terms.preferredReturn, promote: terms.promote, catchupRate: terms.catchupRate, years, compounding: terms.compounding });
      pts.push({
        moic: +m.toFixed(1),
        grossIRR: +irr(totalInvested * 1e6, proc, years).toFixed(1),
        lpIRR: +irr(r.lpCapital, r.lpReceived, years).toFixed(1),
        gpIRR: Math.min(200, +irr(r.gpCapital, r.gpReceived, years).toFixed(1)),
      });
    }
    return pts;
  }, [totalInvested, gpCommitPct, terms, years]);

  // Clawback
  const [deals, setDeals] = useState([
    { name: 'Deal A (Exit Y1)', gpReceived: 8e6, lpReceived: 32e6 },
    { name: 'Deal B (Exit Y2)', gpReceived: 5e6, lpReceived: 20e6 },
    { name: 'Deal C (Exit Y4)', gpReceived: 2e6, lpReceived: 18e6 },
  ]);
  const clawbackData = useMemo(() => {
    const gpActualReceived = deals.reduce((s, d) => s + d.gpReceived, 0);
    const whole = aggWaterfall({ totalInvested: totalInvested * 1e6, gpCommitPct, proceeds: proceeds * 1e6, preferredReturn: terms.preferredReturn, promote: terms.promote, catchupRate: 100, years, compounding: terms.compounding });
    const gpShouldHave = whole.effectiveCarry;
    const clawback = Math.max(0, gpActualReceived - gpShouldHave);
    return { gpActualReceived, gpShouldHave, clawback, taxGrossUp: clawback * 0.35, netClawback: clawback * 0.65 };
  }, [deals, totalInvested, gpCommitPct, proceeds, terms, years]);

  const barW = (n) => Math.min(100, (n / Math.max(1, result.proceeds)) * 100);

  // ── Controls ──
  const controls = (
    <aside className={classes.controls}>
      <div className={classes.panelTitle}>Investor groups</div>
      {groups.map((g, i) => (
        <div key={i} className={classes.groupRow}>
          <TextInput size="xs" className={classes.groupName} value={g.name} onChange={(e) => updateGroup(i, 'name', e.currentTarget.value)} aria-label="Group name" />
          <NumberInput size="xs" className={classes.groupCap} value={g.capital} onChange={(v) => updateGroup(i, 'capital', Number(v) || 0)} hideControls prefix="$" suffix="M" aria-label="Capital" />
          <ActionIcon variant="subtle" color="gray" onClick={() => removeGroup(i)} disabled={groups.length <= 1} aria-label="Remove group">
            <IconX size={15} />
          </ActionIcon>
        </div>
      ))}
      <Button variant="default" size="xs" mt={4} leftSection={<IconPlus size={14} />} onClick={addGroup}>Add group</Button>

      <NumberInput mt="md" className={classes.numField} label="GP co-investment" value={gpCapital} onChange={(v) => setGpCapital(Number(v) || 0)} prefix="$ " suffix=" M" hideControls />
      <div className={classes.totalLine}><span>Total committed</span><strong>{fmt(totalInvested * 1e6)}</strong></div>

      <div className={classes.divider} />
      <div className={classes.panelTitle}>Distribution</div>
      <NumberInput className={classes.numField} label="Total distribution" value={proceeds} onChange={(v) => setProceeds(Number(v) || 0)} prefix="$ " suffix=" M" hideControls />

      <div className={classes.divider} />
      <div className={classes.panelTitle}>Waterfall terms</div>
      <LabeledSlider label="Preferred Return" value={terms.preferredReturn} onChange={(v) => setTerms((t) => ({ ...t, preferredReturn: v }))} min={0} max={20} step={0.5} suffix="% / yr" hint="Annual hurdle, accrued over the period" />
      <LabeledSlider label="GP Promote (carry)" value={terms.promote} onChange={(v) => setTerms((t) => ({ ...t, promote: v }))} min={10} max={30} suffix="%" hint="GP profit share above the hurdle" />
      <LabeledSlider label="GP Catch-Up" value={terms.catchupRate} onChange={(v) => setTerms((t) => ({ ...t, catchupRate: v }))} min={0} max={100} step={25} suffix="%" hint="0% = none · 100% = full" />
      <Select className={classes.selectField} label="Preferred accrual" data={COMPOUNDING} value={terms.compounding} onChange={(v) => setTerms((t) => ({ ...t, compounding: v || 'compound' }))} allowDeselect={false} comboboxProps={{ withinPortal: true }} />

      <div className={classes.divider} />
      <div className={classes.panelTitle}>Timing</div>
      <div className={classes.dateGrid}>
        <TextInput className={classes.dateField} type="date" label="Investment" value={dates.invest} onChange={(e) => setDates((d) => ({ ...d, invest: e.currentTarget.value }))} />
        <TextInput className={classes.dateField} type="date" label="Distribution" value={dates.dist} onChange={(e) => setDates((d) => ({ ...d, dist: e.currentTarget.value }))} />
      </div>
      <Select className={classes.selectField} label="Day-count convention" data={DAYCOUNTS} value={dates.dayCount} onChange={(v) => setDates((d) => ({ ...d, dayCount: v || 'act365' }))} allowDeselect={false} comboboxProps={{ withinPortal: true }} />
      <div className={classes.yearsInfo}>Accrual period: <strong>{years.toFixed(2)} yrs</strong></div>

      <div className={classes.divider} />
      <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>See it in the platform</Button>
      <ShareLinkButton fullWidth className={classes.shareBtn} />
    </aside>
  );

  // ── Waterfall tab ──
  const waterfallTab = (
    <>
      <div className={classes.accrualBanner}>
        <span>Accrued preferred return: <strong>{fmt(result.prefDue)}</strong></span>
        <span>over <strong>{years.toFixed(2)} yrs</strong> at <strong>{terms.preferredReturn}%</strong> ({terms.compounding === 'simple' ? 'simple' : 'compounded'}, {DAYCOUNTS.find((d) => d.value === dates.dayCount)?.label})</span>
      </div>

      <div className={classes.kpiGrid}>
        <Kpi label="Fund MOIC" value={`${result.moic.toFixed(2)}x`} color={moicColor(result.moic)} />
        <Kpi label="Gross IRR" value={`${currentIRR.toFixed(1)}%`} color={irrColor(currentIRR)} sub={`${years.toFixed(1)}yr hold`} />
        <Kpi label="LP MOIC" value={`${result.lpMoic.toFixed(2)}x`} color={COL.lp} sub={`IRR: ${lpIRR.toFixed(1)}%`} />
        <Kpi label="GP Carry Earned" value={fmt(result.effectiveCarry)} color={COL.gp} sub={`GP total ${fmt(result.gpReceived)}`} />
      </div>

      <div className={classes.card}>
        <div className={classes.cardLabel}>Proceeds split — {fmt(result.proceeds)}</div>
        <div className={classes.splitTrack}>
          <div style={{ width: `${barW(result.lpReceived)}%`, background: 'linear-gradient(90deg,#3d72ff,#1f5aff)' }} />
          <div style={{ width: `${barW(result.gpReceived)}%`, background: 'linear-gradient(90deg,#f59e0b,#d97706)' }} />
        </div>
        <div className={classes.legend}>
          {[{ color: COL.lp, label: 'LP', val: result.lpReceived }, { color: COL.gp, label: 'GP', val: result.gpReceived }].map(({ color, label, val }) => (
            <div key={label} className={classes.legendItem}>
              <span className={classes.dot} style={{ background: color }} />
              <span>{label}: <strong>{fmt(val)}</strong> <span className={classes.muted}>({pct(val, result.proceeds)})</span></span>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.sectionLabel}>Tier breakdown</div>
      <div className={classes.card} style={{ padding: 0, overflow: 'hidden' }}>
        <table className={classes.table}>
          <thead><tr><th style={{ textAlign: 'left' }}>Tier</th><th>Amount</th><th>% of total</th><th>LP</th><th>GP</th><th>Status</th></tr></thead>
          <tbody>
            {result.tiers.map((t) => (
              <tr key={t.key}>
                <td className={classes.cellName}>{t.label}</td>
                <td>{fmt(t.total)}</td>
                <td className={classes.muted}>{pct(t.total, result.proceeds)}</td>
                <td style={{ color: COL.lp }}>{fmt(t.lp)}</td>
                <td style={{ color: COL.gp }}>{fmt(t.gp)}</td>
                <td><span className={statusClass(t.status)}>{statusLabel(t.status)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={classes.sectionLabel}>LP vs GP summary</div>
      <div className={classes.card} style={{ padding: 0, overflow: 'hidden' }}>
        <table className={classes.table}>
          <thead><tr><th style={{ textAlign: 'left' }} />{<th style={{ color: COL.lp }}>LP (all groups)</th>}<th style={{ color: COL.gp }}>GP</th></tr></thead>
          <tbody>
            {[
              ['Capital invested', fmt(result.lpCapital), fmt(result.gpCapital)],
              ['Total received', fmt(result.lpReceived), fmt(result.gpReceived)],
              ['Net profit', fmt(result.lpReceived - result.lpCapital), fmt(result.gpReceived - result.gpCapital)],
              ['Multiple', `${result.lpMoic.toFixed(2)}x`, `${result.gpMoic.toFixed(2)}x`],
            ].map(([l, a, b]) => (
              <tr key={l}><td className={classes.cellName}>{l}</td><td>{a}</td><td>{b}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={classes.sectionLabel}>Per-group breakdown</div>
      <div className={classes.card} style={{ padding: 0, overflow: 'hidden' }}>
        <table className={classes.table}>
          <thead><tr><th style={{ textAlign: 'left' }}>Investor</th><th>Capital</th><th>Received</th><th>Net profit</th><th>Multiple</th></tr></thead>
          <tbody>
            {result.groups.map((g) => (
              <tr key={g.id}>
                <td className={classes.cellName} style={{ color: g.type === 'gp' ? COL.gp : undefined }}>{g.name}</td>
                <td>{fmt(g.capital)}</td>
                <td>{fmt(g.received)}</td>
                <td style={{ color: g.profit >= 0 ? COL.green : COL.red }}>{fmt(g.profit)}</td>
                <td>{g.multiple.toFixed(2)}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  // ── Scenarios tab ──
  const scBarData = scenarios.map((s) => { const r = scenarioCalc(s); return { name: s.name, LP: +(r.lpReceived / 1e6).toFixed(2), GP: +(r.gpReceived / 1e6).toFixed(2) }; });
  const scenariosTab = (
    <>
      <div className={classes.sectionLabel}>Bear / Base / Bull — side by side</div>
      <div className={classes.card} style={{ padding: 0, overflow: 'hidden' }}>
        <table className={classes.table}>
          <thead><tr><th style={{ textAlign: 'left' }} />{scenarios.map((s) => <th key={s.name} style={{ color: s.color }}>{s.name}</th>)}</tr></thead>
          <tbody>
            {[
              ['Proceeds', (s) => `$${(totalInvested * s.proceedsMultiple).toFixed(0)}M`],
              ['Fund MOIC', (s) => `${s.proceedsMultiple.toFixed(2)}x`],
              ['LP receives', (s) => fmt(scenarioCalc(s).lpReceived)],
              ['LP MOIC', (s) => `${scenarioCalc(s).lpMoic.toFixed(2)}x`],
              ['GP carry', (s) => fmt(scenarioCalc(s).effectiveCarry)],
              ['Hurdle cleared?', (s) => (s.proceedsMultiple > 1 + prefFactor(s.preferredReturn, years, terms.compounding) ? '✓ Yes' : '✗ No')],
            ].map(([rowLabel, valFn]) => (
              <tr key={rowLabel}><td className={classes.rowLabel}>{rowLabel}</td>{scenarios.map((s, i) => <td key={i}>{valFn(s)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={classes.sectionLabel}>Scenario assumptions</div>
      <div className={classes.scGrid}>
        {scenarios.map((s, i) => (
          <div key={i} className={classes.card} style={{ borderTop: `3px solid ${s.color}` }}>
            <div className={classes.scName} style={{ color: s.color }}>{s.name}</div>
            <LabeledSlider label="MOIC" value={s.proceedsMultiple} onChange={setSc(i, 'proceedsMultiple')} min={0.5} max={5} step={0.05} suffix="x" />
            <LabeledSlider label="Promote %" value={s.promote} onChange={setSc(i, 'promote')} min={10} max={30} suffix="%" />
            <LabeledSlider label="Hurdle %" value={s.preferredReturn} onChange={setSc(i, 'preferredReturn')} min={0} max={20} step={0.5} suffix="%" />
          </div>
        ))}
      </div>

      <div className={classes.sectionLabel}>LP vs GP distribution by scenario ($M)</div>
      <div className={classes.card}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={scBarData} barCategoryGap="30%">
            <CartesianGrid stroke={COL.grid} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: COL.text, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} unit="M" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(31,90,255,0.05)' }} />
            <Legend wrapperStyle={{ fontSize: 12, color: COL.text }} />
            <Bar dataKey="LP" fill={COL.lp} radius={[5, 5, 0, 0]} />
            <Bar dataKey="GP" fill={COL.gp} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  // ── IRR tab ──
  const irrTab = (
    <>
      <div className={classes.sectionLabel}>IRR vs. MOIC — gross / LP net / GP</div>
      <div className={classes.card}>
        <div className={classes.cardLabel}>{years.toFixed(1)}yr hold · {terms.preferredReturn}% hurdle · {terms.promote}% promote · {terms.catchupRate}% catch-up</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={irrCurve} margin={{ right: 16, left: 0, top: 8 }}>
            <CartesianGrid stroke={COL.grid} vertical={false} />
            <XAxis dataKey="moic" tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'MOIC', position: 'insideBottom', offset: -2, fill: COL.axis, fontSize: 11 }} />
            <YAxis tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" domain={[-20, 80]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v}%`, n]} labelFormatter={(v) => `MOIC: ${v}x`} />
            <ReferenceLine y={0} stroke={COL.grid} />
            <ReferenceLine y={terms.preferredReturn} stroke="#f59e0b88" strokeDasharray="4 4" label={{ value: `Hurdle ${terms.preferredReturn}%`, fill: '#b45309', fontSize: 10 }} />
            <ReferenceLine x={result.moic} stroke="#1f5aff66" strokeDasharray="4 4" label={{ value: 'Current', fill: '#1f5aff', fontSize: 10, position: 'top' }} />
            <Legend wrapperStyle={{ fontSize: 12, color: COL.text }} />
            <Line type="monotone" dataKey="grossIRR" name="Gross IRR" stroke={COL.gross} strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
            <Line type="monotone" dataKey="lpIRR" name="LP Net IRR" stroke={COL.lp} strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="gpIRR" name="GP IRR" stroke={COL.gp} strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={classes.calloutGrid}>
        {[
          { label: 'Gross IRR', val: `${currentIRR.toFixed(1)}%`, sub: 'Pre-carry', color: COL.gross },
          { label: 'LP Net IRR', val: `${lpIRR.toFixed(1)}%`, sub: 'After preferred + carry split', color: COL.lp },
          { label: 'Hurdle Cleared', val: result.moic > 1 + result.pf ? '✓ Yes' : '✗ No', sub: `Need ${(1 + result.pf).toFixed(2)}x MOIC`, color: result.moic > 1 + result.pf ? COL.green : COL.red },
        ].map(({ label, val, sub, color }) => (
          <div key={label} className={classes.kpi}>
            <div className={classes.kpiVal} style={{ color, fontSize: 22 }}>{val}</div>
            <div className={classes.kpiSub}>{sub}</div>
            <div className={classes.kpiLabel}>{label}</div>
          </div>
        ))}
      </div>

      <div className={classes.card} style={{ marginTop: 16 }}>
        <div className={classes.cardLabel}>IRR sensitivity — vary hold period</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={[2, 3, 4, 5, 6, 7, 8, 9, 10].map((yr) => {
            const r = aggWaterfall({ totalInvested: totalInvested * 1e6, gpCommitPct, proceeds: proceeds * 1e6, preferredReturn: terms.preferredReturn, promote: terms.promote, catchupRate: terms.catchupRate, years: yr, compounding: terms.compounding });
            return { yr, lpIRR: +irr(r.lpCapital, r.lpReceived, yr).toFixed(1), grossIRR: +irr(totalInvested * 1e6, proceeds * 1e6, yr).toFixed(1) };
          })}>
            <CartesianGrid stroke={COL.grid} vertical={false} />
            <XAxis dataKey="yr" tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Hold (yrs)', position: 'insideBottom', offset: -2, fill: COL.axis, fontSize: 11 }} />
            <YAxis tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v}%`, n]} labelFormatter={(v) => `${v}yr hold`} />
            <Line type="monotone" dataKey="grossIRR" name="Gross IRR" stroke={COL.gross} strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
            <Line type="monotone" dataKey="lpIRR" name="LP Net IRR" stroke={COL.lp} strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  // ── Clawback tab ──
  const { gpActualReceived, gpShouldHave, clawback, taxGrossUp, netClawback } = clawbackData;
  const hasClawback = clawback > 0;
  const clawbackTab = (
    <>
      <div className={classes.sectionLabel}>GP clawback analysis — whole-fund reconciliation</div>
      <div className={classes.card} style={{ borderColor: hasClawback ? '#f6c9c0' : '#bfe6cd' }}>
        <div className={classes.clawHead}>
          <span className={classes.clawIcon} data-on={hasClawback ? 'warn' : 'ok'}>{hasClawback ? <IconAlertTriangle size={20} /> : <IconCircleCheck size={20} />}</span>
          <div>
            <div className={classes.clawTitle} style={{ color: hasClawback ? COL.red : COL.green }}>{hasClawback ? `Clawback obligation: ${fmt(clawback)}` : 'No clawback obligation'}</div>
            <div className={classes.clawSub}>{hasClawback ? 'GP over-distributed on early exits vs. whole-fund performance' : 'GP distributions consistent with whole-fund waterfall outcome'}</div>
          </div>
        </div>
        <div className={classes.clawGrid}>
          {[
            { label: 'GP Actually Received (carry)', val: fmt(gpActualReceived), color: 'var(--text-strong)' },
            { label: 'GP Should Have (Whole Fund)', val: fmt(gpShouldHave), color: COL.gp },
            { label: 'Gross Clawback', val: fmt(clawback), color: hasClawback ? COL.red : COL.green },
            { label: 'Tax Gross-Up (est. 35%)', val: hasClawback ? `-${fmt(taxGrossUp)}` : 'N/A', color: COL.amber },
            { label: 'Net Clawback to LP', val: hasClawback ? fmt(netClawback) : '$0', color: hasClawback ? COL.red : COL.green },
            { label: 'Recommended Reserve', val: hasClawback ? fmt(clawback * 1.1) : '$0', color: COL.amber },
          ].map(({ label, val, color }) => (
            <div key={label} className={classes.clawCell}><div className={classes.clawCellVal} style={{ color }}>{val}</div><div className={classes.kpiLabel}>{label}</div></div>
          ))}
        </div>
      </div>

      <div className={classes.sectionLabel}>Deal-level GP carry distributions</div>
      <div className={classes.card}>
        <table className={classes.table}>
          <thead><tr><th style={{ textAlign: 'left' }}>Deal</th><th>GP Received</th><th>LP Received</th><th>Edit ($M)</th></tr></thead>
          <tbody>
            {deals.map((d, i) => (
              <tr key={d.name}>
                <td className={classes.cellName}>{d.name}</td>
                <td style={{ color: COL.gp }}>{fmt(d.gpReceived)}</td>
                <td style={{ color: COL.lp }}>{fmt(d.lpReceived)}</td>
                <td><NumberInput size="xs" hideControls value={+(d.gpReceived / 1e6).toFixed(1)} step={0.5} onChange={(v) => setDeals((p) => p.map((x, j) => (j === i ? { ...x, gpReceived: (Number(v) || 0) * 1e6 } : x)))} styles={{ input: { textAlign: 'right' } }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button variant="default" size="xs" mt="md" leftSection={<IconPlus size={14} />} onClick={() => setDeals((p) => [...p, { name: `Deal ${String.fromCharCode(64 + p.length + 1)}`, gpReceived: 2e6, lpReceived: 10e6 }])}>Add deal</Button>
      </div>

      <div className={classes.note}>
        <strong>Clawback mechanics:</strong> Under a whole-fund (European) waterfall, the GP must return any carried interest received on early exits if the fund&apos;s total distributions do not ultimately satisfy the LP preferred return and return of capital on a portfolio-wide basis. The obligation is typically subject to a tax gross-up provision (commonly 35%) and may be capped at the GP&apos;s after-tax carry received. GPs are advised to maintain a clawback reserve (escrow) of 15–25% of carry distributions pending final fund close.
      </div>
    </>
  );

  const panels = { Waterfall: waterfallTab, Scenarios: scenariosTab, 'IRR Curves': irrTab, Clawback: clawbackTab };

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · PE / VC / Credit</span>
          <Title className={classes.heroTitle}>Waterfall <span className={classes.accent}>distribution calculator</span></Title>
          <Text className={classes.heroDesc}>
            Model a European-style LP/GP waterfall across multiple investor groups — return of capital, a date-accrued
            preferred return, GP catch-up and carry split — with per-group payouts, IRR curves, scenarios and a
            whole-fund clawback check.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="lg">
          <div className={classes.layout}>
            {controls}
            <div className={classes.results}>
              <Tabs value={tab} onChange={setTab} variant="pills" radius="md" classNames={{ list: classes.tabList, tab: classes.tab }}>
                <Tabs.List>{TABS.map((t) => <Tabs.Tab key={t} value={t}>{t}</Tabs.Tab>)}</Tabs.List>
              </Tabs>
              <div className={classes.panel}>{panels[tab]}</div>
            </div>
          </div>
          <Text className={classes.disclaimer}>Illustrative model for educational purposes — not investment advice. Built by aama.io · Singapore VCC &amp; MAS-aligned fund platform.</Text>
        </Container>
      </section>
    </>
  );
}

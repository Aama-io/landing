// @ts-nocheck
import { useMemo, useState } from 'react';
import { Container, Title, Text, Tabs, Slider, NumberInput, Button } from '@mantine/core';
import {
  IconArrowBackUp,
  IconTargetArrow,
  IconArrowUpRight,
  IconArrowsSplit2,
  IconPlus,
  IconAlertTriangle,
  IconCircleCheck,
  IconArrowRight,
} from '@tabler/icons-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import Link from 'next/link';
import classes from './WaterfallCalculator.module.css';

// ══════════════════════════════════════════════════════════════════
// MATH ENGINE (unchanged)
// ══════════════════════════════════════════════════════════════════

function calcWaterfall({ totalProceeds, totalInvested, preferredReturn, carryRate, catchupRate, gpCommitPct }) {
  const invested = totalInvested;
  const proceeds = totalProceeds;
  const lpCommitFrac = 1 - gpCommitPct / 100;
  const gpCommitFrac = gpCommitPct / 100;
  const preferredAmt = invested * (preferredReturn / 100);

  const steps = [];
  let remaining = proceeds;
  let lpPool = 0, gpPool = 0;

  const roc = Math.min(remaining, invested);
  lpPool += roc * lpCommitFrac;
  gpPool += roc * gpCommitFrac;
  remaining -= roc;
  steps.push({ key: 'roc', label: 'Return of Capital', lpAmount: roc * lpCommitFrac, gpAmount: roc * gpCommitFrac, total: roc, remaining });

  const prefTotal = Math.min(remaining, preferredAmt);
  lpPool += prefTotal * lpCommitFrac;
  gpPool += prefTotal * gpCommitFrac;
  remaining -= prefTotal;
  steps.push({ key: 'pref', label: `Preferred Return (${preferredReturn}%)`, lpAmount: prefTotal * lpCommitFrac, gpAmount: prefTotal * gpCommitFrac, total: prefTotal, remaining });

  if (remaining > 0 && catchupRate > 0) {
    const totalSoFar = lpPool + gpPool;
    const catchupTarget = (carryRate / 100) * totalSoFar / (1 - carryRate / 100);
    const actualCatchup = Math.min(remaining, catchupTarget * (catchupRate / 100));
    const cuLP = actualCatchup * (1 - catchupRate / 100);
    const cuGP = actualCatchup * (catchupRate / 100);
    lpPool += cuLP; gpPool += cuGP;
    remaining -= actualCatchup;
    steps.push({ key: 'catchup', label: `GP Catch-Up (${catchupRate}%)`, lpAmount: cuLP, gpAmount: cuGP, total: actualCatchup, remaining });
  }

  if (remaining > 0) {
    const splitGP = remaining * (carryRate / 100);
    const splitLP = remaining - splitGP;
    lpPool += splitLP; gpPool += splitGP;
    steps.push({ key: 'split', label: `Carry Split (${carryRate}/${100 - carryRate})`, lpAmount: splitLP, gpAmount: splitGP, total: remaining, remaining: 0 });
  }

  const moic = proceeds / invested;
  const lpMoic = lpPool / (invested * lpCommitFrac);
  const gpMoic = gpPool / (invested * gpCommitFrac) || 0;
  const effectiveCarry = Math.max(0, gpPool - invested * gpCommitFrac);

  return { steps, totalLP: lpPool, totalGP: gpPool, moic, lpMoic, gpMoic, effectiveCarry, totalProceeds: proceeds, totalInvested: invested };
}

function calcIRR(invested, proceeds, holdYears) {
  if (proceeds <= 0 || invested <= 0) return 0;
  const cf = [-invested, ...Array(holdYears - 1).fill(0), proceeds];
  let r = 0.15;
  for (let i = 0; i < 100; i++) {
    let npv = 0, dnpv = 0;
    cf.forEach((c, t) => { npv += c / (1 + r) ** t; dnpv -= t * c / (1 + r) ** (t + 1); });
    const nr = r - npv / dnpv;
    if (Math.abs(nr - r) < 1e-8) { r = nr; break; }
    r = nr;
  }
  return Math.max(-1, r) * 100;
}

function calcClawback({ totalInvested, totalProceeds, preferredReturn, carryRate, gpCommitPct, dealDistributions }) {
  const gpActualReceived = dealDistributions.reduce((s, d) => s + d.gpReceived, 0);
  const lpActualReceived = dealDistributions.reduce((s, d) => s + d.lpReceived, 0);
  const wholeResult = calcWaterfall({ totalProceeds, totalInvested, preferredReturn, carryRate, catchupRate: 100, gpCommitPct });
  const gpShouldHave = wholeResult.totalGP;
  const clawback = Math.max(0, gpActualReceived - gpShouldHave);
  const taxGrossUp = clawback * 0.35;
  const netClawback = clawback - taxGrossUp;
  return { gpActualReceived, gpShouldHave, clawback, taxGrossUp, netClawback, lpActualReceived, wholeResult };
}

function buildIRRCurve(invested, holdYears, preferredReturn, carryRate, catchupRate, gpCommitPct) {
  const points = [];
  for (let moic = 0.5; moic <= 4.01; moic += 0.1) {
    const proceeds = invested * moic;
    const r = calcWaterfall({ totalProceeds: proceeds, totalInvested: invested, preferredReturn, carryRate, catchupRate, gpCommitPct });
    const grossIRR = calcIRR(invested, proceeds, holdYears);
    const lpIRR = calcIRR(invested * (1 - gpCommitPct / 100), r.totalLP, holdYears);
    const gpIRR = calcIRR(invested * gpCommitPct / 100, r.totalGP, holdYears);
    points.push({ moic: +moic.toFixed(1), grossIRR: +grossIRR.toFixed(1), lpIRR: +lpIRR.toFixed(1), gpIRR: Math.min(200, +gpIRR.toFixed(1)) });
  }
  return points;
}

// ══════════════════════════════════════════════════════════════════
// FORMATTING + PALETTE (brand-aligned)
// ══════════════════════════════════════════════════════════════════

const fmt = (n) => n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n / 1e3).toFixed(0)}K` : `$${Math.round(n)}`;
const pct = (n, t) => t > 0 ? ((n / t) * 100).toFixed(1) + '%' : '0%';

const COL = {
  lp: '#1f5aff',
  gp: '#d97706',
  gross: '#94a3b8',
  green: '#16a34a',
  red: '#e8553e',
  amber: '#d97706',
  axis: '#94a3b8',
  text: '#475569',
  grid: '#eef2f7',
};
const moicColor = (v) => (v >= 2.5 ? COL.green : v >= 1.5 ? COL.lp : v >= 1 ? COL.amber : COL.red);
const irrColor = (v) => (v >= 20 ? COL.green : v >= 12 ? COL.lp : v >= 0 ? COL.amber : COL.red);

const stepIcons = {
  roc: IconArrowBackUp,
  pref: IconTargetArrow,
  catchup: IconArrowUpRight,
  split: IconArrowsSplit2,
};

const tooltipStyle = {
  background: '#ffffff',
  border: '1px solid var(--border)',
  borderRadius: 10,
  boxShadow: '0 12px 30px rgba(15,23,42,0.10)',
  fontSize: 12,
};

// ══════════════════════════════════════════════════════════════════
// SMALL UI PIECES
// ══════════════════════════════════════════════════════════════════

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

const TABS = ['Waterfall', 'Scenarios', 'IRR Curves', 'Clawback'];

// ══════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════

export default function WaterfallCalculator() {
  const [tab, setTab] = useState('Waterfall');

  const [base, setBase] = useState({
    totalInvested: 100, totalProceeds: 185,
    preferredReturn: 8, carryRate: 20, catchupRate: 100,
    gpCommitPct: 1, holdYears: 5,
  });
  const sb = (k) => (v) => setBase((p) => ({ ...p, [k]: Number(v) || 0 }));

  const [scenarios, setScenarios] = useState([
    { name: 'Bear', totalInvested: 100, proceedsMultiple: 1.2, preferredReturn: 8, carryRate: 20, catchupRate: 100, gpCommitPct: 1, color: COL.red },
    { name: 'Base', totalInvested: 100, proceedsMultiple: 1.85, preferredReturn: 8, carryRate: 20, catchupRate: 100, gpCommitPct: 1, color: COL.lp },
    { name: 'Bull', totalInvested: 100, proceedsMultiple: 3.2, preferredReturn: 8, carryRate: 20, catchupRate: 100, gpCommitPct: 1, color: COL.green },
  ]);
  const setSc = (i, k) => (v) => setScenarios((p) => p.map((s, j) => (j === i ? { ...s, [k]: Number(v) || 0 } : s)));

  const [deals, setDeals] = useState([
    { name: 'Deal A (Exit Y1)', gpReceived: 8e6, lpReceived: 32e6 },
    { name: 'Deal B (Exit Y2)', gpReceived: 5e6, lpReceived: 20e6 },
    { name: 'Deal C (Exit Y4)', gpReceived: 2e6, lpReceived: 18e6 },
  ]);

  const result = useMemo(() => calcWaterfall({
    totalProceeds: base.totalProceeds * 1e6,
    totalInvested: base.totalInvested * 1e6,
    preferredReturn: base.preferredReturn,
    carryRate: base.carryRate,
    catchupRate: base.catchupRate,
    gpCommitPct: base.gpCommitPct,
  }), [base]);

  const irrCurve = useMemo(() => buildIRRCurve(base.totalInvested * 1e6, base.holdYears, base.preferredReturn, base.carryRate, base.catchupRate, base.gpCommitPct), [base]);

  const scenarioResults = useMemo(() => scenarios.map((s) => ({
    ...s,
    result: calcWaterfall({ totalProceeds: s.totalInvested * s.proceedsMultiple * 1e6, totalInvested: s.totalInvested * 1e6, preferredReturn: s.preferredReturn, carryRate: s.carryRate, catchupRate: s.catchupRate, gpCommitPct: s.gpCommitPct }),
  })), [scenarios]);

  const clawbackData = useMemo(() => calcClawback({
    totalInvested: base.totalInvested * 1e6,
    totalProceeds: base.totalProceeds * 1e6,
    preferredReturn: base.preferredReturn,
    carryRate: base.carryRate,
    gpCommitPct: base.gpCommitPct,
    dealDistributions: deals,
  }), [base, deals]);

  const currentIRR = useMemo(() => calcIRR(base.totalInvested * 1e6, base.totalProceeds * 1e6, base.holdYears), [base]);
  const lpIRR = useMemo(() => calcIRR(base.totalInvested * (1 - base.gpCommitPct / 100) * 1e6, result.totalLP, base.holdYears), [base, result]);

  const barW = (n) => Math.min(100, (n / result.totalProceeds) * 100);

  // ── Controls panel ──
  const controls = (
    <aside className={classes.controls}>
      <div className={classes.panelTitle}>Fund parameters</div>
      <NumberInput label="Capital Invested" value={base.totalInvested} onChange={sb('totalInvested')} prefix="$ " suffix=" M" hideControls thousandSeparator="," className={classes.numField} />
      <NumberInput label="Total Proceeds" value={base.totalProceeds} onChange={sb('totalProceeds')} prefix="$ " suffix=" M" hideControls thousandSeparator="," className={classes.numField} />

      <div className={classes.divider} />
      <div className={classes.panelTitle}>Waterfall terms</div>
      <LabeledSlider label="Preferred Return" value={base.preferredReturn} onChange={sb('preferredReturn')} min={0} max={20} step={0.5} suffix="%" hint="Annual hurdle before carry activates" />
      <LabeledSlider label="Carried Interest" value={base.carryRate} onChange={sb('carryRate')} min={10} max={30} suffix="%" hint="GP profit share above hurdle" />
      <LabeledSlider label="GP Catch-Up" value={base.catchupRate} onChange={sb('catchupRate')} min={0} max={100} step={25} suffix="%" hint="0% = none · 100% = full" />
      <LabeledSlider label="GP Commitment" value={base.gpCommitPct} onChange={sb('gpCommitPct')} min={0.5} max={5} step={0.5} suffix="%" hint="GP co-invest as % of fund" />

      <div className={classes.divider} />
      <div className={classes.panelTitle}>IRR parameters</div>
      <LabeledSlider label="Hold Period" value={base.holdYears} onChange={sb('holdYears')} min={2} max={12} suffix=" yrs" hint="Investment-to-exit duration" />

      <div className={classes.divider} />
      <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>
        See it in the platform
      </Button>
    </aside>
  );

  // ── Tab content ──
  const waterfallTab = (
    <>
      <div className={classes.kpiGrid}>
        <Kpi label="Fund MOIC" value={`${result.moic.toFixed(2)}x`} color={moicColor(result.moic)} />
        <Kpi label="Gross IRR" value={`${currentIRR.toFixed(1)}%`} color={irrColor(currentIRR)} sub={`${base.holdYears}yr hold`} />
        <Kpi label="LP MOIC" value={`${result.lpMoic.toFixed(2)}x`} color={COL.lp} sub={`IRR: ${lpIRR.toFixed(1)}%`} />
        <Kpi label="GP Carry Earned" value={fmt(result.effectiveCarry)} color={COL.gp} sub={`of ${fmt(result.totalGP)} total`} />
      </div>

      <div className={classes.card}>
        <div className={classes.cardLabel}>Proceeds split — {fmt(result.totalProceeds)}</div>
        <div className={classes.splitTrack}>
          <div style={{ width: `${barW(result.totalLP)}%`, background: 'linear-gradient(90deg,#3d72ff,#1f5aff)' }} />
          <div style={{ width: `${barW(result.totalGP)}%`, background: 'linear-gradient(90deg,#f59e0b,#d97706)' }} />
        </div>
        <div className={classes.legend}>
          {[{ color: COL.lp, label: 'LP', val: result.totalLP }, { color: COL.gp, label: 'GP', val: result.totalGP }].map(({ color, label, val }) => (
            <div key={label} className={classes.legendItem}>
              <span className={classes.dot} style={{ background: color }} />
              <span>{label}: <strong>{fmt(val)}</strong> <span className={classes.muted}>({pct(val, result.totalProceeds)})</span></span>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.sectionLabel}>Waterfall cascade</div>
      {result.steps.map((step, i) => {
        const Icon = stepIcons[step.key] || IconArrowBackUp;
        return (
          <div key={i} className={classes.stepCard}>
            <div className={classes.stepHead}>
              <div className={classes.stepLeft}>
                <span className={classes.stepIcon}><Icon size={18} stroke={1.8} /></span>
                <div>
                  <div className={classes.stepName}>{step.label}</div>
                  <div className={classes.stepRemaining}>Remaining after: {fmt(step.remaining)}</div>
                </div>
              </div>
              <div className={classes.stepTotal}>{fmt(step.total)}</div>
            </div>
            <div className={classes.stepGrid}>
              {[{ key: 'LP', color: COL.lp, val: step.lpAmount }, { key: 'GP', color: COL.gp, val: step.gpAmount }].map(({ key, color, val }) => (
                <div key={key} className={classes.stepBox}>
                  <div className={classes.stepBoxLabel} style={{ color }}>{key}</div>
                  <div className={classes.stepBoxVal} style={{ color }}>{fmt(val)}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );

  const scBarData = scenarioResults.map((s) => ({ name: s.name, LP: +(s.result.totalLP / 1e6).toFixed(2), GP: +(s.result.totalGP / 1e6).toFixed(2) }));

  const scenariosTab = (
    <>
      <div className={classes.sectionLabel}>Bear / Base / Bull — side by side</div>
      <div className={classes.card} style={{ padding: 0, overflow: 'hidden' }}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th />
              {scenarios.map((s) => <th key={s.name} style={{ color: s.color }}>{s.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              ['Proceeds', (s) => `$${(s.totalInvested * s.proceedsMultiple).toFixed(0)}M`],
              ['Fund MOIC', (s) => `${s.proceedsMultiple.toFixed(2)}x`],
              ['LP Receives', (s) => fmt(calcWaterfall({ totalProceeds: s.totalInvested * s.proceedsMultiple * 1e6, totalInvested: s.totalInvested * 1e6, preferredReturn: s.preferredReturn, carryRate: s.carryRate, catchupRate: s.catchupRate, gpCommitPct: s.gpCommitPct }).totalLP)],
              ['LP MOIC', (s) => `${calcWaterfall({ totalProceeds: s.totalInvested * s.proceedsMultiple * 1e6, totalInvested: s.totalInvested * 1e6, preferredReturn: s.preferredReturn, carryRate: s.carryRate, catchupRate: s.catchupRate, gpCommitPct: s.gpCommitPct }).lpMoic.toFixed(2)}x`],
              ['GP Carry', (s) => fmt(calcWaterfall({ totalProceeds: s.totalInvested * s.proceedsMultiple * 1e6, totalInvested: s.totalInvested * 1e6, preferredReturn: s.preferredReturn, carryRate: s.carryRate, catchupRate: s.catchupRate, gpCommitPct: s.gpCommitPct }).effectiveCarry)],
              ['Hurdle cleared?', (s) => (s.totalInvested * s.proceedsMultiple > s.totalInvested * (1 + s.preferredReturn / 100) ? '✓ Yes' : '✗ No')],
            ].map(([rowLabel, valFn]) => (
              <tr key={rowLabel}>
                <td className={classes.rowLabel}>{rowLabel}</td>
                {scenarios.map((s, i) => <td key={i}>{valFn(s)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={classes.sectionLabel}>Scenario proceeds multiples</div>
      <div className={classes.scGrid}>
        {scenarios.map((s, i) => (
          <div key={i} className={classes.card} style={{ borderTop: `3px solid ${s.color}` }}>
            <div className={classes.scName} style={{ color: s.color }}>{s.name}</div>
            <LabeledSlider label="MOIC" value={s.proceedsMultiple} onChange={setSc(i, 'proceedsMultiple')} min={0.5} max={5} step={0.05} suffix="x" />
            <LabeledSlider label="Carry %" value={s.carryRate} onChange={setSc(i, 'carryRate')} min={10} max={30} suffix="%" />
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

  const irrTab = (
    <>
      <div className={classes.sectionLabel}>IRR vs. MOIC — gross / LP net / GP</div>
      <div className={classes.card}>
        <div className={classes.cardLabel}>{base.holdYears}yr hold · {base.preferredReturn}% hurdle · {base.carryRate}% carry · {base.catchupRate}% catch-up</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={irrCurve} margin={{ right: 16, left: 0, top: 8 }}>
            <CartesianGrid stroke={COL.grid} vertical={false} />
            <XAxis dataKey="moic" tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'MOIC', position: 'insideBottom', offset: -2, fill: COL.axis, fontSize: 11 }} />
            <YAxis tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" domain={[-20, 80]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v}%`, n]} labelFormatter={(v) => `MOIC: ${v}x`} />
            <ReferenceLine y={0} stroke={COL.grid} />
            <ReferenceLine y={base.preferredReturn} stroke="#f59e0b88" strokeDasharray="4 4" label={{ value: `Hurdle ${base.preferredReturn}%`, fill: '#b45309', fontSize: 10 }} />
            <ReferenceLine x={base.totalProceeds / base.totalInvested} stroke="#1f5aff66" strokeDasharray="4 4" label={{ value: 'Current', fill: '#1f5aff', fontSize: 10, position: 'top' }} />
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
          { label: 'Hurdle Cleared', val: result.moic > 1 + base.preferredReturn / 100 ? '✓ Yes' : '✗ No', sub: `Need ${(1 + base.preferredReturn / 100).toFixed(2)}x MOIC`, color: result.moic > 1 + base.preferredReturn / 100 ? COL.green : COL.red },
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
          <LineChart data={[3, 4, 5, 6, 7, 8, 9, 10].map((yr) => ({
            yr,
            lpIRR: +calcIRR(base.totalInvested * (1 - base.gpCommitPct / 100) * 1e6, calcWaterfall({ totalProceeds: base.totalProceeds * 1e6, totalInvested: base.totalInvested * 1e6, preferredReturn: base.preferredReturn, carryRate: base.carryRate, catchupRate: base.catchupRate, gpCommitPct: base.gpCommitPct }).totalLP, yr).toFixed(1),
            grossIRR: +calcIRR(base.totalInvested * 1e6, base.totalProceeds * 1e6, yr).toFixed(1),
          }))}>
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

  const { gpActualReceived, gpShouldHave, clawback, taxGrossUp, netClawback } = clawbackData;
  const hasClawback = clawback > 0;
  const clawbackTab = (
    <>
      <div className={classes.sectionLabel}>GP clawback analysis — whole-fund reconciliation</div>
      <div className={classes.card} style={{ borderColor: hasClawback ? '#f6c9c0' : '#bfe6cd' }}>
        <div className={classes.clawHead}>
          <span className={classes.clawIcon} data-on={hasClawback ? 'warn' : 'ok'}>
            {hasClawback ? <IconAlertTriangle size={20} /> : <IconCircleCheck size={20} />}
          </span>
          <div>
            <div className={classes.clawTitle} style={{ color: hasClawback ? COL.red : COL.green }}>
              {hasClawback ? `Clawback obligation: ${fmt(clawback)}` : 'No clawback obligation'}
            </div>
            <div className={classes.clawSub}>
              {hasClawback ? 'GP over-distributed on early exits vs. whole-fund performance' : 'GP distributions consistent with whole-fund waterfall outcome'}
            </div>
          </div>
        </div>
        <div className={classes.clawGrid}>
          {[
            { label: 'GP Actually Received', val: fmt(gpActualReceived), color: 'var(--text-strong)' },
            { label: 'GP Should Have (Whole Fund)', val: fmt(gpShouldHave), color: COL.gp },
            { label: 'Gross Clawback', val: fmt(clawback), color: hasClawback ? COL.red : COL.green },
            { label: 'Tax Gross-Up (est. 35%)', val: hasClawback ? `-${fmt(taxGrossUp)}` : 'N/A', color: COL.amber },
            { label: 'Net Clawback to LP', val: hasClawback ? fmt(netClawback) : '$0', color: hasClawback ? COL.red : COL.green },
            { label: 'Recommended Reserve', val: hasClawback ? fmt(clawback * 1.1) : '$0', color: COL.amber },
          ].map(({ label, val, color }) => (
            <div key={label} className={classes.clawCell}>
              <div className={classes.clawCellVal} style={{ color }}>{val}</div>
              <div className={classes.kpiLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.sectionLabel}>Deal-level GP distributions</div>
      <div className={classes.card}>
        <table className={classes.table}>
          <thead>
            <tr><th style={{ textAlign: 'left' }}>Deal</th><th>GP Received</th><th>LP Received</th><th>Edit ($M)</th></tr>
          </thead>
          <tbody>
            {deals.map((d, i) => (
              <tr key={d.name}>
                <td className={classes.rowLabel} style={{ textAlign: 'left' }}>{d.name}</td>
                <td style={{ color: COL.gp }}>{fmt(d.gpReceived)}</td>
                <td style={{ color: COL.lp }}>{fmt(d.lpReceived)}</td>
                <td>
                  <NumberInput size="xs" hideControls value={+(d.gpReceived / 1e6).toFixed(1)} step={0.5}
                    onChange={(v) => setDeals((p) => p.map((x, j) => (j === i ? { ...x, gpReceived: (Number(v) || 0) * 1e6 } : x)))}
                    styles={{ input: { textAlign: 'right' } }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button variant="default" size="xs" mt="md" leftSection={<IconPlus size={14} />}
          onClick={() => setDeals((p) => [...p, { name: `Deal ${String.fromCharCode(64 + p.length + 1)}`, gpReceived: 2e6, lpReceived: 10e6 }])}>
          Add deal
        </Button>
      </div>

      <div className={classes.note}>
        <strong>Clawback mechanics:</strong> Under a whole-fund waterfall, the GP must return any carried interest received on early exits if the fund&apos;s total distributions do not ultimately satisfy the LP preferred return and return of capital on a portfolio-wide basis. The obligation is typically subject to a tax gross-up provision (commonly 35%) and may be capped at the GP&apos;s after-tax carry received. GPs are advised to maintain a clawback reserve (escrow) of 15–25% of carry distributions pending final fund close.
      </div>
    </>
  );

  const panels = { Waterfall: waterfallTab, Scenarios: scenariosTab, 'IRR Curves': irrTab, Clawback: clawbackTab };

  return (
    <>
      {/* Intro */}
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · PE / VC / Credit</span>
          <Title className={classes.heroTitle}>
            Waterfall <span className={classes.accent}>distribution calculator</span>
          </Title>
          <Text className={classes.heroDesc}>
            Model the full LP/GP distribution waterfall — return of capital, preferred return, GP catch-up and
            carry split — with live IRR curves, Bear/Base/Bull scenarios and a whole-fund clawback check.
          </Text>
        </Container>
      </section>

      {/* Tool */}
      <section className={classes.tool}>
        <Container size="lg">
          <div className={classes.layout}>
            {controls}
            <div className={classes.results}>
              <Tabs value={tab} onChange={setTab} variant="pills" radius="md" classNames={{ list: classes.tabList, tab: classes.tab }}>
                <Tabs.List>
                  {TABS.map((t) => <Tabs.Tab key={t} value={t}>{t}</Tabs.Tab>)}
                </Tabs.List>
              </Tabs>
              <div className={classes.panel}>{panels[tab]}</div>
            </div>
          </div>
          <Text className={classes.disclaimer}>
            Illustrative model for educational purposes — not investment advice. Built by aama.io · Singapore VCC &amp; MAS-aligned fund platform.
          </Text>
        </Container>
      </section>
    </>
  );
}

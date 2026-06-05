// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, NumberInput, TextInput, SegmentedControl, Button, ActionIcon } from '@mantine/core';
import { IconArrowRight, IconPlus, IconX, IconPercentage, IconStack2, IconCoins, IconBuildingBank } from '@tabler/icons-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell, ReferenceLine } from 'recharts';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import s from '@/components/ui/tool.module.css';

const COL = { call: '#d97706', dist: '#1f5aff', cum: '#16a34a', grid: '#eef2f7', axis: '#94a3b8', text: '#475569' };
const tip = { background: '#fff', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 12px 30px rgba(15,23,42,0.10)', fontSize: 12 };
const fmtM = (v) => `$${(Number(v) || 0).toFixed(1)}M`;

// Robust XIRR via bracketing + bisection. flows: [{date, amount}] with outflows negative.
function xirr(flows) {
  if (!(flows.some((f) => f.amount < 0) && flows.some((f) => f.amount > 0))) return null;
  const t0 = new Date(flows[0].date).getTime();
  const ys = flows.map((f) => (new Date(f.date).getTime() - t0) / (365 * 86400000));
  const npv = (r) => flows.reduce((a, f, i) => a + f.amount / Math.pow(1 + r, ys[i]), 0);
  let lo = -0.9999, hi = 1, flo = npv(lo), fhi = npv(hi), tries = 0;
  while (flo * fhi > 0 && hi < 1e7 && tries < 80) { hi *= 1.6; fhi = npv(hi); tries++; }
  if (flo * fhi > 0) return null;
  for (let i = 0; i < 250; i++) {
    const mid = (lo + hi) / 2, fm = npv(mid);
    if (Math.abs(fm) < 1e-9) return mid;
    if (flo * fm < 0) { hi = mid; fhi = fm; } else { lo = mid; flo = fm; }
  }
  return (lo + hi) / 2;
}

const dlabel = (d) => { const x = new Date(d); return isNaN(x) ? d : x.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }); };

export default function CashflowMetrics() {
  const [rows, setRows] = useState([
    { date: '2020-01-15', type: 'call', amt: 10 },
    { date: '2020-09-01', type: 'call', amt: 15 },
    { date: '2021-06-01', type: 'call', amt: 20 },
    { date: '2022-03-01', type: 'dist', amt: 12 },
    { date: '2023-05-01', type: 'dist', amt: 30 },
    { date: '2024-06-01', type: 'dist', amt: 25 },
  ]);
  const [nav, setNav] = useState(40);
  const [navDate, setNavDate] = useState('2025-06-01');

  useEffect(() => {
    applyParams({
      r: (v) => { const a = JSON.parse(v); if (Array.isArray(a) && a.length) setRows(a.map((x) => ({ date: String(x.date), type: x.type === 'dist' ? 'dist' : 'call', amt: Number(x.amt) || 0 }))); },
      n: (v) => setNav(Number(v) || 0),
      nd: (v) => setNavDate(String(v)),
    });
  }, []);
  useEffect(() => { syncParams({ r: JSON.stringify(rows), n: nav, nd: navDate }); }, [rows, nav, navDate]);

  const setRow = (i, k, v) => setRows((p) => p.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const addRow = () => setRows((p) => [...p, { date: navDate, type: 'dist', amt: 5 }]);
  const removeRow = (i) => setRows((p) => (p.length > 1 ? p.filter((_, j) => j !== i) : p));

  const m = useMemo(() => {
    const events = rows
      .filter((r) => r.date && (Number(r.amt) || 0) > 0)
      .map((r) => ({ date: r.date, amount: r.type === 'call' ? -(Number(r.amt) || 0) : (Number(r.amt) || 0), type: r.type }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const paidIn = events.filter((e) => e.amount < 0).reduce((a, e) => a - e.amount, 0);
    const dist = events.filter((e) => e.amount > 0).reduce((a, e) => a + e.amount, 0);
    const navV = Number(nav) || 0;
    const dpi = paidIn > 0 ? dist / paidIn : 0;
    const rvpi = paidIn > 0 ? navV / paidIn : 0;
    const tvpi = dpi + rvpi;

    // IRR: include NAV as a terminal inflow at navDate
    const irrFlows = [...events.map((e) => ({ date: e.date, amount: e.amount }))];
    if (navV > 0 && navDate) irrFlows.push({ date: navDate, amount: navV });
    irrFlows.sort((a, b) => new Date(a.date) - new Date(b.date));
    const irr = xirr(irrFlows);

    // chart: signed flows + cumulative net incl NAV at end
    let cum = 0;
    const chart = events.map((e) => { cum += e.amount; return { label: dlabel(e.date), flow: +e.amount.toFixed(1), cum: +cum.toFixed(1) }; });
    if (navV > 0) { cum += navV; chart.push({ label: dlabel(navDate), flow: +navV.toFixed(1), cum: +cum.toFixed(1), isNav: true }); }

    return { paidIn, dist, navV, dpi, rvpi, tvpi, irr, chart, events };
  }, [rows, nav, navDate]);

  const kpis = [
    { icon: IconPercentage, label: 'Net IRR', val: m.irr == null ? '—' : `${(m.irr * 100).toFixed(1)}%`, sub: 'money-weighted (XIRR)' },
    { icon: IconStack2, label: 'TVPI', val: `${m.tvpi.toFixed(2)}×`, sub: '(dist + NAV) / paid-in' },
    { icon: IconCoins, label: 'DPI', val: `${m.dpi.toFixed(2)}×`, sub: 'realised / paid-in' },
    { icon: IconBuildingBank, label: 'RVPI', val: `${m.rvpi.toFixed(2)}×`, sub: 'unrealised NAV / paid-in' },
  ];

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · Fund performance</span>
          <Title className={s.heroTitle}>IRR · TVPI · DPI · RVPI <span className={s.accent}>calculator</span></Title>
          <Text className={s.heroDesc}>
            Enter your fund’s capital calls, distributions and current NAV to get the four numbers every LP asks for —
            money-weighted IRR and the TVPI / DPI / RVPI multiples — with a cash-flow J-curve.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout} data-wide>
            <aside className={s.controls}>
              <div className={s.groupTitle}>Cash flows</div>
              {rows.map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.9fr auto', gap: 6, marginBottom: 8, alignItems: 'center' }}>
                  <TextInput type="date" value={r.date} onChange={(e) => setRow(i, 'date', e.currentTarget.value)} size="xs" />
                  <NumberInput value={r.amt} onChange={(v) => setRow(i, 'amt', v)} min={0} step={1} hideControls size="xs" prefix="$" suffix="M" />
                  <ActionIcon variant="subtle" color="gray" onClick={() => removeRow(i)} disabled={rows.length <= 1}><IconX size={15} /></ActionIcon>
                  <SegmentedControl style={{ gridColumn: '1 / 3' }} value={r.type} onChange={(v) => setRow(i, 'type', v)} size="xs" data={[{ label: 'Call', value: 'call' }, { label: 'Distribution', value: 'dist' }]} />
                </div>
              ))}
              <Button variant="default" size="xs" mt={2} leftSection={<IconPlus size={14} />} onClick={addRow}>Add cash flow</Button>

              <div className={s.groupTitle}>Current valuation (NAV)</div>
              <div className={s.row2}>
                <NumberInput label="NAV" value={nav} onChange={setNav} min={0} step={5} hideControls size="xs" prefix="$" suffix="M" />
                <TextInput label="As of" type="date" value={navDate} onChange={(e) => setNavDate(e.currentTarget.value)} size="xs" />
              </div>

              <div className={s.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={s.ctaBtn}>Track this in the platform</Button>
              <ShareLinkButton fullWidth className={s.shareBtn} />
            </aside>

            <div className={s.results}>
              <div className={s.kpiGrid}>
                {kpis.map((k) => (
                  <div key={k.label} className={s.kpiCard}>
                    <span className={s.kpiIcon}><k.icon size={18} stroke={1.7} /></span>
                    <div className={s.kpiLabel}>{k.label}</div>
                    <div className={s.kpiVal}>{k.val}</div>
                    <div className={s.kpiSub}>{k.sub}</div>
                  </div>
                ))}
              </div>

              <div className={s.chartCard}>
                <div className={s.chartTitle}>Cash flows & cumulative net position (J-curve)</div>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={m.chart} margin={{ right: 8, left: 0, top: 8 }}>
                    <CartesianGrid stroke={COL.grid} vertical={false} />
                    <XAxis dataKey="label" tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} unit="M" />
                    <Tooltip contentStyle={tip} formatter={(v, n) => [`$${v}M`, n === 'flow' ? 'Cash flow' : 'Cumulative net']} />
                    <Legend wrapperStyle={{ fontSize: 12, color: COL.text }} formatter={(v) => (v === 'flow' ? 'Cash flow (call / dist)' : 'Cumulative net + NAV')} />
                    <ReferenceLine y={0} stroke="#cbd5e1" />
                    <Bar dataKey="flow" maxBarSize={36} radius={[3, 3, 0, 0]}>
                      {m.chart.map((d, i) => <Cell key={i} fill={d.flow < 0 ? COL.call : COL.dist} />)}
                    </Bar>
                    <Line type="monotone" dataKey="cum" stroke={COL.cum} strokeWidth={2.5} dot={{ r: 2.5 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className={s.sectionLabel}>Summary</div>
              <div className={s.tableCard}>
                <table className={s.table}>
                  <tbody>
                    <tr><td className={s.tdLabel}>Total paid-in capital</td><td className={s.num}>{fmtM(m.paidIn)}</td></tr>
                    <tr><td className={s.tdLabel}>Total distributions</td><td className={s.num}>{fmtM(m.dist)}</td></tr>
                    <tr><td className={s.tdLabel}>Current NAV (residual)</td><td className={s.num}>{fmtM(m.navV)}</td></tr>
                    <tr className={s.subtotalRow}><td>Total value (dist + NAV)</td><td className={s.num}>{fmtM(m.dist + m.navV)}</td></tr>
                  </tbody>
                </table>
              </div>

              <Text className={s.disclaimer}>
                IRR is the money-weighted (XIRR) return across your dated flows with NAV as a terminal value; multiples are
                cash-on-cash. Needs at least one call and one distribution to solve IRR. Educational only. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

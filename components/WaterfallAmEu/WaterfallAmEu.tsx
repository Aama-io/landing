// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, NumberInput, Button, ActionIcon } from '@mantine/core';
import { IconArrowRight, IconPlus, IconX, IconScale, IconCoinOff, IconTrendingUp, IconUsers } from '@tabler/icons-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import s from '@/components/ui/tool.module.css';

const COL = { eu: '#1f5aff', am: '#d97706', grid: '#eef2f7', axis: '#94a3b8', text: '#475569' };
const tip = { background: '#fff', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 12px 30px rgba(15,23,42,0.10)', fontSize: 12 };
const fmtM = (v) => `$${(Number(v) || 0).toFixed(2)}M`;
const fmtMs = (v) => `$${(Number(v) || 0).toFixed(1)}M`;

// Standard whole-fund waterfall for a single pool: return of capital → pref → GP catch-up → carry split.
function waterfall(capital, proceeds, prefRate, years, carry, catchup = 1) {
  let rem = Math.max(0, proceeds);
  const roc = Math.min(rem, capital); rem -= roc;
  const pref = capital * prefRate * years;
  const prefPaid = Math.min(rem, pref); rem -= prefPaid;
  const cuTarget = carry < 1 ? (carry / (1 - carry)) * prefPaid : 0;
  const gpCatchup = Math.min(rem, cuTarget * catchup); rem -= gpCatchup;
  const gpSplit = rem * carry;
  const lpSplit = rem - gpSplit;
  const gpCarry = gpCatchup + gpSplit;
  const lpTotal = roc + prefPaid + lpSplit;
  return { gpCarry, lpTotal };
}

export default function WaterfallAmEu() {
  const [prefRate, setPrefRate] = useState(8);
  const [years, setYears] = useState(5);
  const [carry, setCarry] = useState(20);
  const [deals, setDeals] = useState([
    { cap: 25, moic: 3.0 },
    { cap: 25, moic: 1.8 },
    { cap: 25, moic: 0.6 },
    { cap: 25, moic: 2.2 },
  ]);

  useEffect(() => {
    applyParams({
      pr: (v) => setPrefRate(Math.min(20, Math.max(0, Number(v) || 0))),
      y: (v) => setYears(Math.min(12, Math.max(1, Number(v) || 5))),
      cy: (v) => setCarry(Math.min(50, Math.max(0, Number(v) || 0))),
      d: (v) => { const a = JSON.parse(v); if (Array.isArray(a) && a.length) setDeals(a.map((x) => ({ cap: Number(x.cap) || 0, moic: Number(x.moic) || 0 }))); },
    });
  }, []);
  useEffect(() => {
    syncParams({ pr: prefRate, y: years, cy: carry, d: JSON.stringify(deals) });
  }, [prefRate, years, carry, deals]);

  const setDeal = (i, k, v) => setDeals((p) => p.map((d, j) => (j === i ? { ...d, [k]: v } : d)));
  const addDeal = () => setDeals((p) => [...p, { cap: 20, moic: 2.0 }]);
  const removeDeal = (i) => setDeals((p) => (p.length > 1 ? p.filter((_, j) => j !== i) : p));

  const m = useMemo(() => {
    const pr = prefRate / 100, cy = carry / 100;
    const rows = deals.map((d, i) => {
      const cap = Number(d.cap) || 0;
      const proceeds = cap * (Number(d.moic) || 0);
      const { gpCarry } = waterfall(cap, proceeds, pr, years, cy);
      return { i, cap, moic: Number(d.moic) || 0, proceeds, profit: proceeds - cap, amCarry: gpCarry };
    });
    const totalCap = rows.reduce((a, r) => a + r.cap, 0);
    const totalProceeds = rows.reduce((a, r) => a + r.proceeds, 0);
    const amGP = rows.reduce((a, r) => a + r.amCarry, 0);
    const euro = waterfall(totalCap, totalProceeds, pr, years, cy);
    const euGP = euro.gpCarry;
    const amLP = totalProceeds - amGP;
    const euLP = totalProceeds - euGP;
    const clawback = Math.max(0, amGP - euGP);
    const fundMoic = totalCap > 0 ? totalProceeds / totalCap : 0;
    return { rows, totalCap, totalProceeds, totalProfit: totalProceeds - totalCap, amGP, euGP, amLP, euLP, clawback, fundMoic };
  }, [deals, prefRate, years, carry]);

  const chartData = [
    { name: 'GP carry', European: +m.euGP.toFixed(2), American: +m.amGP.toFixed(2) },
    { name: 'LP proceeds', European: +m.euLP.toFixed(2), American: +m.amLP.toFixed(2) },
  ];

  const kpis = [
    { icon: IconScale, label: 'Fund MOIC', val: `${m.fundMoic.toFixed(2)}×`, sub: `${fmtMs(m.totalProceeds)} on ${fmtMs(m.totalCap)}` },
    { icon: IconTrendingUp, label: 'GP carry — American', val: fmtM(m.amGP), sub: 'deal-by-deal' },
    { icon: IconUsers, label: 'GP carry — European', val: fmtM(m.euGP), sub: 'whole-fund' },
    { icon: IconCoinOff, label: 'Clawback exposure', val: fmtM(m.clawback), sub: 'American − European' },
  ];

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · PE/VC waterfalls</span>
          <Title className={s.heroTitle}>American vs European <span className={s.accent}>waterfall comparator</span></Title>
          <Text className={s.heroDesc}>
            Same deals, same terms — two carry structures. See how much more a GP earns deal-by-deal (American) versus
            whole-fund (European), and exactly how much clawback exposure that creates for LPs.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout} data-wide>
            <aside className={s.controls}>
              <div className={s.groupTitle}>Fund terms</div>
              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Preferred return (p.a.)</span><span className={s.sliderVal}>{prefRate}%</span></div>
              <Slider value={prefRate} onChange={setPrefRate} min={0} max={15} step={0.5} color="blue" size="sm" label={null} />
              <div className={s.sliderTop} style={{ marginTop: 16 }}><span className={s.fieldLabel} style={{ margin: 0 }}>Hold period</span><span className={s.sliderVal}>{years} yr</span></div>
              <Slider value={years} onChange={setYears} min={1} max={10} step={1} color="blue" size="sm" label={null} />
              <div className={s.sliderTop} style={{ marginTop: 16 }}><span className={s.fieldLabel} style={{ margin: 0 }}>Carried interest</span><span className={s.sliderVal}>{carry}%</span></div>
              <Slider value={carry} onChange={setCarry} min={0} max={30} step={1} color="blue" size="sm" label={null} />

              <div className={s.groupTitle}>Deals ($M invested · exit MOIC)</div>
              {deals.map((d, i) => (
                <div key={i} className={s.row2} style={{ gridTemplateColumns: '1fr 1fr auto', alignItems: 'center', gap: 8 }}>
                  <NumberInput value={d.cap} onChange={(v) => setDeal(i, 'cap', v)} min={0} step={5} hideControls size="xs" prefix="$" suffix="M" />
                  <NumberInput value={d.moic} onChange={(v) => setDeal(i, 'moic', v)} min={0} step={0.1} decimalScale={2} hideControls size="xs" suffix="×" />
                  <ActionIcon variant="subtle" color="gray" onClick={() => removeDeal(i)} disabled={deals.length <= 1}><IconX size={15} /></ActionIcon>
                </div>
              ))}
              <Button variant="default" size="xs" mt={2} leftSection={<IconPlus size={14} />} onClick={addDeal}>Add deal</Button>

              <div className={s.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={s.ctaBtn}>Model your fund with us</Button>
              <ShareLinkButton fullWidth className={s.shareBtn} />
            </aside>

            <div className={s.results}>
              <div className={s.kpiGrid}>
                {kpis.map((k) => (
                  <div key={k.label} className={s.kpiCard}>
                    <span className={s.kpiIcon}><k.icon size={18} stroke={1.7} /></span>
                    <div className={s.kpiLabel}>{k.label}</div>
                    <div className={s.kpiVal} data-sm>{k.val}</div>
                    <div className={s.kpiSub}>{k.sub}</div>
                  </div>
                ))}
              </div>

              <div className={s.chartCard}>
                <div className={s.chartTitle}>GP carry & LP proceeds — American vs European</div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} barCategoryGap="28%">
                    <CartesianGrid stroke={COL.grid} vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: COL.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} unit="M" />
                    <Tooltip contentStyle={tip} formatter={(v, n) => [`$${v}M`, n]} cursor={{ fill: 'rgba(31,90,255,0.05)' }} />
                    <Legend wrapperStyle={{ fontSize: 12, color: COL.text }} />
                    <Bar dataKey="European" fill={COL.eu} radius={[5, 5, 0, 0]} maxBarSize={70} />
                    <Bar dataKey="American" fill={COL.am} radius={[5, 5, 0, 0]} maxBarSize={70} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className={s.sectionLabel}>Deal-by-deal breakdown (American carry)</div>
              <div className={s.tableCard}>
                <table className={s.table}>
                  <thead>
                    <tr><th>Deal</th><th className={s.num}>Invested</th><th className={s.num}>MOIC</th><th className={s.num}>Proceeds</th><th className={s.num}>Profit</th><th className={s.num}>GP carry</th></tr>
                  </thead>
                  <tbody>
                    {m.rows.map((r) => (
                      <tr key={r.i}>
                        <td className={s.tdLabel}>Deal {String.fromCharCode(65 + r.i)}</td>
                        <td className={s.num}>{fmtMs(r.cap)}</td>
                        <td className={s.num}>{r.moic.toFixed(2)}×</td>
                        <td className={s.num}>{fmtMs(r.proceeds)}</td>
                        <td className={s.num} style={{ color: r.profit < 0 ? '#e8553e' : undefined }}>{fmtMs(r.profit)}</td>
                        <td className={s.num}>{fmtM(r.amCarry)}</td>
                      </tr>
                    ))}
                    <tr className={s.subtotalRow}>
                      <td>American total (Σ per-deal carry)</td>
                      <td className={s.num}>{fmtMs(m.totalCap)}</td>
                      <td className={s.num}>{m.fundMoic.toFixed(2)}×</td>
                      <td className={s.num}>{fmtMs(m.totalProceeds)}</td>
                      <td className={s.num}>{fmtMs(m.totalProfit)}</td>
                      <td className={s.num}>{fmtM(m.amGP)}</td>
                    </tr>
                    <tr className={s.subtotalRow}>
                      <td>European (whole-fund carry)</td>
                      <td className={s.num} colSpan={4} style={{ textAlign: 'right', color: 'var(--text-muted)' }}>losers offset winners before carry →</td>
                      <td className={s.num}>{fmtM(m.euGP)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className={s.totalRow}>
                      <td colSpan={5}>GP over-distribution under American (clawback exposure)</td>
                      <td className={s.num}>{fmtM(m.clawback)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className={s.noteCard}>
                <IconScale size={18} className={s.noteIcon} />
                <div>
                  <strong>Why they differ:</strong>
                  <span className={s.noteMuted}> American (deal-by-deal) pays the GP carry on every winning deal as it exits, so losing deals never reduce carry already taken — the GP earns {fmtM(m.clawback)} more here. European (whole-fund) nets all deals first, so LPs keep that amount. A clawback provision is what bridges the gap at fund end.</span>
                </div>
              </div>

              <Text className={s.disclaimer}>
                Simplified model with a full GP catch-up and a single hold period applied across deals — real waterfalls vary by
                cashflow timing, tiered hurdles and catch-up terms. Educational only, not advice. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

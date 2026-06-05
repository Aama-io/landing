import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, SegmentedControl, Select, Button } from '@mantine/core';
import { IconArrowRight, IconAward, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import s from '@/components/ui/tool.module.css';

// ⚠️ ILLUSTRATIVE sample net-IRR quartile breakpoints (%), NOT real benchmark data.
// Replace with a licensed Cambridge Associates / Preqin / Burgiss dataset.
const BASE: Record<string, { label: string; topQ: number; med: number; botQ: number }> = {
  buyout: { label: 'Buyout', topQ: 22, med: 15, botQ: 8 },
  venture: { label: 'Venture', topQ: 28, med: 14, botQ: 2 },
  growth: { label: 'Growth equity', topQ: 24, med: 16, botQ: 9 },
  credit: { label: 'Private credit', topQ: 14, med: 10, botQ: 6 },
};
const STRATS = Object.entries(BASE).map(([value, v]) => ({ value, label: v.label }));
const VINTAGES = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];

export function VintageBenchmark() {
  const [strat, setStrat] = useState('buyout');
  const [vintage, setVintage] = useState('2019');
  const [irr, setIrr] = useState(18);

  useEffect(() => {
    applyParams({
      st: (v) => (BASE[v] ? setStrat(v) : null),
      vt: (v) => (VINTAGES.includes(v) ? setVintage(v) : null),
      i: (v) => setIrr(Math.min(45, Math.max(-15, Number(v) || 0))),
    });
  }, []);
  useEffect(() => { syncParams({ st: strat, vt: vintage, i: irr }); }, [strat, vintage, irr]);

  const q = useMemo(() => {
    const b = BASE[strat];
    // mild vintage maturity adjustment: older vintages settle a touch higher (sample only)
    const adj = (2019 - parseInt(vintage, 10)) * 0.5;
    return { topQ: b.topQ + adj, med: b.med + adj, botQ: b.botQ + adj, label: b.label };
  }, [strat, vintage]);

  const placement = irr >= q.topQ ? { t: 'Top quartile', c: '#16a34a', n: 1 }
    : irr >= q.med ? { t: 'Second quartile', c: '#1f5aff', n: 2 }
    : irr >= q.botQ ? { t: 'Third quartile', c: '#d97706', n: 3 }
    : { t: 'Bottom quartile', c: '#e8553e', n: 4 };

  const gMin = q.botQ - 9, gMax = q.topQ + 11;
  const posOf = (v: number) => Math.max(0, Math.min(100, ((v - gMin) / (gMax - gMin)) * 100));

  const kpis = [
    { label: 'Your net IRR', val: `${irr.toFixed(1)}%` },
    { label: 'Benchmark median', val: `${q.med.toFixed(1)}%`, sub: `${q.label} ${vintage}` },
    { label: 'Placement', val: placement.t, c: placement.c },
  ];

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · Performance</span>
          <Title className={s.heroTitle}>Fund vintage <span className={s.accent}>benchmarker</span></Title>
          <Text className={s.heroDesc}>
            See which quartile your fund lands in against its vintage-year peers. Pick a strategy and vintage, enter your
            net IRR, and find where you sit versus the median and top-quartile line.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout}>
            <aside className={s.controls}>
              <div className={s.panelTitle}>Your fund</div>
              <label className={s.fieldLabel}>Strategy</label>
              <SegmentedControl fullWidth size="xs" orientation="vertical" className={s.segmented} value={strat} onChange={setStrat} data={STRATS} />

              <label className={s.fieldLabel} style={{ marginTop: 16 }}>Vintage year</label>
              <Select data={VINTAGES} value={vintage} onChange={(v) => v && setVintage(v)} size="sm" className={s.field} allowDeselect={false} />

              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Your net IRR</span><span className={s.sliderVal}>{irr.toFixed(1)}%</span></div>
              <Slider value={irr} onChange={setIrr} min={-15} max={45} step={0.5} color="blue" size="sm" label={null} />

              <div className={s.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={s.ctaBtn}>Benchmark with real data</Button>
              <ShareLinkButton fullWidth className={s.shareBtn} />
            </aside>

            <div className={s.results}>
              <div className={s.kpiGrid} data-cols="3">
                {kpis.map((k) => (
                  <div key={k.label} className={s.kpiCard}>
                    <span className={s.kpiIcon}><IconAward size={18} stroke={1.7} /></span>
                    <div className={s.kpiLabel}>{k.label}</div>
                    <div className={s.kpiVal} data-sm style={{ color: (k as any).c }}>{k.val}</div>
                    {(k as any).sub && <div className={s.kpiSub}>{(k as any).sub}</div>}
                  </div>
                ))}
              </div>

              <div className={s.chartCard}>
                <div className={s.chartTitle}>Quartile position — <span style={{ color: placement.c }}>{placement.t}</span></div>
                <div style={{ position: 'relative', margin: '34px 4px 8px' }}>
                  <div style={{ display: 'flex', height: 12, borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${posOf(q.botQ)}%`, background: '#fca5a5' }} />
                    <div style={{ width: `${posOf(q.med) - posOf(q.botQ)}%`, background: '#fdba74' }} />
                    <div style={{ width: `${posOf(q.topQ) - posOf(q.med)}%`, background: '#7dd3fc' }} />
                    <div style={{ flex: 1, background: '#86efac' }} />
                  </div>
                  <div style={{ position: 'absolute', top: -22, left: `${posOf(irr)}%`, transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-strong)' }}>{irr.toFixed(1)}%</div>
                    <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--text-strong)', margin: '2px auto 0' }} />
                  </div>
                  {[['botQ', 'Bottom Q'], ['med', 'Median'], ['topQ', 'Top Q']].map(([k, lbl]) => (
                    <div key={lbl} style={{ position: 'absolute', top: 18, left: `${posOf((q as any)[k])}%`, transform: 'translateX(-50%)', fontSize: 10.5, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                      {lbl}<br />{((q as any)[k]).toFixed(1)}%
                    </div>
                  ))}
                </div>
                <div style={{ height: 30 }} />
                <Text size="sm" c="dimmed" mt="md">
                  {placement.n === 1 ? 'Top-quartile performance — a strong fundraising signal for your next vehicle.'
                    : placement.n === 2 ? 'Above median — competitive, within reach of the top-quartile line.'
                    : placement.n === 3 ? 'Below median — narrowing the gap to median is the key IR narrative.'
                    : 'Bottom quartile for this cohort — context on strategy timing and J-curve stage matters here.'}
                </Text>
              </div>

              <div className={s.sectionLabel}>{q.label} · {vintage} vintage — net IRR quartiles (sample)</div>
              <div className={s.tableCard}>
                <table className={s.table}>
                  <thead><tr><th>Breakpoint</th><th className={s.num}>Net IRR</th><th>You</th></tr></thead>
                  <tbody>
                    {([['Top-quartile line (75th pct)', q.topQ], ['Median (50th pct)', q.med], ['Bottom-quartile line (25th pct)', q.botQ]] as [string, number][]).map(([lbl, v]) => (
                      <tr key={lbl}>
                        <td className={s.tdLabel}>{lbl}</td>
                        <td className={s.num}>{v.toFixed(1)}%</td>
                        <td>{irr >= v ? 'At or above' : 'Below'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={s.noteCard}>
                <IconInfoCircle size={18} className={s.noteIcon} />
                <div>
                  <strong>Sample quartiles — not licensed benchmark data.</strong>
                  <span className={s.noteMuted}> The breakpoints are illustrative placeholders with a simple vintage adjustment. For board-grade benchmarking, plug in a licensed Cambridge Associates, Preqin or Burgiss dataset. Pooled vs median IRR, and TVPI quartiles, are reported separately.</span>
                </div>
              </div>

              <Text className={s.disclaimer}>Educational tool — not investment advice or a representation of actual benchmark returns. Built by aama.io.</Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

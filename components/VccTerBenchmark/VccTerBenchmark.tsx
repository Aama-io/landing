import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, SegmentedControl, NumberInput, Button } from '@mantine/core';
import { IconArrowRight, IconChartHistogram, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import s from '@/components/ui/tool.module.css';

// ⚠️ ILLUSTRATIVE sample peer TER distributions (basis points), NOT real market data.
// Replace with a licensed SGX / Morningstar / fund-admin dataset.
const PEERS: Record<string, { label: string; p25: number; median: number; p75: number; p90: number }> = {
  pevc: { label: 'PE / VC (closed-end)', p25: 210, median: 260, p75: 320, p90: 400 },
  hedge: { label: 'Hedge fund', p25: 170, median: 220, p75: 300, p90: 380 },
  credit: { label: 'Private credit', p25: 140, median: 185, p75: 240, p90: 310 },
  multi: { label: 'Multi-asset', p25: 90, median: 140, p75: 200, p90: 280 },
  fi: { label: 'Fixed income', p25: 50, median: 85, p75: 130, p90: 190 },
};
const TYPES = Object.entries(PEERS).map(([value, v]) => ({ value, label: v.label }));

// Map a TER to a cost percentile (0 = cheapest peer, 100 = most expensive) by interpolating anchors.
function costPercentile(ter: number, d: { p25: number; median: number; p75: number; p90: number }) {
  const pts = [
    [d.p25 * 0.65, 5], [d.p25, 25], [d.median, 50], [d.p75, 75], [d.p90, 90], [d.p90 * 1.3, 98],
  ];
  if (ter <= pts[0][0]) return 2;
  if (ter >= pts[pts.length - 1][0]) return 99;
  for (let i = 1; i < pts.length; i++) {
    if (ter <= pts[i][0]) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      return y0 + ((ter - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return 99;
}

export function VccTerBenchmark() {
  const [type, setType] = useState('pevc');
  const [mgmtFee, setMgmtFee] = useState(2.0); // %
  const [otherBps, setOtherBps] = useState(60); // bps
  const [aum, setAum] = useState(80); // S$M

  useEffect(() => {
    applyParams({
      t: (v) => (PEERS[v] ? setType(v) : null),
      mf: (v) => setMgmtFee(Math.min(3, Math.max(0, Number(v) || 0))),
      ob: (v) => setOtherBps(Math.min(300, Math.max(0, Number(v) || 0))),
      a: (v) => setAum(Math.max(0, Number(v) || 0)),
    });
  }, []);
  useEffect(() => { syncParams({ t: type, mf: mgmtFee, ob: otherBps, a: aum }); }, [type, mgmtFee, otherBps, aum]);

  const d = PEERS[type];
  const ter = useMemo(() => Math.round(mgmtFee * 100 + otherBps), [mgmtFee, otherBps]);
  const pct = useMemo(() => costPercentile(ter, d), [ter, d]);
  const cheaperThan = Math.round(100 - pct);

  const verdict = pct <= 25 ? { t: 'Among the leanest', c: '#16a34a' }
    : pct <= 50 ? { t: 'Below median — competitive', c: '#1f5aff' }
    : pct <= 75 ? { t: 'Above median', c: '#d97706' }
    : { t: 'Expensive vs peers', c: '#e8553e' };

  // Gauge geometry
  const gMin = d.p25 * 0.6, gMax = d.p90 * 1.28;
  const posOf = (v: number) => Math.max(0, Math.min(100, ((v - gMin) / (gMax - gMin)) * 100));
  const markerPos = posOf(ter);

  const sizeNote = aum > 0 && aum < 50
    ? 'Funds under ~S$50M typically run a higher TER — fixed costs spread over a smaller base, so judge yourself kindly against the median.'
    : aum >= 500 ? 'At your scale, fixed costs dilute heavily — leading funds of this size often sit below the 25th percentile.'
    : 'Mid-size funds cluster around the median; the marginal cost lever is usually fund administration and audit.';

  const kpis = [
    { label: 'Your TER', val: `${(ter / 100).toFixed(2)}%`, sub: `${ter} bps` },
    { label: 'Peer median', val: `${(d.median / 100).toFixed(2)}%`, sub: `${d.median} bps · ${d.label}` },
    { label: 'Cheaper than', val: `${cheaperThan}%`, sub: 'of peers (sample)' },
  ];

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · Fund economics</span>
          <Title className={s.heroTitle}>VCC fund expense ratio <span className={s.accent}>benchmarker</span></Title>
          <Text className={s.heroDesc}>
            See how your fund’s total expense ratio (TER) stacks up against peers. Enter your management fee and other
            operating costs and find your percentile within the relevant strategy cohort.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout}>
            <aside className={s.controls}>
              <div className={s.panelTitle}>Your fund</div>
              <label className={s.fieldLabel}>Strategy / peer cohort</label>
              <SegmentedControl fullWidth size="xs" orientation="vertical" className={s.segmented} value={type} onChange={setType} data={TYPES} />

              <div className={s.divider} />
              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Management fee</span><span className={s.sliderVal}>{mgmtFee.toFixed(2)}%</span></div>
              <Slider value={mgmtFee} onChange={setMgmtFee} min={0} max={3} step={0.05} color="blue" size="sm" label={null} />

              <div className={s.sliderTop} style={{ marginTop: 16 }}><span className={s.fieldLabel} style={{ margin: 0 }}>Other operating costs</span><span className={s.sliderVal}>{otherBps} bps</span></div>
              <Slider value={otherBps} onChange={setOtherBps} min={0} max={250} step={5} color="blue" size="sm" label={null} />
              <div className={s.hint}>Admin, audit, custody, directors, tax & regulatory — as bps of NAV.</div>

              <div className={s.divider} />
              <label className={s.fieldLabel}>Fund AUM (context)</label>
              <NumberInput value={aum} onChange={(v) => setAum(Number(v) || 0)} min={0} step={25} thousandSeparator="," prefix="S$ " suffix="M" hideControls size="sm" className={s.field} />

              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={s.ctaBtn}>Benchmark with real data</Button>
              <ShareLinkButton fullWidth className={s.shareBtn} />
            </aside>

            <div className={s.results}>
              <div className={s.kpiGrid} data-cols="3">
                {kpis.map((k) => (
                  <div key={k.label} className={s.kpiCard}>
                    <span className={s.kpiIcon}><IconChartHistogram size={18} stroke={1.7} /></span>
                    <div className={s.kpiLabel}>{k.label}</div>
                    <div className={s.kpiVal}>{k.val}</div>
                    <div className={s.kpiSub}>{k.sub}</div>
                  </div>
                ))}
              </div>

              <div className={s.chartCard}>
                <div className={s.chartTitle}>Where you sit — <span style={{ color: verdict.c }}>{verdict.t}</span></div>
                {/* Quartile gauge */}
                <div style={{ position: 'relative', margin: '34px 4px 8px' }}>
                  <div style={{ display: 'flex', height: 12, borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${posOf(d.p25)}%`, background: '#bbf7d0' }} />
                    <div style={{ width: `${posOf(d.median) - posOf(d.p25)}%`, background: '#7dd3fc' }} />
                    <div style={{ width: `${posOf(d.p75) - posOf(d.median)}%`, background: '#fdba74' }} />
                    <div style={{ width: `${posOf(d.p90) - posOf(d.p75)}%`, background: '#fca5a5' }} />
                    <div style={{ flex: 1, background: '#f1a1a1' }} />
                  </div>
                  {/* marker */}
                  <div style={{ position: 'absolute', top: -22, left: `${markerPos}%`, transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-strong)' }}>{(ter / 100).toFixed(2)}%</div>
                    <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid var(--text-strong)', margin: '2px auto 0' }} />
                  </div>
                  {/* tick labels */}
                  {[['p25', 'P25'], ['median', 'Median'], ['p75', 'P75'], ['p90', 'P90']].map(([k, lbl]) => (
                    <div key={lbl} style={{ position: 'absolute', top: 18, left: `${posOf((d as any)[k])}%`, transform: 'translateX(-50%)', fontSize: 10.5, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                      {lbl}<br />{(((d as any)[k]) / 100).toFixed(2)}%
                    </div>
                  ))}
                </div>
                <div style={{ height: 30 }} />
                <Text size="sm" c="dimmed" mt="md">{sizeNote}</Text>
              </div>

              <div className={s.sectionLabel}>{d.label} — peer TER distribution (sample)</div>
              <div className={s.tableCard}>
                <table className={s.table}>
                  <thead><tr><th>Percentile</th><th className={s.num}>TER (bps)</th><th className={s.num}>TER (%)</th><th>Read</th></tr></thead>
                  <tbody>
                    {([['25th (lean)', d.p25], ['Median', d.median], ['75th', d.p75], ['90th (costly)', d.p90]] as [string, number][]).map(([lbl, v]) => (
                      <tr key={lbl}>
                        <td className={s.tdLabel}>{lbl}</td>
                        <td className={s.num}>{v}</td>
                        <td className={s.num}>{(v / 100).toFixed(2)}%</td>
                        <td>{ter <= v ? 'You are at or below this' : 'Above this level'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={s.noteCard}>
                <IconInfoCircle size={18} className={s.noteIcon} />
                <div>
                  <strong>Sample distribution — not real benchmark data.</strong>
                  <span className={s.noteMuted}> The peer percentiles above are illustrative placeholders. For a defensible benchmark, plug in a licensed dataset (e.g. SGX-listed peers, Morningstar, or your fund administrator’s book). TER excludes performance fees, which are compared separately.</span>
                </div>
              </div>

              <Text className={s.disclaimer}>Educational tool — not investment advice or a representation of market rates. Built by aama.io.</Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

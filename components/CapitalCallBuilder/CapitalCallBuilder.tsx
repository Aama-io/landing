// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, NumberInput, SegmentedControl, Button } from '@mantine/core';
import { IconArrowRight, IconWallet, IconChartBar, IconCircleCheck, IconCoin } from '@tabler/icons-react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import classes from './CapitalCallBuilder.module.css';

const COL = { call: '#1f5aff', cum: '#d97706', axis: '#94a3b8', text: '#475569', grid: '#eef2f7' };
const tooltipStyle = { background: '#ffffff', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 12px 30px rgba(15,23,42,0.10)', fontSize: 12 };

const fmtM = (v) => {
  const m = v / 1e6;
  if (Math.abs(m) >= 100) return `$${m.toFixed(0)}M`;
  if (Math.abs(m) >= 1) return `$${m.toFixed(1)}M`;
  return `$${(v / 1e3).toFixed(0)}k`;
};
const fmtFull = (v) => `$${Math.round(v).toLocaleString('en-US')}`;
const fmtPct = (v) => `${v.toFixed(v >= 99.95 ? 0 : 1)}%`;

// ── Engine: distribute committed capital into a call schedule ──────────
function buildSchedule(commitment, years, perYear, pacing, initialPct) {
  const N = Math.max(1, Math.round(years * perYear));
  const weights = Array.from({ length: N }, (_, i) =>
    pacing === 'front' ? N - i : pacing === 'back' ? i + 1 : 1
  );
  const wSum = weights.reduce((a, b) => a + b, 0);
  const initial = commitment * (initialPct / 100);
  const distributable = Math.max(0, commitment - initial);
  const calls = weights.map((w, i) => distributable * (w / wSum) + (i === 0 ? initial : 0));
  // absorb floating-point residual into the final call so cumulative == commitment
  const residual = commitment - calls.reduce((a, b) => a + b, 0);
  calls[N - 1] += residual;

  let cum = 0;
  const rows = calls.map((c, i) => {
    cum += c;
    const year = Math.floor(i / perYear) + 1;
    const sub = (i % perYear) + 1;
    const label = perYear === 4 ? `Y${year} Q${sub}` : perYear === 2 ? `Y${year} H${sub}` : `Year ${year}`;
    return { i, label, call: c, cumulative: cum, pctDrawn: (cum / commitment) * 100, remaining: Math.max(0, commitment - cum) };
  });
  return { N, rows, initial };
}

export default function CapitalCallBuilder() {
  const [commitment, setCommitment] = useState(50_000_000);
  const [years, setYears] = useState(4);
  const [freq, setFreq] = useState('4'); // calls per year
  const [pacing, setPacing] = useState('even');
  const [initialPct, setInitialPct] = useState(10);

  // Restore inputs from a shared link on mount, then keep the URL in sync.
  useEffect(() => {
    applyParams({
      c: (v) => setCommitment(Math.max(0, Number(v) || 0)),
      y: (v) => setYears(Math.min(7, Math.max(1, parseInt(v, 10) || 4))),
      fr: (v) => (['1', '2', '4'].includes(v) ? setFreq(v) : null),
      pc: (v) => (['front', 'even', 'back'].includes(v) ? setPacing(v) : null),
      ip: (v) => setInitialPct(Math.min(40, Math.max(0, parseInt(v, 10) || 0))),
    });
  }, []);
  useEffect(() => {
    syncParams({ c: commitment, y: years, fr: freq, pc: pacing, ip: initialPct });
  }, [commitment, years, freq, pacing, initialPct]);

  const perYear = parseInt(freq, 10);
  const commit = Number(commitment) || 0;

  const { N, rows, initial } = useMemo(
    () => buildSchedule(commit, years, perYear, pacing, initialPct),
    [commit, years, perYear, pacing, initialPct]
  );

  const peak = rows.reduce((m, r) => (r.call > m.call ? r : m), rows[0]);
  const avg = commit / N;
  const chartData = rows.map((r) => ({ label: r.label, call: r.call / 1e6, cumPct: r.pctDrawn }));

  const kpis = [
    { icon: IconCoin, label: 'Capital calls', val: String(N), sub: `over ${years} yr` },
    { icon: IconWallet, label: 'Initial at close', val: fmtM(initial), sub: `${initialPct}% of commitment` },
    { icon: IconChartBar, label: 'Peak call', val: fmtM(peak.call), sub: peak.label },
    { icon: IconCircleCheck, label: 'Fully drawn by', val: rows[N - 1].label, sub: fmtM(commit) },
  ];

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · Fund operations</span>
          <Title className={classes.heroTitle}>
            Capital call <span className={classes.accent}>schedule builder</span>
          </Title>
          <Text className={classes.heroDesc}>
            Model how committed capital is drawn down over the investment period — set your commitment, pacing and
            call frequency, and see every drawdown, cumulative called and remaining dry powder.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="lg">
          <div className={classes.layout}>
            {/* Controls */}
            <aside className={classes.controls}>
              <div className={classes.panelTitle}>Fund inputs</div>

              <label className={classes.fieldLabel}>Total committed capital</label>
              <NumberInput
                value={commitment}
                onChange={setCommitment}
                min={1_000_000}
                step={5_000_000}
                thousandSeparator=","
                prefix="$"
                hideControls
                size="md"
                className={classes.numInput}
              />

              <div className={classes.divider} />

              <div className={classes.sliderTop}>
                <span className={classes.fieldLabel}>Investment period</span>
                <span className={classes.sliderVal}>{years} yr</span>
              </div>
              <Slider value={years} onChange={setYears} min={1} max={7} step={1} color="blue" size="sm" label={null} />

              <div className={classes.sliderTop} style={{ marginTop: 18 }}>
                <span className={classes.fieldLabel}>Initial drawdown at first close</span>
                <span className={classes.sliderVal}>{initialPct}%</span>
              </div>
              <Slider value={initialPct} onChange={setInitialPct} min={0} max={40} step={5} color="blue" size="sm" label={null} />

              <div className={classes.divider} />

              <label className={classes.fieldLabel}>Call frequency</label>
              <SegmentedControl
                fullWidth
                value={freq}
                onChange={setFreq}
                size="xs"
                className={classes.segmented}
                data={[
                  { label: 'Quarterly', value: '4' },
                  { label: 'Semi', value: '2' },
                  { label: 'Annual', value: '1' },
                ]}
              />

              <label className={classes.fieldLabel} style={{ marginTop: 16 }}>Pacing curve</label>
              <SegmentedControl
                fullWidth
                value={pacing}
                onChange={setPacing}
                size="xs"
                className={classes.segmented}
                data={[
                  { label: 'Front', value: 'front' },
                  { label: 'Even', value: 'even' },
                  { label: 'Back', value: 'back' },
                ]}
              />

              <div className={classes.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>
                Talk to our fund admin team
              </Button>
              <ShareLinkButton fullWidth className={classes.shareBtn} />
            </aside>

            {/* Results */}
            <div className={classes.results}>
              <div className={classes.kpiGrid}>
                {kpis.map((k) => (
                  <div key={k.label} className={classes.kpiCard}>
                    <span className={classes.kpiIcon}><k.icon size={18} stroke={1.7} /></span>
                    <div className={classes.kpiLabel}>{k.label}</div>
                    <div className={classes.kpiVal}>{k.val}</div>
                    <div className={classes.kpiSub}>{k.sub}</div>
                  </div>
                ))}
              </div>

              <div className={classes.chartCard}>
                <div className={classes.chartTitle}>Drawdown schedule</div>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={chartData} margin={{ right: 8, left: 0, top: 8 }}>
                    <CartesianGrid stroke={COL.grid} vertical={false} />
                    <XAxis dataKey="label" tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                    <YAxis yAxisId="l" tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} unit="M" />
                    <YAxis yAxisId="r" orientation="right" domain={[0, 100]} tick={{ fill: COL.axis, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(v, n) => (n === 'Cumulative called' ? [`${v.toFixed(1)}%`, n] : [`$${v.toFixed(2)}M`, n])}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, color: COL.text }} />
                    <Bar yAxisId="l" dataKey="call" name="Capital called" fill={COL.call} radius={[5, 5, 0, 0]} maxBarSize={48} />
                    <Line yAxisId="r" type="monotone" dataKey="cumPct" name="Cumulative called" stroke={COL.cum} strokeWidth={2.5} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className={classes.sectionLabel}>Full call schedule</div>
              <div className={classes.tableCard}>
                <div className={classes.tableScroll}>
                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th>Period</th>
                        <th className={classes.num}>Capital called</th>
                        <th className={classes.num}>Cumulative</th>
                        <th className={classes.num}>% drawn</th>
                        <th className={classes.num}>Uncalled left</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.i}>
                          <td className={classes.period}>{r.label}</td>
                          <td className={classes.num}>{fmtFull(r.call)}</td>
                          <td className={classes.num}>{fmtFull(r.cumulative)}</td>
                          <td className={classes.num}>
                            <span className={classes.pctPill}>{fmtPct(r.pctDrawn)}</span>
                          </td>
                          <td className={classes.num}>{fmtFull(r.remaining)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Text className={classes.disclaimer}>
                Illustrative pacing model for planning — actual capital calls depend on deal flow, fund documents and
                GP discretion. Drawdowns shown gross of any management-fee calls. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

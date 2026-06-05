import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, SegmentedControl, Button } from '@mantine/core';
import { IconArrowRight, IconReceipt2, IconRefresh, IconCalendarStats, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import classes from './VccCostEstimator.module.css';

type Range = [number, number];

const scale = (r: Range, m: number): Range => [r[0] * m, r[1] * m];
const sumRanges = (rs: Range[]): Range => rs.reduce<Range>((a, r) => [a[0] + r[0], a[1] + r[1]], [0, 0]);

const fmtSgd = (v: number) => `S$${Math.round(v).toLocaleString('en-US')}`;
const fmtK = (v: number) => {
  const m = v / 1e6;
  if (m >= 1) return `S$${m.toFixed(m >= 10 ? 0 : 1)}M`;
  return `S$${Math.round(v / 1000)}k`;
};
const fmtRangeK = (r: Range) => `${fmtK(r[0])} – ${fmtK(r[1])}`;

const CX: Record<string, number> = { simple: 1, moderate: 1.3, complex: 1.65 };

const FM: Record<string, { label: string; setup: Range; annual: Range; note: string }> = {
  external: { label: 'External FM', setup: [8000, 18000], annual: [0, 0], note: 'Appointing an external MAS-licensed fund manager. Their investment management fee is charged separately, typically on AUM, and is not included below.' },
  cms: { label: 'Own CMS licence', setup: [20000, 40000], annual: [30000, 60000], note: 'Running your own Capital Markets Services licence — the figures include licence compliance setup and ongoing maintenance.' },
  rfmc: { label: 'RFMC', setup: [12000, 25000], annual: [18000, 35000], note: 'Registered Fund Management Company route — reflects registration and ongoing compliance obligations.' },
};

const TAX: Record<string, Range> = { none: [0, 0], '13O': [15000, 28000], '13U': [20000, 38000] };

export function VccCostEstimator() {
  const [structure, setStructure] = useState('standalone');
  const [subFunds, setSubFunds] = useState(2);
  const [fmType, setFmType] = useState('external');
  const [taxScheme, setTaxScheme] = useState('13O');
  const [complexity, setComplexity] = useState('moderate');

  // Restore inputs from a shared link on mount, then keep the URL in sync.
  useEffect(() => {
    applyParams({
      st: (v) => (['standalone', 'umbrella'].includes(v) ? setStructure(v) : null),
      sf: (v) => setSubFunds(Math.min(6, Math.max(1, parseInt(v, 10) || 2))),
      fm: (v) => (FM[v] ? setFmType(v) : null),
      tx: (v) => (TAX[v] !== undefined ? setTaxScheme(v) : null),
      cx: (v) => (CX[v] !== undefined ? setComplexity(v) : null),
    });
  }, []);
  useEffect(() => {
    syncParams({ st: structure, sf: subFunds, fm: fmType, tx: taxScheme, cx: complexity });
  }, [structure, subFunds, fmType, taxScheme, complexity]);

  const model = useMemo(() => {
    const cx = CX[complexity];
    const fm = FM[fmType];
    const subs = structure === 'umbrella' ? subFunds : 0;

    const setupRows: { k: string; r: Range }[] = [
      { k: 'VCC incorporation & registration', r: [8000, 10000] },
      { k: 'Legal structuring & fund documents', r: scale([25000, 55000], cx) },
      { k: `Fund manager setup — ${fm.label}`, r: fm.setup },
    ];
    if (taxScheme !== 'none') setupRows.push({ k: `Tax incentive application (${taxScheme})`, r: TAX[taxScheme] });
    if (subs > 0) setupRows.push({ k: `Sub-fund setup × ${subs}`, r: scale([9000, 18000], subs) });

    const annualRows: { k: string; r: Range }[] = [
      { k: 'Fund administration', r: scale([24000, 48000], cx) },
      { k: 'Annual audit', r: scale([12000, 24000], cx) },
      { k: 'Corporate secretary', r: [4000, 8000] },
      { k: 'Directors (resident + independent)', r: [12000, 28000] },
      { k: 'Tax compliance & filing', r: scale([5000, 12000], cx) },
      { k: 'Regulatory & MAS annual', r: [3000, 8000] },
    ];
    if (fm.annual[1] > 0) annualRows.push({ k: `Manager compliance — ${fm.label}`, r: fm.annual });
    if (subs > 0) annualRows.push({ k: `Sub-fund admin & audit × ${subs}`, r: scale([15000, 30000], subs) });

    const setupTotal = sumRanges(setupRows.map((x) => x.r));
    const annualTotal = sumRanges(annualRows.map((x) => x.r));
    const firstYear: Range = [setupTotal[0] + annualTotal[0], setupTotal[1] + annualTotal[1]];
    const monthly: Range = [annualTotal[0] / 12, annualTotal[1] / 12];

    return { setupRows, annualRows, setupTotal, annualTotal, firstYear, monthly, fmNote: fm.note };
  }, [structure, subFunds, fmType, taxScheme, complexity]);

  const kpis = [
    { icon: IconReceipt2, label: 'One-time setup', val: fmtRangeK(model.setupTotal) },
    { icon: IconRefresh, label: 'Annual recurring', val: fmtRangeK(model.annualTotal) },
    { icon: IconCalendarStats, label: 'First-year all-in', val: fmtRangeK(model.firstYear) },
    { icon: IconInfoCircle, label: 'Monthly run-rate', val: fmtRangeK(model.monthly) },
  ];

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · Singapore VCC</span>
          <Title className={classes.heroTitle}>
            VCC setup <span className={classes.accent}>cost estimator</span>
          </Title>
          <Text className={classes.heroDesc}>
            Estimate what it costs to launch and run a Singapore Variable Capital Company. Set your structure, fund
            manager route and tax incentive, and get an indicative one-time and annual cost breakdown.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="lg">
          <div className={classes.layout}>
            {/* Controls */}
            <aside className={classes.controls}>
              <div className={classes.panelTitle}>Your VCC</div>

              <label className={classes.fieldLabel}>Structure</label>
              <SegmentedControl
                fullWidth size="xs" className={classes.segmented}
                value={structure} onChange={setStructure}
                data={[{ label: 'Standalone', value: 'standalone' }, { label: 'Umbrella', value: 'umbrella' }]}
              />

              {structure === 'umbrella' && (
                <>
                  <div className={classes.sliderTop} style={{ marginTop: 16 }}>
                    <span className={classes.fieldLabel} style={{ margin: 0 }}>Sub-funds</span>
                    <span className={classes.sliderVal}>{subFunds}</span>
                  </div>
                  <Slider value={subFunds} onChange={setSubFunds} min={1} max={6} step={1} color="blue" size="sm" label={null} />
                </>
              )}

              <div className={classes.divider} />

              <label className={classes.fieldLabel}>Fund manager route</label>
              <SegmentedControl
                fullWidth size="xs" className={classes.segmented}
                value={fmType} onChange={setFmType}
                data={[{ label: 'External FM', value: 'external' }, { label: 'Own CMS', value: 'cms' }, { label: 'RFMC', value: 'rfmc' }]}
              />

              <label className={classes.fieldLabel} style={{ marginTop: 16 }}>Tax incentive</label>
              <SegmentedControl
                fullWidth size="xs" className={classes.segmented}
                value={taxScheme} onChange={setTaxScheme}
                data={[{ label: 'None', value: 'none' }, { label: '13O', value: '13O' }, { label: '13U', value: '13U' }]}
              />

              <label className={classes.fieldLabel} style={{ marginTop: 16 }}>Strategy complexity</label>
              <SegmentedControl
                fullWidth size="xs" className={classes.segmented}
                value={complexity} onChange={setComplexity}
                data={[{ label: 'Simple', value: 'simple' }, { label: 'Moderate', value: 'moderate' }, { label: 'Complex', value: 'complex' }]}
              />

              <div className={classes.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>
                Get a fixed-fee setup quote
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
                  </div>
                ))}
              </div>

              <div className={classes.sectionLabel}>Cost breakdown</div>
              <div className={classes.tableCard}>
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className={classes.num}>Low</th>
                      <th className={classes.num}>High</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={classes.groupRow}><td colSpan={3}>One-time setup</td></tr>
                    {model.setupRows.map((row) => (
                      <tr key={row.k}>
                        <td>{row.k}</td>
                        <td className={classes.num}>{fmtSgd(row.r[0])}</td>
                        <td className={classes.num}>{fmtSgd(row.r[1])}</td>
                      </tr>
                    ))}
                    <tr className={classes.subtotalRow}>
                      <td>Setup subtotal</td>
                      <td className={classes.num}>{fmtSgd(model.setupTotal[0])}</td>
                      <td className={classes.num}>{fmtSgd(model.setupTotal[1])}</td>
                    </tr>

                    <tr className={classes.groupRow}><td colSpan={3}>Annual recurring</td></tr>
                    {model.annualRows.map((row) => (
                      <tr key={row.k}>
                        <td>{row.k}</td>
                        <td className={classes.num}>{fmtSgd(row.r[0])}</td>
                        <td className={classes.num}>{fmtSgd(row.r[1])}</td>
                      </tr>
                    ))}
                    <tr className={classes.subtotalRow}>
                      <td>Annual subtotal</td>
                      <td className={classes.num}>{fmtSgd(model.annualTotal[0])}</td>
                      <td className={classes.num}>{fmtSgd(model.annualTotal[1])}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className={classes.totalRow}>
                      <td>First-year all-in (setup + year 1)</td>
                      <td className={classes.num}>{fmtSgd(model.firstYear[0])}</td>
                      <td className={classes.num}>{fmtSgd(model.firstYear[1])}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className={classes.noteCard}>
                <IconInfoCircle size={18} className={classes.noteIcon} />
                <div>
                  <strong>{model.fmNote}</strong>
                  <span className={classes.noteMuted}>
                    {' '}Not included: AUM-based management fees, custody/bank charges, transaction and onboarding costs, and GST.
                    The 13O / 13U schemes carry minimum fund-size and local business-spending conditions — confirm current MAS criteria before relying on eligibility.
                  </span>
                </div>
              </div>

              <Text className={classes.disclaimer}>
                Indicative market ranges for planning only — not a quote, and not legal, tax or financial advice. Actual fees
                vary by service provider, strategy and negotiation. Validate every figure with your counsel, fund administrator
                and tax adviser. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

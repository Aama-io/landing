import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, SegmentedControl, NumberInput, Button } from '@mantine/core';
import { IconArrowRight, IconReportMoney, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import s from '@/components/ui/tool.module.css';

type Juris = 'sg' | 'us' | 'uk';

// ⚠️ INDICATIVE rates only — carried-interest taxation is complex and changing. Not tax advice.
function treatment(j: Juris, holdYears: number): { rate: number; basis: string; note: string } {
  if (j === 'sg') return {
    rate: 0,
    basis: 'Capital in nature — no capital gains tax in Singapore',
    note: 'Assumes carry is capital gain under a qualifying fund / fund manager. If characterised as income for services, it can be taxable at income tax rates (individuals up to 24%, companies 17%).',
  };
  if (j === 'us') {
    if (holdYears >= 3) return { rate: 0.238, basis: 'Long-term capital gain (asset held ≥ 3 years, §1061)', note: '20% LTCG + 3.8% net investment income tax, federal only. State income tax can add up to ~13%.' };
    return { rate: 0.408, basis: 'Short-term / ordinary income (held < 3 years, §1061)', note: '37% top ordinary rate + 3.8% NIIT, federal only. State tax may apply.' };
  }
  // UK
  if (holdYears < 3.33) return { rate: 0.47, basis: 'Income-based carried interest (avg hold < 40 months)', note: 'Taxed as income — up to 45% income tax + 2% NIC. Indicative.' };
  return { rate: 0.32, basis: 'Carried interest CGT rate (indicative 2025/26)', note: 'UK carry taxation is being reformed into the income-tax framework from April 2026 (an effective rate via a 72.5% multiplier) — confirm the current rules.' };
}

const NAMES: Record<Juris, string> = { sg: 'Singapore', us: 'United States', uk: 'United Kingdom' };
const ALL: Juris[] = ['sg', 'us', 'uk'];

export function CarryTaxEstimator() {
  const [juris, setJuris] = useState<Juris>('sg');
  const [carry, setCarry] = useState(5_000_000);
  const [holdYears, setHoldYears] = useState(5);

  useEffect(() => {
    applyParams({
      j: (v) => (['sg', 'us', 'uk'].includes(v) ? setJuris(v as Juris) : null),
      c: (v) => setCarry(Math.max(0, Number(v) || 0)),
      h: (v) => setHoldYears(Math.min(8, Math.max(0, Number(v) || 0))),
    });
  }, []);
  useEffect(() => { syncParams({ j: juris, c: carry, h: holdYears }); }, [juris, carry, holdYears]);

  const sel = useMemo(() => treatment(juris, holdYears), [juris, holdYears]);
  const tax = carry * sel.rate;
  const net = carry - tax;

  const fmt = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;

  const kpis = [
    { label: 'Effective tax rate', val: `${(sel.rate * 100).toFixed(1)}%` },
    { label: 'Estimated tax', val: fmt(tax) },
    { label: 'Net carry after tax', val: fmt(net) },
  ];

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · GP tax</span>
          <Title className={s.heroTitle}>Carried interest <span className={s.accent}>tax estimator</span></Title>
          <Text className={s.heroDesc}>
            Estimate the tax on carried interest across Singapore, the US and the UK — and see how holding period and
            jurisdiction change what a GP keeps. Indicative rates, not tax advice.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout}>
            <aside className={s.controls}>
              <div className={s.panelTitle}>Your carry</div>
              <label className={s.fieldLabel}>Jurisdiction</label>
              <SegmentedControl fullWidth size="xs" className={s.segmented} value={juris} onChange={(v) => setJuris(v as Juris)}
                data={[{ label: 'Singapore', value: 'sg' }, { label: 'US', value: 'us' }, { label: 'UK', value: 'uk' }]} />

              <label className={s.fieldLabel} style={{ marginTop: 16 }}>Carried interest amount</label>
              <NumberInput value={carry} onChange={(v) => setCarry(Number(v) || 0)} min={0} step={500_000} thousandSeparator="," prefix="$" hideControls size="sm" className={s.field} />

              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Avg. asset holding period</span><span className={s.sliderVal}>{holdYears} yr</span></div>
              <Slider value={holdYears} onChange={setHoldYears} min={0} max={8} step={0.5} color="blue" size="sm" label={null}
                marks={[{ value: 3, label: '3y' }, { value: 3.5, label: '40m' }]} />
              <div className={s.hint}>Drives US §1061 (≥3y) and UK income-based carry (≥40 months) tests.</div>

              <div className={s.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={s.ctaBtn}>Plan your fund’s domicile</Button>
              <ShareLinkButton fullWidth className={s.shareBtn} />
            </aside>

            <div className={s.results}>
              <div className={s.kpiGrid} data-cols="3">
                {kpis.map((k) => (
                  <div key={k.label} className={s.kpiCard}>
                    <span className={s.kpiIcon}><IconReportMoney size={18} stroke={1.7} /></span>
                    <div className={s.kpiLabel}>{k.label}</div>
                    <div className={s.kpiVal}>{k.val}</div>
                  </div>
                ))}
              </div>

              <div className={s.recCard} style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--mantine-color-blue-6)' }}>{NAMES[juris]} — tax basis</div>
                <div style={{ fontSize: 'clamp(1.15rem,2.2vw,1.4rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: '4px 0 10px', lineHeight: 1.2 }}>{sel.basis}</div>
                <Text size="sm" c="dimmed">{sel.note}</Text>
              </div>

              <div className={s.sectionLabel}>Same carry, three jurisdictions</div>
              <div className={s.tableCard}>
                <table className={s.table}>
                  <thead><tr><th>Jurisdiction</th><th>Basis</th><th className={s.num}>Rate</th><th className={s.num}>Tax</th><th className={s.num}>Net carry</th></tr></thead>
                  <tbody>
                    {ALL.map((j) => {
                      const t = treatment(j, holdYears);
                      return (
                        <tr key={j}>
                          <td data-active={j === juris || undefined} className={s.tdLabel} style={{ color: j === juris ? 'var(--mantine-color-blue-7)' : undefined }}>{NAMES[j]}</td>
                          <td data-active={j === juris || undefined} style={{ fontSize: 12.5 }}>{t.basis}</td>
                          <td data-active={j === juris || undefined} className={s.num}>{(t.rate * 100).toFixed(1)}%</td>
                          <td data-active={j === juris || undefined} className={s.num}>{fmt(carry * t.rate)}</td>
                          <td data-active={j === juris || undefined} className={s.num}>{fmt(carry * (1 - t.rate))}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className={s.noteCard}>
                <IconInfoCircle size={18} className={s.noteIcon} />
                <div>
                  <strong>Indicative only — not tax advice.</strong>
                  <span className={s.noteMuted}> Carried-interest taxation is highly fact-specific and actively changing (US §1061, UK 2025–26 reforms, Singapore characterisation rules). Rates here are simplified federal/headline figures and ignore state/local tax, reliefs, treaty positions and personal circumstances. Always engage a qualified tax adviser.</span>
                </div>
              </div>

              <Text className={s.disclaimer}>Built by aama.io. Educational estimate, not legal or tax advice.</Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

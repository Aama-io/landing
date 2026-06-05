import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, SegmentedControl, NumberInput, Button } from '@mantine/core';
import { IconArrowRight, IconCertificate, IconCheck, IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import s from '@/components/ui/tool.module.css';

type Regime = 'efo' | 'rfmc' | 'ailfmc' | 'retail';

const REGIMES: Record<Regime, { name: string; tag: string; capital: string; aumCap: string; investorCap: string; retail: string; appFee: string; annual: string; setup: string }> = {
  efo: { name: 'Single Family Office (EFO)', tag: 'Licensing-exempt', capital: 'No min. regulatory capital', aumCap: 'None — own family assets only', investorCap: 'Related parties only', retail: 'No', appFee: 'None (exemption)', annual: 'None', setup: '1–3 months' },
  rfmc: { name: 'RFMC', tag: 'Being phased out', capital: 'S$250k base capital', aumCap: 'S$250M', investorCap: 'Up to 30 qualified investors', retail: 'No', appFee: '~S$1,000', annual: '~S$4,000', setup: '4–6 months' },
  ailfmc: { name: 'A/I LFMC (CMS licence)', tag: 'Standard route', capital: 'S$250k base capital', aumCap: 'No cap', investorCap: 'Accredited & institutional', retail: 'No', appFee: '~S$1,000', annual: '~S$4,000', setup: '4–8 months' },
  retail: { name: 'Retail LFMC (CMS licence)', tag: 'Retail-permitted', capital: 'S$500k–1M base capital', aumCap: 'No cap', investorCap: 'Incl. retail investors', retail: 'Yes', appFee: '~S$1,000', annual: '~S$4,000', setup: '6–12 months' },
};

const ORDER: Regime[] = ['efo', 'rfmc', 'ailfmc', 'retail'];

export function MasLicensing() {
  const [clients, setClients] = useState('external'); // family | external
  const [investors, setInvestors] = useState('ai'); // ai | retail
  const [aum, setAum] = useState(150);
  const [qInvestors, setQInvestors] = useState(15);

  useEffect(() => {
    applyParams({
      cl: (v) => (['family', 'external'].includes(v) ? setClients(v) : null),
      iv: (v) => (['ai', 'retail'].includes(v) ? setInvestors(v) : null),
      a: (v) => setAum(Math.max(0, Number(v) || 0)),
      q: (v) => setQInvestors(Math.min(60, Math.max(1, parseInt(v, 10) || 1))),
    });
  }, []);
  useEffect(() => { syncParams({ cl: clients, iv: investors, a: aum, q: qInvestors }); }, [clients, investors, aum, qInvestors]);

  const { rec, reasons, rfmcWouldFit } = useMemo(() => {
    const reasons: string[] = [];
    if (clients === 'family') {
      reasons.push('You manage only your own family’s assets — no external client money, so a fund management licence isn’t required.');
      reasons.push('You can still apply for the 13O / 13U tax incentive as a Single Family Office.');
      return { rec: 'efo' as Regime, reasons, rfmcWouldFit: false };
    }
    if (investors === 'retail') {
      reasons.push('Serving retail investors requires a Retail LFMC capital markets services licence.');
      reasons.push('Expect higher base capital, compliance and track-record requirements.');
      return { rec: 'retail' as Regime, reasons, rfmcWouldFit: false };
    }
    const rfmcWouldFit = aum <= 250 && qInvestors <= 30;
    reasons.push('You serve external accredited / institutional investors, so a CMS licence applies.');
    if (rfmcWouldFit) {
      reasons.push(`Your AUM (S$${aum}M) and investor count (${qInvestors}) historically fit the RFMC regime — but MAS is phasing RFMC out, so new managers should apply as an A/I LFMC.`);
    } else {
      reasons.push(`Above the RFMC limits (S$250M AUM / 30 investors), the A/I LFMC licence is the fit — it has no AUM or investor cap.`);
    }
    return { rec: 'ailfmc' as Regime, reasons, rfmcWouldFit };
  }, [clients, investors, aum, qInvestors]);

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · Singapore MAS</span>
          <Title className={s.heroTitle}>MAS fund management <span className={s.accent}>licence estimator</span></Title>
          <Text className={s.heroDesc}>
            Find which Singapore fund management regime fits — Single Family Office exemption, RFMC, or a CMS licence
            (A/I or Retail LFMC) — based on who you manage money for and your AUM, with indicative capital and fees.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout}>
            <aside className={s.controls}>
              <div className={s.panelTitle}>Your business</div>
              <label className={s.fieldLabel}>Whose money do you manage?</label>
              <SegmentedControl fullWidth size="xs" className={s.segmented} value={clients} onChange={setClients}
                data={[{ label: 'Own family', value: 'family' }, { label: 'External', value: 'external' }]} />

              <label className={s.fieldLabel} style={{ marginTop: 16 }}>Target investors</label>
              <SegmentedControl fullWidth size="xs" className={s.segmented} value={investors} onChange={setInvestors} disabled={clients === 'family'}
                data={[{ label: 'Accredited / Inst.', value: 'ai' }, { label: 'Incl. retail', value: 'retail' }]} />

              <div className={s.divider} />
              <label className={s.fieldLabel}>Assets under management</label>
              <NumberInput value={aum} onChange={(v) => setAum(Number(v) || 0)} min={0} step={25} thousandSeparator="," prefix="S$ " suffix="M" hideControls size="sm" className={s.field} disabled={clients === 'family'} />

              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Qualified investors</span><span className={s.sliderVal}>{qInvestors}</span></div>
              <Slider value={qInvestors} onChange={setQInvestors} min={1} max={60} step={1} color="blue" size="sm" label={null} disabled={clients === 'family'} />

              <div className={s.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={s.ctaBtn}>Get licensing support</Button>
              <ShareLinkButton fullWidth className={s.shareBtn} />
            </aside>

            <div className={s.results}>
              <div className={s.recCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className={s.kpiIcon} style={{ width: 52, height: 52, background: 'var(--gradient-brand)', color: '#fff', border: 'none' }}><IconCertificate size={26} stroke={1.7} /></span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--mantine-color-blue-6)' }}>Recommended regime</div>
                    <div style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--text-strong)', lineHeight: 1.1 }}>{REGIMES[rec].name}</div>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', margin: '20px 0 0', padding: '20px 0 0', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {reasons.map((r) => (
                    <li key={r} style={{ display: 'flex', gap: 10, fontSize: 14.5, lineHeight: 1.55, color: 'var(--text)' }}>
                      <IconCheck size={17} style={{ flexShrink: 0, marginTop: 2, color: 'var(--mantine-color-blue-6)' }} /><span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {rfmcWouldFit && (
                <div className={s.warn} style={{ marginTop: 16 }}>
                  <IconAlertTriangle size={15} /> RFMC matches your size, but MAS has announced the RFMC regime is being withdrawn — confirm the current transition timeline before relying on it.
                </div>
              )}

              <div className={s.sectionLabel}>All regimes compared</div>
              <div className={s.tableCard}>
                <table className={s.table}>
                  <thead>
                    <tr><th>Regime</th><th>Base capital</th><th>AUM cap</th><th>Investors</th><th>Retail</th><th className={s.num}>App. fee</th><th className={s.num}>Annual</th></tr>
                  </thead>
                  <tbody>
                    {ORDER.map((k) => (
                      <tr key={k}>
                        <td data-active={k === rec || undefined} className={s.tdLabel} style={{ color: k === rec ? 'var(--mantine-color-blue-7)' : undefined }}>{REGIMES[k].name}</td>
                        <td data-active={k === rec || undefined}>{REGIMES[k].capital}</td>
                        <td data-active={k === rec || undefined}>{REGIMES[k].aumCap}</td>
                        <td data-active={k === rec || undefined}>{REGIMES[k].investorCap}</td>
                        <td data-active={k === rec || undefined}>{REGIMES[k].retail}</td>
                        <td data-active={k === rec || undefined} className={s.num}>{REGIMES[k].appFee}</td>
                        <td data-active={k === rec || undefined} className={s.num}>{REGIMES[k].annual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={s.noteCard}>
                <IconInfoCircle size={18} className={s.noteIcon} />
                <div>
                  <strong>Indicative figures — verify before relying on them.</strong>
                  <span className={s.noteMuted}> Capital requirements, MAS application/annual fees, and the RFMC regime status change over time. This is a directional guide, not legal or regulatory advice — confirm the current rules with MAS or your compliance adviser. EFO/RFMC/A/I LFMC selection also depends on factors (e.g. fund structure, related-party tests) not captured here.</span>
                </div>
              </div>

              <Text className={s.disclaimer}>
                Educational tool for Singapore fund managers — not legal, regulatory or tax advice. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

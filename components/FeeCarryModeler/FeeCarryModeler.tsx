import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, NumberInput, Button } from '@mantine/core';
import { IconArrowRight, IconReceipt2, IconTrophy, IconUsers, IconChartPie } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import s from '@/components/ui/tool.module.css';

const fmtM = (v: number) => `$${(Number(v) || 0).toFixed(1)}M`;

function waterfall(capital: number, proceeds: number, prefRate: number, years: number, carry: number, catchup = 1) {
  let rem = Math.max(0, proceeds);
  const roc = Math.min(rem, capital); rem -= roc;
  const pref = capital * prefRate * years;
  const prefPaid = Math.min(rem, pref); rem -= prefPaid;
  const cuTarget = carry < 1 ? (carry / (1 - carry)) * prefPaid : 0;
  const gpCatchup = Math.min(rem, cuTarget * catchup); rem -= gpCatchup;
  const gpSplit = rem * carry;
  const gpCarry = gpCatchup + gpSplit;
  return { gpCarry, roc, lpTotal: proceeds - gpCarry };
}

export function FeeCarryModeler() {
  const [fundSize, setFundSize] = useState(100);
  const [mgmtFee, setMgmtFee] = useState(2.0);
  const [invPeriod, setInvPeriod] = useState(5);
  const [fundLife, setFundLife] = useState(10);
  const [stepDown, setStepDown] = useState(1.5);
  const [carry, setCarry] = useState(20);
  const [pref, setPref] = useState(8);
  const [grossMoic, setGrossMoic] = useState(2.5);

  useEffect(() => {
    applyParams({
      fs: (v) => setFundSize(Math.max(0, Number(v) || 0)),
      mf: (v) => setMgmtFee(Math.min(3, Math.max(0, Number(v) || 0))),
      ip: (v) => setInvPeriod(Math.min(8, Math.max(1, Number(v) || 5))),
      fl: (v) => setFundLife(Math.min(15, Math.max(3, Number(v) || 10))),
      sd: (v) => setStepDown(Math.min(3, Math.max(0, Number(v) || 0))),
      cy: (v) => setCarry(Math.min(30, Math.max(0, Number(v) || 0))),
      pf: (v) => setPref(Math.min(12, Math.max(0, Number(v) || 0))),
      gm: (v) => setGrossMoic(Math.min(6, Math.max(0.1, Number(v) || 1))),
    });
  }, []);
  useEffect(() => {
    syncParams({ fs: fundSize, mf: mgmtFee, ip: invPeriod, fl: fundLife, sd: stepDown, cy: carry, pf: pref, gm: grossMoic });
  }, [fundSize, mgmtFee, invPeriod, fundLife, stepDown, carry, pref, grossMoic]);

  const m = useMemo(() => {
    const postYears = Math.max(0, fundLife - invPeriod);
    const feesInv = invPeriod * fundSize * (mgmtFee / 100);
    const feesPost = postYears * fundSize * (stepDown / 100);
    const totalFees = feesInv + feesPost;
    const deployed = Math.max(0, fundSize - totalFees);
    const grossProceeds = deployed * grossMoic;
    const wf = waterfall(fundSize, grossProceeds, pref / 100, fundLife, carry / 100);
    const carryGP = wf.gpCarry;
    const lpNet = grossProceeds - carryGP;
    const lpCapBack = Math.min(grossProceeds, fundSize);
    const lpProfit = Math.max(0, lpNet - lpCapBack);
    const lpNetMoic = fundSize > 0 ? lpNet / fundSize : 0;
    const grossMoicOnCommit = fundSize > 0 ? grossProceeds / fundSize : 0;
    const gpTotal = totalFees + carryGP;
    const feeAsPct = fundSize > 0 ? (totalFees / fundSize) * 100 : 0;
    return { totalFees, feesInv, feesPost, deployed, grossProceeds, carryGP, lpNet, lpCapBack, lpProfit, lpNetMoic, grossMoicOnCommit, gpTotal, feeAsPct, postYears };
  }, [fundSize, mgmtFee, invPeriod, fundLife, stepDown, carry, pref, grossMoic]);

  const split = [
    { label: 'LP capital returned', val: m.lpCapBack, c: '#93c5fd' },
    { label: 'LP profit', val: m.lpProfit, c: '#1f5aff' },
    { label: 'GP carry', val: m.carryGP, c: '#d97706' },
  ];
  const splitTotal = m.grossProceeds || 1;

  const kpis = [
    { icon: IconReceipt2, label: 'Total mgmt fees', val: fmtM(m.totalFees), sub: `${m.feeAsPct.toFixed(0)}% of fund over ${fundLife}yr` },
    { icon: IconTrophy, label: 'Carry to GP', val: fmtM(m.carryGP), sub: `at ${grossMoic.toFixed(1)}× gross` },
    { icon: IconChartPie, label: 'GP total take', val: fmtM(m.gpTotal), sub: 'fees + carry' },
    { icon: IconUsers, label: 'LP net MOIC', val: `${m.lpNetMoic.toFixed(2)}×`, sub: `vs ${m.grossMoicOnCommit.toFixed(2)}× gross` },
  ];

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · Fund economics</span>
          <Title className={s.heroTitle}>Management fee & <span className={s.accent}>carry modeler</span></Title>
          <Text className={s.heroDesc}>
            Model total GP economics over a fund’s life — management fees with a step-down, carried interest over the
            hurdle, and the net-to-LP after the fee and carry drag.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout}>
            <aside className={s.controls}>
              <div className={s.groupTitle}>Fund</div>
              <label className={s.fieldLabel}>Fund size (commitments)</label>
              <NumberInput value={fundSize} onChange={(v) => setFundSize(Number(v) || 0)} min={0} step={25} thousandSeparator="," prefix="$" suffix="M" hideControls size="sm" className={s.field} />
              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Gross MOIC</span><span className={s.sliderVal}>{grossMoic.toFixed(1)}×</span></div>
              <Slider value={grossMoic} onChange={setGrossMoic} min={0.5} max={5} step={0.1} color="blue" size="sm" label={null} />

              <div className={s.groupTitle}>Fees</div>
              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Mgmt fee (invest. period)</span><span className={s.sliderVal}>{mgmtFee.toFixed(2)}%</span></div>
              <Slider value={mgmtFee} onChange={setMgmtFee} min={0} max={3} step={0.05} color="blue" size="sm" label={null} />
              <div className={s.sliderTop} style={{ marginTop: 14 }}><span className={s.fieldLabel} style={{ margin: 0 }}>Step-down fee (after)</span><span className={s.sliderVal}>{stepDown.toFixed(2)}%</span></div>
              <Slider value={stepDown} onChange={setStepDown} min={0} max={3} step={0.05} color="blue" size="sm" label={null} />
              <div className={s.row2} style={{ marginTop: 14 }}>
                <div><div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Invest.</span><span className={s.sliderVal}>{invPeriod}y</span></div><Slider value={invPeriod} onChange={setInvPeriod} min={1} max={8} step={1} color="blue" size="sm" label={null} /></div>
                <div><div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Life</span><span className={s.sliderVal}>{fundLife}y</span></div><Slider value={fundLife} onChange={setFundLife} min={3} max={15} step={1} color="blue" size="sm" label={null} /></div>
              </div>

              <div className={s.groupTitle}>Carry</div>
              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Carried interest</span><span className={s.sliderVal}>{carry}%</span></div>
              <Slider value={carry} onChange={setCarry} min={0} max={30} step={1} color="blue" size="sm" label={null} />
              <div className={s.sliderTop} style={{ marginTop: 14 }}><span className={s.fieldLabel} style={{ margin: 0 }}>Preferred return</span><span className={s.sliderVal}>{pref}%</span></div>
              <Slider value={pref} onChange={setPref} min={0} max={12} step={0.5} color="blue" size="sm" label={null} />

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
                <div className={s.chartTitle}>Where the gross proceeds go — {fmtM(m.grossProceeds)}</div>
                <div style={{ display: 'flex', height: 30, borderRadius: 8, overflow: 'hidden', margin: '8px 0 14px' }}>
                  {split.map((seg) => (
                    <div key={seg.label} title={`${seg.label}: ${fmtM(seg.val)}`} style={{ width: `${(seg.val / splitTotal) * 100}%`, background: seg.c, minWidth: seg.val > 0 ? 2 : 0 }} />
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
                  {split.map((seg) => (
                    <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13 }}>
                      <span style={{ width: 11, height: 11, borderRadius: 3, background: seg.c }} />
                      <span style={{ color: 'var(--text-muted)' }}>{seg.label}</span>
                      <strong style={{ color: 'var(--text-strong)' }}>{fmtM(seg.val)}</strong>
                      <span style={{ color: 'var(--text-faint)' }}>({((seg.val / splitTotal) * 100).toFixed(0)}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={s.sectionLabel}>Economics breakdown</div>
              <div className={s.tableCard}>
                <table className={s.table}>
                  <tbody>
                    <tr><td className={s.tdLabel}>Committed capital</td><td className={s.num}>{fmtM(fundSize)}</td></tr>
                    <tr><td className={s.tdLabel}>Mgmt fees — investment period ({invPeriod}y @ {mgmtFee}%)</td><td className={s.num}>{fmtM(m.feesInv)}</td></tr>
                    <tr><td className={s.tdLabel}>Mgmt fees — post-investment ({m.postYears}y @ {stepDown}%)</td><td className={s.num}>{fmtM(m.feesPost)}</td></tr>
                    <tr className={s.subtotalRow}><td>Total management fees</td><td className={s.num}>{fmtM(m.totalFees)}</td></tr>
                    <tr><td className={s.tdLabel}>Capital deployed to investments</td><td className={s.num}>{fmtM(m.deployed)}</td></tr>
                    <tr><td className={s.tdLabel}>Gross proceeds ({grossMoic.toFixed(1)}× on deployed)</td><td className={s.num}>{fmtM(m.grossProceeds)}</td></tr>
                    <tr><td className={s.tdLabel}>Carried interest to GP</td><td className={s.num}>{fmtM(m.carryGP)}</td></tr>
                    <tr className={s.subtotalRow}><td>Net distributions to LPs</td><td className={s.num}>{fmtM(m.lpNet)}</td></tr>
                  </tbody>
                  <tfoot>
                    <tr className={s.totalRow}><td>LP net multiple (after fees & carry)</td><td className={s.num}>{m.lpNetMoic.toFixed(2)}×</td></tr>
                  </tfoot>
                </table>
              </div>

              <Text className={s.disclaimer}>
                Simplified model — fees on committed capital with a flat step-down, full GP catch-up, single pref accrual over
                fund life, and full deployment assumed. Real funds vary by fee basis, recycling and timing. Educational only. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

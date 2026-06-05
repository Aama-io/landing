import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, NumberInput, Button } from '@mantine/core';
import { IconArrowRight, IconArrowsSplit2, IconTrendingUp, IconCoins } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import s from '@/components/ui/tool.module.css';

const fmtM = (v: number) => `$${(Number(v) || 0).toFixed(2)}M`;

function gpCarry(capital: number, proceeds: number, prefRate: number, years: number, carry: number) {
  let rem = Math.max(0, proceeds);
  const roc = Math.min(rem, capital); rem -= roc;
  const pref = capital * prefRate * years;
  const prefPaid = Math.min(rem, pref); rem -= prefPaid;
  const cuTarget = carry < 1 ? (carry / (1 - carry)) * prefPaid : 0;
  const cu = Math.min(rem, cuTarget); rem -= cu;
  return cu + rem * carry;
}

export function CoInvestModeler() {
  const [amount, setAmount] = useState(10);
  const [moic, setMoic] = useState(2.5);
  const [years, setYears] = useState(5);
  const [fundFee, setFundFee] = useState(2.0);
  const [fundCarry, setFundCarry] = useState(20);
  const [pref, setPref] = useState(8);
  const [coFee, setCoFee] = useState(0);
  const [coCarry, setCoCarry] = useState(0);

  useEffect(() => {
    applyParams({
      a: (v) => setAmount(Math.max(0, Number(v) || 0)),
      mo: (v) => setMoic(Math.min(6, Math.max(0.1, Number(v) || 1))),
      y: (v) => setYears(Math.min(10, Math.max(1, Number(v) || 5))),
      ff: (v) => setFundFee(Math.min(3, Math.max(0, Number(v) || 0))),
      fc: (v) => setFundCarry(Math.min(30, Math.max(0, Number(v) || 0))),
      pf: (v) => setPref(Math.min(12, Math.max(0, Number(v) || 0))),
      cf: (v) => setCoFee(Math.min(2, Math.max(0, Number(v) || 0))),
      cc: (v) => setCoCarry(Math.min(20, Math.max(0, Number(v) || 0))),
    });
  }, []);
  useEffect(() => {
    syncParams({ a: amount, mo: moic, y: years, ff: fundFee, fc: fundCarry, pf: pref, cf: coFee, cc: coCarry });
  }, [amount, moic, years, fundFee, fundCarry, pref, coFee, coCarry]);

  const m = useMemo(() => {
    const proceeds = amount * moic;
    const route = (feeRate: number, carryRate: number) => {
      const fees = amount * (feeRate / 100) * years;
      const carryAmt = gpCarry(amount, proceeds, pref / 100, years, carryRate / 100);
      const net = proceeds - fees - carryAmt;
      const netMoic = amount > 0 ? net / amount : 0;
      const netIrr = amount > 0 && net > 0 ? Math.pow(net / amount, 1 / years) - 1 : -1;
      return { fees, carryAmt, net, netMoic, netIrr };
    };
    const fund = route(fundFee, fundCarry);
    const co = route(coFee, coCarry);
    return {
      proceeds, fund, co,
      upliftM: co.net - fund.net,
      upliftMoic: co.netMoic - fund.netMoic,
      upliftIrrBps: (co.netIrr - fund.netIrr) * 10000,
    };
  }, [amount, moic, years, fundFee, fundCarry, pref, coFee, coCarry]);

  const kpis = [
    { icon: IconCoins, label: 'Co-invest net MOIC', val: `${m.co.netMoic.toFixed(2)}×`, sub: `${(m.co.netIrr * 100).toFixed(1)}% net IRR` },
    { icon: IconCoins, label: 'Fund net MOIC', val: `${m.fund.netMoic.toFixed(2)}×`, sub: `${(m.fund.netIrr * 100).toFixed(1)}% net IRR` },
    { icon: IconTrendingUp, label: 'Net IRR uplift', val: `+${Math.round(m.upliftIrrBps)} bps`, sub: 'co-invest vs fund' },
    { icon: IconArrowsSplit2, label: '$ uplift on ticket', val: fmtM(m.upliftM), sub: `+${m.upliftMoic.toFixed(2)}× on capital` },
  ];

  const Row = ({ label, fund, co, strong }: any) => (
    <tr className={strong ? s.subtotalRow : undefined}>
      <td className={strong ? undefined : s.tdLabel}>{label}</td>
      <td className={s.num}>{fund}</td>
      <td className={s.num} data-active>{co}</td>
    </tr>
  );

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tool · LP economics</span>
          <Title className={s.heroTitle}>Co-investment <span className={s.accent}>return modeler</span></Title>
          <Text className={s.heroDesc}>
            The same dollars, two ways in: through the main fund (full fees and carry) or as a co-investment (often
            fee-free, carry-free). See exactly how much net return the co-invest sleeve adds.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <div className={s.layout}>
            <aside className={s.controls}>
              <div className={s.groupTitle}>The deal</div>
              <label className={s.fieldLabel}>Investment amount</label>
              <NumberInput value={amount} onChange={(v) => setAmount(Number(v) || 0)} min={0} step={1} thousandSeparator="," prefix="$" suffix="M" hideControls size="sm" className={s.field} />
              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Gross MOIC</span><span className={s.sliderVal}>{moic.toFixed(1)}×</span></div>
              <Slider value={moic} onChange={setMoic} min={0.5} max={6} step={0.1} color="blue" size="sm" label={null} />
              <div className={s.sliderTop} style={{ marginTop: 14 }}><span className={s.fieldLabel} style={{ margin: 0 }}>Hold period</span><span className={s.sliderVal}>{years} yr</span></div>
              <Slider value={years} onChange={setYears} min={1} max={10} step={1} color="blue" size="sm" label={null} />

              <div className={s.groupTitle}>Main fund terms</div>
              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Mgmt fee</span><span className={s.sliderVal}>{fundFee.toFixed(2)}%</span></div>
              <Slider value={fundFee} onChange={setFundFee} min={0} max={3} step={0.05} color="blue" size="sm" label={null} />
              <div className={s.sliderTop} style={{ marginTop: 14 }}><span className={s.fieldLabel} style={{ margin: 0 }}>Carry</span><span className={s.sliderVal}>{fundCarry}%</span></div>
              <Slider value={fundCarry} onChange={setFundCarry} min={0} max={30} step={1} color="blue" size="sm" label={null} />
              <div className={s.sliderTop} style={{ marginTop: 14 }}><span className={s.fieldLabel} style={{ margin: 0 }}>Preferred return</span><span className={s.sliderVal}>{pref}%</span></div>
              <Slider value={pref} onChange={setPref} min={0} max={12} step={0.5} color="blue" size="sm" label={null} />

              <div className={s.groupTitle}>Co-investment terms</div>
              <div className={s.sliderTop}><span className={s.fieldLabel} style={{ margin: 0 }}>Co-invest fee</span><span className={s.sliderVal}>{coFee.toFixed(2)}%</span></div>
              <Slider value={coFee} onChange={setCoFee} min={0} max={2} step={0.05} color="blue" size="sm" label={null} />
              <div className={s.sliderTop} style={{ marginTop: 14 }}><span className={s.fieldLabel} style={{ margin: 0 }}>Co-invest carry</span><span className={s.sliderVal}>{coCarry}%</span></div>
              <Slider value={coCarry} onChange={setCoCarry} min={0} max={20} step={1} color="blue" size="sm" label={null} />

              <div className={s.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={s.ctaBtn}>Structure co-invest with us</Button>
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

              <div className={s.sectionLabel}>Net return — fund route vs co-investment</div>
              <div className={s.tableCard}>
                <table className={s.table}>
                  <thead><tr><th>Per ${amount}M invested</th><th className={s.num}>Via main fund</th><th className={s.num} data-active>Co-investment</th></tr></thead>
                  <tbody>
                    <Row label="Gross proceeds" fund={fmtM(m.proceeds)} co={fmtM(m.proceeds)} />
                    <Row label="Management fees" fund={`–${fmtM(m.fund.fees)}`} co={`–${fmtM(m.co.fees)}`} />
                    <Row label="Carried interest" fund={`–${fmtM(m.fund.carryAmt)}`} co={`–${fmtM(m.co.carryAmt)}`} />
                    <Row label="Net to investor" fund={fmtM(m.fund.net)} co={fmtM(m.co.net)} strong />
                    <Row label="Net MOIC" fund={`${m.fund.netMoic.toFixed(2)}×`} co={`${m.co.netMoic.toFixed(2)}×`} />
                    <Row label="Net IRR" fund={`${(m.fund.netIrr * 100).toFixed(1)}%`} co={`${(m.co.netIrr * 100).toFixed(1)}%`} />
                  </tbody>
                  <tfoot>
                    <tr className={s.totalRow}><td>Co-invest advantage</td><td className={s.num} colSpan={1} /><td className={s.num}>+{fmtM(m.upliftM)}</td></tr>
                  </tfoot>
                </table>
              </div>

              <div className={s.noteCard}>
                <IconArrowsSplit2 size={18} className={s.noteIcon} />
                <div>
                  <strong>The co-invest premium:</strong>
                  <span className={s.noteMuted}> on this deal, going direct saves {fmtM(m.fund.fees - m.co.fees)} in fees and {fmtM(m.fund.carryAmt - m.co.carryAmt)} in carry — worth +{Math.round(m.upliftIrrBps)} bps of net IRR. That fee-light economics is why LPs prize co-invest allocation rights.</span>
                </div>
              </div>

              <Text className={s.disclaimer}>
                Single-deal model with simple fee accrual over the hold and a full GP catch-up — co-invest terms, timing and
                deal selection differ in practice. Educational only, not advice. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

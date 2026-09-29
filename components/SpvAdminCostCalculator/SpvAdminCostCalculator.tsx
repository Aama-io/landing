import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, SegmentedControl, Switch, Button } from '@mantine/core';
import { IconArrowRight, IconReceipt2, IconStack2, IconRefresh, IconTrendingDown, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import {
  SPV_JURISDICTIONS, sumRanges, fmtUsd, fmtRangeK,
  type SpvJurisdictionKey, type Range,
} from '@/lib/spvCostData';
import classes from './SpvAdminCostCalculator.module.css';

const JUR_OPTIONS = (Object.keys(SPV_JURISDICTIONS) as SpvJurisdictionKey[]).map((k) => ({
  label: SPV_JURISDICTIONS[k].short,
  value: k,
}));

const scale = (r: Range, m: number): Range => [r[0] * m, r[1] * m];

// Shared-administration discount applied only to the fixed, per-entity admin
// overhead (registered agent, filings, bookkeeping) — not to per-investor KYC,
// director fees or audit, which scale with the underlying SPV regardless of
// how many others an administrator runs alongside it.
const scaleFactor = (n: number) => Math.max(0.68, 1 - (n - 1) * 0.012);

export function SpvAdminCostCalculator() {
  const [jurisdiction, setJurisdiction] = useState<SpvJurisdictionKey>('singapore');
  const [numSpvs, setNumSpvs] = useState(5);
  const [investorsPerSpv, setInvestorsPerSpv] = useState(6);
  const [needDirector, setNeedDirector] = useState(true);
  const [auditRequired, setAuditRequired] = useState(false);
  const [multiCurrency, setMultiCurrency] = useState(false);

  useEffect(() => {
    applyParams({
      j: (v) => (SPV_JURISDICTIONS[v as SpvJurisdictionKey] ? setJurisdiction(v as SpvJurisdictionKey) : null),
      n: (v) => setNumSpvs(Math.min(50, Math.max(1, parseInt(v, 10) || 5))),
      inv: (v) => setInvestorsPerSpv(Math.min(30, Math.max(1, parseInt(v, 10) || 6))),
      dr: (v) => setNeedDirector(v === '1'),
      au: (v) => setAuditRequired(v === '1'),
      fx: (v) => setMultiCurrency(v === '1'),
    });
  }, []);
  useEffect(() => {
    syncParams({
      j: jurisdiction, n: numSpvs, inv: investorsPerSpv,
      dr: needDirector ? 1 : 0, au: auditRequired ? 1 : 0, fx: multiCurrency ? 1 : 0,
    });
  }, [jurisdiction, numSpvs, investorsPerSpv, needDirector, auditRequired, multiCurrency]);

  const jur = SPV_JURISDICTIONS[jurisdiction];

  const model = useMemo(() => {
    const bookkeepingBase: Range = [1500, 3500];
    const bookkeeping = scale(bookkeepingBase, (1 + (investorsPerSpv - 1) * 0.04) * (multiCurrency ? 1.25 : 1));
    const kyc: Range = [40 * investorsPerSpv, 90 * investorsPerSpv];

    const buildRows = (factor: number) => {
      const rows: { k: string; r: Range }[] = [
        { k: 'Registered office / agent & corporate secretary', r: scale(jur.agentAnnual, factor) },
        { k: 'Annual filings & tax return preparation', r: scale(jur.filingAnnual, factor) },
        { k: 'Bookkeeping & investor reporting', r: bookkeeping },
        { k: 'KYC/AML refresh & FATCA/CRS reporting', r: kyc },
      ];
      if (needDirector && jur.directorAnnual[1] > 0) {rows.push({ k: jur.directorLabel, r: jur.directorAnnual });}
      if (auditRequired) {rows.push({ k: 'Financial statement audit', r: jur.auditAnnual });}
      return rows;
    };

    const factor = scaleFactor(numSpvs);
    const rows = buildRows(factor);
    const perSpvAnnual = sumRanges(rows.map((x) => x.r));

    const standaloneRows = buildRows(1);
    const standaloneAnnual = sumRanges(standaloneRows.map((x) => x.r));

    const portfolioAnnual: Range = [perSpvAnnual[0] * numSpvs, perSpvAnnual[1] * numSpvs];
    const monthly: Range = [portfolioAnnual[0] / 12, portfolioAnnual[1] / 12];
    const savingsPerSpv: Range = [
      Math.max(0, standaloneAnnual[0] - perSpvAnnual[0]),
      Math.max(0, standaloneAnnual[1] - perSpvAnnual[1]),
    ];
    const totalSavings: Range = [savingsPerSpv[0] * numSpvs, savingsPerSpv[1] * numSpvs];

    return { rows, perSpvAnnual, portfolioAnnual, monthly, savingsPerSpv, totalSavings };
  }, [jur, numSpvs, investorsPerSpv, needDirector, auditRequired, multiCurrency]);

  const kpis = [
    { icon: IconReceipt2, label: 'Annual cost / SPV', val: fmtRangeK(model.perSpvAnnual) },
    { icon: IconStack2, label: `Portfolio total × ${numSpvs}`, val: fmtRangeK(model.portfolioAnnual) },
    { icon: IconRefresh, label: 'Monthly run-rate', val: fmtRangeK(model.monthly) },
    { icon: IconTrendingDown, label: 'Shared-admin savings', val: numSpvs > 1 ? fmtRangeK(model.totalSavings) : '—' },
  ];

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · SPV administration</span>
          <Title className={classes.heroTitle}>
            SPV admin <span className={classes.accent}>cost calculator</span>
          </Title>
          <Text className={classes.heroDesc}>
            Estimate the annual cost of running a single-deal SPV — or a whole portfolio of them under one
            administrator — including registered agent, bookkeeping, KYC/CRS reporting and audit.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="xl">
          <div className={classes.layout}>
            <aside className={classes.controls}>
              <div className={classes.panelTitle}>Your SPV portfolio</div>

              <label className={classes.fieldLabel}>Jurisdiction</label>
              <SegmentedControl
                fullWidth size="xs" className={classes.segmented}
                value={jurisdiction} onChange={(v) => setJurisdiction(v as SpvJurisdictionKey)}
                data={JUR_OPTIONS}
              />

              <div className={classes.sliderTop} style={{ marginTop: 16 }}>
                <span className={classes.fieldLabel} style={{ margin: 0 }}>Number of SPVs administered</span>
                <span className={classes.sliderVal}>{numSpvs}</span>
              </div>
              <Slider value={numSpvs} onChange={setNumSpvs} min={1} max={50} step={1} color="blue" size="sm" label={null} />

              <div className={classes.sliderTop} style={{ marginTop: 18 }}>
                <span className={classes.fieldLabel} style={{ margin: 0 }}>Investors per SPV</span>
                <span className={classes.sliderVal}>{investorsPerSpv}</span>
              </div>
              <Slider value={investorsPerSpv} onChange={setInvestorsPerSpv} min={1} max={30} step={1} color="blue" size="sm" label={null} />

              <div className={classes.divider} />

              <Switch
                className={classes.switchRow}
                label={jur.directorLabel}
                checked={needDirector}
                onChange={(e) => setNeedDirector(e.currentTarget.checked)}
                color="blue" size="md"
              />
              <Switch
                className={classes.switchRow}
                label="Audited financial statements required"
                checked={auditRequired}
                onChange={(e) => setAuditRequired(e.currentTarget.checked)}
                color="blue" size="md"
              />
              <Switch
                className={classes.switchRow}
                label="Multi-currency / FX activity"
                checked={multiCurrency}
                onChange={(e) => setMultiCurrency(e.currentTarget.checked)}
                color="blue" size="md"
              />

              <div className={classes.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>
                Talk to our fund admin team
              </Button>
              <ShareLinkButton fullWidth className={classes.shareBtn} />
            </aside>

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

              <div className={classes.sectionLabel}>Annual cost breakdown (per SPV)</div>
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
                    {model.rows.map((row) => (
                      <tr key={row.k}>
                        <td>{row.k}</td>
                        <td className={classes.num}>{fmtUsd(row.r[0])}</td>
                        <td className={classes.num}>{fmtUsd(row.r[1])}</td>
                      </tr>
                    ))}
                    <tr className={classes.subtotalRow}>
                      <td>Per-SPV annual total</td>
                      <td className={classes.num}>{fmtUsd(model.perSpvAnnual[0])}</td>
                      <td className={classes.num}>{fmtUsd(model.perSpvAnnual[1])}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className={classes.totalRow}>
                      <td>Portfolio total × {numSpvs} SPV{numSpvs > 1 ? 's' : ''}</td>
                      <td className={classes.num}>{fmtUsd(model.portfolioAnnual[0])}</td>
                      <td className={classes.num}>{fmtUsd(model.portfolioAnnual[1])}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className={classes.noteCard}>
                <IconInfoCircle size={18} className={classes.noteIcon} />
                <div>
                  <strong>Registered agent, filing and bookkeeping overhead falls per SPV as one administrator runs more of them side by side.</strong>
                  <span className={classes.noteMuted}>
                    {' '}Director fees, per-investor KYC/CRS and audit scale with each SPV regardless of portfolio size, so they are held constant above.
                    Not included: the fund manager's own fees and the underlying deal's legal costs.
                  </span>
                </div>
              </div>

              <Text className={classes.disclaimer}>
                Indicative market ranges for planning only — not a quote, and not legal, tax or financial advice. Actual fees
                vary by administrator, jurisdiction and negotiation. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

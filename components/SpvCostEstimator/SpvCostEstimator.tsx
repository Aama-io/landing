import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, SegmentedControl, Switch, Button } from '@mantine/core';
import { IconArrowRight, IconReceipt2, IconRefresh, IconCalendarStats, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import {
  SPV_JURISDICTIONS, COMPLEXITY_MULTIPLIER, scaleRange, sumRanges, fmtUsd, fmtRangeK,
  type SpvJurisdictionKey, type Range,
} from '@/lib/spvCostData';
import classes from './SpvCostEstimator.module.css';

const JUR_OPTIONS = (Object.keys(SPV_JURISDICTIONS) as SpvJurisdictionKey[]).map((k) => ({
  label: SPV_JURISDICTIONS[k].short,
  value: k,
}));

export function SpvCostEstimator() {
  const [jurisdiction, setJurisdiction] = useState<SpvJurisdictionKey>('singapore');
  const [complexity, setComplexity] = useState<'simple' | 'moderate' | 'complex'>('moderate');
  const [needDirector, setNeedDirector] = useState(true);
  const [auditRequired, setAuditRequired] = useState(false);
  const [newBank, setNewBank] = useState(true);

  useEffect(() => {
    applyParams({
      j: (v) => (SPV_JURISDICTIONS[v as SpvJurisdictionKey] ? setJurisdiction(v as SpvJurisdictionKey) : null),
      cx: (v) => (COMPLEXITY_MULTIPLIER[v as keyof typeof COMPLEXITY_MULTIPLIER] ? setComplexity(v as 'simple' | 'moderate' | 'complex') : null),
      dr: (v) => setNeedDirector(v === '1'),
      au: (v) => setAuditRequired(v === '1'),
      nb: (v) => setNewBank(v === '1'),
    });
  }, []);
  useEffect(() => {
    syncParams({ j: jurisdiction, cx: complexity, dr: needDirector ? 1 : 0, au: auditRequired ? 1 : 0, nb: newBank ? 1 : 0 });
  }, [jurisdiction, complexity, needDirector, auditRequired, newBank]);

  const jur = SPV_JURISDICTIONS[jurisdiction];

  const model = useMemo(() => {
    const cx = COMPLEXITY_MULTIPLIER[complexity];
    const bankRow = newBank ? jur.bankSupportNew : jur.bankSupportExisting;

    const setupRows: { k: string; r: Range }[] = [
      { k: `${jur.label} incorporation & registered agent`, r: jur.incorpFee },
      { k: 'Legal drafting — subscription & constitutional docs', r: scaleRange(jur.legalBase, cx) },
      { k: newBank ? 'Bank account opening support (new relationship)' : 'Bank account opening support (existing relationship)', r: bankRow },
    ];

    const annualRows: { k: string; r: Range }[] = [
      { k: 'Registered office / agent & corporate secretary', r: jur.agentAnnual },
      { k: 'Annual filings & tax return preparation', r: jur.filingAnnual },
    ];
    if (needDirector && jur.directorAnnual[1] > 0) {
      annualRows.splice(1, 0, { k: jur.directorLabel, r: jur.directorAnnual });
    }
    if (auditRequired) {
      annualRows.push({ k: 'Financial statement audit', r: jur.auditAnnual });
    }

    const setupTotal = sumRanges(setupRows.map((x) => x.r));
    const annualTotal = sumRanges(annualRows.map((x) => x.r));
    const firstYear: Range = [setupTotal[0] + annualTotal[0], setupTotal[1] + annualTotal[1]];
    const monthly: Range = [annualTotal[0] / 12, annualTotal[1] / 12];

    return { setupRows, annualRows, setupTotal, annualTotal, firstYear, monthly };
  }, [jur, complexity, needDirector, auditRequired, newBank]);

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
          <span className={classes.pill}>Free tool · SPV formation</span>
          <Title className={classes.heroTitle}>
            SPV formation <span className={classes.accent}>cost estimator</span>
          </Title>
          <Text className={classes.heroDesc}>
            Estimate what it costs to set up and run a single-deal special purpose vehicle. Pick a jurisdiction,
            set your director and audit needs, and get an indicative one-time and annual cost breakdown.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="xl">
          <div className={classes.layout}>
            <aside className={classes.controls}>
              <div className={classes.panelTitle}>Your SPV</div>

              <label className={classes.fieldLabel}>Jurisdiction</label>
              <SegmentedControl
                fullWidth size="xs" className={classes.segmented}
                value={jurisdiction} onChange={(v) => setJurisdiction(v as SpvJurisdictionKey)}
                data={JUR_OPTIONS}
              />

              <label className={classes.fieldLabel} style={{ marginTop: 16 }}>Legal drafting complexity</label>
              <SegmentedControl
                fullWidth size="xs" className={classes.segmented}
                value={complexity} onChange={(v) => setComplexity(v as 'simple' | 'moderate' | 'complex')}
                data={[{ label: 'Simple', value: 'simple' }, { label: 'Moderate', value: 'moderate' }, { label: 'Complex', value: 'complex' }]}
              />

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
                label="Opening a new bank relationship"
                checked={newBank}
                onChange={(e) => setNewBank(e.currentTarget.checked)}
                color="blue" size="md"
              />

              <div className={classes.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>
                Get SPV formation support
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
                        <td className={classes.num}>{fmtUsd(row.r[0])}</td>
                        <td className={classes.num}>{fmtUsd(row.r[1])}</td>
                      </tr>
                    ))}
                    <tr className={classes.subtotalRow}>
                      <td>Setup subtotal</td>
                      <td className={classes.num}>{fmtUsd(model.setupTotal[0])}</td>
                      <td className={classes.num}>{fmtUsd(model.setupTotal[1])}</td>
                    </tr>

                    <tr className={classes.groupRow}><td colSpan={3}>Annual recurring</td></tr>
                    {model.annualRows.map((row) => (
                      <tr key={row.k}>
                        <td>{row.k}</td>
                        <td className={classes.num}>{fmtUsd(row.r[0])}</td>
                        <td className={classes.num}>{fmtUsd(row.r[1])}</td>
                      </tr>
                    ))}
                    <tr className={classes.subtotalRow}>
                      <td>Annual subtotal</td>
                      <td className={classes.num}>{fmtUsd(model.annualTotal[0])}</td>
                      <td className={classes.num}>{fmtUsd(model.annualTotal[1])}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className={classes.totalRow}>
                      <td>First-year all-in (setup + year 1)</td>
                      <td className={classes.num}>{fmtUsd(model.firstYear[0])}</td>
                      <td className={classes.num}>{fmtUsd(model.firstYear[1])}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className={classes.noteCard}>
                <IconInfoCircle size={18} className={classes.noteIcon} />
                <div>
                  <strong>{jur.taxNote}</strong>
                  <span className={classes.noteMuted}>
                    {' '}Not included: legal review of the underlying deal (SPA/term sheet), the target investment itself,
                    FX and transfer costs, and any placement or introduction fees.
                  </span>
                </div>
              </div>

              <Text className={classes.disclaimer}>
                Indicative market ranges for planning only — not a quote, and not legal, tax or financial advice. Actual fees
                vary by service provider, deal complexity and negotiation. Validate every figure with your counsel and
                registered agent. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, SegmentedControl, Switch, Checkbox, Button } from '@mantine/core';
import { IconArrowRight, IconListCheck, IconClockHour4, IconAlertTriangle, IconUsersGroup } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import { SPV_JURISDICTIONS, sumRanges, type SpvJurisdictionKey, type Range } from '@/lib/spvCostData';
import classes from './SpvFormationChecklist.module.css';

const JUR_OPTIONS = (Object.keys(SPV_JURISDICTIONS) as SpvJurisdictionKey[]).map((k) => ({
  label: SPV_JURISDICTIONS[k].short,
  value: k,
}));

type Step = { label: string; days: Range; parallel?: boolean; note?: string };

function buildSteps(jurisdiction: SpvJurisdictionKey, ubos: number, newBank: boolean, hasUSPersons: boolean): Step[] {
  const kycDays: Range = [Math.round(3 + (ubos - 1) * 0.4), Math.round(5 + (ubos - 1) * 0.6)];
  const bankNew: Record<SpvJurisdictionKey, Range> = {
    singapore: [10, 20], cayman: [15, 30], bvi: [15, 30], delaware: [3, 10],
  };
  const bankExisting: Record<SpvJurisdictionKey, Range> = {
    singapore: [2, 5], cayman: [3, 7], bvi: [3, 7], delaware: [1, 3],
  };
  const bankStep: Step = {
    label: newBank ? 'Open bank account (new relationship)' : 'Open bank account (existing relationship)',
    days: newBank ? bankNew[jurisdiction] : bankExisting[jurisdiction],
    note: newBank ? 'Usually the longest pole in the timeline — start KYC documents early.' : undefined,
  };
  const kycStep: Step = { label: 'Director / UBO KYC & AML documentation', days: kycDays };
  const subStep: Step = { label: 'Draft & execute subscription / shareholders agreement', days: [5, 10] };

  if (jurisdiction === 'singapore') {
    return [
      { label: 'Structuring decision & entity name check', days: [1, 2] },
      { label: 'Draft constitutional documents', days: [2, 3] },
      { label: 'ACRA incorporation filing', days: [1, 2] },
      { label: 'Appoint registered office & corporate secretary', days: [1, 2], parallel: true },
      kycStep,
      subStep,
      bankStep,
      { label: 'Post-incorporation GST / tax registration', days: [2, 5], parallel: true },
    ];
  }
  if (jurisdiction === 'delaware') {
    const einDays: Range = hasUSPersons ? [1, 3] : [15, 30];
    return [
      { label: 'Name check & structuring', days: [1, 1] },
      { label: 'File Certificate of Formation via registered agent', days: [1, 2] },
      { label: 'Draft LLC operating agreement', days: [2, 4] },
      { label: 'Obtain EIN from the IRS', days: einDays, note: hasUSPersons ? undefined : 'Foreign applicants without an SSN/ITIN must apply by fax or mail — budget extra time.' },
      kycStep,
      subStep,
      bankStep,
      { label: 'Federal beneficial ownership (CTA) report', days: [1, 2], parallel: true },
    ];
  }
  // cayman / bvi share a shape
  const jurLabel = SPV_JURISDICTIONS[jurisdiction].label;
  return [
    { label: 'Name reservation & structuring', days: [1, 2] },
    { label: `Draft memorandum & articles of association (${jurLabel})`, days: [2, 4] },
    { label: 'Registered agent incorporation filing', days: jurisdiction === 'bvi' ? [1, 2] : [1, 3] },
    kycStep,
    subStep,
    { label: 'Economic substance / beneficial ownership notification', days: [1, 2], parallel: true },
    bankStep,
  ];
}

export function SpvFormationChecklist() {
  const [jurisdiction, setJurisdiction] = useState<SpvJurisdictionKey>('singapore');
  const [ubos, setUbos] = useState(2);
  const [newBank, setNewBank] = useState(true);
  const [hasUSPersons, setHasUSPersons] = useState(false);
  const [done, setDone] = useState<Record<number, boolean>>({});

  useEffect(() => {
    applyParams({
      j: (v) => (SPV_JURISDICTIONS[v as SpvJurisdictionKey] ? setJurisdiction(v as SpvJurisdictionKey) : null),
      u: (v) => setUbos(Math.min(10, Math.max(1, parseInt(v, 10) || 2))),
      nb: (v) => setNewBank(v === '1'),
      us: (v) => setHasUSPersons(v === '1'),
    });
  }, []);
  useEffect(() => {
    syncParams({ j: jurisdiction, u: ubos, nb: newBank ? 1 : 0, us: hasUSPersons ? 1 : 0 });
  }, [jurisdiction, ubos, newBank, hasUSPersons]);

  const steps = useMemo(
    () => buildSteps(jurisdiction, ubos, newBank, hasUSPersons),
    [jurisdiction, ubos, newBank, hasUSPersons]
  );

  // Reset checkbox progress when the inputs change the step list itself.
  useEffect(() => { setDone({}); }, [jurisdiction, hasUSPersons]);

  const critical = steps.filter((s) => !s.parallel);
  const criticalRange = sumRanges(critical.map((s) => s.days));
  const parallelCount = steps.length - critical.length;
  const longest = steps.reduce((m, s) => (s.days[1] > m.days[1] ? s : m), steps[0]);
  const completedCount = Object.values(done).filter(Boolean).length;

  const kpis = [
    { icon: IconClockHour4, label: 'Time to funding-ready', val: `${criticalRange[0]}–${criticalRange[1]} days` },
    { icon: IconListCheck, label: 'Formation steps', val: `${steps.length} (${completedCount} done)` },
    { icon: IconAlertTriangle, label: 'Longest single step', val: longest.label },
    { icon: IconUsersGroup, label: 'Steps that run in parallel', val: String(parallelCount) },
  ];

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · SPV formation</span>
          <Title className={classes.heroTitle}>
            SPV formation <span className={classes.accent}>checklist & timeline</span>
          </Title>
          <Text className={classes.heroDesc}>
            The step-by-step path from a structuring decision to a funding-ready single-deal SPV — with realistic
            timing for each jurisdiction, so you know where the delays usually happen.
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

              <div className={classes.sliderTop} style={{ marginTop: 16 }}>
                <span className={classes.fieldLabel} style={{ margin: 0 }}>Directors / UBOs needing KYC</span>
                <span className={classes.sliderVal}>{ubos}</span>
              </div>
              <Slider value={ubos} onChange={setUbos} min={1} max={10} step={1} color="blue" size="sm" label={null} />

              <div className={classes.divider} />

              <Switch
                className={classes.switchRow}
                label="Opening a new bank relationship"
                checked={newBank}
                onChange={(e) => setNewBank(e.currentTarget.checked)}
                color="blue" size="md"
              />
              {jurisdiction === 'delaware' && (
                <Switch
                  className={classes.switchRow}
                  label="A US person can apply for the EIN"
                  checked={hasUSPersons}
                  onChange={(e) => setHasUSPersons(e.currentTarget.checked)}
                  color="blue" size="md"
                />
              )}

              <div className={classes.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>
                Get hands-on formation support
              </Button>
              <ShareLinkButton fullWidth className={classes.shareBtn} />
            </aside>

            <div className={classes.results}>
              <div className={classes.kpiGrid}>
                {kpis.map((k) => (
                  <div key={k.label} className={classes.kpiCard}>
                    <span className={classes.kpiIcon}><k.icon size={18} stroke={1.7} /></span>
                    <div className={classes.kpiLabel}>{k.label}</div>
                    <div className={classes.kpiValSm}>{k.val}</div>
                  </div>
                ))}
              </div>

              <div className={classes.sectionLabel}>{SPV_JURISDICTIONS[jurisdiction].label} — formation checklist</div>
              <div className={classes.stepList}>
                {steps.map((s, i) => (
                  <div key={s.label} className={classes.stepItem} data-done={done[i] || undefined}>
                    <Checkbox
                      checked={!!done[i]}
                      onChange={(e) => setDone((d) => ({ ...d, [i]: e.currentTarget.checked }))}
                      color="blue"
                      className={classes.stepCheckbox}
                    />
                    <div className={classes.stepBody}>
                      <div className={classes.stepLabel}>{s.label}</div>
                      {s.note && <div className={classes.stepNote}>{s.note}</div>}
                    </div>
                    <div className={classes.stepDays}>
                      {s.days[0] === s.days[1] ? `${s.days[0]} day${s.days[0] > 1 ? 's' : ''}` : `${s.days[0]}–${s.days[1]} days`}
                      {s.parallel && <span className={classes.parallelTag}>parallel</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className={classes.noteCard}>
                <IconAlertTriangle size={18} className={classes.noteIcon} />
                <div>
                  <strong>Steps tagged "parallel" don't sit on the critical path</strong>
                  <span className={classes.noteMuted}>
                    {' '}— they run alongside incorporation or bank onboarding, so the "time to funding-ready" total above
                    excludes them. Bank account opening is very often the actual bottleneck, not incorporation itself.
                  </span>
                </div>
              </div>

              <Text className={classes.disclaimer}>
                Indicative timelines for planning only, based on typical service-provider turnaround — actual timing
                depends on your registered agent, bank and the completeness of KYC documents. Not legal advice. Built by aama.io.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

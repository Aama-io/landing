import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Switch, Progress, Button } from '@mantine/core';
import { IconCheck, IconArrowRight, IconWorld } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import { SPV_JURISDICTIONS, type SpvJurisdictionKey } from '@/lib/spvCostData';
import classes from './SpvJurisdictionComparator.module.css';

const KEYS = Object.keys(SPV_JURISDICTIONS) as SpvJurisdictionKey[];

const DIMENSIONS: { label: string; v: Record<SpvJurisdictionKey, string> }[] = [
  {
    label: 'Formation speed',
    v: {
      singapore: '3–7 days — ACRA approval is often same-day',
      cayman: '3–5 days via a registered agent',
      bvi: '2–4 days — usually the fastest to incorporate',
      delaware: 'Same day to 2 days via a formation agent',
    },
  },
  {
    label: 'Typical setup cost',
    v: {
      singapore: 'Lowest of the four for a simple, single-asset SPV',
      cayman: 'Mid-to-high — government and agent fees add up',
      bvi: 'Mid — cheaper than Cayman for a similar structure',
      delaware: 'Lowest state fees, offset by US tax return costs',
    },
  },
  {
    label: 'Ongoing entity-level tax',
    v: {
      singapore: '17% corporate tax, often minimal on a pure holding SPV',
      cayman: 'Zero corporate, capital gains or withholding tax',
      bvi: 'Zero corporate, capital gains or withholding tax',
      delaware: 'Pass-through — no entity tax, but annual US information returns for foreign owners',
    },
  },
  {
    label: 'Investor familiarity',
    v: {
      singapore: 'Growing recognition, strongest with Asia-based LPs',
      cayman: 'The market-standard wrapper for institutional and tax-exempt LPs',
      bvi: 'Familiar as a lighter-weight Cayman alternative',
      delaware: 'Most familiar to US taxable investors used to K-1 reporting',
    },
  },
  {
    label: 'Ease of opening a bank account',
    v: {
      singapore: 'Straightforward with an established local bank presence',
      cayman: 'Slower — offshore KYC is heavier',
      bvi: 'Slower — similar offshore KYC burden to Cayman',
      delaware: 'Fast via fintech providers if directors/members are US-based',
    },
  },
  {
    label: 'Public disclosure',
    v: {
      singapore: 'Directors & shareholders appear on ACRA\'s public register',
      cayman: 'No public register of directors or shareholders',
      bvi: 'No public register of directors or shareholders',
      delaware: 'No public member list at the state level',
    },
  },
  {
    label: 'Statutory audit requirement',
    v: {
      singapore: 'Exempt if the entity meets the small-company criteria',
      cayman: 'Not required unless a regulator, lender or investor asks',
      bvi: 'Not required unless a regulator, lender or investor asks',
      delaware: 'Not required by the state, though lenders may still ask',
    },
  },
  {
    label: 'Substance / annual filings',
    v: {
      singapore: 'Standard ACRA annual return and tax filing only',
      cayman: 'Economic substance notification for relevant activities',
      bvi: 'Economic substance and beneficial ownership (BOSS) filing',
      delaware: 'Federal beneficial ownership report; no state-level substance test',
    },
  },
];

type Dir = SpvJurisdictionKey;

export function SpvJurisdictionComparator() {
  const [usInvestors, setUsInvestors] = useState(false);
  const [institutionalLPs, setInstitutionalLPs] = useState(false);
  const [asiaBanking, setAsiaBanking] = useState(false);
  const [privacyPriority, setPrivacyPriority] = useState(false);
  const [costSensitive, setCostSensitive] = useState(false);

  useEffect(() => {
    applyParams({
      us: (v) => setUsInvestors(v === '1'),
      il: (v) => setInstitutionalLPs(v === '1'),
      ab: (v) => setAsiaBanking(v === '1'),
      pp: (v) => setPrivacyPriority(v === '1'),
      cs: (v) => setCostSensitive(v === '1'),
    });
  }, []);
  useEffect(() => {
    syncParams({
      us: usInvestors ? 1 : 0, il: institutionalLPs ? 1 : 0, ab: asiaBanking ? 1 : 0,
      pp: privacyPriority ? 1 : 0, cs: costSensitive ? 1 : 0,
    });
  }, [usInvestors, institutionalLPs, asiaBanking, privacyPriority, costSensitive]);

  const { rec, confidence, reasons } = useMemo(() => {
    const scores: Record<Dir, number> = { singapore: 1.5, cayman: 1, bvi: 0.5, delaware: 0 };
    const pros: { dir: Dir; text: string }[] = [];

    if (usInvestors) {
      scores.delaware += 3.5; scores.singapore -= 0.5; scores.cayman -= 0.5;
      pros.push({ dir: 'delaware', text: 'Your investor base is mostly US taxable individuals — Delaware\'s pass-through LLC and familiar K-1 reporting fit best.' });
    } else {
      scores.delaware -= 1;
      pros.push({ dir: 'cayman', text: 'Without a US taxable investor base, Cayman avoids US entity-level exposure and K-1 complexity entirely.' });
    }

    if (institutionalLPs) {
      scores.cayman += 3; scores.bvi += 1; scores.delaware -= 0.5;
      pros.push({ dir: 'cayman', text: 'Institutional and tax-exempt LPs are most comfortable investing through a Cayman exempted company — the market-standard SPV wrapper for that base.' });
    }

    if (asiaBanking) {
      scores.singapore += 3; scores.cayman -= 1; scores.bvi -= 1; scores.delaware -= 1;
      pros.push({ dir: 'singapore', text: 'Needing a working Asia-based bank account quickly favours Singapore, where local banking relationships are easiest to establish.' });
    }

    if (privacyPriority) {
      scores.cayman += 2; scores.bvi += 2; scores.singapore -= 2;
      pros.push({ dir: 'cayman', text: 'Cayman keeps directors and shareholders off a public register.' });
      pros.push({ dir: 'bvi', text: 'BVI also keeps directors and shareholders off a public register, at a lower ongoing cost than Cayman.' });
    }

    if (costSensitive) {
      scores.bvi += 2; scores.delaware += 1; scores.cayman -= 1;
      pros.push({ dir: 'bvi', text: 'BVI is typically the cheapest offshore option to form and maintain, ahead of Cayman.' });
      pros.push({ dir: 'delaware', text: 'Delaware\'s state fees and franchise tax are the lowest of the four, though they come with US tax return costs.' });
    }

    const ranked = (Object.entries(scores) as [Dir, number][]).sort((a, b) => b[1] - a[1]);
    const rec = ranked[0][0];
    const gap = ranked[0][1] - ranked[1][1];
    const confidence = Math.min(95, 55 + Math.round(gap * 8));

    const fallback: Record<Dir, string> = {
      singapore: 'Singapore gives you a well-regulated, bank-friendly base with growing recognition among Asia-based LPs.',
      cayman: 'Cayman is the market-standard offshore SPV wrapper, with zero entity-level tax and no public register.',
      bvi: 'BVI offers the same tax-neutral, private structure as Cayman at a lower ongoing cost.',
      delaware: 'Delaware is the fastest and cheapest to form, and the most familiar structure for US taxable investors.',
    };
    const matching = pros.filter((p) => p.dir === rec).map((p) => p.text);
    const reasons = (matching.length ? matching : [fallback[rec]]).slice(0, 3);

    return { rec, confidence, reasons };
  }, [usInvestors, institutionalLPs, asiaBanking, privacyPriority, costSensitive]);

  const recJur = SPV_JURISDICTIONS[rec];

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · SPV formation</span>
          <Title className={classes.heroTitle}>
            SPV jurisdiction <span className={classes.accent}>comparator</span>
          </Title>
          <Text className={classes.heroDesc}>
            Singapore, Cayman, BVI or Delaware — answer a few questions about your investors and priorities, and see
            which jurisdiction fits your single-deal SPV, with a full side-by-side comparison.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="xl">
          <div className={classes.layout}>
            <aside className={classes.controls}>
              <div className={classes.panelTitle}>Your deal & investors</div>

              {[
                { label: 'Mostly US taxable investors', checked: usInvestors, set: setUsInvestors },
                { label: 'Institutional / US tax-exempt LPs (pensions, endowments)', checked: institutionalLPs, set: setInstitutionalLPs },
                { label: 'Need an Asia-based bank account quickly', checked: asiaBanking, set: setAsiaBanking },
                { label: 'Want to avoid a public register of directors', checked: privacyPriority, set: setPrivacyPriority },
                { label: 'Cost is the top priority', checked: costSensitive, set: setCostSensitive },
              ].map((row) => (
                <Switch
                  key={row.label}
                  className={classes.switchRow}
                  label={row.label}
                  checked={row.checked}
                  onChange={(e) => row.set(e.currentTarget.checked)}
                  color="blue"
                  size="md"
                />
              ))}

              <div className={classes.divider} />
              <Button component={Link} href="/contact" fullWidth rightSection={<IconArrowRight size={16} />} className={classes.ctaBtn}>
                Talk to our fund specialists
              </Button>
              <ShareLinkButton fullWidth className={classes.shareBtn} />
            </aside>

            <div className={classes.results}>
              <div className={classes.recCard} data-rec={rec}>
                <div className={classes.recHead}>
                  <span className={classes.recIcon}><IconWorld size={26} stroke={1.7} /></span>
                  <div>
                    <div className={classes.recEyebrow}>Recommended jurisdiction</div>
                    <div className={classes.recName}>{recJur.label}</div>
                  </div>
                </div>

                <div className={classes.confidence}>
                  <div className={classes.confidenceTop}>
                    <span>Fit confidence</span>
                    <strong>{confidence}%</strong>
                  </div>
                  <Progress value={confidence} color="blue" radius="xl" size="sm" />
                </div>

                <ul className={classes.reasons}>
                  {reasons.map((r) => (
                    <li key={r}>
                      <IconCheck size={17} className={classes.reasonIcon} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={classes.sectionLabel}>Side-by-side comparison</div>
              <div className={classes.tableCard}>
                <div className={classes.tableScrollX}>
                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th className={classes.thLabel} />
                        {KEYS.map((k) => (
                          <th key={k} data-active={rec === k || undefined}>{SPV_JURISDICTIONS[k].short}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {DIMENSIONS.map((d) => (
                        <tr key={d.label}>
                          <td className={classes.tdLabel}>{d.label}</td>
                          {KEYS.map((k) => (
                            <td key={k} data-active={rec === k || undefined}>{d.v[k]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Text className={classes.disclaimer}>
            Educational guidance, not legal or tax advice — confirm structuring with your fund counsel before forming
            an SPV in any jurisdiction. Built by aama.io.
          </Text>
        </Container>
      </section>
    </>
  );
}

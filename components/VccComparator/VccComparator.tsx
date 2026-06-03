import { useMemo, useState } from 'react';
import { Container, Title, Text, Slider, Switch, Progress, Button } from '@mantine/core';
import { IconCheck, IconArrowRight, IconBuildingBank, IconBuildingSkyscraper } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './VccComparator.module.css';

type Structure = 'umbrella' | 'standalone';

const dimensions: {
  label: string;
  umbrella: string;
  standalone: string;
}[] = [
  {
    label: 'Best suited for',
    umbrella: 'A range of strategies / multiple funds',
    standalone: 'A single strategy or one-off fund',
  },
  {
    label: 'Asset & liability ring-fencing',
    umbrella: 'Statutory segregation between sub-funds',
    standalone: 'Full separation — its own legal entity',
  },
  {
    label: 'Incremental cost per fund',
    umbrella: 'Lower — shared umbrella structure',
    standalone: 'Higher — a new entity each time',
  },
  {
    label: 'Time to launch a new fund',
    umbrella: 'Faster — add a sub-fund',
    standalone: 'Slower — incorporate a new VCC',
  },
  {
    label: 'Service providers',
    umbrella: 'Shared admin, auditor, custodian & board',
    standalone: 'Dedicated providers per fund',
  },
  {
    label: 'Governance',
    umbrella: 'One board across all sub-funds',
    standalone: 'Independent board per fund',
  },
  {
    label: 'Spin-off or sale of a fund',
    umbrella: 'More involved — sits within the umbrella',
    standalone: 'Cleaner — transfer the whole entity',
  },
  {
    label: 'Tax incentives (13O / 13U)',
    umbrella: 'Available',
    standalone: 'Available',
  },
];

export function VccComparator() {
  const [numFunds, setNumFunds] = useState(2);
  const [planMore, setPlanMore] = useState(true);
  const [costSensitive, setCostSensitive] = useState(true);
  const [sharedProviders, setSharedProviders] = useState(true);
  const [spinOff, setSpinOff] = useState(false);

  const { rec, confidence, reasons } = useMemo(() => {
    let score = 0; // positive → umbrella, negative → standalone
    const reasons: string[] = [];

    if (numFunds >= 2) {
      score += (numFunds - 1) * 1.5;
      reasons.push(`You're planning ${numFunds} strategies — an umbrella holds them as ring-fenced sub-funds under one structure.`);
    } else {
      score -= 3;
      reasons.push('A single fund rarely justifies an umbrella — a standalone VCC keeps it simple.');
    }
    if (planMore) {
      score += 2.5;
      reasons.push('Adding sub-funds later is fast and cheap under an umbrella.');
    }
    if (costSensitive) {
      score += 2;
      reasons.push('Shared service providers and one board lower the cost per fund.');
    }
    if (sharedProviders) {
      score += 1.5;
    } else {
      score -= 1.5;
      reasons.push('Wanting fully dedicated providers per fund points toward standalone VCCs.');
    }
    if (spinOff) {
      score -= 3;
      reasons.push('If you may spin off or sell a fund, a standalone entity transfers far more cleanly.');
    }

    const rec: Structure = score >= 0 ? 'umbrella' : 'standalone';
    const confidence = Math.min(95, 55 + Math.round(Math.abs(score) * 6));
    // Keep the 3 most relevant reasons that point the recommended way.
    return { rec, confidence, reasons: reasons.slice(0, 3) };
  }, [numFunds, planMore, costSensitive, sharedProviders, spinOff]);

  const recLabel = rec === 'umbrella' ? 'Umbrella VCC' : 'Standalone VCC';
  const recSub =
    rec === 'umbrella'
      ? 'One VCC with multiple ring-fenced sub-funds — efficient for a range of strategies.'
      : 'A single, self-contained VCC — simplest and cleanest for one strategy.';

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroGlow} />
        <Container size="lg" className={classes.heroInner}>
          <span className={classes.pill}>Free tool · Singapore VCC</span>
          <Title className={classes.heroTitle}>
            Umbrella vs standalone <span className={classes.accent}>VCC structure</span>
          </Title>
          <Text className={classes.heroDesc}>
            Answer a few questions about your fund plans and see which Variable Capital Company structure fits —
            an umbrella with sub-funds, or a standalone VCC — with a full side-by-side comparison.
          </Text>
        </Container>
      </section>

      <section className={classes.tool}>
        <Container size="lg">
          <div className={classes.layout}>
            {/* Questionnaire */}
            <aside className={classes.controls}>
              <div className={classes.panelTitle}>Your fund plans</div>

              <div className={classes.sliderRow}>
                <div className={classes.sliderTop}>
                  <span className={classes.fieldLabel}>Strategies / funds planned</span>
                  <span className={classes.sliderVal}>{numFunds}</span>
                </div>
                <Slider value={numFunds} onChange={setNumFunds} min={1} max={8} step={1} color="blue" size="sm" label={null} />
                <div className={classes.hint}>How many distinct funds do you expect to run?</div>
              </div>

              <div className={classes.divider} />

              {[
                { label: 'Plan to add more funds over time', checked: planMore, set: setPlanMore },
                { label: 'Cost-sensitive / lean budget', checked: costSensitive, set: setCostSensitive },
                { label: 'Happy to share service providers', checked: sharedProviders, set: setSharedProviders },
                { label: 'May spin off or sell a fund later', checked: spinOff, set: setSpinOff },
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
            </aside>

            {/* Results */}
            <div className={classes.results}>
              <div className={classes.recCard} data-rec={rec}>
                <div className={classes.recHead}>
                  <span className={classes.recIcon}>
                    {rec === 'umbrella' ? <IconBuildingBank size={26} stroke={1.7} /> : <IconBuildingSkyscraper size={26} stroke={1.7} />}
                  </span>
                  <div>
                    <div className={classes.recEyebrow}>Recommended structure</div>
                    <div className={classes.recName}>{recLabel}</div>
                  </div>
                </div>
                <Text className={classes.recSub}>{recSub}</Text>

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
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th className={classes.thLabel} />
                      <th data-active={rec === 'umbrella' || undefined}>Umbrella VCC<span className={classes.thSub}>sub-funds</span></th>
                      <th data-active={rec === 'standalone' || undefined}>Standalone VCC<span className={classes.thSub}>single fund</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dimensions.map((d) => (
                      <tr key={d.label}>
                        <td className={classes.tdLabel}>{d.label}</td>
                        <td data-active={rec === 'umbrella' || undefined}>{d.umbrella}</td>
                        <td data-active={rec === 'standalone' || undefined}>{d.standalone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={classes.whenGrid}>
                <div className={classes.whenCard}>
                  <span className={classes.whenIcon}><IconBuildingBank size={20} stroke={1.7} /></span>
                  <div className={classes.whenTitle}>Choose an umbrella VCC when…</div>
                  <ul className={classes.whenList}>
                    <li>You'll run multiple strategies or share classes</li>
                    <li>You want to launch new sub-funds quickly and cheaply</li>
                    <li>Shared providers and one board are acceptable</li>
                  </ul>
                </div>
                <div className={classes.whenCard}>
                  <span className={classes.whenIcon}><IconBuildingSkyscraper size={20} stroke={1.7} /></span>
                  <div className={classes.whenTitle}>Choose a standalone VCC when…</div>
                  <ul className={classes.whenList}>
                    <li>You have a single, well-defined strategy</li>
                    <li>You may sell, spin off, or fully isolate the fund</li>
                    <li>You want dedicated governance and providers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Text className={classes.disclaimer}>
            Educational guidance, not legal or tax advice — confirm structuring with your fund counsel and administrator.
            Both umbrella and standalone VCCs are eligible for the 13O / 13U tax incentive schemes. Built by aama.io.
          </Text>
        </Container>
      </section>
    </>
  );
}

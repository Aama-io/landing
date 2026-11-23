import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Text, Slider, Switch, Button, Group } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { ShareLinkButton } from '@/components/ui/ShareLinkButton';
import { applyParams, syncParams } from '@/lib/shareUrl';
import classes from './FundAdminPricingCalculator.module.css';

type Tier = {
  name: string;
  maxFunds: number | null;
  monthly: number;
  setup: string;
  portalIncluded: boolean;
};

const TIERS: Tier[] = [
  { name: 'Studio', maxFunds: 5, monthly: 1500, setup: 'USD 2,000 – 3,000', portalIncluded: false },
  { name: 'Practice', maxFunds: 20, monthly: 3500, setup: 'USD 4,000 – 6,000', portalIncluded: false },
  { name: 'Firm', maxFunds: null, monthly: 6500, setup: 'USD 8,000+', portalIncluded: true },
];

function pickTier(funds: number): Tier {
  if (funds <= 5) {return TIERS[0];}
  if (funds <= 20) {return TIERS[1];}
  return TIERS[2];
}

export function FundAdminPricingCalculator() {
  const [clientFunds, setClientFunds] = useState(8);
  const [wantPortal, setWantPortal] = useState(true);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    applyParams({
      n: (v) => setClientFunds(Math.min(100, Math.max(1, parseInt(v, 10) || 8))),
      portal: (v) => setWantPortal(v === '1'),
      annual: (v) => setAnnual(v === '1'),
    });
  }, []);

  useEffect(() => {
    syncParams({
      n: clientFunds,
      portal: wantPortal ? 1 : 0,
      annual: annual ? 1 : 0,
    });
  }, [clientFunds, wantPortal, annual]);

  const model = useMemo(() => {
    const tier = pickTier(clientFunds);
    const portalNeeded = wantPortal && !tier.portalIncluded;
    const monthly = tier.monthly;
    const yearly = monthly * 12;
    return { tier, portalNeeded, monthly, yearly };
  }, [clientFunds, wantPortal]);

  const display = annual ? model.yearly : model.monthly;
  const unit = annual ? 'per year' : 'per month';

  return (
    <section className={classes.wrapper}>
      <Container size="md">
        <div className={classes.head}>
          <span className={classes.eyebrow}>Fund administrators</span>
          <Title order={1} className={classes.title}>
            Administrator pricing calculator
          </Title>
          <Text className={classes.lede}>
            Estimate Studio, Practice or Firm from the number of client funds you run.
            Figures match the Fund Administrators tab on the{' '}
            <Link href="/pricing">pricing page</Link>. Portal add-on on Studio/Practice is
            indicative — confirm on a call.
          </Text>
        </div>

        <div className={classes.panel}>
          <div className={classes.controls}>
            <div>
              <Text fw={600} mb={4}>Client funds under administration</Text>
              <Text size="sm" c="dimmed" mb="sm">{clientFunds} funds</Text>
              <Slider
                min={1}
                max={50}
                value={clientFunds}
                onChange={setClientFunds}
                marks={[
                  { value: 5, label: '5' },
                  { value: 20, label: '20' },
                  { value: 50, label: '50' },
                ]}
              />
            </div>

            <Switch
              checked={wantPortal}
              onChange={(e) => setWantPortal(e.currentTarget.checked)}
              label="Include investor / LP portal"
              description={
                model.tier.portalIncluded
                  ? 'Included on Firm'
                  : 'Add-on on Studio & Practice — priced on request'
              }
            />

            <Switch
              checked={annual}
              onChange={(e) => setAnnual(e.currentTarget.checked)}
              label="Show annual total"
              description="12 × monthly (annual billing discounts may apply)"
            />
          </div>

          <div className={classes.result}>
            <Text size="sm" tt="uppercase" fw={700} c="dimmed" style={{ letterSpacing: '0.04em' }}>
              Recommended plan
            </Text>
            <Text className={classes.tierName}>{model.tier.name}</Text>
            <Text className={classes.price}>
              USD {display.toLocaleString('en-US')}
              <span> {unit}</span>
            </Text>
            <Text size="sm" c="dimmed" mt="sm">
              Setup fee: {model.tier.setup}
              {model.portalNeeded
                ? ' · Portal add-on priced on request'
                : wantPortal
                  ? ' · Portal included'
                  : ''}
            </Text>
            <Text size="sm" c="dimmed" mt={6}>
              Capacity: {model.tier.maxFunds ? `up to ${model.tier.maxFunds} client funds` : 'unlimited client funds'}
            </Text>

            <Group mt="xl" gap="sm">
              <Button component={Link} href="/contact" rightSection={<IconArrowRight size={16} />}>
                Talk to sales
              </Button>
              <Button component={Link} href="/solutions/fund-administrators" variant="default">
                Fund administrators solution
              </Button>
              <ShareLinkButton />
            </Group>
          </div>
        </div>

        <Text size="xs" c="dimmed" mt="lg" ta="center">
          Calculator for planning only. Binding quotes come from sales. Government fees and
          third-party costs are extra where applicable.
        </Text>
      </Container>
    </section>
  );
}

import { Container, Card, Text, Group, Button, List, ThemeIcon, SegmentedControl, Stack, Badge, Tooltip, Box, Tabs } from '@mantine/core';
import { IconCheck, IconInfoCircle, IconX, IconArrowRight, IconHeadset, IconBuildingSkyscraper, IconCoin, IconChartBar, IconChartPie, IconReportMoney, IconUsersGroup, IconBuildingBank } from '@tabler/icons-react';
import { useState } from 'react';
import Link from 'next/link';
import classes from './PricingTables.module.css';

interface Plan {
  title: string;
  price: { monthly: string; yearly: string };
  setupFee: string;
  subtitle: string;
  description: string;
  perks: { feature: string; included: boolean }[];
  buttonText: string;
  highlighted: boolean;
  mostPopular: boolean;
  unit?: string;        // overrides the "per month/year" label (e.g. per-SPV pricing)
  setupLabel?: string;  // overrides the "Setup fee:" label
}

// SPVs & syndicates price per deal, not by AUM. Benchmarked to undercut Auptimate
// (the Singapore/APAC comparable): Founder SPV flat USD 6,000; Syndicate SPV 3% of
// raise (USD 4,000–13,000). aama.io comes in below on both, with transparent caps.
const spvPlans: Plan[] = [
  {
    title: 'Single SPV',
    price: { monthly: 'USD 4,900', yearly: 'USD 4,900' },
    unit: 'flat · per SPV',
    setupFee: 'Scoped to your fund',
    setupLabel: 'Annual admin:',
    subtitle: '',
    description: 'A single-asset deal SPV — one lead, one round',
    perks: [
      { feature: 'SPV formation & ACRA registration', included: true },
      { feature: 'Legal docs & subscription agreements', included: true },
      { feature: 'Investor onboarding, e-KYC/AML & e-sign', included: true },
      { feature: 'Capital collection & bank reconciliation', included: true },
      { feature: 'Cap table & member register', included: true },
      { feature: 'Lead carry & deal-fee automation', included: true },
      { feature: 'Distributions, statements & tax docs', included: true },
      { feature: 'Compliance & audit trail', included: true },
      { feature: 'Custom branding', included: false },
      { feature: 'API access', included: false },
    ],
    buttonText: 'Start a Deal',
    highlighted: false,
    mostPopular: false,
  },
  {
    title: 'Syndicate SPV',
    price: { monthly: '2.5% of raise', yearly: '2.5% of raise' },
    unit: 'per deal · capped',
    setupFee: 'Min USD 3,500 · Max USD 10,000',
    setupLabel: 'Fee range:',
    subtitle: '',
    description: 'Raise from many investors, priced per deal',
    perks: [
      { feature: 'Everything in Single SPV', included: true },
      { feature: '2.5% deal fee, capped — no surprises', included: true },
      { feature: 'Unlimited investors per deal', included: true },
      { feature: 'Reusable investor base across deals', included: true },
      { feature: 'Automated capital calls & reminders', included: true },
      { feature: 'Multi-SPV dashboard', included: true },
      { feature: 'Priority support', included: true },
      { feature: 'Custom branding', included: true },
      { feature: 'API access', included: true },
    ],
    buttonText: 'Launch a Syndicate',
    highlighted: true,
    mostPopular: true,
  },
  {
    title: 'Platform',
    price: { monthly: 'Custom', yearly: 'Custom' },
    unit: 'volume pricing',
    setupFee: 'Volume rates',
    setupLabel: 'Pricing:',
    subtitle: '',
    description: 'For leads running multiple deals a year',
    perks: [
      { feature: 'Everything in Syndicate SPV', included: true },
      { feature: 'Volume formation & admin rates', included: true },
      { feature: 'White-label SPV platform', included: true },
      { feature: 'Dedicated account manager', included: true },
      { feature: 'Custom integrations', included: true },
      { feature: 'Advanced security & controls', included: true },
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
    mostPopular: false,
  },
];

// Fund administration firms buying the Fund Accounting engine to service multiple
// client funds — no investor portal (available as an add-on), white-label, priced
// by number of client funds. This is the Track-1 operator buyer.
const fundAdminPlans: Plan[] = [
  {
    title: 'Studio',
    price: { monthly: 'USD 1,500', yearly: 'USD 18,000' },
    setupFee: 'USD 2,000 – 3,000',
    subtitle: '',
    description: 'Boutique fund admins — up to 5 client funds',
    perks: [
      { feature: 'Fund accounting engine (double-entry GL)', included: true },
      { feature: 'IFRS 9 / SFRS(I) 9 accounting', included: true },
      { feature: 'Automated NAV (daily to quarterly)', included: true },
      { feature: 'Reconciliation & corporate actions', included: true },
      { feature: '12+ audit-ready reports', included: true },
      { feature: 'Multi-fund dashboard (up to 5 funds)', included: true },
      { feature: 'Standard support', included: true },
      { feature: 'White-label client reporting', included: false },
      { feature: 'Investor / LP portal (add-on)', included: false },
      { feature: 'API access', included: false },
    ],
    buttonText: 'Get Started',
    highlighted: false,
    mostPopular: false,
  },
  {
    title: 'Practice',
    price: { monthly: 'USD 3,500', yearly: 'USD 42,000' },
    setupFee: 'USD 4,000 – 6,000',
    subtitle: '',
    description: 'Growing admin firms — up to 20 client funds',
    perks: [
      { feature: 'Everything in Studio', included: true },
      { feature: 'Up to 20 client funds', included: true },
      { feature: 'White-label client reporting', included: true },
      { feature: 'Multi-currency & waterfall automation', included: true },
      { feature: 'Per-client role-based access', included: true },
      { feature: 'Priority support', included: true },
      { feature: 'API access', included: true },
      { feature: 'Investor / LP portal (add-on)', included: false },
    ],
    buttonText: 'Start 30-Day Trial',
    highlighted: true,
    mostPopular: true,
  },
  {
    title: 'Firm',
    price: { monthly: 'USD 6,500', yearly: 'USD 78,000' },
    setupFee: 'USD 8,000+',
    subtitle: '',
    description: 'Established fund admins — unlimited funds',
    perks: [
      { feature: 'Everything in Practice', included: true },
      { feature: 'Unlimited client funds', included: true },
      { feature: 'Full white-label platform', included: true },
      { feature: 'Investor / LP portal included', included: true },
      { feature: 'Dedicated account manager', included: true },
      { feature: 'Custom integrations & SSO', included: true },
      { feature: 'Advanced security & controls', included: true },
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
    mostPopular: false,
  },
];

const hedgeFundPlans = [
  {
    title: 'Boutique',
    price: { monthly: 'USD 1,250', yearly: 'USD 15,000' },
    setupFee: 'USD 2,500 – 3,500',
    subtitle: 'per month',
    description: 'Small & boutique fund managers (AUM < $50M)',
    perks: [
      { feature: 'Complete fund administration software', included: true },
      { feature: 'Investor onboarding & KYC', included: true },
      { feature: 'Fund discovery portal', included: true },
      { feature: 'Subscription processing', included: true },
      { feature: 'Basic accounting tools', included: true },
      { feature: 'Portfolio monitoring', included: true },
      { feature: 'Redemption processing', included: true },
      { feature: 'Compliance reporting', included: true },
      { feature: 'Standard support', included: true },
      { feature: 'Maintenance included', included: true },
      { feature: 'Custom branding', included: false },
      { feature: 'API access', included: false },
    ],
    buttonText: 'Get Started',
    highlighted: false,
    mostPopular: false,
  },
  {
    title: 'Growth',
    price: { monthly: 'USD 2,500', yearly: 'USD 30,000' },
    setupFee: 'USD 4,000 – 6,000',
    subtitle: 'per month',
    description: 'Mid-size funds (AUM $50M – $200M)',
    perks: [
      { feature: 'All Boutique features', included: true },
      { feature: 'Enhanced risk profiling', included: true },
      { feature: 'Advanced fund planning tools', included: true },
      { feature: 'Investment administration portal', included: true },
      { feature: 'Advanced accounting features', included: true },
      { feature: 'Enhanced portfolio analytics', included: true },
      { feature: 'Automated redemption workflow', included: true },
      { feature: 'Comprehensive audit trail', included: true },
      { feature: 'Priority support', included: true },
      { feature: 'Custom branding', included: true },
      { feature: 'API access', included: true },
      { feature: 'Custom integrations', included: false },
    ],
    buttonText: 'Start 30-Day Trial',
    highlighted: true,
    mostPopular: true,
  },
  {
    title: 'Pro',
    price: { monthly: 'USD 4,500', yearly: 'USD 54,000' },
    setupFee: 'USD 7,500 – 12,500',
    subtitle: 'per month',
    description: 'Larger firms (AUM > $200M)',
    perks: [
      { feature: 'All Growth features', included: true },
      { feature: 'VIP onboarding & migration', included: true },
      { feature: 'Advanced investor segmentation', included: true },
      { feature: 'Premium investment administration suite', included: true },
      { feature: 'Advanced fund administration', included: true },
      { feature: 'Custom portfolio monitoring dashboards', included: true },
      { feature: 'Enhanced automation capabilities', included: true },
      { feature: 'Regulatory compliance automation', included: true },
      { feature: 'Dedicated account manager', included: true },
      { feature: 'Custom integrations', included: true },
      { feature: 'White-label solution', included: true },
      { feature: 'Advanced security features', included: true },
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
    mostPopular: false,
  },
];

const privateEquityPlans = [
  {
    title: 'Boutique',
    price: { monthly: 'USD 1,350', yearly: 'USD 16,200' },
    setupFee: 'USD 2,500 – 3,500',
    subtitle: 'per month',
    description: 'Emerging PE firms (< 5 funds)',
    perks: [
      { feature: 'Deal flow administration', included: true },
      { feature: 'Capital call processing', included: true },
      { feature: 'Investor relations portal', included: true },
      { feature: 'Portfolio company tracking', included: true },
      { feature: 'Basic financial reporting', included: true },
      { feature: 'Document administration', included: true },
      { feature: 'Distribution processing', included: true },
      { feature: 'Compliance tools', included: true },
      { feature: 'Standard support', included: true },
      { feature: 'Maintenance included', included: true },
      { feature: 'Custom branding', included: false },
      { feature: 'API access', included: false },
    ],
    buttonText: 'Get Started',
    highlighted: false,
    mostPopular: false,
  },
  {
    title: 'Growth',
    price: { monthly: 'USD 2,750', yearly: 'USD 33,000' },
    setupFee: 'USD 5,000 – 7,500',
    subtitle: 'per month',
    description: 'Established PE firms (5-15 funds)',
    perks: [
      { feature: 'All Boutique features', included: true },
      { feature: 'Advanced deal analytics', included: true },
      { feature: 'Waterfall calculations', included: true },
      { feature: 'Carry planning tools', included: true },
      { feature: 'Advanced portfolio monitoring', included: true },
      { feature: 'Enhanced financial reporting', included: true },
      { feature: 'Automated capital calls', included: true },
      { feature: 'Comprehensive audit trail', included: true },
      { feature: 'Priority support', included: true },
      { feature: 'Custom branding', included: true },
      { feature: 'API access', included: true },
      { feature: 'Custom integrations', included: false },
    ],
    buttonText: 'Start 30-Day Trial',
    highlighted: true,
    mostPopular: true,
  },
  {
    title: 'Pro',
    price: { monthly: 'USD 5,000', yearly: 'USD 60,000' },
    setupFee: 'USD 10,000+',
    subtitle: 'per month',
    description: 'Large PE firms (> 15 funds)',
    perks: [
      { feature: 'All Growth features', included: true },
      { feature: 'VIP onboarding & migration', included: true },
      { feature: 'Multi-fund administration', included: true },
      { feature: 'Advanced valuation tools', included: true },
      { feature: 'Complex waterfall structures', included: true },
      { feature: 'Custom portfolio dashboards', included: true },
      { feature: 'Enhanced automation capabilities', included: true },
      { feature: 'Regulatory compliance automation', included: true },
      { feature: 'Dedicated account manager', included: true },
      { feature: 'Custom integrations', included: true },
      { feature: 'White-label solution', included: true },
      { feature: 'Advanced security features', included: true },
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
    mostPopular: false,
  },
];

const privateCreditPlans = [
  {
    title: 'Boutique',
    price: { monthly: 'USD 1,350', yearly: 'USD 16,200' },
    setupFee: 'USD 2,500 – 3,500',
    subtitle: 'per month',
    description: 'Emerging credit funds (< 5 funds)',
    perks: [
      { feature: 'Loan & facility administration', included: true },
      { feature: 'Amortised cost & interest accruals', included: true },
      { feature: 'Capital call processing', included: true },
      { feature: 'Income & principal distributions', included: true },
      { feature: 'Investor relations portal', included: true },
      { feature: 'Basic financial reporting', included: true },
      { feature: 'Document administration', included: true },
      { feature: 'Compliance tools', included: true },
      { feature: 'Standard support', included: true },
      { feature: 'Maintenance included', included: true },
      { feature: 'Custom branding', included: false },
      { feature: 'API access', included: false },
    ],
    buttonText: 'Get Started',
    highlighted: false,
    mostPopular: false,
  },
  {
    title: 'Growth',
    price: { monthly: 'USD 2,750', yearly: 'USD 33,000' },
    setupFee: 'USD 5,000 – 7,500',
    subtitle: 'per month',
    description: 'Established credit funds (5-15 funds)',
    perks: [
      { feature: 'All Boutique features', included: true },
      { feature: 'IFRS 9 / SFRS(I) 9 accounting', included: true },
      { feature: 'Expected credit loss (ECL) staging', included: true },
      { feature: 'PIK & cash interest handling', included: true },
      { feature: 'Revolver & delayed-draw facilities', included: true },
      { feature: 'Advanced portfolio monitoring', included: true },
      { feature: 'Automated capital calls', included: true },
      { feature: 'Comprehensive audit trail', included: true },
      { feature: 'Priority support', included: true },
      { feature: 'Custom branding', included: true },
      { feature: 'API access', included: true },
      { feature: 'Custom integrations', included: false },
    ],
    buttonText: 'Start 30-Day Trial',
    highlighted: true,
    mostPopular: true,
  },
  {
    title: 'Pro',
    price: { monthly: 'USD 5,000', yearly: 'USD 60,000' },
    setupFee: 'USD 10,000+',
    subtitle: 'per month',
    description: 'Large credit platforms (> 15 funds)',
    perks: [
      { feature: 'All Growth features', included: true },
      { feature: 'VIP onboarding & migration', included: true },
      { feature: 'Multi-fund administration', included: true },
      { feature: 'Complex facility structures', included: true },
      { feature: 'Covenant tracking & watchlist', included: true },
      { feature: 'Custom portfolio dashboards', included: true },
      { feature: 'Enhanced automation capabilities', included: true },
      { feature: 'Regulatory compliance automation', included: true },
      { feature: 'Dedicated account manager', included: true },
      { feature: 'Custom integrations', included: true },
      { feature: 'White-label solution', included: true },
      { feature: 'Advanced security features', included: true },
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
    mostPopular: false,
  },
];

const familyOfficePlans = [
  {
    title: 'Boutique',
    price: { monthly: 'USD 625', yearly: 'USD 7,500' },
    setupFee: 'USD 1,500 – 2,500',
    subtitle: 'per month',
    description: 'Single family office (AUM ≤ $50M)',
    perks: [
      { feature: 'Consolidated portfolio view', included: true },
      { feature: 'Investment tracking', included: true },
      { feature: 'Basic reporting', included: true },
      { feature: 'Document administration', included: true },
      { feature: 'Basic accounting tools', included: true },
      { feature: 'Performance monitoring', included: true },
      { feature: 'Tax document organization', included: true },
      { feature: 'Compliance tools', included: true },
      { feature: 'Standard support', included: true },
      { feature: 'Maintenance included', included: true },
      { feature: 'Custom branding', included: false },
      { feature: 'API access', included: false },
    ],
    buttonText: 'Get Started',
    highlighted: false,
    mostPopular: false,
  },
  {
    title: 'Growth',
    price: { monthly: 'USD 1,250', yearly: 'USD 15,000' },
    setupFee: 'USD 3,000 – 4,000',
    subtitle: 'per month',
    description: 'Single family office (AUM $50M – $200M)',
    perks: [
      { feature: 'All Boutique features', included: true },
      { feature: 'Multi-entity administration', included: true },
      { feature: 'Advanced reporting', included: true },
      { feature: 'Estate planning tools', included: true },
      { feature: 'Advanced accounting features', included: true },
      { feature: 'Enhanced portfolio analytics', included: true },
      { feature: 'Tax planning tools', included: true },
      { feature: 'Comprehensive audit trail', included: true },
      { feature: 'Priority support', included: true },
      { feature: 'Custom branding', included: true },
      { feature: 'API access', included: true },
      { feature: 'Custom integrations', included: false },
    ],
    buttonText: 'Start 30-Day Trial',
    highlighted: true,
    mostPopular: true,
  },
  {
    title: 'Pro',
    price: { monthly: 'USD 3,350', yearly: 'USD 40,200' },
    setupFee: 'USD 5,000+',
    subtitle: 'per month',
    description: 'Multi-family office or Large SFO (AUM > $200M)',
    perks: [
      { feature: 'All Growth features', included: true },
      { feature: 'VIP onboarding & migration', included: true },
      { feature: 'Complex entity structures', included: true },
      { feature: 'Philanthropic administration', included: true },
      { feature: 'Advanced wealth planning', included: true },
      { feature: 'Custom portfolio dashboards', included: true },
      { feature: 'Enhanced automation capabilities', included: true },
      { feature: 'Regulatory compliance automation', included: true },
      { feature: 'Dedicated account manager', included: true },
      { feature: 'Custom integrations', included: true },
      { feature: 'White-label solution', included: true },
      { feature: 'Advanced security features', included: true },
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
    mostPopular: false,
  },
];

const mutualFundPlans = [
  {
    title: 'Boutique',
    price: { monthly: 'USD 1,500', yearly: 'USD 18,000' },
    setupFee: 'USD 4,000 – 6,000',
    subtitle: 'per month',
    description: 'Small AMCs (3-6 schemes, <$100M AUM)',
    perks: [
      { feature: 'Fund administration software', included: true },
      { feature: 'Investor onboarding & KYC', included: true },
      { feature: 'Daily NAV calculation tools', included: true },
      { feature: 'Subscription processing', included: true },
      { feature: 'Basic accounting tools', included: true },
      { feature: 'Performance reporting', included: true },
      { feature: 'Redemption processing', included: true },
      { feature: 'Regulatory compliance', included: true },
      { feature: 'Standard support', included: true },
      { feature: 'Maintenance included', included: true },
      { feature: 'Custom branding', included: false },
      { feature: 'API access', included: false },
    ],
    buttonText: 'Get Started',
    highlighted: false,
    mostPopular: false,
  },
  {
    title: 'Growth',
    price: { monthly: 'USD 2,900', yearly: 'USD 34,800' },
    setupFee: 'USD 6,000 – 9,000',
    subtitle: 'per month',
    description: 'Mid AMCs (6-10 schemes)',
    perks: [
      { feature: 'All Boutique features', included: true },
      { feature: 'Advanced fund analytics', included: true },
      { feature: 'Dividend processing', included: true },
      { feature: 'Investment administration portal', included: true },
      { feature: 'Advanced accounting features', included: true },
      { feature: 'Enhanced performance reporting', included: true },
      { feature: 'Automated redemption workflow', included: true },
      { feature: 'Comprehensive audit trail', included: true },
      { feature: 'Priority support with extended hours', included: true },
      { feature: 'Custom branding', included: true },
      { feature: 'API access', included: true },
      { feature: 'Custom integrations', included: false },
    ],
    buttonText: 'Start 30-Day Trial',
    highlighted: true,
    mostPopular: true,
  },
  {
    title: 'Pro',
    price: { monthly: 'USD 5,000', yearly: 'USD 60,000' },
    setupFee: 'USD 10,000+',
    subtitle: 'per month',
    description: 'Large AMCs (>10 schemes, >$500M AUM)',
    perks: [
      { feature: 'All Growth features', included: true },
      { feature: 'VIP onboarding & migration', included: true },
      { feature: 'Multi-fund administration', included: true },
      { feature: 'Advanced NAV calculation', included: true },
      { feature: 'Complex fee structures', included: true },
      { feature: 'Custom reporting dashboards', included: true },
      { feature: 'Enhanced automation capabilities', included: true },
      { feature: 'Regulatory compliance automation', included: true },
      { feature: 'Dedicated account manager', included: true },
      { feature: 'Custom integrations', included: true },
      { feature: 'White-label solution', included: true },
      { feature: 'Advanced security features', included: true },
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
    mostPopular: false,
  },
];

export function PricingTables() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [fundType, setFundType] = useState('spv');

  const getPlans = (): Plan[] => {
    switch (fundType) {
      case 'spv':
        return spvPlans;
      case 'admin':
        return fundAdminPlans;
      case 'family':
        return familyOfficePlans;
      case 'private':
        return privateEquityPlans;
      case 'credit':
        return privateCreditPlans;
      case 'hedge':
        return hedgeFundPlans;
      case 'mutual':
        return mutualFundPlans;
      default:
        return spvPlans;
    }
  };

  const plans = getPlans();

  return (
    <div className={classes.wrapper}>
      <Container size="lg" py="xl">
        <Stack align="center" gap="lg" className={classes.header}>
          <Text className={classes.subtitle}>SaaS Subscription Model</Text>
          <Text className={classes.sectionTitle}>Choose the plan that fits your fund</Text>

          <Tabs
            value={fundType}
            onChange={(value) => setFundType(value || 'hedge')}
            radius="md"
            mt="md"
            className={classes.fundTypeTabs}
          >
            <Tabs.List grow>
              <Tabs.Tab value="spv" leftSection={<IconUsersGroup size={16} />}>
                SPVs & Syndicates
              </Tabs.Tab>
              <Tabs.Tab value="admin" leftSection={<IconBuildingBank size={16} />}>
                Fund Administrators
              </Tabs.Tab>
              <Tabs.Tab value="family" leftSection={<IconCoin size={16} />}>
                Family Offices
              </Tabs.Tab>
              <Tabs.Tab value="private" leftSection={<IconBuildingSkyscraper size={16} />}>
                Private Equity / VC
              </Tabs.Tab>
              <Tabs.Tab value="credit" leftSection={<IconReportMoney size={16} />}>
                Private Credit
              </Tabs.Tab>
              <Tabs.Tab value="hedge" leftSection={<IconChartBar size={16} />}>
                Hedge Funds
              </Tabs.Tab>
              <Tabs.Tab value="mutual" leftSection={<IconChartPie size={16} />}>
                Mutual Funds
              </Tabs.Tab>

            </Tabs.List>
          </Tabs>

          {fundType !== 'spv' && (
            <Group justify="center" mt="md">
              <SegmentedControl
                value={billingPeriod}
                onChange={setBillingPeriod}
                data={[
                  { label: 'Monthly Billing', value: 'monthly' },
                  { label: 'Annual Billing • Save', value: 'yearly' },
                ]}
                size="md"
                className={classes.segmentedControl}
              />
            </Group>
          )}
        </Stack>

        <div className={classes.grid}>
          {plans.map((plan) => (
            <Card
              key={plan.title}
              className={classes.card}
              data-highlighted={plan.highlighted || undefined}
              padding="xl"
              radius="md"
              withBorder={!plan.highlighted}
            >
              {plan.mostPopular && (
                <Badge className={classes.mostPopularBadge}>Most Popular</Badge>
              )}

              <Text className={classes.cardTitle}>
                {plan.title}
              </Text>

              <Text className={classes.description}>
                {plan.description}
              </Text>

              <Box className={classes.pricing}>
                <Text className={classes.price}>
                  {plan.price[billingPeriod as keyof typeof plan.price]}
                </Text>

                <Text size="sm" c="dimmed" className={classes.subtitle}>
                  {plan.unit ?? (billingPeriod === 'monthly' ? 'per month' : 'per year')}
                </Text>

                <Group gap="xs" className={classes.setupFee}>
                  <Text size="sm" fw={500}>{plan.setupLabel ?? 'Setup fee:'}</Text>
                  <Text size="sm">{plan.setupFee}</Text>
                  <Tooltip label="One-time fee for software setup and implementation">
                    <ThemeIcon radius="xl" size="xs" variant="light">
                      <IconInfoCircle size={12} />
                    </ThemeIcon>
                  </Tooltip>
                </Group>
              </Box>

              <Button
                component={Link}
                href="/contact"
                fullWidth
                size="lg"
                variant={plan.highlighted ? 'filled' : 'outline'}
                rightSection={<IconArrowRight size={18} />}
                className={classes.button}
              >
                {plan.buttonText}
              </Button>

              <Text fw={500} mt={30} mb="xs" size="sm" className={classes.featuresTitle}>
                What's included:
              </Text>

              <List
                spacing="sm"
                size="sm"
                icon={null}
                className={classes.featuresList}
              >
                {plan.perks.map((perk, index) => (
                  <List.Item
                    key={index}
                    icon={
                      perk.included ? (
                        <ThemeIcon size={20} radius="xl" color="teal" className={classes.includedIcon}>
                          <IconCheck size={12} stroke={3} />
                        </ThemeIcon>
                      ) : (
                        <ThemeIcon size={20} radius="xl" color="gray" variant="light" className={classes.notIncludedIcon}>
                          <IconX size={12} stroke={3} />
                        </ThemeIcon>
                      )
                    }
                    className={perk.included ? classes.included : classes.notIncluded}
                  >
                    {perk.feature}
                  </List.Item>
                ))}
              </List>
            </Card>
          ))}
        </div>

        <Card className={classes.additionalCard} withBorder mt={60}>
          <Group align="center" wrap="nowrap" gap={40}>
            <div className={classes.additionalContent}>
              <Group align="center" gap="md">
                <ThemeIcon size={52} radius="md" className={classes.supportIcon}>
                  <IconHeadset size={30} stroke={1.5} />
                </ThemeIcon>
                <div>
                  <Text fw={700} fz="xl" className={classes.additionalTitle}>Need advanced integrations or a tailored setup?</Text>
                  <Text className={classes.additionalDescription}>
                    We can configure the platform and connect it to the systems your fund already runs on.
                  </Text>
                </div>
              </Group>
            </div>
            <Button
              component={Link}
              href="https://cal.com/aamaio/30min"
              target="_blank"
              variant="outline"
              size="lg"
              className={classes.additionalButton}
              rightSection={<IconArrowRight size={18} />}
            >
              Schedule 30-Min Meeting
            </Button>
          </Group>
        </Card>
      </Container>
    </div>
  );
} 
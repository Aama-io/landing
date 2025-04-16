import { Container, Card, Text, Group, Button, List, ThemeIcon, SegmentedControl, Stack, Badge, Tooltip, Box } from '@mantine/core';
import { IconCheck, IconInfoCircle, IconX, IconArrowRight, IconHeadset, IconDiscount2 } from '@tabler/icons-react';
import { useState } from 'react';
import Link from 'next/link';
import classes from './PricingTables.module.css';

const plans = [
  {
    title: 'Starter',
    price: { monthly: 'SGD 1,250', yearly: 'SGD 15,000' },
    setupFee: 'SGD 3,000 – 5,000',
    subtitle: 'per month',
    description: 'Small & boutique fund managers (AUM < $50M)',
    perks: [
      { feature: 'Complete fund management platform', included: true },
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
    price: { monthly: 'SGD 2,500', yearly: 'SGD 30,000' },
    setupFee: 'SGD 5,000 – 10,000',
    subtitle: 'per month',
    description: 'Mid-size funds (AUM $50M – $150M)',
    perks: [
      { feature: 'All Starter features', included: true },
      { feature: 'Enhanced risk profiling', included: true },
      { feature: 'Advanced fund planning tools', included: true },
      { feature: 'Investment management portal', included: true },
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
    price: { monthly: 'SGD 4,000', yearly: 'SGD 48,000' },
    setupFee: 'SGD 10,000 – 15,000',
    subtitle: 'per month',
    description: 'Larger firms (AUM $150M – $500M)',
    perks: [
      { feature: 'All Growth features', included: true },
      { feature: 'VIP onboarding & migration', included: true },
      { feature: 'Advanced investor segmentation', included: true },
      { feature: 'Premium investment management suite', included: true },
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

export function PricingTables() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  return (
    <div className={classes.wrapper}>
      <Container size="lg" py="xl">
        <Stack align="center" gap="lg" className={classes.header}>
          <Text className={classes.subtitle}>SaaS Subscription Model</Text>
          <Text className={classes.sectionTitle}>Choose the plan that fits your fund</Text>
          
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
          
          <Group className={classes.comingSoonBanner} mt="sm">
            <ThemeIcon size="md" radius="xl" color="green" variant="light">
              <IconDiscount2 size={16} />
            </ThemeIcon>
            <Text size="sm" c="dimmed">
              First 3 clients receive a 30% lifetime discount or first-year discount. Contact us to learn more.
            </Text>
          </Group>
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
                  {billingPeriod === 'monthly' ? 'per month' : 'per year'}
                </Text>
                
                <Group gap="xs" className={classes.setupFee}>
                  <Text size="sm" fw={500}>Setup fee:</Text>
                  <Text size="sm">{plan.setupFee}</Text>
                  <Tooltip label="One-time fee for platform setup and implementation">
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
                  <Text fw={700} fz="xl" className={classes.additionalTitle}>Need custom features or integrations?</Text>
                  <Text className={classes.additionalDescription}>
                    We can provide additional custom features or integrations to meet your specific requirements
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
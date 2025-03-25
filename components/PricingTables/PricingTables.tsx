import { Container, Card, Text, Group, Button, List, ThemeIcon, SegmentedControl, Stack, Badge, Tooltip, Box } from '@mantine/core';
import { IconCheck, IconInfoCircle, IconX, IconArrowRight, IconHeadset, IconClock } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './PricingTables.module.css';

const plans = [
  {
    title: 'Professional',
    price: { monthly: 'SGD 0.5%', yearly: 'SGD 0.4%' },
    subtitle: 'of AUM per year',
    description: 'For smaller asset managers',
    perks: [
      { feature: 'Up to $1M AUM', included: true },
      { feature: 'Fund management dashboard', included: true },
      { feature: 'Basic accounting tools', included: true },
      { feature: 'Investor portal access', included: true },
      { feature: 'Fee calculation engine', included: true },
      { feature: 'Standard KYC/AML integration', included: true },
      { feature: 'Email support (24h response)', included: true },
      { feature: 'Transaction reporting', included: true },
      { feature: 'White-labeled portal', included: true },
      { feature: 'Custom branding', included: true },
      { feature: 'API access', included: false },
      { feature: <span>On-chain fund deployment <Badge size="xs" color="gray" variant="light">Coming soon</Badge></span>, included: false },
    ],
    setupFee: 'SGD 99',
    buttonText: 'Get Started',
    highlighted: false,
    mostPopular: false,
  },
  {
    title: 'Professional Plus',
    price: { monthly: 'SGD 0.3%', yearly: 'SGD 0.25%' },
    subtitle: 'of AUM per year + SGD 299/month',
    description: 'For growing asset managers',
    perks: [
      { feature: 'Up to $10M AUM', included: true },
      { feature: 'All Professional features', included: true },
      { feature: 'Advanced accounting suite', included: true },
      { feature: 'White-labeled portal', included: true },
      { feature: 'Custom branding', included: true },
      { feature: 'Advanced analytics', included: true },
      { feature: 'Priority support (4h response)', included: true },
      { feature: 'API access', included: true },
      { feature: 'Custom reporting', included: true },
      { feature: 'Investor relations tools', included: true },
      { feature: 'Enhanced security features', included: true },
      { feature: <span>On-chain fund deployment <Badge size="xs" color="gray" variant="light">Coming soon</Badge></span>, included: false },
    ],
    setupFee: 'SGD 299',
    buttonText: 'Start Free Trial',
    highlighted: true,
    mostPopular: true,
  },
  {
    title: 'Enterprise',
    price: { monthly: 'Custom', yearly: 'Custom' },
    subtitle: 'tailored to your needs',
    description: 'For institutions & large funds',
    perks: [
      { feature: 'Unlimited AUM', included: true },
      { feature: 'All Professional Plus features', included: true },
      { feature: 'Custom fee structure', included: true },
      { feature: 'Full white-label solution', included: true },
      { feature: 'Advanced security protocols', included: true },
      { feature: 'Custom domain', included: true },
      { feature: 'Dedicated account manager', included: true },
      { feature: '24/7 premium support', included: true },
      { feature: 'Custom integrations', included: true },
      { feature: 'Custom compliance solutions', included: true },
      { feature: 'SLA guarantees', included: true },
      { feature: <span>On-chain fund deployment <Badge size="xs" color="blue" variant="light">Early access</Badge></span>, included: true },
    ],
    setupFee: 'Custom',
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
          <Text className={classes.subtitle}>Choose Your Plan</Text>
          <Text className={classes.sectionTitle}>Simple, transparent pricing</Text>
          
          <Group justify="center" mt="md">
            <SegmentedControl
              value={billingPeriod}
              onChange={setBillingPeriod}
              data={[
                { label: 'Monthly Billing', value: 'monthly' },
                { label: 'Annual Billing • Save 20%', value: 'yearly' },
              ]}
              size="md"
              className={classes.segmentedControl}
            />
          </Group>
          
          <Group className={classes.comingSoonBanner} mt="sm">
            <ThemeIcon size="md" radius="xl" color="blue" variant="light">
              <IconClock size={16} />
            </ThemeIcon>
            <Text size="sm" c="dimmed">
              On-chain fund deployment coming soon. All plans currently provide comprehensive off-chain fund management solutions.
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
                  {plan.subtitle}
                </Text>
                
                <Group gap="xs" className={classes.setupFee}>
                  <Text size="sm" fw={500}>Setup fee:</Text>
                  <Text size="sm">{plan.setupFee}</Text>
                  <Tooltip label="One-time fee for platform setup and deployment">
                    <ThemeIcon radius="xl" size="xs" variant="light">
                      <IconInfoCircle size={12} />
                    </ThemeIcon>
                  </Tooltip>
                </Group>
              </Box>

              <Button
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
                  <Text fw={700} fz="xl" className={classes.additionalTitle}>Need a customized solution?</Text>
                  <Text className={classes.additionalDescription}>
                    Our experts can help you implement the right fund management platform for your specific requirements
                  </Text>
                </div>
              </Group>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              className={classes.additionalButton}
              rightSection={<IconArrowRight size={18} />}
            >
              Schedule Consultation
            </Button>
          </Group>
        </Card>
      </Container>
    </div>
  );
} 
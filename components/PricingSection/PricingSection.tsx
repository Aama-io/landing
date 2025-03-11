import { Container, Title, Text, Card, Switch, Group, List, Button, Stack } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './PricingSection.module.css';

const plans = [
  {
    title: 'Basic',
    monthlyPrice: '0.5%',
    yearlyPrice: '0.4%',
    description: 'Perfect for getting started',
    features: [
      'Up to $1M AUM',
      'Basic fund setup',
      'Standard KYC/AML',
      'Email support',
      'Basic analytics',
      'Single blockchain',
    ],
    action: 'Get started',
    highlight: false,
  },
  {
    title: 'Professional',
    monthlyPrice: '0.3%',
    yearlyPrice: '0.25%',
    description: 'For growing funds',
    features: [
      'Up to $10M AUM',
      'Advanced fund setup',
      'Priority KYC/AML',
      'Priority support',
      'Advanced analytics',
      'Multi-chain support',
      'Custom branding',
      'API access',
    ],
    action: 'Start free trial',
    highlight: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'For institutional funds',
    features: [
      'Unlimited AUM',
      'Custom fund structure',
      'Dedicated KYC/AML',
      '24/7 support',
      'Custom analytics',
      'All chains supported',
      'White-label solution',
      'Custom integrations',
      'Dedicated account manager',
    ],
    action: 'Contact sales',
    highlight: false,
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Stack gap={50}>
          <div className={classes.header}>
            <Title className={classes.title}>
              Simple, transparent pricing
            </Title>
            <Text className={classes.description}>
              Choose the plan that best fits your fund's needs
            </Text>
            
            <Group justify="center" mt="xl">
              <Text size="sm">Monthly</Text>
              <Switch 
                checked={yearly} 
                onChange={(event) => setYearly(event.currentTarget.checked)}
                size="md"
                label="Save 20%"
                labelPosition="right"
              />
            </Group>
          </div>

          <div className={classes.plans}>
            {plans.map((plan) => (
              <Card key={plan.title} className={classes.planCard} data-highlighted={plan.highlight || undefined}>
                <div className={classes.planHeader}>
                  <Text className={classes.planTitle}>{plan.title}</Text>
                  <Text className={classes.planDescription}>{plan.description}</Text>
                </div>

                <div className={classes.pricing}>
                  {plan.monthlyPrice ? (
                    <>
                      <Text size="xl" fw={700} className={classes.price}>
                        {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </Text>
                      <Text size="sm" c="dimmed">of AUM per year</Text>
                    </>
                  ) : (
                    <Text size="xl" fw={700}>Custom pricing</Text>
                  )}
                </div>

                <Button 
                  fullWidth
                  size="lg"
                  variant={plan.highlight ? 'filled' : 'light'}
                  className={classes.planButton}
                >
                  {plan.action}
                </Button>

                <List
                  spacing="sm"
                  size="sm"
                  mt={30}
                  icon={
                    <IconCheck size={16} stroke={2} className={classes.checkIcon} />
                  }
                >
                  {plan.features.map((feature) => (
                    <List.Item key={feature}>{feature}</List.Item>
                  ))}
                </List>
              </Card>
            ))}
          </div>

          <Card className={classes.enterpriseCard}>
            <Group justify="space-between" align="center">
              <div>
                <Text fw={700} size="lg">Need a custom solution?</Text>
                <Text size="sm" c="dimmed" mt={5}>
                  Contact our sales team for a personalized demo and custom pricing.
                </Text>
              </div>
              <Button variant="light" size="lg">Contact Sales</Button>
            </Group>
          </Card>
        </Stack>
      </Container>
    </div>
  );
} 
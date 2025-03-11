import { Container, Card, Text, Group, Button, List, ThemeIcon, SegmentedControl, Stack } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './PricingTables.module.css';

const plans = [
  {
    title: 'Starter',
    price: '0.5%',
    subtitle: 'of AUM p.a.',
    description: 'For smaller asset managers',
    features: [
      'Commission on management & performance fees',
      'On-chain paying agent',
      'Tokenized shares',
      'Fee calculation',
      '99 USDC setup fee',
    ],
    buttonText: 'Start now',
    highlighted: false,
  },
  {
    title: 'Plus',
    price: '0.3%',
    subtitle: 'of AUM + $299/month',
    description: 'For growing asset managers',
    features: [
      'All Starter features',
      'Discounted protocol fee (-40%)',
      'Technical support',
      'Custom branding',
      'Multi-chain support',
    ],
    buttonText: 'Start now',
    highlighted: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    subtitle: '',
    description: 'For larger asset managers',
    features: [
      'All Plus features',
      'NAV calculation agent',
      'Custom domain',
      'Custom chain support',
      'Dedicated support',
    ],
    buttonText: 'Contact us',
    highlighted: false,
  },
];

export function PricingTables() {
  const [period, setPeriod] = useState('monthly');

  return (
    <Container size="lg" py="xl">
      <Stack align="center" mb={50}>
        <SegmentedControl
          value={period}
          onChange={setPeriod}
          data={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
        />
      </Stack>

      <div className={classes.grid}>
        {plans.map((plan) => (
          <Card 
            key={plan.title} 
            className={classes.card} 
            data-highlighted={plan.highlighted || undefined}
          >
            <Text fz="xl" fw={700} className={classes.cardTitle}>
              {plan.title}
            </Text>

            <Text className={classes.price} mt="xs">
              {plan.price}
            </Text>
            {plan.subtitle && (
              <Text size="sm" c="dimmed">
                {plan.subtitle}
              </Text>
            )}

            <Text className={classes.description} mt="md">
              {plan.description}
            </Text>

            <List
              mt={30}
              spacing="sm"
              center
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              {plan.features.map((feature) => (
                <List.Item key={feature}>{feature}</List.Item>
              ))}
            </List>

            <Button
              fullWidth
              variant={plan.highlighted ? 'filled' : 'light'}
              mt="xl"
              size="md"
            >
              {plan.buttonText}
            </Button>
          </Card>
        ))}
      </div>

      <Card className={classes.additionalCard} mt={60}>
        <Group align="flex-start" wrap="nowrap">
          <div>
            <Text fz="xl" fw={700}>Need a License?</Text>
            <Text fz="28" fw={700} mt="xs">$999</Text>
            <Text size="sm" c="dimmed">Setup of a fund as an investment advisor</Text>
            
            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>2 weeks setup</List.Item>
              <List.Item>No setup cost</List.Item>
              <List.Item>Free ISIN</List.Item>
              <List.Item>Possibly charged to the fund</List.Item>
            </List>
          </div>
          <Button variant="light" size="md">Add a License</Button>
        </Group>
      </Card>
    </Container>
  );
} 
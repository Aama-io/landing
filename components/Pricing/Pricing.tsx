import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Badge,
  Button,
  List,
  ThemeIcon,
  SegmentedControl,
  Stack,
  Grid,
  Paper,
} from '@mantine/core';
import { IconCheck, IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './Pricing.module.css';

const pricingData = [
  {
    title: 'Starter',
    price: '0.5%',
    unit: 'of AUM p.a.',
    description: 'For smaller fund managers',
    subtitle: 'Commission on the sum of your management, performance, entry and exit fee.',
    features: [
      'On-chain paying agent',
      'Tokenized shares',
      'Fee calculation',
      'Basic SIP automation',
      '99 USDC setup fee'
    ],
    buttonText: 'Start now',
    variant: 'light',
  },
  {
    title: 'Plus',
    price: '0.3%',
    unit: 'of AUM + $299/month',
    description: 'For growing fund managers',
    subtitle: 'Commission on the sum of your management, performance, entry and exit fee.',
    features: [
      'All Starter features',
      'Discounted protocol fee (-40%)',
      'Technical support',
      'Custom branding',
      'Advanced analytics'
    ],
    buttonText: 'Start now',
    variant: 'filled',
    highlight: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'For larger fund managers',
    subtitle: 'Full-service solution with custom requirements',
    features: [
      'All Plus features',
      'NAV calculation agent',
      'Custom domain',
      'Custom chain support',
      'Dedicated support'
    ],
    buttonText: 'Contact us',
    variant: 'light',
  }
];

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  return (
    <Container size="lg" py="xl">
      <Stack align="center" mb={50}>
        <Title order={2}>Choose your plan</Title>
        <Text c="dimmed" ta="center" maw={600}>
          Start managing your fund on-chain with our flexible pricing options
        </Text>
        
        <SegmentedControl
          value={billingPeriod}
          onChange={setBillingPeriod}
          data={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' }
          ]}
        />
      </Stack>

      <Grid gutter="xl">
        {pricingData.map((plan) => (
          <Grid.Col key={plan.title} span={{ base: 12, md: 4 }}>
            <Card
              shadow="sm"
              padding="xl"
              radius="md"
              withBorder={plan.highlight}
              className={plan.highlight ? classes.highlighted : ''}
            >
              {plan.highlight && (
                <Badge
                  variant="filled"
                  size="lg"
                  className={classes.badge}
                  styles={{ root: { position: 'absolute', top: 15, right: 15 } }}
                >
                  Most Popular
                </Badge>
              )}

              <Stack gap="md">
                <div>
                  <Text fz="xl" fw={700}>
                    {plan.title}
                  </Text>
                  <Group gap={5}>
                    <Text fz={42} fw={900}>
                      {plan.price}
                    </Text>
                    {plan.unit && (
                      <Text fz="sm" c="dimmed">
                        {plan.unit}
                      </Text>
                    )}
                  </Group>
                  <Text size="sm" c="dimmed">
                    {plan.subtitle}
                  </Text>
                </div>

                <List
                  spacing="sm"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <IconCheck size={16} />
                    </ThemeIcon>
                  }
                >
                  {plan.features.map((feature) => (
                    <List.Item key={feature}>{feature}</List.Item>
                  ))}
                </List>

                <Button
                  fullWidth
                  size="md"
                  variant={plan.variant}
                  mt="auto"
                >
                  {plan.buttonText}
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

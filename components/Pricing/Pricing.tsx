import React from 'react';
import { IconCheck } from '@tabler/icons-react';
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  List,
  rem,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import classes from './Pricing.module.css';

const pricingData = [
  {
    title: 'Free',
    price: '$0/month',
    description: 'For small teams getting started',
    features: ['1 Project', 'Basic Support', '10GB Storage'],
    buttonText: 'Get Started',
    buttonColor: 'gray',
  },
  {
    title: 'Pro',
    price: '$29/month',
    description: 'For growing businesses',
    features: ['Unlimited Projects', 'Priority Support', '100GB Storage'],
    buttonText: 'Upgrade Now',
    buttonColor: 'blue',
  },
  {
    title: 'Enterprise',
    price: 'Custom Pricing',
    description: 'For large organizations',
    features: ['Advanced Features', 'Dedicated Support', 'Custom Storage'],
    buttonText: 'Contact Sales',
    buttonColor: 'gray',
  },
];

export default function PricingTable() {
  return (
    <div className={classes.wrapper}>
    <Container size="lg" py="xl" id="pricing">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Pricing plans
        </Badge>
      </Group>

      <Title order={2} ta="center" className={classes.title} mt="sm">
        We have you covered with plans for every budget
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md"></Text>

      <Grid mt={50}>
        {pricingData.map((plan) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={plan.title}>
            <Card shadow="md" radius="md" padding="lg" withBorder>
              <Group mb="md">
                <Title order={3}>{plan.title}</Title>
                <Badge size="lg" color={plan.buttonColor}>
                  {plan.price}
                </Badge>
              </Group>
              <Text c="dimmed" mb="md">
                {plan.description}
              </Text>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon size={24} radius="xl" variant="light">
                    <IconCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
                mb="lg"
              >
                {plan.features.map((feature) => (
                  <List.Item key={feature}>
                    <Text size="sm">{feature}</Text>
                  </List.Item>
                ))}
              </List>
              <Button color={plan.buttonColor} mb="xs" variant="">
                {plan.buttonText}
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
    </div>
  );
}

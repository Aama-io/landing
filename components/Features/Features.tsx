import { Container, Title, Text, SimpleGrid, Card, ThemeIcon } from '@mantine/core';
import {
  IconChartPie,
  IconLock,
  IconCoin,
  IconChartBar,
  IconReportAnalytics,
  IconWorld,
} from '@tabler/icons-react';
import classes from './Features.module.css';

const features = [
  {
    icon: IconChartPie,
    title: 'Automated NAV',
    description: 'Real-time NAV calculations with automated reconciliation.',
  },
  {
    icon: IconLock,
    title: 'Smart Compliance',
    description: 'Built-in compliance checks and automated reporting.',
  },
  {
    icon: IconCoin,
    title: 'Tokenization',
    description: 'Seamless asset tokenization and management.',
  },
  {
    icon: IconChartBar,
    title: 'Analytics',
    description: 'Advanced analytics and performance tracking.',
  },
  {
    icon: IconReportAnalytics,
    title: 'Risk Management',
    description: 'Comprehensive risk assessment tools.',
  },
  {
    icon: IconWorld,
    title: 'Global Access',
    description: 'Multi-currency and jurisdiction support.',
  },
];

export function Features() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center">
        Enterprise-Grade Features
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Built for professional fund managers, our platform delivers 
        unparalleled efficiency and control.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" mt={50}>
        {features.map((feature) => (
          <Card key={feature.title} className={classes.card} padding="xl">
            <ThemeIcon
              size={46}
              radius="md"
              color="blue"
              variant="light"
            >
              <feature.icon size={24} stroke={1.5} />
            </ThemeIcon>

            <Text size="lg" fw={500} mt="md">
              {feature.title}
            </Text>

            <Text size="sm" c="dimmed" mt="sm">
              {feature.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
} 
import { Container, SimpleGrid, Card, Text, Title, ThemeIcon } from '@mantine/core';
import { IconChartPie, IconCoin, IconReportAnalytics, IconWorldX } from '@tabler/icons-react';
import classes from './Solutions.module.css';

const solutions = [
  {
    icon: IconChartPie,
    title: 'Matrix Mutual Platform',
    description: 'Complete fund management & accounting platform with automated NAV calculation.',
  },
  {
    icon: IconReportAnalytics,
    title: 'Capital Engine',
    description: 'Investment platform for SIP & lump sum investments in open-ended mutual funds.',
  },
  {
    icon: IconCoin,
    title: 'Tokenization',
    description: 'Built-in tokenization for seamless blockchain integration and global accessibility.',
  },
  {
    icon: IconWorldX,
    title: 'Global Infrastructure',
    description: 'Scalable infrastructure ready for international expansion.',
  },
];

export function Solutions() {
  return (
    <Container size="lg" py="xl">
      <Title ta="center" className={classes.title}>
        Complete Fund Management Solution
      </Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mt={50}>
        {solutions.map((solution) => (
          <Card key={solution.title} className={classes.card} padding="xl">
            <ThemeIcon
              size={50}
              radius="md"
              variant="gradient"
              gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            >
              <solution.icon size={26} stroke={1.5} />
            </ThemeIcon>
            <Text size="lg" fw={500} mt="md">
              {solution.title}
            </Text>
            <Text size="sm" c="dimmed" mt="sm">
              {solution.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
} 
import {
  Container,
  Title,
  Text,
  Paper,
  Group,
  RingProgress,
  SimpleGrid,
  Card,
  List,
  ThemeIcon,
  Badge,
} from '@mantine/core';
import {
  IconCoin,
  IconChartPie,
  IconLock,
  IconRocket,
  IconUsers,
  IconCheck,
  IconPercentage,
  IconCoinBitcoin,
} from '@tabler/icons-react';
import classes from './Tokenomics.module.css';

const tokenDistribution = [
  { label: 'Public ITO', value: 40, color: '#3B82F6', description: 'No lockup period' },
  { label: 'Private Sale', value: 10, color: '#10B981', description: '6-month lock, 12-month vesting' },
  { label: 'Team & Advisors', value: 15, color: '#6366F1', description: '3-year vesting, 12-month cliff' },
  { label: 'Staking & Rewards', value: 15, color: '#EC4899', description: '5-year disbursement' },
  { label: 'Ecosystem', value: 10, color: '#F59E0B', description: 'Development & Marketing' },
  { label: 'Treasury', value: 10, color: '#8B5CF6', description: '50% locked for 2 years' },
];

const tokenBenefits = [
  {
    title: 'Transaction Fee Discount',
    description: 'Get 30% off on software fees',
    icon: IconPercentage,
    highlight: '30% OFF',
  },
  {
    title: 'Staking Rewards',
    description: 'Earn 6-12% APY by staking tokens',
    icon: IconChartPie,
    highlight: '6-12% APY',
  },
  {
    title: 'Platform Access',
    description: 'Stake 10,000 tokens for full features',
    icon: IconLock,
    highlight: '10,000 MIN',
  },
  {
    title: 'Governance Rights',
    description: 'Vote on software upgrades and proposals',
    icon: IconUsers,
    highlight: 'DAO',
  },
];

export function Tokenomics() {
  return (
    <Container size="lg" py="xl">
      <div className={classes.wrapper}>
        <Title className={classes.title} order={2} ta="center">
          Token Economics
        </Title>
        <Container size={600} p={0}>
          <Text c="dimmed" ta="center" className={classes.description}>
            $TOKEN powers the entire ecosystem with a total supply of 1 billion tokens,
            providing utility, governance, and rewards for software participants
          </Text>
        </Container>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} mt={50}>
          <Paper withBorder radius="md" className={classes.card}>
            <Group justify="space-between" mb="md">
              <Title order={3} className={classes.cardTitle}>Distribution</Title>
              <Badge variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                1B Total Supply
              </Badge>
            </Group>

            <Group align="flex-start" gap="xl">
              <RingProgress
                size={200}
                thickness={20}
                roundCaps
                sections={tokenDistribution.map((item) => ({
                  value: item.value,
                  color: item.color,
                }))}
              />
              
              <div className={classes.labels}>
                {tokenDistribution.map((item) => (
                  <div key={item.label} className={classes.label}>
                    <Group gap="xs">
                      <div 
                        className={classes.labelColor} 
                        style={{ backgroundColor: item.color }} 
                      />
                      <div>
                        <Text fw={500}>{item.label} ({item.value}%)</Text>
                        <Text size="sm" c="dimmed">{item.description}</Text>
                      </div>
                    </Group>
                  </div>
                ))}
              </div>
            </Group>
          </Paper>

          <Paper withBorder radius="md" className={classes.card}>
            <Title order={3} className={classes.cardTitle} mb="md">
              Token Benefits
            </Title>

            <SimpleGrid cols={1} spacing="md">
              {tokenBenefits.map((benefit) => (
                <Card key={benefit.title} withBorder radius="md" className={classes.benefitCard}>
                  <Group>
                    <ThemeIcon
                      size={44}
                      radius="md"
                      variant="gradient"
                      gradient={{ from: 'blue', to: 'cyan' }}
                    >
                      <benefit.icon size={24} stroke={1.5} />
                    </ThemeIcon>

                    <div style={{ flex: 1 }}>
                      <Text fw={500} mb={4}>{benefit.title}</Text>
                      <Text size="sm" c="dimmed">{benefit.description}</Text>
                    </div>

                    <Badge variant="light" size="lg">
                      {benefit.highlight}
                    </Badge>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </Paper>
        </SimpleGrid>

        <Paper withBorder radius="md" className={classes.card} mt={50}>
          <Title order={3} className={classes.cardTitle} mb="xl">
            Token Sale Details
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
            <Card withBorder radius="md" className={classes.statsCard}>
              <IconCoin className={classes.statsIcon} stroke={1.5} />
              <Text fz="lg" fw={500} mt="md">Hard Cap</Text>
              <Text className={classes.statsValue} mt={4}>$50M</Text>
            </Card>

            <Card withBorder radius="md" className={classes.statsCard}>
              <IconCoinBitcoin className={classes.statsIcon} stroke={1.5} />
              <Text fz="lg" fw={500} mt="md">Token Price</Text>
              <Text className={classes.statsValue} mt={4}>$0.05 - $0.175</Text>
            </Card>

            <Card withBorder radius="md" className={classes.statsCard}>
              <IconRocket className={classes.statsIcon} stroke={1.5} />
              <Text fz="lg" fw={500} mt="md">Initial Supply</Text>
              <Text className={classes.statsValue} mt={4}>400M</Text>
            </Card>
          </SimpleGrid>
        </Paper>
      </div>
    </Container>
  );
} 
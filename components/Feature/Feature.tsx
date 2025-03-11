import {
  IconChartPie,
  IconCoin,
  IconDeviceAnalytics,
  IconFileAnalytics,
  IconLock,
  IconRefresh,
  IconReportMoney,
  IconShield,
  IconUserCheck,
} from '@tabler/icons-react';
import {
  Box,
  Container,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import classes from './Feature.module.css';

const productFeatures = [
  {
    title: 'Fund-as-a-Service',
    description: 'All-in-one solution: fund legal structure and administration.',
    features: [
      {
        title: 'Setup of your investment vehicle',
        icon: IconCoin,
        color: '#3B82F6', // blue
      },
      {
        title: 'Administration done for you',
        icon: IconFileAnalytics,
        color: '#10B981', // green
      },
      {
        title: 'AML/KYC compliance',
        icon: IconShield,
        color: '#6366F1', // indigo
      },
      {
        title: 'Financial regulator reporting',
        icon: IconReportMoney,
        color: '#8B5CF6', // purple
      },
    ],
  },
  {
    title: 'On-Chain Fund Admin',
    description: 'A tool to automate fund administration with smart contracts.',
    features: [
      {
        title: 'Automated NAV calculations',
        icon: IconDeviceAnalytics,
        color: '#EC4899', // pink
      },
      {
        title: 'Smart contract automation',
        icon: IconRefresh,
        color: '#F59E0B', // amber
      },
      {
        title: 'Real-time portfolio tracking',
        icon: IconChartPie,
        color: '#3B82F6', // blue
      },
      {
        title: 'Secure infrastructure',
        icon: IconLock,
        color: '#10B981', // green
      },
    ],
  },
  {
    title: 'In-kind Feeder Fund',
    description: 'Accept investors with stablecoins and other digital assets.',
    features: [
      {
        title: 'Digital asset subscriptions',
        icon: IconCoin,
        color: '#6366F1', // indigo
      },
      {
        title: 'Automated investor onboarding',
        icon: IconUserCheck,
        color: '#8B5CF6', // purple
      },
      {
        title: 'Multi-chain support',
        icon: IconReportMoney,
        color: '#EC4899', // pink
      },
      {
        title: 'Regulatory compliance',
        icon: IconShield,
        color: '#F59E0B', // amber
      },
    ],
  },
];

export function Feature() {
  return (
    <Box className={classes.wrapper}>
      <Container size="lg">
        <Stack gap={50}>
          {productFeatures.map((product, index) => (
            <div key={product.title} className={classes.product}>
              <Grid gutter={50} className={classes.grid}>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Stack gap="md">
                    <Title order={2} className={classes.productTitle}>
                      {product.title}
                    </Title>
                    <Text size="lg" c="dimmed">
                      {product.description}
                    </Text>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 8 }}>
                  <Grid gutter="xl">
                    {product.features.map((feature) => (
                      <Grid.Col span={6} key={feature.title}>
                        <Flex gap="md" align="center" className={classes.feature}>
                          <div 
                            className={classes.iconWrapper}
                            style={{ '--icon-color': feature.color } as React.CSSProperties}
                          >
                            <feature.icon size={22} stroke={1.5} />
                          </div>
                          <Text size="sm" fw={500}>
                            {feature.title}
                          </Text>
                        </Flex>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Grid.Col>
              </Grid>
            </div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

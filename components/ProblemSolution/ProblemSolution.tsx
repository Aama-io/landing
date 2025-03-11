import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Button } from '@mantine/core';
import { 
  IconServer, 
  IconUsers, 
  IconCoin, 
  IconChartBar, 
  IconShield, 
  IconWorld 
} from '@tabler/icons-react';
import classes from './ProblemSolution.module.css';

export function ProblemSolution() {
  const platforms = [
    {
      title: 'Fund Management Platform',
      description: 'Complete suite of tools for both on-chain and off-chain fund operations',
      features: [
        'Traditional fund management tools',
        'Blockchain-based asset tracking',
        'Automated compliance systems',
        'Real-time portfolio analytics',
        'Multi-currency support'
      ],
      icon: IconChartBar,
    },
    {
      title: 'Investor Platform',
      description: 'Seamless investment experience for your clients',
      features: [
        'Digital onboarding process',
        'Real-time portfolio tracking',
        'Automated reporting',
        'Secure communication channel',
        'Mobile-first interface'
      ],
      icon: IconUsers,
    },
    {
      title: 'Tokenization Platform',
      description: 'Convert traditional assets into digital tokens',
      features: [
        'Asset tokenization',
        'Smart contract deployment',
        'Regulatory compliance',
        'Secondary market support',
        'Fractional ownership'
      ],
      icon: IconCoin,
    },
  ];

  const benefits = [
    {
      title: 'Hybrid Infrastructure',
      description: 'Seamlessly integrate traditional and blockchain-based fund management systems',
      icon: IconServer,
    },
    {
      title: 'Fund-as-a-Service',
      description: 'Launch and manage funds with minimal setup time and technical overhead',
      icon: IconWorld,
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-grade security for both traditional and digital assets',
      icon: IconShield,
    },
  ];

  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <div className={classes.header}>
          <Title className={classes.title}>
            Comprehensive Fund Management Solutions
          </Title>
          <Text className={classes.description}>
            AAMA.io provides integrated platforms for modern fund management,
            combining traditional finance with blockchain technology
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30} mt={50}>
          {platforms.map((platform, index) => (
            <Card key={index} className={classes.platformCard}>
              <ThemeIcon
                size={40}
                radius="md"
                variant="light"
                color="blue"
                className={classes.icon}
              >
                <platform.icon size={24} />
              </ThemeIcon>
              
              <Text size="lg" fw={700} mt="md">
                {platform.title}
              </Text>
              
              <Text size="sm" c="dimmed" mt="sm">
                {platform.description}
              </Text>

              <ul className={classes.featuresList}>
                {platform.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <Button variant="light" fullWidth mt="xl">
                Learn More
              </Button>
            </Card>
          ))}
        </SimpleGrid>

        <div className={classes.header} style={{ marginTop: 80 }}>
          <Title className={classes.title} order={2}>
            Why Choose AAMA.io
          </Title>
          <Text className={classes.description}>
            Future-proof your fund management with our comprehensive solution
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30} mt={50}>
          {benefits.map((benefit, index) => (
            <Card key={index} className={classes.benefitCard}>
              <ThemeIcon
                size={40}
                radius="md"
                variant="light"
                color="blue"
                className={classes.icon}
              >
                <benefit.icon size={24} />
              </ThemeIcon>
              <Text size="lg" fw={500} mt="md">
                {benefit.title}
              </Text>
              <Text size="sm" c="dimmed" mt="sm">
                {benefit.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
} 
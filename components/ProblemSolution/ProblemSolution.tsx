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
      title: 'Aama Fund Management Platform',
      description: 'Complete suite of tools for both on-chain and off-chain fund operations',
      features: [
       'Modern fund management tools',
       'Back office automation',
       'Automated compliance systems',
       'Real-time portfolio analytics',
       'IFRS compliant accounting and reporting'
      ],
      icon: IconChartBar,
    },
    {
      title: 'Aama Investor Management Platform',
      description: 'Investor platform for retail and institutional investors',
      features: [
        'SIP and lump sum investments',
        'Digital onboarding process',
        'Real-time portfolio tracking',
        'Automated reporting',
        'Payment methods of choice',
        'Mobile app for investors'
      ],
      icon: IconUsers,
    },
    {
      title: 'On-chain Fund Management (Coming Soon)',
      description: 'Tokenize your fund and manage it on the blockchain',
      features: [
        'Tokenization of fund assets',
        'Smart contract-based fund management',
        'On-chain NAV calculation and distribution',
        'Regulatory compliance',
        'On-chain trading and secondary market',
        'Fractional ownership',
       
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
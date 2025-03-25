import { Container, Title, Text, SimpleGrid, Card, ThemeIcon, Button, Group, Paper } from '@mantine/core';
import { 
  IconServer, 
  IconUsers, 
  IconCoin, 
  IconChartBar, 
  IconShield, 
  IconWorld,
  IconCheck,
  IconArrowRight
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './ProblemSolution.module.css';
import Link from 'next/link';

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
        <motion.div 
          className={classes.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Title className={classes.title}>
            Comprehensive Fund Management Solutions
          </Title>
          <Text className={classes.description}>
            AAMA.io provides integrated platforms for modern fund management,
            combining traditional finance with blockchain technology
          </Text>
        </motion.div>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={40} mt={60}>
          {platforms.map((platform, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
              viewport={{ once: true }}
            >
              <Card className={classes.platformCard} withBorder={false} padding={0}>
                <motion.div 
                  className={classes.cardContent}
                  whileHover={{ scale: 1.02, y: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <ThemeIcon
                    size={60}
                    radius="xl"
                    className={classes.icon}
                  >
                    <platform.icon size={30} />
                  </ThemeIcon>
                  
                  <Title order={3} mt="md">
                    {platform.title}
                  </Title>
                  
                  <Text size="md" c="dimmed" mt="sm" mb="md">
                    {platform.description}
                  </Text>

                  <div className={classes.featuresList}>
                    {platform.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.3 + (index * 0.1) + (idx * 0.05)
                        }}
                        viewport={{ once: true }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </div>

                  <Button 
                    component={Link} 
                    href="/product" 
                    variant="light" 
                    rightSection={<IconArrowRight size={16} />}
                    className={classes.learnMoreButton} 
                    mt="xl"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>

        <motion.div 
          className={classes.header}
          style={{ marginTop: 100 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Title className={classes.title} order={2}>
            Why Choose AAMA.io
          </Title>
          <Text className={classes.description}>
            Future-proof your fund management with our comprehensive solution
          </Text>
        </motion.div>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={40} mt={60}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <Card key={index} className={classes.benefitCard}>
                <ThemeIcon
                  size={60}
                  radius="xl"
                  className={classes.icon}
                >
                  <benefit.icon size={30} />
                </ThemeIcon>
                <Title order={4} mt="md">
                  {benefit.title}
                </Title>
                <Text mt="sm">
                  {benefit.description}
                </Text>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
} 
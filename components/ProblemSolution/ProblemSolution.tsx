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
      title: 'Investor Onboarding Portal',
      description: 'Investor onboarding portal for retail and institutional investors',
      features: [
        'Digital onboarding process',
        'Real-time portfolio tracking',
        'Automated reporting',
        'Payment methods of choice',
        'Mobile app for investors',
        'KYC and AML compliance',
        'SIP and lump sum investments',
        'Real-time portfolio tracking',
      ],
      icon: IconUsers,
    },
    {
      title: 'Investor Management Platform',
      description: 'Investor platform for retail and institutional investors',
      features: [
        'Investor management',
        'Investor reporting',
        'Back office automation',
        'Dividend and interest payments',
        'Distribution center',
        'Tax reporting',
        'Works with mutiple funds',
        'Permissions and role based access',
      ],
      icon: IconUsers,
    },
    {
      title: 'Fund Management & Accounting Platform',
      description: 'Complete suite of tools for both on-chain and off-chain fund operations',
      features: [
        'IFRS compliant accounting and reporting',
        'Investment planning',
       'Modern fund management tools',
       'Back office automation',
       'Automated compliance systems',
       'Real-time portfolio analytics',
       'Works with mutiple funds'
       
      ],
      icon: IconChartBar,
    }
  ];

  const benefits = [
    {
      title: 'Fund-as-a-Service',
      description: 'Launch and manage funds with minimal setup time and technical overhead',
      icon: IconWorld,
    },
    {
      title: 'Cloud Infrastructure',
      description: 'We use the best cloud infrastructure to ensure your data is secure and your systems are reliable',
      icon: IconServer,
    },
    {
      title: 'End to End Solution',
      description: 'We provide a complete suite of tools for fund management, from onboarding to accounting and reporting',
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
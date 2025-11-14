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
  const softwares = [
    {
      title: 'Digital Investor Experience',
      description: 'White-labeled investor portal with enterprise-grade security and real-time access',
      features: [
        'AI-powered KYC/AML onboarding',
        'Real-time portfolio dashboard',
        'Automated capital call notifications',
        'Mobile-first investor experience',
        'Document vault with e-signatures',
        'Multi-currency support',
        'Subscription management',
        'Compliance-ready reporting',
      ],
      icon: IconUsers,
    },
    {
      title: 'Fund Operations Hub',
      description: 'Comprehensive back-office automation for fund administrators and managers',
      features: [
        'Automated investor servicing',
        'Distribution processing',
        'Tax reporting automation',
        'Capital call management',
        'Redemption processing',
        'Multi-fund operations',
        'Role-based permissions',
        'Audit trail compliance',
      ],
      icon: IconServer,
    },
    {
      title: 'Modern Fund Management',
      description: 'Enterprise accounting platform with intelligent automation and regulatory compliance',
      features: [
        'IFRS-compliant accounting',
        'Automated NAV calculations',
        'Automated compliance monitoring',
        'Real-time portfolio analytics',
        'Regulatory reporting automation',
        'Multi-currency operations',
        'Risk management dashboards',
        'Enterprise-grade security'
      ],
      icon: IconChartBar,
    }
  ];

  const benefits = [
    {
      title: 'Rapid Fund Launch',
      description: 'Launch new funds in weeks, not months. Our pre-configured templates and automated setup reduce time-to-market by 75%',
      icon: IconWorld,
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-grade security with SOC 2 compliance, end-to-end encryption, and 99.9% uptime SLA guarantee',
      icon: IconShield,
    },
    {
      title: 'Complete Integration',
      description: 'Unified platform eliminates data silos. Real-time synchronization across all modules ensures data accuracy and operational efficiency',
      icon: IconServer,
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
            Three Integrated Platforms. One Unified Solution.
          </Title>
          <Text className={classes.description}>
            Transform your fund operations with our comprehensive suite of AI-powered platforms,
            designed specifically for modern fund managers who demand efficiency, compliance, and scale.
          </Text>
        </motion.div>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={40} mt={60}>
          {softwares.map((software, index) => (
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
              <Card className={classes.softwareCard} withBorder={false} padding={0}>
                <motion.div
                  className={classes.cardContent}
                  whileHover={{ scale: 1.02, y: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className={classes.imageSection}>
                    <div className={classes.imageOverlay}>
                      <ThemeIcon
                        size={50}
                        radius="xl"
                        className={classes.icon}
                      >
                        <software.icon size={24} />
                      </ThemeIcon>
                    </div>
                  </div>

                  <div className={classes.cardTextContent}>
                    <Title order={3} mt="md">
                      {software.title}
                    </Title>

                    <Text size="md" c="dimmed" mt="sm" mb="md">
                      {software.description}
                    </Text>

                    <div className={classes.featuresList}>
                      {software.features.map((feature, idx) => (
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
            Why Leading Fund Managers Choose AAMA
          </Title>
          <Text className={classes.description}>
            Join the fund managers who've already transformed their operations and reduced costs by 80%
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
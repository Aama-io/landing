import { Container, Text, Title, ThemeIcon, Group, Badge, Paper, SimpleGrid, Divider, Box, Stack, Button } from '@mantine/core';
import {
  IconBuildingBank,
  IconUsers,
  IconReportAnalytics,
  IconDeviceAnalytics,
  IconCoin,
  IconArrowRight,
  IconCheck,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import classes from './Features.module.css';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  index?: number;
}

const FeatureCard = ({ icon: Icon, title, description, index = 0 }: FeatureCardProps) => (
  <motion.div
    variants={featureCardVariants}
    custom={index}
    className={classes.card}
  >
    <Paper withBorder p="xl" radius="lg" h="100%">
      <div className={classes.cardInner}>
        <ThemeIcon size={50} radius="md" className={classes.iconSmall}>
          <Icon size={24} stroke={1.5} />
        </ThemeIcon>
        <Title order={4} mt="md" className={classes.cardTitle}>{title}</Title>
        <Text mt="sm">{description}</Text>
      </div>
    </Paper>
  </motion.div>
);

export function Features() {
  const fundCapabilities = [
    {
      icon: IconBuildingBank,
      title: "Automated Fund Operations",
      description: "AI-powered daily NAV calculations, multi-currency support, and automated fund accounting. Reduce operational overhead by 80% with intelligent workflow automation, real-time reconciliation, and integrated audit trails that ensure accuracy and compliance."
    },
    {
      icon: IconUsers,
      title: "Digital Investor Experience",
      description: "Complete digital onboarding with KYC/AML automation, subscription processing, and real-time investor portal. Streamline investor servicing with automated capital calls, distribution processing, and 24/7 self-service access to fund performance and documents."
    },
    {
      icon: IconReportAnalytics,
      title: "Smart Compliance & Reporting",
      description: "AI-powered regulatory compliance monitoring with automatic MAS, SEC, and EU reporting. Real-time compliance dashboards, automated risk monitoring, and intelligent alert systems that prevent violations before they occur."
    }
  ];

  const onchainFeatures = [
    "Tokenized Fund Units",
    "Automated Compliance", 
    "Transparent Governance",
    "Smart Contract Management"
  ];

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperPattern} />
      <div className={classes.wrapperGradient} />
      
      <Container size="lg">
        {/* Header Section */}
        <motion.div
          className={classes.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <Badge
            size="lg"
            radius="sm"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            className={classes.sectionBadge}
          >
            AI-Powered Platform
          </Badge>
          <Title className={classes.title} mt="xs">
            <span className={classes.highlight}>Intelligent automation</span> that scales with your fund
          </Title>
          <Text className={classes.description}>
            Transform your fund operations with enterprise-grade AI that automates complex workflows,
            ensures regulatory compliance, and delivers exceptional investor experiences.
            Trusted by fund managers managing $500M+ in assets.
          </Text>
        </motion.div>

        {/* Core Capabilities Section */}
        <Box mt={80}>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
              {fundCapabilities.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </SimpleGrid>
          </motion.div>
        </Box>
        
        {/* Future of Fund Management Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <Box mt={80} mb={30}>
            <Paper withBorder p="xl" radius="lg" className={classes.futureSection}>
              <Title order={2} mb="xl" ta="center" className={classes.futureTitle}>
                The Future of Fund Management
              </Title>
              <Text ta="center" size="lg" px={{ base: 0, md: 80 }} mb="xl">
                AAMA.io is not just a fund management software—it's a vision for the future of regulated fund operations.
                We're building the infrastructure that will power the next generation of funds, making them more
                efficient, transparent, and accessible while maintaining the highest standards of regulatory compliance.
              </Text>

            </Paper>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
} 
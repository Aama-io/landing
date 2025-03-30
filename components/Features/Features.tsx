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
      title: "Fund Operations",
      description: "Comprehensive fund operations including daily NAV calculations, unit pricing, fund accounting, and financial reporting. Supports multiple share classes, currencies, and complex fee structures with built-in audit trails and regulatory controls."
    },
    {
      icon: IconUsers,
      title: "Investor Services",
      description: "End-to-end fund investor servicing including subscription processing, redemption handling, dividend distribution, and transfer agency services. Supports systematic investment plans, switching between share classes, and regular income distributions."
    },
    {
      icon: IconReportAnalytics,
      title: "Compliance & Reporting",
      description: "Integrated compliance functions for mutual funds including MAS regulatory reporting, investment guideline monitoring, and AML/KYC verification. Automated generation of fund factsheets, annual reports, and regulatory filings with built-in validation."
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
            Platform Overview
          </Badge>
          <Title className={classes.title} mt="xs">
            The <span className={classes.highlight}>complete solution</span> for modern fund management
          </Title>
          <Text className={classes.description}>
            AAMA.io specializes in fund management, leveraging our deep expertise in regulated fund operations
            to deliver a comprehensive platform that meets the highest standards of compliance and efficiency.
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
                AAMA.io is not just a fund management platform—it's a vision for the future of regulated fund operations.
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
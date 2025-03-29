import { Container, Text, Title, ThemeIcon, Group, rem, Badge, Paper, SimpleGrid, List, Divider, Box, Stack, Button } from '@mantine/core';
import {
  IconStar,
  IconShield,
  IconRocket,
  IconChartBar,
  IconLock,
  IconCheck,
  IconUsers,
  IconRefresh,
  IconWorld,
  IconComponents,
  IconDeviceAnalytics,
  IconCoin,
  IconArrowRight,
  IconReportAnalytics,
  IconBuildingBank,
  IconReceipt2,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import classes from './Features.module.css';

export function Features() {
  // Simpler, more performant animation variant
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperPattern} />
      <div className={classes.wrapperGradient} />
      
      <Container size="lg">
        <motion.div
          className={classes.header}
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          viewport={{ once: true, margin: "-50px" }}
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
            Our solution streamlines fund operations, enhances transparency, and enables new investment models
            while maintaining strict regulatory compliance.
          </Text>
        </motion.div>

        {/* First section - overview paper */}
        <Box mt={50}>
          <Paper withBorder p="xl" radius="lg" className={classes.overviewPaper}>
            <div className={classes.paperGlow} />
            <Title order={2} className={classes.paperTitle} mb="xl">Expertise in Fund Management</Title>
            <Text size="lg" mb="xl">
              With proven experience in managing live funds, AAMA.io understands the unique challenges
              and regulatory requirements of fund operations. Our platform combines traditional fund
              management expertise with modern technology to deliver a robust solution that meets the highest
              standards of compliance, efficiency, and investor service. We've successfully deployed
              funds that adhere to strict regulatory frameworks, making us a trusted partner for fund managers
              seeking excellence in fund operations.
            </Text>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Stack className={classes.featureBlock}>
                <ThemeIcon size={60} radius="md" className={classes.icon}>
                  <IconDeviceAnalytics size={rem(30)} stroke={1.5} />
                </ThemeIcon>
                <Title order={3} className={classes.featureTitle}>Regulated Fund Operations</Title>
                <Text>
                  Our platform is built specifically for fund operations, with comprehensive support for
                  NAV calculations, unit pricing, fund accounting, and regulatory reporting. We handle complex
                  fee structures, multiple share classes, and currency conversions while maintaining full
                  compliance with MAS regulations. Our automated systems ensure accurate daily NAV calculations,
                  proper handling of subscriptions and redemptions, and timely regulatory filings.
                </Text>
              </Stack>
              
              <Stack className={classes.featureBlock}>
                <ThemeIcon size={60} radius="md" className={classes.iconAlt}>
                  <IconCoin size={rem(30)} stroke={1.5} />
                </ThemeIcon>
                <Title order={3} className={classes.featureTitle}>Investor Service Excellence</Title>
                <Text>
                  We provide a complete investor servicing solution for funds, including automated
                  subscription and redemption processing, dividend distribution, and comprehensive reporting.
                  Our platform handles complex scenarios like switching between share classes, systematic
                  investment plans, and regular income distributions. We maintain detailed audit trails and
                  ensure all operations meet regulatory requirements for investor protection.
                </Text>
              </Stack>
            </SimpleGrid>
          </Paper>
        </Box>

        {/* Core capabilities section */}
        <Box mt={60}>
          <Title order={2} className={classes.sectionTitle} ta="center" mb={40}>
            Fund <span className={classes.highlight}>Capabilities</span>
          </Title>
          
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Paper withBorder p="xl" radius="lg" h="100%" className={classes.card}>
                <div className={classes.cardInner}>
                  <ThemeIcon size={50} radius="md" className={classes.iconSmall}>
                    <IconBuildingBank size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <Title order={4} mt="md" className={classes.cardTitle}>Fund Operations</Title>
                  <Text mt="sm">
                    Comprehensive fund operations including daily NAV calculations, unit pricing,
                    fund accounting, and financial reporting. Supports multiple share classes, currencies,
                    and complex fee structures with built-in audit trails and regulatory controls.
                  </Text>
                </div>
              </Paper>
            </motion.div>
            
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
            >
              <Paper withBorder p="xl" radius="lg" h="100%" className={classes.card}>
                <div className={classes.cardInner}>
                  <ThemeIcon size={50} radius="md" className={classes.iconSmall}>
                    <IconUsers size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <Title order={4} mt="md" className={classes.cardTitle}>Investor Services</Title>
                  <Text mt="sm">
                    End-to-end fund investor servicing including subscription processing,
                    redemption handling, dividend distribution, and transfer agency services.
                    Supports systematic investment plans, switching between share classes,
                    and regular income distributions.
                  </Text>
                </div>
              </Paper>
            </motion.div>
            
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.whileInView}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <Paper withBorder p="xl" radius="lg" h="100%" className={classes.card}>
                <div className={classes.cardInner}>
                  <ThemeIcon size={50} radius="md" className={classes.iconSmall}>
                    <IconReportAnalytics size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <Title order={4} mt="md" className={classes.cardTitle}>Compliance & Reporting</Title>
                  <Text mt="sm">
                    Integrated compliance functions for mutual funds including MAS regulatory reporting,
                    investment guideline monitoring, and AML/KYC verification. Automated generation of
                    fund factsheets, annual reports, and regulatory filings with built-in validation.
                  </Text>
                </div>
              </Paper>
            </motion.div>
          </SimpleGrid>
        </Box>
        
        {/* Future section */}
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Box mt={60} mb={30}>
            <Paper withBorder p="xl" radius="lg" className={classes.futureSection}>
              <Title order={2} mb="xl" ta="center" className={classes.futureTitle}>
                The Future of Fund Management
              </Title>
              <Text ta="center" size="lg" px={{ base: 0, md: 80 }} mb="xl">
                AAMA.io is not just a fund management platform—it's a vision for the future of regulated fund operations.
                We're building the infrastructure that will power the next generation of funds, making them more
                efficient, transparent, and accessible while maintaining the highest standards of regulatory compliance.
                Our platform combines proven fund expertise with modern technology to create a new standard
                for fund management.
              </Text>
              
              <Divider my="xl" />
              
              <Box ta="center" className={classes.comingSoonWrapper}>
                <Badge 
                  size="xl" 
                  radius="sm" 
                  className={classes.futureBadge}
                >
                  Onchain fund management (Coming Soon)
                </Badge>
                <Text ta="center" mt="xl" size="md" c="dimmed" maw={700} mx="auto">
                  We are working on new platform features to enable onchain fund management. The platform will enable fund managers to tokenize their funds and list them on EVM-compatible blockchains.
                  Contat us for early access.
                </Text>
                
                <Group justify="center" mt="xl">
                  <Button
                    size="lg"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    rightSection={<IconArrowRight size={18} />}
                    component={Link}
                    href="/contact"
                  >
                    Get Started Today
                  </Button>
                </Group>
                
                <div className={classes.glowOrb} />
              </Box>
            </Paper>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
} 
import { Container, Text, Title, ThemeIcon, Group, rem, Badge, Paper, SimpleGrid, List, Divider, Box, Stack } from '@mantine/core';
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
            AAMA.io combines traditional financial expertise with blockchain technology to create 
            a comprehensive platform that addresses the evolving needs of fund managers and investors.
            Our solution streamlines operations, enhances transparency, and enables new investment models
            while maintaining regulatory compliance.
          </Text>
        </motion.div>

        {/* First section - overview paper */}
        <Box mt={50}>
          <Paper withBorder p="xl" radius="lg" className={classes.overviewPaper}>
            <div className={classes.paperGlow} />
            <Title order={2} className={classes.paperTitle} mb="xl">Bridging Traditional Finance & Blockchain</Title>
            <Text size="lg" mb="xl">
              The fund management industry stands at a crossroads. While traditional finance offers stability 
              and regulatory clarity, blockchain technology provides unprecedented transparency, efficiency, 
              and democratization of investment opportunities. AAMA.io is uniquely positioned at this 
              intersection, offering a hybrid approach that leverages the strengths of both worlds to deliver
              a future-proof platform for fund managers who seek innovation without compromising on security
              or compliance.
            </Text>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Stack className={classes.featureBlock}>
                <ThemeIcon size={60} radius="md" className={classes.icon}>
                  <IconDeviceAnalytics size={rem(30)} stroke={1.5} />
                </ThemeIcon>
                <Title order={3} className={classes.featureTitle}>Traditional Finance Foundation</Title>
                <Text>
                  Our platform is built on solid financial principles and compliance frameworks, ensuring that 
                  funds managed through AAMA meet all regulatory requirements. We support IFRS-compliant accounting, 
                  comprehensive reporting, and established portfolio management practices that institutional 
                  investors expect. This foundation includes automated NAV calculations, support for multiple asset
                  classes, customizable fee structures, and financial reporting that meets industry standards.
                </Text>
              </Stack>
              
              <Stack className={classes.featureBlock}>
                <ThemeIcon size={60} radius="md" className={classes.iconAlt}>
                  <IconCoin size={rem(30)} stroke={1.5} />
                </ThemeIcon>
                <Title order={3} className={classes.featureTitle}>Blockchain Innovation</Title>
                <Text>
                  By integrating blockchain technology, we enable new possibilities for fund managers: tokenization 
                  of assets, smart contract automation, transparent record-keeping, and fractional ownership. 
                  This reduces operational overhead, increases trust, and opens up new investment models. Our
                  blockchain-ready infrastructure provides an evolutionary path to on-chain fund management,
                  allowing traditional funds to gradually adopt distributed ledger technology at their own pace.
                </Text>
              </Stack>
            </SimpleGrid>
          </Paper>
        </Box>

        {/* Core capabilities section */}
        <Box mt={60}>
          <Title order={2} className={classes.sectionTitle} ta="center" mb={40}>
            Core <span className={classes.highlight}>Capabilities</span>
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
                  <Title order={4} mt="md" className={classes.cardTitle}>Fund Accounting & Administration</Title>
                  <Text mt="sm">
                    Comprehensive accounting engine with automated NAV calculations, reconciliation workflows, and 
                    financial statement generation. Supports multiple share classes, currencies, and fee structures
                    with built-in audit trails and accounting controls.
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
                  <Title order={4} mt="md" className={classes.cardTitle}>Investor Relationship Management</Title>
                  <Text mt="sm">
                    End-to-end investor servicing from onboarding through the entire investment lifecycle. 
                    Includes subscription processing, capital calls, distributions, transfer agency services,
                    investor communications, and customizable reporting.
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
                  <Title order={4} mt="md" className={classes.cardTitle}>Risk & Compliance Management</Title>
                  <Text mt="sm">
                    Integrated compliance functions including automated risk monitoring, regulatory reporting,
                    investment guideline monitoring, and AML/KYC verification. Configurable compliance rules
                    engine adapts to different jurisdictions and regulatory frameworks.
                  </Text>
                </div>
              </Paper>
            </motion.div>
          </SimpleGrid>
        </Box>

        {/* Technology section */}
        <Box mt={60}>
          <Paper withBorder p="xl" radius="lg" className={classes.overviewPaper}>
            <div className={classes.paperGlow} />
            <Title order={2} className={classes.paperTitle} mb="xl">Technology That Sets Us Apart</Title>
            
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
              <div className={classes.techFeatureWrapper}>
                <div className={classes.techFeature}>
                  <ThemeIcon size={50} radius="md" className={classes.iconSmall}>
                    <IconShield size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <div>
                    <Title order={4}>Enterprise-grade Security</Title>
                    <Text size="md" mt="xs">
                      Our platform implements military-grade security, including AES-256 encryption at rest and in transit, 
                      multi-factor authentication, role-based access controls, and periodic penetration testing by 
                      independent security experts. All sensitive data is handled according to ISO 27001 standards.
                    </Text>
                  </div>
                </div>
                
                <div className={classes.techFeature}>
                  <ThemeIcon size={50} radius="md" className={classes.iconSmall}>
                    <IconComponents size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <div>
                    <Title order={4}>Modular Architecture</Title>
                    <Text size="md" mt="xs">
                      Our flexible, microservices-based architecture allows fund managers to select only the components they need, 
                      creating a customized solution that adapts to their specific requirements. Each module is independently 
                      scalable and can be deployed based on your fund's unique operational requirements.
                    </Text>
                  </div>
                </div>
              </div>
              
              <div className={classes.techFeatureWrapper}>
                <div className={classes.techFeature}>
                  <ThemeIcon size={50} radius="md" className={classes.iconSmall}>
                    <IconWorld size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <div>
                    <Title order={4}>Global Compliance Framework</Title>
                    <Text size="md" mt="xs">
                      Our regulatory technology is designed to help funds navigate complex regulatory environments across
                      Singapore, Hong Kong, and other APAC jurisdictions. We offer built-in controls for KYC/AML, FATCA/CRS reporting, 
                      and MAS requirements, with regular updates to reflect changing regulatory landscapes.
                    </Text>
                  </div>
                </div>
                
                <div className={classes.techFeature}>
                  <ThemeIcon size={50} radius="md" className={classes.iconSmall}>
                    <IconRocket size={rem(24)} stroke={1.5} />
                  </ThemeIcon>
                  <div>
                    <Title order={4}>Rapid Deployment</Title>
                    <Text size="md" mt="xs">
                      Our Fund-as-a-Service approach means new funds can be configured and launched in 2-4 weeks 
                      rather than months, drastically reducing time-to-market. Our implementation methodology includes
                      pre-built templates for common fund structures and guided setup processes with expert support.
                    </Text>
                  </div>
                </div>
              </div>
            </SimpleGrid>
          </Paper>
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
                The Future of Fund Management Is Here
              </Title>
              <Text ta="center" size="lg" px={{ base: 0, md: 80 }} mb="xl">
                AAMA.io is not just a fund management platform—it's a vision for the future of finance.
                We're building the infrastructure that will power the next generation of investment vehicles,
                making them more accessible, transparent, and efficient than ever before. Our platform
                combines the best of traditional finance with the transformative potential of blockchain
                technology to create a new standard for fund management.
              </Text>
              
              <Divider my="xl" />
              
              <Box ta="center" className={classes.comingSoonWrapper}>
                <Badge 
                  size="xl" 
                  radius="sm" 
                  className={classes.futureBadge}
                >
                  Coming Soon: On-chain Fund Management
                </Badge>
                <Text ta="center" mt="xl" size="md" c="dimmed" maw={700} mx="auto">
                  Our upcoming blockchain-native fund management tools will enable tokenization of fund units,
                  on-chain NAV calculation, programmable distribution rules, automated compliance, and direct investor governance.
                  These innovations will reduce operational costs, increase liquidity options, and open funds to new investor segments.
                  Join us on this journey to transform the financial landscape.
                </Text>
                
                {/* Simplified glow effect with better performance */}
                <div className={classes.glowOrb} />
              </Box>
            </Paper>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
} 
import { AppShell, Container, Title, Text, Group, Badge, ThemeIcon, Stack, Box, Card, SimpleGrid, useMantineTheme, Button, Anchor, Divider, Paper, Timeline, Grid, Image, List, BackgroundImage, Overlay, RingProgress, Center, Tabs, Accordion } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SEO } from '@/components/SEO/SEO';
import { 
  IconUserCheck, 
  IconSearch, 
  IconCreditCard, 
  IconBuildingBank, 
  IconChartLine, 
  IconArrowBackUp, 
  IconFileReport,
  IconArrowRight,
  IconCalendarEvent,
  IconRocket,
  IconShield,
  IconSettings,
  IconDeviceAnalytics,
  IconDatabase,
  IconUsers,
  IconBriefcase,
  IconReportMoney,
  IconCloudComputing,
  IconCheck,
  IconStar,
  IconArrowUp
} from '@tabler/icons-react';
import classes from '../styles/Solutions.module.css';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from 'react';
import { motion, MotionConfig, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const phaseComponents = [
  {
    phase: 'Onboarding',
    icon: IconUserCheck,
    color: 'indigo',
    components: ['Investor Portal', 'KYC Module', 'Risk Profiling Engine'],
    description: 'Streamlined investor onboarding with automated KYC verification and personalized risk profiling.'
  },
  {
    phase: 'Fund Discovery',
    icon: IconSearch,
    color: 'blue',
    components: ['Fund Investment Planning', 'Investor Portal'],
    description: 'Intuitive fund discovery tools that help investors find opportunities aligned with their investment goals.'
  },
  {
    phase: 'Subscription',
    icon: IconCreditCard,
    color: 'cyan',
    components: ['Investor Portal', 'Back Office', 'Investment Management Portal'],
    description: 'Seamless subscription process with automated payment processing and real-time tracking.'
  },
  {
    phase: 'Custody & Accounting',
    icon: IconBuildingBank,
    color: 'teal',
    components: ['Fund Administration & Accounting Module'],
    description: 'Secure asset custody and comprehensive fund accounting with automated NAV calculations.'
  },
  {
    phase: 'Portfolio Monitoring',
    icon: IconChartLine,
    color: 'green',
    components: ['Investor Portal', 'Fund Administration', 'Investment Manager Portal'],
    description: 'Real-time portfolio monitoring with detailed performance analytics and interactive dashboards.'
  },
  {
    phase: 'Redemption',
    icon: IconArrowBackUp,
    color: 'orange',
    components: ['Investor Portal', 'Administration', 'Automation'],
    description: 'Efficient redemption process with automated processing and transparent fee calculations.'
  },
  {
    phase: 'Reporting & Compliance',
    icon: IconFileReport,
    color: 'red',
    components: ['Administration', 'Automation', 'Audit Trail'],
    description: 'Comprehensive reporting suite with regulatory compliance features and complete audit trails.'
  },
];

const platformFeatures = [
  {
    title: 'Investor Experience',
    icon: IconUsers,
    color: 'blue',
    features: [
      'Self-service investor portal with intuitive dashboard',
      'Mobile-responsive design for on-the-go access',
      'Personalized investment recommendations',
      'Document storage and electronic signatures',
      'Real-time portfolio performance tracking'
    ]
  },
  {
    title: 'Fund Manager Tools',
    icon: IconBriefcase,
    color: 'indigo',
    features: [
      'Comprehensive fund setup and configuration',
      'Investor relationship management',
      'Performance analytics and reporting',
      'Fee management and distribution',
      'Document generation and management'
    ]
  },
  {
    title: 'Administration & Operations',
    icon: IconSettings,
    color: 'green',
    features: [
      'Automated NAV calculations',
      'Subscription and redemption processing',
      'Corporate actions management',
      'Cash flow reconciliation',
      'Financial reporting and statements'
    ]
  },
  {
    title: 'Compliance & Security',
    icon: IconShield,
    color: 'red',
    features: [
      'KYC/AML verification workflows',
      'Regulatory reporting capabilities',
      'Role-based access controls',
      'Data encryption and security',
      'Audit trails and compliance monitoring'
    ]
  }
];

const integrationOptions = [
  {
    title: 'Banking Integrations',
    icon: IconBuildingBank,
    description: 'Connect with major banks and payment processors for seamless fund transfers and reconciliation.'
  },
  {
    title: 'Custodian Services',
    icon: IconDatabase,
    description: 'Integrate with leading custodian services to ensure secure asset management and storage.'
  },
  {
    title: 'Analytics Platforms',
    icon: IconDeviceAnalytics,
    description: 'Connect with popular analytics platforms for enhanced reporting and data visualization.'
  },
  {
    title: 'Cloud Infrastructure',
    icon: IconCloudComputing,
    description: 'Leverage secure cloud infrastructure for scalable and reliable platform performance.'
  }
];

const clientBenefits = [
  {
    title: 'Reduced Operational Costs',
    description: 'Cut operational expenses by up to 40% through automation of manual processes and streamlined workflows.',
    value: '40%',
    icon: IconReportMoney
  },
  {
    title: 'Faster Time to Market',
    description: 'Launch new funds up to 60% faster with our pre-configured templates and automated setup processes.',
    value: '60%',
    icon: IconRocket
  },
  {
    title: 'Enhanced Investor Experience',
    description: 'Improve investor satisfaction and retention with an intuitive portal and transparent reporting.',
    value: '95%',
    icon: IconUsers
  },
  {
    title: 'Regulatory Compliance',
    description: 'Stay compliant with evolving regulations through automated reporting and built-in compliance features.',
    value: '100%',
    icon: IconShield
  },
  {
    title: 'Scalable Operations',
    description: 'Easily scale your fund management operations without proportionally increasing your operational team.',
    value: '3x',
    icon: IconArrowUp
  },
  {
    title: 'Data-Driven Insights',
    description: 'Make informed decisions with comprehensive analytics and performance dashboards.',
    value: '24/7',
    icon: IconDeviceAnalytics
  }
];

const faqItems = [
  {
    value: 'how-it-works',
    title: 'How does your fund management platform work?',
    content: 'Our platform provides a comprehensive infrastructure for fund managers to launch, operate, and grow their funds. It handles everything from investor onboarding and KYC to NAV calculations, reporting, and compliance monitoring - all tailored to Singapore\'s regulatory environment.'
  },
  {
    value: 'compliance',
    title: 'How do you handle regulatory compliance?',
    content: 'We\'ve built MAS compliance requirements directly into our platform core, with specialized modules for PDPA, SFA, and other Singapore regulations. The system automatically tracks regulatory changes, generates necessary reports, and ensures your fund operations meet all applicable standards.'
  },
  {
    value: 'integration',
    title: 'Can I integrate with my existing systems?',
    content: 'Yes, our platform offers comprehensive APIs for seamless integration with banking systems, CRM tools, and accounting software. We support data import/export in various formats to ensure a smooth transition without disrupting your existing infrastructure.'
  },
  {
    value: 'security',
    title: 'How secure is your platform?',
    content: 'Security is our top priority. We implement bank-grade encryption, multi-factor authentication, granular access controls, regular security audits, and ongoing monitoring. Our infrastructure complies with the highest data protection standards required for financial institutions in Singapore.'
  }
];

const solutionTabs = [
  {
    value: 'lifecycle',
    label: 'Investment Lifecycle',
    icon: <IconChartLine size={16} />,
    description: 'End-to-end support for the complete investment journey'
  },
  {
    value: 'features',
    label: 'Platform Features',
    icon: <IconStar size={16} />,
    description: 'Comprehensive tools designed for modern fund management'
  },
  {
    value: 'integrations',
    label: 'Integration Ecosystem',
    icon: <IconDeviceAnalytics size={16} />,
    description: 'Seamless connections with your existing systems'
  },
  {
    value: 'benefits',
    label: 'Client Benefits',
    icon: <IconRocket size={16} />,
    description: 'Measurable advantages for your fund operations'
  }
];

export default function SolutionsPage() {
  const theme = useMantineTheme();

  useEffect(() => {
    (async function() {
      const cal = await getCalApi();
      cal("ui", {
        styles: {
          branding: { brandColor: "#0070f3" }
        }
      });
    })();
  }, []);

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}>
      <AppShell header={{ height: 60 }} padding={0}>
        <SEO 
          title="Investment Fund Solutions | AAMA"
          description="AAMA.io's comprehensive platform solutions for fund managers, covering the entire investment lifecycle from onboarding to reporting and compliance."
          keywords="fund management platform, investment lifecycle, investor onboarding, fund reporting, portfolio monitoring, investment platform, Singapore fund management"
        />
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          {/* Hero Section */}
          <div className={classes.heroWrapper}>
            <div className={classes.heroGrid}>
              <div className={classes.heroGridItem1}></div>
              <div className={classes.heroGridItem2}></div>
              <div className={classes.heroGridItem3}></div>
            </div>
            <Container size="lg" className={classes.heroContainer}>
              <motion.div
                className={classes.heroContent}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge size="lg" radius="sm" className={classes.badge}>Fund Management Solutions</Badge>
                <Title className={classes.heroTitle}>
                  Transforming Fund Management <br />for the <span className={classes.accentText}>Digital Age</span>
                </Title>
                <Text className={classes.heroDescription}>
                  AAMA.io provides a comprehensive technology platform that enables fund managers to launch, 
                  manage, and administer funds throughout the entire investment lifecycle with efficiency and compliance.
                </Text>
                <Group mt="xl">
                  <Button
                    component={Link}
                    href="/contact"
                    size="lg"
                    className={classes.primaryButton}
                    rightSection={<IconArrowRight size={18} />}
                  >
                    Get Started
                  </Button>
                  <Button
                    component="a"
                    href="https://cal.com/aamaio/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    variant="outline"
                    className={classes.outlineButton}
                    leftSection={<IconCalendarEvent size={18} />}
                  >
                    Schedule Demo
                  </Button>
                </Group>
              </motion.div>
              <motion.div
                className={classes.heroAnimation}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Image
                  src="/images/fund-platform-illustration.svg"
                  alt="AAMA Fund Management Platform"
                  style={{ maxWidth: '100%' }}
                  className={classes.heroImage}
                />
                <div className={classes.floatingObject1}></div>
                <div className={classes.floatingObject2}></div>
                <div className={classes.floatingObject3}></div>
              </motion.div>
            </Container>
          </div>

          {/* Key Stats Section */}
          <Container size="lg" className={classes.statsSection}>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
              {[
                { value: '40%', label: 'Cost Reduction', description: 'Lower operational costs' },
                { value: '2 weeks', label: 'Launch Time', description: 'From setup to go-live' },
                { value: '24/7', label: 'Platform Access', description: 'Continuous availability' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper className={classes.statCard} p="md" radius="md" withBorder>
                    <Group>
                      <RingProgress
                        size={80}
                        thickness={8}
                        roundCaps
                        sections={[{ value: (index + 1) * 25, color: 'blue' }]}
                        label={
                          <Center>
                            <IconArrowUp size="1.4rem" stroke={1.5} color={theme.colors.blue[7]} />
                          </Center>
                        }
                      />
                      <div>
                        <Text fw={700} fz="xl" className={classes.statValue}>{stat.value}</Text>
                        <Text fw={700} fz="sm" tt="uppercase">{stat.label}</Text>
                        <Text fz="xs" c="dimmed">{stat.description}</Text>
                      </div>
                    </Group>
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>

          {/* Main Content Tabs */}
          <Container size="lg" py={60}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Title order={2} className={classes.sectionTitle} ta="center" mb="xl">
                Comprehensive <span className={classes.accentText}>Solutions</span> for Fund Managers
              </Title>
              <Text size="lg" ta="center" c="dimmed" mb={40} maw={800} mx="auto">
                Our platform supports the entire investment journey, providing a seamless experience for both fund managers and investors.
              </Text>
            </motion.div>

            <Tabs
              defaultValue="lifecycle"
              variant="pills"
              className={classes.tabs}
              radius="xl"
              keepMounted={false}
            >
              <Tabs.List grow justify="center">
                {solutionTabs.map((tab) => (
                  <Tabs.Tab
                    key={tab.value}
                    value={tab.value}
                    leftSection={tab.icon}
                    className={classes.tab}
                  >
                    {tab.label}
                  </Tabs.Tab>
                ))}
              </Tabs.List>

              <AnimatePresence mode="wait">
                {/* Investment Lifecycle Tab */}
                <Tabs.Panel value="lifecycle" pt="xl">
                  <motion.div
                    key="lifecycle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Text ta="center" c="dimmed" mb={40}>
                      {solutionTabs.find(tab => tab.value === 'lifecycle')?.description}
                    </Text>
                    <Timeline active={-1} bulletSize={30} lineWidth={2}>
                      {phaseComponents.map((item, index) => (
                        <Timeline.Item 
                          key={item.phase} 
                          bullet={<item.icon size={16} />} 
                          title={<Text fw={700} size="lg">{item.phase}</Text>}
                          color={item.color}
                        >
                          <Card shadow="sm" p="lg" radius="md" withBorder mb="lg">
                            <Group gap="xs" mb="md">
                              {item.components.map((component) => (
                                <Badge key={component} color={item.color} variant="light" size="lg">
                                  {component}
                                </Badge>
                              ))}
                            </Group>
                            <Text size="md">{item.description}</Text>
                          </Card>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </motion.div>
                </Tabs.Panel>

                {/* Platform Features Tab */}
                <Tabs.Panel value="features" pt="xl">
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Text ta="center" c="dimmed" mb={40}>
                      {solutionTabs.find(tab => tab.value === 'features')?.description}
                    </Text>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={30}>
                      {platformFeatures.map((category, index) => (
                        <motion.div
                          key={category.title}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: [0.25, 0.1, 0.25, 1.0]
                          }}
                          viewport={{ once: true, margin: "-100px" }}
                        >
                          <Paper
                            className={classes.featureCard}
                            p="xl" 
                            radius="lg" 
                            withBorder
                          >
                            <Group mb="md">
                              <ThemeIcon size={50} radius="md" color={category.color}>
                                <category.icon size={26} />
                              </ThemeIcon>
                              <Title order={3}>{category.title}</Title>
                            </Group>
                            
                            <List
                              spacing="sm"
                              size="md"
                              center
                              icon={
                                <ThemeIcon color={category.color} size={24} radius="xl">
                                  <IconCheck size={14} />
                                </ThemeIcon>
                              }
                            >
                              {category.features.map((feature, idx) => (
                                <List.Item key={idx}>{feature}</List.Item>
                              ))}
                            </List>
                          </Paper>
                        </motion.div>
                      ))}
                    </SimpleGrid>
                  </motion.div>
                </Tabs.Panel>

                {/* Integration Ecosystem Tab */}
                <Tabs.Panel value="integrations" pt="xl">
                  <motion.div
                    key="integrations"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Text ta="center" c="dimmed" mb={40}>
                      {solutionTabs.find(tab => tab.value === 'integrations')?.description}
                    </Text>
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={20}>
                      {integrationOptions.map((integration, index) => (
                        <motion.div
                          key={integration.title}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1,
                            ease: [0.25, 0.1, 0.25, 1.0]
                          }}
                          viewport={{ once: true }}
                        >
                          <Card
                            className={classes.integrationCard}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                          >
                            <Card.Section
                              className={classes.integrationCardHeader}
                              p="md"
                            >
                              <Group justify="center">
                                <ThemeIcon size={40} radius="md" color="blue">
                                  <integration.icon size={24} />
                                </ThemeIcon>
                              </Group>
                            </Card.Section>

                            <Title order={4} ta="center" mt="md" mb="xs">{integration.title}</Title>
                            <Text size="sm" ta="center" c="dimmed">{integration.description}</Text>
                          </Card>
                        </motion.div>
                      ))}
                    </SimpleGrid>
                  </motion.div>
                </Tabs.Panel>

                {/* Client Benefits Tab */}
                <Tabs.Panel value="benefits" pt="xl">
                  <motion.div
                    key="benefits"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Text ta="center" c="dimmed" mb={40}>
                      {solutionTabs.find(tab => tab.value === 'benefits')?.description}
                    </Text>
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={30}>
                      {clientBenefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: [0.25, 0.1, 0.25, 1.0]
                          }}
                          viewport={{ once: true }}
                        >
                          <Card
                            className={classes.benefitCard}
                            shadow="sm"
                            p="lg"
                            radius="md"
                            withBorder
                          >
                            <Group mb="md">
                              <ThemeIcon size={40} radius="xl" color="blue" variant="light">
                                <benefit.icon size={20} />
                              </ThemeIcon>
                              <div>
                                <Text fw={700} fz="xl" className={classes.benefitValue}>{benefit.value}</Text>
                                <Title order={4}>{benefit.title}</Title>
                              </div>
                            </Group>
                            <Text size="sm" c="dimmed">{benefit.description}</Text>
                          </Card>
                        </motion.div>
                      ))}
                    </SimpleGrid>
                  </motion.div>
                </Tabs.Panel>
              </AnimatePresence>
            </Tabs>
          </Container>

          {/* FAQ Section */}
          <div className={classes.faqSection}>
            <Container size="lg">
              <Title order={2} className={classes.sectionTitle} ta="center" mb="sm">
                Frequently Asked <span className={classes.accentText}>Questions</span>
              </Title>
              <Text ta="center" c="dimmed" className={classes.sectionDescription} mb="xl">
                Everything you need to know about our platform
              </Text>

              <Accordion
                variant="separated"
                radius="md"
                className={classes.faqAccordion}
                chevronPosition="right"
              >
                {faqItems.map((item) => (
                  <Accordion.Item key={item.value} value={item.value}>
                    <Accordion.Control>
                      <Text fw={600}>{item.title}</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text size="sm">{item.content}</Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Container>
          </div>

          {/* CTA Section */}
          <div className={classes.ctaSection}>
            <Container size="md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Title order={2} className={classes.ctaTitle} ta="center" mb="md">
                  Ready to Modernize Your <span className={classes.accentText}>Fund Operations?</span>
                </Title>
                <Text size="lg" c="dimmed" ta="center" mb="xl" maw={700} mx="auto" className={classes.ctaText}>
                  Discover how AAMA.io's platform can help you launch and manage funds more efficiently
                  while providing an exceptional experience for your investors.
                </Text>
              </motion.div>

              <div className={classes.ctaShapes}>
                <div className={classes.ctaShape1}></div>
                <div className={classes.ctaShape2}></div>
                <div className={classes.ctaShape3}></div>
              </div>

              <div className={classes.ctaContent}>
                <Box style={{ width: '100%', height: '550px', maxWidth: '100%', margin: '0 auto' }}>
                  <Cal
                    calLink="aamaio/30min"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              </div>
            </Container>
          </div>
        </AppShell.Main>
        <Footer />
      </AppShell>
    </MotionConfig>
  );
} 
import { Container, Title, Text, Grid, ThemeIcon, Button, Group, Tabs, Badge, Paper, Divider, Box, BackgroundImage, Overlay, SimpleGrid, Progress, Center, RingProgress, Tooltip, Image, Accordion, List } from '@mantine/core';
import { IconRocket, IconCheck, IconArrowRight, IconDeviceAirpods, IconDeviceDesktop, IconDeviceMobile, IconBuildingBank, IconActivity, IconLock, IconChartBar, IconUsers, IconWorld, IconGlobe, IconStar, IconFileAnalytics, IconShield, IconChartPie, IconArrowUp, IconCreditCard, IconAlertCircle, IconCoin, IconPlus, IconCurrencyDollar } from '@tabler/icons-react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import classes from './Product.module.css';

const fundTypes = [
  {
    value: 'mutual', label: 'Mutual Funds', icon: <IconBuildingBank size={16} />, description: "Comprehensive management solutions for traditional mutual funds", features: [
      "Advanced NAV automation and reporting",
      "Streamlined investor communication",
      "Regulatory compliance dashboards",
      "Performance analytics and benchmarking",
      "Fee calculation and distribution automation"
    ]
  },
  {
    value: 'venture', label: 'Venture Capital', icon: <IconRocket size={16} />, description: "Specialized tools for venture capital portfolio management", features: [
      "Portfolio company performance tracking",
      "Capital call and distribution management",
      "LP reporting and communication portal",
      "Investment deal flow pipeline",
      "Carry and waterfall calculations"
    ]
  },
  {
    value: 'private', label: 'Private Equity', icon: <IconChartBar size={16} />, description: "End-to-end solutions for private equity fund operations", features: [
      "Complex fee structure management",
      "Portfolio company valuation tools",
      "Capital deployment tracking",
      "Investor commitment management",
      "Customizable reporting templates"
    ]
  },
  {
    value: 'reits', label: 'REITs', icon: <IconUsers size={16} />, description: "Purpose-built tools for real estate investment management", features: [
      "Property portfolio management",
      "Rental income tracking and forecasting",
      "Expense and maintenance scheduling",
      "Dividend calculation and distribution",
      "Occupancy and valuation analytics"
    ]
  },
];

const platformFeatures = [
  {
    icon: IconDeviceDesktop,
    title: "Fund Management Platform",
    features: [
      "Centralized fund operations dashboard",
      "Real-time NAV calculations and reconciliation",
      "Comprehensive compliance monitoring",
      "Customizable reporting templates"
    ]
  },
  {
    icon: IconDeviceMobile,
    title: "Investor Portal",
    features: [
      "Secure investor onboarding with KYC/AML",
      "Real-time portfolio performance tracking",
      "Document repository and e-signatures",
      "Direct communication channels"
    ]
  },
  {
    icon: IconDeviceAirpods,
    title: "Future-Ready Infrastructure",
    features: [
      "API integration with banking systems",
      "Cloud-based secure architecture",
      "Data analytics and reporting engine",
      "Blockchain readiness for future deployment"
    ]
  }
];

const targetIndustries = [
  {
    icon: IconBuildingBank,
    title: "Asset Managers",
    description: "Streamline operations and reduce administrative overhead with automated NAV calculations, compliance monitoring, and investor reporting."
  },
  {
    icon: IconRocket,
    title: "VC/PE Firms",
    description: "Gain comprehensive visibility into portfolio performance with specialized tools for capital calls, distributions, and LP communications."
  },
  {
    icon: IconChartPie,
    title: "REITs",
    description: "Simplify property portfolio management with integrated tools for tracking occupancy, rental income, expenses, and dividend distributions."
  },
  {
    icon: IconShield,
    title: "Financial Institutions",
    description: "Enhance fund infrastructure with robust compliance controls, detailed audit trails, and secure investor management capabilities."
  },
];

const stats = [
  { value: '40%', label: 'Cost reduction', description: 'Average operational cost savings' },
  { value: '2 weeks', label: 'Launch time', description: 'Typical setup for new funds' },
  { value: '99.9%', label: 'Uptime', description: 'Platform reliability record' },
];

const faqItems = [
  {
    value: 'how-it-works',
    title: 'How does the Fund-as-a-Service platform work?',
    content: 'Our platform provides comprehensive infrastructure for fund managers to launch and operate funds efficiently. You configure your fund parameters through our intuitive interface, and our system automates operations from investor onboarding to NAV calculations, reporting, and compliance monitoring.'
  },
  {
    value: 'compliance',
    title: 'How do you handle regulatory compliance?',
    content: 'We\'ve built compliance monitoring and reporting into the core of our platform, with specific modules for Singapore and regional markets. The system automatically tracks regulatory requirements, generates necessary reports, manages investor KYC/AML, and ensures your fund operations meet local regulatory standards.'
  },
  {
    value: 'integration',
    title: 'Does your platform integrate with existing systems?',
    content: 'Yes, our platform offers comprehensive APIs for seamless integration with banking systems, CRM tools, and accounting software. We support data import/export in various formats to ensure smooth transition and continuous operation with your existing infrastructure.'
  },
  {
    value: 'future-plans',
    title: 'What future developments are planned for the platform?',
    content: 'We are continuously enhancing our platform with advanced analytics, AI-powered insights, and additional integrations. Our roadmap includes blockchain capabilities for fund tokenization, which will enable fractional ownership, programmable distributions, and enhanced liquidity options while maintaining robust security and compliance.'
  },
];

export function Product() {
  return (
    <MotionConfig reducedMotion="user" transition={{
      type: "spring",
      bounce: 0.25,
      duration: 0.5
    }}>
      <div className={classes.wrapper}>
        {/* Hero Section with 3D Elements */}
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
              <Badge size="lg" radius="sm" className={classes.badge}>Fund-as-a-Service Platform</Badge>
              <Title className={classes.heroTitle}>
                Launch your fund in days, <br /><span className={classes.accentText}>not months</span>
              </Title>
              <Text className={classes.heroDescription}>
                Our comprehensive platform enables fund managers to launch and operate any fund type with minimal setup time and resources.
              </Text>
              <Group mt="xl">
                <Button
                  component={Link}
                  href="/contact"
                  size="lg"
                  className={classes.primaryButton}
                  rightSection={<IconArrowRight size={18} />}
                >
                  Launch Your Fund
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  size="lg"
                  variant="outline"
                  className={classes.outlineButton}
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
              <div className={classes.floatingObject1}></div>
              <div className={classes.floatingObject2}></div>
              <div className={classes.floatingObject3}></div>
            </motion.div>
          </Container>
        </div>

        {/* Key Stats Section with progress rings */}
        <Container size="lg" className={classes.statsSection}>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper p="md" radius="md" className={classes.statCard}>
                  <Group>
                    <RingProgress
                      size={80}
                      thickness={8}
                      roundCaps
                      sections={[{ value: (index + 1) * 25, color: 'blue' }]}
                      label={
                        <Center>
                          <IconArrowUp size="1.4rem" stroke={1.5} color="var(--mantine-color-blue-7)" />
                        </Center>
                      }
                    />
                    <div>
                      <Text fw={700} fz="xl" className={classes.statCardValue}>{stat.value}</Text>
                      <Text fw={700} fz="sm" tt="uppercase">{stat.label}</Text>
                      <Text fz="xs" c="dimmed">{stat.description}</Text>
                    </div>
                  </Group>
                </Paper>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>

        {/* Industry Cards */}
        <Container size="lg" className={classes.industriesSection}>
          <Title order={2} className={classes.sectionTitle} ta="center" mb="xl">
            Serving <span className={classes.accentText}>diverse</span> fund managers
          </Title>
          <Grid>
            {targetIndustries.map((industry, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper className={classes.industryCard}>
                    <ThemeIcon size={60} radius={60} className={classes.industryIcon}>
                      <industry.icon size={30} />
                    </ThemeIcon>
                    <Title order={4} mt="md" mb="xs">{industry.title}</Title>
                    <Text size="sm" c="dimmed">{industry.description}</Text>
                    <Button variant="subtle" mt="md" rightSection={<IconArrowRight size={14} />} size="sm">
                      Learn more
                    </Button>
                  </Paper>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        </Container>

        {/* Multi-layered Fund Types Section */}
        <div className={classes.fundTypesWrapper}>
          <Container size="lg" className={classes.fundTypesSection}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Title order={2} className={classes.sectionTitle} ta="center">
                One platform for <span className={classes.accentText}>all fund types</span>
              </Title>
              <Text ta="center" c="dimmed" className={classes.sectionDescription}>
                Designed for mutual funds, venture capital, private equity, REITs and more
              </Text>
            </motion.div>

            <Tabs
              defaultValue="mutual"
              variant="pills"
              className={classes.tabs}
              radius="xl"
              keepMounted={false}
            >
              <Tabs.List grow justify="center">
                {fundTypes.map((type) => (
                  <Tabs.Tab
                    key={type.value}
                    value={type.value}
                    leftSection={type.icon}
                    className={classes.tab}
                  >
                    {type.label}
                  </Tabs.Tab>
                ))}
              </Tabs.List>

              <AnimatePresence mode="wait">
                {fundTypes.map((type) => (
                  <Tabs.Panel key={type.value} value={type.value} pt="xl">
                    <motion.div
                      key={type.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Paper shadow="md" p={0} radius="lg" className={classes.tabContent}>
                        <Grid gutter={0}>
                          <Grid.Col span={{ base: 12, md: 6 }} className={classes.tabTextCol}>
                            <div className={classes.tabTextContent}>
                              <Title order={3} className={classes.tabTitle}>{type.label} Management</Title>
                              <Text my="md">
                                {type.description}
                              </Text>
                              <List
                                spacing="sm"
                                size="sm"
                                center
                                icon={
                                  <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconCheck size={14} />
                                  </ThemeIcon>
                                }
                              >
                                {type.features.map((feature) => (
                                  <List.Item key={feature}>{feature}</List.Item>
                                ))}
                              </List>
                              <Button
                                variant="subtle"
                                rightSection={<IconArrowRight size={16} />}
                                mt="xl"
                              >
                                Learn more
                              </Button>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, md: 6 }} className={classes.tabImageCol}>
                            <div className={classes.tabImage} data-type={type.value}>
                              <div className={classes.imageOverlay} />
                              <div className={classes.imageContent}>
                                <Badge size="xl" radius="md" className={classes.imageBadge}>
                                  {type.label}
                                </Badge>
                              </div>
                            </div>
                          </Grid.Col>
                        </Grid>
                      </Paper>
                    </motion.div>
                  </Tabs.Panel>
                ))}
              </AnimatePresence>
            </Tabs>
          </Container>
        </div>

        {/* Platform Features with 3D Cards */}
        <div className={classes.platformSection}>
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Title order={2} className={classes.platformTitle}>
                Three integrated platforms, <br /><span className={classes.accentText}>one unified experience</span>
              </Title>
            </motion.div>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
              {platformFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Paper className={classes.platformCard} p={0} withBorder={false} shadow="none">
                    <motion.div
                      className={classes.platformCardInner}
                      whileHover={{
                        y: -12,
                        rotateX: "2deg",
                        rotateY: "2deg",
                        z: 20,
                        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.1)"
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                    >
                      <ThemeIcon
                        size={60}
                        radius="xl"
                        className={classes.platformIcon}
                      >
                        <feature.icon size={30} />
                      </ThemeIcon>
                      <Title order={3} mt="md" mb="sm">{feature.title}</Title>
                      <div className={classes.featuresGrid}>
                        {feature.features.map((item, idx) => (
                          <motion.div
                            key={idx}
                            className={classes.featureItem}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.3 + (idx * 0.07)
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                              backgroundColor: "var(--mantine-color-blue-0)",
                              x: 2,
                              z: 5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <IconCheck size={16} className={classes.checkIcon} />
                            <Text size="sm">{item}</Text>
                          </motion.div>
                        ))}
                      </div>
                      <Button
                        variant="subtle"
                        className={classes.learnMoreButton}
                        rightSection={<IconArrowRight size={14} />}
                        mt="xl"
                      >
                        Explore
                      </Button>
                    </motion.div>
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </div>

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

        {/* CTA Section with Floating Elements */}
        <div className={classes.ctaSection}>
          <Container size="lg">
            <Box py={40} className={classes.simplifiedCta}>
              <Title ta="center" className={classes.ctaTitle}>Ready to launch your fund?</Title>
              <Text ta="center" className={classes.ctaText} maw={700} mx="auto" mb={40}>
                Our platform helps fund managers launch and operate efficiently with minimal setup time. Get started today.
              </Text>
              <Group justify="center">
                <Button
                  component={Link}
                  href="/contact"
                  size="lg"
                  className={classes.primaryButton}
                  rightSection={<IconArrowRight size={18} />}
                >
                  Get Started Today
                </Button>
              </Group>
            </Box>
          </Container>
        </div>
      </div>
    </MotionConfig>
  );
} 
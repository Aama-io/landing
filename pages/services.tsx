import { AppShell, Container, Title, Text, Badge, SimpleGrid, Anchor, Group, Button } from '@mantine/core';
import {
  IconBuildingFactory2,
  IconBriefcase,
  IconFileReport,
  IconArrowRight,
  IconCheck,
  IconChevronRight,
  IconExternalLink,
} from '@tabler/icons-react';
import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SEO } from '@/components/SEO/SEO';
import classes from '../styles/Services.module.css';

const services = [
  {
    icon: IconBuildingFactory2,
    title: 'Single-Asset SPVs',
    description:
      'Structure a dedicated Special Purpose Vehicle for a single investment. Ideal for co-investments, real estate deals, or one-off private equity transactions where clean ownership, liability separation, and investor-ready documentation are essential.',
    features: [
      'Purpose-built SPV legal structuring',
      'Clean cap table and investor documentation',
      'MAS-compliant regulatory setup',
      'Seamless handover to fund admin platform',
      'Ongoing SPV administration support',
    ],
    color: 'violet',
  },
  {
    icon: IconBriefcase,
    title: 'VCC for Close-Ended Funds',
    description:
      'Form a Variable Capital Company optimised for private equity, venture capital, or real estate close-ended fund structures. Leverage VCC\'s robust sub-fund segregation and tax efficiency within Singapore\'s MAS regulatory framework.',
    features: [
      'VCC incorporation and MAS registration',
      'Sub-fund structuring and segregation',
      'Close-ended fund constitution drafting',
      'LP/GP agreement support',
      'Transition to aama.io fund admin software',
    ],
    color: 'indigo',
  },
  {
    icon: IconFileReport,
    title: 'Fund Formation Services',
    description:
      'Full-service fund setup from structure selection through to MAS registration and regulatory go-live. We handle the formation complexity so you can focus on your investment strategy — then keep everything running on aama.io\'s platform.',
    features: [
      'Legal structure selection and advisory',
      'MAS CMS licence application support',
      'Fund constitution and offering documents',
      'Investor KYC/AML framework setup',
      'End-to-end platform onboarding',
    ],
    color: 'blue',
  },
];

const steps = [
  {
    number: '01',
    title: 'Formation & Structuring',
    description:
      'Astria Consulting leads the legal structuring — SPV formation, VCC incorporation, or full fund setup — with MAS compliance built in from day one.',
    partner: true,
  },
  {
    number: '02',
    title: 'Platform Onboarding',
    description:
      'Your newly formed fund is configured directly onto aama.io\'s fund administration platform. Investor portal, NAV engine, compliance dashboards — all ready from launch.',
    partner: false,
  },
  {
    number: '03',
    title: 'Ongoing Fund Administration',
    description:
      'aama.io\'s software and services handle all ongoing operations: accounting, investor reporting, capital calls, distributions, and regulatory filings — every cycle, automatically.',
    partner: false,
  },
];

const platformFeatures = [
  'Automated NAV calculations and unit pricing',
  'Capital call and distribution management',
  'Investor portal with real-time reporting',
  'MAS regulatory reporting automation',
  'KYC/AML investor onboarding workflows',
  'Audit trail and compliance monitoring',
  'LP / investor communications hub',
  'Fund accounting and general ledger',
];

export default function ServicesPage() {
  return (
    <MotionConfig reducedMotion="user">
      <AppShell header={{ height: 60 }} padding={0}>
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <SEO
            title="Fund Formation Services | aama.io × Astria Consulting"
            description="aama.io offers end-to-end fund formation services in partnership with Astria Consulting — single-asset SPVs, VCC structures for close-ended funds, and full fund formation — powered by aama.io's fund administration platform."
          />

          <div className={classes.wrapper}>
            {/* Hero */}
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
                  <Badge size="lg" radius="sm" className={classes.heroBadge} mb="md">
                    In Partnership with Astria Consulting
                  </Badge>
                  <Title className={classes.heroTitle}>
                    From fund formation{' '}
                    <span className={classes.accentText}>to full administration</span>
                  </Title>
                  <Text className={classes.heroDescription}>
                    aama.io now covers the entire fund lifecycle — starting from day zero. We partner with{' '}
                    <Anchor
                      href="https://astriaconsulting.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700, textDecoration: 'underline' }}
                    >
                      Astria Consulting
                    </Anchor>{' '}
                    to offer single-asset SPV formation, VCC structuring for close-ended funds, and comprehensive fund formation services — all seamlessly transitioning into aama.io&apos;s fund administration platform for ongoing operations.
                  </Text>
                  <Group className={classes.heroActions}>
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
                      component={Link}
                      href="/product"
                      size="lg"
                      variant="outline"
                      className={classes.secondaryButton}
                    >
                      View Platform
                    </Button>
                  </Group>
                </motion.div>
              </Container>
            </div>

            {/* Partnership Banner */}
            <div className={classes.partnershipSection}>
              <Container size="lg">
                <div className={classes.partnershipInner}>
                  <Text className={classes.partnershipLabel}>
                    Fund formation services delivered in partnership with
                  </Text>
                  <Anchor
                    href="https://astriaconsulting.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.partnershipLink}
                  >
                    Astria Consulting
                  </Anchor>
                  <Text className={classes.partnershipLabel}>
                    · All administration powered by aama.io software
                  </Text>
                  <IconExternalLink size={14} style={{ color: 'var(--mantine-color-violet-5)', opacity: 0.7 }} />
                </div>
              </Container>
            </div>

            {/* Services Cards */}
            <div className={classes.servicesSection}>
              <Container size="lg">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Badge size="md" variant="light" color="violet" className={classes.sectionBadge}>
                    Our Services
                  </Badge>
                  <Title className={classes.sectionTitle}>
                    Three ways to launch your fund
                  </Title>
                  <Text className={classes.sectionDescription}>
                    Whether you&apos;re structuring a single co-investment, forming a VCC for a close-ended strategy, or building a fully-licenced fund from scratch — we handle formation, then run administration on aama.io&apos;s platform.
                  </Text>
                </motion.div>

                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.12 }}
                      viewport={{ once: true }}
                    >
                      <div className={classes.serviceCard}>
                        <div className={classes.serviceCardIcon}>
                          <service.icon size={26} />
                        </div>
                        <Title order={3} className={classes.serviceCardTitle}>
                          {service.title}
                        </Title>
                        <Text className={classes.serviceCardDescription}>
                          {service.description}
                        </Text>
                        <ul className={classes.serviceFeatureList}>
                          {service.features.map((feature) => (
                            <li key={feature} className={classes.serviceFeatureItem}>
                              <IconCheck size={14} className={classes.serviceFeatureCheck} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button
                          component={Link}
                          href="/contact"
                          variant="light"
                          color={service.color}
                          size="sm"
                          rightSection={<IconChevronRight size={14} />}
                          mt="auto"
                        >
                          Enquire
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </SimpleGrid>
              </Container>
            </div>

            {/* How It Works */}
            <div className={classes.howItWorksSection}>
              <Container size="lg">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  style={{ textAlign: 'center', marginBottom: 64 }}
                >
                  <Badge size="md" variant="light" color="violet" mb="sm">
                    The Journey
                  </Badge>
                  <Title className={classes.sectionTitle}>
                    Formation to administration — seamlessly
                  </Title>
                  <Text className={classes.sectionDescription} style={{ margin: '0 auto' }}>
                    Our partnership with Astria Consulting means formation and administration are designed to connect. No handover friction. No duplicate onboarding. One continuous experience.
                  </Text>
                </motion.div>

                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={0}>
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      style={{ display: 'flex', alignItems: 'stretch' }}
                    >
                      <div className={classes.stepCard} style={{ flex: 1 }}>
                        <div className={classes.stepNumber}>{step.number}</div>
                        <Title order={4} className={classes.stepTitle}>
                          {step.title}
                        </Title>
                        <Text className={classes.stepDescription}>{step.description}</Text>
                        {step.partner && (
                          <Badge size="sm" variant="light" color="violet" mt="md">
                            Astria Consulting
                          </Badge>
                        )}
                        {!step.partner && (
                          <Badge size="sm" variant="light" color="indigo" mt="md">
                            aama.io platform
                          </Badge>
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={classes.stepDivider}>
                          <IconChevronRight size={24} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </SimpleGrid>
              </Container>
            </div>

            {/* Platform Section */}
            <div className={classes.platformSection}>
              <Container size="lg">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className={classes.platformCard}>
                    <div className={classes.platformCardBg} />
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
                      <div>
                        <Badge
                          size="md"
                          style={{ background: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                          variant="outline"
                          mb="md"
                        >
                          Powered by aama.io
                        </Badge>
                        <Title className={classes.platformTitle}>
                          Your fund administration platform, ready from launch
                        </Title>
                        <Text className={classes.platformDescription}>
                          Once your fund is formed, it lives on aama.io&apos;s software from day one. NAV calculations, investor reporting, capital calls, compliance monitoring — all automated, all in one place. Built specifically for Singapore-regulated funds.
                        </Text>
                        <Group>
                          <Button
                            component={Link}
                            href="/product"
                            size="md"
                            className={classes.platformButton}
                            rightSection={<IconArrowRight size={16} />}
                          >
                            Explore the Platform
                          </Button>
                          <Button
                            component={Link}
                            href="/contact"
                            size="md"
                            variant="outline"
                            color="white"
                            style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
                          >
                            Book a Demo
                          </Button>
                        </Group>
                      </div>
                      <div>
                        <div className={classes.platformFeatureGrid}>
                          {platformFeatures.map((feature) => (
                            <div key={feature} className={classes.platformFeatureItem}>
                              <IconCheck size={14} className={classes.platformFeatureIcon} />
                              <Text size="sm" style={{ color: 'rgba(255,255,255,0.9)' }}>{feature}</Text>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SimpleGrid>
                  </div>
                </motion.div>
              </Container>
            </div>

            {/* CTA */}
            <div className={classes.ctaSection}>
              <Container size="sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Title className={classes.ctaTitle}>
                    Ready to launch your fund?
                  </Title>
                  <Text className={classes.ctaDescription}>
                    Talk to us about fund formation. We&apos;ll match you with the right structure, handle the setup with Astria Consulting, and have your fund running on aama.io&apos;s platform from day one.
                  </Text>
                  <Group justify="center" gap="md">
                    <Button
                      component={Link}
                      href="/contact"
                      size="lg"
                      color="violet"
                      rightSection={<IconArrowRight size={18} />}
                    >
                      Speak to Our Team
                    </Button>
                    <Button
                      component={Link}
                      href="/pricing"
                      size="lg"
                      variant="outline"
                      color="violet"
                    >
                      View Pricing
                    </Button>
                  </Group>
                </motion.div>
              </Container>
            </div>

            <Footer />
          </div>
        </AppShell.Main>
      </AppShell>
    </MotionConfig>
  );
}

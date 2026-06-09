import { useState } from 'react';
import { Container, Title, Text, Button, Group, ThemeIcon, Accordion } from '@mantine/core';
import {
  IconArrowRight,
  IconCheck,
  IconReportMoney,
  IconUsersGroup,
  IconBuildingBank,
  IconChartBar,
  IconChartPie,
  IconBriefcase,
  IconTrendingUp,
  IconShieldLock,
  IconReportAnalytics,
  IconPlugConnected,
  IconRefresh,
  IconDeviceMobile,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import classes from './Product.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: '40%', label: 'Lower operating cost' },
  { value: '2 weeks', label: 'Typical launch time' },
  { value: '99.9%', label: 'Platform uptime' },
];

const flagships = [
  {
    eyebrow: 'Operations & investor experience',
    title: 'Fund Administration & Investor Portal',
    href: '/products/fund-administration',
    description:
      'A white-labeled LP portal and full back-office administration in one — onboarding, capital calls, distributions, fees, carry, compliance and reporting.',
    image: '/images/fund-investors.png',
    icon: IconReportAnalytics,
    features: [
      'White-labeled investor portal with KYC/AML onboarding',
      'Investor register, cap table and capital calls',
      'Distribution waterfalls, fees and carried interest',
      'MAS-aligned compliance and LP reporting',
    ],
  },
  {
    eyebrow: 'Accounting',
    title: 'Fund Accounting',
    href: '/products/fund-accounting',
    description:
      'A fund-grade accounting engine — double-entry general ledger, automated NAV, waterfalls and 12+ audit-ready reports. Powerful enough to run on its own.',
    image: '/images/fund-detail.png',
    icon: IconReportMoney,
    features: [
      'Double-entry general ledger and chart of accounts',
      'Automated NAV (daily to quarterly)',
      'European & American waterfall distributions',
      '12+ reports: trial balance, balance sheet, P&L, NAV',
    ],
  },
];

const fundTypes = [
  {
    value: 'private',
    label: 'Private Capital (VC/PE)',
    icon: IconChartBar,
    description: 'Purpose-built for venture and private equity fund operations.',
    features: [
      'Capital call and distribution management',
      'Carry and waterfall calculations',
      'Portfolio company performance tracking',
      'LP reporting and communication portal',
    ],
  },
  {
    value: 'family',
    label: 'Family Offices',
    icon: IconBriefcase,
    description: 'Consolidated, multi-entity and multi-asset administration.',
    features: [
      'Multi-entity & multi-asset consolidation',
      'Bespoke portfolio and cash reporting',
      'Capital call and distribution tracking',
      'Consolidated performance analytics',
    ],
  },
  {
    value: 'spv',
    label: 'SPVs & Syndicates',
    icon: IconUsersGroup,
    description: 'Single-asset funds — SPVs and syndicates — administered end to end.',
    features: [
      'Spin up a deal SPV or syndicate in days',
      'Member onboarding, KYC/AML and e-signatures',
      'Lead carry, deal fees and waterfall automation',
      'Deal-by-deal distributions, statements and reporting',
    ],
  },
  {
    value: 'hedge',
    label: 'Hedge Funds',
    icon: IconTrendingUp,
    description: 'Daily accounting across multi-strategy, multi-instrument books.',
    features: [
      'Daily NAV and P&L',
      'Multi-instrument & multi-strategy support',
      'Management and performance fee automation',
      'Risk and exposure dashboards',
    ],
  },
  {
    value: 'reits',
    label: 'REITs',
    icon: IconChartPie,
    description: 'Tools built for real estate investment management.',
    features: [
      'Property portfolio management',
      'Rental income tracking and forecasting',
      'Expense and maintenance scheduling',
      'Dividend calculation and distribution',
    ],
  },
  {
    value: 'mutual',
    label: 'Mutual Funds',
    icon: IconBuildingBank,
    description: 'MAS-compliant operations for Singapore-regulated mutual funds.',
    features: [
      'Daily NAV calculation and unit pricing',
      'MAS-compliant fund operations',
      'Automated subscription and redemption',
      'Dividend distribution and reinvestment',
    ],
  },
];

const capabilities = [
  {
    icon: IconReportAnalytics,
    title: 'Automated NAV & accounting',
    description: 'A complete ledger with automated NAV, valuations and reconciliations across every instrument.',
  },
  {
    icon: IconShieldLock,
    title: 'Compliance & audit',
    description: 'MAS-aligned monitoring, KYC/AML workflows and a fully auditable trail built in.',
  },
  {
    icon: IconReportMoney,
    title: 'Regulatory reporting',
    description: 'IFRS-ready statements and customizable regulatory reporting generated on demand.',
  },
  {
    icon: IconDeviceMobile,
    title: 'Investor experience',
    description: 'A white-labeled, mobile-first portal for onboarding, statements and communications.',
  },
  {
    icon: IconPlugConnected,
    title: 'Integrations',
    description: 'Connect banking, custody and accounting systems through comprehensive APIs.',
  },
  {
    icon: IconRefresh,
    title: 'Scales with you',
    description: 'Launch new funds in weeks and scale operations without scaling your team.',
  },
];

const targetIndustries = [
  {
    icon: IconChartBar,
    title: 'VC / PE Firms',
    description: 'Capital calls, distributions, carry and LP communications in one place.',
    slug: 'vc-pe-firms',
  },
  {
    icon: IconBriefcase,
    title: 'Family Offices',
    description: 'Consolidated multi-entity, multi-asset administration and reporting.',
    slug: 'family-offices',
  },
  {
    icon: IconUsersGroup,
    title: 'SPV & Syndicate Leads',
    description: 'Single-asset funds — SPVs and syndicates — with onboarding, carry, distributions and accounting.',
    slug: 'spv-syndicates',
  },
];

const faqItems = [
  {
    value: 'how-it-works',
    title: 'How does the fund-as-a-service platform work?',
    content:
      'You configure your fund parameters through an intuitive interface, and the platform automates operations from investor onboarding to NAV calculations, accounting, reporting and compliance monitoring — with deep support for mutual, private capital, family office, hedge fund and single-asset SPV / syndicate structures.',
  },
  {
    value: 'compliance',
    title: 'How do you handle regulatory compliance?',
    content:
      'Compliance monitoring and reporting are built into the core of the platform, with modules for MAS requirements and other frameworks. The system tracks regulatory obligations, generates reports, manages investor KYC/AML and keeps your operations audit-ready.',
  },
  {
    value: 'integration',
    title: 'Does the platform integrate with existing systems?',
    content:
      'Yes. The platform offers comprehensive APIs for integration with banking systems, custodians, CRM tools and accounting software, with data import/export in multiple formats for a smooth transition.',
  },
  {
    value: 'instruments',
    title: 'Which instruments and fund types are supported?',
    content:
      'The fund accounting engine is multi-instrument by design — equities, fixed income, derivatives, real assets and private holdings — serving PE, VC, family offices, hedge funds, REITs, mutual funds and single-asset SPVs from a single system.',
  },
];

export function Product() {
  const [activeType, setActiveType] = useState(0);
  const current = fundTypes[activeType];

  return (
    <div className={classes.wrapper}>
      {/* Hero */}
      <section className={classes.hero}>
        <div className={classes.glowA} />
        <div className={`${classes.grid} ${classes.maskFade}`} />
        <Container size="lg" className={classes.heroInner}>
          <motion.div
            className={classes.heroContent}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className={classes.pill}>End-to-end fund management</span>
            <Title className={classes.heroTitle}>
              The operating system for{' '}
              <span className={classes.accent}>modern fund managers.</span>
            </Title>
            <Text className={classes.heroDesc}>
              Two modular products — <strong>Fund Administration</strong> with a white-labeled investor
              portal, and a fund-grade <strong>Fund Accounting</strong> engine — covering your entire
              fund lifecycle. Take one, or both.
            </Text>
            <Group gap="md" justify="center" mt="xl">
              <Button
                component={Link}
                href="/contact"
                size="md"
                className={classes.primaryBtn}
                rightSection={<IconArrowRight size={18} />}
              >
                Book a demo
              </Button>
              <Button component={Link} href="/pricing" size="md" variant="default" className={classes.ghostBtn}>
                View pricing
              </Button>
            </Group>
          </motion.div>

          <motion.div
            className={classes.heroShot}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <div className={classes.frame}>
              <div className={classes.frameBar}>
                <span className={classes.dot} data-c="r" />
                <span className={classes.dot} data-c="y" />
                <span className={classes.dot} data-c="g" />
                <span className={classes.url}>app.aama.io</span>
              </div>
              <Image
                src="/images/client-fund.png"
                alt="aama.io fund management platform"
                width={1280}
                height={820}
                className={classes.shot}
                priority
              />
            </div>
          </motion.div>

          <div className={classes.heroStats}>
            {stats.map((s) => (
              <div key={s.label} className={classes.heroStat}>
                <Text className={classes.heroStatValue}>{s.value}</Text>
                <Text className={classes.heroStatLabel}>{s.label}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Two flagship products */}
      <section className={`${classes.section} sectionMuted`}>
        <Container size="lg">
          <SectionHeading
            eyebrow="Two products, one platform"
            title="Modular by design — take one, or both"
            description="License Fund Administration (with its white-labeled investor portal) and Fund Accounting together, or start with just the piece you need. A manager who self-administers can run on Fund Accounting alone."
          />
          <div className={classes.flagships}>
            {flagships.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className={classes.flagship}>
                  <div className={classes.flagshipBody}>
                    <span className={classes.flagshipEyebrow}>
                      <f.icon size={16} stroke={1.8} />
                      {f.eyebrow}
                    </span>
                    <Text className={classes.flagshipTitle}>{f.title}</Text>
                    <Text className={classes.flagshipDesc}>{f.description}</Text>
                    <ul className={classes.checkList}>
                      {f.features.map((feat) => (
                        <li key={feat}>
                          <IconCheck size={17} className={classes.checkIcon} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={f.href} className={classes.industryLink}>
                      Explore {f.title} <IconArrowRight size={15} />
                    </Link>
                  </div>
                  <div className={classes.flagshipShot}>
                    <Image src={f.image} alt={f.title} width={900} height={580} className={classes.flagshipImg} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Fund types */}
      <section className={classes.section}>
        <Container size="lg">
          <SectionHeading
            eyebrow="Every fund type"
            title="One engine for every structure"
            description="A multi-instrument core that adapts to how each fund actually operates."
          />
          <div className={classes.typeLayout}>
            <div className={classes.typeTabs} role="tablist" aria-label="Fund types">
              {fundTypes.map((t, i) => (
                <button
                  key={t.value}
                  type="button"
                  role="tab"
                  aria-selected={i === activeType}
                  data-active={i === activeType || undefined}
                  className={classes.typeTab}
                  onClick={() => setActiveType(i)}
                >
                  <span className={classes.typeTabIcon}>
                    <t.icon size={18} stroke={1.7} />
                  </span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <div className={classes.typePanel}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <div className={classes.typeHead}>
                    <ThemeIcon size={48} radius="md" className={classes.typeIcon}>
                      <current.icon size={24} stroke={1.7} />
                    </ThemeIcon>
                    <div>
                      <Text className={classes.typeName}>{current.label}</Text>
                      <Text className={classes.typeDesc}>{current.description}</Text>
                    </div>
                  </div>
                  <ul className={classes.typeFeatures}>
                    {current.features.map((feat) => (
                      <li key={feat}>
                        <IconCheck size={17} className={classes.checkIcon} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className={`${classes.section} sectionMuted`}>
        <Container size="lg">
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything to run a fund, in one place"
            description="From the ledger to the investor inbox — the operational backbone for boutique and mid-sized fund managers."
          />
          <div className={classes.capGrid}>
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <div className={classes.capCard}>
                  <span className={classes.capIcon}>
                    <c.icon size={22} stroke={1.7} />
                  </span>
                  <Text className={classes.capTitle}>{c.title}</Text>
                  <Text className={classes.capDesc}>{c.description}</Text>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Who we serve */}
      <section className={classes.section}>
        <Container size="lg">
          <SectionHeading eyebrow="Solutions" title="Built for your kind of fund" description="Whatever you run, see the mix of products that fits — and how teams like yours put aama.io to work." />
          <div className={classes.industryGrid}>
            {targetIndustries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 4) * 0.06}>
                <Link href={`/solutions/${ind.slug}`} className={classes.industryCard}>
                  <span className={classes.industryIcon}>
                    <ind.icon size={22} stroke={1.7} />
                  </span>
                  <Text className={classes.industryTitle}>{ind.title}</Text>
                  <Text className={classes.industryDesc}>{ind.description}</Text>
                  <span className={classes.industryLink}>
                    Learn more <IconArrowRight size={15} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className={`${classes.section} sectionMuted`}>
        <Container size="sm">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <Accordion
            variant="separated"
            radius="md"
            chevronPosition="right"
            className={classes.faq}
            mt={40}
            defaultValue="how-it-works"
          >
            {faqItems.map((item) => (
              <Accordion.Item key={item.value} value={item.value} className={classes.faqItem}>
                <Accordion.Control>
                  <Text fw={600} c="var(--text-strong)">
                    {item.title}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text size="sm" c="dimmed" lh={1.65}>
                    {item.content}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </section>
    </div>
  );
}

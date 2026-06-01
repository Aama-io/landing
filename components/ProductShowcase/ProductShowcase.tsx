import { useState } from 'react';
import { Container, Text } from '@mantine/core';
import {
  IconReportMoney,
  IconLayoutDashboard,
  IconCoin,
  IconUsersGroup,
  IconStack2,
  IconSettings,
  IconArrowRight,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeading } from '../ui/SectionHeading';
import classes from './ProductShowcase.module.css';

const products = [
  {
    title: 'Fund Accounting',
    description:
      'Multi-instrument fund accounting and administration for PE, VC, family offices, hedge funds and mutual funds — a complete general ledger, automated NAV and IFRS-ready reporting across every asset class.',
    image: '/images/fund-detail.png',
    icon: IconReportMoney,
    features: ['All fund types & instruments', 'Automated NAV & ledger', 'IFRS-ready reporting'],
  },
  {
    title: 'Investor / LP Portal',
    description:
      'A white-labeled investor and LP portal with full fund-admin capabilities — KYC/AML onboarding, real-time positions, capital calls, statements and a secure document vault.',
    image: '/images/fund-investors.png',
    icon: IconUsersGroup,
    features: ['KYC/AML onboarding', 'Real-time LP positions', 'Document vault'],
  },
  {
    title: 'Fund Dashboard',
    description:
      'A real-time overview of every fund — NAV, performance analytics, asset allocation and operational health in one view.',
    image: '/images/client-fund.png',
    icon: IconLayoutDashboard,
    features: ['Real-time NAV', 'Performance analytics', 'Asset allocation'],
  },
  {
    title: 'Capital Calls',
    description:
      'Streamlined capital call workflows with automated notifications, payment tracking and built-in compliance monitoring.',
    image: '/images/capital-call.png',
    icon: IconCoin,
    features: ['Automated calls', 'Payment tracking', 'Compliance reports'],
  },
  {
    title: 'Share Classes & Instruments',
    description:
      'Flexible share class and instrument setup with customizable fee structures, voting rights and distribution preferences.',
    image: '/images/share-class.png',
    icon: IconStack2,
    features: ['Fee structures', 'Voting rights', 'Distribution rules'],
  },
  {
    title: 'Configuration',
    description:
      'Comprehensive fund setup and configuration with regulatory compliance and complete audit trails.',
    image: '/images/settings.png',
    icon: IconSettings,
    features: ['Compliance setup', 'Audit trails', 'Risk management'],
  },
];

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const current = products[active];

  return (
    <section className={`${classes.wrapper} section sectionMuted`}>
      <Container size="lg">
        <SectionHeading
          eyebrow="Product tour"
          title="Two flagship products, one platform"
          description="A multi-instrument Fund Accounting engine for fund administrators, and a white-labeled Investor/LP portal — together covering PE, VC, family offices, hedge funds and mutual funds, end to end."
        />

        <div className={classes.layout}>
          <div className={classes.tabs} role="tablist" aria-label="Product features">
            {products.map((p, i) => (
              <button
                key={p.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={classes.tab}
                data-active={i === active || undefined}
                onClick={() => setActive(i)}
              >
                <span className={classes.tabIcon}>
                  <p.icon size={20} stroke={1.7} />
                </span>
                <span className={classes.tabText}>
                  <span className={classes.tabTitle}>{p.title}</span>
                  <span className={classes.tabDesc}>{p.description}</span>
                  <span className={classes.tabChips}>
                    {p.features.map((f) => (
                      <span key={f} className={classes.chip}>
                        {f}
                      </span>
                    ))}
                  </span>
                </span>
                <IconArrowRight size={18} className={classes.tabArrow} />
              </button>
            ))}
          </div>

          <div className={classes.preview}>
            <div className={classes.frame}>
              <div className={classes.frameBar}>
                <span className={classes.dot} data-c="r" />
                <span className={classes.dot} data-c="y" />
                <span className={classes.dot} data-c="g" />
                <span className={classes.url}>app.aama.io</span>
              </div>
              <div className={classes.frameBody}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.image}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={current.image}
                      alt={current.title}
                      width={1280}
                      height={820}
                      className={classes.shot}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <Text className={classes.caption}>{current.title}</Text>
          </div>
        </div>
      </Container>
    </section>
  );
}

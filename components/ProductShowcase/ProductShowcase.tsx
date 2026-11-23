import { useState } from 'react';
import { Container, Text } from '@mantine/core';
import {
  IconReportMoney,
  IconLayoutDashboard,
  IconCoin,
  IconUsersGroup,
  IconUserCheck,
  IconClipboardList,
  IconStack2,
  IconSettings,
  IconRocket,
  IconArrowRight,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeading } from '../ui/SectionHeading';
import classes from './ProductShowcase.module.css';

const products = [
  {
    title: 'General ledger',
    group: 'Fund Accounting',
    description:
      'A double-entry ledger for the fund. Accruals post by rule, and the trial balance comes off those same books.',
    image: '/images/fund-detail.png',
    alt: 'Fund accounting screen showing the general ledger, trial balance and accruals',
    icon: IconReportMoney,
    features: ['Trial balance', 'Auto-booked accruals', 'Interest accrual'],
  },
  {
    title: 'NAV across funds',
    group: 'Fund Accounting',
    description:
      'Gross, net and per-unit NAV for every fund you run, closed on that fund’s calendar.',
    image: '/images/client-fund.png',
    alt: 'Multi-fund view with gross, net and per-unit NAV',
    icon: IconLayoutDashboard,
    features: ['Gross, net and per-unit', 'Holiday-aware close', 'Multi-currency reports'],
  },
  {
    title: 'Fees & waterfalls',
    group: 'Fund Accounting',
    description:
      'European or American waterfall, with the hurdle, catch-up and any side letter applied to that LP.',
    image: '/images/share-class.png',
    alt: 'Share class setup for fees, waterfalls and side-letter overrides',
    icon: IconStack2,
    features: ['European & American', 'Hurdle and catch-up', 'Side-letter overrides'],
  },
  {
    title: 'Approvals',
    group: 'Fund Accounting',
    description:
      'Initiate, post, approve, archive. The entry is not on the books until the right person accepts it.',
    image: '/images/settings.png',
    alt: 'Approval workflow from initiate to archive, with an audit log on the entry',
    icon: IconSettings,
    features: ['Post, then approve', 'Role-based access', 'Audit log on the entry'],
  },
  {
    title: 'LP onboarding',
    group: 'Fund Administration & LP Portal',
    description:
      'Investors apply, sign and clear KYC in one workflow. Your team sees the status on the same list.',
    image: '/images/fund-investors.png',
    alt: 'Investor list with KYC status for LP onboarding',
    icon: IconUserCheck,
    features: ['E-sign subscription', 'KYC/AML checks', 'Entity and joint holders'],
  },
  {
    title: 'Investor register',
    group: 'Fund Administration & LP Portal',
    description:
      'Commitments, unfunded capital and ownership stay on one register, including transfers.',
    image: '/images/fund-investors.png',
    alt: 'Investor register with commitments, unfunded capital and ownership',
    icon: IconClipboardList,
    features: ['Commitments and unfunded', 'Cap table', 'Transfers'],
  },
  {
    title: 'Calls & distributions',
    group: 'Fund Administration & LP Portal',
    description:
      'Call from unfunded commitments, match the payment, then issue the distribution from the same register.',
    image: '/images/capital-call.png',
    alt: 'Capital call allocation, bank reconciliation and distribution notices',
    icon: IconCoin,
    features: ['Call allocation', 'Bank reconciliation', 'Distribution notices'],
  },
  {
    title: 'LP portal',
    group: 'Fund Administration & LP Portal',
    description:
      'LPs see positions, statements and performance on your brand, across every fund they hold.',
    image: '/images/fund-investors.png',
    alt: 'LP portal with capital account statements, performance and documents',
    icon: IconUsersGroup,
    features: ['Capital account statements', 'IRR, MOIC, TVPI', 'Notices and documents'],
  },
  {
    title: 'Form the vehicle',
    group: 'SPV Fund Management',
    description:
      'Stand up a single- or multi-asset SPV from a template, with its own cap table.',
    image: '/images/client-fund.png',
    alt: 'SPV dashboard for a vehicle stood up from a template',
    icon: IconRocket,
    features: ['Templated vehicle', 'Automated cap table', 'Many SPVs, one dashboard'],
  },
  {
    title: 'Onboard members',
    group: 'SPV Fund Management',
    description:
      'Members commit with KYC and e-sign in the same steps used for a fund.',
    image: '/images/fund-investors.png',
    alt: 'Member onboarding with KYC and signed commitments',
    icon: IconUserCheck,
    features: ['KYC/AML checks', 'E-sign commitments', 'Entity and joint holders'],
  },
  {
    title: 'Carry & waterfall',
    group: 'SPV Fund Management',
    description:
      'Lead carry, hurdle and catch-up, then a deal-by-deal waterfall with per-member side letters.',
    image: '/images/share-class.png',
    alt: 'SPV economics with lead carry, catch-up and a deal-by-deal waterfall',
    icon: IconStack2,
    features: ['Lead carry and catch-up', 'Deal-by-deal waterfall', 'Side-letter overrides'],
  },
  {
    title: 'Calls & payouts',
    group: 'SPV Fund Management',
    description:
      'Call capital against commitments, match what lands, and pay the distribution out to members.',
    image: '/images/capital-call.png',
    alt: 'SPV capital calls, payment matching and distribution notices',
    icon: IconCoin,
    features: ['Capital calls', 'Payment matching', 'Distribution notices'],
  },
];

// Three product lines, matching PLATFORM_LINKS and the product overview page.
const GROUP_ORDER = ['Fund Accounting', 'Fund Administration & LP Portal', 'SPV Fund Management'] as const;

const GROUP_HINT: Record<(typeof GROUP_ORDER)[number], string> = {
  'Fund Accounting': 'Close the books across every fund',
  'Fund Administration & LP Portal': 'Onboard LPs and move capital',
  'SPV Fund Management': 'Run one deal on fund-grade books',
};

export function ProductShowcase() {
  const [group, setGroup] = useState<(typeof GROUP_ORDER)[number]>(GROUP_ORDER[0]);
  const [active, setActive] = useState(0);
  const current = products[active];

  const selectGroup = (next: (typeof GROUP_ORDER)[number]) => {
    setGroup(next);
    const index = products.findIndex((p) => p.group === next);
    if (index >= 0) {setActive(index);}
  };

  return (
    <section className={`${classes.wrapper} section sectionMuted`}>
      <Container size="xl">
        <SectionHeading
          eyebrow="Product tour"
          title="Three products, one platform"
          description="Fund administration software for the books, the LP portal and the deal vehicle. Administrators, managers and syndicate leads start with the product they need — or license all three."
        />

        <div className={classes.switch} role="tablist" aria-label="Products">
          {GROUP_ORDER.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={name === group}
              className={classes.switchBtn}
              data-active={name === group || undefined}
              onClick={() => selectGroup(name)}
            >
              <span className={classes.switchName}>{name}</span>
              <span className={classes.switchHint}>{GROUP_HINT[name]}</span>
            </button>
          ))}
        </div>

        <div className={classes.layout}>
          <div className={classes.tabs} role="tablist" aria-label={`${group} features`}>
            {products.map((p, i) => {
              if (p.group !== group) {return null;}
              return (
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
                    <ul className={classes.tabChips}>
                      {p.features.map((f) => (
                        <li key={f} className={classes.chip}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </span>
                  <IconArrowRight size={18} className={classes.tabArrow} />
                </button>
              );
            })}
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
                    key={current.title}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={current.image}
                      alt={current.alt}
                      width={1280}
                      height={820}
                      sizes="(max-width: 64em) 100vw, 720px"
                      className={classes.shot}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <Text className={classes.caption}>{group} · {current.title}</Text>
          </div>
        </div>
      </Container>
    </section>
  );
}

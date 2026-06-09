import {
  IconReportAnalytics, IconReportMoney,
  IconDeviceMobile, IconChartBar, IconRefresh, IconShieldCheck,
  IconBolt,
} from '@tabler/icons-react';
import type { DetailData, RelatedLink } from '@/components/ProductDetail/ProductDetail';

// The platforms aama.io licenses — modular: take one, or both. Fund
// Administration (which includes the white-labeled investor portal) and Fund
// Accounting share one data model; a manager who self-administers can run on
// Fund Accounting alone.
export const PLATFORMS: DetailData[] = [
  {
    slug: 'fund-administration',
    name: 'Fund Administration & Investor Portal',
    shortName: 'Fund Administration & LP Portal',
    category: 'Operations & investor experience',
    icon: IconReportAnalytics,
    image: '/images/fund-investors.png',
    heroDescription:
      'One system for your investors and your back office — a white-labeled LP portal plus full fund administration: onboarding, capital calls, distributions, fees, carry, compliance and reporting.',
    description:
      'aama.io fund administration software with a built-in white-labeled LP / investor portal — KYC/AML onboarding, investor register and cap table, capital calls and distributions, fee and carried-interest calculations, compliance monitoring and LP reporting.',
    keywords: 'fund administration software, LP portal, investor portal, KYC AML onboarding, capital calls, distributions, cap table, carried interest, waterfall, LP reporting, fund admin',
    benefits: [
      { title: 'Digital-first onboarding', description: 'Investors apply, sign and fund online — KYC/AML built in.', icon: IconDeviceMobile },
      { title: 'Real-time transparency', description: 'A white-labeled portal with live positions, statements and documents.', icon: IconChartBar },
      { title: 'Automate the back office', description: 'Capital calls, distributions, fees and carry — automated and tracked.', icon: IconBolt },
      { title: 'Audit-ready always', description: 'A complete, time-stamped audit trail across every action.', icon: IconShieldCheck },
    ],
    featureGroups: [
      { title: 'Investor onboarding & KYC', description: 'Bring investors on board in minutes.', items: ['Online subscription with e-signatures', 'KYC/AML and accreditation checks', 'Entity and joint-holder support', 'Automated reminders and status tracking'] },
      { title: 'Investor portal & reporting', description: 'A white-labeled window into every investment.', items: ['Real-time positions and valuations', 'Capital account statements', 'Performance metrics (IRR, MOIC, TVPI)', 'Secure messaging and document vault'] },
      { title: 'Investor register & cap table', description: 'A single source of truth for ownership.', items: ['Investor register and cap table', 'Commitments and unfunded capital', 'Share classes and side letters', 'Transfers and ownership changes'] },
      { title: 'Capital calls & distributions', description: 'Move capital with confidence.', items: ['Automated capital call notices', 'Distribution waterfalls and notices', 'Payment tracking and reconciliation', 'Drawdown and recallable capital'] },
      { title: 'Fees & carry', description: 'Get the economics right.', items: ['Management fee accrual and billing', 'Carried interest and waterfalls', 'Hurdles, catch-up and clawback', 'Fee offsets and rebates'] },
      { title: 'Compliance & reporting', description: 'Stay audit- and regulator-ready.', items: ['MAS-aligned compliance monitoring', 'LP reporting packs', 'Audit trail and document vault', 'Custom and regulatory reports'] },
    ],
    keyFeatures: [
      { title: 'White-label', description: 'Your brand and domain — investors never see ours.' },
      { title: 'Mobile-first', description: 'A responsive investor portal that works on every device.' },
      { title: 'Multi-fund', description: 'One investor login across every fund and vehicle they hold.' },
      { title: 'Waterfall automation', description: 'European, American and hybrid waterfalls calculated automatically.' },
      { title: 'Multi-entity', description: 'Run many funds and vehicles from one dashboard.' },
      { title: 'Works with Fund Accounting', description: 'Shares one data model with the accounting ledger.' },
    ],
    faqs: [
      { q: 'Is the investor portal part of this product?', a: 'Yes — the white-labeled LP / investor portal and the back-office administration are one product. Investors get onboarding, real-time positions and statements while your team runs servicing from the same system.' },
      { q: 'Does it handle KYC/AML onboarding?', a: 'Yes — online subscription with e-signatures, KYC/AML and accreditation checks, and a complete audit trail.' },
      { q: 'Which waterfall structures are supported?', a: 'European (whole-fund), American (deal-by-deal) and hybrid — with preferred return, catch-up and clawback.' },
      { q: 'Can investors see multiple funds?', a: 'Yes — an investor sees every fund and vehicle they hold under a single login.' },
      { q: 'Can I run multiple funds?', a: 'Yes — multi-entity by design, so you manage many funds and vehicles from one dashboard.' },
      { q: 'Does it work with Fund Accounting?', a: 'Yes — Fund Administration and Fund Accounting share one data model, so administration, the portal and the ledger stay in sync. You can use either on its own.' },
    ],
  },
  {
    slug: 'fund-accounting',
    name: 'Fund Accounting',
    shortName: 'Fund Accounting',
    category: 'Accounting',
    icon: IconReportMoney,
    image: '/images/fund-detail.png',
    heroDescription:
      'A fund-grade accounting engine — full double-entry general ledger, automated NAV, European & American waterfalls and 12+ audit-ready reports. Purpose-built for PE, VC and alternative funds, and powerful enough to run on its own.',
    description:
      'aama.io fund accounting software — a double-entry general ledger with chart of accounts, automated NAV (daily to quarterly), European & American waterfalls, per-investor side letters, multi-currency support, securities valuation and 12+ fund reports. Purpose-built for PE, VC and alternative funds.',
    keywords: 'fund accounting software, fund general ledger, chart of accounts, NAV calculation, waterfall distribution, carried interest, side letters, capital account statement, trial balance, multi-currency, corporate actions, PE VC fund accounting',
    benefits: [
      { title: 'Purpose-built for funds', description: 'A double-entry general ledger and NAV engine built for fund accounting — not generic bookkeeping.', icon: IconReportMoney },
      { title: 'Investor-level economics', description: 'Waterfalls, carry and per-investor side letters give every LP exactly the right numbers.', icon: IconChartBar },
      { title: 'Governed & audit-ready', description: 'Multi-stage approval workflows, role-based access and a complete audit log on every action.', icon: IconShieldCheck },
      { title: 'Always in sync', description: 'Real-time REST API sync keeps fund, investor and commitment data current across the platform.', icon: IconRefresh },
    ],
    featureGroups: [
      { title: 'Fund-grade general ledger', description: 'Full double-entry accounting, purpose-built for funds.', items: ['Chart of accounts and journal vouchers', 'Multi-entry debit/credit balancing and reversals', 'Rule-based auto-booking of accruals and payment vouchers', 'Automated interest accrual, realization and tracking', 'Complete audit trails'] },
      { title: 'NAV calculation engine', description: 'Automated NAV across every reporting period.', items: ['Daily, weekly, monthly and quarterly NAV', 'Gross NAV, Net NAV and per-unit NAV', 'Holiday-aware period closures', 'Automatic price re-evaluation'] },
      { title: 'Waterfalls, carry & fund economics', description: 'Distributions and investor-level economics, done right.', items: ['European and American waterfall models', 'Per-investor preview, provisioning and equalization calls', 'Management and performance fees (carried interest)', 'Per-investor side-letter overrides', 'Commitment, called capital and preferred-return hurdles'] },
      { title: 'Securities, valuations & corporate actions', description: 'Every instrument valued and tracked.', items: ['Listed and unlisted securities with flexible valuation policies', 'NFRS categorization and live price feeds (AlphaVantage)', 'Corporate actions — AGMs, dividends, listings, distributions', 'Dividend realization with tax management', 'Multi-currency and FX conversion in all reports'] },
      { title: 'Investments & operations', description: 'The full investment lifecycle and the accounts behind it.', items: ['Investment order lifecycle — plan, schedule, execute, settle', 'Holdings reporting and bulk Excel import', 'Bank, broker and custodian management with reconciliation', 'Real-time REST API sync with the main platform', 'Role-based access and full audit logs'] },
      { title: 'Comprehensive financial reporting', description: '12+ built-in, audit-ready fund reports.', items: ['Trial Balance (6-column)', 'Balance Sheet and Profit & Loss', 'NAV Summary and Capital Account Statement', 'Sectoral Allocations', 'Annexure reports'] },
    ],
    keyFeatures: [
      { title: 'PE/VC & alternatives', description: 'Built for PE, VC, closed-ended, open-ended and mutual funds with commitment-based tracking.' },
      { title: 'Holiday-aware NAV', description: 'Period closures respect the holiday calendar, with automatic price re-evaluation.' },
      { title: 'Live price feeds', description: 'AlphaVantage integration for live prices, plus bulk Excel import for everything else.' },
      { title: 'Approval workflows', description: 'Initiate → Post → Approve → Archive across vouchers, NAV, investments and adjustments.' },
      { title: 'Auto-booking engine', description: 'Rule-based daily accruals and payment vouchers cut manual data entry.' },
      { title: 'Real-time sync', description: 'Incremental REST API sync keeps the accounting module and platform aligned.' },
    ],
    faqs: [
      { q: 'Is the general ledger true double-entry?', a: 'Yes — a full double-entry general ledger with a chart of accounts, journal vouchers, multi-entry debit/credit balancing, reversals and complete audit trails, purpose-built for funds.' },
      { q: 'Which NAV periods are supported?', a: 'Daily, weekly, monthly and quarterly NAV — Gross NAV, Net NAV and per-unit NAV — with holiday-aware period closures and automatic price re-evaluation.' },
      { q: 'Do you support European and American waterfalls?', a: 'Yes — both models, with per-investor preview, provisioning and equalization calls, plus management and performance (carried-interest) fees and per-investor side-letter overrides.' },
      { q: 'Which fund structures are supported?', a: 'Built for Private Equity, Venture Capital, closed-ended, open-ended and Mutual Funds, with commitment-based tracking, called-capital management and preferred-return hurdle configuration.' },
      { q: 'What reports are included?', a: '12+ built-in reports including a 6-column Trial Balance, Balance Sheet, Profit & Loss, NAV Summary, Capital Account Statement, Sectoral Allocations and Annexure reports — with multi-currency conversion throughout.' },
      { q: 'Can I use Fund Accounting on its own?', a: 'Yes — it runs standalone, and syncs fund, investor and commitment data with the wider platform over a REST API when you do use the other products.' },
    ],
  },
];

export const platformBySlug = (slug: string) => PLATFORMS.find((p) => p.slug === slug);

// Compact list for nav menus and related-product strips.
export const PLATFORM_LINKS: RelatedLink[] = PLATFORMS.map((p) => ({
  href: `/products/${p.slug}`,
  label: p.shortName,
  blurb: p.heroDescription.split('.')[0] + '.',
  icon: p.icon,
}));

import type { NextApiRequest, NextApiResponse } from 'next';

export interface ProductData {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  heroDescription: string;
  icon: string;
  image: string;
  category: string;
  features: {
    title: string;
    description: string;
    items: string[];
  }[];
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  useCases: {
    title: string;
    description: string;
    metrics?: {
      label: string;
      value: string;
    }[];
  }[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  relatedProducts: string[];
}

export const products: ProductData[] = [
  {
    id: '1',
    slug: 'mutual-fund-managers',
    title: 'Mutual Fund Management Software',
    shortTitle: 'Mutual Fund Managers',
    description: 'Complete fund management and administration solution for Singapore-regulated mutual funds with MAS-compliant operations.',
    heroDescription: 'Transform your mutual fund operations with our comprehensive software platform. Built specifically for Singapore fund managers, our solution automates daily NAV calculations, ensures MAS compliance, and streamlines investor reporting - all from a single, integrated platform.',
    icon: 'IconBuildingBank',
    image: '/fund-types/mutual-fund.jpg',
    category: 'Fund Management',
    features: [
      {
        title: 'Core Fund Operations',
        description: 'Comprehensive tools for day-to-day fund management',
        items: [
          'Automated daily NAV calculation and unit pricing',
          'Real-time portfolio valuation and performance tracking',
          'Multi-currency support with automatic FX conversion',
          'Subscription and redemption processing automation',
          'Dividend distribution and reinvestment management',
          'Fund accounting and general ledger integration'
        ]
      },
      {
        title: 'Regulatory Compliance',
        description: 'Built-in MAS compliance monitoring and reporting',
        items: [
          'MAS regulatory reporting automation',
          'Investment limits and restrictions monitoring',
          'Automated compliance alerts and notifications',
          'Audit trail and document management',
          'KYC/AML investor verification workflows',
          'Regulatory filing calendar and reminders'
        ]
      },
      {
        title: 'Investor Management',
        description: 'Seamless investor onboarding and servicing',
        items: [
          'Digital investor onboarding and KYC',
          'Secure investor portal for 24/7 access',
          'Automated statement generation and distribution',
          'Tax reporting and documentation',
          'Investor communication and notifications',
          'Transaction history and portfolio analytics'
        ]
      }
    ],
    benefits: [
      {
        title: 'Reduce Operational Costs',
        description: 'Save up to 40% on operational expenses through automation of manual processes and elimination of redundant systems.',
        icon: 'IconCurrencyDollar'
      },
      {
        title: 'Ensure MAS Compliance',
        description: 'Stay compliant with built-in regulatory monitoring, automated reporting, and real-time compliance alerts.',
        icon: 'IconShield'
      },
      {
        title: 'Scale Efficiently',
        description: 'Manage multiple funds and thousands of investors without proportional increase in operational overhead.',
        icon: 'IconChartBar'
      },
      {
        title: 'Improve Accuracy',
        description: 'Eliminate manual errors with automated NAV calculations, reconciliation, and double-entry accounting.',
        icon: 'IconCheck'
      }
    ],
    useCases: [
      {
        title: 'Equity Fund Management',
        description: 'Manage equity-focused mutual funds with real-time portfolio tracking, automated corporate actions processing, and comprehensive performance analytics.',
        metrics: [
          { label: 'Processing Time', value: '85% faster' },
          { label: 'Error Reduction', value: '99.5%' },
          { label: 'Cost Savings', value: '45%' }
        ]
      },
      {
        title: 'Fixed Income Funds',
        description: 'Handle bond portfolios with accrued interest calculations, coupon payment tracking, and yield-to-maturity analytics.',
        metrics: [
          { label: 'Calculation Accuracy', value: '100%' },
          { label: 'Automation Rate', value: '90%' }
        ]
      },
      {
        title: 'Multi-Asset Funds',
        description: 'Manage diversified portfolios across asset classes with consolidated reporting and risk analytics.',
        metrics: [
          { label: 'Asset Classes', value: '10+' },
          { label: 'Daily Reconciliation', value: 'Automated' }
        ]
      }
    ],
    keyFeatures: [
      {
        title: 'Automated NAV Calculation',
        description: 'Daily NAV calculations with multi-level verification, automated price feeds integration, and accrual accounting.'
      },
      {
        title: 'MAS Regulatory Reporting',
        description: 'Pre-configured templates for all MAS regulatory reports with automated data population and validation.'
      },
      {
        title: 'Investor Portal',
        description: 'White-labeled investor portal with real-time portfolio access, transaction history, and document repository.'
      },
      {
        title: 'Banking Integration',
        description: 'Direct integration with major banks for automated transaction matching and cash reconciliation.'
      },
      {
        title: 'Performance Analytics',
        description: 'Comprehensive performance attribution, risk metrics, and benchmark comparison tools.'
      },
      {
        title: 'Document Management',
        description: 'Centralized repository for all fund documents, prospectuses, financial statements, and regulatory filings.'
      }
    ],
    faq: [
      {
        question: 'How long does it take to set up a new fund on your platform?',
        answer: 'Typically, we can have a new fund operational within 2 weeks. This includes system configuration, data migration, testing, and user training. Our team works closely with you throughout the setup process to ensure a smooth launch.'
      },
      {
        question: 'Do you support multiple share classes?',
        answer: 'Yes, our platform fully supports multiple share classes with different fee structures, currencies, and investor types. Each share class can have its own NAV calculation, pricing, and reporting configuration.'
      },
      {
        question: 'How do you ensure MAS compliance?',
        answer: 'Our software is built with MAS regulatory requirements embedded in the core system. We provide automated investment limit monitoring, regulatory reporting templates, compliance alerts, and comprehensive audit trails. We also keep the system updated with any regulatory changes.'
      },
      {
        question: 'Can I integrate with my existing custodian and administrators?',
        answer: 'Yes, we offer comprehensive API integration capabilities and support standard industry formats for data exchange with custodians, fund administrators, banks, and other service providers.'
      },
      {
        question: 'What kind of reporting capabilities do you offer?',
        answer: 'We provide extensive reporting including daily NAV reports, investor statements, performance reports, regulatory filings, tax reports, and customizable ad-hoc reports. All reports can be scheduled for automatic generation and distribution.'
      },
      {
        question: 'How secure is the platform?',
        answer: 'Security is our top priority. We use bank-grade encryption, multi-factor authentication, role-based access controls, and maintain SOC 2 Type II compliance. All data is encrypted at rest and in transit, with regular security audits and penetration testing.'
      }
    ],
    relatedProducts: ['vc-pe-firms', 'reits', 'financial-institutions']
  },
  {
    id: '2',
    slug: 'vc-pe-firms',
    title: 'VC/PE Fund Management Software',
    shortTitle: 'VC/PE Firms',
    description: 'Comprehensive software solution for venture capital and private equity fund operations with portfolio tracking, capital calls, and LP reporting.',
    heroDescription: 'Streamline your private capital operations with purpose-built tools for VC and PE funds. From deal flow management to portfolio monitoring, capital calls to LP reporting - everything you need to manage your private equity investments efficiently.',
    icon: 'IconChartBar',
    image: '/fund-types/vc.jpg',
    category: 'Private Capital',
    features: [
      {
        title: 'Portfolio Management',
        description: 'Comprehensive visibility into your portfolio companies',
        items: [
          'Portfolio company performance dashboards',
          'Investment tracking and valuation management',
          'Board meeting management and minutes',
          'Document repository for all portfolio companies',
          'Exit scenario modeling and planning',
          'Real-time portfolio analytics and metrics'
        ]
      },
      {
        title: 'Capital Management',
        description: 'Automated capital calls and distribution processing',
        items: [
          'Capital call automation and tracking',
          'Distribution waterfall calculations',
          'Commitment tracking and unfunded capital',
          'Cash flow forecasting and planning',
          'Wire payment instructions and processing',
          'Automated reconciliation with bank accounts'
        ]
      },
      {
        title: 'LP Portal & Reporting',
        description: 'Secure portal for limited partner communications',
        items: [
          'Quarterly and annual LP reporting',
          'Real-time portfolio access for LPs',
          'Capital account statements',
          'Tax documentation (K-1, Schedule K)',
          'Secure document sharing',
          'LP communication and updates'
        ]
      }
    ],
    benefits: [
      {
        title: 'Streamline Operations',
        description: 'Reduce administrative burden by 60% with automated capital calls, distributions, and reporting workflows.',
        icon: 'IconActivity'
      },
      {
        title: 'Enhance LP Relations',
        description: 'Improve LP satisfaction with transparent reporting, real-time portfolio access, and timely communications.',
        icon: 'IconUsers'
      },
      {
        title: 'Better Investment Decisions',
        description: 'Make data-driven decisions with comprehensive portfolio analytics, performance metrics, and scenario modeling.',
        icon: 'IconChartPie'
      },
      {
        title: 'Ensure Compliance',
        description: 'Maintain regulatory compliance with automated reporting, audit trails, and document management.',
        icon: 'IconShield'
      }
    ],
    useCases: [
      {
        title: 'Venture Capital Funds',
        description: 'Manage early-stage investments with deal flow pipeline, valuation tracking, and milestone monitoring.',
        metrics: [
          { label: 'Time Saved', value: '20 hrs/week' },
          { label: 'Portfolio Companies', value: '50+' },
          { label: 'LP Satisfaction', value: '95%' }
        ]
      },
      {
        title: 'Growth Equity Funds',
        description: 'Track growth-stage investments with detailed performance metrics, board management, and exit planning.',
        metrics: [
          { label: 'Reporting Time', value: '75% faster' },
          { label: 'Data Accuracy', value: '99.9%' }
        ]
      },
      {
        title: 'Buyout Funds',
        description: 'Manage leveraged buyouts with comprehensive portfolio monitoring, value creation tracking, and operational metrics.',
        metrics: [
          { label: 'AUM Managed', value: '$2B+' },
          { label: 'Funds Supported', value: '15+' }
        ]
      }
    ],
    keyFeatures: [
      {
        title: 'Deal Flow Management',
        description: 'Track investment opportunities from sourcing to close with customizable pipeline stages and collaboration tools.'
      },
      {
        title: 'Waterfall Calculations',
        description: 'Automated carry and waterfall calculations supporting multiple structures including European, American, and hybrid waterfalls.'
      },
      {
        title: 'Portfolio Monitoring',
        description: 'Real-time dashboards showing portfolio company metrics, valuations, and key performance indicators.'
      },
      {
        title: 'LP Communication Hub',
        description: 'Centralized platform for all LP communications, document sharing, and meeting coordination.'
      },
      {
        title: 'Compliance & Audit',
        description: 'Complete audit trail, regulatory reporting, and compliance monitoring for all fund activities.'
      },
      {
        title: 'Custom Reporting',
        description: 'Flexible reporting engine for creating custom reports tailored to your fund structure and LP requirements.'
      }
    ],
    faq: [
      {
        question: 'How does your software handle different waterfall structures?',
        answer: 'Our platform supports all major waterfall structures including European (whole-fund), American (deal-by-deal), and hybrid models. You can configure preferred return rates, catch-up provisions, and multiple tiers of carry. The system automatically calculates distributions based on your specific fund terms.'
      },
      {
        question: 'Can I track multiple funds in one system?',
        answer: 'Yes, our platform is designed to manage multiple funds simultaneously. You can track different vintage years, fund types, and investment strategies all within one system while maintaining separate accounting and reporting for each fund.'
      },
      {
        question: 'How do you handle portfolio company valuations?',
        answer: 'We support multiple valuation methodologies including fair market value, marked-to-market, and cost basis. You can track valuations over time, document valuation assumptions, and generate valuation reports for quarterly marks and year-end audits.'
      },
      {
        question: 'What LP reporting capabilities do you offer?',
        answer: 'We provide comprehensive LP reporting including quarterly statements, capital account statements, cash flow summaries, portfolio company updates, and tax documentation. All reports are customizable and can be white-labeled with your fund branding.'
      },
      {
        question: 'How does capital call automation work?',
        answer: 'Our system automates the entire capital call process - from calculating required amounts based on investment commitments, generating call notices, tracking responses, to reconciling received funds. You can schedule calls in advance and the system handles all communications and tracking.'
      },
      {
        question: 'Do you integrate with third-party data providers?',
        answer: 'Yes, we integrate with major data providers for market data, company information, and benchmark data. We also support API integrations with banking systems, accounting software, and portfolio company data sources.'
      }
    ],
    relatedProducts: ['spv-syndicates', 'mutual-fund-managers', 'reits', 'financial-institutions']
  },
  {
    id: '3',
    slug: 'reits',
    title: 'REIT Management Software',
    shortTitle: 'REITs',
    description: 'Purpose-built platform for real estate investment trust management with property portfolio tracking, rental income management, and dividend distribution.',
    heroDescription: 'Optimize your real estate investment operations with our specialized REIT management platform. From property portfolio management to rental income tracking, expense management to dividend distributions - everything you need to run your REIT efficiently.',
    icon: 'IconChartPie',
    image: '/fund-types/reit.jpg',
    category: 'Real Estate',
    features: [
      {
        title: 'Property Portfolio Management',
        description: 'Complete visibility and control over your property assets',
        items: [
          'Property-level financial tracking and reporting',
          'Lease management and tenant database',
          'Occupancy tracking and vacancy analysis',
          'Property valuation and appraisal management',
          'Capital improvements and CapEx tracking',
          'Asset-level performance analytics'
        ]
      },
      {
        title: 'Income & Expense Management',
        description: 'Comprehensive tracking of all REIT revenues and costs',
        items: [
          'Rental income tracking and forecasting',
          'Automated rent collection and reconciliation',
          'Operating expense categorization and tracking',
          'Property maintenance scheduling and costs',
          'Utility and service charge management',
          'Budget vs. actual variance analysis'
        ]
      },
      {
        title: 'Investor Relations',
        description: 'Streamlined dividend distribution and investor reporting',
        items: [
          'Automated dividend calculations and payments',
          'Investor portal with property portfolio access',
          'Quarterly and annual REIT reporting',
          'Tax documentation and 1099 generation',
          'Distribution reinvestment plans (DRIP)',
          'Investor communications and updates'
        ]
      }
    ],
    benefits: [
      {
        title: 'Maximize NOI',
        description: 'Increase net operating income by 15-25% through better expense management, rent optimization, and reduced vacancy periods.',
        icon: 'IconCurrencyDollar'
      },
      {
        title: 'Improve Occupancy',
        description: 'Reduce vacancy rates with proactive lease management, tenant retention tracking, and automated renewal notifications.',
        icon: 'IconBuildingBank'
      },
      {
        title: 'Streamline Distributions',
        description: 'Automate dividend calculations based on REIT requirements and ensure timely, accurate distributions to investors.',
        icon: 'IconChartBar'
      },
      {
        title: 'Ensure Compliance',
        description: 'Maintain REIT status with automated compliance monitoring for income tests, asset tests, and distribution requirements.',
        icon: 'IconShield'
      }
    ],
    useCases: [
      {
        title: 'Residential REITs',
        description: 'Manage apartment complexes and residential properties with tenant management, lease tracking, and maintenance scheduling.',
        metrics: [
          { label: 'Properties Managed', value: '200+' },
          { label: 'Occupancy Rate', value: '96%' },
          { label: 'Collection Rate', value: '98.5%' }
        ]
      },
      {
        title: 'Commercial REITs',
        description: 'Handle office buildings and retail spaces with complex lease structures, CAM reconciliation, and tenant improvements.',
        metrics: [
          { label: 'Square Footage', value: '2M+ sq ft' },
          { label: 'Lease Administration', value: 'Automated' }
        ]
      },
      {
        title: 'Industrial REITs',
        description: 'Track warehouse and industrial properties with focus on tenant quality, lease terms, and property utilization.',
        metrics: [
          { label: 'Properties', value: '50+' },
          { label: 'Avg Lease Term', value: '7 years' }
        ]
      }
    ],
    keyFeatures: [
      {
        title: 'Lease Administration',
        description: 'Complete lease lifecycle management including renewals, amendments, rent escalations, and tenant improvements.'
      },
      {
        title: 'Rental Income Forecasting',
        description: 'Project future rental income based on lease schedules, market trends, and occupancy assumptions.'
      },
      {
        title: 'Property Valuation',
        description: 'Track property values using multiple methods including cap rate, DCF, and comparable sales analysis.'
      },
      {
        title: 'Maintenance Management',
        description: 'Schedule preventive maintenance, track work orders, and manage vendor relationships for property upkeep.'
      },
      {
        title: 'Dividend Distribution',
        description: 'Automated dividend calculations ensuring REIT distribution requirements are met with accurate investor payments.'
      },
      {
        title: 'REIT Compliance',
        description: 'Monitor and report on REIT qualification tests including 90% income distribution, asset tests, and income tests.'
      }
    ],
    faq: [
      {
        question: 'How does your software help maintain REIT status?',
        answer: 'Our platform includes built-in REIT compliance monitoring that tracks the 90% income distribution requirement, asset composition tests, income source tests, and shareholder distribution requirements. You receive automated alerts if any metrics approach compliance thresholds.'
      },
      {
        question: 'Can you handle different property types in one REIT?',
        answer: 'Yes, our system supports multi-property type REITs. You can manage residential, commercial, industrial, retail, and mixed-use properties all within one platform while maintaining separate accounting and reporting for each property type.'
      },
      {
        question: 'How do you handle lease management?',
        answer: 'We provide comprehensive lease administration including lease abstracting, critical date tracking, rent escalation calculations, CAM reconciliation, renewal notifications, and lease amendment management. All lease data is centralized and easily accessible.'
      },
      {
        question: 'What kind of reporting do you provide for investors?',
        answer: 'We generate all standard REIT investor reports including quarterly financial statements, distribution notices, annual reports, tax documentation (1099-DIV), property portfolio summaries, and FFO/AFFO calculations. All reports are customizable and can be white-labeled.'
      },
      {
        question: 'How does dividend distribution automation work?',
        answer: 'Our system calculates required distributions based on taxable income, tracks distribution history, generates distribution notices, processes payments through banking integration, and produces all necessary tax documentation - all automatically on your specified schedule.'
      },
      {
        question: 'Can you integrate with property management systems?',
        answer: 'Yes, we integrate with major property management systems, accounting software, and banking platforms. We can import tenant data, lease information, rent rolls, and financial transactions automatically to keep your REIT reporting current.'
      }
    ],
    relatedProducts: ['mutual-fund-managers', 'vc-pe-firms', 'financial-institutions']
  },
  {
    id: '4',
    slug: 'financial-institutions',
    title: 'Fund Infrastructure for Financial Institutions',
    shortTitle: 'Financial Institutions',
    description: 'Enterprise-grade fund infrastructure software for banks and financial institutions with robust compliance controls, audit trails, and multi-entity support.',
    heroDescription: 'Power your fund operations with institutional-grade infrastructure designed for banks, wealth managers, and financial institutions. Built with enterprise security, comprehensive compliance controls, and the scalability to manage multiple fund structures across your organization.',
    icon: 'IconShield',
    image: '/fund-types/mutual-fund.jpg',
    category: 'Enterprise Solutions',
    features: [
      {
        title: 'Enterprise Security & Compliance',
        description: 'Bank-grade security and comprehensive compliance framework',
        items: [
          'SOC 2 Type II certified infrastructure',
          'Multi-factor authentication and SSO integration',
          'Role-based access controls (RBAC)',
          'Complete audit trail and activity logging',
          'Data encryption at rest and in transit',
          'Regulatory compliance monitoring and reporting'
        ]
      },
      {
        title: 'Multi-Entity Management',
        description: 'Manage multiple funds and entities from one platform',
        items: [
          'Multi-fund and multi-entity support',
          'Consolidated reporting across entities',
          'Inter-fund transfer management',
          'Centralized user and permission management',
          'White-label customization per entity',
          'Group-level analytics and dashboards'
        ]
      },
      {
        title: 'Integration & APIs',
        description: 'Seamless integration with your existing systems',
        items: [
          'REST API for custom integrations',
          'Banking system connectivity',
          'Core banking system integration',
          'Accounting software synchronization',
          'Market data provider connections',
          'Custom workflow automation'
        ]
      }
    ],
    benefits: [
      {
        title: 'Enterprise Scalability',
        description: 'Handle unlimited funds, investors, and transactions with cloud-based infrastructure that scales with your growth.',
        icon: 'IconWorld'
      },
      {
        title: 'Reduce Risk',
        description: 'Minimize operational and compliance risk with automated controls, comprehensive audit trails, and real-time monitoring.',
        icon: 'IconShield'
      },
      {
        title: 'Increase Efficiency',
        description: 'Eliminate manual processes and reduce operational costs by up to 50% through end-to-end automation.',
        icon: 'IconActivity'
      },
      {
        title: 'Enhance Control',
        description: 'Maintain complete oversight with centralized management, detailed reporting, and granular access controls.',
        icon: 'IconLock'
      }
    ],
    useCases: [
      {
        title: 'Private Banking',
        description: 'Offer fund products to private banking clients with white-labeled investor portals and seamless integration with wealth management platforms.',
        metrics: [
          { label: 'Client Accounts', value: '10,000+' },
          { label: 'AUM', value: '$5B+' },
          { label: 'Funds Offered', value: '50+' }
        ]
      },
      {
        title: 'Fund Administration Services',
        description: 'Provide third-party fund administration services to external fund managers with multi-tenant architecture and client-specific customization.',
        metrics: [
          { label: 'Clients Served', value: '100+' },
          { label: 'Operational Efficiency', value: '+65%' }
        ]
      },
      {
        title: 'Asset Management',
        description: 'Launch and manage proprietary fund products with institutional-grade infrastructure and comprehensive investor servicing.',
        metrics: [
          { label: 'Funds Managed', value: '30+' },
          { label: 'Launch Time', value: '2 weeks' }
        ]
      }
    ],
    keyFeatures: [
      {
        title: 'Enterprise SSO Integration',
        description: 'Seamless integration with corporate identity providers (Azure AD, Okta, etc.) for unified authentication across systems.'
      },
      {
        title: 'Advanced Analytics',
        description: 'Executive dashboards, predictive analytics, and business intelligence tools for data-driven decision making.'
      },
      {
        title: 'Disaster Recovery',
        description: 'Enterprise-grade business continuity with multi-region redundancy, automated backups, and 99.99% uptime SLA.'
      },
      {
        title: 'Custom Workflows',
        description: 'Configurable approval workflows, automated processes, and business rules tailored to your operational requirements.'
      },
      {
        title: 'Multi-Currency Support',
        description: 'Support for 50+ currencies with real-time FX rates, automated conversion, and multi-currency accounting.'
      },
      {
        title: 'White-Label Platform',
        description: 'Complete customization with your branding, domain, and user experience for client-facing interfaces.'
      }
    ],
    faq: [
      {
        question: 'How secure is your platform for institutional use?',
        answer: 'Our platform is built to institutional security standards with SOC 2 Type II certification, bank-grade encryption, penetration testing, security audits, and compliance with global data protection regulations including GDPR and MAS requirements. We employ multi-layer security including network security, application security, and data security controls.'
      },
      {
        question: 'Can you support our existing IT infrastructure?',
        answer: 'Yes, our platform is designed for enterprise integration. We support SSO with major identity providers, API integration with core banking systems, connectivity with market data providers, and can deploy in cloud, on-premise, or hybrid configurations based on your requirements.'
      },
      {
        question: 'How do you handle multi-entity and multi-fund management?',
        answer: 'Our platform includes sophisticated multi-tenancy architecture that allows you to manage multiple legal entities, funds, and client organizations within one system. Each entity can have separate configurations, branding, user bases, and reporting while maintaining centralized administration and consolidated reporting capabilities.'
      },
      {
        question: 'What kind of SLA do you provide?',
        answer: 'We offer enterprise-grade SLAs including 99.99% uptime guarantee, 24/7 technical support, dedicated account management, priority incident response, and guaranteed response times. We also provide business continuity and disaster recovery plans with RTO and RPO commitments.'
      },
      {
        question: 'How long does enterprise implementation take?',
        answer: 'Enterprise implementations typically take 8-12 weeks depending on complexity, integration requirements, and customization needs. This includes infrastructure setup, data migration, system integration, user training, and parallel testing. We provide dedicated implementation teams and project management throughout the process.'
      },
      {
        question: 'Can the platform scale with our growth?',
        answer: 'Absolutely. Our cloud-based architecture is designed for unlimited scalability. Whether you manage 5 funds or 500, 1,000 investors or 1 million, the platform scales seamlessly. We handle some of the largest fund operations in the region with billions in AUM.'
      }
    ],
    relatedProducts: ['mutual-fund-managers', 'vc-pe-firms', 'reits']
  },
  {
    id: '5',
    slug: 'spv-syndicates',
    title: 'SPV & Syndicate Management Software',
    shortTitle: 'SPVs & Syndicates',
    description: 'End-to-end administration for single-deal SPVs and investor syndicates — member onboarding, cap table, lead carry, distributions and reporting in one place.',
    heroDescription: 'Run single-deal vehicles and syndicates the same way you run a fund — without the overhead. Spin up an SPV in days, onboard members with built-in KYC/AML, automate lead carry and deal fees, and keep every investor updated through a white-labeled portal.',
    icon: 'IconUsers',
    image: '/fund-types/vc.jpg',
    category: 'Private Capital',
    features: [
      {
        title: 'Vehicle Setup & Cap Table',
        description: 'Stand up a deal SPV or syndicate and manage ownership in minutes',
        items: [
          'Launch a single-deal SPV or syndicate in days',
          'Automated cap table and ownership ledger',
          'Multiple share classes and side-letter terms',
          'Subscription documents and e-signatures',
          'Deal-level document vault and data room',
          'Multi-entity rollups for serial dealmakers'
        ]
      },
      {
        title: 'Member Onboarding & Compliance',
        description: 'Onboard syndicate members with built-in KYC/AML',
        items: [
          'KYC/AML onboarding with e-signatures',
          'Accreditation and eligibility checks',
          'Per-member commitment and funding tracking',
          'MAS-aligned compliance monitoring',
          'Complete audit trail for every action',
          'Secure investor messaging and notices'
        ]
      },
      {
        title: 'Economics, Distributions & Reporting',
        description: 'Automate lead carry, deal fees and member payouts',
        items: [
          'Lead carry and deal-fee automation',
          'Deal-by-deal distribution waterfalls',
          'Member capital account statements',
          'Realized and unrealized return tracking (IRR, MOIC)',
          'Tax and year-end reporting packs',
          'White-labeled member portal and updates'
        ]
      }
    ],
    benefits: [
      {
        title: 'Launch Deals Faster',
        description: 'Spin up a new SPV or syndicate in days, not weeks — with templated setup, documents and onboarding flows.',
        icon: 'IconActivity'
      },
      {
        title: 'Keep Members Informed',
        description: 'Give every syndicate member a white-labeled portal with real-time positions, statements and deal updates.',
        icon: 'IconUsers'
      },
      {
        title: 'Get the Economics Right',
        description: 'Automate lead carry, deal fees and deal-by-deal waterfalls so every payout is accurate and transparent.',
        icon: 'IconChartPie'
      },
      {
        title: 'Stay Compliant',
        description: 'Built-in KYC/AML, accreditation checks and a full audit trail keep each vehicle audit-ready.',
        icon: 'IconShield'
      }
    ],
    useCases: [
      {
        title: 'Angel & Operator Syndicates',
        description: 'Pool angels into a single deal with a clean cap table, fast onboarding and automated carry for the lead.',
        metrics: [
          { label: 'Setup Time', value: 'Days, not weeks' },
          { label: 'Members / Deal', value: '100+' },
          { label: 'Carry Automated', value: '100%' }
        ]
      },
      {
        title: 'Co-Investment Sidecars',
        description: 'Run fee-light co-invest vehicles alongside the main fund with separate accounting and reporting.',
        metrics: [
          { label: 'Reporting Time', value: '75% faster' },
          { label: 'Fee Models', value: 'Flexible' }
        ]
      },
      {
        title: 'Single-Deal SPVs',
        description: 'Hold a single asset or company in a dedicated vehicle with full administration and investor servicing.',
        metrics: [
          { label: 'Time Saved', value: '15 hrs/deal' },
          { label: 'Data Accuracy', value: '99.9%' }
        ]
      }
    ],
    keyFeatures: [
      {
        title: 'Rapid SPV Setup',
        description: 'Templated vehicle creation, subscription documents and e-signature flows get a deal closed in days.'
      },
      {
        title: 'Lead Carry & Deal Fees',
        description: 'Configure carry, management or deal fees and hurdles per vehicle — calculated and distributed automatically.'
      },
      {
        title: 'Deal-by-Deal Waterfalls',
        description: 'Single-deal distribution waterfalls with preferred return, catch-up and carry, calculated to the cent.'
      },
      {
        title: 'Member Portal',
        description: 'A white-labeled portal where syndicate members track positions, statements, documents and updates.'
      },
      {
        title: 'KYC/AML & Audit',
        description: 'Onboarding, accreditation checks and a complete audit trail built into every vehicle.'
      },
      {
        title: 'Serial-Deal Rollups',
        description: 'Manage dozens of SPVs and syndicates from one dashboard with consolidated reporting for the lead.'
      }
    ],
    faq: [
      {
        question: 'How quickly can I set up an SPV or syndicate?',
        answer: 'Most single-deal vehicles can be stood up in a few days. Templated setup, subscription documents and e-signature onboarding flows let you open a vehicle, invite members and start collecting commitments without building anything from scratch.'
      },
      {
        question: 'Can the platform handle lead carry and deal fees?',
        answer: 'Yes. You can configure carried interest, management or one-off deal fees and a preferred return or hurdle per vehicle. The system calculates the lead\'s carry and member distributions on a deal-by-deal basis and produces statements automatically.'
      },
      {
        question: 'Do syndicate members get their own portal?',
        answer: 'Every member gets access to a white-labeled portal with real-time positions, capital account statements, documents and deal updates — the same investor experience your fund LPs receive.'
      },
      {
        question: 'How do you handle KYC/AML for syndicate members?',
        answer: 'KYC/AML onboarding, accreditation and eligibility checks are built in, with e-signatures and a complete audit trail. Compliance monitoring is MAS-aligned so each vehicle stays audit-ready.'
      },
      {
        question: 'Can I run many SPVs at once?',
        answer: 'Yes. The platform is multi-entity by design, so serial dealmakers can manage dozens of SPVs and syndicates from a single dashboard with consolidated cap tables, accounting and reporting across every vehicle.'
      },
      {
        question: 'Is an SPV just treated as a single-deal fund?',
        answer: 'Effectively, yes — an SPV is administered as a focused, single-asset fund. You get the same fund accounting engine, investor portal, distribution waterfalls and reporting, scaled to the simpler structure of a one-deal vehicle.'
      }
    ],
    relatedProducts: ['vc-pe-firms', 'mutual-fund-managers', 'financial-institutions']
  },
  {
    id: '6',
    slug: 'family-offices',
    title: 'Family Office Software',
    shortTitle: 'Family Offices',
    description: 'Consolidated multi-entity, multi-asset administration, accounting and reporting for single and multi-family offices.',
    heroDescription: 'Bring every entity, asset class and account into one system. aama.io gives family offices consolidated administration, fund accounting and bespoke reporting — across direct investments, funds, real assets and cash.',
    icon: 'IconBriefcase',
    image: '/images/family-office-blog.png',
    category: 'Private Wealth',
    features: [
      {
        title: 'Multi-entity consolidation',
        description: 'A single view across every entity and account',
        items: [
          'Multi-entity and multi-currency consolidation',
          'Direct investments, funds, real assets and cash',
          'Look-through to underlying holdings',
          'Inter-entity loans and transfers',
          'Consolidated balance sheet and exposure',
          'Ownership and structure mapping'
        ]
      },
      {
        title: 'Accounting & administration',
        description: 'Institutional-grade books for the family',
        items: [
          'General ledger and automated NAV',
          'Capital call and distribution tracking',
          'Fee, expense and accrual management',
          'Cash and liquidity management',
          'Audit-ready records and document vault',
          'Reconciliations and period close'
        ]
      },
      {
        title: 'Reporting & access',
        description: 'Bespoke reporting for principals and advisors',
        items: [
          'Consolidated performance and exposure reports',
          'Bespoke portfolio and cash reporting',
          'Role-based access for family and advisors',
          'White-labeled principal portal',
          'Scheduled and on-demand reports',
          'Secure document sharing'
        ]
      }
    ],
    benefits: [
      {
        title: 'Everything in one place',
        description: 'Consolidate entities, asset classes and accounts into a single source of truth.',
        icon: 'IconActivity'
      },
      {
        title: 'Built for complexity',
        description: 'Handle direct deals, funds, real assets and cash side by side, with look-through.',
        icon: 'IconChartPie'
      },
      {
        title: 'Privacy & control',
        description: 'Granular, role-based access keeps sensitive family data tightly held.',
        icon: 'IconShield'
      },
      {
        title: 'Clarity for principals',
        description: 'Clear, consolidated reporting the family actually understands.',
        icon: 'IconUsers'
      }
    ],
    useCases: [
      {
        title: 'Single family offices',
        description: 'Run the family balance sheet end to end — administration, accounting and reporting in one system.',
        metrics: [
          { label: 'Entities', value: 'Unlimited' },
          { label: 'Asset classes', value: 'All' }
        ]
      },
      {
        title: 'Multi-family offices',
        description: 'Service multiple families with segregated data, white-labeled portals and consolidated reporting.',
        metrics: [
          { label: 'Reporting time', value: '75% faster' },
          { label: 'Families', value: 'Many' }
        ]
      },
      {
        title: 'Direct & co-investments',
        description: 'Track direct deals and co-investments alongside fund commitments with full look-through.',
        metrics: [
          { label: 'Look-through', value: 'Full' }
        ]
      }
    ],
    keyFeatures: [
      { title: 'Multi-entity consolidation', description: 'Roll up every entity, currency and asset class into one consolidated view.' },
      { title: 'Direct & fund investments', description: 'Track direct holdings, fund commitments, real assets and cash together.' },
      { title: 'Bespoke reporting', description: 'Flexible reporting tailored to each principal and advisor.' },
      { title: 'Principal portal', description: 'A white-labeled portal giving the family real-time, secure access.' },
      { title: 'Accounting engine', description: 'A full general ledger with automated NAV and audit-ready records.' },
      { title: 'Privacy & permissions', description: 'Granular role-based access and a complete audit trail.' }
    ],
    faq: [
      {
        question: 'What does the family office solution cover?',
        answer: 'Consolidated multi-entity administration, fund accounting, capital tracking and bespoke reporting across direct investments, funds, real assets and cash — for single and multi-family offices.'
      },
      {
        question: 'Can it consolidate multiple entities and currencies?',
        answer: 'Yes. aama.io consolidates across unlimited entities and currencies with look-through to underlying holdings, giving one view of the family balance sheet.'
      },
      {
        question: 'Does it handle direct investments as well as funds?',
        answer: 'Yes — direct deals, co-investments, fund commitments, real assets and cash are all tracked side by side with full look-through.'
      },
      {
        question: 'Is the family data kept private?',
        answer: 'Yes. Granular role-based access controls exactly who sees what, with a complete audit trail and bank-grade security.'
      },
      {
        question: 'Can multi-family offices use it?',
        answer: 'Yes — segregated data per family, white-labeled principal portals and consolidated reporting make it well suited to multi-family offices.'
      }
    ],
    relatedProducts: ['vc-pe-firms', 'spv-syndicates']
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { slug } = req.query;

    if (slug) {
      // Return specific product by slug
      const product = products.find(p => p.slug === slug);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } else {
      // Return all products
      res.status(200).json(products);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

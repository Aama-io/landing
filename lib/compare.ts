// Content for the competitor comparison, alternatives and category pages.
//
// Fairness rules (see docs/seo-keyword-map.md, Cluster E):
//  - Competitor statements describe their public positioning only, sourced from
//    each vendor's own materials and third-party listings as of REVIEWED.
//  - No competitor pricing is quoted; we tell buyers what to ask for instead.
//  - Aama.io claims are limited to what the product pages already state.
//  - Every page names where the competitor is the better fit.

export const REVIEWED = '31 October 2026';

export type Competitor = {
  slug: string;
  name: string;
  /** One-line public positioning, as the vendor describes itself. */
  summary: string;
  /** What the vendor is best known for. */
  knownFor: string;
  /** Where the vendor is the stronger choice. Be genuine. */
  strongerWhen: string[];
  /** Where Aama.io is the closer fit for emerging / boutique managers. */
  aamaFitsWhen: string[];
  accounting: string;
  onboarding: string;
  structures: string;
  reconciliation: string;
  portal: string;
  /** What to ask this vendor for in writing. */
  askVendor: string[];
  migrateFrom: string;
  /** Public pages the statements on this vendor were drawn from. */
  sources: { label: string; url: string }[];
  faqs: { q: string; a: string }[];
};

const COMMON_ASKS = [
  'Total first-year cost for your fund count and investor count, in writing',
  'Whether implementation, data migration and training are charged separately',
  'What is included per additional fund, SPV or sub-fund',
  'Whether the investor portal is white-labelled to your brand and domain',
  'Support hours and the time zone of the team that answers you',
];

export const COMPETITORS: Competitor[] = [
  {
    slug: 'carta',
    name: 'Carta',
    summary: 'Equity and fund administration platform that started with cap tables.',
    knownFor: 'Cap table and equity management for companies, with fund administration, portfolio management, investor management and an investor portal for fund managers.',
    strongerWhen: [
      'You already run your portfolio companies’ cap tables on Carta and want fund and company data in one vendor.',
      'You want an outsourced fund administration service, not software your own team operates.',
      'You want an established platform with a large installed base.',
    ],
    aamaFitsWhen: [
      'You are an emerging or boutique manager who wants to run the books and the investor portal yourself, on one data model.',
      'You are in Singapore or APAC and need MAS, VCC and IFRS 9 / SFRS(I) 9 handled as the default, not as an add-on.',
      'You run SPVs and syndicates and want them administered and accounted for from the first vehicle.',
    ],
    accounting: 'Offered mainly as a fund administration service. Carta states it supports funds reporting under US GAAP or IFRS.',
    onboarding: 'Investor onboarding and an investor portal are part of the platform; confirm KYC/AML scope and jurisdictions for your investor base.',
    structures: 'Carta has a Singapore office and its Asia team supports local structures. Confirm VCC and sub-fund handling for your vehicle.',
    reconciliation: 'Handled within the administration service; ask who performs and signs off the reconciliation.',
    portal: 'Investor portal included; ask whether it can carry your brand and domain.',
    askVendor: [...COMMON_ASKS, 'Whether fund accounting is delivered as software you operate or as a managed service'],
    migrateFrom: 'Carta',
    sources: [{ label: 'Carta: international fund administration', url: 'https://carta.com/blog/international-fund-administration/' }, { label: 'Carta: why Carta came to Singapore', url: 'https://www3.carta.com/blog/carta-singapore' }],
    faqs: [
      { q: 'Is Aama.io a Carta alternative for fund managers?', a: 'For fund administration, accounting and an LP portal, yes. Aama.io does not replace Carta’s cap table and equity management for portfolio companies. If you need that, the two can sit side by side.' },
      { q: 'Does Carta support Singapore funds?', a: 'Carta has a Singapore office and says its fund administration supports funds reporting under US GAAP or IFRS. Whether it fits your vehicle, for example a VCC with sub-funds, is something to confirm with Carta directly.' },
      { q: 'When should I stay on Carta?', a: 'If you rely on Carta for portfolio company cap tables, want an outsourced administrator, or you are happy with the current set-up, staying is reasonable. The case for Aama.io is strongest for smaller Singapore and APAC managers who want to operate the books themselves.' },
    ],
  },
  {
    slug: 'juniper-square',
    name: 'Juniper Square',
    summary: 'Investor CRM, LP portal and fund administration for private-markets managers.',
    knownFor: 'An investor CRM, an investor portal, investor onboarding with AML/KYC, and fund administration.',
    strongerWhen: [
      'Investor relations and fundraising CRM is your main need, and you want it tightly joined to the portal.',
      'You want to buy software and fund administration from one vendor.',
      'You want investor onboarding, the CRM and the portal in one product.',
    ],
    aamaFitsWhen: [
      'You want the ledger, NAV, waterfall and LP statements on one data model.',
      'You need Singapore-first compliance and IFRS 9 / SFRS(I) 9 accounting built in.',
      'You are an emerging manager who needs to start free or pay as you collect, not commit to a platform contract first.',
    ],
    accounting: 'Fund administration is offered; confirm whether you can operate the ledger yourself or whether accounting is delivered as a service.',
    onboarding: 'Juniper Square lists investor onboarding and AML/KYC; confirm the checks available for non-US investors.',
    structures: 'Confirm support for Singapore VCCs and APAC vehicles.',
    reconciliation: 'Ask who performs reconciliation, how often, and who signs it off.',
    portal: 'Juniper Square lists an investor portal; ask about white-labelling.',
    askVendor: [...COMMON_ASKS, 'Which modules are priced separately from the core platform'],
    migrateFrom: 'Juniper Square',
    sources: [{ label: 'Sacra: Juniper Square', url: 'https://sacra.com/research/juniper-square' }, { label: 'Software Advice: Juniper Square profile', url: 'https://www.softwareadvice.com/investment-management/juniper-square-profile/' }],
    faqs: [
      { q: 'What is the difference between Aama.io and Juniper Square?', a: 'Juniper Square leads with investor CRM and the investor portal, and also offers fund administration. Aama.io leads with accounting: the ledger, NAV and waterfall sit on the same data model as the investor portal.' },
      { q: 'Does Aama.io have a fundraising CRM?', a: 'No. Aama.io covers onboarding, the investor register, capital calls, distributions, accounting and the LP portal. If a dedicated fundraising CRM is central to how you work, Juniper Square is built around it.' },
      { q: 'Can I use Aama.io for Singapore funds?', a: 'Yes. Singapore and APAC are the primary focus, including MAS-aligned compliance monitoring and VCC structures.' },
    ],
  },
  {
    slug: 'allvue',
    name: 'Allvue',
    summary: 'Private capital software suite covering fund accounting, investor portal and portfolio monitoring.',
    knownFor: 'A suite of modules including fund accounting, investment accounting, corporate accounting, carry, investor portal, fundraising, portfolio monitoring and fund finance.',
    strongerWhen: [
      'You are a multi-strategy manager who needs the full suite, including portfolio monitoring and investment accounting.',
      'You have an in-house finance and operations team that will configure and run a broad suite.',
      'You already use several Allvue modules and want them on one vendor.',
    ],
    aamaFitsWhen: [
      'You want to be live without a long implementation project.',
      'Your fund count and team are small, and you want a lighter platform.',
      'You are in Singapore or APAC and want MAS and VCC practices to be the default.',
    ],
    accounting: 'Allvue lists a fund accounting module that maintains books and records at the fund or legal-entity level, alongside investment and corporate accounting.',
    onboarding: 'Allvue lists investor portal and fundraising modules; confirm what investor onboarding is included in your package.',
    structures: 'Confirm which fund structures are supported, including Singapore VCC handling.',
    reconciliation: 'Ask how bank and custodian reconciliation is handled in your set-up.',
    portal: 'Allvue lists an investor portal module; ask whether it is white-labelled.',
    askVendor: [...COMMON_ASKS, 'Which suite modules you actually need, and what each is priced at'],
    migrateFrom: 'Allvue',
    sources: [{ label: 'Allvue: investment accounting', url: 'https://allvuesystems.com/solutions/investment-accounting' }, { label: 'Capterra: Allvue Systems', url: 'https://www.capterra.com/p/122634/Allvue-Systems/' }],
    faqs: [
      { q: 'Is Aama.io an alternative to Allvue for smaller managers?', a: 'For fund accounting, administration and an LP portal, yes. Aama.io is designed for mid-market and boutique managers and does not try to match the breadth of Allvue’s suite, such as portfolio monitoring.' },
      { q: 'Who should stay with Allvue?', a: 'Managers with a dedicated operations team who use the wider suite may be well served by it.' },
      { q: 'How long does moving off Allvue take?', a: 'It depends on the number of funds, the history you bring and how clean the exports are. We agree a cut-over date and run the first close in parallel before you switch.' },
    ],
  },
  {
    slug: 'efront',
    name: 'eFront',
    summary: 'Alternative investment fund management software from BlackRock, positioned alongside Aladdin.',
    knownFor: 'Web-based, end-to-end alternative investment fund management software for GPs, covering the investment cycle from operations and fund management to investor relationship management.',
    strongerWhen: [
      'You want end-to-end coverage from operations to investor relations in one platform.',
      'You want your alternatives data connected to BlackRock’s Aladdin platform.',
      'You have the team and budget to run a multi-module implementation.',
    ],
    aamaFitsWhen: [
      'You are a mid-market or boutique manager and end-to-end scope would be more system than you need.',
      'You want pricing and implementation sized for a small team.',
      'You need Singapore and APAC regulation built into the default workflow.',
    ],
    accounting: 'eFront describes fund management from operations through investor relationship management; confirm the accounting scope in your package.',
    onboarding: 'Confirm which investor onboarding and KYC capabilities are included.',
    structures: 'Confirm which fund structures are supported, including Singapore VCC handling.',
    reconciliation: 'Part of the back-office modules; ask for detail on your set-up.',
    portal: 'Confirm investor portal capabilities and whether it can be white-labelled.',
    askVendor: [...COMMON_ASKS, 'Which modules are required for your use case'],
    migrateFrom: 'eFront',
    sources: [{ label: 'eFront: Invest for GP', url: 'https://www.efront.com/products/efront-invest-for-gp' }, { label: 'Capterra: eFront', url: 'https://capterra.com/p/76288/eFront/' }],
    faqs: [
      { q: 'Is Aama.io a lighter alternative to eFront?', a: 'For managers who need fund administration, accounting and an LP portal rather than a wider end-to-end platform, yes. We do not claim to replicate eFront’s full scope.' },
      { q: 'Who should stay on eFront?', a: 'Managers who use several eFront modules, or who depend on the connection to Aladdin.' },
      { q: 'Can Aama.io handle IFRS 9?', a: 'Yes. IFRS 9 / SFRS(I) 9 accounting is a core part of the Fund Accounting product.' },
    ],
  },
  {
    slug: 'fundwave',
    name: 'Fundwave',
    summary: 'Fund operations software for venture capital, private equity, corporate venture, family office and fund-of-funds teams.',
    knownFor: 'Software for VC, PE, fund-of-funds, corporate VC, family office and SPV teams that unites deal, investment and investor relations teams, with pipeline and portfolio management, LP reporting, capital notices and carry and fee allocations.',
    strongerWhen: [
      'Deal flow and portfolio tracking are the centre of your workflow and you want them tied to LP reporting.',
      'Your team already uses Fundwave and its workflows are embedded in how you operate.',
      'You are a venture or family office team that values a combined deal-to-reporting tool.',
    ],
    aamaFitsWhen: [
      'You want a full double-entry ledger and NAV engine behind your LP statements.',
      'You need IFRS 9 / SFRS(I) 9 accounting and Singapore-first compliance.',
      'You are a boutique administrator who needs a white-labelled portal across several clients.',
    ],
    accounting: 'Fundwave describes carry and management fee allocation and SPV administration; confirm the depth of the general ledger and NAV.',
    onboarding: 'Confirm KYC/AML scope and e-signature support for your investor base.',
    structures: 'Fundwave lists SPVs among the fund types it serves; confirm VCC and sub-fund support.',
    reconciliation: 'Ask how bank and custodian reconciliation is handled.',
    portal: 'LP reporting is a core part; ask about white-labelling.',
    askVendor: COMMON_ASKS,
    migrateFrom: 'Fundwave',
    sources: [{ label: 'Fundwave: homepage', url: 'https://www.fundwave.com' }],
    faqs: [
      { q: 'How is Aama.io different from Fundwave?', a: 'Fundwave combines deal and portfolio workflows with LP reporting. Aama.io is accounting-led: a fund-grade ledger, NAV and waterfall engine behind the LP portal. If deal tracking is your main need, Fundwave’s focus is closer to it.' },
      { q: 'Does Aama.io track deal flow?', a: 'No. It covers administration, accounting and the LP portal.' },
      { q: 'Can I run SPVs on Aama.io?', a: 'Yes. SPV Fund Management is a flagship product covering formation through distributions and accounting.' },
    ],
  },
  {
    slug: 'fundcount',
    name: 'FundCount',
    summary: 'Unified accounting and investment software for portfolio and partnership accounting.',
    knownFor: 'One investment record across asset classes posted to a multi-currency general ledger, with capital accounts, waterfalls and allocations calculated by the system, and a branded investor portal.',
    strongerWhen: [
      'You manage a wide range of asset classes and want one investment-aware ledger under every entity.',
      'You want custodian, broker and price feeds consolidated into one book, as FundCount describes.',
      'You are already on FundCount and the workflows are configured to your needs.',
    ],
    aamaFitsWhen: [
      'You want a Singapore and APAC-first set-up, with MAS and VCC practices as the default.',
      'You want SPV administration and a white-labelled LP portal on the same data model as the ledger.',
      'You want AI-assisted extraction from invoices, bank statements and custodian statements, with a person posting every entry.',
    ],
    accounting: 'FundCount describes a multi-currency, investment-aware ledger with capital accounts, waterfalls and allocations; confirm fit for your fund type.',
    onboarding: 'Confirm which investor onboarding capabilities are included.',
    structures: 'Confirm VCC and SPV handling for your structure.',
    reconciliation: 'FundCount describes consolidating custodian, broker and price feeds into one book; ask how it applies to your banks and custodians.',
    portal: 'FundCount describes a branded investor portal; confirm what it covers.',
    askVendor: COMMON_ASKS,
    migrateFrom: 'FundCount',
    sources: [{ label: 'FundCount: homepage', url: 'https://www.fundcount.com' }],
    faqs: [
      { q: 'Is Aama.io a FundCount alternative?', a: 'For private equity, venture and SPV fund accounting plus an LP portal, yes. For multi-asset portfolio analytics across many asset classes, FundCount’s scope may be wider.' },
      { q: 'Does Aama.io support IFRS 9?', a: 'Yes. IFRS 9 / SFRS(I) 9 is built into Fund Accounting.' },
      { q: 'How does AI work in Aama.io accounting?', a: 'AI reads invoices, bank statements and custodian statements and suggests ledger mapping. A person confirms it and posts every journal voucher.' },
    ],
  },
  {
    slug: 'sydecar',
    name: 'Sydecar',
    summary: 'Back-office platform for venture SPVs, syndicates and funds.',
    knownFor: 'End-to-end SPV formation and back-office administration, including banking, KYC/AML, filings, K-1s and tax filings, with syndicate tools such as carry sharing, investor onboarding and communications.',
    strongerWhen: [
      'You run venture SPVs and want formation, banking and tax documents handled in one place.',
      'You run many one-off deals and value a product built around that single workflow.',
      'You want SPV fees stated up front by the vendor.',
    ],
    aamaFitsWhen: [
      'You want the SPV accounted for on a real ledger from the first day.',
      'You are in Singapore or APAC and need MAS, VCC and IFRS 9 / SFRS(I) 9 practices as the default.',
      'You want the SPV, a fund or a VCC and the LP portal on the same accounting data model.',
    ],
    accounting: 'SPV administration and reporting are part of the service; confirm how the books are kept and who produces the financial statements.',
    onboarding: 'Investor onboarding and tax documentation are part of the platform; confirm KYC scope for non-US investors.',
    structures: 'Confirm which jurisdictions and vehicle types are supported, including Singapore and APAC.',
    reconciliation: 'Banking is part of the platform; ask how bank activity is reconciled to the ledger.',
    portal: 'Syndicate and member tools are included; ask about white-labelling to your own brand.',
    askVendor: [...COMMON_ASKS, 'The fee for a single SPV and for a syndicate, in writing, and what is excluded', 'Which jurisdictions and vehicle types are supported'],
    migrateFrom: 'Sydecar',
    sources: [{ label: 'Sydecar: syndicate leads', url: 'https://www.sydecar.io/founder-syndicates' }, { label: 'Altss: Sydecar profile', url: 'https://altss.com/profile/sydecar' }],
    faqs: [
      { q: 'How is Aama.io different from Sydecar?', a: 'Sydecar describes itself as offering end-to-end SPV formation and complete back-office administration. Aama.io covers SPVs too, and runs them on the same accounting data model as funds, VCCs and the LP portal, with Singapore and APAC practice as the default.' },
      { q: 'Does Aama.io publish SPV pricing?', a: 'Yes. A single SPV is USD 3,900, and a syndicate SPV is 2% of the raise (min USD 3,500, cap USD 10,000). Government and registry fees are extra and passed through at cost, and the fee starts when the first LP payment is recorded.' },
      { q: 'Can I move existing SPVs over?', a: 'Yes, as a scoped project: investor register, capital contributions, bank balance and documents. See the migration steps above.' },
    ],
  },
  {
    slug: 'auptimate',
    name: 'Auptimate',
    summary: 'Singapore-based platform for setting up and running SPVs, syndicates and funds.',
    knownFor: 'SPVs (syndicate, multi-asset, founder and credit), a fund-in-a-box product for emerging managers, and fund administration, covering legal documents, banking, investor onboarding, accounting and reporting.',
    strongerWhen: [
      'You want one Singapore-based vendor for legal documents, banking, investor onboarding, accounting and reporting.',
      'You want a bundled service rather than software your own team operates.',
      'You are already on Auptimate and your vehicles are set up there.',
    ],
    aamaFitsWhen: [
      'You want the SPV, funds and LP portal on one accounting data model that you can operate yourself.',
      'You run several SPVs or a fund and want one dashboard and one investor login across them.',
      'You are a boutique administrator who needs a white-labelled portal for your own clients.',
    ],
    accounting: 'Auptimate lists accounting and reporting across the vehicle lifecycle; confirm how it is delivered and who produces the financial statements.',
    onboarding: 'Investor onboarding is included; confirm KYC checks and e-signature support for your investor base.',
    structures: 'Auptimate lists Singapore, Cayman Islands and Delaware structures; confirm VCC and your structure.',
    reconciliation: 'Ask how bank and custodian activity is reconciled and who signs it off.',
    portal: 'Investor communications are included; ask about white-labelling.',
    askVendor: [...COMMON_ASKS, 'The one-off and annual fees for your vehicle type, in writing, and what is excluded'],
    migrateFrom: 'Auptimate',
    sources: [{ label: 'Auptimate: homepage', url: 'https://www.auptimate.com' }, { label: 'TechNode: Auptimate', url: 'https://technode.global/?p=84942' }, { label: 'DealStreetAsia: Auptimate', url: 'https://dealstreetasia.com/partner-content/auptimate-an-spv-and-funds-platform-crosses-100-million-in-assets-under-administration' }],
    faqs: [
      { q: 'How is Aama.io different from Auptimate?', a: 'Both serve Singapore and APAC SPVs. Aama.io is built so that the SPV, the fund and the LP portal share one accounting model, and you can run it yourself or as a white-labelled administrator.' },
      { q: 'When should I stay with Auptimate?', a: 'If you want a bundled service from one Singapore-based vendor, covering legal documents, banking, onboarding and reporting, Auptimate may suit you better.' },
      { q: 'Does Aama.io form the SPV?', a: 'Yes. SPV Fund Management covers formation, KYC and capital collection, with government and registry fees passed through at cost.' },
    ],
  },
  {
    slug: 'angellist',
    name: 'AngelList',
    summary: 'SPVs, rolling funds and venture fund administration for fund managers.',
    knownFor: 'SPV back office (formation, filings, tax paperwork), rolling funds, and fund administration for venture funds covering fund accounting, taxes, an LP portal and audit support.',
    strongerWhen: [
      'You want rolling funds or a complete venture fund administration service.',
      'You want SPV formation and US tax documents handled by one provider.',
      'You value being on the platform where many US syndicate leads and LPs already are.',
    ],
    aamaFitsWhen: [
      'You are in Singapore or APAC and need local structures and practice as the default.',
      'You want to operate the books and portal yourself rather than buy a managed service.',
      'You want a start that is free or pay-when-you-collect.',
    ],
    accounting: 'Fund accounting and tax are delivered as part of its administration service; confirm whether you can operate the ledger yourself.',
    onboarding: 'LP onboarding is part of SPVs, rolling funds and fund administration; confirm checks for non-US investors.',
    structures: 'Offers SPVs and rolling funds; confirm Singapore and APAC vehicles.',
    reconciliation: 'Part of the managed administration service; ask who performs it.',
    portal: 'LP portal included in the administration service; ask about white-labelling.',
    askVendor: [...COMMON_ASKS, 'The set-up fee, carry or other economics, and any state or registry fees, in writing'],
    migrateFrom: 'AngelList',
    sources: [{ label: 'AngelList: syndicates', url: 'https://www.angellist.com/funds/syndicates' }, { label: 'AngelList help: fund administration service tiers', url: 'https://help.angellist.com/hc/en-us/sections/36971630042125-Fund-Administration-Service-Tiers' }],
    faqs: [
      { q: 'Is Aama.io an AngelList alternative?', a: 'For SPVs, fund administration, accounting and an LP portal, yes, particularly for Singapore and APAC managers. Aama.io does not offer rolling funds.' },
      { q: 'Who should stay on AngelList?', a: 'Managers who want rolling funds or a full-service venture fund administration offering, or who rely on its network, are well served by staying.' },
      { q: 'Can I move SPVs off AngelList?', a: 'Yes, as a scoped project. The practical steps are in the migration section above.' },
    ],
  },
];

export const competitorBySlug = (slug: string) => COMPETITORS.find((c) => c.slug === slug);

// What Aama.io offers, in the same six dimensions. Every line restates what the
// product pages already say; do not add capabilities here that are not live.
export const AAMA = {
  accounting: 'Double-entry general ledger, automated NAV (daily to quarterly), European and American waterfalls, 12+ built-in reports, IFRS 9 / SFRS(I) 9 accounting. Runs on its own or with Fund Administration.',
  onboarding: 'Online subscription with e-signatures, KYC/AML and accreditation checks, entity and joint-holder support, with a time-stamped audit trail.',
  structures: 'SPVs and syndicates, VC/PE funds, private credit and family offices, with Singapore VCC and MAS-aligned compliance monitoring.',
  reconciliation: 'Bank, broker and custodian management with reconciliation. AI suggests ledger mapping from statements; a person confirms and posts.',
  portal: 'White-labelled LP portal on your brand and domain: live positions, capital account statements, documents and one login across funds.',
  pricing: 'Published for SPVs: single SPV USD 3,900, syndicate SPV 2% of the raise (min USD 3,500, cap USD 10,000), government and registry fees extra. Launch Free covers the LP portal for one fund up to 10 investors, through first close. Migration to Aama.io is free.',
};

// ── Alternatives pages ──────────────────────────────────────────────────────

export type AlternativesPage = {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  keywords: string;
  intro: string;
  /** Comparison slug this page is about, if it targets one vendor. */
  vendor?: string;
  /** Hub pages: several vendors, one section each. */
  vendors?: string[];
  /** Slugs of competitors listed as options, in order. */
  options: string[];
  criteria: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

const SWITCH_CRITERIA = [
  { title: 'Who operates the books', text: 'Decide whether you want a managed service or software your own team runs. The two are priced and staffed very differently.' },
  { title: 'One data model', text: 'Ask whether the ledger, the investor register and the LP portal share one record, or whether you will reconcile between them.' },
  { title: 'Regulation and structure fit', text: 'For Singapore and APAC, check MAS, VCC and IFRS 9 / SFRS(I) 9 handling for your actual vehicle.' },
  { title: 'Total cost for your size', text: 'Get a written first-year quote for your fund and investor counts, including implementation and each extra vehicle.' },
  { title: 'Time to first close', text: 'Ask how long until your first capital call and first NAV are produced on the new system.' },
];

const SPV_CRITERIA = [
  { title: 'Formation and administration', text: 'Check that the platform runs the vehicle after it is formed: register, capital, carry, distributions and filings.' },
  { title: 'Accounting from day one', text: 'Ask whether the SPV’s books sit on a real ledger, and who produces the financial statements.' },
  { title: 'Jurisdiction fit', text: 'Confirm the vehicles and jurisdictions you actually use, including Singapore and other APAC structures.' },
  { title: 'Clear pricing', text: 'Get set-up, annual and per-deal fees in writing, with government and registry fees shown separately.' },
  { title: 'A path to a fund', text: 'If you may launch a fund or VCC, check you can do it on the same data model without moving platform.' },
];

/** Head-to-head /compare pages are held back until counsel has reviewed them. */
/** One page for every "X alternative" search; each vendor gets its own section and anchor. */
export const ALTERNATIVES_HUB: AlternativesPage = {
  slug: '',
  title: 'Carta, Juniper Square and Allvue Alternatives for Fund Managers',
  h1: 'Carta, Juniper Square and Allvue alternatives for fund managers',
  metaDescription: 'Looking at Carta, Juniper Square or Allvue alternatives? See what Aama.io offers emerging and boutique fund managers in Singapore and APAC: fund accounting, administration, an LP portal and free migration.',
  keywords: 'Carta alternative, Carta alternatives, Juniper Square alternative, Juniper Square alternatives, Allvue alternative, Allvue alternatives, Investran alternative, fund administration software alternatives, fund administration software Singapore',
  intro: 'Looking at alternatives to Carta, Juniper Square or Allvue? Aama.io is fund administration, accounting and an LP portal for emerging and boutique managers and fund administrators in Singapore and APAC. Here is what it offers, when it may be the closer fit, and how a move works, including free migration from a team that has moved more than 15 funds off legacy systems.',
  vendors: ['carta', 'juniper-square', 'allvue'],
  options: ['carta', 'juniper-square', 'allvue'],
  criteria: SWITCH_CRITERIA,
  faqs: [
    { q: 'What does Aama.io offer a fund manager looking for a Carta alternative?', a: 'Fund accounting with a double-entry ledger and NAV, fund administration with KYC onboarding and capital calls, SPV administration and a white-labelled LP portal, on one data model, with Singapore and APAC compliance handled by default.' },
    { q: 'What does Aama.io offer a team looking for a Juniper Square alternative?', a: 'The ledger, NAV, waterfalls, LP statements and a white-labelled LP portal on one data model. Aama.io does not include a fundraising CRM, so many managers keep the one they already use.' },
    { q: 'What does Aama.io offer a team looking for an Allvue alternative?', a: 'Fund accounting, fund administration and an LP portal for mid-market and boutique managers, with a shorter path to going live. Aama.io focuses on administration, accounting and the LP portal; it does not offer portfolio monitoring across large books or a fundraising CRM.' },
    { q: 'Have you migrated funds from legacy systems before?', a: 'Yes. We have migrated more than 15 funds from legacy systems to our platform. Migration is free, and we agree the scope, timing and what data can be migrated with you in writing before any work starts.' },
    { q: 'Do you charge for migration?', a: 'No, we offer free migration to Aama.io. We agree the scope, timing and what data can be migrated with you in writing before any work starts, and the offer may change, so ask us for current terms.' },
    { q: 'How long does it take to get started?', a: 'New funds are typically operational within 2 weeks. Migrating an existing fund takes longer or shorter depending on its size and type, and we agree the timing with you before any work starts.' },
    { q: 'What do I need to move?', a: 'Typically the investor register, commitments and called capital, the opening trial balance, and the transaction history you want to keep. We agree the scope with you in writing first.' },
    { q: 'Is there a free way to try the LP portal?', a: 'Launch Free covers the LP portal for one fund with up to 10 investors, through first close. Terms may change; see the pricing page.' },
  ],
};

export const ALTERNATIVES: AlternativesPage[] = [
  {
    slug: 'best-fund-administration-software',
    title: 'Best Fund Administration Software: Singapore and APAC',
    h1: 'Best fund administration software for Singapore and APAC managers',
    metaDescription: 'How to choose fund administration and fund accounting software in Singapore and APAC: VCC, MAS and IFRS 9 fit, investor onboarding, LP portal, cost, and a free way to start.',
    keywords: 'best fund administration software, best fund administration software Singapore, fund administration software Singapore, fund accounting software, best fund accounting software for emerging fund managers, VCC fund administration, MAS fund administration software, emerging manager platform, Investran alternative',
    intro: 'Choosing fund administration software turns on regulation and structure fit as much as features, and emerging managers also need accounting that is audit-ready from the first close without a long implementation. We publish Aama.io, so "best" here means best for the criteria below, which is our view, not an independent ranking.',
    options: ['carta', 'juniper-square', 'fundwave', 'fundcount', 'allvue', 'efront'],
    criteria: [
      { title: 'VCC and sub-fund handling', text: 'Confirm umbrella and standalone VCC support and sub-fund segregation for your vehicle.' },
      { title: 'MAS-aligned compliance', text: 'Check that compliance monitoring and reporting reflect MAS expectations for your licence type.' },
      { title: 'IFRS 9 / SFRS(I) 9 accounting', text: 'Make sure amortised cost, fair value and ECL treatment are supported where relevant.' },
      { title: 'A real double-entry ledger', text: 'Check for a chart of accounts, journal vouchers, reversals and an audit trail, not a spreadsheet export. NAV and waterfalls should come from the same data.' },
      { title: 'KYC/AML onboarding and an LP portal', text: 'Look for online subscription, e-signatures and screening for regional investors, and a white-labelled portal with one login across funds.' },
      { title: 'Cost that scales with you', text: 'Look for a free or low-commitment start and pricing per vehicle, not a platform fee sized for a large fund. Confirm your own team can run it if you want to self-administer.' },
    ],
    faqs: [
      { q: 'What is the best fund administration software in Singapore?', a: 'It depends on your size and structure. For mid-market and boutique managers and fund administrators who want MAS, VCC and IFRS 9 / SFRS(I) 9 handled by default, Aama.io is built for that. Larger managers may prefer broader suites.' },
      { q: 'What should an emerging manager look for in fund accounting software?', a: 'A genuine double-entry ledger, NAV and waterfalls on the same data, built-in reports your auditor accepts, and pricing that does not require a large fund to justify it.' },
      { q: 'Do I need an administrator or can I self-administer?', a: 'Many emerging managers self-administer on software until the fund grows. Others use an administrator. Aama.io works for both, including white-labelled use by boutique administrators.' },
      { q: 'Can I start free?', a: 'Launch Free covers the Aama.io LP portal for one fund with up to 10 investors, through first close. It does not include fund accounting; SPVs and larger funds use pay-when-you-collect. Terms may change; see the pricing page.' },
      { q: 'Do I need a licence to use fund administration software?', a: 'Software does not need a licence, but your fund management activity may. See our guide to fund management licensing in Singapore.' },
      { q: 'I use Investran or another established platform. Can I move to Aama.io?', a: 'Yes, as a scoped project, and migration is free. We have migrated more than 15 funds from legacy systems to our platform. We agree the scope, timing and what data can be migrated with you in writing before any work starts. New funds are typically operational within 2 weeks.' },
      { q: 'Does it support VCCs?', a: 'Yes. See the VCC fund management software page for structure details.' },
    ],
  },
  {
    slug: 'best-spv-administration-software',
    title: 'Best SPV Administration Software',
    h1: 'Best SPV administration software for syndicate leads and fund managers',
    metaDescription: 'How to choose SPV administration software: formation to accounting, investor onboarding, carry, cost and the main platforms compared, with SPV pricing published.',
    keywords: 'best SPV administration software, SPV administration software, SPV management software, SPV platform Singapore, syndicate management software, Sydecar alternative, Auptimate alternative, AngelList alternative',
    intro: 'The right SPV platform depends on whether you only need to form a vehicle or to run it. If you are comparing Sydecar, Auptimate, AngelList or Aama.io, start with the criteria below. We publish Aama.io, so "best" here means best for those criteria, which is our view, not an independent ranking.',
    options: ['sydecar', 'auptimate', 'angellist', 'carta'],
    criteria: SPV_CRITERIA,
    faqs: [
      { q: 'What is the difference between SPV formation and SPV administration?', a: 'Formation sets up the vehicle. Administration runs it afterwards: investor register, capital collection, carry, distributions, accounting and filings. Ask any provider about both.' },
      { q: 'What does Aama.io offer for SPVs?', a: 'SPV management and administration from formation to distributions: cap table, KYC/AML, capital calls, lead carry, the general ledger and NAV, and a member portal, on one data model.' },
      { q: 'How much does SPV administration cost?', a: 'It varies by provider. Aama.io publishes a single SPV at USD 3,900 and a syndicate SPV at 2% of the raise (min USD 3,500, cap USD 10,000), with government and registry fees extra. For any other provider, get a written quote.' },
      { q: 'I am looking at Sydecar, Auptimate or AngelList. What should I compare?', a: 'Use the criteria on this page: what is covered from formation to distributions, who keeps the books, how investors are onboarded, the total cost in year one and year three, and how you export your data if you leave. Ask each provider for written answers.' },
      { q: 'Can I move existing SPVs to Aama.io?', a: 'Yes, as a scoped project, and migration is free. We agree the scope, timing and what data can be migrated with you in writing before any work starts.' },
      { q: 'Can I run many SPVs in one place?', a: 'Yes in Aama.io; multiple vehicles sit in one dashboard with one investor login.' },
    ],
  },
];

export const alternativesBySlug = (slug: string) => ALTERNATIVES.find((a) => a.slug === slug);

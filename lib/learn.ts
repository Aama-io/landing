import { solutionBySlug, type SolutionNav } from './solutions';
import { TOOL_CONTENT } from './toolContent';

// Learn (glossary) data — single source of truth for /learn, /learn/[topic] and
// /learn/[topic]/[term]. Each term is definition-first: a 40–60 word direct
// answer, a key-facts table, a worked example and an FAQ that is rendered AND
// emitted as matching FAQPage JSON-LD. Adding a term = adding one object to
// LEARN_TERMS below; the pages, sitemap and internal links follow from it.

export interface LearnTopic {
  slug: string;
  title: string;
  blurb: string;
}

export interface LearnTerm {
  slug: string;
  topic: string;
  /** Display name, e.g. "Variable Capital Company (VCC)". */
  term: string;
  /** Short form used in lists and breadcrumbs, e.g. "VCC". */
  shortName: string;
  /** H1 / <title> — query language, e.g. "What is a VCC? Singapore Variable Capital Company Explained". */
  title: string;
  /** Meta description, 150–160 chars. */
  description: string;
  /** The citable answer. 40–60 words, no preamble. */
  directAnswer: string;
  keyFacts: { label: string; value: string }[];
  /** How it works — ordered steps. */
  howItWorks: { heading: string; body: string }[];
  workedExample: {
    title: string;
    setup: string;
    /** Table rows, e.g. step → amount. */
    rows: { label: string; value: string }[];
    takeaway: string;
  };
  mistakes: string[];
  /** The Singapore / APAC angle — the differentiator vs generic glossaries. */
  singaporeNote: string;
  faqs: { q: string; a: string }[];
  relatedTerms: string[];
  /** Tool hrefs — must exist in TOOL_CONTENT. */
  relatedTools: string[];
  relatedPosts: { slug: string; title: string }[];
  /** Slug in lib/solutions.ts. */
  relatedSolution?: string;
  /** Who to check with, shown in the "may change" notice, e.g. ['MAS', 'ACRA']. */
  authorities: string[];
  sources: { label: string; url: string }[];
  author: string;
  publishedDate: string;
  /** Bump whenever the facts are re-checked against the sources above. */
  lastReviewed: string;
}

export const LEARN_TOPICS: LearnTopic[] = [
  {
    slug: 'singapore-fund-structures',
    title: 'Singapore fund structures & regulation',
    blurb: 'VCCs, MAS licensing and tax incentives — how funds are set up and regulated in Singapore.',
  },
  {
    slug: 'fund-economics',
    title: 'Fund economics',
    blurb: 'Waterfalls, carried interest, fees and returns — how money moves between LPs and the GP.',
  },
  {
    slug: 'fund-accounting',
    title: 'Fund accounting',
    blurb: 'NAV, fair value and IFRS 9 / SFRS(I) 9 — how fund books are kept and valued.',
  },
  {
    slug: 'lp-reporting',
    title: 'LP reporting & performance',
    blurb: 'TVPI, DPI, RVPI and the metrics limited partners use to judge a fund.',
  },
  {
    slug: 'fund-operations',
    title: 'Fund operations',
    blurb: 'Capital calls, distributions, investor servicing and the day-to-day mechanics of running a fund.',
  },
];

const AUTHOR = 'aama.io Fund Operations Team';

export const LEARN_TERMS: LearnTerm[] = [
  {
    slug: 'vcc',
    topic: 'singapore-fund-structures',
    term: 'Variable Capital Company (VCC)',
    shortName: 'VCC',
    title: 'What is a VCC? Singapore Variable Capital Company Explained',
    description:
      'A VCC is a Singapore fund structure that holds one fund or ring-fenced sub-funds under one entity. How it works, who you must appoint, costs and a worked example.',
    directAnswer:
      'A Variable Capital Company (VCC) is a Singapore corporate fund structure, available since January 2020, that can hold a single fund or an umbrella of ring-fenced sub-funds. It issues and redeems shares at net asset value without a capital-reduction process, and must be managed by an MAS-regulated fund manager.',
    keyFacts: [
      { label: 'Governing law', value: 'Variable Capital Companies Act 2018' },
      { label: 'Incorporated and filed with', value: 'ACRA' },
      { label: 'Fund manager regulated by', value: 'MAS' },
      { label: 'Structures', value: 'Standalone (one fund) or umbrella (multiple sub-funds)' },
      { label: 'Asset segregation', value: 'Assets and liabilities ring-fenced per sub-fund' },
      { label: 'ACRA fees', value: 'S$8,000 to incorporate an umbrella VCC; S$400 per sub-fund registered' },
      { label: 'Used by', value: 'PE, VC, hedge, credit and real-asset funds; family offices' },
    ],
    howItWorks: [
      {
        heading: 'Choose the structure',
        body: 'A standalone VCC holds one fund. An umbrella VCC holds several sub-funds, each with its own strategy, investors and assets, under one legal entity and one board.',
      },
      {
        heading: 'Appoint a permissible fund manager',
        body: 'The VCC cannot manage itself. It needs a manager regulated by MAS — a licensed fund management company, a venture capital fund manager, or an eligible family-office arrangement.',
      },
      {
        heading: 'Fill the mandatory roles',
        body: 'A VCC needs at least one Singapore-resident director who is also a director or qualified representative of the fund manager, a Singapore company secretary, a fund administrator and an auditor.',
      },
      {
        heading: 'Incorporate and register sub-funds',
        body: 'Incorporation is filed with ACRA. Each new sub-fund is then registered rather than set up as a new company, which is why umbrellas get cheaper per strategy over time.',
      },
      {
        heading: 'Issue and redeem shares at NAV',
        body: 'Because capital is variable, the VCC can issue and redeem shares at net asset value without the shareholder approvals and capital-reduction process an ordinary company needs.',
      },
      {
        heading: 'Apply for a tax incentive separately',
        body: 'A VCC is a legal structure, not a tax exemption. Tax-exempt treatment on qualifying fund income comes from an incentive such as Section 13O or 13U, applied for separately.',
      },
    ],
    workedExample: {
      title: 'Umbrella vs standalone: launching a second strategy',
      setup:
        'A manager launches a growth equity fund, then a credit fund two years later. Compare ACRA fees only (professional fees, which are the larger cost, vary by provider).',
      rows: [
        { label: 'Standalone route: VCC #1 incorporation', value: 'S$8,000' },
        { label: 'Standalone route: VCC #2 incorporation', value: 'S$8,000' },
        { label: 'Standalone route total (ACRA)', value: 'S$16,000' },
        { label: 'Umbrella route: VCC incorporation', value: 'S$8,000' },
        { label: 'Umbrella route: two sub-funds registered (2 × S$400)', value: 'S$800' },
        { label: 'Umbrella route total (ACRA)', value: 'S$8,800' },
      ],
      takeaway:
        'The umbrella saves S$7,200 in registration fees on two strategies, and also shares one board, secretary, administrator and auditor across both — the larger recurring saving.',
    },
    mistakes: [
      'Treating the VCC as a tax scheme. It is not; Section 13O or 13U is applied for separately.',
      'Choosing standalone when an umbrella would have been cheaper across the strategies you actually plan to launch.',
      'Starting bank-account opening late. It is often the slowest step in the timeline.',
      'Forgetting that the fund manager must be MAS-regulated before the VCC can operate.',
    ],
    singaporeNote:
      'The VCC regime is Singapore-specific and sits alongside, not instead of, the Cayman and Delaware structures many Asia managers still use. Its draw for mid-market managers is onshore substance: one regulator-recognised vehicle, sub-fund ring-fencing and access to the Section 13O and 13U incentives. VCC financial statements must be prepared under IFRS, SFRS(I) or US GAAP and audited, which is where sub-fund-level accounting becomes an operational requirement, not an option.',
    faqs: [
      {
        q: 'What does VCC stand for?',
        a: 'VCC stands for Variable Capital Company. "Variable capital" refers to the ability to issue and redeem shares at net asset value without the capital-reduction process an ordinary company needs.',
      },
      {
        q: 'Is a VCC tax-exempt?',
        a: 'No. A VCC is a legal structure. To exempt qualifying fund income from Singapore tax, the fund applies for an incentive such as Section 13O or 13U, each with its own AUM, headcount and local-spend conditions.',
      },
      {
        q: 'What is the difference between an umbrella and a standalone VCC?',
        a: 'A standalone VCC holds one fund. An umbrella VCC holds multiple sub-funds under one legal entity, with each sub-fund\'s assets and liabilities ring-fenced from the others.',
      },
      {
        q: 'Who regulates a VCC?',
        a: 'ACRA handles incorporation and corporate filings. The VCC\'s fund manager is regulated by MAS.',
      },
      {
        q: 'Can a VCC be used for private equity and venture capital?',
        a: 'Yes. VCCs are used for open-ended and closed-ended funds across PE, VC, hedge, credit and real assets, and by family offices.',
      },
    ],
    relatedTerms: ['13o-13u', 'fund-administrator', 'capital-call'],
    relatedTools: ['/tools/vcc-comparator', '/tools/vcc-cost-estimator', '/tools/mas-licensing-estimator'],
    relatedPosts: [
      { slug: 'how-to-set-up-a-vcc-singapore', title: 'How to Set Up a VCC in Singapore (2026)' },
      { slug: 'section-13o-vs-13u-singapore', title: 'Section 13O vs 13U (2026)' },
    ],
    relatedSolution: 'vc-pe-firms',
    authorities: ['ACRA', 'MAS'],
    sources: [
      { label: 'ACRA — Variable Capital Companies', url: 'https://www.acra.gov.sg' },
      { label: 'MAS — Variable Capital Companies', url: 'https://www.mas.gov.sg' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'distribution-waterfall',
    topic: 'fund-economics',
    term: 'Distribution Waterfall',
    shortName: 'Waterfall',
    title: 'What is a Distribution Waterfall? PE & VC Fund Waterfalls Explained',
    description:
      'A distribution waterfall sets the order in which fund proceeds go to LPs and the GP: return of capital, preferred return, catch-up and carry. Worked example included.',
    directAnswer:
      'A distribution waterfall is the order of priority in which a fund\'s proceeds are paid out. Typically LPs first receive their invested capital back, then a preferred return, then the GP receives a catch-up, and finally profits are split between LPs and the GP, usually 80/20, as carried interest.',
    keyFacts: [
      { label: 'Defined in', value: 'The limited partnership agreement (LPA)' },
      { label: 'Common tiers', value: 'Return of capital → preferred return → GP catch-up → carried interest split' },
      { label: 'Typical preferred return', value: '8% a year, compounding (negotiated per fund)' },
      { label: 'Typical carry', value: '20% of profits' },
      { label: 'Two main models', value: 'European (whole-fund) and American (deal-by-deal)' },
      { label: 'Protection for LPs', value: 'GP clawback if carry is overpaid' },
    ],
    howItWorks: [
      {
        heading: 'Tier 1: return of capital',
        body: 'Distributions first go to LPs until they have received back all capital they have contributed. In a European waterfall this is all contributed capital across the fund; in an American waterfall it is the capital for the deals being realised.',
      },
      {
        heading: 'Tier 2: preferred return (hurdle)',
        body: 'LPs then receive a preferred return on their contributed capital, commonly 8% a year compounding. The GP earns no carry until this hurdle is cleared.',
      },
      {
        heading: 'Tier 3: GP catch-up',
        body: 'The GP then receives a large share, often 100%, of distributions until it has received its carry percentage of total profit so far (preferred return plus catch-up). A partial catch-up (for example 50%) is also used.',
      },
      {
        heading: 'Tier 4: carried interest split',
        body: 'All remaining proceeds are split between LPs and the GP at the carry ratio, typically 80% to LPs and 20% to the GP.',
      },
      {
        heading: 'Clawback',
        body: 'If the GP has been paid more carry than it is entitled to over the fund\'s life, which is more likely under an American waterfall, the LPA may require it to return the excess.',
      },
    ],
    workedExample: {
      title: 'European waterfall: $100M fund, $180M of proceeds',
      setup:
        'LPs contributed $100M. The fund distributes $180M in total. Terms: 8% compounding preferred return, 100% GP catch-up, 20% carry. For simplicity, assume all $100M was outstanding for 4 years, so the preferred return is $100M × (1.08⁴ − 1) ≈ $36M.',
      rows: [
        { label: 'Tier 1: return of capital to LPs', value: '$100M' },
        { label: 'Tier 2: preferred return to LPs', value: '$36M' },
        { label: 'Tier 3: GP catch-up (solves C = 20% × (36 + C), so C = 9)', value: '$9M' },
        { label: 'Distributed after tier 3', value: '$145M' },
        { label: 'Tier 4: remaining $35M — 80% to LPs', value: '$28M' },
        { label: 'Tier 4: remaining $35M — 20% to GP', value: '$7M' },
        { label: 'Total to LPs ($100M + $36M + $28M)', value: '$164M' },
        { label: 'Total carry to GP ($9M + $7M)', value: '$16M' },
      ],
      takeaway:
        'Total profit is $80M ($180M − $100M) and the GP\'s $16M is exactly 20% of it. A full catch-up restores the GP to the headline carry rate once the hurdle is cleared.',
    },
    mistakes: [
      'Assuming 20% carry is paid on all profit regardless of the hurdle. Below the preferred return the GP earns nothing.',
      'Mixing up the catch-up percentage with the carry percentage. They are separate negotiated terms.',
      'Modelling an American waterfall as if it were European. Early deal-by-deal carry can exceed the whole-fund entitlement and trigger a clawback.',
      'Ignoring management fees and fund expenses, which are part of the capital LPs must get back in tier 1.',
    ],
    singaporeNote:
      'Waterfall terms are set in the fund documents (LPA for a limited partnership; the constitution and subscription documents for a VCC), not by Singapore law, so the economics are market-negotiated. What the Singapore context adds is operational: a VCC with several sub-funds needs the waterfall calculated per sub-fund, and the GP\'s carry tax treatment depends on whether the fund holds a Section 13O or 13U incentive.',
    faqs: [
      {
        q: 'What is the difference between a European and an American waterfall?',
        a: 'A European (whole-fund) waterfall returns all contributed capital and the preferred return before the GP earns any carry. An American (deal-by-deal) waterfall calculates carry as each deal is realised, so the GP is paid earlier but clawback risk is higher.',
      },
      {
        q: 'What is a GP catch-up?',
        a: 'The catch-up is the tier after the preferred return in which the GP receives a large share, often 100%, of distributions until it has received its carry percentage of total profit to date.',
      },
      {
        q: 'What is a preferred return?',
        a: 'The preferred return, or hurdle, is the minimum annual return LPs must receive on their contributed capital before the GP earns carry. 8% a year, compounding, is common.',
      },
      {
        q: 'Where is the waterfall defined?',
        a: 'In the fund\'s legal documents, usually the limited partnership agreement. The terms are negotiated and vary by fund.',
      },
    ],
    relatedTerms: ['capital-call', 'carried-interest', 'management-fee'],
    relatedTools: ['/tools/waterfall', '/tools/waterfall-comparator', '/tools/fee-carry-modeler'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    authorities: ['your fund documents (LPA)', 'legal counsel'],
    sources: [
      { label: 'ILPA Principles 3.0', url: 'https://ilpa.org/ilpa-principles/' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'capital-call',
    topic: 'fund-operations',
    term: 'Capital Call',
    shortName: 'Capital call',
    title: 'What is a Capital Call? How Drawdowns Work in PE & VC Funds',
    description:
      'A capital call (drawdown) is a request for LPs to pay part of their committed capital. How notices work, what they fund, a worked example and common mistakes.',
    directAnswer:
      'A capital call, also called a drawdown, is a formal request from a fund manager for limited partners to pay in part of the capital they committed. Funds call capital as needed for investments, fees and expenses, rather than collecting the full commitment upfront, and each LP pays pro rata to its commitment.',
    keyFacts: [
      { label: 'Also called', value: 'Drawdown, capital drawdown, contribution request' },
      { label: 'Triggered by', value: 'New investments, management fees, fund expenses' },
      { label: 'Allocation', value: 'Pro rata to each LP\'s commitment (unless the LPA says otherwise)' },
      { label: 'Notice period', value: 'Set in the LPA; 10 business days is common' },
      { label: 'Documented in', value: 'A drawdown (capital call) notice to each LP' },
      { label: 'If an LP defaults', value: 'LPA default remedies apply, such as penalty interest or forfeiture' },
    ],
    howItWorks: [
      {
        heading: 'The GP identifies a funding need',
        body: 'An investment closing, a management fee due or fund expenses create a cash requirement that cash held by the fund does not cover.',
      },
      {
        heading: 'The amount is allocated pro rata',
        body: 'The call is split across LPs in proportion to their commitments. Each LP\'s share is the call amount multiplied by its commitment divided by total commitments.',
      },
      {
        heading: 'A drawdown notice is issued',
        body: 'Each LP receives a notice stating the amount, the purpose, the due date and wire instructions, within the notice period set in the LPA.',
      },
      {
        heading: 'LPs fund by the due date',
        body: 'LPs wire their share. The administrator reconciles receipts against notices and chases any shortfall.',
      },
      {
        heading: 'Records are updated',
        body: 'Each LP\'s contributed and unfunded commitment is updated. Unfunded commitment is commitment minus all capital contributed to date.',
      },
    ],
    workedExample: {
      title: '$50M fund calling 20%',
      setup:
        'A fund has $50M of total commitments. The GP calls 20% to fund an $8M investment and $2M of management fees. One LP has committed $5M.',
      rows: [
        { label: 'Total call (20% × $50M)', value: '$10M' },
        { label: 'Of which: investment', value: '$8M' },
        { label: 'Of which: management fees', value: '$2M' },
        { label: 'LP\'s share of commitments ($5M ÷ $50M)', value: '10%' },
        { label: 'LP pays (10% × $10M)', value: '$1M' },
        { label: 'LP unfunded commitment ($5M − $1M)', value: '$4M' },
        { label: 'Fund unfunded commitment ($50M − $10M)', value: '$40M' },
      ],
      takeaway:
        'Because each LP pays pro rata, every LP\'s called percentage is the same (20%). Reconciling each LP\'s receipt against its pro rata amount is the core administrative task.',
    },
    mistakes: [
      'Allocating on contributed capital instead of commitments. Calls are pro rata to commitments unless the LPA says otherwise.',
      'Missing the LPA notice period, which can invalidate the call or delay funding.',
      'Not netting recallable distributions or LP excuse rights from the amount.',
      'Tracking commitments, calls and unfunded balances in spreadsheets that drift out of step with the notices actually sent.',
    ],
    singaporeNote:
      'In Singapore and wider APAC, LPs are often multi-currency and include family offices and corporates with their own internal approval cycles, so wire cut-offs and FX conversion need to be built into the notice timeline. For a VCC, calls are made at the sub-fund level, so each notice and the unfunded commitment ledger must track the right sub-fund.',
    faqs: [
      {
        q: 'What is the difference between a capital call and a drawdown?',
        a: 'Nothing material: they are two names for the same request. "Drawdown notice" is the document; "capital call" is the event.',
      },
      {
        q: 'How much notice must LPs be given?',
        a: 'It is set in the limited partnership agreement. 10 business days is a common market term, but individual funds differ.',
      },
      {
        q: 'What is unfunded commitment?',
        a: 'Unfunded commitment is the part of an LP\'s commitment not yet called: total commitment minus capital contributed to date.',
      },
      {
        q: 'What happens if an LP does not fund a capital call?',
        a: 'The LPA\'s default provisions apply. These commonly include penalty interest, loss of voting rights, forced sale of the interest, or forfeiture of part of the existing contribution.',
      },
    ],
    relatedTerms: ['distribution-waterfall', 'fund-administrator', 'vcc'],
    relatedTools: ['/tools/capital-call-schedule', '/tools/drawdown-notice'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    authorities: ['your fund documents (LPA)', 'legal counsel'],
    sources: [
      { label: 'ILPA Capital Call and Distribution Notice Template', url: 'https://ilpa.org' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: '13o-13u',
    topic: 'singapore-fund-structures',
    term: 'Section 13O and 13U Tax Incentives',
    shortName: '13O / 13U',
    title: 'Section 13O vs 13U: Singapore Fund Tax Incentives Explained',
    description:
      'Sections 13O and 13U exempt qualifying income of Singapore-managed funds from tax. AUM floors, headcount, local spend and the Singapore-investment rule, compared.',
    directAnswer:
      'Sections 13O and 13U of the Singapore Income Tax Act are tax incentive schemes that exempt qualifying income of a fund managed from Singapore. 13O is the onshore scheme, usually for single family offices from S$20M AUM; 13U is the enhanced tier for larger or multi-vehicle structures from S$50M AUM.',
    keyFacts: [
      { label: 'Legislation', value: 'Income Tax Act 1947, sections 13O and 13U' },
      { label: 'Administered by', value: 'MAS (approval) and IRAS (tax)' },
      { label: 'Minimum AUM', value: '13O: S$20M. 13U: S$50M' },
      { label: 'Investment professionals', value: '13O: at least 2. 13U: at least 3' },
      { label: 'Fund vehicle', value: '13O: Singapore company or VCC. 13U: onshore or offshore, including umbrella VCCs' },
      { label: 'Local business spending', value: 'Tiered by AUM: S$200,000 (under S$50M), S$500,000 (S$50M–100M), S$1,000,000 (over S$100M) a year' },
      { label: 'Singapore investment', value: 'At least 10% of AUM or S$10M, whichever is lower' },
    ],
    howItWorks: [
      {
        heading: 'Pick the scheme',
        body: '13O suits a single family office or smaller fund. 13U suits larger or multi-fund structures that need offshore vehicles or an umbrella VCC with several sub-funds.',
      },
      {
        heading: 'Set up the vehicle and substance',
        body: 'The fund administration company must operate from physical commercial premises in Singapore. Virtual offices are not accepted. 13O also requires a Singapore-based administrator.',
      },
      {
        heading: 'Hire the investment professionals',
        body: 'An investment professional is a portfolio manager, research analyst or trader earning more than S$3,500 a month and spending more than 50% of their time on the qualifying activity.',
      },
      {
        heading: 'Meet spending and investment tests',
        body: 'Commit to the annual local business spending tier for your AUM, and keep the Singapore investment requirement met at any one time, including during the application.',
      },
      {
        heading: 'Apply, then re-earn it every year',
        body: 'Approval is not permanent. Conditions such as AUM, headcount, local spend, capital deployment and the UBO register are tested on an ongoing basis, and the incentive is renewed periodically.',
      },
    ],
    workedExample: {
      title: 'A S$60M single family office',
      setup:
        'A family office with S$60M in AUM wants to apply. Work out which scheme and what the spending and investment tests require.',
      rows: [
        { label: 'AUM meets 13O floor (S$20M)?', value: 'Yes' },
        { label: 'AUM meets 13U floor (S$50M)?', value: 'Yes' },
        { label: 'Local business spending tier (S$50M–100M)', value: 'S$500,000 a year' },
        { label: '10% of AUM (10% × S$60M)', value: 'S$6M' },
        { label: 'Singapore investment required (lower of S$6M and S$10M)', value: 'S$6M' },
        { label: 'Investment professionals needed', value: '2 for 13O, 3 for 13U' },
      ],
      takeaway:
        'Both schemes are open at this size. If the family office holds a single Singapore vehicle, 13O needs one fewer professional. If it needs offshore vehicles or several sub-funds, 13U is the route.',
    },
    mistakes: [
      'Treating the VCC as the tax exemption. The incentive is applied for separately.',
      'Counting a virtual office as substance. MAS requires physical commercial premises.',
      'Testing conditions once a year. Spending and Singapore-investment minimums move every month.',
      'Forgetting the UBO register, which must be kept current within days of an ownership change, not on an annual cycle.',
    ],
    singaporeNote:
      'This is a Singapore-only regime, and thresholds and renewal terms are revised from time to time, so confirm the current conditions with MAS and IRAS before applying. The operational point most often missed is that approval is the start: the spending, investment, headcount and UBO conditions are tested continuously, which is a fund-accounting and compliance-tracking job, not a one-off filing.',
    faqs: [
      {
        q: 'What is the difference between 13O and 13U?',
        a: '13O is the onshore fund scheme, with a S$20M AUM floor, two investment professionals and a Singapore company or VCC vehicle. 13U is the enhanced tier, with a S$50M floor, three professionals and flexibility to use offshore vehicles and umbrella VCCs.',
      },
      {
        q: 'Is a VCC the same as 13O or 13U?',
        a: 'No. A VCC is a legal structure. 13O and 13U are tax incentives applied for separately, and can be held by a fund that uses a VCC.',
      },
      {
        q: 'What counts as an investment professional?',
        a: 'A portfolio manager, research analyst or trader earning more than S$3,500 a month and spending more than 50% of their time on the qualifying activity.',
      },
      {
        q: 'Does the incentive need to be renewed?',
        a: 'Yes. The incentive runs for a fixed period and is renewed periodically, with the conditions re-evidenced at renewal. Confirm the current cadence with MAS.',
      },
    ],
    relatedTerms: ['vcc', 'fund-administrator', 'management-fee'],
    relatedTools: ['/tools/mas-licensing-estimator', '/tools/vcc-comparator', '/tools/carried-interest-tax'],
    relatedPosts: [
      { slug: 'section-13o-vs-13u-singapore', title: 'Section 13O vs 13U (2026)' },
      { slug: 'how-to-set-up-a-vcc-singapore', title: 'How to Set Up a VCC in Singapore (2026)' },
    ],
    relatedSolution: 'family-offices',
    authorities: ['MAS', 'IRAS', 'a licensed tax adviser'],
    sources: [
      { label: 'MAS — Tax incentive schemes for fund management', url: 'https://www.mas.gov.sg' },
      { label: 'IRAS — Fund tax incentives', url: 'https://www.iras.gov.sg' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'carried-interest',
    topic: 'fund-economics',
    term: 'Carried Interest',
    shortName: 'Carried interest',
    title: 'What is Carried Interest? How Carry Works in PE & VC Funds',
    description:
      'Carried interest is the GP\'s share of fund profits, typically 20%, paid only after LPs clear a hurdle. How carry is calculated, with a worked example.',
    directAnswer:
      'Carried interest, or carry, is the share of a fund\'s profits paid to the general partner as performance compensation, typically 20%. It is earned only after limited partners have received their capital back and, in most funds, a preferred return, and it is paid through the fund\'s distribution waterfall.',
    keyFacts: [
      { label: 'Also called', value: 'Carry, performance fee, promote' },
      { label: 'Typical rate', value: '20% of profits (negotiated per fund)' },
      { label: 'Paid to', value: 'The GP, or its carry vehicle, from fund distributions' },
      { label: 'Conditions', value: 'Usually a hurdle (preferred return), often with a GP catch-up' },
      { label: 'Timing', value: 'Whole-fund (European) or deal-by-deal (American) waterfall' },
      { label: 'Risk to the GP', value: 'Clawback if carry is overpaid over the fund\'s life' },
    ],
    howItWorks: [
      {
        heading: 'Profit is measured',
        body: 'Profit is what the fund distributes above the capital LPs contributed, including capital used for fees and expenses.',
      },
      {
        heading: 'The hurdle is tested',
        body: 'If the fund has a preferred return, LPs must receive it before the GP earns any carry. Below the hurdle, carry is zero.',
      },
      {
        heading: 'The catch-up applies',
        body: 'Above the hurdle, the GP receives all or part of distributions until it holds its carry percentage of total profit to date.',
      },
      {
        heading: 'The split applies',
        body: 'Remaining profit is split between LPs and the GP at the carry ratio, usually 80/20.',
      },
      {
        heading: 'Clawback true-up',
        body: 'At the end of the fund, if the GP was paid more than its entitlement, it returns the excess to LPs under the clawback.',
      },
    ],
    workedExample: {
      title: '$100M fund, 8% hurdle, 20% carry, full catch-up',
      setup:
        'LPs contributed $100M. For simplicity, the 8% compounding hurdle works out to $36M of profit over four years. Compare three outcomes (whole-fund waterfall).',
      rows: [
        { label: 'Outcome A: $130M returned → profit $30M, below the $36M hurdle', value: 'Carry $0' },
        { label: 'Outcome B: $140M returned → profit $40M, $4M into the catch-up', value: 'Carry $4M' },
        { label: 'Outcome C: $200M returned → profit $100M, catch-up complete', value: 'Carry $20M' },
      ],
      takeaway:
        'The hurdle creates a cliff: A earns nothing despite a 30% gain. By C, a full catch-up has put the GP at exactly 20% of total profit, as if there had been no hurdle.',
    },
    mistakes: [
      'Calculating carry as 20% of all gains without applying the hurdle and catch-up.',
      'Ignoring fees and expenses when measuring profit. LPs must recover them before carry is earned.',
      'Forgetting that early carry in a deal-by-deal waterfall may have to be clawed back later.',
      'Assuming carry is taxed the same everywhere. Treatment varies by jurisdiction and facts.',
    ],
    singaporeNote:
      'Carry terms are set in the fund documents, not by Singapore law. The Singapore-specific question is tax: how carry is taxed depends on the jurisdictions of the GP and its investment team and the facts, and on whether the fund holds a Section 13O or 13U incentive. Model it with the tools below and take advice before relying on a figure.',
    faqs: [
      {
        q: 'What is the difference between carried interest and a management fee?',
        a: 'A management fee is charged on commitments or invested capital regardless of performance. Carried interest is paid only out of profits, after LPs have been repaid.',
      },
      {
        q: 'What is a typical carried interest percentage?',
        a: '20% is the most common headline rate, though it varies by strategy and fund. Some funds step up to 25–30% above a higher return threshold.',
      },
      {
        q: 'What is a clawback?',
        a: 'A clawback requires the GP to return carry it has received if, over the fund\'s life, it has been paid more than its entitlement.',
      },
    ],
    relatedTerms: ['distribution-waterfall', 'management-fee', 'tvpi-dpi-rvpi'],
    relatedTools: ['/tools/fee-carry-modeler', '/tools/carried-interest-tax', '/tools/waterfall'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    authorities: ['your fund documents (LPA)', 'IRAS (for tax treatment)', 'a licensed tax adviser'],
    sources: [
      { label: 'ILPA Principles 3.0', url: 'https://ilpa.org/ilpa-principles/' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'tvpi-dpi-rvpi',
    topic: 'lp-reporting',
    term: 'TVPI, DPI and RVPI',
    shortName: 'TVPI / DPI / RVPI',
    title: 'TVPI, DPI and RVPI Explained: PE & VC Fund Performance Metrics',
    description:
      'DPI is cash returned, RVPI is value still held, and TVPI is the two combined, each divided by paid-in capital. Formulas, a worked example and how they differ from IRR.',
    directAnswer:
      'DPI, RVPI and TVPI are fund performance multiples measured against paid-in capital. DPI is distributions divided by paid-in capital, the cash actually returned. RVPI is remaining net asset value divided by paid-in capital, the value still held. TVPI is DPI plus RVPI, the total value created so far.',
    keyFacts: [
      { label: 'DPI', value: 'Cumulative distributions ÷ paid-in capital (realised)' },
      { label: 'RVPI', value: 'Residual NAV ÷ paid-in capital (unrealised)' },
      { label: 'TVPI', value: '(Distributions + residual NAV) ÷ paid-in capital = DPI + RVPI' },
      { label: 'Basis', value: 'Net to LPs, after fees and carry' },
      { label: 'Denominator', value: 'Paid-in capital, not total commitment' },
      { label: 'Reported', value: 'Quarterly in LP reports' },
    ],
    howItWorks: [
      {
        heading: 'Start with paid-in capital',
        body: 'Paid-in capital is the total an LP has actually contributed to date through capital calls. It is not the commitment, which includes capital not yet called.',
      },
      {
        heading: 'Measure what has come back',
        body: 'DPI divides cumulative distributions to the LP by paid-in capital. It is the only one of the three that is cash in hand.',
      },
      {
        heading: 'Measure what is still held',
        body: 'RVPI divides the LP\'s share of the fund\'s residual NAV by paid-in capital. It depends on valuations, so it is an estimate.',
      },
      {
        heading: 'Add them for the total',
        body: 'TVPI is DPI plus RVPI. As a fund matures and exits investments, RVPI falls and DPI rises, while TVPI converges on the final multiple.',
      },
    ],
    workedExample: {
      title: 'A mid-life fund',
      setup: 'An LP has paid in $80M. The fund has distributed $20M to it, and its share of remaining NAV is $100M.',
      rows: [
        { label: 'DPI ($20M ÷ $80M)', value: '0.25x' },
        { label: 'RVPI ($100M ÷ $80M)', value: '1.25x' },
        { label: 'TVPI (0.25x + 1.25x)', value: '1.50x' },
      ],
      takeaway:
        'The fund shows a 1.50x total value, but only 0.25x has been returned in cash. That gap is why LPs watch DPI as closely as TVPI.',
    },
    mistakes: [
      'Dividing by commitment instead of paid-in capital.',
      'Reading a high TVPI as realised performance when most of it is RVPI, which rests on valuations.',
      'Comparing a gross deal-level multiple (MOIC) with a net fund-level TVPI.',
      'Comparing funds of different ages without adjusting for vintage. Young funds sit below 1.0x because of the J-curve.',
    ],
    singaporeNote:
      'There is no Singapore-specific definition, but APAC LPs are commonly multi-currency, so state the reporting currency and the FX basis behind paid-in capital, distributions and NAV. For a VCC, report at sub-fund level, since each sub-fund has its own investors, NAV and cash flows.',
    faqs: [
      {
        q: 'What is a good TVPI?',
        a: 'It depends on strategy, vintage and fund age. Compare against peers of the same vintage and strategy rather than against a fixed number.',
      },
      {
        q: 'What is the difference between TVPI and IRR?',
        a: 'TVPI is a multiple that ignores timing. IRR is a rate of return that accounts for when cash flows occurred. A fund can have a high TVPI and a low IRR if returns took a long time.',
      },
      {
        q: 'What is the difference between TVPI and MOIC?',
        a: 'MOIC is usually a gross investment-level or fund-level multiple before fees and carry. TVPI is a net, LP-level multiple.',
      },
    ],
    relatedTerms: ['irr-vs-moic', 'carried-interest', 'capital-call'],
    relatedTools: ['/tools/irr-tvpi-dpi-calculator', '/tools/vintage-benchmarker'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    authorities: ['your fund documents', 'the ILPA reporting guidance'],
    sources: [
      { label: 'ILPA Reporting Template', url: 'https://ilpa.org' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'fund-administrator',
    topic: 'fund-operations',
    term: 'Fund Administrator',
    shortName: 'Fund administrator',
    title: 'What is a Fund Administrator? Fund Administration vs Fund Management',
    description:
      'A fund administrator runs a fund\'s back office: NAV, accounting, investor records and reporting. How it differs from the fund manager, with who-does-what.',
    directAnswer:
      'A fund administrator is the firm, or in-house team, that runs a fund\'s back office: calculating NAV, keeping the books, processing capital calls and distributions, maintaining investor records and producing reports. It is distinct from the fund manager, which makes the investment decisions.',
    keyFacts: [
      { label: 'Core services', value: 'NAV, fund accounting, investor services, capital calls and distributions, reporting' },
      { label: 'Not the same as', value: 'The fund manager (investment decisions) or the custodian (safekeeping of assets)' },
      { label: 'Appointed by', value: 'The fund or its manager, under an administration agreement' },
      { label: 'Models', value: 'Third-party administrator, in-house administration, or software-assisted' },
      { label: 'Why it matters', value: 'Independent books and investor records are a core LP comfort point' },
    ],
    howItWorks: [
      {
        heading: 'The manager decides, the administrator records',
        body: 'The fund manager sources and approves investments. The administrator books the resulting transactions and keeps the fund\'s official records.',
      },
      {
        heading: 'NAV and accounting',
        body: 'The administrator maintains the general ledger, applies valuations provided by the manager or valuation agent, and calculates NAV and capital accounts.',
      },
      {
        heading: 'Investor servicing',
        body: 'It onboards investors, runs KYC and AML checks, issues capital call and distribution notices, reconciles receipts and answers LP queries.',
      },
      {
        heading: 'Reporting',
        body: 'It prepares financial statements for audit and the periodic investor reports, such as statements and performance metrics.',
      },
    ],
    workedExample: {
      title: 'Who does what when a fund makes an investment',
      setup: 'A fund approves a $5M investment and funds it through a capital call.',
      rows: [
        { label: 'Decide and approve the investment', value: 'Fund manager' },
        { label: 'Calculate each LP\'s pro rata share of the call', value: 'Fund administrator' },
        { label: 'Issue drawdown notices and track receipts', value: 'Fund administrator' },
        { label: 'Hold the investment and cash safely', value: 'Custodian / bank' },
        { label: 'Book the transaction and update NAV', value: 'Fund administrator' },
        { label: 'Audit the year-end financials', value: 'Auditor' },
      ],
      takeaway:
        'The administrator never decides what to invest in. Splitting these roles gives LPs independent records alongside the manager\'s decisions.',
    },
    mistakes: [
      'Conflating the fund administrator with the fund manager. They are different roles with different regulation and liability.',
      'Assuming the administrator verifies valuations. It usually applies valuations supplied by the manager.',
      'Choosing a provider on headline price without checking multi-currency, sub-fund and LP reporting support.',
    ],
    singaporeNote:
      'The fund manager is the entity MAS regulates, and tax incentives such as Section 13O require a Singapore-based administrator. For VCCs, administration must work at the sub-fund level, with books and NAV kept per sub-fund. Whether a particular administrator needs any authorisation depends on the services it provides, so confirm with MAS.',
    faqs: [
      {
        q: 'What is the difference between a fund administrator and a fund manager?',
        a: 'The fund manager makes investment decisions and is the regulated entity. The fund administrator handles accounting, NAV, investor records and reporting.',
      },
      {
        q: 'Do all funds need an administrator?',
        a: 'Many do, because LPs and regulators expect independent records, and some structures and incentives require one. Small funds sometimes administer in-house, supported by software.',
      },
      {
        q: 'What is the difference between a fund administrator and a custodian?',
        a: 'The administrator keeps the books and investor records. The custodian safeguards the fund\'s assets.',
      },
    ],
    relatedTerms: ['capital-call', 'nav', 'side-letter', '13o-13u'],
    relatedTools: ['/tools/spv-admin-cost-calculator', '/tools/capital-call-schedule'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    authorities: ['MAS', 'your fund documents'],
    sources: [
      { label: 'MAS — Fund management', url: 'https://www.mas.gov.sg' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'nav',
    topic: 'fund-accounting',
    term: 'Net Asset Value (NAV)',
    shortName: 'NAV',
    title: 'What is NAV? How Fund Net Asset Value Is Calculated',
    description:
      'NAV is a fund\'s assets minus its liabilities, often shown per unit or share. How it is calculated, how often, how illiquid assets are valued, with a worked example.',
    directAnswer:
      'Net asset value (NAV) is the total value of a fund\'s assets minus its liabilities at a point in time. Dividing NAV by the number of units or shares gives NAV per unit, the price at which investors subscribe or redeem in open-ended funds and the basis for reported value in closed-end funds.',
    keyFacts: [
      { label: 'Formula', value: 'NAV = total assets − total liabilities' },
      { label: 'Per unit', value: 'NAV per unit = NAV ÷ units (or shares) in issue' },
      { label: 'Calculated by', value: 'The fund administrator, using valuations from the manager' },
      { label: 'Frequency', value: 'Daily to quarterly, set by the fund documents' },
      { label: 'Basis', value: 'Fair value for investments, under the fund\'s accounting framework' },
      { label: 'Used for', value: 'Subscriptions, redemptions, fees, LP statements and performance metrics' },
    ],
    howItWorks: [
      {
        heading: 'Value the assets',
        body: 'Listed holdings use market prices. Private holdings use fair-value techniques supplied by the manager or a valuation agent, such as recent round pricing or discounted cash flows.',
      },
      {
        heading: 'Add cash and receivables',
        body: 'Cash, accrued income and amounts owed to the fund are included alongside investments.',
      },
      {
        heading: 'Deduct liabilities',
        body: 'Accrued management fees, expenses, payables and any borrowings are deducted. Carry accrued but not yet payable is also deducted where the waterfall provides for it.',
      },
      {
        heading: 'Divide for NAV per unit',
        body: 'NAV is divided by units in issue. Open-ended funds use this price for subscriptions and redemptions. Closed-end funds typically report NAV and each LP\'s capital account.',
      },
    ],
    workedExample: {
      title: 'An open-ended fund at month-end',
      setup: 'The fund holds investments, cash and receivables, and owes fees and expenses. It has 10 million units in issue.',
      rows: [
        { label: 'Investments at fair value', value: '$110.0M' },
        { label: 'Cash', value: '$8.0M' },
        { label: 'Accrued income receivable', value: '$2.0M' },
        { label: 'Total assets', value: '$120.0M' },
        { label: 'Accrued fees and expenses', value: '($3.0M)' },
        { label: 'Payables', value: '($5.0M)' },
        { label: 'NAV ($120.0M − $8.0M)', value: '$112.0M' },
        { label: 'NAV per unit ($112.0M ÷ 10M units)', value: '$11.20' },
      ],
      takeaway:
        'An investor subscribing at this NAV buys units at $11.20. The same NAV also feeds LP statements, fee calculations and TVPI.',
    },
    mistakes: [
      'Using stale valuations for private holdings. NAV is only as current as the valuations behind it.',
      'Forgetting to accrue fees, expenses or carry, which overstates NAV.',
      'Mixing currencies without applying closing FX rates to foreign-currency assets and liabilities.',
      'Dealing at an NAV that omits a late-booked transaction, which dilutes or advantages some investors.',
    ],
    singaporeNote:
      'A VCC\'s financial statements must be prepared under IFRS, SFRS(I) or US GAAP and audited, and for an umbrella VCC NAV is calculated per sub-fund, because each sub-fund\'s assets and liabilities are segregated. Multi-currency investor bases make FX treatment a routine part of the calculation.',
    faqs: [
      {
        q: 'How often is NAV calculated?',
        a: 'It depends on the fund documents. Open-ended funds may calculate it daily or monthly, and private equity and venture funds usually report it quarterly.',
      },
      {
        q: 'Who calculates NAV?',
        a: 'Usually the fund administrator, based on valuations and instructions from the fund manager. The manager is generally responsible for valuations of illiquid assets.',
      },
      {
        q: 'What is the difference between NAV and NAV per unit?',
        a: 'NAV is the fund\'s total net value. NAV per unit divides it by the number of units in issue and is the price used for subscriptions and redemptions.',
      },
      {
        q: 'How are private investments valued for NAV?',
        a: 'At fair value, using techniques such as recent transaction prices, comparable company multiples or discounted cash flows, and classified within the fair value hierarchy.',
      },
    ],
    relatedTerms: ['fair-value-hierarchy', 'fund-administrator', 'tvpi-dpi-rvpi'],
    relatedTools: ['/tools/subscription-redemption-je', '/tools/fx-revaluation-je'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    authorities: ['the fund documents', 'your auditor', 'ACRA (for VCCs)', 'MAS'],
    sources: [
      { label: 'IFRS 13 Fair Value Measurement (IFRS Foundation)', url: 'https://www.ifrs.org/issued-standards/list-of-standards/ifrs-13-fair-value-measurement/' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'fair-value-hierarchy',
    topic: 'fund-accounting',
    term: 'Fair Value Hierarchy',
    shortName: 'Fair value hierarchy',
    title: 'Fair Value Hierarchy (Level 1, 2, 3) Explained for Funds',
    description:
      'The IFRS 13 fair value hierarchy ranks valuation inputs into Levels 1, 2 and 3. What each level means, how funds classify holdings, and a worked example.',
    directAnswer:
      'The fair value hierarchy, set out in IFRS 13, ranks the inputs used to value an asset by reliability. Level 1 uses quoted prices in active markets, Level 2 uses other observable inputs, and Level 3 uses unobservable inputs and management judgement. Funds disclose how much of their portfolio sits in each level.',
    keyFacts: [
      { label: 'Standard', value: 'IFRS 13 Fair Value Measurement (SFRS(I) 13 in Singapore)' },
      { label: 'Level 1', value: 'Quoted prices in active markets for identical assets' },
      { label: 'Level 2', value: 'Observable inputs other than Level 1, such as prices of similar assets or yield curves' },
      { label: 'Level 3', value: 'Unobservable inputs, such as DCF assumptions or adjusted private-round prices' },
      { label: 'Classified by', value: 'The lowest-level input that is significant to the whole measurement' },
      { label: 'Disclosure', value: 'Level 3 carries the heaviest disclosure, including a roll-forward and valuation inputs' },
    ],
    howItWorks: [
      {
        heading: 'Identify the valuation inputs',
        body: 'For each holding, list the inputs used: quoted prices, comparable transactions, yield curves, discount rates, growth assumptions.',
      },
      {
        heading: 'Find the lowest significant input',
        body: 'The whole measurement is classified by the lowest level of input that is significant to it. One significant unobservable input makes it Level 3.',
      },
      {
        heading: 'Classify and tally',
        body: 'Each holding is assigned to Level 1, 2 or 3 and the totals per level are reported.',
      },
      {
        heading: 'Disclose',
        body: 'Funds disclose the classification and, for Level 3, the valuation techniques, key unobservable inputs and movements during the period.',
      },
    ],
    workedExample: {
      title: 'A $100M portfolio',
      setup: 'A fund holds a listed share, a corporate bond priced from comparable yields, and unlisted venture holdings valued with a discounted cash flow.',
      rows: [
        { label: 'Level 1: listed shares (quoted price)', value: '$30M · 30%' },
        { label: 'Level 2: bonds (comparable-yield pricing)', value: '$20M · 20%' },
        { label: 'Level 3: unlisted holdings (DCF, unobservable inputs)', value: '$50M · 50%' },
        { label: 'Total investments at fair value', value: '$100M' },
      ],
      takeaway:
        'Half the NAV rests on Level 3 judgement. That is typical for a private markets fund and is why auditors and LPs focus on Level 3 valuation inputs.',
    },
    mistakes: [
      'Classifying by the primary input instead of the lowest significant input.',
      'Treating a stale private-round price as Level 2 without evidence the inputs are observable.',
      'Leaving Level 3 disclosures thin. This is where reviewers look first.',
      'Not re-assessing the level when markets become less active.',
    ],
    singaporeNote:
      'Singapore reporting entities apply SFRS(I) 13, which is identical to IFRS 13. For VCC sub-funds, the hierarchy table is prepared per sub-fund, since each prepares its own accounts for its investors.',
    faqs: [
      {
        q: 'What is a Level 3 asset?',
        a: 'An asset valued using significant unobservable inputs, such as a private company valued with a discounted cash flow or adjusted comparables.',
      },
      {
        q: 'Can an asset move between levels?',
        a: 'Yes. For example, a private holding becomes Level 1 when the company lists, or a listed holding drops to Level 2 or 3 if trading becomes inactive. Transfers are disclosed.',
      },
      {
        q: 'Which standard sets out the hierarchy?',
        a: 'IFRS 13 Fair Value Measurement, which in Singapore is SFRS(I) 13.',
      },
    ],
    relatedTerms: ['nav', 'ifrs-9-sfrs-i-9'],
    relatedTools: ['/tools/bond-je-generator', '/tools/fx-revaluation-je'],
    relatedPosts: [
      { slug: 'ifrs-9-sfrs-i-9-fund-accounting', title: 'IFRS 9 / SFRS(I) 9 for Funds' },
    ],
    relatedSolution: 'vc-pe-firms',
    authorities: ['your auditor', 'the Accounting Standards Council (ASC) Singapore', 'the IFRS Foundation'],
    sources: [
      { label: 'IFRS 13 Fair Value Measurement (IFRS Foundation)', url: 'https://www.ifrs.org/issued-standards/list-of-standards/ifrs-13-fair-value-measurement/' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'ifrs-9-sfrs-i-9',
    topic: 'fund-accounting',
    term: 'IFRS 9 / SFRS(I) 9',
    shortName: 'IFRS 9',
    title: 'IFRS 9 / SFRS(I) 9 for Funds: Classification, SPPI and ECL',
    description:
      'IFRS 9 and SFRS(I) 9 set how financial instruments are classified and measured: business model, SPPI test and expected credit loss. A worked classification example.',
    directAnswer:
      'IFRS 9, called SFRS(I) 9 in Singapore, is the accounting standard for financial instruments. It classifies each instrument by the entity\'s business model and whether cash flows are solely payments of principal and interest (SPPI), then measures it at amortised cost, fair value through OCI, or fair value through profit or loss, with expected credit loss for impairment.',
    keyFacts: [
      { label: 'Standard', value: 'IFRS 9 Financial Instruments; SFRS(I) 9 in Singapore (identical to IFRS 9)' },
      { label: 'Classification tests', value: 'Business model test and SPPI test' },
      { label: 'Measurement categories', value: 'Amortised cost, FVOCI, FVTPL' },
      { label: 'Impairment', value: 'Expected credit loss (ECL), in three stages' },
      { label: 'Investment entities', value: 'Entities that qualify under IFRS 10 measure investments at FVTPL' },
      { label: 'Most relevant to', value: 'Private credit, SPVs and entities that are not investment entities' },
    ],
    howItWorks: [
      {
        heading: 'Is the entity an investment entity?',
        body: 'An entity that qualifies as an investment entity under IFRS 10 measures its investments at fair value through profit or loss, which covers most investment funds. The classification tests below then matter mainly for entities that do not qualify.',
      },
      {
        heading: 'Apply the business model test',
        body: 'Is the instrument held to collect contractual cash flows, held to collect and sell, or managed on a fair value basis?',
      },
      {
        heading: 'Apply the SPPI test',
        body: 'Do the contractual cash flows consist solely of payments of principal and interest? Equity, and debt with features like conversion options, generally fail.',
      },
      {
        heading: 'Assign the category',
        body: 'Hold to collect plus SPPI gives amortised cost. Hold to collect and sell plus SPPI gives FVOCI. Everything else is FVTPL.',
      },
      {
        heading: 'Measure expected credit losses',
        body: 'For amortised cost and FVOCI debt, recognise 12-month ECL at Stage 1. Move to lifetime ECL at Stage 2 on a significant increase in credit risk, and Stage 3 when credit-impaired.',
      },
    ],
    workedExample: {
      title: 'Classifying four instruments',
      setup: 'An entity that is not an investment entity holds four instruments. Classify each.',
      rows: [
        { label: 'Senior loan, held to collect, plain interest', value: 'Amortised cost' },
        { label: 'Bond, held to collect and sell, SPPI passes', value: 'FVOCI' },
        { label: 'Convertible note (conversion feature fails SPPI)', value: 'FVTPL' },
        { label: 'Listed equity (not debt, fails SPPI)', value: 'FVTPL' },
      ],
      takeaway:
        'Classification follows the tests, not the asset label. The same bond could be amortised cost or FVOCI depending on the business model.',
    },
    mistakes: [
      'Skipping the investment-entity assessment and assuming amortised cost applies to a fund.',
      'Treating a convertible or leveraged-return feature as plain interest.',
      'Applying ECL at the wrong stage, or not tracking significant increases in credit risk.',
      'Changing classification without a genuine change in business model.',
    ],
    singaporeNote:
      'SFRS(I) is Singapore\'s IFRS-identical framework, and VCC financial statements may be prepared under IFRS, SFRS(I) or US GAAP. Private credit funds and debt-holding SPVs in Singapore are where amortised cost and ECL most often apply, so they need effective-interest accounting and staged ECL in the ledger.',
    faqs: [
      {
        q: 'Is SFRS(I) 9 different from IFRS 9?',
        a: 'No. SFRS(I) is Singapore\'s IFRS-identical financial reporting framework, so SFRS(I) 9 mirrors IFRS 9.',
      },
      {
        q: 'What is the SPPI test?',
        a: 'The solely payments of principal and interest test checks whether an instrument\'s contractual cash flows are only principal and interest on the principal outstanding. If not, it is measured at FVTPL.',
      },
      {
        q: 'What are the three ECL stages?',
        a: 'Stage 1 recognises 12-month expected credit losses. Stage 2 recognises lifetime losses after a significant increase in credit risk. Stage 3 applies to credit-impaired assets.',
      },
      {
        q: 'Do investment funds use amortised cost?',
        a: 'Funds that qualify as investment entities measure investments at FVTPL. Amortised cost mostly applies to entities that are not investment entities.',
      },
    ],
    relatedTerms: ['fair-value-hierarchy', 'nav'],
    relatedTools: ['/tools/bond-je-generator', '/tools/fx-revaluation-je'],
    relatedPosts: [
      { slug: 'ifrs-9-sfrs-i-9-fund-accounting', title: 'IFRS 9 / SFRS(I) 9 for Funds' },
    ],
    relatedSolution: 'private-credit',
    authorities: ['your auditor', 'the Accounting Standards Council (ASC) Singapore', 'the IFRS Foundation'],
    sources: [
      { label: 'IFRS 9 Financial Instruments (IFRS Foundation)', url: 'https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'management-fee',
    topic: 'fund-economics',
    term: 'Management Fee',
    shortName: 'Management fee',
    title: 'What is a Management Fee? How PE & VC Fund Fees Are Calculated',
    description:
      'A management fee is the annual fee a fund pays its manager, typically around 2% of commitments, stepping down after the investment period. Worked example included.',
    directAnswer:
      'A management fee is the annual fee a fund pays its manager to cover operating costs, regardless of performance. In private equity and venture capital it is commonly around 2% a year, charged on committed capital during the investment period and on invested capital afterwards, and it is funded through capital calls.',
    keyFacts: [
      { label: 'Typical rate', value: 'About 1.5%–2.5% a year (negotiated per fund)' },
      { label: 'Investment period basis', value: 'Committed capital' },
      { label: 'Post-investment-period basis', value: 'Invested capital or NAV, often at a lower rate' },
      { label: 'Paid', value: 'Quarterly or semi-annually, usually in advance' },
      { label: 'Funded by', value: 'Capital calls on LPs' },
      { label: 'Defined in', value: 'The limited partnership agreement' },
    ],
    howItWorks: [
      {
        heading: 'Fee basis is set',
        body: 'The LPA sets the rate and the basis. During the investment period (commonly the first five years) the basis is committed capital.',
      },
      {
        heading: 'Basis steps down',
        body: 'After the investment period, the fee is typically charged on invested capital, or net invested capital after realisations, sometimes at a reduced rate.',
      },
      {
        heading: 'Fee is called and paid',
        body: 'The fee is included in capital calls and paid to the manager each period, normally in advance.',
      },
      {
        heading: 'Offsets are applied',
        body: 'Where the LPA provides, transaction, monitoring or director fees received by the manager are offset against the management fee.',
      },
    ],
    workedExample: {
      title: '$100M fund, 2% fee, 10-year life',
      setup: 'Years 1–5 are charged on $100M of commitments. Years 6–10 are charged on $60M of invested capital (held constant for simplicity).',
      rows: [
        { label: 'Years 1–5: 2% × $100M = $2.0M a year', value: '$10.0M' },
        { label: 'Years 6–10: 2% × $60M = $1.2M a year', value: '$6.0M' },
        { label: 'Total management fees over the fund\'s life', value: '$16.0M' },
        { label: 'Capital left to invest ($100M − $16.0M)', value: '$84.0M' },
      ],
      takeaway:
        'About 16% of commitments goes to fees over the fund\'s life, so only about $84M is available to invest. This fee drag is why gross and net returns differ.',
    },
    mistakes: [
      'Charging the post-investment-period fee on commitments instead of the stepped-down basis.',
      'Not applying fee offsets in the calculation.',
      'Pro-rating partial periods and late-closing LPs inconsistently, including catch-up fees for later closings.',
      'Ignoring fees when comparing gross and net returns.',
    ],
    singaporeNote:
      'Fee terms are commercial and set in the fund documents. For VCCs, calculate and book fees at sub-fund level, and check how the fee interacts with any tax incentive conditions you rely on.',
    faqs: [
      {
        q: 'What is a typical management fee?',
        a: 'Around 2% a year is common for private equity and venture funds, with larger funds often lower and smaller or newer funds sometimes higher.',
      },
      {
        q: 'Is the management fee charged on committed or invested capital?',
        a: 'Commonly on committed capital during the investment period and on invested capital afterwards, but the LPA decides.',
      },
      {
        q: 'What is the difference between management fee and carried interest?',
        a: 'The management fee is paid regardless of performance. Carried interest is paid only out of profits, after LPs have been repaid.',
      },
    ],
    relatedTerms: ['carried-interest', 'capital-call'],
    relatedTools: ['/tools/fee-carry-modeler'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    authorities: ['your fund documents (LPA)', 'MAS and IRAS (for incentive conditions)', 'legal counsel'],
    sources: [
      { label: 'ILPA Principles 3.0', url: 'https://ilpa.org/ilpa-principles/' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'side-letter',
    topic: 'fund-operations',
    term: 'Side Letter',
    shortName: 'Side letter',
    title: 'What is a Side Letter? LP Side Letters and MFN Clauses Explained',
    description:
      'A side letter is a separate agreement giving an LP terms beyond the fund\'s LPA, such as fee discounts or co-invest rights. How MFN clauses work, with an example.',
    directAnswer:
      'A side letter is a separate agreement between a fund and an individual limited partner that grants that investor rights or terms beyond the limited partnership agreement, such as fee discounts, co-investment rights, extra reporting or excuse rights. Most LPs of meaningful size also negotiate a most-favoured-nation (MFN) clause.',
    keyFacts: [
      { label: 'Parties', value: 'The fund (and usually the GP) and one LP' },
      { label: 'Common terms', value: 'Fee discounts, co-invest rights, reporting and information rights, excuse rights, regulatory carve-outs' },
      { label: 'MFN clause', value: 'Lets an LP elect terms granted to other LPs, usually within a commitment-size tier' },
      { label: 'Governs', value: 'Only the LP that signed it, but it binds the fund and so affects the administrator\'s process' },
      { label: 'Timing', value: 'Usually negotiated before the LP is admitted' },
    ],
    howItWorks: [
      {
        heading: 'LP negotiates its terms',
        body: 'Large or regulated investors ask for terms their own policies require, such as specific reporting or regulatory carve-outs.',
      },
      {
        heading: 'The GP agrees and documents',
        body: 'Agreed terms are written into a side letter signed by the fund and the LP, supplementing the LPA for that investor.',
      },
      {
        heading: 'MFN elections follow',
        body: 'After the final closing, the GP circulates the side letters, and LPs with MFN rights may elect eligible terms granted to others.',
      },
      {
        heading: 'Obligations are tracked',
        body: 'Each term, such as a reduced fee or a special report, becomes an operational obligation the administrator must apply to that LP.',
      },
    ],
    workedExample: {
      title: 'MFN tiers',
      setup: 'LP B ($30M) negotiates a fee discount. MFN rights allow an LP to elect terms granted to LPs with equal or smaller commitments.',
      rows: [
        { label: 'LP A ($75M): holds MFN, can elect B\'s discount?', value: 'Yes ($30M is smaller)' },
        { label: 'LP C ($40M): holds MFN, can elect B\'s discount?', value: 'Yes ($30M is smaller)' },
        { label: 'LP D ($20M): holds MFN, can elect B\'s discount?', value: 'No ($30M is larger)' },
      ],
      takeaway:
        'The tiering protects bigger investors from being treated worse than smaller ones, while smaller LPs cannot claim terms won by larger ones.',
    },
    mistakes: [
      'Granting a term to one LP without checking the MFN rights of others.',
      'Failing to carry side-letter terms into the administrator\'s fee and reporting rules.',
      'Inconsistent disclosure of side letters to other LPs.',
      'Letting side-letter terms conflict with the LPA without a clear order of precedence.',
    ],
    singaporeNote:
      'In a VCC, different sub-funds can have different investors and side-letter terms, so obligations must be tracked at investor and sub-fund level. Terms linked to regulatory carve-outs or tax incentive conditions should be reviewed with counsel.',
    faqs: [
      {
        q: 'What is an MFN clause?',
        a: 'A most-favoured-nation clause lets an LP elect to receive terms granted to other LPs, usually only those with equal or smaller commitments.',
      },
      {
        q: 'Are side letters disclosed to other LPs?',
        a: 'Practice varies. MFN mechanics typically require the GP to share the relevant terms after closing, and industry guidance encourages transparency.',
      },
      {
        q: 'Does a side letter override the LPA?',
        a: 'Only as stated in the side letter and the LPA. The documents should set a clear order of precedence.',
      },
    ],
    relatedTerms: ['management-fee', 'fund-administrator'],
    relatedTools: ['/tools/fee-carry-modeler'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    authorities: ['your fund documents (LPA)', 'legal counsel'],
    sources: [
      { label: 'ILPA Principles 3.0', url: 'https://ilpa.org/ilpa-principles/' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
  {
    slug: 'irr-vs-moic',
    topic: 'lp-reporting',
    term: 'IRR vs MOIC',
    shortName: 'IRR vs MOIC',
    title: 'IRR vs MOIC: What\'s the Difference in PE & VC Returns?',
    description:
      'MOIC is how many times you got your money back; IRR is the annualised return that accounts for timing. How to calculate each, with an example showing why both matter.',
    directAnswer:
      'MOIC, the multiple on invested capital, is total value divided by capital invested, showing how many times money was returned. IRR, the internal rate of return, is the annualised return that accounts for when cash flows occurred. Two investments with the same MOIC can have very different IRRs if one took longer.',
    keyFacts: [
      { label: 'MOIC', value: 'Total value ÷ invested capital' },
      { label: 'IRR', value: 'Discount rate at which the net present value of all cash flows is zero' },
      { label: 'Timing', value: 'MOIC ignores timing; IRR is driven by it' },
      { label: 'Basis', value: 'MOIC is often gross (deal level); fund-level TVPI is net to LPs' },
      { label: 'Weakness of IRR', value: 'Can be inflated by early distributions or subscription-line financing' },
      { label: 'Weakness of MOIC', value: 'Says nothing about how long it took' },
    ],
    howItWorks: [
      {
        heading: 'Calculate MOIC',
        body: 'Add up all value received (realised plus unrealised) and divide by total capital invested.',
      },
      {
        heading: 'Calculate IRR',
        body: 'List every cash flow with its date, then find the annual rate that makes their present value net to zero. Spreadsheets use XIRR for dated flows.',
      },
      {
        heading: 'Read them together',
        body: 'MOIC shows the size of the outcome, IRR shows the speed. A good result usually needs both to be strong.',
      },
    ],
    workedExample: {
      title: 'Same 2.0x, different speed',
      setup: 'Two investments each put in $10M and return $20M in one lump sum. One returns the cash after 3 years, the other after 7. IRR below uses the single-cash-flow formula (MOIC^(1/years) − 1).',
      rows: [
        { label: 'Investment A: MOIC', value: '2.0x' },
        { label: 'Investment A: IRR over 3 years', value: '26.0%' },
        { label: 'Investment B: MOIC', value: '2.0x' },
        { label: 'Investment B: IRR over 7 years', value: '10.4%' },
      ],
      takeaway:
        'Both doubled the money, but A\'s annualised return is more than double B\'s. MOIC alone would hide that.',
    },
    mistakes: [
      'Comparing a gross deal MOIC with a net fund TVPI.',
      'Reporting IRR without the MOIC, or the reverse.',
      'Ignoring that subscription credit lines can lift IRR by delaying capital calls.',
      'Comparing IRRs of funds with very different holding periods.',
    ],
    singaporeNote:
      'There is no Singapore-specific definition, but IRR depends on dated cash flows, so multi-currency funds should state the currency and FX basis. For a VCC, compute returns per sub-fund, with its own investors and cash flow dates.',
    faqs: [
      {
        q: 'What is a good IRR for private equity?',
        a: 'It varies by strategy and vintage, so compare with peers of the same vintage and strategy rather than a fixed number.',
      },
      {
        q: 'Is MOIC the same as TVPI?',
        a: 'Not exactly. MOIC is usually a gross multiple, often at deal level. TVPI is net to LPs, after fees and carry, at fund level.',
      },
      {
        q: 'Why can IRR and MOIC disagree?',
        a: 'Because IRR depends on timing and MOIC does not. A quick 1.5x can beat a slow 2.0x on IRR.',
      },
    ],
    relatedTerms: ['tvpi-dpi-rvpi', 'carried-interest'],
    relatedTools: ['/tools/irr-tvpi-dpi-calculator', '/tools/vintage-benchmarker'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    authorities: ['your fund documents', 'the ILPA reporting guidance'],
    sources: [
      { label: 'ILPA Reporting Template', url: 'https://ilpa.org' },
    ],
    author: AUTHOR,
    publishedDate: '2026-10-02',
    lastReviewed: '2026-10-02',
  },
];

export const topicBySlug = (slug: string) => LEARN_TOPICS.find((t) => t.slug === slug);

export const termBySlug = (topic: string, slug: string) =>
  LEARN_TERMS.find((t) => t.topic === topic && t.slug === slug);

export const termsInTopic = (topic: string) => LEARN_TERMS.filter((t) => t.topic === topic);

/** Topics that have at least one published term — empty topics never get a page. */
export const populatedTopics = () => LEARN_TOPICS.filter((t) => termsInTopic(t.slug).length > 0);

export const learnHref = (t: LearnTerm) => `/learn/${t.topic}/${t.slug}`;

export function getRelatedLearnTerms(term: LearnTerm): LearnTerm[] {
  return term.relatedTerms
    .map((slug) => LEARN_TERMS.find((t) => t.slug === slug))
    .filter((t): t is LearnTerm => Boolean(t));
}

export function getLearnRelatedTools(term: LearnTerm): { path: string; title: string }[] {
  return term.relatedTools.map((path) => ({ path, title: TOOL_CONTENT[path]?.seoTitle ?? path }));
}

export function getLearnRelatedSolution(term: LearnTerm): SolutionNav | undefined {
  return term.relatedSolution ? solutionBySlug(term.relatedSolution) : undefined;
}

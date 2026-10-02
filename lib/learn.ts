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
    relatedTerms: ['capital-call', 'distribution-waterfall'],
    relatedTools: ['/tools/vcc-comparator', '/tools/vcc-cost-estimator', '/tools/mas-licensing-estimator'],
    relatedPosts: [
      { slug: 'how-to-set-up-a-vcc-singapore', title: 'How to Set Up a VCC in Singapore (2026)' },
      { slug: 'section-13o-vs-13u-singapore', title: 'Section 13O vs 13U (2026)' },
    ],
    relatedSolution: 'vc-pe-firms',
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
    relatedTerms: ['capital-call', 'vcc'],
    relatedTools: ['/tools/waterfall', '/tools/waterfall-comparator', '/tools/fee-carry-modeler'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
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
    relatedTerms: ['distribution-waterfall', 'vcc'],
    relatedTools: ['/tools/capital-call-schedule', '/tools/drawdown-notice'],
    relatedPosts: [],
    relatedSolution: 'vc-pe-firms',
    sources: [
      { label: 'ILPA Capital Call and Distribution Notice Template', url: 'https://ilpa.org' },
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

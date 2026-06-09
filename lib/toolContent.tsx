// Per-tool SEO + LLM content: clean titles, descriptions, explanatory copy and
// FAQs. The FAQ text here is rendered visibly AND emitted as FAQPage JSON-LD,
// so the two always match (a Google structured-data requirement).

export type FAQ = { q: string; a: string };

export type ToolContent = {
  seoTitle: string;        // <title>, brand suffix added by ToolMeta
  seoDescription: string;  // meta description (~150-160 chars)
  keywords: string;
  intro: string[];         // explanatory paragraphs
  how: string[];           // "how to use" steps
  faqs: FAQ[];
  related: string[];       // related tool slugs (paths)
};

export const TOOL_CONTENT: Record<string, ToolContent> = {
  '/tools/waterfall': {
    seoTitle: 'Distribution Waterfall Calculator (LP/GP, Carry, Catch-up)',
    seoDescription: 'Free private equity distribution waterfall calculator — model return of capital, preferred return, GP catch-up and carried interest with IRR, scenarios and clawback.',
    keywords: 'waterfall calculator, distribution waterfall, carried interest, GP catch-up, preferred return, hurdle rate, LP GP split, private equity, IRR, clawback',
    intro: [
      'A distribution waterfall sets the order in which cash from a fund is paid out between limited partners (LPs) and the general partner (GP). Most private equity and venture funds follow four tiers: return of capital, a preferred return (hurdle) to LPs, a GP catch-up, and then a carried-interest split of the remaining profit.',
      'This calculator models a European (whole-fund) waterfall with date-based preferred return accrual, multiple LP groups, GP co-investment, and full catch-up — and shows the resulting LP and GP economics, IRR curves, Bear/Base/Bull scenarios and a GP clawback check.',
    ],
    how: [
      'Enter each LP group\'s committed capital and the GP co-investment.',
      'Set total distributions (proceeds) and the waterfall terms — preferred return, carry, catch-up rate and accrual basis.',
      'Set the investment and distribution dates so the preferred return accrues over the real holding period.',
      'Read the tiered breakdown, LP/GP split, IRR and clawback exposure — and use "Copy share link" to send the exact scenario.',
    ],
    faqs: [
      { q: 'What is a distribution waterfall?', a: 'A distribution waterfall is the contractual order in which a fund\'s proceeds are split between LPs and the GP. The standard tiers are return of capital, preferred return, GP catch-up, then a carried-interest split (commonly 80/20).' },
      { q: 'What is the GP catch-up?', a: 'After LPs receive their preferred return, the catch-up lets the GP take a larger share (often 100%) of the next distributions until the GP has earned its full carry percentage on total profits above the return of capital — restoring the agreed profit split.' },
      { q: 'What is the difference between a preferred return and a hurdle rate?', a: 'They are usually the same thing: a minimum annual return (e.g. 8%) that LPs must receive before the GP earns carried interest. It can accrue on a simple or compounded basis over the holding period.' },
      { q: 'How is carried interest calculated?', a: 'Carried interest is the GP\'s share (commonly 20%) of profits above the return of capital and preferred return. With a full catch-up, the GP ultimately receives its carry percentage of all profit above invested capital.' },
    ],
    related: ['/tools/waterfall-comparator', '/tools/fee-carry-modeler', '/tools/carried-interest-tax'],
  },

  '/tools/waterfall-comparator': {
    seoTitle: 'American vs European Waterfall Comparator',
    seoDescription: 'Compare American (deal-by-deal) and European (whole-fund) carry on the same deals — see the GP carry difference and the LP clawback exposure side by side.',
    keywords: 'American vs European waterfall, deal-by-deal carry, whole-fund waterfall, carried interest, clawback, GP LP split, private equity distribution',
    intro: [
      'The American and European waterfall differ in when the GP earns carried interest. A European (whole-fund) waterfall pays carry only after the entire fund\'s capital and preferred return have been returned to LPs. An American (deal-by-deal) waterfall pays carry on each profitable deal as it exits.',
      'Because deal-by-deal carry is taken before losers are netted off, the GP earns more and earlier under the American structure — creating clawback exposure for LPs. This tool runs the same deals through both structures and quantifies that gap.',
    ],
    how: [
      'Set the fund terms — preferred return, hold period and carried-interest percentage.',
      'Enter each deal\'s invested capital and exit multiple (MOIC), including any losers.',
      'Compare GP carry and LP proceeds under American vs European, and read the clawback exposure — the amount the GP over-distributes deal-by-deal.',
    ],
    faqs: [
      { q: 'What is the difference between an American and a European waterfall?', a: 'An American (deal-by-deal) waterfall pays the GP carried interest on each profitable deal as it exits. A European (whole-fund) waterfall pays carry only after all of the fund\'s capital and preferred return have been returned to LPs.' },
      { q: 'Which waterfall is better for LPs?', a: 'The European whole-fund waterfall is more LP-friendly because losing deals offset winners before any carry is paid, so the GP cannot over-earn carry early. The American structure favours the GP.' },
      { q: 'What is a clawback in a fund waterfall?', a: 'A clawback obligation requires the GP to return excess carried interest at the end of the fund if it was paid carry on early winners that was not justified once later losses are included — most relevant under American deal-by-deal waterfalls.' },
      { q: 'Why do GPs prefer deal-by-deal carry?', a: 'Deal-by-deal (American) carry lets the GP receive carried interest sooner, on each winning exit, rather than waiting until the whole fund has returned capital and preferred return — improving the GP\'s cash-flow timing.' },
    ],
    related: ['/tools/waterfall', '/tools/fee-carry-modeler', '/tools/carried-interest-tax'],
  },

  '/tools/vcc-comparator': {
    seoTitle: 'Umbrella vs Standalone VCC Structure Comparator',
    seoDescription: 'Compare a Singapore umbrella VCC with sub-funds against a standalone VCC — cost, ring-fencing, setup time and governance — and get a fit recommendation.',
    keywords: 'VCC, Variable Capital Company, umbrella VCC, sub-fund, standalone VCC, Singapore fund structure, ring-fencing, fund structuring',
    intro: [
      'A Variable Capital Company (VCC) is a Singapore corporate structure for investment funds. It can be set up as a standalone VCC holding a single fund, or as an umbrella VCC holding multiple ring-fenced sub-funds that share one board and one set of service providers.',
      'This comparator weighs your plans — number of strategies, growth intentions, cost sensitivity and spin-off potential — and recommends the structure that fits, with a full side-by-side of cost, ring-fencing, setup time and governance.',
    ],
    how: [
      'Tell the tool how many funds you plan to run and whether you expect to add more.',
      'Set your preferences on cost, shared service providers and any spin-off intentions.',
      'Read the recommended structure, fit confidence and the umbrella-vs-standalone comparison matrix.',
    ],
    faqs: [
      { q: 'What is an umbrella VCC?', a: 'An umbrella VCC is a single Variable Capital Company that holds multiple sub-funds. Each sub-fund\'s assets and liabilities are legally segregated (ring-fenced), while the sub-funds share one board, one set of service providers and a common constitution — making it cost-efficient for running several strategies.' },
      { q: 'What is the difference between a sub-fund and a standalone VCC?', a: 'A sub-fund sits inside an umbrella VCC and shares its governance and providers, so it is cheaper and faster to launch. A standalone VCC is its own entity with a dedicated board and providers — simpler for a single strategy and cleaner to sell or spin off.' },
      { q: 'Are VCC sub-fund assets ring-fenced?', a: 'Yes. Under the Singapore VCC framework, the assets and liabilities of each sub-fund are statutorily segregated, so the liabilities of one sub-fund cannot be met from the assets of another.' },
      { q: 'When should I choose a standalone VCC over an umbrella?', a: 'Choose a standalone VCC for a single, well-defined strategy, when you may sell or spin off the fund, or when you want fully dedicated governance and service providers rather than sharing them across sub-funds.' },
    ],
    related: ['/tools/vcc-cost-estimator', '/tools/mas-licensing-estimator', '/tools/ter-benchmarker'],
  },

  '/tools/mas-licensing-estimator': {
    seoTitle: 'MAS Fund Management Licence Estimator (CMS, RFMC, Family Office)',
    seoDescription: 'Find which Singapore fund management regime fits — single family office exemption, RFMC, or a CMS licence (A/I or Retail LFMC) — based on AUM and investor base.',
    keywords: 'MAS licence, CMS licence, RFMC, LFMC, fund management Singapore, single family office, accredited investors, capital markets services licence',
    intro: [
      'Fund managers in Singapore operate under one of several MAS regimes: a Single Family Office exemption (managing only related-party money), a Registered Fund Management Company (RFMC), or a Licensed Fund Management Company (LFMC) holding a Capital Markets Services (CMS) licence — serving accredited/institutional investors (A/I) or retail investors.',
      'This estimator maps your business — whose money you manage, your investor base and your AUM — to the regime that fits, with indicative base-capital and fee guidance. Note that MAS has announced the RFMC regime is being phased out, so most new external managers are directed to the A/I LFMC route.',
    ],
    how: [
      'Choose whether you manage your own family\'s money or external client money.',
      'Select your target investors (accredited/institutional or retail) and enter your AUM and investor count.',
      'Read the recommended regime and the side-by-side of capital, caps, fees and setup time.',
    ],
    faqs: [
      { q: 'Do I need a CMS licence to manage a fund in Singapore?', a: 'If you manage external client money you generally need a Capital Markets Services (CMS) licence as a Licensed Fund Management Company. A Single Family Office managing only related-party assets is exempt from licensing, and historically smaller managers could register as an RFMC.' },
      { q: 'What is the difference between an RFMC and an LFMC?', a: 'An RFMC (Registered Fund Management Company) was a lighter regime capped at S$250M AUM and 30 qualified investors. An LFMC holds a full CMS licence with no AUM cap and can be A/I (accredited/institutional only) or Retail. MAS is phasing out the RFMC regime.' },
      { q: 'What is a Single Family Office exemption?', a: 'A Single Family Office that manages only the assets of members of the same family is exempt from holding a fund management licence in Singapore, and can apply for the 13O or 13U tax incentive schemes.' },
      { q: 'Is the RFMC regime being phased out?', a: 'Yes. MAS has announced the withdrawal of the RFMC regime, with RFMCs transitioning to the A/I LFMC regime — so new managers should plan around a CMS licence rather than RFMC registration.' },
    ],
    related: ['/tools/vcc-cost-estimator', '/tools/vcc-comparator', '/tools/carried-interest-tax'],
  },

  '/tools/vcc-cost-estimator': {
    seoTitle: 'Singapore VCC Setup Cost Estimator',
    seoDescription: 'Estimate the one-time and annual cost of launching a Singapore VCC — incorporation, legal, fund admin, audit, directors and MAS fees — by structure and fund manager route.',
    keywords: 'VCC setup cost, Singapore fund setup cost, VCC incorporation, fund administration fees, 13O, 13U, CMS licence, fund launch cost, Variable Capital Company',
    intro: [
      'Launching a Singapore VCC carries both one-time setup costs (incorporation, legal structuring, fund manager onboarding and any tax-incentive application) and recurring annual costs (fund administration, audit, corporate secretary, directors, tax and MAS fees).',
      'This estimator builds an indicative cost range from your choices — standalone or umbrella structure, fund manager route (external FM, own CMS licence or RFMC), tax incentive (13O/13U) and strategy complexity — so you can budget a launch before requesting formal quotes.',
    ],
    how: [
      'Pick your VCC structure and, for umbrellas, the number of sub-funds.',
      'Select your fund manager route, tax incentive and strategy complexity.',
      'Read the one-time setup, annual recurring and first-year all-in cost ranges, with a line-by-line breakdown.',
    ],
    faqs: [
      { q: 'How much does it cost to set up a VCC in Singapore?', a: 'Setting up a Singapore VCC typically involves a one-time cost covering incorporation, legal structuring and fund documents, plus fund manager onboarding — and recurring annual costs for administration, audit, directors and compliance. Use the estimator for an indicative range based on your structure and manager route.' },
      { q: 'What are the ongoing annual costs of a VCC?', a: 'Recurring VCC costs usually include fund administration, annual audit, corporate secretary, resident and independent directors, tax compliance and MAS/regulatory fees. Umbrella VCCs add incremental admin and audit per sub-fund.' },
      { q: 'What is the difference between the 13O and 13U tax incentives?', a: 'The 13O (Onshore Fund) and 13U (Enhanced-Tier Fund) schemes exempt qualifying fund income from Singapore tax. They differ in minimum fund size and local business-spending requirements, with 13U aimed at larger funds. Both apply to umbrella and standalone VCCs.' },
      { q: 'Does an umbrella VCC cost more than a standalone VCC?', a: 'An umbrella VCC has a higher total cost because each sub-fund adds incremental setup, administration and audit — but the cost per fund is lower than running multiple standalone VCCs, since the umbrella shares one board and structure.' },
    ],
    related: ['/tools/vcc-comparator', '/tools/mas-licensing-estimator', '/tools/ter-benchmarker'],
  },

  '/tools/ter-benchmarker': {
    seoTitle: 'Fund Total Expense Ratio (TER) Benchmarker',
    seoDescription: 'Benchmark your fund\'s total expense ratio against strategy peers — enter your management fee and operating costs to find your TER percentile and quartile.',
    keywords: 'TER, total expense ratio, fund expense benchmark, management fee, fund costs, expense ratio comparison, fund economics, VCC',
    intro: [
      'The total expense ratio (TER) measures a fund\'s annual operating costs — management fee plus administration, audit, custody, directors, tax and regulatory costs — as a percentage of net asset value. It is the single clearest gauge of how cost-efficient a fund is for its investors.',
      'This benchmarker places your TER within a strategy cohort (buyout/VC, hedge, private credit, multi-asset or fixed income), showing your percentile against the 25th, median, 75th and 90th-percentile peer levels.',
    ],
    how: [
      'Select the strategy cohort that matches your fund.',
      'Enter your management fee and other operating costs in basis points.',
      'Read your TER, your peer percentile and where you sit on the quartile gauge.',
    ],
    faqs: [
      { q: 'How is a fund\'s total expense ratio (TER) calculated?', a: 'TER is total annual operating costs — management fee plus administration, audit, custody, directors, tax and regulatory costs — divided by the fund\'s average net asset value, expressed as a percentage or in basis points. It excludes performance fees.' },
      { q: 'What is a good total expense ratio for a fund?', a: 'A "good" TER depends on strategy and size. Private equity and venture funds commonly run higher TERs (around 2–3.5%) than fixed income (often under 1%). Larger funds dilute fixed costs and tend to sit below the median for their cohort.' },
      { q: 'What does the TER exclude?', a: 'TER typically excludes performance fees and carried interest, transaction costs, and one-off setup costs. Those are assessed separately from the recurring expense ratio.' },
    ],
    related: ['/tools/fee-carry-modeler', '/tools/vcc-cost-estimator', '/tools/vintage-benchmarker'],
  },

  '/tools/irr-tvpi-dpi-calculator': {
    seoTitle: 'IRR, TVPI, DPI & RVPI Calculator',
    seoDescription: 'Calculate fund performance from cash flows — money-weighted IRR (XIRR) plus the TVPI, DPI and RVPI multiples — with a J-curve of contributions and distributions.',
    keywords: 'IRR calculator, XIRR, TVPI, DPI, RVPI, fund performance, multiple on invested capital, private equity returns, LP reporting',
    intro: [
      'LPs judge a fund on four numbers: IRR (the money-weighted return), and the TVPI, DPI and RVPI multiples. Together they capture both the rate of return and how much value has been realised versus still held at NAV.',
      'This calculator takes your dated capital calls and distributions plus the current NAV and computes all four metrics with a true XIRR, and plots the cash-flow J-curve.',
    ],
    how: [
      'Enter each capital call and distribution with its date.',
      'Add the current NAV (residual value) and valuation date.',
      'Read the IRR, TVPI, DPI and RVPI, and the cumulative J-curve.',
    ],
    faqs: [
      { q: 'What do TVPI, DPI and RVPI mean?', a: 'TVPI (Total Value to Paid-In) is total value — distributions plus NAV — divided by paid-in capital. DPI (Distributions to Paid-In) is realised cash returned divided by paid-in. RVPI (Residual Value to Paid-In) is unrealised NAV divided by paid-in. TVPI equals DPI plus RVPI.' },
      { q: 'What is the difference between IRR and TVPI?', a: 'IRR is a time-weighted-for-cash-flows (money-weighted) annual rate of return that accounts for the timing of cash flows. TVPI is a simple multiple of total value over paid-in capital and ignores timing. A fund can have a high TVPI but a modest IRR if value took a long time to build.' },
      { q: 'What is a good DPI for a fund?', a: 'DPI above 1.0x means a fund has returned more cash than LPs paid in. Early in a fund\'s life DPI is low (the J-curve), and a DPI of 1.0x+ before final wind-down is generally considered strong realised performance.' },
      { q: 'How is fund IRR calculated?', a: 'Fund IRR is the discount rate that makes the net present value of all dated cash flows — capital calls as outflows, distributions and ending NAV as inflows — equal to zero. With irregular dates this is an XIRR calculation.' },
    ],
    related: ['/tools/vintage-benchmarker', '/tools/capital-call-schedule', '/tools/fee-carry-modeler'],
  },

  '/tools/fee-carry-modeler': {
    seoTitle: 'Management Fee & Carried Interest Modeler',
    seoDescription: 'Model total GP economics over a fund\'s life — management fees with a step-down, carried interest over the hurdle, and the net-to-LP multiple after fee and carry drag.',
    keywords: 'management fee, carried interest, carry, fund economics, GP economics, fee step-down, two and twenty, preferred return, net to LP, MOIC',
    intro: [
      'A fund\'s economics come down to two GP revenue streams — the management fee and carried interest — set against the net return delivered to LPs. The classic "2 and 20" means a 2% annual management fee and 20% carry over a preferred return.',
      'This modeler projects total management fees (including a post-investment-period step-down), the carried interest earned at a given gross MOIC, the GP\'s total take, and the LP\'s net multiple after fee and carry drag.',
    ],
    how: [
      'Enter the fund size and an expected gross MOIC.',
      'Set the management fee, step-down rate, investment period and fund life.',
      'Set the carry and preferred return, then read the fee total, carry, GP take and LP net multiple.',
    ],
    faqs: [
      { q: 'What does "2 and 20" mean?', a: '"2 and 20" is the classic private equity fee structure: a 2% annual management fee on committed capital and 20% carried interest on profits above the preferred return. Many funds now use lower or stepped fees.' },
      { q: 'What is a management fee step-down?', a: 'A step-down reduces the management fee rate (or changes its basis from committed to invested capital) after the investment period ends, since the GP is no longer actively deploying capital. It lowers the total fee drag over a fund\'s life.' },
      { q: 'How is carried interest calculated over a hurdle?', a: 'Carried interest is the GP\'s share (commonly 20%) of profits above the return of capital and the preferred return (hurdle). With a full catch-up, the GP receives its carry percentage of all profit above invested capital once the hurdle is cleared.' },
      { q: 'What is the difference between gross and net MOIC?', a: 'Gross MOIC is the multiple on invested capital before fees and carry. Net MOIC is what LPs actually keep after management fees and carried interest are deducted — the gap between them is the fee-and-carry drag.' },
    ],
    related: ['/tools/waterfall', '/tools/carried-interest-tax', '/tools/co-investment-modeler'],
  },

  '/tools/capital-call-schedule': {
    seoTitle: 'Capital Call Schedule Builder (Drawdown Pacing)',
    seoDescription: 'Model how committed capital is drawn down over the investment period — set pacing and call frequency and see every drawdown, cumulative called and remaining dry powder.',
    keywords: 'capital call schedule, drawdown schedule, committed capital, capital call calculator, fund pacing model, dry powder, drawdown timing',
    intro: [
      'Funds rarely call all committed capital at once. Instead the GP issues capital calls (drawdowns) over the investment period to fund investments and fees. The pacing — front-loaded, even or back-loaded — shapes when LPs must fund and how much dry powder remains.',
      'This builder turns your commitment, investment period, call frequency and pacing into a full drawdown schedule, with per-call amounts, cumulative called, percentage drawn and remaining uncalled commitment.',
    ],
    how: [
      'Enter the total committed capital and investment period.',
      'Choose call frequency, an initial drawdown at first close, and a pacing curve.',
      'Read the schedule, the drawdown chart and the remaining dry powder over time.',
    ],
    faqs: [
      { q: 'What is a capital call?', a: 'A capital call (or drawdown) is a request from a fund\'s GP for LPs to transfer a portion of their committed capital, used to fund investments, fees and expenses. Capital is called over the investment period rather than all upfront.' },
      { q: 'What is a drawdown schedule?', a: 'A drawdown schedule is the projected timing and size of a fund\'s capital calls over its investment period — showing how committed capital is converted into invested capital and how much remains uncalled (dry powder).' },
      { q: 'What is dry powder?', a: 'Dry powder is committed capital that has not yet been called or deployed. It represents the fund\'s remaining capacity to make new investments and follow-ons.' },
    ],
    related: ['/tools/irr-tvpi-dpi-calculator', '/tools/drawdown-notice', '/tools/fee-carry-modeler'],
  },

  '/tools/co-investment-modeler': {
    seoTitle: 'Co-Investment Return Modeler',
    seoDescription: 'Compare the net return of the same capital invested through the main fund (full fees and carry) versus a fee-light co-investment, with MOIC and IRR uplift.',
    keywords: 'co-investment, co-invest returns, fund vs co-invest, fee savings, carried interest, net IRR, MOIC, LP economics, private equity',
    intro: [
      'Co-investment lets an LP put capital directly into a deal alongside the fund, typically with reduced or zero management fee and carried interest. Because the fee and carry drag is removed, the same gross deal return translates into a higher net return for the LP.',
      'This modeler runs an identical deal through both routes — the main fund and a co-investment — and quantifies the net MOIC and IRR uplift from co-investing.',
    ],
    how: [
      'Enter the investment amount, gross MOIC and hold period.',
      'Set the main fund\'s management fee, carry and preferred return.',
      'Set the co-investment fee and carry (often zero), then compare net return, MOIC and IRR.',
    ],
    faqs: [
      { q: 'What is a co-investment?', a: 'A co-investment is a direct investment by an LP into a specific deal alongside a fund, usually on fee-light terms (reduced or no management fee and carry). It lets LPs increase exposure to chosen deals while lowering blended costs.' },
      { q: 'Why are co-investments often fee-free?', a: 'GPs offer co-investments at low or no fee and carry to attract LP capital into larger deals, deepen LP relationships and support fundraising. The fee-light economics are the main reason LPs value co-investment rights.' },
      { q: 'How much do co-investments improve net returns?', a: 'By removing most management fee and carried interest, co-investments can add several hundred basis points of net IRR versus the same deal accessed through the fund — the exact uplift depends on the fee load, carry and hold period.' },
    ],
    related: ['/tools/fee-carry-modeler', '/tools/irr-tvpi-dpi-calculator', '/tools/waterfall'],
  },

  '/tools/carried-interest-tax': {
    seoTitle: 'Carried Interest Tax Estimator (Singapore, US, UK)',
    seoDescription: 'Compare indicative tax on carried interest across Singapore, the US and the UK — with holding-period rules (US §1061, UK income-based carry) and net-after-tax.',
    keywords: 'carried interest tax, carry tax, section 1061, capital gains, Singapore no capital gains tax, UK carried interest, GP tax, fund manager tax',
    intro: [
      'How carried interest is taxed depends heavily on jurisdiction and holding period. Singapore has no capital gains tax, so carry that is capital in nature is generally untaxed. The US taxes carry as long-term capital gain only if the underlying assets are held at least three years (section 1061), otherwise as ordinary income. The UK taxes carried interest under a specific regime that is being reformed into the income-tax framework.',
      'This estimator compares the indicative tax and net-after-tax on the same carry across all three jurisdictions, and flags how holding period changes the treatment. It is a directional guide, not tax advice.',
    ],
    how: [
      'Select a jurisdiction and enter the carried-interest amount.',
      'Set the average asset holding period (this drives the US §1061 and UK income-based carry tests).',
      'Compare the effective rate, tax due and net carry across Singapore, the US and the UK.',
    ],
    faqs: [
      { q: 'How is carried interest taxed?', a: 'It varies by jurisdiction. Singapore generally does not tax carry that is capital in nature (no capital gains tax). The US taxes it as long-term capital gain if assets are held 3+ years (section 1061), otherwise as ordinary income. The UK applies a dedicated carried-interest regime currently under reform.' },
      { q: 'Is carried interest taxed in Singapore?', a: 'Singapore has no capital gains tax, so carried interest that is capital in nature is generally not taxed. If carry is instead characterised as income for services, it can be taxable at income tax rates — the characterisation is fact-specific.' },
      { q: 'What is the US 3-year holding period rule for carry (section 1061)?', a: 'Under section 1061, carried interest qualifies for the lower long-term capital gains rate only if the underlying assets were held for more than three years; otherwise the gain is taxed as short-term (ordinary income).' },
      { q: 'How is carried interest taxed in the UK?', a: 'UK carried interest has been taxed under a capital gains-based regime, with income-based rules where average holding is short. Reforms are moving carried interest into the income-tax framework — confirm the current rate with a UK tax adviser.' },
    ],
    related: ['/tools/fee-carry-modeler', '/tools/waterfall', '/tools/mas-licensing-estimator'],
  },

  '/tools/vintage-benchmarker': {
    seoTitle: 'Fund Vintage Benchmarker (Quartile Ranking)',
    seoDescription: 'See which quartile your fund\'s net IRR lands in versus vintage-year peers by strategy, against top-quartile, median and bottom-quartile breakpoints.',
    keywords: 'vintage benchmark, fund quartile, net IRR benchmark, top quartile, private equity performance, venture benchmark, fund ranking, Cambridge Preqin',
    intro: [
      'Fund performance is judged against peers of the same vintage year — the year a fund began investing — because market conditions and the J-curve make cross-vintage comparison misleading. Benchmarks report quartile breakpoints: the top-quartile (75th percentile), median and bottom-quartile (25th percentile) net IRR for each strategy and vintage.',
      'This tool places your net IRR within its vintage cohort and tells you which quartile you land in — a key signal in LP reporting and fundraising.',
    ],
    how: [
      'Select your strategy and vintage year.',
      'Enter your fund\'s net IRR.',
      'Read your quartile placement against the top-quartile, median and bottom-quartile lines.',
    ],
    faqs: [
      { q: 'What is a fund vintage year?', a: 'A fund\'s vintage year is the year it made its first investment (or its first capital call). Funds are benchmarked against peers of the same vintage because economic conditions and the J-curve make comparisons across vintages unreliable.' },
      { q: 'What is a top-quartile fund?', a: 'A top-quartile fund ranks in the best 25% of its vintage-and-strategy peer group on a chosen metric — usually net IRR or TVPI. The top-quartile breakpoint is the 75th-percentile return; funds at or above it are top quartile.' },
      { q: 'What is a good IRR for a private equity fund?', a: 'It depends on strategy and vintage, but mature buyout funds often show median net IRRs in the mid-teens, with top-quartile funds well above 20%. Venture has wider dispersion — higher top-quartile and lower bottom-quartile outcomes.' },
    ],
    related: ['/tools/irr-tvpi-dpi-calculator', '/tools/ter-benchmarker', '/tools/fee-carry-modeler'],
  },

  '/tools/drawdown-notice': {
    seoTitle: 'Drawdown Notice Generator (Capital Call Notice)',
    seoDescription: 'Generate a professional capital call / drawdown notice for your LPs — enter fund, investor, commitment and payment details, preview live, and download a print-ready PDF.',
    keywords: 'drawdown notice, capital call notice, capital call letter, LP drawdown, fund capital call template, GP notice, fund operations',
    intro: [
      'A drawdown notice (or capital call notice) is the formal letter a GP sends to an LP requesting payment of part of their commitment. It states the amount called, the percentage of commitment, cumulative called to date, the due date and the bank payment instructions.',
      'This generator builds a clean, professional notice from your inputs, auto-calculates the drawdown percentage and remaining commitment, previews it live, and produces a print-ready PDF — with an option to have a copy emailed.',
    ],
    how: [
      'Enter the fund, manager, investor and notice details.',
      'Set the commitment, previously called amount and this drawdown, plus the due date and bank instructions.',
      'Preview the notice, download the PDF or have a copy emailed to you.',
    ],
    faqs: [
      { q: 'What is a drawdown notice?', a: 'A drawdown notice, also called a capital call notice, is the formal request a fund\'s GP issues to an LP to pay a portion of their committed capital by a stated due date, including the amount, percentage of commitment and bank payment instructions.' },
      { q: 'What should a capital call notice include?', a: 'A capital call notice should include the fund and manager name, the investor, the notice/call number and date, the total commitment, capital previously called, this drawdown amount and percentage, the cumulative and remaining commitment, the payment due date and bank wire instructions.' },
      { q: 'How much notice is required for a capital call?', a: 'The notice period is set by the fund\'s governing documents — commonly around 10 business days, though it varies. Always check the limited partnership agreement or subscription documents for the contractual notice period.' },
    ],
    related: ['/tools/capital-call-schedule', '/tools/irr-tvpi-dpi-calculator', '/tools/waterfall'],
  },

  '/tools/bond-je-generator': {
    seoTitle: 'Bond Accounting JE Generator (IFRS 9 Amortised Cost)',
    seoDescription: 'Generate IFRS 9 amortised-cost journal entries for a bond — day-1 recognition, effective-interest accruals and maturity — with the effective interest rate and amortisation schedule solved automatically.',
    keywords: 'bond accounting, IFRS 9 amortised cost, effective interest method, EIR, amortisation schedule, journal entries, debt instrument accounting, fund administration, premium discount amortisation',
    intro: [
      'Under IFRS 9, a debt instrument held to collect contractual cash flows is measured at amortised cost using the effective interest method. The instrument is recognised at fair value plus transaction costs, and interest income is recognised at a constant effective interest rate (EIR) on the carrying amount — not at the cash coupon rate.',
      'This generator solves the EIR for your bond, builds the full period-by-period amortisation schedule, and produces the journal entries you need: day-1 recognition, the effective-interest accrual for any period (with the premium amortised or discount accreted), and redemption at maturity.',
    ],
    how: [
      'Enter the bond — face value, clean price, coupon, frequency, transaction costs and the settlement and maturity dates.',
      'Read the solved effective interest rate, initial carrying amount and premium/discount, plus the full amortisation schedule.',
      'Pick the period to show the accrual entry for, then download the journal entries as a print-ready PDF.',
    ],
    faqs: [
      { q: 'What is the effective interest method?', a: 'The effective interest method recognises interest income at a constant rate (the effective interest rate) on the carrying amount of a financial asset. It spreads any premium or discount, plus transaction costs, over the life of the instrument so that the carrying amount amortises to face value at maturity.' },
      { q: 'How is the effective interest rate (EIR) calculated?', a: 'The EIR is the rate that discounts all of the instrument\'s expected future cash flows — coupons and the redemption amount — back to its initial carrying amount (purchase price plus transaction costs). This tool solves for it numerically and reports both the per-period and annualised rate.' },
      { q: 'How are premium and discount bonds accounted for under IFRS 9?', a: 'For a discount bond (bought below par), interest income exceeds the cash coupon and the difference accretes the carrying amount up to par. For a premium bond (bought above par), interest income is below the coupon and the excess amortises the carrying amount down to par. Either way the carrying amount equals face value at maturity.' },
      { q: 'What journal entries does a bond at amortised cost require?', a: 'Three key entries: day-1 recognition (debit the investment at carrying amount, credit cash); each period\'s interest accrual (debit interest receivable for the coupon and adjust the investment for amortisation, credit interest income at the EIR); and maturity (debit cash, credit the investment at face value).' },
    ],
    related: ['/tools/fx-revaluation-je', '/tools/subscription-redemption-je', '/tools/ter-benchmarker'],
  },

  '/tools/fx-revaluation-je': {
    seoTitle: 'FX Revaluation JE Generator (IAS 21 Closing Rate)',
    seoDescription: 'Retranslate a foreign-currency monetary item to the closing rate under IAS 21, compute the period-end FX gain or loss, and generate the revaluation journal entry — ready to post and download.',
    keywords: 'FX revaluation, IAS 21, foreign exchange gain loss, monetary items, closing rate, currency translation, journal entry, fund accounting, month-end close',
    intro: [
      'Under IAS 21, foreign-currency monetary items — cash, receivables, payables and borrowings — are retranslated at the closing (period-end) exchange rate. The resulting exchange difference is recognised in profit or loss. Non-monetary items measured at historical cost are not retranslated.',
      'This generator takes the foreign-currency amount, the rate at initial (or prior) recognition and the closing rate, works out whether you have a gain or a loss given whether the item is an asset or a liability, and produces the revaluation journal entry.',
    ],
    how: [
      'Choose the monetary item type — receivable, cash, payable or borrowing — and enter the foreign-currency amount.',
      'Enter the opening (or prior) rate and the closing rate in functional currency per unit of foreign currency.',
      'Read the gain or loss and the journal entry, then download it as a print-ready PDF.',
    ],
    faqs: [
      { q: 'What is FX revaluation under IAS 21?', a: 'FX revaluation is the period-end retranslation of foreign-currency monetary items at the closing exchange rate. The change in the functional-currency carrying amount since the last measurement is recognised as a foreign exchange gain or loss in profit or loss.' },
      { q: 'Which items are revalued at the closing rate?', a: 'Only monetary items — cash and bank balances, receivables, payables and borrowings denominated in a foreign currency. Non-monetary items carried at historical cost (such as prepayments or equity investments at cost) are kept at the exchange rate on the transaction date.' },
      { q: 'Does an FX gain or loss go to profit or loss or to OCI?', a: 'For monetary items, exchange differences generally go to profit or loss. Exceptions include the effective portion of a designated cash-flow hedge and exchange differences on a net investment in a foreign operation, which are recognised in other comprehensive income.' },
      { q: 'How do I know if a rate movement is a gain or a loss?', a: 'For a foreign-currency asset, a rise in the foreign currency increases its functional value and produces a gain; a fall produces a loss. For a foreign-currency liability it is the opposite — a rise in the foreign currency increases the amount owed and produces a loss.' },
    ],
    related: ['/tools/bond-je-generator', '/tools/subscription-redemption-je', '/tools/irr-tvpi-dpi-calculator'],
  },

  '/tools/subscription-redemption-je': {
    seoTitle: 'Subscription & Redemption JE Generator (Unit Pricing)',
    seoDescription: 'Price fund units at the dealing NAV, apply entry or exit fees, and generate the subscription or redemption journal entry — with the unit count and the impact on net assets attributable to unitholders.',
    keywords: 'subscription journal entry, redemption journal entry, unit pricing, dealing NAV, open-ended fund accounting, unitholders capital, NAV impact, fund administration, IAS 32 puttable',
    intro: [
      'When an investor subscribes to or redeems from an open-ended fund, units are issued or cancelled at the dealing net asset value (NAV) per unit. The cash movement, any entry or exit fee, and the change in net assets attributable to unitholders all need to be booked correctly.',
      'This generator prices the transaction at the dealing NAV, applies an entry or exit fee, and produces the subscription (units issued) or redemption (units cancelled) journal entry — together with the unit count and the impact on the unitholders\' balance.',
    ],
    how: [
      'Choose subscription or redemption and enter the fund, investor and dealing NAV per unit.',
      'Enter the subscription amount (or units redeemed) and any entry or exit fee percentage.',
      'Read the units, capital and net cash, then download the journal entry as a print-ready PDF.',
    ],
    faqs: [
      { q: 'How are fund units priced on subscription and redemption?', a: 'Units are priced at the dealing NAV per unit for the relevant dealing day. On subscription, units issued equal the net amount invested (after any entry fee) divided by the NAV per unit. On redemption, the gross amount equals units redeemed multiplied by the NAV per unit, less any exit fee.' },
      { q: 'What is the journal entry for a fund subscription?', a: 'Debit cash for the gross amount received, credit net assets attributable to unitholders for the amount applied to NAV (units issued multiplied by NAV), and credit subscription/entry fee income for any sales charge retained by the fund.' },
      { q: 'What is the journal entry for a redemption?', a: 'Debit net assets attributable to unitholders for the units cancelled multiplied by NAV, credit cash or redemptions payable for the net amount paid to the investor, and credit redemption/exit fee income for any exit charge.' },
      { q: 'Are unitholders\' interests equity or a liability?', a: 'Where a fund\'s units are puttable — redeemable at the holder\'s option — the unitholders\' interest is generally presented as a financial liability under IAS 32, unless it meets the limited puttable-instruments exception to be classified as equity. Subscriptions and redemptions then move that liability balance.' },
    ],
    related: ['/tools/bond-je-generator', '/tools/fx-revaluation-je', '/tools/irr-tvpi-dpi-calculator'],
  },
};

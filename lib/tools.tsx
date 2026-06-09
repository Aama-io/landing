import {
  IconBuildingBank, IconCertificate, IconReceipt2, IconChartHistogram,
  IconChartArrowsVertical, IconScale, IconChartPie, IconReportMoney,
  IconPercentage, IconCalendarDollar, IconArrowsSplit2, IconAward, IconFileInvoice,
  IconRocket, IconChartLine, IconReportAnalytics,
  IconCoin, IconCurrencyDollar, IconArrowsExchange,
} from '@tabler/icons-react';

export type Persona = 'founder' | 'manager' | 'admin';

export type Tool = {
  href: string;
  label: string;
  description: string;
  icon: typeof IconBuildingBank;
  group: string;
  personas: Persona[];
};

export const TOOL_GROUPS: { title: string; blurb: string; tools: Tool[] }[] = [
  {
    title: 'Singapore & VCC',
    blurb: 'Structure, license and cost out a Singapore fund.',
    tools: [
      { href: '/tools/vcc-comparator', label: 'VCC Structure Comparator', description: 'Umbrella vs standalone VCC', icon: IconBuildingBank, group: 'Singapore & VCC', personas: ['founder'] },
      { href: '/tools/mas-licensing-estimator', label: 'MAS Licensing Estimator', description: 'CMS vs RFMC vs family office', icon: IconCertificate, group: 'Singapore & VCC', personas: ['founder'] },
      { href: '/tools/vcc-cost-estimator', label: 'VCC Setup Cost Estimator', description: 'Indicative launch & running costs', icon: IconReceipt2, group: 'Singapore & VCC', personas: ['founder'] },
      { href: '/tools/ter-benchmarker', label: 'Fund Expense Ratio Benchmarker', description: 'Your TER vs strategy peers', icon: IconChartHistogram, group: 'Singapore & VCC', personas: ['founder', 'manager', 'admin'] },
    ],
  },
  {
    title: 'Waterfalls & carry',
    blurb: 'Distribution waterfalls, fees and carried interest.',
    tools: [
      { href: '/tools/waterfall', label: 'Waterfall Calculator', description: 'Model LP/GP distribution waterfalls', icon: IconChartArrowsVertical, group: 'Waterfalls & carry', personas: ['founder', 'manager'] },
      { href: '/tools/waterfall-comparator', label: 'American vs European Comparator', description: 'Deal-by-deal vs whole-fund carry', icon: IconScale, group: 'Waterfalls & carry', personas: ['founder', 'manager'] },
      { href: '/tools/fee-carry-modeler', label: 'Management Fee & Carry Modeler', description: 'GP economics over fund life', icon: IconChartPie, group: 'Waterfalls & carry', personas: ['founder', 'manager', 'admin'] },
      { href: '/tools/carried-interest-tax', label: 'Carried Interest Tax Estimator', description: 'Carry tax: SG vs US vs UK', icon: IconReportMoney, group: 'Waterfalls & carry', personas: ['founder', 'manager'] },
    ],
  },
  {
    title: 'Performance & operations',
    blurb: 'Returns, capital calls and LP-facing documents.',
    tools: [
      { href: '/tools/irr-tvpi-dpi-calculator', label: 'IRR · TVPI · DPI · RVPI Calculator', description: 'Money-weighted returns & multiples', icon: IconPercentage, group: 'Performance & operations', personas: ['manager', 'admin'] },
      { href: '/tools/capital-call-schedule', label: 'Capital Call Schedule Builder', description: 'Drawdowns vs committed capital', icon: IconCalendarDollar, group: 'Performance & operations', personas: ['manager', 'admin'] },
      { href: '/tools/co-investment-modeler', label: 'Co-Investment Return Modeler', description: 'Fund vs fee-light co-invest', icon: IconArrowsSplit2, group: 'Performance & operations', personas: ['manager'] },
      { href: '/tools/vintage-benchmarker', label: 'Fund Vintage Benchmarker', description: 'Quartile rank vs vintage peers', icon: IconAward, group: 'Performance & operations', personas: ['manager'] },
      { href: '/tools/drawdown-notice', label: 'Drawdown Notice Generator', description: 'Create a capital call notice PDF', icon: IconFileInvoice, group: 'Performance & operations', personas: ['manager', 'admin'] },
    ],
  },
  {
    title: 'Fund accounting',
    blurb: 'IFRS journal entries for month-end and audit.',
    tools: [
      { href: '/tools/bond-je-generator', label: 'Bond Accounting JE Generator', description: 'IFRS 9 amortised cost entries', icon: IconCoin, group: 'Fund accounting', personas: ['admin'] },
      { href: '/tools/fx-revaluation-je', label: 'FX Revaluation JE Generator', description: 'IAS 21 closing-rate entries', icon: IconArrowsExchange, group: 'Fund accounting', personas: ['admin'] },
      { href: '/tools/subscription-redemption-je', label: 'Subscription / Redemption JE', description: 'Unit pricing & NAV impact entries', icon: IconCurrencyDollar, group: 'Fund accounting', personas: ['admin'] },
    ],
  },
];

export const ALL_TOOLS: Tool[] = TOOL_GROUPS.flatMap((g) => g.tools);

// Persona-gated entry points. Each persona owns a dedicated route and surfaces
// the subset of tools tagged for that role (a tool may serve several roles).
export type PersonaMeta = {
  id: Persona;
  href: string;
  label: string;
  tagline: string;
  blurb: string;
  icon: typeof IconBuildingBank;
};

export const PERSONAS: PersonaMeta[] = [
  {
    id: 'founder',
    href: '/tools/founder',
    label: 'Fund Founder / GP',
    tagline: 'Pre-launch & structuring',
    blurb: 'Structure, license and cost out your fund — and model GP economics before you finalise the LPA.',
    icon: IconRocket,
  },
  {
    id: 'manager',
    href: '/tools/manager',
    label: 'Fund Manager',
    tagline: 'Performance & compliance',
    blurb: 'Run the fund — returns, capital calls, carried interest and the numbers your LPs expect.',
    icon: IconChartLine,
  },
  {
    id: 'admin',
    href: '/tools/admin',
    label: 'Fund Administrator',
    tagline: 'Accounting & operations',
    blurb: 'Fee accruals, expense ratios, capital-call ops and LP-facing documents for month-end and reporting.',
    icon: IconReportAnalytics,
  },
];

export const personaMeta = (id: Persona): PersonaMeta =>
  PERSONAS.find((p) => p.id === id)!;

export const toolsForPersona = (id: Persona): Tool[] =>
  ALL_TOOLS.filter((t) => t.personas.includes(id));

// Topic groups for a persona, with empty groups dropped, so the persona page
// keeps the same "Singapore & VCC / Waterfalls / Performance" structure.
export const toolGroupsForPersona = (id: Persona) =>
  TOOL_GROUPS
    .map((g) => ({ ...g, tools: g.tools.filter((t) => t.personas.includes(id)) }))
    .filter((g) => g.tools.length > 0);

// A curated, cross-category shortlist shown in the header dropdown. The full
// set lives on the /tools hub. Edit these hrefs to change what's featured.
const FEATURED_HREFS = new Set<string>([
  '/tools/waterfall',
  '/tools/waterfall-comparator',
  '/tools/vcc-comparator',
  '/tools/mas-licensing-estimator',
  '/tools/irr-tvpi-dpi-calculator',
  '/tools/capital-call-schedule',
]);

export const FEATURED_TOOLS: Tool[] = ALL_TOOLS.filter((t) => FEATURED_HREFS.has(t.href));

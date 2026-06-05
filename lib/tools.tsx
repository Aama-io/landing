import {
  IconBuildingBank, IconCertificate, IconReceipt2, IconChartHistogram,
  IconChartArrowsVertical, IconScale, IconChartPie, IconReportMoney,
  IconPercentage, IconCalendarDollar, IconArrowsSplit2, IconAward, IconFileInvoice,
} from '@tabler/icons-react';

export type Tool = {
  href: string;
  label: string;
  description: string;
  icon: typeof IconBuildingBank;
  group: string;
};

export const TOOL_GROUPS: { title: string; blurb: string; tools: Tool[] }[] = [
  {
    title: 'Singapore & VCC',
    blurb: 'Structure, license and cost out a Singapore fund.',
    tools: [
      { href: '/tools/vcc-comparator', label: 'VCC Structure Comparator', description: 'Umbrella vs standalone VCC', icon: IconBuildingBank, group: 'Singapore & VCC' },
      { href: '/tools/mas-licensing-estimator', label: 'MAS Licensing Estimator', description: 'CMS vs RFMC vs family office', icon: IconCertificate, group: 'Singapore & VCC' },
      { href: '/tools/vcc-cost-estimator', label: 'VCC Setup Cost Estimator', description: 'Indicative launch & running costs', icon: IconReceipt2, group: 'Singapore & VCC' },
      { href: '/tools/ter-benchmarker', label: 'Fund Expense Ratio Benchmarker', description: 'Your TER vs strategy peers', icon: IconChartHistogram, group: 'Singapore & VCC' },
    ],
  },
  {
    title: 'Waterfalls & carry',
    blurb: 'Distribution waterfalls, fees and carried interest.',
    tools: [
      { href: '/tools/waterfall', label: 'Waterfall Calculator', description: 'Model LP/GP distribution waterfalls', icon: IconChartArrowsVertical, group: 'Waterfalls & carry' },
      { href: '/tools/waterfall-comparator', label: 'American vs European Comparator', description: 'Deal-by-deal vs whole-fund carry', icon: IconScale, group: 'Waterfalls & carry' },
      { href: '/tools/fee-carry-modeler', label: 'Management Fee & Carry Modeler', description: 'GP economics over fund life', icon: IconChartPie, group: 'Waterfalls & carry' },
      { href: '/tools/carried-interest-tax', label: 'Carried Interest Tax Estimator', description: 'Carry tax: SG vs US vs UK', icon: IconReportMoney, group: 'Waterfalls & carry' },
    ],
  },
  {
    title: 'Performance & operations',
    blurb: 'Returns, capital calls and LP-facing documents.',
    tools: [
      { href: '/tools/irr-tvpi-dpi-calculator', label: 'IRR · TVPI · DPI · RVPI Calculator', description: 'Money-weighted returns & multiples', icon: IconPercentage, group: 'Performance & operations' },
      { href: '/tools/capital-call-schedule', label: 'Capital Call Schedule Builder', description: 'Drawdowns vs committed capital', icon: IconCalendarDollar, group: 'Performance & operations' },
      { href: '/tools/co-investment-modeler', label: 'Co-Investment Return Modeler', description: 'Fund vs fee-light co-invest', icon: IconArrowsSplit2, group: 'Performance & operations' },
      { href: '/tools/vintage-benchmarker', label: 'Fund Vintage Benchmarker', description: 'Quartile rank vs vintage peers', icon: IconAward, group: 'Performance & operations' },
      { href: '/tools/drawdown-notice', label: 'Drawdown Notice Generator', description: 'Create a capital call notice PDF', icon: IconFileInvoice, group: 'Performance & operations' },
    ],
  },
];

export const ALL_TOOLS: Tool[] = TOOL_GROUPS.flatMap((g) => g.tools);

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

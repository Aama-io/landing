import {
  IconChartBar, IconBriefcase, IconUsersGroup, IconReportMoney, IconBuildingBank,
} from '@tabler/icons-react';
import type { RelatedLink } from '@/components/ProductDetail/ProductDetail';

// Solutions are framed by WHO you are (the audience / fund type), as opposed to
// Products, which are the platforms you license. Each solution shows the mix of
// products that fits. Slugs match the /api/products dataset (except spv, which
// has a bespoke page).
export type SolutionNav = RelatedLink & { slug: string; bespoke?: boolean };

export const SOLUTIONS: SolutionNav[] = [
  { slug: 'fund-administrators', href: '/solutions/fund-administrators', label: 'Fund Administrators & CSPs', blurb: 'One white-label ledger for every client fund and VCC sub-fund you service.', icon: IconBuildingBank },
  { slug: 'vc-pe-firms', href: '/solutions/vc-pe-firms', label: 'VC / PE Firms', blurb: 'Capital calls, distributions, carry and LP communications in one place.', icon: IconChartBar },
  { slug: 'private-credit', href: '/solutions/private-credit', label: 'Private Credit', blurb: 'Direct-lending and credit funds — amortised-cost accounting, interest accruals and ECL, done right.', icon: IconReportMoney },
  { slug: 'family-offices', href: '/solutions/family-offices', label: 'Family Offices', blurb: 'Consolidated multi-entity, multi-asset administration and reporting.', icon: IconBriefcase },
  { slug: 'spv-syndicates', href: '/solutions/spv-syndicates', label: 'SPVs & Syndicates', blurb: 'Single- and multi-asset vehicles — onboarding, carry, distributions and accounting.', icon: IconUsersGroup, bespoke: true },
];

// Slugs rendered by the dynamic /solutions/[slug] template (spv has its own page).
export const DYNAMIC_SOLUTION_SLUGS = SOLUTIONS.filter((s) => !s.bespoke).map((s) => s.slug);

export const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

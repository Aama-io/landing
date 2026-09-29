// Shared indicative cost data for single-deal SPV jurisdictions, used by both
// the SPV Cost Estimator and the SPV Admin Cost Calculator so the two tools
// never quote conflicting numbers for the same jurisdiction.

export type Range = [number, number];

export type SpvJurisdictionKey = 'singapore' | 'cayman' | 'bvi' | 'delaware';

export type SpvJurisdictionData = {
  label: string;
  short: string;
  incorpFee: Range;        // one-time incorporation / registered agent filing fee
  legalBase: Range;        // one-time base legal drafting cost (before complexity multiplier)
  bankSupportNew: Range;   // one-time bank account opening support, new relationship
  bankSupportExisting: Range; // one-time bank account opening support, existing relationship
  directorLabel: string;
  directorAnnual: Range;   // annual nominee / independent director fee (0,0 if not applicable)
  agentAnnual: Range;      // annual registered office / agent / corporate secretary
  filingAnnual: Range;     // annual return / economic substance / franchise tax / tax return prep
  auditAnnual: Range;
  taxNote: string;
};

export const SPV_JURISDICTIONS: Record<SpvJurisdictionKey, SpvJurisdictionData> = {
  singapore: {
    label: 'Singapore (Pte Ltd)',
    short: 'Singapore',
    incorpFee: [600, 1200],
    legalBase: [3000, 7000],
    bankSupportNew: [1000, 2000],
    bankSupportExisting: [300, 800],
    directorLabel: 'Local nominee director',
    directorAnnual: [2000, 4500],
    agentAnnual: [600, 1400],
    filingAnnual: [850, 2100],
    auditAnnual: [2500, 6000],
    taxNote: 'Singapore taxes the SPV at 17% corporate tax, though a single-asset holding SPV often books little taxable profit at the entity level.',
  },
  cayman: {
    label: 'Cayman Islands (Exempted Co.)',
    short: 'Cayman',
    incorpFee: [2000, 3500],
    legalBase: [3500, 8000],
    bankSupportNew: [1500, 3000],
    bankSupportExisting: [500, 1200],
    directorLabel: 'Independent director',
    directorAnnual: [3000, 7000],
    agentAnnual: [2200, 3800],
    filingAnnual: [500, 1200],
    auditAnnual: [4000, 9000],
    taxNote: 'Cayman charges no corporate income, capital gains or withholding tax on the SPV — the cost sits entirely in formation and administration fees, not tax.',
  },
  bvi: {
    label: 'BVI (Business Company)',
    short: 'BVI',
    incorpFee: [1500, 2800],
    legalBase: [3000, 7000],
    bankSupportNew: [1500, 3000],
    bankSupportExisting: [500, 1200],
    directorLabel: 'Independent director',
    directorAnnual: [2500, 6000],
    agentAnnual: [1800, 3200],
    filingAnnual: [300, 800],
    auditAnnual: [3500, 8000],
    taxNote: 'BVI charges no corporate income or capital gains tax and files less than Cayman, but offshore banking relationships can take just as long to establish.',
  },
  delaware: {
    label: 'Delaware (LLC)',
    short: 'Delaware',
    incorpFee: [500, 1200],
    legalBase: [2500, 6000],
    bankSupportNew: [500, 1500],
    bankSupportExisting: [0, 500],
    directorLabel: 'Registered agent (statutory)',
    directorAnnual: [150, 400],
    agentAnnual: [150, 400],
    filingAnnual: [1800, 4300],
    auditAnnual: [3000, 7000],
    taxNote: 'A Delaware LLC is a pass-through by default — the entity pays no federal income tax, but non-US owners still trigger annual US information-return filings (e.g. Form 5472).',
  },
};

export const COMPLEXITY_MULTIPLIER: Record<'simple' | 'moderate' | 'complex', number> = {
  simple: 1,
  moderate: 1.3,
  complex: 1.7,
};

export const scaleRange = (r: Range, m: number): Range => [r[0] * m, r[1] * m];
export const sumRanges = (rs: Range[]): Range => rs.reduce<Range>((a, r) => [a[0] + r[0], a[1] + r[1]], [0, 0]);

export const fmtUsd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;
export const fmtUsdK = (v: number) => {
  const m = v / 1e6;
  if (m >= 1) {return `$${m.toFixed(m >= 10 ? 0 : 1)}M`;}
  return `$${Math.round(v / 1000)}k`;
};
export const fmtRangeK = (r: Range) => `${fmtUsdK(r[0])} – ${fmtUsdK(r[1])}`;

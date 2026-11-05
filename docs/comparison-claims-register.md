# Comparison pages: claim verification register

Last checked: 2026-11-01. Re-verify quarterly and update `REVIEWED` in `lib/compare.ts`.
Rule: nothing about a competitor goes live unless it is traceable to a source below. If a vendor page changes, change the copy.

Status key: **V** = read on the vendor's own page on the date above. **S** = from search-result summaries of vendor/third-party pages, not fetched in full. **U** = unverified: the copy is deliberately generic and tells the reader to confirm with the vendor.

| Vendor | Status | What we rely on | Source | Open points |
|---|---|---|---|---|
| Carta | S | Fund administration offered; supports funds reporting under US GAAP or IFRS; Asia team in Singapore | carta.com/blog/international-fund-administration (returned 403 when fetched) | Re-check by hand in a browser. Module list (portfolio, investor management, portal) is from search results |
| Juniper Square | V | Investor CRM, investor portal, investor onboarding, AML/KYC, fund administration | junipersquare.com homepage | K-1 and white-label are **not** claimed (not on the page). "Managed service" wording removed |
| Allvue | V | Modules listed: fund accounting, investment accounting, corporate accounting, carry, investor portal, fundraising, portfolio monitoring, fund finance | allvuesystems.com/solutions/investment-accounting | Fund accounting product page returned 404, so "multi-currency GL/cash management" was removed |
| eFront | V | End-to-end alternative investment fund management software for GPs; operations to investor relationship management; part of BlackRock, alongside Aladdin | efront.com/products/efront-invest-for-gp | "Back/middle/front office" wording removed (not used by eFront) |
| Investran | U | None. Copy is generic by design | none found | **Recommend counsel review or dropping the page** |
| Fundwave | V | Serves VC, PE, fund of funds, corporate VC, family office, SPVs; pipeline and portfolio management; LP reporting; capital notices; carry and fee allocation; "complete SPV administration solution" | fundwave.com homepage | KYC not mentioned on the page; we say "confirm" |
| FundCount | V | One investment record to a multi-currency GL; capital accounts, waterfalls, allocations; custodian/broker/price feed consolidation; branded investor portal | fundcount.com homepage | |
| Sydecar | V | End-to-end SPV formation; back-office administration; banking; KYC/KYB/AML; Form D and Blue Sky filings; K-1s and tax filings; syndicate tools | sydecar.io/founder-syndicates | Sydecar states SPV fees "start at $4,500"; we still do not quote competitor prices. Fund+ claim removed (not verified) |
| Auptimate | V | SPVs (syndicate, multi-asset, founder, credit); Nova fund-in-a-box; fund administration; legal documents to accounting and reporting; Singapore, Cayman, Delaware | auptimate.com homepage | Pricing not shown on page. Earlier "Comet" and pricing claims removed |
| AngelList | V | SPV administration (formation, filings, tax documents); Rolling Funds; fees stated on its page | angellist.com/funds/syndicates | AngelList does publish SPV fees, so we do **not** claim to be unique on published pricing |

## Aama.io claims (checked against this repo)
Supported by existing site copy: NAV periods, European/American waterfalls, 12+ reports, IFRS 9 / SFRS(I) 9, KYC/AML and accreditation checks, white-label portal, audit trail, custodian reconciliation, VCC sub-fund segregation (documented under Private Credit), SPV prices, 60-day pay-when-you-collect backstop, "new fund operational within 2 weeks".

Needs owner confirmation before launch:
- That Aama.io itself forms SPVs (jurisdictions) rather than only through partners.
- "Umbrella and sub-fund structures" for fund types other than credit.
- The migration steps (labelled indicative, no timeline promised for existing funds).
- "More than 15 funds migrated from legacy systems": confirm the count and that it can be stated publicly (no client names are used).
- Free migration: scope, limits (fund size, number of vehicles) and any end date. The pages say the offer may change.
- Launch Free terms (the pages say offers may change or end without notice).

## Do not add without a source
Competitor pricing; "cheaper than"/"faster than" claims; competitor weaknesses; customer counts; logos or screenshots of other products.

---
target: pricing page (pages/pricing.tsx)
total_score: 17
max_score: 36
na_heuristics: 9
p0_count: 3
p1_count: 2
timestamp: 2026-09-29T03-51-49Z
slug: pages-pricing-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Tabs/accordion active-state feedback is clear |
| 2 | Match System / Real World | 2/4 | Templated Boutique/Growth/Pro copy repeated near-verbatim across unrelated fund types |
| 3 | User Control and Freedom | 2/4 | No side-by-side comparison across tabs/tiers, no deep-linkable state |
| 4 | Consistency and Standards | 1/4 | Raw `--mantine-color-*` tokens throughout, breaking from the site's `--surface`/`--text-strong`/`--border` system used one component above (Hero) and below (FAQ) |
| 5 | Error Prevention | 3/4 | Tooltip prevents setup-fee ambiguity |
| 6 | Recognition Rather Than Recall | 1/4 | 7 tabs × up to 12 checkmarks, no persistent comparison, forces memory across tab switches |
| 7 | Flexibility and Efficiency | 1/4 | No compare mode, no deep link per tab/tier |
| 8 | Aesthetic and Minimalist Design | 1/4 | Badge + tooltip + scale-transform + unblurred decorative blobs stack ornament vs. the flatter house style |
| 9 | Error Recovery | n/a | No error-producing input on this static surface |
| 10 | Help and Documentation | 3/4 | 13-item FAQ + tooltips + contact block genuinely help |
| **Total** | | **17/36 (9 scored)** | **Poor-to-acceptable band** — driven by consistency, recall, and minimalism failures |

## Design Specificity Verdict

**LLM assessment**: This reads as a Mantine stock pricing template with fund-admin vocabulary poured into it, not a page authored for aama.io. The "Most Popular" ribbon, `scale(1.05)` zoomed highlighted card, and the pricing-card anatomy (big number → "per month" → setup-fee stat) are Mantine's canonical pricing-template grammar, reused verbatim. Worse: feature-list content for Hedge Funds, PE/VC, Private Credit, Family Offices and Mutual Funds is near-identical boilerplate copy-pasted across verticals. Private Equity and Private Credit's Boutique/Growth/Pro tiers are **byte-identical on price and setup fee**, differing only in 2-3 swapped perk lines. Only the SPV/Syndicate tab and the (recently rewritten) comparison table show real product-specific thinking.

**Deterministic scan**: `detect.mjs` returned zero findings — but this is a false negative, not a clean bill of health. The detector's rule set doesn't cover heading hierarchy, unused CSS modules, or missing focus states, all of which the manual scan confirmed:
- **Three `<h1>` elements on one page** (PricingHero, PricingSection's "How aama.io compares", PricingFAQ) — none specify an `order` prop, so all three default to `order=1`. Only one should exist.
- **`PricingHero.module.css` is a fully orphaned file** (183 lines, never imported — `PricingHero.tsx` actually pulls its styles from the shared `components/ui/tool.module.css`).
- **Dead code**: `classes.fundTypeTabs` (PricingTables.tsx:575) has no matching CSS definition; `.comingSoonBanner` is defined in CSS but never referenced.
- Zero gradients survive in this scope (confirmed clean, consistent with the rest of the site's gradient removal).

**Visual overlays**: Not available — no browser automation tool in this session, so this is a source-level critique, not a rendered-pixel one.

## Overall Impression

The page literally alternates design eras section by section: Hero and FAQ use the site's current custom-token system; `PricingTables` and `PricingSection` are still on raw Mantine tokens (`--mantine-color-gray-0`, literal `white`) predating that system — `PricingFAQ.module.css` even has a comment noting it's "aligned to the brand design system," implicit acknowledgment the other two aren't. Layered on top: a textbook cognitive-overload structure (7 fund-type tabs × up to 3 tiers × 9-12 flat checkmarks each) and copy-pasted vertical-specific content that undercuts the "we understand your fund type" positioning the tabs are supposed to deliver.

## What's Working

- **`PricingFAQ`'s sticky two-column layout** — token-aligned, restrained, and the sticky rail with a "still have questions" contact block is a real UX decision, not template filler.
- **The comparison table's hedged, credible copy** ("a category, not a specific product," "confirm current pricing directly") — rare instance of the page thinking about trust rather than just conversion, consistent with this session's earlier legal fix.
- **Hedge/Mutual Fund tab de-prioritization** — a deliberate, commented information-hierarchy decision, not blind uniform treatment.

## Priority Issues

**[P0] Three `<h1>` elements on one page.** `PricingHero.tsx:17`, `PricingSection.tsx:134`, and `PricingFAQ.tsx:67` all render bare `<Title>` with no `order` prop, each defaulting to `order=1`. Fix: keep Hero's as the page's one `<h1>`; add `order={2}` to the other two.
Suggested command: direct fix (mechanical, no design judgment needed).

**[P0] Token/era mismatch on the highest-stakes page on the site.** `PricingTables.module.css` and `PricingSection.module.css` use `--mantine-color-*` tokens and literal `white` throughout, while the Hero and FAQ sandwiching them use the redesigned `--surface`/`--text-strong`/`--border`/`--brand-soft` system. Fix: token-for-token replacement (`--mantine-color-gray-0`→`--surface-muted`, `--mantine-color-dark-8`→`--text-strong`, `--mantine-color-gray-6`→`--text-muted`, literal `white`→`--surface`, `--mantine-shadow-*` in place of hardcoded `rgba(0,0,0,...)` shadows).
Suggested command: direct fix (mechanical).

**[P0] Cognitive overload at the fund-type × tier × feature axis.** 7 tabs (already past the 5-7 "pushing it" zone) × up to 3 tiers × 9-12 flat, ungrouped checkmarks, with zero cross-reference to the comparison table restating overlapping claims below. Fix: cut each card's list to 4-5 *differentiating* features with a "See full comparison ↓" link into the existing table, rather than dual-maintaining ~10 items per card in two different visual grammars.
Suggested command: needs a scope decision — how aggressively to trim, and whether the comparison table becomes the single source of full feature detail.

**[P1] Copy-pasted feature lists undermine institutional credibility.** PE/VC and Private Credit's Pro tiers are priced identically (`USD 1,350`/`2,750`/`5,000` and matching setup fees across all three shared tiers) and share ~80% of perk copy verbatim. A skeptical buyer comparing verticals side-by-side will notice and conclude the verticals aren't actually differentiated products. Fix: rewrite each vertical's Growth/Pro perks with real vertical-specific language, the way `spvPlans` already does.
Suggested command: needs domain input — what's actually different about running Private Credit vs. PE/VC on the platform.

**[P1] Generic Mantine pricing-template chrome.** The floating "Most Popular" ribbon and `scale(1.05)` zoom on the highlighted card are stock SaaS-template signifiers, generic against an enterprise fund-infrastructure buyer. Fix: drop the scale transform and ribbon; mark the recommended tier with a static border-color and an inline label instead.
Suggested command: direct fix (matches the quieter treatment already used elsewhere this session).

**[P2] Banned kicker/eyebrow, doubled.** `PricingTables.tsx:567` ("SaaS Subscription Model") sits above "Choose the plan that fits your fund" — redundant with `PricingHero`'s own "Pricing" pill already shown seconds earlier in the same page load. Fix: delete the kicker line.
Suggested command: direct fix.

**[P2] Accessibility gaps.** No `:focus`/`:focus-visible` styling anywhere in the pricing CSS (or site-wide, per the scan); "not included" feature rows use `opacity: 0.6` on already-muted gray text (contrast risk); the setup-fee explanation is hover-tooltip-only with no always-visible equivalent for touch/keyboard/screen-reader users.
Suggested command: direct fix for focus states and contrast; tooltip needs a visible-text fallback.

**[P3] Dead code.** Fully orphaned `PricingHero.module.css` (183 lines), dead `classes.fundTypeTabs` reference, dead `.comingSoonBanner` CSS block, unblurred decorative blob circles hand-rolling what the shared `.glow` utility already does.
Suggested command: direct fix (cleanup).

## Persona Red Flags

**Jordan (confused first-timer)**: Lands on 7 equal-weight tabs with no framing sentence distinguishing "fund administrator" from "fund manager running a PE/VC fund" — the exact buyer-type/fund-type conflation this project's own positioning notes warn against. Must manually scan 9-12 checkmarks per card to spot the 2-3 that actually differ between Boutique and Growth, since most rows just repeat "All Boutique features."

**Riley (skeptical buyer doing diligence)**: Will notice, tab by tab, that Pro-tier feature lists are copy-pasted across Hedge/PE/Credit/Family/Mutual and conclude the vendor doesn't have genuinely differentiated products per fund type — damaging for someone comparing verticals side-by-side. Will also notice the "Traditional enterprise platforms" column hedges every row ("often," "typically") immediately next to aama.io's specific numbers — technically accurate (no fabricated figures, this was fixed earlier this session) but reads as a comparison constructed to win every row.

**Sam (accessibility-dependent)**: "Not included" rows use `opacity: 0.6` on top of already-muted gray text, likely under the 4.5:1 contrast floor. Setup-fee context is hover-tooltip-only — no keyboard/touch/screen-reader equivalent.

## Minor Observations

- `IconInfoCircle` renders at two different sizes (16px in PricingSection, 12px in PricingTables) for the same "info tooltip trigger" semantic role.
- `Card withBorder={!plan.highlighted}` splits border source-of-truth between a Mantine prop and the CSS module's own border — fragile.
- Tooltip trigger icon is 12px — a very small tap target on mobile.
- `PricingFAQ.module.css` still carries defensive hex fallbacks (`var(--surface, #fff)`) now that the token system is confirmed stable elsewhere.
- `PricingSection`'s bordered, striped, scroll-area table is visually much heavier/more "spreadsheet" than the flat, borderless aesthetic used in the redesigned Audiences section — a weight mismatch independent of the token issue.

## Questions to Consider

1. What if the 7 fund-type tabs collapsed into 3 buyer-intent paths ("I run a fund," "I administer funds," "I lead SPV deals") with fund type as a secondary control inside each?
2. What if the comparison table were folded into each plan card as a "see everything included" expansion instead of existing as a separately-styled section restating the same data in a different grammar?
3. Given the site already ships interactive calculators elsewhere, what if pricing were a live AUM/fund-count slider producing a number, instead of 21 static pre-built tiers?

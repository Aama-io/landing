---
target: homepage (pages/index.tsx)
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 2
timestamp: 2026-09-27T01-33-46Z
slug: pages-index-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | No loading/empty states defined anywhere; live NAV counter and tab/accordion states work |
| 2 | Match System / Real World | 4/4 | Ledger rows, MAS/IFRS 9/VCC/13O-13U vocabulary matches a fund-admin buyer's mental model precisely |
| 3 | User Control and Freedom | 3/4 | No traps, free tab/accordion nav, but nothing beyond baseline |
| 4 | Consistency and Standards | 3/4 | ProblemSolution and PainPoints solve the identical "pain → fix" problem with two different visual idioms (table vs. cards) |
| 5 | Error Prevention | 2/4 | No `:focus-visible` styling found for custom interactive elements (`.tab`, `.cell`, `.logo`, `.seeAll`) |
| 6 | Recognition Rather Than Recall | 3/4 | Icons always labeled; ProductShowcase hides inactive tabs' descriptions (mild recall cost) |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode landing page — no repeat-user shortcuts to evaluate |
| 8 | Aesthetic and Minimalist Design | 2/4 | ProblemSolution's table cells are dense prose; ProblemSolution/PainPoints redundancy inflates page length |
| 9 | Error Recovery | 2/4 | No fallible actions present, but no designed edge-case handling either |
| 10 | Help and Documentation | 3/4 | HomeFAQ well-scoped, but pricing figures a motivated buyer wants are buried in a collapsed accordion item |
| **Total** | | **25/36** | **Acceptable (69%)** — solid foundation, real gaps in consistency and minimalism |

## Design Specificity Verdict

**LLM assessment**: Roughly half the page is authored for fund administration, half is a generic B2B SaaS template with domain copy dropped in. Hero's "Meridian Growth Fund II" ledger mock (NAV counter, capital-call/KYC float cards, audit-trail footnote) and the Audiences matrix (13O/13U, IFRS 9 ECL staging) couldn't be swapped into an unrelated SaaS product — that's real specificity. ProductShowcase's fake-browser-chrome frame, CTA's dark-gradient band, PainPoints' icon-card grid, and HomeFAQ's plain accordion are structures any B2B SaaS template ships with; only the copy inside is domain-specific. **Verdict: authored in the highest-leverage places (Hero, Audiences), templated everywhere else.**

**Deterministic scan**: `detect.mjs` returned 2 findings (exit 2, both real, no false positives):
1. `layout-transition` — `ProductShowcase.module.css:87` animates `max-height`/`margin` on `.tabDesc` (layout-affecting properties; low real-world severity given the small element).
2. `codex-grid-background` — `CTA.module.css:40`, a decorative two-axis grid-line gradient. The manual scan corroborates this: the same hairline-grid pattern is hand-rolled independently in **3 places** (Hero's `.ledgerLines`, CTA's `.grid`, plus an *unused* shared `.bgGrid` utility already sitting in `styles/global.css:134-139`) instead of one component composing the shared class.

The manual static scan also confirmed **no duplicate-`<h1>` bug remains** — Hero is the page's sole bare `<Title>` (h1), every other section routes through `SectionHeading`'s `order={2}`, and CTA's `order={2}` (the fix applied earlier this session) is in place. It surfaced a related, smaller gap instead: CTA is the only homepage section that duplicates `SectionHeading`'s pill/title/description layout inline rather than reusing the shared component.

**Visual overlays**: Not available this session — no browser automation tool is exposed, so live-page injection/overlays could not run. This is a CLI + static-source critique only, not a rendered-pixel one.

## Overall Impression

The page's foundation is solid — clean 8pt-ish rhythm, one consistent H1→H2 hierarchy, a genuinely bespoke hero visual — but it reads as two homepages stapled together: a specific one (Hero, Audiences, TrustBar) and a generic one (ProductShowcase, ProblemSolution, PainPoints, CTA) that happens to share a color system. The single biggest opportunity is collapsing the redundant "pain → fix" messaging (ProblemSolution + PainPoints say the same thing twice, in two different visual languages) and fixing the emotional arc so it builds toward the CTA instead of re-opening old objections right after the product tour.

## What's Working

- **Hero's ledger-statement mock** — a bespoke fund-statement visual (NAV counter, ledger rows, "every recalculation is logged to an audit trail," live-pulse fund tag) instead of a generic dashboard screenshot. The single most domain-authored element on the page, and it lands emotionally right for a finance buyer.
- **Audiences matrix** — one bordered grid with internal dividers reads more premium/editorial than four separate shadow-cards, and the copy ("Built for 13O/13U," "Amortised cost & ECL staging") demonstrates real fund-structuring fluency.
- **ProductShowcase's progressive disclosure** — showing description/chips only on the active tab is a genuinely good cognitive-load pattern, independent of the tab-count issue below.

## Priority Issues

**[P0] ProblemSolution comparison table (the one you flagged) reads as a dense data table, not a scannable comparison, and loses its header on mobile.**
Why it matters: 6 rows of full-sentence prose (90-110 characters/cell) defeats the point of a before/after format. The `.compareHead` "The old way / On aama.io" labels are hidden entirely below 48em, so mobile visitors — likely the majority of first-touch traffic — see unlabeled stacked pairs distinguished only by a small X/check icon.
Fix: Cut each cell to a 3-6 word phrase ("Spreadsheets + manual reconciliation" → "One ledger, auto-reconciled"), keep a small inline label on every row (not only the header) so meaning survives on mobile, and cap visible rows at 3-4 with a "show all" expand.
Suggested command: `/impeccable layout` (or `/impeccable distill` if you want to cut rows, not just restyle them).

**[P1] Social proof doesn't match the stated ICP.**
Why it matters: The only proof shown (Kumari/Prabhu/Sanima/Siddhartha/LS "Capital," and a case study about mutual funds, DRIPs and call-centre teams) reads as retail mutual-fund/brokerage administration — not the PE/VC, private credit, family-office and SPV audience the rest of the page targets. This is the page's designated trust-building moment for a skeptical institutional buyer, and instead it invites "do they actually understand PE/VC fund administration?"
Fix: Bridge explicitly ("the same NAV/reconciliation engine now runs PE/VC capital calls and waterfalls for aama.io") or swap in PE/VC/SPV-specific proof, even anonymized.
Suggested command: `/impeccable clarify` (copy bridge) — needs real client input either way, not something to fabricate.

**[P1] ProblemSolution and PainPoints are redundant.**
Why it matters: Both perform the identical "pain → aama.io fixes it" move, just reformatted (table vs. 6-card grid). This inflates scroll length without adding information and dilutes both sections' impact — a chunking/aesthetic-minimalism failure as well as a page-flow one.
Fix: Merge into one section, or repurpose PainPoints as forward-looking "why now"/ROI content instead of restating the same pains.
Suggested command: `/impeccable distill`.

**[P2] CTA's closing bullets undercut the institutional tone at the highest-stakes moment.**
Why it matters: "No setup fees, Monthly subscription, Free investor portal, Scale as you grow" sits directly under IFRS 9/SFRS(I) 9 and VCC sub-fund copy. Per the peak-end rule, this is the last impression before conversion, and self-serve-pricing language is in tension with the MAS-aligned/VAPT-certified trust built earlier for an institutional buyer.
Fix: Swap for institutional reassurance markers ("Dedicated onboarding," "Data migration support," "Singapore-based support") and leave pricing language to `/pricing`.
Suggested command: `/impeccable clarify`.

**[P3] ProductShowcase's 6-tab decision point exceeds the ≤4 working-memory guideline and uses a generic browser-chrome frame.**
Why it matters: 6 simultaneous choices raises decision cost at the section's first impression; the fake-browser-window frame is used by countless unrelated SaaS products and doesn't reinforce specificity the way Hero's ledger card does.
Fix: Group into the two categories the heading already claims ("Fund Accounting" vs. "Investor Portal," 3 tabs each); consider a device-less panel consistent with Hero's statement-card aesthetic instead of the browser-chrome frame.
Suggested command: `/impeccable layout`.

## Persona Red Flags

**Jordan (confused first-timer)**: ProblemSolution's mobile table loses its "old way"/"aama.io" header entirely, forcing Jordan to infer meaning from a tiny X vs. check icon while skimming. ProductShowcase's flat 6-tab list doesn't visually reflect its own heading's claim of "two products, one platform" — Jordan can't tell these are two bundled products vs. six separate tools. HomeFAQ buries "Who is aama.io built for?" at Q5, after Singapore/SPV questions a first-timer hasn't thought to ask yet.

**Riley (deliberate stress tester)**: "0 Data-loss incidents" and "566% investor growth" carry no methodology, date range, or verifiable attribution — Riley will ask "over what period, for which client, verified how." The ICP mismatch between stated audience (PE/VC/private credit/family offices) and the case study subject (mutual-fund brokerage, "call-centre teams," "DRIPs") is exactly the inconsistency a skeptical buyer probes for. TrustBar's unqualified "VAPT-certified security" pill and ProblemSolution's "compliance evidence generated continuously" claim have no mechanism or citation — Riley will flag both as unverifiable marketing language.

**Casey (distracted mobile user)**: Hero's floating cards are stripped below 40em, so Casey gets the flattest version of the page's strongest specificity signal. ProblemSolution's comparison table loses its column labels on mobile (see P0), forcing a stop-and-decode moment mid-scan. PainPoints' 6-card grid collapses to a single column, adding a long unbroken scroll of near-identical card shapes right after ProductShowcase and Audiences — well before Casey reaches social proof or the CTA.

## Minor Observations

- Typo: "Automated Capital calls, KYC, and  distributions" — double space (`Hero.tsx:19`).
- PainPoints' icon color (`#e8553e` on `#fff1f0`) is the only warm/red accent on the page — inconsistent with the all-blue brand system, and reads more like an "error" state than a brand choice.
- ProblemSolution's title ("From spreadsheets and email to one fund operations platform") and CTA's title ("Move your fund operation onto one platform") are near-verbatim restatements of each other.
- Pricing figures exist only inside a collapsed HomeFAQ accordion item — not referenced anywhere near the "View pricing" CTA button.
- SocialProof's case-study paragraph restates all 5 stats already shown in the stat grid directly below it.
- No `:focus-visible` styling found for `.tab`, `.cell`, `.logo`, or `.seeAll` — keyboard-focus visibility of these custom elements is unverified.
- Token/consistency gaps (from the static scan): `CTA.module.css` hardcodes `#0b1220` three times instead of using `--surface-ink` (defined in `global.css` specifically for this); Hero's green "live" indicators and PainPoints' red icon tint have no corresponding tokens; at least 4 different spacing-scale `clamp()` pairs are used for the same "space below heading" rhythm across homepage sections, including two different scales inside `ProblemSolution.module.css` itself (line 7 vs. 101); Hero and CTA each hand-roll their own glow/grid-line/mask-fade decorative blocks instead of composing the matching utilities already defined in `global.css` (`.glow`, `.bgGrid`, `.maskFade`).

## Questions to Consider

1. What if ProblemSolution and PainPoints were merged into one section — would the page lose any information, or just 600-800px of redundant scroll?
2. What if Hero's ledger-statement visual metaphor extended into ProductShowcase instead of the generic browser-chrome frame — would the page start to feel like a purpose-built ledger system instead of a SaaS template with fund-admin copy pasted in?
3. What if SocialProof led with a case study that actually matched the stated ICP — how much of the page's current trust-building would survive that swap for a skeptical PE/VC buyer?

import { Container, Accordion, Button } from '@mantine/core';
import { IconArrowRight, IconArrowsExchange, IconCalculator, IconCheck, IconChevronRight, IconLayoutDashboard, IconSitemap, IconTag, IconUserCheck } from '@tabler/icons-react';
import Link from 'next/link';
import {
  AAMA, REVIEWED, competitorBySlug,
  type AlternativesPage,
} from '@/lib/compare';
import s from './Compare.module.css';

type Crumb = { label: string; href?: string };

function Hero({ crumbs, badge, title, lede, reviewed }: { crumbs: Crumb[]; badge: string; title: string; lede: string; reviewed?: boolean }) {
  return (
    <section className={s.hero}>
      <div className={s.heroGlow} />
      <Container size="lg">
        <div className={s.heroInner}>
          <nav className={s.breadcrumb} aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                {c.href ? <Link href={c.href} className={s.crumbLink}>{c.label}</Link> : <span>{c.label}</span>}
                {i < crumbs.length - 1 && <IconChevronRight size={13} />}
              </span>
            ))}
          </nav>
          <span className={s.badge}>{badge}</span>
          <h1 className={s.title}>{title}</h1>
          <p className={s.lede}>{lede}</p>
          <div className={s.ctaRow}>
            <Button component={Link} href="/contact" size="md" rightSection={<IconArrowRight size={18} />}>Book a demo</Button>
            <Button component={Link} href="/pricing" size="md" variant="default">View pricing</Button>
          </div>
          {reviewed && (
            <p className={s.notice} role="note">
              <strong>Disclosure:</strong> this page is published by Aama.io, which competes with the vendors named on it. Information about them comes from public sources reviewed on {REVIEWED} and may be out of date. Aama.io is not affiliated with them. See the full notice at the foot of the page.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

function Head({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className={s.head}>
      <span className={s.eyebrow}>{eyebrow}</span>
      <h2 className={s.h2}>{title}</h2>
      {lead && <p className={s.lead}>{lead}</p>}
    </div>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className={s.list}>
      {items.map((t) => (
        <li key={t} className={s.listItem}><IconCheck size={16} className={s.check} /> <span>{t}</span></li>
      ))}
    </ul>
  );
}

function LinkCards({ items, even }: { items: { href: string; label: string; blurb: string }[]; even?: boolean }) {
  return (
    <div className={even ? s.gridEven : s.grid}>
      {items.map((l) => (
        <Link key={l.href} href={l.href} className={s.card}>
          <span className={s.cardTitle}>{l.label}</span>
          <span className={s.cardText}>{l.blurb}</span>
          <span className={s.cardArrow}>Read more <IconArrowRight size={13} /></span>
        </Link>
      ))}
    </div>
  );
}

function Faqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <Accordion variant="separated" radius="md" chevronPosition="right">
      {faqs.map((f) => (
        <Accordion.Item key={f.q} value={f.q}>
          <Accordion.Control><span className={s.faqQ}>{f.q}</span></Accordion.Control>
          <Accordion.Panel><p className={s.faqA}>{f.a}</p></Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

function Cta({ title, text }: { title: string; text: string }) {
  return (
    <section className={s.ctaSection}>
      <Container size="lg">
        <div className={s.ink}>
          <div className={s.inkGlow} />
          <div className={s.inkInner}>
            <h2 className={s.inkTitle}>{title}</h2>
            <p className={s.inkText}>{text}</p>
            <div className={s.ctaRow}>
              <Button component={Link} href="/contact" size="md" rightSection={<IconArrowRight size={18} />}>Book a demo</Button>
              <Button component={Link} href="/emerging-managers" size="md" variant="default">Raising a first fund? Launch Free</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


const NOT_ADVICE = 'This page is general information, not legal, tax, financial or investment advice.';

function Disclaimer({ names, sources }: { names: string[]; sources?: { label: string; url: string }[] }) {
  return (
    <section className={s.section}>
      <Container size="lg">
        <div className={s.legal} id="notice">
          <h2 className={s.legalTitle}>Important notice</h2>
          <ul>
            <li>
              <strong>No affiliation.</strong> Aama.io is not affiliated with, endorsed by, sponsored by or in any partnership with {names.join(', ')}. All product names, logos and trademarks belong to their respective owners and are used only to identify those products.
            </li>
            <li>
              <strong>Source and accuracy.</strong> Statements about other vendors are based on publicly available information, reviewed on {REVIEWED}, and are not verified by those vendors. Products, features, pricing and positioning change, and we may have misunderstood or omitted something. Check current details with each vendor before you decide.
            </li>
            <li>
              <strong>Our perspective.</strong> Aama.io is a competitor. Statements about which product is a better fit for which buyer are our general view, not a statement of fact or a guarantee of results for your business.
            </li>
            <li>
              <strong>Pricing.</strong> We do not quote other vendors’ pricing. Aama.io prices, offers (including Launch Free) and features are as of {REVIEWED}, may change or end without notice, and do not form a contract. Current terms are on our <Link href="/pricing">pricing page</Link> and in your agreement with us.
            </li>
            <li>
              <strong>Not advice.</strong> {NOT_ADVICE} Take your own professional advice before you choose a platform, change administrators or restructure a fund.
            </li>
            <li>
              <strong>Corrections.</strong> If you are a vendor named here, or you see something inaccurate, email <a href="mailto:contact@aama.io">contact@aama.io</a> and we will review and correct it promptly.
            </li>
          </ul>
          {sources && sources.length > 0 && (
            <p>
              <strong>Sources:</strong>{' '}
              {sources.map((src, i) => (
                <span key={src.url}>
                  {i > 0 && ', '}
                  <a href={src.url} target="_blank" rel="noopener noreferrer">{src.label}</a>
                </span>
              ))}
              . Third-party sources are listed for reference only and are not endorsed by us.
            </p>
          )}
          <p>Use of this site is also subject to our <Link href="/terms">Terms of Use</Link>.</p>
        </div>
      </Container>
    </section>
  );
}

const PRODUCT_LINKS = [
  { href: '/products/fund-accounting', label: 'Fund Accounting', blurb: 'Double-entry ledger, NAV, waterfalls and IFRS 9 / SFRS(I) 9 accounting.' },
  { href: '/products/fund-administration', label: 'Fund Administration & LP Portal', blurb: 'KYC onboarding, capital calls, distributions and a white-labelled portal.' },
  { href: '/products/spv-fund-management', label: 'SPV Fund Management', blurb: 'SPVs and syndicates from formation to distributions.' },
  { href: '/emerging-managers', label: 'Launch Free', blurb: 'The LP portal free through first close, for emerging managers.' },
  { href: '/pricing', label: 'Pricing', blurb: 'Published SPV pricing and what is included.' },
  { href: '/tools', label: 'Free tools', blurb: 'Calculators and templates for fund accounting and SPV work.' },
];

/* ── Alternatives guides ───────────────────────────────────────────────── */

export function AlternativesPageView({ p }: { p: AlternativesPage }) {
  const vendor = p.vendor ? competitorBySlug(p.vendor) : undefined;
  const single = Boolean(vendor || p.vendors);
  const hub = p.vendors?.map((slug) => competitorBySlug(slug)!).filter(Boolean);
  const options = p.options.map((slug) => competitorBySlug(slug)!).filter(Boolean);
  return (
    <>
      <Hero
        crumbs={[{ label: 'Home', href: '/' }, { label: p.h1 }]}
        badge="Alternatives"
        title={p.h1}
        lede={p.intro}
        reviewed
      />

      {hub ? (
        <section className={`${s.section} ${s.sectionMuted}`}>
          <Container size="lg">
            <Head
              eyebrow="Why Aama.io"
              title="Why teams choose Aama.io as an alternative"
              lead="Aama.io is built for emerging and boutique fund managers and fund administrators in Singapore and APAC. Whichever platform you are looking beyond, it may be the closer fit when:"
            />
            {hub.map((v) => (
              <div key={v.slug} id={v.slug} style={{ scrollMarginTop: 96, marginTop: 28 }}>
                <h3 className={s.groupTitle}>{v.name} alternative</h3>
                <Checks items={v.aamaFitsWhen} />
              </div>
            ))}
            <p className={s.note}>We are a competitor, so this is our view. Other platforms suit other teams well; check what matters for your fund.</p>
          </Container>
        </section>
      ) : (
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="lg">
          <Head
            eyebrow={vendor ? `Why look beyond ${vendor.name}` : 'Why Aama.io'}
            title={vendor ? `Why teams choose Aama.io as an alternative` : 'Why teams choose Aama.io'}
            lead="Aama.io is built for emerging and boutique fund managers and fund administrators in Singapore and APAC. It may be the closer fit when:"
          />
          <Checks items={vendor ? vendor.aamaFitsWhen : [
            'You want to run the books and the LP portal yourself, on one data model.',
            'You need Singapore and APAC regulation handled by default.',
            'You want a free or pay-when-you-collect start rather than a platform contract.',
          ]} />
          <p className={s.note}>We are a competitor, so this is our view. Other platforms suit other teams well; check what matters for your fund.</p>
        </Container>
      </section>
      )}

      <section className={s.section}>
        <Container size="lg">
          <Head eyebrow="What we offer" title="What Aama.io offers" />
          <div className={s.offerStrip}>
            {[
              { title: 'Fund accounting', text: AAMA.accounting, Icon: IconCalculator },
              { title: 'Investor onboarding and KYC', text: AAMA.onboarding, Icon: IconUserCheck },
              { title: 'Structures supported', text: AAMA.structures, Icon: IconSitemap },
              { title: 'Reconciliation', text: AAMA.reconciliation, Icon: IconArrowsExchange },
              { title: 'White-labelled LP portal', text: AAMA.portal, Icon: IconLayoutDashboard },
              { title: 'Pricing', text: AAMA.pricing, Icon: IconTag },
            ].map(({ title, text, Icon }) => (
              <div key={title} className={s.offerCell}>
                <span className={s.offerIcon}><Icon size={22} stroke={1.7} /></span>
                <h3 className={s.offerTitle}>{title}</h3>
                <p className={s.offerText}>{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {!vendor && !hub && (
        <section className={`${s.section} ${s.sectionMuted}`}>
          <Container size="lg">
            <Head eyebrow="How to choose" title="What to look for" />
            <div className={s.grid}>
              {p.criteria.map((cr) => (
                <div key={cr.title} className={s.card} style={{ cursor: 'default' }}>
                  <span className={s.cardTitle}>{cr.title}</span>
                  <span className={s.cardText}>{cr.text}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className={single ? `${s.section} ${s.sectionMuted}` : s.section}>
        <Container size="lg">
          <Head
            eyebrow="Moving to Aama.io"
            title="How a move works"
            lead="Migration is always a hassle, so we take it on: we have migrated more than 15 funds from legacy systems to our platform, and migration to Aama.io is free. New funds are typically operational within 2 weeks. Migrating an existing fund takes longer or shorter depending on its size and type. This is an indicative approach, not a guarantee: we agree the scope, timing and what data can be migrated with you in writing before any work starts. The free migration offer may change; ask us for current terms."
          />
          <ol className={s.steps}>
            {[
              { t: 'Agree the scope', x: 'Which funds or vehicles move, what history you keep, and the timing.' },
              { t: 'Export your data', x: 'Typically the investor register, commitments and called capital, the opening trial balance and the transactions you want to keep.' },
              { t: 'Load and reconcile', x: 'We load the data into Aama.io and reconcile it to your closing balances.' },
              { t: 'Go live', x: 'Your team and your investors start working in Aama.io.' },
            ].map((st, i) => (
              <li key={st.t} className={s.step}>
                <span className={s.stepNum}>{i + 1}</span>
                <div>
                  <div className={s.stepTitle}>{st.t}</div>
                  <div className={s.stepText}>{st.x}</div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={single ? s.section : `${s.section} ${s.sectionMuted}`}>
        <Container size="lg">
          <Head eyebrow="Questions" title="FAQs" />
          <Faqs faqs={p.faqs} />
        </Container>
      </section>

      <section className={single ? `${s.section} ${s.sectionMuted}` : s.section}>
        <Container size="lg">
          <Head eyebrow="Go deeper" title="Explore Aama.io" />
          <LinkCards items={PRODUCT_LINKS} even />
        </Container>
      </section>

      <Disclaimer names={options.concat(vendor && !options.includes(vendor) ? [vendor] : []).map((o) => o.name)} sources={options.concat(vendor && !options.includes(vendor) ? [vendor] : []).flatMap((o) => o.sources)} />

      <Cta title="See it on your own numbers" text="Tell us your fund count, investor count and structure. We will show what it looks like and what it costs." />
    </>
  );
}

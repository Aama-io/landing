import { useMemo, useState } from 'react';
import { Button, Container, Title, Text } from '@mantine/core';
import {
  IconAlertCircle,
  IconArrowRight,
  IconBuildingBank,
  IconCalculator,
  IconChartPie,
  IconChecklist,
  IconReportAnalytics,
  IconSearch,
} from '@tabler/icons-react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import s from '@/components/ui/tool.module.css';
import { LEARN_TERMS, learnHref, populatedTopics, termsInTopic } from '@/lib/learn';
import h from './LearnHub.module.css';

type HubTerm = { href: string; term: string; directAnswer: string; topicTitle: string };

type Props = {
  topics: { slug: string; title: string; blurb: string; terms: HubTerm[] }[];
  terms: HubTerm[];
  startHere: HubTerm[];
};

const TOPIC_ICONS: Record<string, typeof IconCalculator> = {
  'singapore-fund-structures': IconBuildingBank,
  'fund-economics': IconChartPie,
  'fund-accounting': IconCalculator,
  'lp-reporting': IconReportAnalytics,
  'fund-operations': IconChecklist,
};

// Most useful entry points for someone new to Singapore fund setup and operations.
const START_HERE = ['vcc', '13o-13u', 'distribution-waterfall', 'nav'];

function TermCard({ t }: { t: HubTerm }) {
  return (
    <Link href={t.href} className={h.card}>
      <span className={h.cardTopic}>{t.topicTitle}</span>
      <h3 className={h.cardTitle}>{t.term}</h3>
      <p className={h.cardDesc}>{t.directAnswer}</p>
      <span className={h.cardFoot}>
        Read definition <IconArrowRight size={16} className={h.cardArrow} />
      </span>
    </Link>
  );
}

export default function LearnHub({ topics, terms, startHere }: Props) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const results = useMemo(
    () => (q ? terms.filter((t) => `${t.term} ${t.directAnswer}`.toLowerCase().includes(q)) : []),
    [q, terms]
  );

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'aama.io Fund Glossary',
    url: 'https://aama.io/learn',
    hasDefinedTerm: terms.map((t) => ({ '@type': 'DefinedTerm', name: t.term, url: `https://aama.io${t.href}` })),
  };

  return (
    <InnerLayout>
      <SEO
        title="Learn: Fund Administration & Singapore Fund Glossary"
        description="Plain-English definitions for fund managers and administrators: VCCs, waterfalls, capital calls and more, with worked examples and the Singapore and APAC angle."
      />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }} />
      </Head>

      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Learn · {terms.length} explainers</span>
          <Title className={s.heroTitle}>
            The fund operations <span className={s.accent}>glossary</span>
          </Title>
          <Text className={s.heroDesc}>
            Direct answers, worked examples and the Singapore angle, for fund managers, fund administrators and family
            offices.
          </Text>

          <div className={h.searchWrap}>
            <IconSearch size={19} className={h.searchIcon} />
            <input
              type="search"
              className={h.search}
              placeholder="Search terms, e.g. VCC or NAV"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search the glossary"
            />
          </div>

          {!q && (
            <nav className={h.chips} aria-label="Topics">
              {topics.map((t) => (
                <a key={t.slug} href={`#${t.slug}`} className={h.chip}>
                  {t.title}
                  <span className={h.chipCount}>{t.terms.length}</span>
                </a>
              ))}
            </nav>
          )}
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="xl">
          {q ? (
            <div className={h.section}>
              <div className={h.sectionHead}>
                <div>
                  <h2 className={h.sectionTitle}>
                    {results.length} {results.length === 1 ? 'result' : 'results'} for “{query.trim()}”
                  </h2>
                </div>
              </div>
              {results.length > 0 ? (
                <div className={h.grid}>
                  {results.map((t) => (
                    <TermCard key={t.href} t={t} />
                  ))}
                </div>
              ) : (
                <div className={h.empty}>
                  No matching terms yet. Try a broader word, or{' '}
                  <Link href="/contact">tell us what you would like explained</Link>.
                </div>
              )}
            </div>
          ) : (
            <>
              <div className={h.startBand}>
                <div className={`${h.sectionHead} ${h.startHead}`}>
                  <div>
                    <h2 className={h.sectionTitle}>Start here</h2>
                    <p className={h.sectionBlurb}>The four terms most useful when setting up and running a Singapore fund.</p>
                  </div>
                </div>
                <div className={`${h.grid} ${h.gridFour}`}>
                  {startHere.map((t) => (
                    <TermCard key={t.href} t={t} />
                  ))}
                </div>
              </div>

              {topics.map((topic) => {
                const Icon = TOPIC_ICONS[topic.slug] ?? IconCalculator;
                return (
                  <div key={topic.slug} id={topic.slug} className={h.section}>
                    <div className={h.sectionHead}>
                      <span className={h.sectionIcon}>
                        <Icon size={22} stroke={1.7} />
                      </span>
                      <div>
                        <h2 className={h.sectionTitle}>{topic.title}</h2>
                        <p className={h.sectionBlurb}>{topic.blurb}</p>
                      </div>
                      <Link href={`/learn/${topic.slug}`} className={h.sectionLink}>
                        View all <IconArrowRight size={15} />
                      </Link>
                    </div>
                    <div className={h.grid}>
                      {topic.terms.map((t) => (
                        <TermCard key={t.href} t={t} />
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className={h.section}>
                <div className={h.sectionHead}>
                  <div>
                    <h2 className={h.sectionTitle}>A–Z index</h2>
                    <p className={h.sectionBlurb}>Every term in one list.</p>
                  </div>
                </div>
                <ul className={h.index}>
                  {[...terms]
                    .sort((a, b) => a.term.localeCompare(b.term))
                    .map((t) => (
                      <li key={t.href}>
                        <Link href={t.href}>{t.term}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

          <div className={h.cta}>
            <div>
              <h2 className={h.ctaTitle}>Put the definitions to work</h2>
              <p className={h.ctaText}>Model waterfalls, VCC costs and returns with our free fund tools — no sign-up.</p>
            </div>
            <Button component={Link} href="/tools" size="md" rightSection={<IconArrowRight size={16} />}>
              Explore free tools
            </Button>
          </div>

          <div className={h.notice}>
            <IconAlertCircle size={18} className={h.noticeIcon} />
            <span>
              These explainers are compiled from public sources and can become outdated as rules, thresholds and market
              practice change. Each page lists its sources and who to check with. General information only, not legal,
              tax, accounting or investment advice.
            </span>
          </div>
        </Container>
      </section>
    </InnerLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const topicTitle = (slug: string) => populatedTopics().find((t) => t.slug === slug)?.title ?? '';
  const toHub = (t: (typeof LEARN_TERMS)[number]): HubTerm => ({
    href: learnHref(t),
    term: t.term,
    directAnswer: t.directAnswer,
    topicTitle: topicTitle(t.topic),
  });

  return {
    props: {
      topics: populatedTopics().map((t) => ({
        slug: t.slug,
        title: t.title,
        blurb: t.blurb,
        terms: termsInTopic(t.slug).map(toHub),
      })),
      terms: LEARN_TERMS.map(toHub),
      startHere: START_HERE.map((slug) => LEARN_TERMS.find((t) => t.slug === slug))
        .filter((t): t is (typeof LEARN_TERMS)[number] => Boolean(t))
        .map(toHub),
    },
  };
};

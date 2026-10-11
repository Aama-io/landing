import { Alert, Container, Title, Text, Stack, Group, Badge, Button, Divider, Box, Grid, Accordion, List } from '@mantine/core';
import { IconAlertCircle, IconCalculator, IconChevronRight, IconArrowRight } from '@tabler/icons-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import {
  LEARN_TERMS,
  getLearnRelatedSolution,
  getLearnRelatedTools,
  getRelatedLearnTerms,
  learnHref,
  termBySlug,
  topicBySlug,
  type LearnTerm,
  type LearnTopic,
} from '@/lib/learn';
import classes from '../Learn.module.css';

const SITE = 'https://aama.io';

type Props = {
  term: LearnTerm;
  topic: LearnTopic;
  relatedTerms: { href: string; term: string; directAnswer: string }[];
  relatedTools: { path: string; title: string }[];
  relatedSolution: { href: string; label: string; blurb: string } | null;
};

const joinList = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

export default function LearnTermPage({ term, topic, relatedTerms, relatedTools, relatedSolution }: Props) {
  const url = `${SITE}${learnHref(term)}`;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: term.title,
    description: term.description,
    image: `${SITE}/og-image.png`,
    inLanguage: 'en-SG',
    articleSection: topic.title,
    datePublished: term.publishedDate,
    dateModified: term.lastReviewed,
    author: { '@type': 'Organization', name: term.author, url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'AAMA',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/og-image.png` },
    },
    about: { '@type': 'DefinedTerm', name: term.term },
    isPartOf: { '@type': 'CollectionPage', name: topic.title, url: `${SITE}/learn/${topic.slug}` },
    citation: term.sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
    // Points answer engines at the citable 40–60 word definition.
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#direct-answer', 'h1'] },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const definedTerm = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.directAnswer,
    url,
    termCode: term.shortName,
    inLanguage: 'en-SG',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'aama.io Fund Glossary', url: `${SITE}/learn` },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: term.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Learn', item: `${SITE}/learn` },
      { '@type': 'ListItem', position: 2, name: topic.title, item: `${SITE}/learn/${topic.slug}` },
      { '@type': 'ListItem', position: 3, name: term.shortName, item: url },
    ],
  };

  return (
    <InnerLayout>
      <SEO title={term.title} description={term.description} ogUrl={url} ogType="article" />
      <Head>
        <meta property="article:published_time" content={term.publishedDate} />
        <meta property="article:modified_time" content={term.lastReviewed} />
        <meta property="article:section" content={topic.title} />
        {[article, definedTerm, faqJsonLd, breadcrumbs].map((data, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
      </Head>
      <div className={classes.wrapper}>
        <Container size="xl">
          <article className={classes.article}>
            <Stack gap="xl">
              <Group gap="xs" wrap="wrap">
                <Link href="/learn" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Text size="sm" c="dimmed">Learn</Text>
                </Link>
                <IconChevronRight size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
                <Link href={`/learn/${topic.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Text size="sm" c="dimmed">{topic.title}</Text>
                </Link>
                <IconChevronRight size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
                <Text size="sm" c="dimmed">{term.shortName}</Text>
              </Group>

              <Stack gap="md">
                <Badge variant="light" color="blue" w="fit-content">{topic.title}</Badge>
                <Title component="h1" className={classes.title}>{term.title}</Title>
                <Text size="sm" c="dimmed">
                  By {term.author} · Last reviewed <time dateTime={term.lastReviewed}>{fmtDate(term.lastReviewed)}</time>
                </Text>
              </Stack>

              <Box id="direct-answer" className={classes.answer}>{term.directAnswer}</Box>

              <Alert variant="light" color="yellow" icon={<IconAlertCircle size={18} />} title="Sourced information — it can change">
                <Text size="sm" lh={1.6}>
                  This page is compiled from public sources (listed at the bottom) and last reviewed on{' '}
                  {fmtDate(term.lastReviewed)}. Regulations, thresholds, fees and market practice change, so it may not
                  reflect the latest position. Check with {joinList(term.authorities)} before acting.
                </Text>
              </Alert>

              <nav className={classes.toc} aria-label="On this page">
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={8}>On this page</Text>
                <div className={classes.tocLinks}>
                  {[
                    ['key-facts', 'Key facts'],
                    ['how-it-works', 'How it works'],
                    ['worked-example', 'Worked example'],
                    ['common-mistakes', 'Common mistakes'],
                    ['singapore-angle', 'Singapore angle'],
                    ['faq', 'FAQ'],
                    ...(relatedTerms.length > 0 ? [['related-terms', 'Related terms']] : []),
                  ].map(([id, label]) => (
                    <a key={id} href={`#${id}`} className={classes.tocLink}>{label}</a>
                  ))}
                </div>
              </nav>

              <Stack gap="sm">
                <Title order={2} id="key-facts" className={classes.h2}>Key facts</Title>
                <table className={classes.table}>
                  <tbody>
                    {term.keyFacts.map((f) => (
                      <tr key={f.label}>
                        <th scope="row">{f.label}</th>
                        <td>{f.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Stack>

              <Stack gap="md">
                <Title order={2} id="how-it-works" className={classes.h2}>How it works</Title>
                <List type="ordered" spacing="md">
                  {term.howItWorks.map((s) => (
                    <List.Item key={s.heading}>
                      <Text fw={600} component="span">{s.heading}. </Text>
                      <Text component="span" c="dimmed">{s.body}</Text>
                    </List.Item>
                  ))}
                </List>
              </Stack>

              <Stack gap="sm">
                <Title order={2} id="worked-example" className={classes.h2}>Worked example: {term.workedExample.title}</Title>
                <Text c="dimmed">{term.workedExample.setup}</Text>
                <table className={`${classes.table} ${classes.tableValueRight}`}>
                  <tbody>
                    {term.workedExample.rows.map((r) => (
                      <tr key={r.label}>
                        <td>{r.label}</td>
                        <td>{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Text fw={500}>{term.workedExample.takeaway}</Text>
              </Stack>

              <Stack gap="sm">
                <Title order={2} id="common-mistakes" className={classes.h2}>Common mistakes</Title>
                <List spacing="xs">
                  {term.mistakes.map((m) => (
                    <List.Item key={m}>{m}</List.Item>
                  ))}
                </List>
              </Stack>

              <Stack gap="sm">
                <Title order={2} id="singapore-angle" className={classes.h2}>The Singapore and APAC angle</Title>
                <Text lh={1.7}>{term.singaporeNote}</Text>
              </Stack>

              <Stack gap="md">
                <Title order={2} id="faq" className={classes.h2}>Frequently asked questions</Title>
                <Accordion variant="separated" radius="md" chevronPosition="right">
                  {term.faqs.map((f, i) => (
                    <Accordion.Item key={f.q} value={`faq-${i}`}>
                      <Accordion.Control><Text fw={600}>{f.q}</Text></Accordion.Control>
                      <Accordion.Panel><Text size="sm" c="dimmed" lh={1.65}>{f.a}</Text></Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Stack>

              {(relatedTools.length > 0 || relatedSolution) && (
                <Stack gap="md">
                  {relatedTools.length > 0 && (
                    <div>
                      <Text size="sm" fw={600} c="dimmed" mb={8}>Free tools</Text>
                      <Group gap="xs">
                        {relatedTools.map((tool) => (
                          <Button
                            key={tool.path}
                            component={Link}
                            href={tool.path}
                            variant="light"
                            size="xs"
                            leftSection={<IconCalculator size={14} />}
                          >
                            {tool.title}
                          </Button>
                        ))}
                      </Group>
                    </div>
                  )}
                  {relatedSolution && (
                    <Box className={classes.callout}>
                      <Group justify="space-between" align="center" wrap="wrap" gap="sm">
                        <div>
                          <Text size="sm" c="dimmed">See how aama.io fits</Text>
                          <Text fw={700}>{relatedSolution.label}</Text>
                          <Text size="sm" c="dimmed">{relatedSolution.blurb}</Text>
                        </div>
                        <Button component={Link} href={relatedSolution.href} size="sm" rightSection={<IconArrowRight size={16} />}>
                          Explore
                        </Button>
                      </Group>
                    </Box>
                  )}
                </Stack>
              )}

              {term.relatedPosts.length > 0 && (
                <Stack gap="xs">
                  <Text size="sm" fw={600} c="dimmed">Go deeper</Text>
                  {term.relatedPosts.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`}>{p.title}</Link>
                  ))}
                </Stack>
              )}

              {relatedTerms.length > 0 && (
                <Stack gap="md">
                  <Title order={2} id="related-terms" className={classes.h2}>Related terms</Title>
                  <Grid gutter="md">
                    {relatedTerms.map((r) => (
                      <Grid.Col span={{ base: 12, sm: 6 }} key={r.href}>
                        <Box component={Link} href={r.href} className={classes.card}>
                          <Text fw={700} mb={4}>{r.term}</Text>
                          <Text size="sm" c="dimmed" lineClamp={3}>{r.directAnswer}</Text>
                        </Box>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Stack>
              )}

              <Divider />

              <Stack gap={4}>
                <Text size="sm" fw={600} c="dimmed">Sources</Text>
                {term.sources.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                ))}
                <Text size="xs" c="dimmed" mt="xs">
                  General information, not tax, legal, accounting or investment advice. This content is sourced from the
                  references above and from public regulatory material, and it can become outdated. Always confirm the
                  current position with {joinList(term.authorities)}, and take professional advice for your specific
                  situation, before relying on it.
                </Text>
              </Stack>
            </Stack>
          </article>
        </Container>
      </div>
    </InnerLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: LEARN_TERMS.map((t) => ({ params: { topic: t.topic, term: t.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const topicSlug = params?.topic;
  const termSlug = params?.term;
  const term = typeof topicSlug === 'string' && typeof termSlug === 'string' ? termBySlug(topicSlug, termSlug) : undefined;
  const topic = term ? topicBySlug(term.topic) : undefined;

  if (!term || !topic) {
    return { notFound: true };
  }

  const solution = getLearnRelatedSolution(term);

  return {
    props: {
      term,
      topic,
      relatedTerms: getRelatedLearnTerms(term).map((t) => ({
        href: learnHref(t),
        term: t.term,
        directAnswer: t.directAnswer,
      })),
      relatedTools: getLearnRelatedTools(term),
      relatedSolution: solution ? { href: solution.href, label: solution.label, blurb: solution.blurb } : null,
    },
  };
};

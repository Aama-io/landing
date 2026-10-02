import { Container, Title, Text, Stack, Group, Badge, Button, Divider, Box, Grid, Accordion, List } from '@mantine/core';
import { IconCalculator, IconChevronRight, IconArrowRight } from '@tabler/icons-react';
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

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

export default function LearnTermPage({ term, topic, relatedTerms, relatedTools, relatedSolution }: Props) {
  const url = `${SITE}${learnHref(term)}`;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: term.title,
    description: term.description,
    datePublished: term.publishedDate,
    dateModified: term.lastReviewed,
    author: { '@type': 'Organization', name: term.author },
    publisher: {
      '@type': 'Organization',
      name: 'AAMA',
      logo: { '@type': 'ImageObject', url: `${SITE}/aama-logo.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const definedTerm = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.directAnswer,
    url,
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
      <SEO title={term.title} description={term.description} ogUrl={url} />
      <Head>
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
                  By {term.author} · Last reviewed {fmtDate(term.lastReviewed)}
                </Text>
              </Stack>

              <Box className={classes.answer}>{term.directAnswer}</Box>

              <Stack gap="sm">
                <Title order={2} className={classes.h2}>Key facts</Title>
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
                <Title order={2} className={classes.h2}>How it works</Title>
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
                <Title order={2} className={classes.h2}>Worked example: {term.workedExample.title}</Title>
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
                <Title order={2} className={classes.h2}>Common mistakes</Title>
                <List spacing="xs">
                  {term.mistakes.map((m) => (
                    <List.Item key={m}>{m}</List.Item>
                  ))}
                </List>
              </Stack>

              <Stack gap="sm">
                <Title order={2} className={classes.h2}>The Singapore and APAC angle</Title>
                <Text lh={1.7}>{term.singaporeNote}</Text>
              </Stack>

              <Stack gap="md">
                <Title order={2} className={classes.h2}>Frequently asked questions</Title>
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
                  <Title order={2} className={classes.h2}>Related terms</Title>
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
                  General information, not tax, legal or investment advice. Rules, fees and thresholds change; confirm the
                  current position with MAS, ACRA, IRAS and a licensed adviser before acting.
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

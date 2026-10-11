import { Container, Title, Text, Stack, Group, Box, Grid } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import { learnHref, populatedTopics, termsInTopic, topicBySlug, type LearnTopic } from '@/lib/learn';
import classes from '../Learn.module.css';

type Props = {
  topic: LearnTopic;
  terms: { href: string; term: string; directAnswer: string }[];
};

const SITE = 'https://aama.io';

export default function LearnTopicPage({ topic, terms }: Props) {
  const url = `${SITE}/learn/${topic.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: topic.title,
      description: topic.blurb,
      url,
      inLanguage: 'en-SG',
      isPartOf: { '@type': 'WebSite', name: 'AAMA', url: SITE },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: terms.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.term,
          url: `${SITE}${t.href}`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Learn', item: `${SITE}/learn` },
        { '@type': 'ListItem', position: 2, name: topic.title, item: url },
      ],
    },
  ];

  return (
    <InnerLayout>
      <SEO
        title={`${topic.title} — Definitions and Guides`}
        description={`${topic.blurb} Plain-English definitions with worked examples and the Singapore angle.`}
        ogUrl={url}
      />
      <Head>
        {jsonLd.map((data, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
      </Head>
      <div className={classes.wrapper}>
        <Container size="xl">
          <div className={classes.article}>
            <Stack gap="xl">
              <Group gap="xs">
                <Link href="/learn" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Text size="sm" c="dimmed">Learn</Text>
                </Link>
                <IconChevronRight size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
                <Text size="sm" c="dimmed">{topic.title}</Text>
              </Group>
              <Stack gap="sm">
                <Title component="h1" className={classes.title}>{topic.title}</Title>
                <Text size="lg" c="dimmed">{topic.blurb}</Text>
              </Stack>
              <Grid gutter="md">
                {terms.map((t) => (
                  <Grid.Col span={{ base: 12, sm: 6 }} key={t.href}>
                    <Box component={Link} href={t.href} className={classes.card}>
                      <Text fw={700} mb={4}>{t.term}</Text>
                      <Text size="sm" c="dimmed" lineClamp={4}>{t.directAnswer}</Text>
                    </Box>
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </div>
        </Container>
      </div>
    </InnerLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: populatedTopics().map((t) => ({ params: { topic: t.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.topic;
  const topic = typeof slug === 'string' ? topicBySlug(slug) : undefined;
  const terms = topic ? termsInTopic(topic.slug) : [];

  if (!topic || terms.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      topic,
      terms: terms.map((t) => ({ href: learnHref(t), term: t.term, directAnswer: t.directAnswer })),
    },
  };
};

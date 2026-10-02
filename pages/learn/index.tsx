import { Container, Title, Text, Stack, Box, Grid, Button } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import { LEARN_TERMS, learnHref, populatedTopics, termsInTopic } from '@/lib/learn';
import classes from './Learn.module.css';

type Props = {
  topics: {
    slug: string;
    title: string;
    blurb: string;
    terms: { href: string; term: string }[];
  }[];
  glossary: { href: string; term: string }[];
};

export default function LearnHub({ topics, glossary }: Props) {
  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'aama.io Fund Glossary',
    url: 'https://aama.io/learn',
    hasDefinedTerm: glossary.map((g) => ({
      '@type': 'DefinedTerm',
      name: g.term,
      url: `https://aama.io${g.href}`,
    })),
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
      <div className={classes.wrapper}>
        <Container size="xl">
          <div className={classes.article}>
            <Stack gap="xl">
              <Stack gap="sm">
                <Title component="h1" className={classes.title}>Learn: the fund operations glossary</Title>
                <Text size="lg" c="dimmed">
                  Direct answers, worked examples and the Singapore angle, for fund managers, fund administrators and
                  family offices.
                </Text>
              </Stack>

              {topics.map((topic) => (
                <Stack gap="md" key={topic.slug}>
                  <div>
                    <Title order={2} className={classes.h2}>{topic.title}</Title>
                    <Text c="dimmed">{topic.blurb}</Text>
                  </div>
                  <Grid gutter="md">
                    {topic.terms.map((t) => (
                      <Grid.Col span={{ base: 12, sm: 6 }} key={t.href}>
                        <Box component={Link} href={t.href} className={classes.card}>
                          <Text fw={700}>{t.term}</Text>
                        </Box>
                      </Grid.Col>
                    ))}
                  </Grid>
                  <Button component={Link} href={`/learn/${topic.slug}`} variant="subtle" w="fit-content" rightSection={<IconArrowRight size={16} />}>
                    All {topic.title.toLowerCase()}
                  </Button>
                </Stack>
              ))}
            </Stack>
          </div>
        </Container>
      </div>
    </InnerLayout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    topics: populatedTopics().map((t) => ({
      slug: t.slug,
      title: t.title,
      blurb: t.blurb,
      terms: termsInTopic(t.slug).map((x) => ({ href: learnHref(x), term: x.term })),
    })),
    glossary: [...LEARN_TERMS]
      .sort((a, b) => a.term.localeCompare(b.term))
      .map((t) => ({ href: learnHref(t), term: t.term })),
  },
});

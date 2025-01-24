import Head from 'next/head';
import { readItems } from '@directus/sdk';
import { Container } from '@mantine/core';
import InnerLayout from '@/components/InnerLayout';
import { PageContent } from '@/components/PageContent';
import { getDirectusClient } from '@/lib/directus';

export default function BlogPage({ page, posts }: { page: any; posts: any }) {
  return (
    <InnerLayout>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Head>
      <Container style={{ marginTop: '50px' }}>
        <PageContent page={page} posts={posts} />
      </Container>
    </InnerLayout>
  );
}

export async function getStaticProps() {
  const directus = await getDirectusClient();

  const page = await directus.request(
    readItems('pages', {
      filter: { permalink: '/blog' },
      fields: ['*,*.*.*.*.*.*.*.*.*.*'],
    })
  );

  const posts = await directus.request(
    readItems('posts', {
      fields: ['*.*'],
    })
  );

  return {
    props: {
      page: {
        title: page[0].title,
        content: page[0].blocks,
      },
      posts,
    },
  };
}

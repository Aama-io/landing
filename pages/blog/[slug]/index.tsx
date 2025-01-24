import { notFound } from 'next/navigation';
import { readItems } from '@directus/sdk';
import { Avatar, Box, Container, Divider, Group, Image, Text, Title } from '@mantine/core';
import InnerLayout from '@/components/InnerLayout';
import { getDirectusClient, getImageUrl } from '@/lib/directus';
import Head from 'next/head';

export default function DynamicPostPage({ post }: { post: any }) {
  const { title, description, content, image, published_at, author } = post;
  return (
    <InnerLayout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Container size="md" my={'xl'}>
        {/* Blog Header */}
        <Box>
          <Image
            src={getImageUrl(image.filename_disk)}
            alt={title}
            radius="md"
            height={300}
            fit="cover"
          />
          <Title mt="lg">{title}</Title>
          <Text size="sm" c="dimmed" mt="sm">
            {new Date(published_at).toLocaleDateString()} - {description}
          </Text>
          <Group mt="sm">
            <Avatar
              src={getImageUrl(author.avatar.filename_disk)}
              alt={author.first_name}
              radius="xl"
            />
            <Text size="sm">{author.first_name}</Text>
          </Group>
        </Box>

        <Divider my="lg" />

        {/* Blog Content */}
        <Box dangerouslySetInnerHTML={{ __html: content }} />

        <Divider my="lg" />

        {/* Footer */}
        <Text ta="center" size="sm" mt="lg" c="dimmed">
          © {new Date().getFullYear()}, All rights reserved. Written by {author.first_name}
        </Text>
      </Container>
    </InnerLayout>
  );
}

export async function getStaticPaths() {
  try {
    const client = await getDirectusClient();
    const posts = await client.request(
      readItems('posts', {
        fields: ['slug'],
      })
    );

    const paths = posts.map((page: any) => ({
      params: { slug: page.slug },
    }));

    return {
      paths,
      fallback: 'blocking', // Use 'blocking' to fetch missing paths server-side
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const client = await getDirectusClient();
    const posts = await client.request(
      readItems('posts', {
        filter: { slug: params.slug },
        fields: ['*,*.*.*.*.*.*.*.*.*.*'],
      })
    );

    return {
      props: {
        post: posts[0],
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return notFound();
  }
}

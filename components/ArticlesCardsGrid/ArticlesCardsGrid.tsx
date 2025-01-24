import { AspectRatio, Card, Container, Image, SimpleGrid, Text } from '@mantine/core';
import { getImageUrl } from '@/lib/directus';
import classes from './ArticlesCardsGrid.module.css';

export function ArticlesCardsGrid({ posts }: { posts: any }) {
  const cards = posts.map((post: any) => (
    <Card
      key={post.title}
      p="md"
      radius="md"
      component="a"
      href={`/blog/${post.slug}`}
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={getImageUrl(post.image.filename_disk)} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {new Date(post.published_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </Text>
      <Text className={classes.title} mt={5}>
        {post.title}
      </Text>
      <Text mt={5} c={'dimmed'}>
        {post.description}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}

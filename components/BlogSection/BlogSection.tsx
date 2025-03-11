import { Container, Title, SimpleGrid, Card, Image, Text, Group } from '@mantine/core';
import classes from './BlogSection.module.css';

const articles = [
  {
    title: 'The Future of Fund Management',
    description: 'How blockchain is revolutionizing the investment industry',
    image: '/blog/article1.jpg',
    author: 'John Doe',
    readTime: '5 min',
  },
  {
    title: 'Understanding On-Chain Fund Administration',
    description: 'A comprehensive guide to automated fund operations',
    image: '/blog/article2.jpg',
    author: 'Jane Smith',
    readTime: '8 min',
  },
  {
    title: 'Global Investment Trends 2024',
    description: 'Key insights into the evolving investment landscape',
    image: '/blog/article3.jpg',
    author: 'Mike Johnson',
    readTime: '6 min',
  },
];

export function BlogSection() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center">
        Latest Insights
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="sm">
        Stay updated with the latest trends and insights in fund management
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" mt={50}>
        {articles.map((article, index) => (
          <Card key={index} className={classes.card} padding="lg">
            <Card.Section>
              <Image src={article.image} height={160} alt={article.title} />
            </Card.Section>

            <Text size="lg" fw={500} mt="md">
              {article.title}
            </Text>

            <Text size="sm" c="dimmed" mt="sm">
              {article.description}
            </Text>

            <Group mt="md" justify="space-between">
              <Text size="sm">{article.author}</Text>
              <Text size="sm" c="dimmed">{article.readTime} read</Text>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
} 
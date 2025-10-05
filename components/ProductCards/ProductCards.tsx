import { Container, SimpleGrid, Card, Text, Title, Group } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './ProductCards.module.css';

const products = [
  {
    title: 'Matrix Mutual Platform',
    description: 'Complete fund management & accounting software with automated NAV calculation.',
    link: 'Learn more',
  },
  {
    title: 'Capital Engine',
    description: 'Investment software for SIP & lump sum investments in open-ended mutual funds.',
    link: 'Learn more',
  },
  {
    title: 'Tokenization',
    description: 'Tokenize your fund shares to increase transparency and efficiency.',
    link: 'Learn more',
  },
  {
    title: 'Global Expansion',
    description: 'Infrastructure ready for international expansion, starting with Singapore.',
    link: 'Learn more',
  },
];

export function ProductCards() {
  return (
    <Container size="lg" py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        {products.map((product, index) => (
          <Card key={index} className={classes.card}>
            <Title order={3} className={classes.cardTitle}>
              {product.title}
            </Title>
            <Text mt="sm" mb="md" c="dimmed" size="sm">
              {product.description}
            </Text>
            <Group className={classes.cardFooter}>
              <Text size="sm" c="blue" fw={500}>
                {product.link}
              </Text>
              <IconArrowRight size={14} stroke={1.5} />
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
} 
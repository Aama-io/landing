import { Container, Title, Text, Stack, Group, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './Blog.module.css';

export default function BlogPage() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Stack align="center" justify="center" gap="xl" className={classes.content}>
          <Title className={classes.title}>Blog Coming Soon</Title>
          <Text className={classes.description}>
            We're working on bringing you valuable insights about fund management, blockchain technology, 
            and investment strategies. Stay tuned!
          </Text>
          <Group justify="center">
            <Button
              component={Link}
              href="/"
              variant="light"
              leftSection={<IconArrowLeft size={20} />}
              size="lg"
            >
              Back to Home
            </Button>
          </Group>
        </Stack>
      </Container>
    </div>
  );
} 
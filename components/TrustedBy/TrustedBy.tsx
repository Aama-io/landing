import { Container, Title, SimpleGrid, Image, Text } from '@mantine/core';
import classes from './TrustedBy.module.css';

export function TrustedBy() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center">
        Trusted By
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="sm">
        Leading investment firms trust AAMA for their fund management needs
      </Text>

      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing={50} mt={50}>
        {/* Add your partner logos here */}
        <div className={classes.logoWrapper}>
          <Image src="/partners/logo1.svg" alt="Partner 1" />
        </div>
        <div className={classes.logoWrapper}>
          <Image src="/partners/logo2.svg" alt="Partner 2" />
        </div>
        <div className={classes.logoWrapper}>
          <Image src="/partners/logo3.svg" alt="Partner 3" />
        </div>
        <div className={classes.logoWrapper}>
          <Image src="/partners/logo4.svg" alt="Partner 4" />
        </div>
      </SimpleGrid>
    </Container>
  );
} 
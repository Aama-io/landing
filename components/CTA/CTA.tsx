import { Container, Text, Title, Button, Group } from '@mantine/core';
import classes from './CTA.module.css';

export function CTA() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <div className={classes.inner}>
          <Title className={classes.title}>
            Ready to revolutionize your fund management?
          </Title>
          
          <Text className={classes.description}>
            Join the future of fund management with AAMA's blockchain-powered platform.
            Start your journey towards efficient, transparent, and automated fund operations.
          </Text>

          <Group justify="center" mt={40}>
            <Button size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
              Get Started Now
            </Button>
            <Button size="xl" variant="white">
              Schedule Demo
            </Button>
          </Group>
        </div>
      </Container>
    </div>
  );
} 
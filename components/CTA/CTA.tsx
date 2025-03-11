import { Container, Text, Title, Button, Group } from '@mantine/core';
import classes from './CTA.module.css';
import Link from 'next/link';

export function CTA() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.backgroundEffect} />
      <Container size="lg" pos="relative">
        <div className={classes.inner}>
          <Title className={classes.title}>
            Ready to revolutionize your fund management?
          </Title>
          
          <Text className={classes.description}>
            Join the future of fund management with AAMA's blockchain-powered platform.
            Start your journey towards efficient, transparent, and automated fund operations.
          </Text>

          <Group justify="center" mt={40}>
            <Button 
              component={Link} 
              href="/contact" 
              size="lg" 
              variant="white"
              className={classes.primaryButton}
            >
              Get Started Now
            </Button>
            <Button 
              component={Link} 
              href="/contact" 
              size="lg" 
              variant="outline"
              className={classes.secondaryButton}
            >
              Schedule Demo
            </Button>
          </Group>
        </div>
      </Container>
    </div>
  );
} 
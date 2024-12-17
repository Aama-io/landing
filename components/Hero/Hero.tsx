import cx from 'clsx';
import { Box, Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <Box>
      <div className={classes.wrapper}>
        <Overlay color="#eee" opacity={0.15} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Automated AI code reviews for{' '}
            <Text component="span" inherit className={classes.highlight}>
              any stack
            </Text>
          </Title>

          <Container size={640}>
            <Text size="lg" className={classes.description}>
              Build more reliable software with AI companion. AI is also trained to detect lazy
              developers who do nothing and just complain on Twitter.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button className={cx(classes.control)}>Get started</Button>
            <Button className={classes.control} variant="outline">
              Live demo
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

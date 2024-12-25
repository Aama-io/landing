import cx from 'clsx';
import { Box, Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <Box>
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <Title className={classes.title}>NextJs + Mantine UI Boilerplate</Title>

          <Container size={640}>
            <Text size="lg" className={classes.description}>
              Build fully functional landing page faster than ever with this boilerplate. Use your
              favourite NextJS and Mantine UI to create a beautiful website.
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
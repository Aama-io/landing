import { Container, Title, Text } from '@mantine/core';
import classes from './PricingHero.module.css';

export function PricingHero() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <Title className={classes.title} ta="center">
          Pricing
        </Title>
        <Text className={classes.description} ta="center">
          Choose your plan or contact us to set up your fund
        </Text>
      </Container>
    </div>
  );
} 
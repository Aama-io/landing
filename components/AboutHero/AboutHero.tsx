import { Container, Title, Text, Group, Stack } from '@mantine/core';
import classes from './AboutHero.module.css';

export function AboutHero() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <div className={classes.inner}>
          <Stack className={classes.content}>
            <Title className={classes.title}>
              Revolutionizing Fund Management Through Technology
            </Title>
            
            <Text className={classes.description}>
              AAMA.io combines traditional finance expertise with cutting-edge blockchain technology 
              to create the next generation of fund management solutions.
            </Text>

            <Group mt="xl" className={classes.stats}>
              <div>
                <Text className={classes.statCount}>2023</Text>
                <Text className={classes.statTitle}>Founded</Text>
              </div>
              <div>
                <Text className={classes.statCount}>50+</Text>
                <Text className={classes.statTitle}>Team Members</Text>
              </div>
              <div>
                <Text className={classes.statCount}>24/7</Text>
                <Text className={classes.statTitle}>Support</Text>
              </div>
            </Group>
          </Stack>
        </div>
      </Container>
    </div>
  );
} 
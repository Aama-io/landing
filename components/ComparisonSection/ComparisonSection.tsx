import { Container, Grid, Text, Title, Card, List, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from './ComparisonSection.module.css';

export function ComparisonSection() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Title ta="center" className={classes.title}>
          Traditional vs On-Chain Fund Management
        </Title>

        <Grid gutter={40} mt={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card className={classes.card}>
              <Title order={3} mb="md">Traditional Approach</Title>
              <List spacing="sm" size="sm" center>
                <List.Item>Manual NAV calculations</List.Item>
                <List.Item>Slow reconciliation process</List.Item>
                <List.Item>High operational costs</List.Item>
                <List.Item>Limited transparency</List.Item>
                <List.Item>Geographic restrictions</List.Item>
              </List>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card className={classes.card}>
              <Title order={3} mb="md" c="blue">AAMA Solution</Title>
              <List
                spacing="sm"
                size="sm"
                center
                icon={
                  <ThemeIcon size={24} radius="xl" color="blue">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>Automated NAV calculations</List.Item>
                <List.Item>Real-time reconciliation</List.Item>
                <List.Item>Reduced operational costs</List.Item>
                <List.Item>Full transparency on-chain</List.Item>
                <List.Item>Global accessibility</List.Item>
              </List>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
} 
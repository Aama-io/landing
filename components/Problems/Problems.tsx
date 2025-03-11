import { Container, Title, Text, Grid, Card, ThemeIcon } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './Problems.module.css';

const problems = [
  {
    title: "Slow NAV Reconciliation",
    description: "Fund managers struggle with time-consuming NAV reconciliation and compliance reporting processes."
  },
  {
    title: "Limited Investor Access",
    description: "High barriers to entry prevent retail and global investors from participating in mutual funds."
  },
  {
    title: "No Cross-Chain Support",
    description: "Existing platforms lack tokenization and cross-chain fund management capabilities."
  },
  {
    title: "Generic Solutions",
    description: "Competitors focus on generic asset tokenization, missing mutual fund-specific requirements."
  },
  {
    title: "Disconnected Operations",
    description: "Lack of seamless integration between on-chain and off-chain fund operations."
  }
];

const solutions = [
  {
    title: "Automated Fund Management",
    description: "Simplifies operations by automating NAV reconciliation, compliance, and reporting processes."
  },
  {
    title: "Enhanced Accessibility",
    description: "Seamless investment portal for both SIP and lump sum investments, making fund access easier."
  },
  {
    title: "Blockchain Integration",
    description: "Improves liquidity and efficiency through blockchain-based fractional ownership and cross-chain transactions."
  },
  {
    title: "Unified Platform",
    description: "Bridges traditional and tokenized finance, enabling smooth transition between off-chain & on-chain operations."
  },
  {
    title: "Regulatory Compliant",
    description: "Platform adapted to Singapore's MAS regulations for scalability and wider adoption."
  }
];

export function Problems() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid gutter={50}>
          {/* Problems Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Title className={classes.title} ta="left" mt="sm">
                <Text component="span" className={classes.highlight} inherit>
                  Mutual Fund
                </Text>{' '}
                Management is Complex
              </Title>

              {problems.map((problem, index) => (
                <Card key={index} className={classes.card} mt="md">
                  <ThemeIcon
                    size="lg"
                    radius="md"
                    variant="light"
                    color="red"
                    className={classes.icon}
                  >
                    <IconX size={20} />
                  </ThemeIcon>
                  <Text fw={700} fz="lg" mb={5}>
                    {problem.title}
                  </Text>
                  <Text c="dimmed" fz="sm">
                    {problem.description}
                  </Text>
                </Card>
              ))}
            </motion.div>
          </Grid.Col>

          {/* Solutions Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Title className={classes.title} ta="left" mt="sm">
                Our{' '}
                <Text component="span" className={classes.highlight} inherit>
                  Solution
                </Text>
              </Title>

              {solutions.map((solution, index) => (
                <Card key={index} className={classes.card} mt="md">
                  <ThemeIcon
                    size="lg"
                    radius="md"
                    variant="light"
                    color="blue"
                    className={classes.icon}
                  >
                    <IconCheck size={20} />
                  </ThemeIcon>
                  <Text fw={700} fz="lg" mb={5}>
                    {solution.title}
                  </Text>
                  <Text c="dimmed" fz="sm">
                    {solution.description}
                  </Text>
                </Card>
              ))}
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
} 
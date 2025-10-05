import { Container, Title, Text, Grid, Card, ThemeIcon } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './Problems.module.css';

const problems = [
  {
    title: "High Fund Launch Costs",
    description: "Traditional fund setup requires significant upfront investment in infrastructure, compliance, and operations, making it difficult for new fund managers to enter the market."
  },
  {
    title: "Manual Operations Burden",
    description: "Fund managers spend excessive time on manual NAV calculations, compliance reporting, and investor onboarding, reducing focus on investment strategy."
  },
  {
    title: "Limited Market Access",
    description: "Traditional fund structures make it difficult to reach global investors and offer innovative products like tokenized funds or fractional ownership."
  },
  {
    title: "Regulatory Complexity",
    description: "Different regulatory requirements across regions (Nepal, Singapore, etc.) create significant overhead and compliance risks for fund managers."
  },
  {
    title: "Technology Gap",
    description: "Existing softwares lack modern features like blockchain integration, real-time reporting, and automated compliance checks."
  }
];

const solutions = [
  {
    title: "Fund-as-a-Service Infrastructure",
    description: "Launch funds with minimal upfront costs using our modular, compliant infrastructure. Pay-as-you-go model for operational services."
  },
  {
    title: "Automated Fund Operations",
    description: "Reduce manual work with automated NAV calculations, compliance reporting, and investor onboarding. Focus on what matters - investment strategy."
  },
  {
    title: "Global Fund Distribution",
    description: "Reach investors worldwide through our hybrid software, offering both traditional and tokenized fund structures with fractional ownership."
  },
  {
    title: "Built-in Compliance",
    description: "Pre-configured compliance modules for Nepal and Singapore markets, with automated regulatory reporting and risk monitoring."
  },
  {
    title: "Modern Tech Stack",
    description: "Leverage blockchain technology for tokenization, real-time reporting, and smart contract automation while maintaining traditional fund capabilities."
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
                  Current Fund Management
                </Text>{' '}
                Challenges
              </Title>

              <Text c="dimmed" mt="md" mb="xl">
                Fund managers face significant barriers in launching and managing funds efficiently. 
                Our software addresses these challenges head-on with modern solutions.
              </Text>

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
                AAMA's{' '}
                <Text component="span" className={classes.highlight} inherit>
                  Solution
                </Text>
              </Title>

              <Text c="dimmed" mt="md" mb="xl">
                Our software combines traditional fund management with modern technology to solve 
                these challenges and enable efficient fund operations.
              </Text>

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
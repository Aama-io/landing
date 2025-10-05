import { Container, Title, Text, ThemeIcon, Group, Stack, SimpleGrid, Box, Paper, Badge } from '@mantine/core';
import { 
  IconCheck,
  IconFileReport,
  IconCalculator,
  IconCloud,
  IconDeviceMobile,
  IconUpload,
  IconShieldCheck
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './PainPoints.module.css';

export function PainPoints() {
  const challenges = [
    {
      id: 'regulatory',
      title: 'Heavy Regulatory Burden',
      description: "MAS compliance, IFRS reporting, KYC/AML checks — constant, expensive, time-consuming.",
      icon: IconFileReport,
      color: 'red',
      solution: 'Built-in IFRS accounting, automated KYC & MAS reporting.'
    },
    {
      id: 'operations',
      title: 'Manual Operations',
      description: 'Spreadsheets, reconciliation errors, and admin backlogs slow down your growth.',
      icon: IconCalculator,
      color: 'orange',
      solution: 'Automated NAV calculation, reconciliation, and investor reporting.'
    },
    {
      id: 'software',
      title: 'Expensive Software',
      description: 'Enterprise systems are overpriced and out of reach for boutique firms.',
      icon: IconCloud,
      color: 'yellow',
      solution: 'Modern cloud software at 90% lower cost than enterprise solutions.'
    },
    {
      id: 'investor',
      title: 'Poor Investor Experience',
      description: "Today's investors expect mobile access, not email PDFs and delays.",
      icon: IconDeviceMobile,
      color: 'blue',
      solution: 'Mobile app & real-time investor dashboard for a digital-first experience.'
    },
    {
      id: 'scalability',
      title: 'Scaling Bottlenecks',
      description: 'As AUM grows, so do errors, costs, and compliance risks.',
      icon: IconUpload,
      color: 'indigo',
      solution: 'Automated back-office to scale without scaling your team.'
    },
    {
      id: 'security',
      title: 'Security & Audit Risks',
      description: "Data breaches or compliance gaps can cost you your license.",
      icon: IconShieldCheck,
      color: 'violet',
      solution: 'VAPT-certified security and fully auditable architecture.'
    }
  ];

  return (
    <Box className={classes.wrapper}>
      <Container size="lg">
        <motion.div 
          className={classes.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge size="lg" color="blue" variant="filled" mb="md" className={classes.headerBadge}>
            Singapore Fund Managers
          </Badge>
          <Title className={classes.title} size="3.2rem">
            We know the Problems You Face <br/><span className={classes.highlight}> We have solutions</span>
          </Title>
          <Box className={classes.titleUnderline} mx="auto" />
          <Text className={classes.description} size="xl" maw={800} mx="auto" mt="xl">
            Fund management in Singapore is heavily regulated, operationally intense, and increasingly tech-driven. 
            Yet boutique firms lack affordable tools built for their needs.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={30} mt={60}>
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <Paper 
                  className={classes.painPointCard} 
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                >
                  <Group gap="md" mb="md">
                    <ThemeIcon
                      radius="xl"
                      size={50}
                      variant="light"
                      color={challenge.color}
                      className={classes.painPointIcon}
                    >
                      <challenge.icon size={22} stroke={1.8} />
                    </ThemeIcon>
                    <Box>
                      <Title order={3} fw={600} size="h4" className={classes.painPointTitle}>
                        {challenge.title}
                      </Title>
                    </Box>
                  </Group>
                  
                  <Text size="md" c="dimmed" className={classes.painPointDescription}>
                    {challenge.description}
                  </Text>
                  
                  <Box className={classes.solutionBox}>
                    <Group gap="xs">
                      <Text fw={500} size="sm" className={classes.solutionText}>
                        {challenge.solution}
                      </Text>
                    </Group>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>
      </Container>
    </Box>
  );
} 
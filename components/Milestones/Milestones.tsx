import { Container, Title, Text, Timeline, ThemeIcon, Badge, Box, Paper, Group, Stack, Button } from '@mantine/core';
import { IconRocket, IconChartLine, IconBuildingBank, IconCoin, IconWorld, IconCalendarEvent, IconArrowRight, IconCheck, IconBolt, IconBackhoe } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './Milestones.module.css';

// Updated milestones with more detailed information
const milestones = [
  { 
    date: "Q1 2024", 
    title: "Launch in Nepal",
    description: "Successfully deployed our platform with licensed fund managers in Nepal, establishing AAMA as a pioneer in fund administration technology in the region.",
    details: [
      "Onboarded first institutional clients",
      "Deployed core fund management platform",
      "Established local support team",
      "Received regulatory approval"
    ],
    icon: IconBuildingBank,
    isActive: true,
    color: "blue"
  },
  { 
    date: "Q3 2024", 
    title: "Platform Enhancement", 
    description: "Major platform upgrade with advanced analytics, expanded reporting capabilities and enhanced investor portal features.",
    details: [
      "Improved NAV calculation engine",
      "Enhanced reporting dashboard",
      "Mobile app for investors",
      "API expansion for third-party integrations"
    ],
    icon: IconChartLine,
    isActive: false,
    color: "green",
    inProgress: false
  },
  { 
    date: "Q2 2025", 
    title: "Singapore Expansion", 
    description: "Strategically expanding operations to Singapore with MAS compliance to serve fund managers throughout Southeast Asia.",
    details: [
      "Opening Singapore headquarters",
      "Securing regulatory approvals",
      "Establishing local partnerships",
      "Extending service to regional clients"
    ],
    icon: IconWorld,
    isActive: false,
    color: "indigo",
    inProgress: true
  },
  { 
    date: "Q4 2025", 
    title: "On-Chain Services Launch", 
    description: "Introducing our blockchain capabilities, enabling tokenization, fractional ownership and enhanced liquidity options.",
    details: [
      "Smart contract deployment platform",
      "Tokenization of traditional assets",
      "Automated distributions and reconciliations",
      "Enhanced transparency and reporting"
    ],
    icon: IconCoin,
    isActive: false,
    color: "violet"
  },
  { 
    date: "2026", 
    title: "Global Ecosystem", 
    description: "Building a comprehensive ecosystem for fund management with global reach, serving diverse asset classes across multiple markets.",
    details: [
      "Multi-chain compatibility",
      "Global compliance framework",
      "AI-powered investment insights",
      "Expanded asset class support"
    ],
    icon: IconRocket,
    isActive: false,
    color: "grape"
  }
];

export function Milestones() {
  // Calculate the active index for the timeline
  const activeIndex = milestones.findIndex(m => m.inProgress) !== -1 
    ? milestones.findIndex(m => m.inProgress) 
    : milestones.filter(m => m.isActive).length - 1;

  return (
    <div className={classes.wrapper}>
      <div className={classes.pattern}>
        <div className={classes.patternOverlay}></div>
      </div>
      <Container size="lg" className={classes.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Badge size="lg" radius="sm" className={classes.badge} mb="md">Our Journey</Badge>
          <Title className={classes.sectionTitle}>
            From <span className={classes.accentText}>Nepal</span> to <span className={classes.accentText}>Global</span> Markets
          </Title>
          <Text className={classes.sectionDescription} c="dimmed">
            Charting our path to revolutionize fund management with innovative technology and strategic expansion
          </Text>
        </motion.div>

        <Timeline active={activeIndex} bulletSize={34} lineWidth={3} className={classes.timeline}>
          {milestones.map((milestone, index) => (
            <Timeline.Item
              key={index}
              bullet={
                <ThemeIcon size={34} radius={34} className={`${classes.bulletWrapper} ${milestone.isActive ? classes.activeBullet : ''}`} 
                  style={{ background: milestone.inProgress ? `linear-gradient(135deg, var(--mantine-color-${milestone.color}-5) 0%, var(--mantine-color-${milestone.color}-7) 100%)` : undefined }}>
                  {milestone.isActive ? <IconCheck size={18} /> : milestone.inProgress ? <IconBolt size={18} /> : <milestone.icon size={18} />}
                </ThemeIcon>
              }
              title={
                <Group gap="xs" mt={6}>
                  <Text className={classes.timelineTitle}>{milestone.title}</Text>
                  {milestone.isActive && (
                    <Badge size="sm" variant="filled" color="green">Completed</Badge>
                  )}
                  {milestone.inProgress && (
                    <Badge size="sm" variant="filled" color="blue">In Progress</Badge>
                  )}
                  {!milestone.isActive && !milestone.inProgress && (
                    <Badge size="sm" variant="light" color="gray">Upcoming</Badge>
                  )}
                </Group>
              }
            >
              <Box mb={8}>
                <Text className={classes.timelineYear}>
                  <IconCalendarEvent size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  {milestone.date}
                </Text>
              </Box>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Paper 
                  className={`${classes.timelineContent} ${!milestone.isActive && !milestone.inProgress ? classes.comingSoon : ''} ${milestone.inProgress ? classes.inProgress : ''}`}
                  withBorder={milestone.isActive || milestone.inProgress}
                  p="xl"
                  style={milestone.inProgress ? { borderColor: `var(--mantine-color-${milestone.color}-5)` } : undefined}
                >
                  <Text size="md" fw={500} mb="md">{milestone.description}</Text>
                  
                  <Stack gap="xs" mb="md">
                    {milestone.details.map((detail, idx) => (
                      <Group key={idx} gap="xs" align="flex-start">
                        <ThemeIcon size={20} radius="xl" color={milestone.isActive ? "green" : milestone.inProgress ? milestone.color : "gray"} variant={!milestone.isActive && !milestone.inProgress ? "light" : "filled"}>
                          <IconCheck size={12} />
                        </ThemeIcon>
                        <Text size="sm">{detail}</Text>
                      </Group>
                    ))}
                  </Stack>
                  
                  {milestone.inProgress && (
                    <Button variant="light" color={milestone.color} size="xs" rightSection={<IconArrowRight size={14} />}>
                      View Progress
                    </Button>
                  )}
                  
                  {!milestone.isActive && !milestone.inProgress && <div className={classes.glowOrb}></div>}
                </Paper>
              </motion.div>
            </Timeline.Item>
          ))}
        </Timeline>

        <Box mt={60} className={classes.futureTeaser}>
          <Text ta="center" fz="lg" fw={600} c="dimmed">
            And this is just the beginning...
          </Text>
        </Box>
      </Container>
    </div>
  );
} 
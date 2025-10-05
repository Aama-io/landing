import { Container, Title, Text, SimpleGrid, Box, ThemeIcon } from '@mantine/core';
import { IconTrendingUp, IconUsers, IconBuilding, IconClock } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './Metrics.module.css';

export function Metrics() {
  const metrics = [
    {
      icon: IconTrendingUp,
      value: '$500M+',
      label: 'Assets Under Management',
      description: 'Trusted by fund managers worldwide'
    },
    {
      icon: IconUsers,
      value: '2,000+',
      label: 'Active Investors',
      description: 'Across multiple fund types'
    },
    {
      icon: IconBuilding,
      value: '50+',
      label: 'Funds Launched',
      description: 'From startup to enterprise'
    },
    {
      icon: IconClock,
      value: '80%',
      label: 'Time Reduction',
      description: 'In operational overhead'
    }
  ];

  return (
    <div className={classes.wrapper}>
      <Container size="lg" py={100}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={classes.header}
        >
          <Title order={2} className={classes.title} ta="center">
            Proven Results That Matter
          </Title>
          <Text className={classes.description} ta="center" mt="md">
            Join the fund managers who've already transformed their operations with AAMA
          </Text>
        </motion.div>

        <SimpleGrid cols={{ base: 2, md: 4 }} spacing={60} mt={60}>
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={classes.metric}
            >
              <Box ta="center">
                <ThemeIcon
                  size={60}
                  radius="xl"
                  className={classes.icon}
                  mx="auto"
                >
                  <metric.icon size={28} stroke={1.5} />
                </ThemeIcon>

                <Text className={classes.value} mt="md">
                  {metric.value}
                </Text>

                <Text className={classes.label} mt={4}>
                  {metric.label}
                </Text>

                <Text className={classes.metricDescription} mt={4}>
                  {metric.description}
                </Text>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}
import { Container, Title, Text, Group, Box, ThemeIcon, Badge } from '@mantine/core';
import { IconBuildingBank, IconTrendingUp, IconShield, IconUsers } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './TrustedBy.module.css';

export function TrustedBy() {
  const trustFactors = [
    {
      icon: IconBuildingBank,
      label: "Enterprise Grade",
      description: "Bank-level security & compliance"
    },
    {
      icon: IconShield,
      label: "Regulatory Compliant",
      description: "MAS, SEC & EU regulatory standards"
    },
    {
      icon: IconTrendingUp,
      label: "Proven Track Record",
      description: "Managing $500M+ in assets"
    },
    {
      icon: IconUsers,
      label: "Industry Expertise",
      description: "20+ years fund management experience"
    }
  ];

  return (
    <div className={classes.wrapper}>
      <Container size="lg" py={80}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge
            size="lg"
            radius="sm"
            variant="light"
            className={classes.badge}
            mx="auto"
            display="block"
            w="fit-content"
          >
            Enterprise-Grade Platform
          </Badge>

          <Title order={2} className={classes.title} ta="center" mt="md">
            Trusted by Fund Managers Worldwide
          </Title>

          <Text className={classes.description} ta="center" mt="md" maw={600} mx="auto">
            Join leading investment firms who rely on AAMA's comprehensive fund management platform
            to streamline operations, ensure compliance, and deliver exceptional investor experiences.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Group justify="center" gap={60} mt={60}>
            {trustFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className={classes.trustFactor}
              >
                <ThemeIcon
                  size={60}
                  radius="xl"
                  variant="light"
                  className={classes.icon}
                >
                  <factor.icon size={28} stroke={1.5} />
                </ThemeIcon>
                <Box mt="md" ta="center">
                  <Text fw={600} size="sm" className={classes.factorLabel}>
                    {factor.label}
                  </Text>
                  <Text size="xs" c="dimmed" mt={4}>
                    {factor.description}
                  </Text>
                </Box>
              </motion.div>
            ))}
          </Group>
        </motion.div>
      </Container>
    </div>
  );
} 
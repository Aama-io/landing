import { Container, Title, Text, Timeline, ThemeIcon, Grid, Card, Group } from '@mantine/core';
import { IconCheck, IconTrendingUp, IconUsers, IconReportMoney, IconChartBar, IconAward, IconCertificate } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './Product.module.css';

export function Product() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Title className={classes.title} ta="center">
          <Text component="span" className={classes.highlight} inherit>
            AAMA Fund Management
          </Text>{' '}
          and{' '}
          <Text component="span" className={classes.highlight} inherit>
            Investment Platform
          </Text>
        </Title>

        <Container size="md" mt="xl">
          <Timeline active={-1} bulletSize={24} lineWidth={2}>
            <Timeline.Item
              bullet={<ThemeIcon size={24} radius="xl" color="blue"><IconCheck size={16} /></ThemeIcon>}
              title="Fund Management & Accounting Platform"
              className={classes.item}
            >
              <Text c="dimmed" size="sm">Comprehensive platform supporting both open and closed-end funds</Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<ThemeIcon size={24} radius="xl" color="blue"><IconCheck size={16} /></ThemeIcon>}
              title="Investment Platform"
              className={classes.item}
            >
              <Text c="dimmed" size="sm">Manage SIP & lump sum investments in mutual funds</Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<ThemeIcon size={24} radius="xl" color="blue"><IconCheck size={16} /></ThemeIcon>}
              title="Scalable Infrastructure"
              className={classes.item}
            >
              <Text c="dimmed" size="sm">Ready for Singapore expansion with MAS compliance standards</Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<ThemeIcon size={24} radius="xl" color="blue"><IconCheck size={16} /></ThemeIcon>}
              title="Future-Ready"
              className={classes.item}
            >
              <Text c="dimmed" size="sm">Planned blockchain integration for enhanced global accessibility</Text>
            </Timeline.Item>
          </Timeline>
        </Container>

        <Title order={2} className={classes.subtitle} ta="center" mt={80}>
          Market Success & Industry Impact
        </Title>

        <Container size="lg" mt="xl">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className={classes.impactCard}>
                  <Group>
                    <ThemeIcon size={48} radius="md" className={classes.impactIcon}>
                      <IconTrendingUp size={24} />
                    </ThemeIcon>
                    <div>
                      <Text fz="lg" fw={700} className={classes.impactTitle}>Market Leadership in Nepal</Text>
                      <Text fz="sm" c="dimmed">Powering 80% of Nepal's mutual fund industry</Text>
                      <Text fz="sm" c="dimmed" mt={5}>$500M+ Assets Under Management</Text>
                    </div>
                  </Group>
                </Card>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={classes.impactCard}>
                  <Group>
                    <ThemeIcon size={48} radius="md" className={classes.impactIcon}>
                      <IconChartBar size={24} />
                    </ThemeIcon>
                    <div>
                      <Text fz="lg" fw={700} className={classes.impactTitle}>Operational Excellence</Text>
                      <Text fz="sm" c="dimmed">NAV calculation reduced to 30 minutes</Text>
                      <Text fz="sm" c="dimmed" mt={5}>99.9% reconciliation accuracy</Text>
                    </div>
                  </Group>
                </Card>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className={classes.impactCard}>
                  <Group>
                    <ThemeIcon size={48} radius="md" className={classes.impactIcon}>
                      <IconUsers size={24} />
                    </ThemeIcon>
                    <div>
                      <Text fz="lg" fw={700} className={classes.impactTitle}>Growing Partner Network</Text>
                      <Text fz="sm" c="dimmed">5 active fund managers + 4 in pipeline</Text>
                      <Text fz="sm" c="dimmed" mt={5}>15+ mutual fund schemes managed</Text>
                    </div>
                  </Group>
                </Card>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className={classes.impactCard}>
                  <Group>
                    <ThemeIcon size={48} radius="md" className={classes.impactIcon}>
                      <IconReportMoney size={24} />
                    </ThemeIcon>
                    <div>
                      <Text fz="lg" fw={700} className={classes.impactTitle}>Cost Efficiency</Text>
                      <Text fz="sm" c="dimmed">40% reduction in operational costs</Text>
                      <Text fz="sm" c="dimmed" mt={5}>Automated compliance & reporting</Text>
                    </div>
                  </Group>
                </Card>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className={classes.impactCard}>
                  <Group>
                    <ThemeIcon size={48} radius="md" className={classes.impactIcon}>
                      <IconAward size={24} />
                    </ThemeIcon>
                    <div>
                      <Text fz="lg" fw={700} className={classes.impactTitle}>Investor Impact</Text>
                      <Text fz="sm" c="dimmed">100,000+ retail investors onboarded</Text>
                      <Text fz="sm" c="dimmed" mt={5}>60% increase in SIP adoption</Text>
                    </div>
                  </Group>
                </Card>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className={classes.impactCard}>
                  <Group>
                    <ThemeIcon size={48} radius="md" className={classes.impactIcon}>
                      <IconCertificate size={24} />
                    </ThemeIcon>
                    <div>
                      <Text fz="lg" fw={700} className={classes.impactTitle}>Regulatory Recognition</Text>
                      <Text fz="sm" c="dimmed">SEBON approved in Nepal</Text>
                      <Text fz="sm" c="dimmed" mt={5}>Singapore MAS compliance ready</Text>
                    </div>
                  </Group>
                </Card>
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
    </div>
  );
} 
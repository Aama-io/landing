import { Container, Title, Text, SimpleGrid, Button, Group, Anchor } from '@mantine/core';
import {
  IconBuildingFactory2,
  IconBriefcase,
  IconFileReport,
  IconArrowRight,
  IconHandshake,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import classes from './PartnershipServices.module.css';

const services = [
  {
    icon: IconBuildingFactory2,
    title: 'Single-Asset SPVs',
    description:
      'Structure a dedicated Special Purpose Vehicle for a single co-investment or deal. Legal formation, MAS compliance, and fund admin on aama.io — handled end to end.',
  },
  {
    icon: IconBriefcase,
    title: 'VCC for Close-Ended Funds',
    description:
      'Form a Variable Capital Company for private equity, venture capital, or real estate close-ended strategies — with robust sub-fund segregation and tax efficiency.',
  },
  {
    icon: IconFileReport,
    title: 'Fund Formation Services',
    description:
      'Full-service fund setup from structure selection to MAS registration. Once formed, your fund transitions directly onto aama.io\'s administration platform.',
  },
];

export function PartnershipServices() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={classes.headerGroup}
        >
          <div className={classes.partnerBadge}>
            <IconHandshake size={13} />
            In partnership with Astria Consulting
          </div>
          <Title className={classes.sectionTitle}>
            Now offering fund formation services
          </Title>
          <Text className={classes.sectionDescription}>
            aama.io&apos;s end-to-end fund management now starts from day zero. We partner with{' '}
            <Anchor
              href="https://astriaconsulting.com"
              target="_blank"
              rel="noopener noreferrer"
              fw={600}
              c="violet"
            >
              Astria Consulting
            </Anchor>{' '}
            to handle fund formation — then your fund runs on our platform from launch.
          </Text>
        </motion.div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={classes.serviceCard}>
                <div className={classes.iconBox}>
                  <service.icon size={22} />
                </div>
                <Title order={4} className={classes.cardTitle}>
                  {service.title}
                </Title>
                <Text className={classes.cardDescription}>
                  {service.description}
                </Text>
                <Link href="/services" className={classes.cardLink}>
                  Learn more <IconArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </SimpleGrid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className={classes.bottomBar}>
            <div className={classes.bottomBarText}>
              <div className={classes.bottomBarTitle}>
                Formation → Administration. One seamless journey.
              </div>
              <div className={classes.bottomBarSub}>
                Powered by aama.io · In partnership with Astria Consulting
              </div>
            </div>
            <Group gap="md">
              <Button
                component={Link}
                href="/services"
                size="md"
                className={classes.bottomBarButton}
                rightSection={<IconArrowRight size={16} />}
              >
                View Services
              </Button>
              <Button
                component={Link}
                href="/contact"
                size="md"
                variant="outline"
                className={classes.bottomBarOutline}
              >
                Talk to Us
              </Button>
            </Group>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

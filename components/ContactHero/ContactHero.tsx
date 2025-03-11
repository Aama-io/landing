import { Container, Text, Title, Group, Button, Stack, Box } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin, IconClock } from '@tabler/icons-react';
import classes from './ContactHero.module.css';

export function ContactHero() {
  return (
    <Box className={classes.wrapper}>
      <Container size="lg" py="xl">
        <Stack align="center" gap="xl">
          <Title className={classes.title}>Get in Touch</Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            Have questions about our fund management solutions? Our team is ready to assist you 24/7.
          </Text>
          
          <Group gap="xl" mt="xl" wrap="wrap" justify="center">
          
            <Stack align="center" className={classes.contactItem}>
              <IconMail size={32} stroke={1.5} className={classes.icon} />
              <Text size="lg" fw={500}>Email</Text>
              <Text component="a" href="mailto:contact@aama.io" c="dimmed">
                contact@aama.io
              </Text>
            </Stack>

            <Stack align="center" className={classes.contactItem}>
              <IconMapPin size={32} stroke={1.5} className={classes.icon} />
              <Text size="lg" fw={500}>Office</Text>
              <Text c="dimmed" ta="center">
              Robinson Road, #14-04, <br />
              Singapore (068914)
              </Text>
            </Stack>

            <Stack align="center" className={classes.contactItem}>
              <IconClock size={32} stroke={1.5} className={classes.icon} />
              <Text size="lg" fw={500}>Working Hours</Text>
              <Text c="dimmed" ta="center">
                Mon - Fri: 9AM - 6PM<br />
                24/7 Online Support
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
} 
import { Container, Text, Title, Group, Button, Stack, Box, Badge, Grid, Center } from '@mantine/core';
import { IconPhone, IconMail, IconMapPin, IconClock, IconArrowRight, IconCalendar } from '@tabler/icons-react';
import classes from './ContactHero.module.css';
import Link from 'next/link';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from 'react';

export function ContactHero() {
  useEffect(() => {
    (async function() {
      const cal = await getCalApi();
      cal("ui", {
        styles: {
          branding: { brandColor: "#0070f3" }
        }
      });
    })();
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Container size="lg" py="xl" className={classes.container}>
        <Grid gutter={30} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Badge 
                size="lg" 
                radius="sm" 
                variant="gradient" 
                gradient={{ from: 'blue', to: 'cyan' }}
                className={classes.sectionBadge}
              >
                Contact Us
              </Badge>
              
              <Title className={classes.title}>
                Ready to Transform Your Fund Management?
              </Title>
              
              <Text size="lg" className={classes.description} maw={600}>
                Have questions about our fund management solutions? Our team is ready to assist you with personalized support.
              </Text>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Center>
              <Group gap="lg" align="flex-start">
                <div className={classes.contactItem}>
                  <IconMail size={32} stroke={1.5} className={classes.icon} />
                  <Text fw={700} mt="md">Email Us</Text>
                  <Text component="a" href="mailto:contact@aama.io" className={classes.contactLink}>
                    contact@aama.io
                  </Text>
                </div>

                <div className={classes.contactItem}>
                  <IconCalendar size={32} stroke={1.5} className={classes.icon} />
                  <Text fw={700} mt="md">Schedule a Meeting</Text>
                    <Text
                      component="a"
                      href="https://cal.com/aamaio/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      color="blue"
                      size="sm"
                      className={classes.contactLink}
                    >
                      Book a time
                    </Text>
                </div>
              </Group>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
} 
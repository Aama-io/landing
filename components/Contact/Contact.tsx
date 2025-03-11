import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  Container,
  Paper,
} from '@mantine/core';
import { IconMail, IconMessageCircle, IconBrandTwitter } from '@tabler/icons-react';
import classes from './Contact.module.css';

const social = [
  {
    title: 'Email',
    description: 'contact@aama.io',
    icon: IconMail,
  },
  {
    title: 'Twitter',
    description: '@aama_io',
    icon: IconBrandTwitter,
  },
  {
    title: 'Telegram',
    description: 't.me/aama_community',
    icon: IconMessageCircle,
  },
];

export function Contact() {
  return (
    <Container size="lg" py="xl">
      <Paper withBorder radius="md" className={classes.wrapper}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          <div>
            <Title className={classes.title}>Get in touch</Title>
            <Text c="dimmed" className={classes.description}>
              Leave your email and we'll get back to you within 24 hours
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }} mt={30}>
              {social.map((item) => (
                <div key={item.title}>
                  <Group wrap="nowrap">
                    <item.icon
                      size={24}
                      className={classes.icon}
                      stroke={1.5}
                    />
                    <div>
                      <Text size="xs" c="dimmed">
                        {item.title}
                      </Text>
                      <Text className={classes.socialLink}>
                        {item.description}
                      </Text>
                    </div>
                  </Group>
                </div>
              ))}
            </SimpleGrid>
          </div>

          <div className={classes.form}>
            <TextInput
              label="Your name"
              placeholder="Your name"
              required
            />
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              mt="md"
            />
            <Textarea
              required
              label="Your message"
              placeholder="I want to know more about..."
              minRows={4}
              mt="md"
            />

            <Group justify="flex-end" mt="md">
              <Button 
                variant="gradient" 
                gradient={{ from: 'blue', to: 'cyan' }}
                size="md"
              >
                Send message
              </Button>
            </Group>
          </div>
        </SimpleGrid>
      </Paper>
    </Container>
  );
}

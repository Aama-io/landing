import {
  Container,
  Title,
  Text,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  Card,
  ThemeIcon,
} from '@mantine/core';
import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import classes from './ContactSection.module.css';

const contactInfo = [
  {
    title: 'Email',
    description: 'hello@aama.io',
    icon: IconMail,
  },
  {
    title: 'Phone',
    description: '+1 (555) 123-4567',
    icon: IconPhone,
  },
  {
    title: 'Address',
    description: 'Singapore',
    icon: IconMapPin,
  },
];

export function ContactSection() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          <div>
            <Title className={classes.title}>Get in touch</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              Leave your email and we'll get back to you within 24 hours
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={30}>
              {contactInfo.map((info, index) => (
                <Card key={index} withBorder padding="md" radius="md">
                  <Group gap="xs">
                    <ThemeIcon
                      size={30}
                      radius="md"
                      variant="light"
                      color="blue"
                    >
                      <info.icon size={18} />
                    </ThemeIcon>
                    <Text size="xs" fw={700} className={classes.cardTitle}>
                      {info.title}
                    </Text>
                  </Group>
                  <Text className={classes.cardDescription} mt="sm">
                    {info.description}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </div>

          <Card withBorder radius="md" className={classes.formCard}>
            <form>
              <TextInput
                label="Your name"
                placeholder="John Doe"
                required
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />
              <TextInput
                label="Your email"
                placeholder="hello@example.com"
                required
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />
              <TextInput
                label="Subject"
                placeholder="I want to know about..."
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />
              <Textarea
                label="Your message"
                placeholder="Please include all relevant information"
                minRows={4}
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />

              <Group justify="flex-end" mt="md">
                <Button size="md">Send message</Button>
              </Group>
            </form>
          </Card>
        </SimpleGrid>
      </Container>
    </div>
  );
} 
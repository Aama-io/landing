import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Container,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { ContactIconsList } from './ContactIcons';
import classes from './Contact.module.css';

const social = [
  { icon: IconBrandTwitter, label: 'Twitter' },
  { icon: IconBrandYoutube, label: 'YouTube' },
  { icon: IconBrandInstagram, label: 'Instagram' },
];

export function Contact() {
  const icons = social.map(({ icon: Icon, label }, index) => (
    <ActionIcon
      key={index}
      size={28}
      className={classes.social}
      variant="transparent"
      aria-label={label}
    >
      <Icon size={22} stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <Container size="lg" py="xl" id="contact">
      <div className={classes.wrapper}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          {/* Left Section */}
          <div>
            <Title className={classes.title}>Get in Touch</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              Have questions about our boilerplate? Drop us a message and we’ll respond within 24
              hours.
            </Text>

            <ContactIconsList />

            <Group mt="xl">{icons}</Group>
          </div>

          {/* Right Section */}
          <div className={classes.form}>
            <TextInput
              label="Your Email"
              placeholder="you@example.com"
              required
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <TextInput
              label="Full Name"
              placeholder="Jane Doe"
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <Textarea
              required
              label="Message"
              placeholder="I’m interested in your boilerplate. Please tell me more."
              minRows={4}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <Group p="right" mt="md">
              <Button className={classes.control}>Submit</Button>
            </Group>
          </div>
        </SimpleGrid>
      </div>
    </Container>
  );
}

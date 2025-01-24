import {
  IconLayoutDashboard,
  IconLock,
  IconSettings,
  IconCode,
  IconDevices,
  IconUserPlus,
} from '@tabler/icons-react';
import {
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import classes from './Feature.module.css';

const mockdata = [
  {
    title: 'Prebuilt Landing Pages',
    description:
      'Get started quickly with beautiful, fully customizable landing pages designed to make your product stand out.',
    icon: IconLayoutDashboard,
  },
  {
    title: 'Authentication System',
    description:
      'Built-in authentication pages with secure login, registration, and password recovery workflows.',
    icon: IconLock,
  },
  {
    title: 'Responsive Design',
    description:
      'Seamlessly responsive across devices, ensuring your application looks stunning on desktops, tablets, and mobile phones.',
    icon: IconDevices,
  },
  {
    title: 'Developer-Friendly Codebase',
    description:
      'Clean, modular code that follows best practices, making it easy for developers to customize and extend.',
    icon: IconCode,
  },
  {
    title: 'User Management',
    description:
      'Includes ready-to-use user management features, such as profile pages and role-based access control.',
    icon: IconUserPlus,
  },
  {
    title: 'Extensible Components',
    description:
      'Comprehensive set of reusable components and utilities to accelerate development and maintain consistency.',
    icon: IconSettings,
  },
];

export function Feature() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon size={50} stroke={2} color={theme.colors.blue[6]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl" id="features" my="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Accelerate Your Development
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Build Fast, Beautiful, and Secure Applications
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Our Mantine UI + Next.js boilerplate is crafted to give developers a head start, combining
        aesthetics, performance, and functionality.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}

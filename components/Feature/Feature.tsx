import {
  IconBrain,
  IconChartBar,
  IconCloudUpload,
  IconCode,
  IconDeviceAnalytics,
  IconSearch,
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
    title: 'AI-Powered Predictions',
    description:
      'Leverage our cutting-edge AI solutions for business forecasting, helping you make data-driven decisions with accuracy and confidence.',
    icon: IconChartBar,
  },
  {
    title: 'Job Matching Algorithms',
    description:
      'Our intelligent job matching technology connects candidates with opportunities that align with their skills and career aspirations.',
    icon: IconSearch,
  },
  {
    title: 'Research & Development',
    description:
      'Dedicated to innovating in AI and machine learning, exploring solutions that transform industries and drive efficiency.',
    icon: IconBrain,
  },
  {
    title: 'Advanced Analytics',
    description:
      'Gain actionable insights with our advanced data analytics services, empowering you to understand trends and improve decision-making.',
    icon: IconDeviceAnalytics,
  },
  {
    title: 'Custom Software Development',
    description:
      'Build tailor-made applications that meet your specific needs and help you achieve your business objectives with precision.',
    icon: IconCode,
  },
  {
    title: 'Cloud Integration Services',
    description:
      'Seamlessly migrate to the cloud with our integration services, ensuring security, scalability, and efficiency for your operations.',
    icon: IconCloudUpload,
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
          Innovating the Future
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Pioneering AI Solutions for Tomorrow's Challenges
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        At UXQode, we are at the forefront of technology, developing AI products that redefine the
        way businesses operate and people connect.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}

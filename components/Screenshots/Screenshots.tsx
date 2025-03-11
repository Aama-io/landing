import { useState } from 'react';
import { Container, Title, Text, Group, Badge, Image, Modal } from '@mantine/core';
import { IconZoomIn } from '@tabler/icons-react';
import classes from './Screenshots.module.css';

const screenshots = [
  {
    title: 'Dashboard Overview',
    description: 'Complete fund management dashboard with real-time analytics',
    image: '/screenshots/dashboard.png',
    category: 'Matrix Mutual',
  },
  {
    title: 'Portfolio Management',
    description: 'Advanced portfolio tracking and management interface',
    image: '/screenshots/portfolio.png',
    category: 'Capital Engine',
  },
  {
    title: 'Fund Analytics',
    description: 'Detailed fund performance and analytics visualization',
    image: '/screenshots/analytics.png',
    category: 'Matrix Mutual',
  },
  {
    title: 'Investment Portal',
    description: 'User-friendly investment interface for SIP and lump sum investments',
    image: '/screenshots/investment.png',
    category: 'Capital Engine',
  },
  {
    title: 'Compliance Dashboard',
    description: 'Comprehensive compliance and reporting system',
    image: '/screenshots/compliance.png',
    category: 'Matrix Mutual',
  },
  {
    title: 'Token Management',
    description: 'Blockchain integration and token management interface',
    image: '/screenshots/tokenization.png',
    category: 'Blockchain',
  },
];

export function Screenshots() {
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image: string) => {
    setSelectedImage(image);
    setOpened(true);
  };

  return (
    <Container size="lg" py="xl">
      <div className={classes.wrapper}>
        <Group justify="center" mb={50}>
          <Badge variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} size="lg">
            Platform Preview
          </Badge>
        </Group>

        <Title order={2} className={classes.title} ta="center" mt="sm">
          Powerful Platform, Intuitive Interface
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Experience our comprehensive fund management solution through these platform previews
        </Text>

        <div className={classes.grid}>
          {screenshots.map((screenshot, index) => (
            <div key={index} className={classes.screenshotCard}>
              <div 
                className={classes.imageWrapper}
                onClick={() => openModal(screenshot.image)}
              >
                <Image
                  src={screenshot.image}
                  alt={screenshot.title}
                  className={classes.image}
                />
                <div className={classes.overlay}>
                  <IconZoomIn size={24} />
                </div>
              </div>
              <Badge 
                variant="light" 
                color="blue" 
                className={classes.category}
              >
                {screenshot.category}
              </Badge>
              <Text size="lg" fw={500} mt="sm">
                {screenshot.title}
              </Text>
              <Text size="sm" c="dimmed" mt={4}>
                {screenshot.description}
              </Text>
            </div>
          ))}
        </div>

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          size="xl"
          padding={0}
          withCloseButton={false}
          className={classes.modal}
        >
          <Image
            src={selectedImage}
            alt="Platform Screenshot"
            fit="contain"
            className={classes.modalImage}
          />
        </Modal>
      </div>
    </Container>
  );
} 
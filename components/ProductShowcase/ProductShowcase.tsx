import { Container, Title, Text, Image, Badge, Group, ActionIcon, Modal } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import classes from './ProductShowcase.module.css';

export function ProductShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const products = [
    {
      title: 'Fund Dashboard',
      description: 'Comprehensive fund overview with real-time metrics, performance analytics, and operational insights',
      image: '/images/fund-detail.png',
      features: ['Real-time NAV', 'Performance Analytics', 'Asset Allocation']
    },
    {
      title: 'Capital Call Management',
      description: 'Streamlined capital call process with automated notifications, payment tracking, and compliance monitoring',
      image: '/images/capital-call.png',
      features: ['Automated Calls', 'Payment Tracking', 'Compliance Reports']
    },
    {
      title: 'Investor Management',
      description: 'Complete investor lifecycle management from onboarding to reporting with KYC/AML compliance',
      image: '/images/fund-investors.png',
      features: ['KYC/AML Compliance', 'Investor Portal', 'Document Management']
    },
    {
      title: 'Share Class Configuration',
      description: 'Flexible share class setup with customizable fee structures, voting rights, and distribution preferences',
      image: '/images/share-class.png',
      features: ['Fee Structures', 'Voting Rights', 'Distribution Rules']
    },
    {
      title: 'Fund Settings & Configuration',
      description: 'Comprehensive fund setup and configuration tools with regulatory compliance and audit trails',
      image: '/images/settings.png',
      features: ['Compliance Setup', 'Audit Trails', 'Risk Management']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const openImageModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  const currentProduct = products[currentSlide];

  return (
    <div className={classes.wrapper}>
      <Container size="lg" py={60}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={classes.header}
        >
          <Badge
            size="lg"
            radius="sm"
            variant="light"
            className={classes.badge}
            mx="auto"
            display="block"
            w="fit-content"
          >
            Product Showcase
          </Badge>

          <Title order={2} className={classes.title} ta="center" mt="md">
            See AAMA in Action
          </Title>

          <Text className={classes.description} ta="center" mt="md" maw={700} mx="auto">
            Experience the power of our integrated fund management platform through real product screenshots.
            Every feature is designed to simplify complex fund operations while maintaining regulatory compliance.
          </Text>
        </motion.div>

        {/* Custom Slider Layout */}
        <div className={classes.sliderContainer}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={classes.slideContent}
          >
            <div className={classes.productShowcase}>
              <div className={classes.showcaseContent}>
                <div className={classes.contentWrapper}>
                  <Title order={3} className={classes.showcaseTitle}>
                    {currentProduct.title}
                  </Title>

                  <Text className={classes.showcaseDescription}>
                    {currentProduct.description}
                  </Text>

                  <Group gap={12} mt="lg">
                    {currentProduct.features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        size="md"
                        variant="light"
                        radius="md"
                        className={classes.showcaseFeatureBadge}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </Group>
                </div>
              </div>

              <div className={classes.showcaseImageContainer}>
                <div
                  className={classes.showcaseImageWrapper}
                  onClick={() => openImageModal(currentProduct.image)}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.title}
                    className={classes.showcaseImage}
                  />
                  <div className={classes.imageOverlay}></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className={classes.sliderControls}>
            <ActionIcon
              variant="filled"
              size="lg"
              radius="xl"
              onClick={prevSlide}
              className={classes.navButton}
            >
              <IconChevronLeft size={20} />
            </ActionIcon>

            <div className={classes.indicators}>
              {products.map((_, index) => (
                <button
                  key={index}
                  className={`${classes.indicator} ${index === currentSlide ? classes.indicatorActive : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            <ActionIcon
              variant="filled"
              size="lg"
              radius="xl"
              onClick={nextSlide}
              className={classes.navButton}
            >
              <IconChevronRight size={20} />
            </ActionIcon>
          </div>
        </div>
      </Container>

      {/* Image Modal */}
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        size="90%"
        centered
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.9,
          blur: 3,
        }}
        styles={{
          content: {
            background: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <ActionIcon
            size="lg"
            radius="xl"
            variant="filled"
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: -50,
              right: -20,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#000',
              zIndex: 1000,
            }}
          >
            <IconX size={20} />
          </ActionIcon>
          <Image
            src={modalImage}
            alt="Product showcase"
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
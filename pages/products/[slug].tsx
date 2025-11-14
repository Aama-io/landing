import { Container, Title, Text, Image, Stack, Group, Badge, Button, Divider, Box, SimpleGrid, ThemeIcon, Paper, List, Accordion } from '@mantine/core';
import { IconCalendar, IconClock, IconArrowLeft, IconChevronRight, IconCheck, IconBuildingBank, IconChartBar, IconChartPie, IconShield, IconCurrencyDollar, IconActivity, IconUsers, IconWorld, IconLock, IconFileAnalytics, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import Head from 'next/head';
import { motion } from 'framer-motion';
import classes from './Product.module.css';

interface ProductData {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  heroDescription: string;
  icon: string;
  image: string;
  category: string;
  features: {
    title: string;
    description: string;
    items: string[];
  }[];
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  useCases: {
    title: string;
    description: string;
    metrics?: {
      label: string;
      value: string;
    }[];
  }[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  relatedProducts: string[];
}

// Icon mapping
const iconMap: { [key: string]: any } = {
  IconBuildingBank,
  IconChartBar,
  IconChartPie,
  IconShield,
  IconCurrencyDollar,
  IconActivity,
  IconUsers,
  IconWorld,
  IconLock,
  IconFileAnalytics,
  IconCheck
};

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/products?slug=${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Product not found');
          } else {
            setError('Failed to fetch product');
          }
          return;
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('An error occurred while fetching the product');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // Build structured data for the product
  const getStructuredData = (product: ProductData) => {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": product.title,
      "description": product.description,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "category": product.category
      },
      "provider": {
        "@type": "Organization",
        "name": "AAMA",
        "url": "https://aama.io"
      }
    };
  };

  if (loading) {
    return (
      <InnerLayout>
        <SEO
          title="Loading Product | AAMA"
          description="Please wait while we load the product information."
          ogUrl="https://aama.io/products"
        />
        <Container size="lg" py={100}>
          <Stack align="center" justify="center" gap="md">
            <Text>Loading product information...</Text>
          </Stack>
        </Container>
      </InnerLayout>
    );
  }

  if (error || !product) {
    return (
      <InnerLayout>
        <SEO
          title="Product Not Found | AAMA"
          description="The product you're looking for could not be found."
          ogUrl="https://aama.io/products"
        />
        <Container size="lg" py={100}>
          <Stack align="center" justify="center" gap="xl">
            <Title order={2}>{error || 'Product Not Found'}</Title>
            <Text c="dimmed">
              The product you are looking for might have been removed or is temporarily unavailable.
            </Text>
            <Group justify="center">
              <Button
                component={Link}
                href="/product"
                variant="light"
                leftSection={<IconArrowLeft size={20} />}
                size="lg"
              >
                Back to Products
              </Button>
            </Group>
          </Stack>
        </Container>
      </InnerLayout>
    );
  }

  const IconComponent = iconMap[product.icon] || IconBuildingBank;

  return (
    <InnerLayout>
      <SEO
        title={`${product.title} | AAMA`}
        description={product.description}
        keywords={`${product.category}, fund management software, ${product.shortTitle.toLowerCase()}`}
        ogUrl={`https://aama.io/products/${product.slug}`}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData(product)) }}
        />
      </Head>

      <div className={classes.wrapper}>
        {/* Hero Section */}
        <div className={classes.heroSection}>
          <Container size="lg">
            <Group mb="lg">
              <Button
                component={Link}
                href="/product"
                variant="subtle"
                leftSection={<IconArrowLeft size={16} />}
                size="sm"
              >
                Back to Products
              </Button>
            </Group>

            <Stack gap={0} mb="md">
              <Group gap="xs">
                <Link href="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Text size="sm" c="dimmed">Products</Text>
                </Link>
                <IconChevronRight size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
                <Text size="sm" c="dimmed">{product.shortTitle}</Text>
              </Group>
            </Stack>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Stack gap="xl" className={classes.heroContent}>
                <Group>
                  <ThemeIcon size={60} radius="md" variant="light" color="blue">
                    <IconComponent size={32} />
                  </ThemeIcon>
                  <Badge size="lg" variant="light">{product.category}</Badge>
                </Group>

                <Title className={classes.title}>{product.title}</Title>
                <Text size="xl" c="dimmed" maw={800}>
                  {product.heroDescription}
                </Text>

                <Group>
                  <Button
                    component={Link}
                    href="/contact"
                    size="lg"
                    rightSection={<IconArrowRight size={18} />}
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    href="/contact"
                    size="lg"
                    variant="outline"
                  >
                    Schedule Demo
                  </Button>
                </Group>
              </Stack>
            </motion.div>
          </Container>
        </div>

        {/* Benefits Section */}
        <div className={classes.benefitsSection}>
          <Container size="lg">
            <Title order={2} ta="center" mb="xl">Key Benefits</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              {product.benefits.map((benefit, index) => {
                const BenefitIcon = iconMap[benefit.icon] || IconCheck;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Paper p="md" radius="md" className={classes.benefitCard}>
                      <ThemeIcon size={50} radius="md" variant="light" mb="md">
                        <BenefitIcon size={24} />
                      </ThemeIcon>
                      <Title order={4} mb="xs">{benefit.title}</Title>
                      <Text size="sm" c="dimmed">{benefit.description}</Text>
                    </Paper>
                  </motion.div>
                );
              })}
            </SimpleGrid>
          </Container>
        </div>

        {/* Features Section */}
        <div className={classes.featuresSection}>
          <Container size="lg">
            <Title order={2} ta="center" mb="xl">Comprehensive Features</Title>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              {product.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper p="xl" radius="md" className={classes.featureCard}>
                    <Title order={3} mb="xs">{feature.title}</Title>
                    <Text size="sm" c="dimmed" mb="md">{feature.description}</Text>
                    <List
                      spacing="sm"
                      size="sm"
                      icon={
                        <ThemeIcon color="blue" size={20} radius="xl">
                          <IconCheck size={12} />
                        </ThemeIcon>
                      }
                    >
                      {feature.items.map((item, idx) => (
                        <List.Item key={idx}>{item}</List.Item>
                      ))}
                    </List>
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </div>

        {/* Use Cases Section */}
        <div className={classes.useCasesSection}>
          <Container size="lg">
            <Title order={2} ta="center" mb="xl">Use Cases</Title>
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {product.useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper p="lg" radius="md" className={classes.useCaseCard}>
                    <Title order={4} mb="xs">{useCase.title}</Title>
                    <Text size="sm" c="dimmed" mb="md">{useCase.description}</Text>
                    {useCase.metrics && (
                      <Stack gap="xs" mt="md">
                        {useCase.metrics.map((metric, idx) => (
                          <Group key={idx} justify="apart">
                            <Text size="sm" fw={500}>{metric.label}</Text>
                            <Badge variant="light">{metric.value}</Badge>
                          </Group>
                        ))}
                      </Stack>
                    )}
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </div>

        {/* Key Features Grid */}
        <div className={classes.keyFeaturesSection}>
          <Container size="lg">
            <Title order={2} ta="center" mb="xl">Platform Capabilities</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {product.keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Paper p="md" radius="md" className={classes.keyFeatureCard}>
                    <Group align="flex-start" gap="sm">
                      <ThemeIcon size={24} radius="xl" variant="light" color="blue" mt={2}>
                        <IconCheck size={14} />
                      </ThemeIcon>
                      <div style={{ flex: 1 }}>
                        <Text fw={600} mb={4}>{feature.title}</Text>
                        <Text size="sm" c="dimmed">{feature.description}</Text>
                      </div>
                    </Group>
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className={classes.faqSection}>
          <Container size="lg">
            <Title order={2} ta="center" mb="sm">Frequently Asked Questions</Title>
            <Text ta="center" c="dimmed" mb="xl" maw={600} mx="auto">
              Everything you need to know about our {product.shortTitle.toLowerCase()} solution
            </Text>

            <Accordion
              variant="separated"
              radius="md"
              className={classes.faqAccordion}
              chevronPosition="right"
            >
              {product.faq.map((item, index) => (
                <Accordion.Item key={index} value={`faq-${index}`}>
                  <Accordion.Control>
                    <Text fw={600}>{item.question}</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">{item.answer}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Container>
        </div>

        {/* CTA Section */}
        <div className={classes.ctaSection}>
          <Container size="lg">
            <Paper p="xl" radius="lg" className={classes.ctaPaper}>
              <Stack align="center" gap="xl">
                <Title order={2} ta="center">Ready to transform your fund operations?</Title>
                <Text ta="center" c="dimmed" maw={600}>
                  Join leading fund managers who trust our platform to run their operations efficiently and compliantly.
                </Text>
                <Group>
                  <Button
                    component={Link}
                    href="/contact"
                    size="lg"
                    rightSection={<IconArrowRight size={18} />}
                  >
                    Get Started Today
                  </Button>
                  <Button
                    component={Link}
                    href="/contact"
                    size="lg"
                    variant="outline"
                  >
                    Schedule a Demo
                  </Button>
                </Group>
              </Stack>
            </Paper>
          </Container>
        </div>
      </div>
    </InnerLayout>
  );
}

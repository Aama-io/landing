import { Container, Title, Text, Stack, Grid, Card, Image, Group, Badge, Avatar, Button } from '@mantine/core';
import { IconCalendar, IconClock, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import Head from 'next/head';
import classes from './Blog.module.css';

// Define the blog post type
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorImage: string;
  coverImage: string;
  publishedDate: string;
  readTime: string;
  categories: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from the API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();

        //reverse the posts
        const reversedPosts = data.sort((a: BlogPost, b: BlogPost) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        setPosts(reversedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Define SEO metadata
  const seoTitle = "Fund Management Insights & News";
  const seoDescription = "Expert insights on fund management softwares, IFRS accounting, investor portals, data integration, and blockchain technology in financial services.";
  const seoKeywords = "fund management, IFRS accounting, investor portal, financial technology, blockchain, investment software";
  const seoUrl = "https://aama.io/blog";
  const seoImage = posts.length > 0 ? posts[0].coverImage : '/fund-types/mutual-fund.jpg';

  // JSON-LD structured data for blog listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": "AAMA Fund Management Blog",
    "description": seoDescription,
    "url": seoUrl,
    "publisher": {
      "@type": "Organization",
      "name": "AAMA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aama.io/aama-logo.svg"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author,
        "jobTitle": post.authorRole
      },
      "datePublished": post.publishedDate,
      "image": post.coverImage,
      "url": `https://aama.io/blog/${post.slug}`
    }))
  };

  return (
    <InnerLayout>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogImage={seoImage}
        ogUrl={seoUrl}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div className={classes.wrapper}>
        <Container size="lg">
          <Stack align="center" justify="center" gap="xl" className={classes.header}>
            <Title className={classes.title}>AAMA Blog</Title>
            <Text className={classes.subtitle}>
              Insights on blockchain technology, fund management, and investment strategies.
            </Text>
          </Stack>

          {loading ? (
            <Stack align="center" py={50}>
              <Text>Loading blog posts...</Text>
            </Stack>
          ) : posts.length > 0 ? (
            <>
              {/* Featured Post */}
              <Card className={classes.featuredPost} mb={50}>
                <Grid gutter={30}>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Image 
                      src={posts[0].coverImage}
                      alt={posts[0].title}
                      fallbackSrc="https://placehold.co/600x400?text=Featured+Post"
                      className={classes.featuredImage}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap="md" h="100%" justify="center">
                      <Group gap="xs">
                        {posts[0].categories.slice(0, 2).map((category, index) => (
                          <Badge key={index} variant="light" color="blue">{category}</Badge>
                        ))}
                      </Group>
                      <Title order={2} className={classes.postTitle}>{posts[0].title}</Title>
                      <Text className={classes.excerpt}>{posts[0].excerpt}</Text>
                      <Group gap="md">
                        <Group gap="xs">
                          <IconCalendar size={16} />
                          <Text size="sm" c="dimmed">{new Date(posts[0].publishedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconClock size={16} />
                          <Text size="sm" c="dimmed">{posts[0].readTime}</Text>
                        </Group>
                      </Group>
                      <Group align="center" gap="sm">
                        <Avatar src={posts[0].authorImage} alt={posts[0].author} radius="xl" />
                        <div>
                          <Text size="sm" fw={500}>{posts[0].author}</Text>
                          <Text size="xs" c="dimmed">{posts[0].authorRole}</Text>
                        </div>
                      </Group>
                      <Button 
                        component={Link}
                        href={`/blog/${posts[0].slug}`}
                        variant="light"
                        rightSection={<IconArrowRight size={18} />}
                        mt="auto"
                        className={classes.readMoreButton}
                      >
                        Read Article
                      </Button>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Card>

              {/* Regular Posts */}
              <Grid gutter={{ base: 20, sm: 30 }}>
                {posts.slice(1).map((post) => (
                  <Grid.Col span={{ base: 12, sm: 6, lg: 4 }} key={post.id}>
                    <Card className={classes.card} component={Link} href={`/blog/${post.slug}`}>
                      <Card.Section>
                        <Image
                          src={post.coverImage}
                          height={200}
                          alt={post.title}
                          fallbackSrc="https://placehold.co/600x400?text=Blog+Post"
                        />
                      </Card.Section>
                      <Stack gap="sm" mt="md">
                        <Group gap="xs">
                          {post.categories.slice(0, 2).map((category, index) => (
                            <Badge key={index} variant="light" color="blue" size="sm">{category}</Badge>
                          ))}
                        </Group>
                        <Title order={3} className={classes.cardTitle}>{post.title}</Title>
                        <Text lineClamp={2} className={classes.cardExcerpt}>{post.excerpt}</Text>
                        <Group gap="md">
                          <Group gap="xs">
                            <IconCalendar size={14} />
                            <Text size="xs" c="dimmed">{new Date(post.publishedDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</Text>
                          </Group>
                          <Group gap="xs">
                            <IconClock size={14} />
                            <Text size="xs" c="dimmed">{post.readTime}</Text>
                          </Group>
                        </Group>
                        <Group align="center" gap="sm">
                          <Avatar src={post.authorImage} alt={post.author} radius="xl" size="sm" />
                          <Text size="xs" fw={500}>{post.author}</Text>
                        </Group>
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </>
          ) : (
            <Stack align="center" justify="center" gap="xl" className={classes.content} py={50}>
              <Title className={classes.noPostsTitle}>No Blog Posts Found</Title>
              <Text className={classes.description}>
                We're working on bringing you valuable insights about fund management, blockchain technology, 
                and investment strategies. Stay tuned!
              </Text>
              <Group justify="center">
                <Button
                  component={Link}
                  href="/"
                  variant="light"
                  leftSection={<IconArrowRight size={20} className={classes.rotateLeft} />}
                  size="lg"
                >
                  Back to Home
                </Button>
              </Group>
            </Stack>
          )}
        </Container>
      </div>
    </InnerLayout>
  );
} 
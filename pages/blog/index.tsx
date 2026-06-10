import { Container, Title, Text, Stack, Grid, Card, Image, Group, Badge, Avatar, Button } from '@mantine/core';
import { IconCalendar, IconClock, IconArrowRight, IconSparkles } from '@tabler/icons-react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import Head from 'next/head';
import { getAllPosts, type BlogPostSummary } from '@/lib/blogPosts';
import s from '@/components/ui/tool.module.css';
import classes from './Blog.module.css';

type BlogPost = BlogPostSummary;

export default function BlogPage({ posts }: { posts: BlogPost[] }) {
  // Define SEO metadata
  const seoTitle = "Fund Administration Insights & News";
  const seoDescription = "Expert insights on fund administration softwares, IFRS accounting, investor portals, data integration, and blockchain technology in financial services.";
  const seoKeywords = "fund administration, IFRS accounting, investor portal, financial technology, blockchain, investment software";
  const seoUrl = "https://aama.io/blog";
  const seoImage = posts.length > 0 ? posts[0].coverImage : '/fund-types/mutual-fund.jpg';

  // JSON-LD structured data for blog listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": "AAMA Fund Administration Blog",
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
          <Stack align="center" justify="center" gap="md" className={classes.header}>
            <span className={s.pill}>aama.io blog</span>
            <Title className={classes.title}>Fund administration <span className={s.accent}>insights</span></Title>
            <Text className={classes.subtitle}>
              Practical guides on distribution waterfalls, VCC structuring, fund economics and Singapore fund operations — plus deep dives behind our free tools.
            </Text>
          </Stack>

          {posts.length > 0 && (
            <div className={classes.topicRow}>
              {Array.from(new Set(posts.flatMap((p) => p.categories))).slice(0, 7).map((t) => (
                <span key={t} className={classes.topicChip}>{t}</span>
              ))}
            </div>
          )}

          {posts.length > 0 ? (
            <>
              {/* Featured Post */}
              <Card className={classes.featuredPost} mb={50}>
                <Grid gutter={30}>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <div className={classes.featuredImageWrap}>
                      <span className={classes.featuredTag}><IconSparkles size={13} /> Featured</span>
                      <Image
                        src={posts[0].coverImage}
                        alt={posts[0].title}
                        fallbackSrc="https://placehold.co/600x400?text=Featured+Post"
                        className={classes.featuredImage}
                      />
                    </div>
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
                          className={classes.cardImage}
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

              {/* Free tools CTA */}
              <div className={classes.toolsCta}>
                <div className={classes.toolsCtaGlow} />
                <h2 className={classes.toolsCtaTitle}>Put the ideas to work</h2>
                <p className={classes.toolsCtaText}>
                  Every guide pairs with a free, no-signup tool — distribution waterfalls, IRR / TVPI, VCC structuring,
                  capital calls and more.
                </p>
                <Button component={Link} href="/tools" size="md" radius="md" rightSection={<IconArrowRight size={18} />}>
                  Explore the free tools
                </Button>
              </div>
            </>
          ) : (
            <Stack align="center" justify="center" gap="xl" className={classes.content} py={50}>
              <Title className={classes.noPostsTitle}>No Blog Posts Found</Title>
              <Text className={classes.description}>
                We're working on bringing you valuable insights about fund administration, blockchain technology, 
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

export const getStaticProps: GetStaticProps<{ posts: BlogPost[] }> = async () => {
  const posts = getAllPosts().sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return { props: { posts } };
};

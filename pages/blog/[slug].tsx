import { Container, Title, Text, Image, Stack, Group, Badge, Avatar, Button, Divider, Box, Grid } from '@mantine/core';
import { IconCalendar, IconClock, IconArrowLeft, IconChevronRight, IconArrowRight, IconCalculator } from '@tabler/icons-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import Head from 'next/head';
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
  getRelatedSolution,
  getRelatedTools,
  type BlogPost,
  type BlogPostSummary,
} from '@/lib/blogPosts';
import classes from './Blog.module.css';

type Props = {
  post: BlogPost;
  relatedPosts: BlogPostSummary[];
  relatedTools: { path: string; title: string }[];
  relatedSolution: { href: string; label: string; blurb: string } | null;
};

export default function BlogPostPage({ post, relatedPosts, relatedTools, relatedSolution }: Props) {
  // Build structured data for the blog post
  const getStructuredData = (post: BlogPost) => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.coverImage,
      "datePublished": post.publishedDate,
      "dateModified": post.publishedDate,
      "author": {
        "@type": "Person",
        "name": post.author,
        "jobTitle": post.authorRole
      },
      "publisher": {
        "@type": "Organization",
        "name": "AAMA",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aama.io/aama-logo.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://aama.io/blog/${post.slug}`
      },
      "keywords": post.categories.join(", ")
    };
  };

  return (
    <InnerLayout>
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.categories.join(", ")}
        ogImage={post.coverImage}
        ogUrl={`https://aama.io/blog/${post.slug}`}
      />
      <Head>
        <meta name="author" content={post.author} />
        <meta property="article:published_time" content={post.publishedDate} />
        {post.categories.map((category, index) => (
          <meta key={index} property="article:tag" content={category} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData(post)) }}
        />
      </Head>
      <div className={classes.wrapper}>
        <Container size="xl">
          <Group mb="lg">
            <Button
              component={Link}
              href="/blog"
              variant="subtle"
              leftSection={<IconArrowLeft size={16} />}
              size="sm"
            >
              Back to Blog
            </Button>
          </Group>
          
          <Stack gap={0} mb="md">
            <Group gap="xs">
              <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" c="dimmed">Blog</Text>
              </Link>
              <IconChevronRight size={14} style={{ color: 'var(--mantine-color-dimmed)' }} />
              <Text size="sm" c="dimmed">{post.title}</Text>
            </Group>
          </Stack>
          
          <div className={classes.singlePost}>
            <Stack gap="xl">
              <Stack gap="md">
                <Group gap="xs">
                  {post.categories.map((category, index) => (
                    <Badge key={index} variant="light" color="blue">{category}</Badge>
                  ))}
                </Group>
                <Title className={classes.singlePostTitle}>{post.title}</Title>
                <Group gap="xl">
                  <Group gap="xs">
                    <IconCalendar size={16} />
                    <Text size="sm" c="dimmed">
                      {new Date(post.publishedDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconClock size={16} />
                    <Text size="sm" c="dimmed">{post.readTime}</Text>
                  </Group>
                </Group>
                <Group align="center" gap="md">
                  <Avatar src={post.authorImage} alt={post.author} radius="xl" size="md" />
                  <div>
                    <Text fw={500}>{post.author}</Text>
                    <Text size="xs" c="dimmed">{post.authorRole}</Text>
                  </div>
                </Group>
              </Stack>
              
              <Image 
                src={post.coverImage}
                alt={post.title}
                fallbackSrc="https://placehold.co/1200x600?text=Blog+Post+Image"
                className={classes.singlePostImage}
              />
              
              <Divider />
              
              <Box className={classes.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />

              {(relatedTools.length > 0 || relatedSolution) && (
                <>
                  <Divider />
                  <Stack gap="md">
                    {relatedTools.length > 0 && (
                      <div>
                        <Text size="sm" fw={600} c="dimmed" mb={8}>Useful calculators</Text>
                        <Group gap="xs">
                          {relatedTools.map((tool) => (
                            <Button
                              key={tool.path}
                              component={Link}
                              href={tool.path}
                              variant="light"
                              size="xs"
                              leftSection={<IconCalculator size={14} />}
                            >
                              {tool.title}
                            </Button>
                          ))}
                        </Group>
                      </div>
                    )}

                    {relatedSolution && (
                      <Box className={classes.solutionCallout}>
                        <Text size="sm" c="dimmed">See how aama.io fits</Text>
                        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
                          <div>
                            <Text fw={700}>{relatedSolution.label}</Text>
                            <Text size="sm" c="dimmed">{relatedSolution.blurb}</Text>
                          </div>
                          <Button
                            component={Link}
                            href={relatedSolution.href}
                            variant="filled"
                            size="sm"
                            rightSection={<IconArrowRight size={16} />}
                          >
                            Explore
                          </Button>
                        </Group>
                      </Box>
                    )}
                  </Stack>
                </>
              )}

              <Divider my="xl" />

              <Group justify="apart">
                <Button
                  component={Link}
                  href="/blog"
                  variant="light"
                  leftSection={<IconArrowLeft size={16} />}
                >
                  Back to Blog
                </Button>
              </Group>

              {relatedPosts.length > 0 && (
                <Stack gap="md" mt="md">
                  <Title order={3} className={classes.singlePostTitle} style={{ fontSize: '1.5rem' }}>
                    Related reading
                  </Title>
                  <Grid gutter={{ base: 20, sm: 30 }}>
                    {relatedPosts.map((related) => (
                      <Grid.Col span={{ base: 12, sm: 6, lg: 4 }} key={related.id}>
                        <Box
                          component={Link}
                          href={`/blog/${related.slug}`}
                          className={classes.card}
                        >
                          <Image
                            src={related.coverImage}
                            height={160}
                            alt={related.title}
                            fallbackSrc="https://placehold.co/600x400?text=Blog+Post"
                            className={classes.cardImage}
                          />
                          <Stack gap="xs" p="md">
                            <Group gap="xs">
                              {related.categories.slice(0, 2).map((category) => (
                                <Badge key={category} variant="light" color="blue" size="sm">{category}</Badge>
                              ))}
                            </Group>
                            <Title order={4} className={classes.cardTitle}>{related.title}</Title>
                            <Text size="sm" lineClamp={2} c="dimmed">{related.excerpt}</Text>
                          </Stack>
                        </Box>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Stack>
              )}
            </Stack>
          </div>
        </Container>
      </div>
    </InnerLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: blogPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const post = typeof slug === 'string' ? getPostBySlug(slug) : null;

  if (!post) {
    return { notFound: true };
  }

  const solution = getRelatedSolution(post.categories);

  return {
    props: {
      post,
      relatedPosts: getRelatedPosts(post.slug, 3),
      relatedTools: getRelatedTools(post.categories, 3),
      relatedSolution: solution ? { href: solution.href, label: solution.label, blurb: solution.blurb } : null,
    },
  };
};

import { Container, Title, Text, Image, Stack, Group, Badge, Avatar, Button, Divider, Box } from '@mantine/core';
import { IconCalendar, IconClock, IconArrowLeft, IconChevronRight } from '@tabler/icons-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import Head from 'next/head';
import { blogPosts, getPostBySlug, type BlogPost } from '@/lib/blogPosts';
import classes from './Blog.module.css';

export default function BlogPostPage({ post }: { post: BlogPost }) {
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
        <Container size="lg">
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

export const getStaticProps: GetStaticProps<{ post: BlogPost }> = async ({ params }) => {
  const slug = params?.slug;
  const post = typeof slug === 'string' ? getPostBySlug(slug) : null;

  if (!post) {
    return { notFound: true };
  }

  return { props: { post } };
};

import { Container, Title, Text, Image, Stack, Group, Badge, Avatar, Button, Divider, Box } from '@mantine/core';
import { IconCalendar, IconClock, IconArrowLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import Head from 'next/head';
import classes from './Blog.module.css';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  coverImage: string;
  publishedDate: string;
  readTime: string;
  categories: string[];
}

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/posts?slug=${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Blog post not found');
          } else {
            setError('Failed to fetch blog post');
          }
          return;
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('An error occurred while fetching the blog post');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

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

  if (loading) {
    return (
      <InnerLayout>
        <SEO 
          title="Loading Blog Post | AAMA"
          description="Please wait while we load the blog post content."
          ogUrl="https://aama.io/blog"
        />
        <div className={classes.wrapper}>
          <Container size="lg">
            <Stack align="center" justify="center" gap="md" py={50}>
              <Text>Loading blog post...</Text>
            </Stack>
          </Container>
        </div>
      </InnerLayout>
    );
  }

  if (error || !post) {
    return (
      <InnerLayout>
        <SEO 
          title="Blog Post Not Found | AAMA"
          description="The blog post you're looking for could not be found. Please check our blog index for the latest articles."
          ogUrl="https://aama.io/blog"
        />
        <div className={classes.wrapper}>
          <Container size="lg">
            <Stack align="center" justify="center" gap="xl" className={classes.content} py={50}>
              <Title className={classes.noPostsTitle}>{error || 'Blog Post Not Found'}</Title>
              <Text className={classes.description}>
                The blog post you are looking for might have been removed or is temporarily unavailable.
              </Text>
              <Group justify="center">
                <Button
                  component={Link}
                  href="/blog"
                  variant="light"
                  leftSection={<IconArrowLeft size={20} />}
                  size="lg"
                >
                  Back to Blog
                </Button>
              </Group>
            </Stack>
          </Container>
        </div>
      </InnerLayout>
    );
  }

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
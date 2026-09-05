import { useMemo } from 'react';
import { Container, Title, Text, Stack, Grid, Card, Image, Group, Badge, Avatar, Button } from '@mantine/core';
import { IconCalendar, IconClock, IconArrowRight, IconArrowLeft, IconSparkles, IconX } from '@tabler/icons-react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InnerLayout from '@/components/InnerLayout';
import { SEO } from '@/components/SEO/SEO';
import Head from 'next/head';
import { getAllPosts, type BlogPostSummary } from '@/lib/blogPosts';
import s from '@/components/ui/tool.module.css';
import classes from './Blog.module.css';

type BlogPost = BlogPostSummary;

const PAGE_SIZE = 9;

export default function BlogPage({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();

  // Query params drive both state, so a filtered/paged view is a shareable, bookmarkable URL.
  const activeCategory = router.isReady && typeof router.query.category === 'string' ? router.query.category : null;
  const pageParam = router.isReady ? Number(router.query.page) : 1;
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => p.categories.forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1)));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [posts]);

  const filtered = activeCategory ? posts.filter((p) => p.categories.includes(activeCategory)) : posts;

  // The "featured" hero treatment only makes sense for the unfiltered, latest-first view.
  const featured = activeCategory ? null : filtered[0];
  const gridSource = activeCategory ? filtered : filtered.slice(1);

  const totalPages = Math.max(1, Math.ceil(gridSource.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedPosts = gridSource.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const goTo = (category: string | null, targetPage: number) => {
    const query: Record<string, string> = {};
    if (category) {query.category = category;}
    if (targetPage > 1) {query.page = String(targetPage);}
    router.push({ pathname: '/blog', query }, undefined, { shallow: true });
  };

  // Define SEO metadata
  const seoTitle = "Fund Administration Insights & News";
  const seoDescription = "Practical guides on Singapore fund administration — VCC structuring, family office compliance, SPVs and syndicates, distribution waterfalls and IFRS 9 / SFRS(I) 9 fund accounting.";
  const seoKeywords = "fund administration Singapore, VCC structuring, family office compliance, SPV administration, distribution waterfall, IFRS 9 fund accounting, MAS licensing";
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
        <Container size="xl">
          <Stack align="center" justify="center" gap="md" className={classes.header}>
            <span className={s.pill}>aama.io blog</span>
            <Title className={classes.title}>Fund administration <span className={s.accent}>insights</span></Title>
            <Text className={classes.subtitle}>
              Practical guides on distribution waterfalls, VCC and family office structuring, SPVs and syndicates, and Singapore fund operations — plus deep dives behind our free tools.
            </Text>
          </Stack>

          {posts.length > 0 && (
            <>
              <div className={classes.topicRow}>
                <button
                  type="button"
                  className={classes.topicChip}
                  data-active={!activeCategory}
                  onClick={() => goTo(null, 1)}
                >
                  All <span className={classes.topicCount}>{posts.length}</span>
                </button>
                {categories.map(([topic, count]) => (
                  <button
                    key={topic}
                    type="button"
                    className={classes.topicChip}
                    data-active={activeCategory === topic}
                    onClick={() => goTo(activeCategory === topic ? null : topic, 1)}
                  >
                    {topic} <span className={classes.topicCount}>{count}</span>
                  </button>
                ))}
              </div>

              <div className={classes.resultsRow}>
                <Text size="sm" c="dimmed">
                  {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                  {activeCategory ? <> in <strong>{activeCategory}</strong></> : null}
                </Text>
                {activeCategory && (
                  <button type="button" className={classes.clearFilter} onClick={() => goTo(null, 1)}>
                    <IconX size={13} /> Clear filter
                  </button>
                )}
              </div>
            </>
          )}

          {filtered.length > 0 ? (
            <>
              {/* Featured Post — only for the unfiltered, latest-first view */}
              {featured && (
                <Card className={classes.featuredPost} mb={50}>
                  <Grid gutter={30}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <div className={classes.featuredImageWrap}>
                        <span className={classes.featuredTag}><IconSparkles size={13} /> Featured</span>
                        <Image
                          src={featured.coverImage}
                          alt={featured.title}
                          fallbackSrc="https://placehold.co/600x400?text=Featured+Post"
                          className={classes.featuredImage}
                        />
                      </div>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Stack gap="md" h="100%" justify="center">
                        <Group gap="xs">
                          {featured.categories.slice(0, 2).map((category, index) => (
                            <Badge key={index} variant="light" color="blue">{category}</Badge>
                          ))}
                        </Group>
                        <Title order={2} className={classes.postTitle}>{featured.title}</Title>
                        <Text className={classes.excerpt}>{featured.excerpt}</Text>
                        <Group gap="md">
                          <Group gap="xs">
                            <IconCalendar size={16} />
                            <Text size="sm" c="dimmed">{new Date(featured.publishedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</Text>
                          </Group>
                          <Group gap="xs">
                            <IconClock size={16} />
                            <Text size="sm" c="dimmed">{featured.readTime}</Text>
                          </Group>
                        </Group>
                        <Group align="center" gap="sm">
                          <Avatar src={featured.authorImage} alt={featured.author} radius="xl" />
                          <div>
                            <Text size="sm" fw={500}>{featured.author}</Text>
                            <Text size="xs" c="dimmed">{featured.authorRole}</Text>
                          </div>
                        </Group>
                        <Button
                          component={Link}
                          href={`/blog/${featured.slug}`}
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
              )}

              {/* Regular Posts */}
              <Grid gutter={{ base: 20, sm: 30 }}>
                {pagedPosts.map((post) => (
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

              {totalPages > 1 && (
                <div className={classes.pagination}>
                  <button
                    type="button"
                    className={classes.pageBtn}
                    disabled={safePage <= 1}
                    onClick={() => goTo(activeCategory, safePage - 1)}
                    aria-label="Previous page"
                  >
                    <IconArrowLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={classes.pageBtn}
                      data-active={n === safePage}
                      onClick={() => goTo(activeCategory, n)}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={classes.pageBtn}
                    disabled={safePage >= totalPages}
                    onClick={() => goTo(activeCategory, safePage + 1)}
                    aria-label="Next page"
                  >
                    <IconArrowRight size={16} />
                  </button>
                </div>
              )}

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
          ) : posts.length > 0 ? (
            <Stack align="center" justify="center" gap="xl" className={classes.content} py={50}>
              <Title className={classes.noPostsTitle}>No posts in this topic yet</Title>
              <Text className={classes.description}>
                Try another topic, or browse everything we've published so far.
              </Text>
              <Group justify="center">
                <Button
                  onClick={() => goTo(null, 1)}
                  variant="light"
                  leftSection={<IconArrowLeft size={18} />}
                  size="lg"
                >
                  View all articles
                </Button>
              </Group>
            </Stack>
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

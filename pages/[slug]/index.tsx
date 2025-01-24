import Head from 'next/head';
import { notFound } from 'next/navigation';
import { readItems } from '@directus/sdk';
import { Box, Text, Title } from '@mantine/core';
import InnerLayout from '@/components/InnerLayout';
import { PageContent } from '@/components/PageContent';
import { getDirectusClient } from '@/lib/directus';
import classes from './Page.module.css';

export default function DynamicPage({ page }: { page: any }) {
    if (!page) {
        return <div>Page not found</div>;
    }
    return (
        <InnerLayout>
            <Head>
                <title>{page.title}</title>
                <meta name="description" content={page.description} />
            </Head>
            <Box className={classes.wrapper}>
                <Title order={2} ta="center" className={classes.title}>
                    {page.title}
                </Title>
                <Text ta="center" className={classes.subtitle}>
                    {page.description}
                </Text>
            </Box>
            <PageContent page={page} />
        </InnerLayout>
    );
}

export async function getStaticPaths() {
    try {
        const client = await getDirectusClient();
        const pages = await client.request(
            readItems('pages', {
                fields: ['permalink'],
            })
        );

        const paths = pages.map((page: any) => ({
            params: { slug: page.permalink },
        }));

        return {
            paths,
            fallback: 'blocking', // Use 'blocking' to fetch missing paths server-side
        };
    } catch (error) {
        console.error('Error fetching paths:', error);
        return { paths: [], fallback: 'blocking' };
    }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    try {
        const client = await getDirectusClient();
        const page = await client.request(
            readItems('pages', {
                filter: { permalink: '/' + params.slug },
                fields: ['*,*.*.*.*.*.*.*.*.*.*'],
            })
        );

        return {
            props: {
                page: {
                    title: page[0].title,
                    content: page[0].blocks,
                },
            },
        };
    } catch (error) {
        console.error('Error fetching page:', error);
        return notFound();
    }
}

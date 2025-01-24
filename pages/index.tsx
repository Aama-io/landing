import Head from 'next/head';
import { readItems } from '@directus/sdk';
import { Faq } from '@/components/FAQ/FAQ';
import { Feature } from '@/components/Feature/Feature';
import Gallery from '@/components/Gallery/Gallery';
import { Hero } from '@/components/Hero/Hero';
import MainLayout from '@/components/MainLayout';
import { Newsletter } from '@/components/Newsletter/Newsletter';
import PricingTable from '@/components/Pricing/Pricing';
import RichText from '@/components/RichText/Richtext';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';
import { getDirectusClient } from '@/lib/directus';

export default function HomePage({ blocks, forms }: { blocks: any; forms: any }) {
  const globalSettings = useGlobalSettings();

  console.log(blocks);

  return (
    <>
      <Head>
        <title>{`${globalSettings.data?.title} - ${globalSettings.data?.description}`}</title>
      </Head>
      <MainLayout>
        <Hero props={blocks.find((b: any) => b.collection === 'block_hero')?.item} />
        <RichText data={blocks.find((b: any) => b.collection === 'block_richtext')?.item} />
        <Gallery data={blocks.find((b: any) => b.collection === 'block_gallery')?.item} />
        {/* <Feature /> */}
        <PricingTable data={blocks.find((b: any) => b.collection === 'block_pricing')?.item} />
        {/* <Faq /> */}
        <Newsletter config={forms.find((form: any) => form.title === 'Newsletter')} />
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const directus = await getDirectusClient();

  const page = await directus.request(
    readItems('pages', {
      filter: { permalink: '/' },
      fields: ['*.*.*.*.*.*.*.*.*.*'],
    })
  );

  const forms = await directus.request(
    readItems('forms', {
      fields: ['*.*'],
    })
  );

  return {
    props: {
      blocks: page[0].blocks,
      forms,
    },
  };
}

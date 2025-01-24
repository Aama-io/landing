import { useEffect, useState } from 'react';
import { readItems } from '@directus/sdk';
import { Center, Loader } from '@mantine/core';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';
import { getDirectusClient, getImageUrl } from '@/lib/directus';
import { AuthHeader } from './AuthHeader/AuthHeader';

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  const [footerLinks, setFooterLinks] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const globalSettings = useGlobalSettings();

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const client = await getDirectusClient();
        const navigationData = await client.request(
          readItems('navigation', {
            fields: ['*.*.*.*.*'], // Adjust fields as needed
          })
        );
        if (navigationData) {
          setFooterLinks(navigationData.find((item: any) => item.id === 'footer')?.items);
        }
      } catch (error) {
        console.error('Failed to fetch navigation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, []);

  if (loading || globalSettings.loading) {
    return <Center h={'100vh'}><Loader size={'md'} /></Center>;
  }

  return (
    <>
      <AuthHeader logo={getImageUrl(globalSettings.data?.logo.filename_disk)}/>
      {children}
      <Footer globalSettings={globalSettings} links={footerLinks} />
    </>
  );
}

import { useEffect, useState } from 'react';
import { readItems } from '@directus/sdk';
import { Center, Loader } from '@mantine/core';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { getDirectusClient, getImageUrl } from '@/lib/directus';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [headerLinks, setHeaderLinks] = useState<Record<string, any>[]>([]);
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
          setHeaderLinks(navigationData.find((item: any) => item.id === 'main')?.items);
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
      <Header logo={getImageUrl(globalSettings.data?.logo.filename_disk)} links={headerLinks} />
      {children}
      <Footer globalSettings={globalSettings.data} links={footerLinks} />
    </>
  );
}

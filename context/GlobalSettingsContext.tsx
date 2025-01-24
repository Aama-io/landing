import React, { createContext, useContext, useEffect, useState } from 'react';
import { readItems } from '@directus/sdk';
import { getDirectusClient } from '@/lib/directus';



type GlobalSettingsContextType = {
  data: any;
  loading: boolean;
  error: string | null;
}

const GlobalSettingsContext = createContext<GlobalSettingsContextType>({
  data: null,
  loading: true,
  error: null,
});

export const GlobalSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const client = await getDirectusClient();
        const data = await client.request(readItems('globals', { fields: ['*.*.*.*.*'] }));

        if (!data) {
          throw new Error('Failed to load global settings');
        }
        setData(data as any);
      } catch (err) {
        setError('Failed to load global settings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  return (
    <GlobalSettingsContext.Provider value={{ data, loading, error }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export const useGlobalSettings = () => useContext(GlobalSettingsContext);

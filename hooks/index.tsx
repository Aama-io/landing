import { readItems } from '@directus/sdk';
import { getDirectusClient } from '@/lib/directus';

export const useGlobals = async () => {
  const client = await getDirectusClient();
  const globals = await client.request(
    readItems('globals', {
      fields: ['*.*.*.*.*'], // Adjust fields as needed
    })
  );

  return {
    globals,
  };
};

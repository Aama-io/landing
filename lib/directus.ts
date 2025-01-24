import getConfig from 'next/config';
import { authentication, createDirectus, rest, staticToken } from '@directus/sdk';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const { url } = publicRuntimeConfig;
const { email, password, token } = serverRuntimeConfig;



export async function getDirectusClient() {
  if (email && password) {
    const directus = createDirectus(url).with(rest()).with(authentication());
    await directus.login(email, password);
    return directus;
  } else if (token) {
    const directus = createDirectus(url).with(rest()).with(staticToken(token))
    return directus;
  } else {
    const directus = createDirectus(url).with(rest()).with(staticToken(token))
    return directus;
  }
}

export const getImageUrl = (image: string) => {
  return `${url}/assets/${image}`;
}

export const getDirectusUrl = (path: string) => {
  return `${url}/${path}`;
}

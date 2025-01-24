import Image from 'next/image';
import Link from 'next/link';
import {
  IconBrandDiscord,
  IconBrandDocker,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandVimeo,
  IconBrandYoutube,
  IconLink,
} from '@tabler/icons-react';
import { ActionIcon, Anchor, Container, Flex, Group, Text } from '@mantine/core';
import { getImageUrl } from '@/lib/directus';
import classes from './Footer.module.css';

type SocialIconProps = {
  platform: 'twitter' | 'facebook' | 'instagram' | 'youtube' | string; // Add more platforms as needed
  size?: number;
  stroke?: number;
};

const SocialIcon: React.FC<SocialIconProps> = ({ platform, size = 18, stroke = 1.5 }) => {
  const icons: Record<SocialIconProps['platform'], React.ElementType> = {
    twitter: IconBrandTwitter,
    facebook: IconBrandFacebook,
    instagram: IconBrandInstagram,
    youtube: IconBrandYoutube,
    discord: IconBrandDiscord,
    linkined: IconBrandLinkedin,
    github: IconBrandGithub,
    vimeo: IconBrandVimeo,
    docker: IconBrandDocker,
  };

  const IconComponent = icons[platform] || IconLink;

  return IconComponent ? <IconComponent size={size} stroke={stroke} /> : null;
};

type FooterProps = {
  links?: any;
  globalSettings: any;
};

export function Footer({ links, globalSettings }: FooterProps) {
  const renderLink = (link: any) => {
    if (link.type === 'url') {
      return (
        <a href={link.url} className={classes.link}>
          {link.title}
        </a>
      );
    }

    if (link.type === 'page') {
      return (
        <Link href={link.page?.permalink || '/'} className={classes.link}>
          {link.title}
        </Link>
      );
    }

    return null;
  };

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Anchor component={Link} href="/" className={classes.link}>
            <Image
              src={getImageUrl(globalSettings.logo.filename_disk)}
              alt="Logo"
              width={150}
              height={50}
            />
          </Anchor>
          <Text size="xs" c="dimmed" className={classes.description}>
            {globalSettings.description}
          </Text>
        </div>

        <Flex className={classes.groups}>{links.map((link: any) => renderLink(link))}</Flex>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
        © {new Date().getFullYear()}, All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          {globalSettings.social_links.map((link: any) => (
            <Anchor key={link.service} href={link.url} target="_blank" rel="noopener noreferrer">
              <ActionIcon size="lg" color="gray" variant="subtle">
                <SocialIcon platform={link.service} size={18} stroke={1.5} />
              </ActionIcon>
            </Anchor>
          ))}
        </Group>
      </Container>
    </footer>
  );
}

import { useState } from 'react';
import {
  Container,
  Group,
  Burger,
  Drawer,
  Stack,
  Button,
  Text,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoon } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { ActionToggle } from '../ActionToggle/ActionToggle';
import { useAnalytics } from '../Analytics';
import classes from './Header.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/about', label: 'About' },
  { link: '/product', label: 'Product' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/blog', label: 'Blog' },
  { link: '/contact', label: 'Contact' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const { trackEvent } = useAnalytics();

  // Track navigation event
  const handleNavClick = (linkLabel: string) => {
    trackEvent({
      action: 'navigation',
      category: 'Header',
      label: linkLabel,
    });
  };

  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <Link 
            href="/" 
            className={classes.logo}
            onClick={() => handleNavClick('Home Logo')}
          >
            {computedColorScheme === 'dark' ? (
              <Image src="/aama-logo-dark.svg" alt="AAMA.io" width={160} height={48} />
            ) : (
              <Image src="/aama-logo.svg" alt="AAMA.io" width={160} height={48} />
            )}
          </Link>

          <Group gap={30} visibleFrom="xs">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.link}
                className={classes.link}
                onClick={() => handleNavClick(link.label)}
              >
                {link.label}
              </Link>
            ))}
          </Group>

          <Group visibleFrom="xs">
            <Button 
              component={Link} 
              href="/product"
              onClick={() => handleNavClick('Launch Fund CTA')}
            >
              Launch Fund
            </Button>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" />
        </div>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <Stack gap="lg">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.link}
              className={classes.drawerLink}
              onClick={() => {
                handleNavClick(`Mobile - ${link.label}`);
                close();
              }}
            >
              {link.label}
            </Link>
          ))}
          <Group justify="space-between" align="center">
            <Button 
              fullWidth 
              onClick={() => {
                handleNavClick('Mobile - Launch Fund CTA');
                close();
              }}
              component={Link}
              href="/product"
            >
              Launch Fund
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </header>
  );
}

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
import { ActionToggle } from '../ActionToggle/ActionToggle';
import classes from './Header.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/contact', label: 'Contact' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <Link href="/" className={classes.logo}>
            <Text fw={700} size="xl">AAMA</Text>
          </Link>

          <Group gap={40} visibleFrom="xs">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.link}
                className={classes.link}
              >
                {link.label}
              </Link>
            ))}
          </Group>

          <Group visibleFrom="xs">
            <ActionToggle />
            <Button>Launch App</Button>
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
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
          <Group justify="space-between" align="center">
            <ActionToggle />
            <Button fullWidth onClick={close}>
              Launch App
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </header>
  );
}

import Link from 'next/link';
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { ActionToggle } from '../ActionToggle/ActionToggle';
import classes from './Header.module.css';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Anchor component={Link} href="/" className={classes.link}>
            <MantineLogo size={30} />
          </Anchor>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>

            <a href="#features" className={classes.link}>
              Features
            </a>
            <a href="#pricing" className={classes.link}>
              Pricing
            </a>
            <a href="#faq" className={classes.link}>
              FAQ
            </a>
            <a href="#contact" className={classes.link}>
              Contact
            </a>
          </Group>

          <Group visibleFrom="sm">
            <ActionToggle />
            <Button variant="default" component={Link} href="/auth/login">
              Log in
            </Button>
            <Button component={Link} href="/auth/register">
              Sign up
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="/" className={classes.link}>
            Home
          </a>
          <a href="#features" className={classes.link}>
            Features
          </a>
          <a href="#pricing" className={classes.link}>
            Pricing
          </a>
          <a href="#faq" className={classes.link}>
            FAQ
          </a>
          <a href="#contact" className={classes.link}>
            Contact
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <ActionToggle />
            <Button variant="default" component={Link} href="/auth/login">
              Log in
            </Button>
            <Button component={Link} href="/auth/register">
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

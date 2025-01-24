import Image from 'next/image';
import Link from 'next/link';
import {
  Anchor,
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ActionToggle } from '../ActionToggle/ActionToggle';
import classes from './Header.module.css';

type HeaderProps = {
  links: any;
  logo: string;
};

const renderLink = (link: any) => {
  return link.type === 'url' ? (
    <a href={link.url} className={classes.link}>
      {link.title}
    </a>
  ) : link.type === 'page' ? (
    <Link href={link.page.permalink} className={classes.link}>
      {link.title}
    </Link>
  ) : (
    <a href={link.url} className={classes.link}>
      {link.title}
    </a>
  );
};

export function Header({ links, logo }: HeaderProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Anchor component={Link} href="/" className={classes.link}>
            <Image src={logo} alt="Logo" width={150} height={50} />
          </Anchor>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            {links?.map((link: any) => renderLink(link))}
          </Group>

          <Group visibleFrom="sm">
            <ActionToggle />
            <>
              {/* <Button variant="default" component={Link} href="/auth/signin">
                Log in
              </Button>
              <Button component={Link} href="/auth/register">
                Sign up
              </Button> */}
            </>
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

          {links?.map((link: any) => (
            <a href={link} className={classes.link}>
              {link.title}
            </a>
          ))}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <ActionToggle />
            {/* <Button variant="default" component={Link} href="/auth/signin">
              Log in
            </Button>
            <Button component={Link} href="/auth/register">
              Sign up
            </Button> */}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

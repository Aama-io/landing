import { useEffect, useState } from 'react';
import { Container, Group, Burger, Drawer, Stack, Button, Divider, Menu } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconArrowRight, IconChevronDown, IconLayoutGrid } from '@tabler/icons-react';
import { useAnalytics } from '../Analytics';
import { Logo } from '../ui/Logo';
import { FEATURED_TOOLS, ALL_TOOLS } from '@/lib/tools';
import { PLATFORM_LINKS } from '@/lib/platforms';
import { SOLUTIONS } from '@/lib/solutions';
import classes from './Header.module.css';

const links = [
  { link: '/pricing', label: 'Pricing' },
  { link: '/about', label: 'About' },
  { link: '/blog', label: 'Blog' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    setScrolled(scroll.y > 8);
  }, [scroll.y]);

  const handleNavClick = (linkLabel: string) => {
    trackEvent({ action: 'navigation', category: 'Header', label: linkLabel });
  };

  const isActive = (link: string) =>
    link === '/' ? router.pathname === '/' : router.pathname.startsWith(link);

  return (
    <header className={classes.header} data-scrolled={scrolled || undefined}>
      <Container size="lg" className={classes.container}>
        <div className={classes.inner}>
          <Logo onClick={() => handleNavClick('Home Logo')} />

          <Group gap={4} visibleFrom="md" className={classes.nav}>
            <Menu
              trigger="hover"
              openDelay={60}
              closeDelay={120}
              position="bottom-start"
              offset={10}
              radius="md"
              width={320}
              withinPortal
              transitionProps={{ transition: 'pop-top-left', duration: 160 }}
            >
              <Menu.Target>
                <button
                  type="button"
                  className={`${classes.link} ${classes.navTrigger}`}
                  data-active={isActive('/product') || isActive('/products') || undefined}
                >
                  Products
                  <IconChevronDown size={15} className={classes.chevron} />
                </button>
              </Menu.Target>
              <Menu.Dropdown className={classes.menuDropdown}>
                <Menu.Label>Our platforms</Menu.Label>
                {PLATFORM_LINKS.map((p) => (
                  <Menu.Item
                    key={p.href}
                    component={Link}
                    href={p.href}
                    onClick={() => handleNavClick(p.label)}
                    leftSection={<span className={classes.menuIcon}><p.icon size={18} stroke={1.7} /></span>}
                  >
                    <div className={classes.menuItemTitle}>{p.label}</div>
                    <div className={classes.menuItemDesc}>{p.blurb}</div>
                  </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item
                  component={Link}
                  href="/product"
                  onClick={() => handleNavClick('Platform overview')}
                  leftSection={<span className={classes.menuIcon}><IconLayoutGrid size={18} stroke={1.7} /></span>}
                >
                  <div className={classes.menuItemTitle}>How it fits together</div>
                  <div className={classes.menuItemDesc}>Two platforms for end to end solution</div>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu
              trigger="hover"
              openDelay={60}
              closeDelay={120}
              position="bottom-start"
              offset={10}
              radius="md"
              width={320}
              withinPortal
              transitionProps={{ transition: 'pop-top-left', duration: 160 }}
            >
              <Menu.Target>
                <button
                  type="button"
                  className={`${classes.link} ${classes.navTrigger}`}
                  data-active={isActive('/solutions') || undefined}
                >
                  Solutions
                  <IconChevronDown size={15} className={classes.chevron} />
                </button>
              </Menu.Target>
              <Menu.Dropdown className={classes.menuDropdown}>
                <Menu.Label>By fund type</Menu.Label>
                {SOLUTIONS.map((sol) => (
                  <Menu.Item
                    key={sol.slug}
                    component={Link}
                    href={sol.href}
                    onClick={() => handleNavClick(sol.label)}
                    leftSection={<span className={classes.menuIcon}><sol.icon size={18} stroke={1.7} /></span>}
                  >
                    <div className={classes.menuItemTitle}>{sol.label}</div>
                    <div className={classes.menuItemDesc}>{sol.blurb}</div>
                  </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item
                  component={Link}
                  href="/solutions"
                  onClick={() => handleNavClick('All solutions')}
                  leftSection={<span className={classes.menuIcon}><IconLayoutGrid size={18} stroke={1.7} /></span>}
                >
                  <div className={classes.menuItemTitle}>All solutions</div>
                  <div className={classes.menuItemDesc}>Find the fit for your fund</div>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {links.map((link) => (
              <Link
                key={link.label}
                href={link.link}
                className={classes.link}
                data-active={isActive(link.link) || undefined}
                onClick={() => handleNavClick(link.label)}
              >
                {link.label}
              </Link>
            ))}

            <Menu
              trigger="hover"
              openDelay={60}
              closeDelay={120}
              position="bottom-start"
              offset={10}
              radius="md"
              width={300}
              withinPortal
              transitionProps={{ transition: 'pop-top-left', duration: 160 }}
            >
              <Menu.Target>
                <button
                  type="button"
                  className={`${classes.link} ${classes.navTrigger}`}
                  data-active={isActive('/tools') || undefined}
                >
                  Tools
                  <IconChevronDown size={15} className={classes.chevron} />
                </button>
              </Menu.Target>
              <Menu.Dropdown className={classes.menuDropdown}>
                <Menu.Label>Popular tools</Menu.Label>
                {FEATURED_TOOLS.map((t) => (
                  <Menu.Item
                    key={t.href}
                    component={Link}
                    href={t.href}
                    onClick={() => handleNavClick(t.label)}
                    leftSection={<span className={classes.menuIcon}><t.icon size={18} stroke={1.7} /></span>}
                  >
                    <div className={classes.menuItemTitle}>{t.label}</div>
                    <div className={classes.menuItemDesc}>{t.description}</div>
                  </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item
                  component={Link}
                  href="/tools"
                  onClick={() => handleNavClick('All tools')}
                  leftSection={<span className={classes.menuIcon}><IconLayoutGrid size={18} stroke={1.7} /></span>}
                >
                  <div className={classes.menuItemTitle}>Browse all {ALL_TOOLS.length} tools</div>
                  <div className={classes.menuItemDesc}>The full free-tool directory</div>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Group gap={8} visibleFrom="md">
            <Button
              component={Link}
              href="/contact"
              rightSection={<IconArrowRight size={16} />}
              className={classes.cta}
              onClick={() => handleNavClick('Book a demo CTA')}
            >
              Book a demo
            </Button>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" aria-label="Toggle navigation" />
        </div>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="lg"
        hiddenFrom="md"
        zIndex={1000000}
        title={<Logo href={null} />}
        classNames={{ content: classes.drawerContent }}
      >
        <Stack gap={4} mt="md">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.link}
              className={classes.drawerLink}
              data-active={isActive(link.link) || undefined}
              onClick={() => {
                handleNavClick(`Mobile - ${link.label}`);
                close();
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/product"
            className={classes.drawerGroupLabel}
            onClick={() => { handleNavClick('Mobile - Platform overview'); close(); }}
          >
            Product
          </Link>
          {PLATFORM_LINKS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={classes.drawerSubLink}
              data-active={isActive(p.href) || undefined}
              onClick={() => { handleNavClick(`Mobile - ${p.label}`); close(); }}
            >
              <p.icon size={18} stroke={1.7} />
              {p.label}
            </Link>
          ))}

          <Link
            href="/solutions"
            className={classes.drawerGroupLabel}
            onClick={() => { handleNavClick('Mobile - All solutions'); close(); }}
          >
            Solutions
          </Link>
          {SOLUTIONS.map((sol) => (
            <Link
              key={sol.slug}
              href={sol.href}
              className={classes.drawerSubLink}
              data-active={isActive(sol.href) || undefined}
              onClick={() => { handleNavClick(`Mobile - ${sol.label}`); close(); }}
            >
              <sol.icon size={18} stroke={1.7} />
              {sol.label}
            </Link>
          ))}

          <Link
            href="/tools"
            className={classes.drawerGroupLabel}
            onClick={() => { handleNavClick('Mobile - All tools'); close(); }}
          >
            Tools
          </Link>
          {FEATURED_TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={classes.drawerSubLink}
              data-active={isActive(t.href) || undefined}
              onClick={() => {
                handleNavClick(`Mobile - ${t.label}`);
                close();
              }}
            >
              <t.icon size={18} stroke={1.7} />
              {t.label}
            </Link>
          ))}
          <Link
            href="/tools"
            className={classes.drawerSubLink}
            onClick={() => { handleNavClick('Mobile - All tools'); close(); }}
          >
            <IconLayoutGrid size={18} stroke={1.7} />
            Browse all {ALL_TOOLS.length} tools
          </Link>

          <Divider my="md" />
          <Button
            component={Link}
            href="/contact"
            variant="default"
            size="md"
            fullWidth
            onClick={() => {
              handleNavClick('Mobile - Sign in');
              close();
            }}
          >
            Sign in
          </Button>
          <Button
            component={Link}
            href="/contact"
            size="md"
            fullWidth
            mt="xs"
            rightSection={<IconArrowRight size={16} />}
            onClick={() => {
              handleNavClick('Mobile - Book a demo CTA');
              close();
            }}
          >
            Book a demo
          </Button>
        </Stack>
      </Drawer>
    </header>
  );
}

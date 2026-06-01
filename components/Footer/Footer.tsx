import { Container, Text, Anchor, ActionIcon, Group } from '@mantine/core';
import { IconBrandLinkedin, IconBrandX, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import classes from './Footer.module.css';

const groups = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '/product' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Investor Portal', href: '/product' },
    ],
  },
  {
    title: 'Tools',
    links: [{ label: 'Waterfall Calculator', href: '/tools/waterfall' }],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Book a demo', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Container size="lg">
        <div className={classes.top}>
          <div className={classes.brand}>
            <Logo />
            <Text className={classes.tagline}>
              End-to-end fund management software — onboarding, NAV, compliance and investor
              servicing on one modern platform.
            </Text>
            <Group gap={10} mt="lg">
              <ActionIcon
                component="a"
                href="https://www.linkedin.com/company/aama-io"
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                size="lg"
                radius="md"
                aria-label="LinkedIn"
                className={classes.social}
              >
                <IconBrandLinkedin size={18} />
              </ActionIcon>
              <ActionIcon
                component="a"
                href="mailto:hello@aama.io"
                variant="default"
                size="lg"
                radius="md"
                aria-label="Email"
                className={classes.social}
              >
                <IconMail size={18} />
              </ActionIcon>
            </Group>
          </div>

          <div className={classes.groups}>
            {groups.map((group) => (
              <div key={group.title} className={classes.group}>
                <Text className={classes.groupTitle}>{group.title}</Text>
                {group.links.map((link) => (
                  <Link key={link.label} href={link.href} className={classes.link}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={classes.bottom}>
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} aama.io. All rights reserved.
          </Text>
          <Text size="sm" c="dimmed">
            Built by{' '}
            <Anchor
              href="https://ux-qode.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.creditLink}
            >
              Uxqode Pte Ltd
            </Anchor>
          </Text>
        </div>
      </Container>
    </footer>
  );
}

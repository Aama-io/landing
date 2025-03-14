import { Container, Text, Group } from '@mantine/core';
import Link from 'next/link';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.logoSection}>
            <Text className={classes.logo}>AAMA.io</Text>
            <Text size="sm" c="dimmed" mt="xs" maw={300}>
              Modern fund management platform combining traditional finance with blockchain technology
            </Text>
          </div>

          <div className={classes.groups}>
            <div className={classes.group}>
              <Text className={classes.groupTitle}>Product</Text>
              <Link href="/pricing" className={classes.link}>
                Pricing
              </Link>
              <Link href="/#features" className={classes.link}>
                Features
              </Link>
              <Link href="/product" className={classes.link}>
                Product
              </Link>
            </div>

            <div className={classes.group}>
              <Text className={classes.groupTitle}>Company</Text>
              <Link href="/about" className={classes.link}>
                About
              </Link>
              <Link href="/contact" className={classes.link}>
                Contact
              </Link>
              <Link href="/blog" className={classes.link}>
                Blog
              </Link>
            </div>

            <div className={classes.group}>
              <Text className={classes.groupTitle}>Legal</Text>
              <Link href="/privacy" className={classes.link}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={classes.link}>
                Terms of Use
              </Link>
              <Link href="/compliance" className={classes.link}>
                Compliance
              </Link>
            </div>
          </div>
        </div>

        <div className={classes.bottom}>
          <Text size="sm" c="dimmed">
            © 2024 AAMA.io. All rights reserved.
          </Text>

          <Group gap={20} className={classes.social}>
            <Text size="sm" c="dimmed">
              Made with ❤️ by Uxqode
            </Text>
          </Group>
        </div>
      </Container>
    </footer>
  );
}

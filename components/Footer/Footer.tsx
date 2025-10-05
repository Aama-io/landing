import { Container, Text, Group, Anchor, useComputedColorScheme } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import classes from './Footer.module.css';

export function Footer() {
  const computedColorScheme = useComputedColorScheme('light');
  
  return (
    <footer className={classes.footer}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.logoSection}>
            <div className={classes.logoImage}>
              {computedColorScheme === 'dark' ? (
                <Image src="/aama-logo-dark.svg" alt="AAMA.io" width={160} height={48} />
              ) : (
                <Image src="/aama-logo.svg" alt="AAMA.io" width={160} height={48} />
              )}
            </div>
            <Text size="sm" c="dimmed" mt="xs" maw={300}>
              Modern fund management software combining traditional finance with blockchain technology
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
              Made with ❤️ by <Anchor href="https://ux-qode.com" target="_blank" rel="noopener noreferrer" className={classes.creditLink}>Uxqode Pte Ltd</Anchor>
            </Text>
          </Group>
        </div>
      </Container>
    </footer>
  );
}

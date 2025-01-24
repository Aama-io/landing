import Image from 'next/image';
import Link from 'next/link';
import { Anchor, Box, Group } from '@mantine/core';
import { ActionToggle } from '../ActionToggle/ActionToggle';
import classes from './AuthHeader.module.css';

export function AuthHeader({ logo }: { logo: string }) {
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Anchor component={Link} href="/" className={classes.link}>
            <Image src={logo} alt="Logo" width={150} height={50} />
          </Anchor>
          <Group>
            <ActionToggle />
          </Group>
        </Group>
      </header>
    </Box>
  );
}

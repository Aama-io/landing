import { type ReactNode } from 'react';
import { Box, Text, Title } from '@mantine/core';
import { Reveal } from './Reveal';
import classes from './SectionHeading.module.css';

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  maw?: number;
};

/** Consistent eyebrow + title + description block used across every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  maw = 680,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <Box
        className={classes.root}
        data-align={align}
        style={{ maxWidth: align === 'center' ? maw : undefined }}
      >
        {eyebrow ? <span className={classes.eyebrow}>{eyebrow}</span> : null}
        <Title order={2} className={classes.title}>
          {title}
        </Title>
        {description ? (
          <Text className={classes.description} style={{ maxWidth: maw }}>
            {description}
          </Text>
        ) : null}
      </Box>
    </Reveal>
  );
}

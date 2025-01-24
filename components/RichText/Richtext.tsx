import React from 'react';
import Link from 'next/link';
import { IconCheck } from '@tabler/icons-react';
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  List,
  rem,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import classes from './Richtext.module.css';

/*
{
    "content": "<p>We were tired of solutions that were super friendly for content editors but were challenging for developers to work with. Conversely, what good is DX if the content editors don't enjoy using the CMS?</p>",
    "headline": "Make your entire team happy",
    "id": "129625db-433f-4104-9922-3b803ba4599d",
    "alignment": "center",
    "tagline": "Why Us?"
}*/

export default function RichText({ data }: any) {
  const { tagline, headline, content, alignment } = data;
  return (
    <div className={classes.wrapper}>
      <Container size="lg" py="xl" id="pricing">
        <Group justify={alignment}>
          <Badge variant="filled" size="lg">
            {tagline}
          </Badge>
        </Group>

        <Title order={2} ta={alignment} className={classes.title} mt="sm">
          {headline}
        </Title>

        <Text c="dimmed" className={classes.description} ta={alignment} mt="md"></Text>

        <Box dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </div>
  );
}

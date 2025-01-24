import React from 'react';
import { Badge, Box, Container, Group, Image, SimpleGrid, Text, Title } from '@mantine/core';
import { getImageUrl } from '@/lib/directus';
import classes from './Gallery.module.css';

export default function Gallery({ data }: any) {
  const { items, headline, tagline } = data;
  return (
    <div className={classes.wrapper}>
      <Container size="lg" py="xl" id="Gallery">
        <Group justify="center">
          <Badge variant="filled" size="lg">
            {tagline}
          </Badge>
        </Group>

        <Title order={2} ta="center" className={classes.title} mt="sm">
          {headline}
        </Title>

        <SimpleGrid cols={2} spacing="lg">
          {items.map((item: any, index: number) => (
            <Box
              key={index}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              <Image
                src={getImageUrl(item.directus_file.filename_disk)}
                alt={item.caption}
                radius="md"
              />
              <Text c="white" size="lg" w={700}>
                {item.caption}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}

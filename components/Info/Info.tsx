import { Box, Container } from '@mantine/core';

type InfoProps = {
  content: string;
  headline: string;
  tagline: string;
  item: {
    content: string;
    headline: string;
    id: string;
    alignment: string;
    tagline: string;
  };
};

export function Info(data: InfoProps) {
  return (
    <Container my={'xl'}>
      <Box dangerouslySetInnerHTML={{ __html: data.item.content }} />
    </Container>
  );
}

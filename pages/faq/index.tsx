import { Container, Title } from '@mantine/core';
import { FAQ } from '@/components/FAQ/FAQ';
import InnerLayout from '@/components/InnerLayout';

export default function FAQPage() {
  return (
    <InnerLayout>
      <Container style={{ marginTop: '50px' }}>
        <Title ta="center">Frequently Asked Questions</Title>
        <FAQ />
      </Container>
    </InnerLayout>
  );
}

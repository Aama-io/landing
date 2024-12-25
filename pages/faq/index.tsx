import { Container, Title } from '@mantine/core';
import { Faq } from '@/components/FAQ/FAQ';
import InnerLayout from '@/components/Layout';

export default function FAQPage() {
  return (
    <InnerLayout>
      <Container style={{ marginTop: '50px' }}>
        <Title ta="center">Frequently Asked Questions</Title>
        <Faq />
      </Container>
    </InnerLayout>
  );
}

import { Container, Title, SimpleGrid, Text } from '@mantine/core';
import classes from './FAQ.module.css';

const faqData = [
  {
    question: 'What is AAMAs fund management software?',
    answer: 'AAMA is a comprehensive fund management software that automates NAV calculations, compliance reporting, and investor management using blockchain technology. It streamlines operations for fund managers while providing transparency and efficiency.',
  },
  {
    question: 'How does the automated NAV calculation work?',
    answer: 'Our software uses smart contracts and real-time data feeds to automatically calculate NAV, eliminating manual processes and reducing errors. The system updates continuously and provides instant reconciliation.',
  },
  {
    question: 'What types of funds can use the software?',
    answer: 'Our software supports various fund types including mutual funds, hedge funds, and investment trusts. Its designed to be flexible and can accommodate different investment strategies and asset classes.',
  },
  {
    question: 'How does the tokenization feature work?',
    answer: 'Fund shares can be tokenized on multiple blockchains, enabling fractional ownership and improved liquidity. The process is compliant with regulatory requirements and includes built-in transfer restrictions.',
  },
  {
    question: 'What security measures are in place?',
    answer: 'We implement bank-grade security with multi-signature controls, regular audits, and encrypted data storage. Our software undergoes continuous security testing and monitoring.',
  },
  {
    question: 'How do you handle compliance requirements?',
    answer: 'Our software includes built-in compliance checks and automated reporting tools that adapt to various regulatory frameworks. We regularly update our compliance features to meet evolving requirements.',
  },
];

export function FAQ() {
  return (
    <Container size="lg" py="xl">
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>
      
      <Text c="dimmed" ta="center" mb="xl">
        Everything you need to know about the software
      </Text>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {faqData.map((item, index) => (
          <div key={index} className={classes.item}>
            <Text fw={500} size="lg" mb="xs">
              {item.question}
            </Text>
            <Text size="sm" c="dimmed">
              {item.answer}
            </Text>
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
}

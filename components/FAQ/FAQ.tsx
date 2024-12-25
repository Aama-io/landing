import { Accordion, Container, Grid, Image, Title } from '@mantine/core';
import classes from './FAQ.module.css';

const faqs = [
  {
    question: 'What is included in the boilerplate?',
    answer: 'The boilerplate includes landing pages, authentication pages, reusable components, and a responsive design optimized for performance.',
  },
  {
    question: 'How can I customize the landing page?',
    answer: 'You can easily customize the landing page by editing the prebuilt components and styles provided in the boilerplate.',
  },
  {
    question: 'Is the authentication system secure?',
    answer: 'Yes, the authentication system is built using secure practices, including hashed passwords and session management.',
  },
  {
    question: 'Can I integrate third-party APIs?',
    answer: 'Absolutely! The codebase is modular and designed to make it easy to integrate third-party APIs and services.',
  },
];

export function Faq() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg" id='faq'>
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={'/image-faq.svg'} alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" variant="separated">
              {faqs.map((faq, index) => (
                <Accordion.Item className={classes.item} value={`faq-${index}`} key={index}>
                  <Accordion.Control>{faq.question}</Accordion.Control>
                  <Accordion.Panel>{faq.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

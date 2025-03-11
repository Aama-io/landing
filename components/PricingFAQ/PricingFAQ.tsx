import { Container, Title, Accordion } from '@mantine/core';
import classes from './PricingFAQ.module.css';

const faqData = [
  {
    question: "What are the payment terms?",
    answer: "Our fees are charged monthly based on your Assets Under Management (AUM). For the Basic and Professional plans, payments are processed automatically. Enterprise plans have flexible payment terms."
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. When upgrading, you'll get immediate access to new features."
  },
  {
    question: "What's included in the setup fee?",
    answer: "The setup fee covers initial fund configuration, blockchain deployment, smart contract auditing, and basic KYC/AML integration. Enterprise plans may have custom setup requirements."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 14-day free trial on our Professional plan. This gives you full access to test our platform's features and ensure it meets your fund's needs."
  },
  {
    question: "How is AUM calculated?",
    answer: "AUM is calculated as the total value of assets managed through our platform, measured in USD. The calculation is performed daily using oracle price feeds."
  },
  {
    question: "What kind of support do you provide?",
    answer: "Basic plans include email support with 24-hour response time. Professional plans include priority support with 4-hour response time. Enterprise plans get 24/7 dedicated support with a personal account manager."
  }
];

export function PricingFAQ() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Title ta="center" className={classes.title}>
          Frequently Asked Questions
        </Title>

        <Accordion
          variant="separated"
          radius="md"
          className={classes.accordion}
        >
          {faqData.map((item, index) => (
            <Accordion.Item key={index} value={`item-${index}`}>
              <Accordion.Control>{item.question}</Accordion.Control>
              <Accordion.Panel>{item.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
} 
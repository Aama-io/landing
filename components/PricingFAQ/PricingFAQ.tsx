import { Container, Title, Accordion, Grid, Text, ThemeIcon, Stack, Box } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import classes from './PricingFAQ.module.css';

const faqData = [
  {
    question: "How are the fees calculated?",
    answer: "Our fees are calculated as a percentage of your Assets Under Management (AUM) and charged monthly. The percentage varies based on your plan tier and total assets. For example, if you're on our Professional plan with a 0.5% annual fee and $1M AUM, your monthly fee would be approximately SGD 417."
  },
  {
    question: "What are the payment terms?",
    answer: "For Professional and Professional Plus plans, fees are charged automatically on a monthly basis. Enterprise plans have flexible payment terms with options for quarterly or annual billing. We accept payments via bank transfer, credit card, and various electronic payment methods."
  },
  {
    question: "Can I switch between pricing plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. When upgrading from Professional to Professional Plus, you'll get immediate access to advanced features. There's no penalty for switching plans, and our team is available to help with the transition."
  },
  {
    question: "What's included in the setup fee?",
    answer: "The setup fee covers initial platform configuration, account setup, data migration, and KYC/AML integration. This includes configuring your fund management dashboard, deploying your investor portal, and establishing necessary compliance protocols based on your jurisdiction's requirements."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 14-day free trial on our Professional plan with access to core features. This gives you the opportunity to test our platform thoroughly and ensure it meets your fund's needs before committing. No credit card is required to start your trial."
  },
  {
    question: "How is AUM calculated for fee purposes?",
    answer: "AUM is calculated as the total value of assets managed through our platform, measured in SGD equivalent. The calculation is performed daily based on your fund's reported asset values, and the monthly average is used for billing purposes. This ensures fair pricing even with market fluctuations."
  },
  {
    question: "What kind of support do you provide?",
    answer: "Professional plans include email support with 24-hour response time. Professional Plus plans include priority support with 4-hour response time during business hours and scheduled video consultations. Enterprise plans get 24/7 dedicated support with a personal account manager. All clients have access to our comprehensive knowledge base and training resources."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, we are fully transparent about our pricing. The percentage fee and any fixed monthly fee (for Professional Plus) are the only recurring charges. The only additional costs would be for optional add-on services like custom development work, specialized compliance solutions, or premium integrations that are clearly outlined before any commitment."
  },
  {
    question: "What happens if I exceed my AUM tier?",
    answer: "If your fund grows beyond your current AUM tier, we'll automatically adjust your rate to the appropriate tier in the next billing cycle. We provide notifications when you approach tier thresholds to avoid surprises. In many cases, moving to a higher AUM tier actually results in a lower percentage fee."
  },
  {
    question: "What advanced features are included in Professional Plus?",
    answer: "Professional Plus includes advanced analytics, customizable reporting templates, API access for system integration, priority support, and additional user seats. You'll also receive regular strategy consultations with our fund management experts to optimize your operations and improve efficiency."
  },
  {
    question: "Do you offer discounts for long-term commitments?",
    answer: "Yes, we offer discounts for annual payment commitments. You can save up to 20% by choosing annual billing instead of monthly. Enterprise clients with multi-year commitments can receive additional custom pricing. Please contact our sales team to discuss your specific requirements."
  }
];

export function PricingFAQ() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid gutter={50}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack className={classes.header}>
              <ThemeIcon size={80} radius="md" className={classes.icon}>
                <IconQuestionMark size={40} stroke={1.5} />
              </ThemeIcon>
              
              <Title className={classes.title}>
                Frequently Asked Questions
              </Title>
              
              <Text className={classes.description}>
                Find answers to common questions about our pricing, billing, and services. 
                If you don't see your question here, please contact our support team.
              </Text>

              <Box className={classes.contactInfo}>
                <Text fw={700} mb={5}>Still have questions?</Text>
                <Text size="sm">
                  Contact us at <a href="mailto:sales@aama.io" className={classes.link}>contact@aama.io</a> <br />
                  or through our <a href="/contact" className={classes.link}>contact page</a>.
                </Text>
              </Box>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Accordion
              variant="separated"
              radius="md"
              className={classes.accordion}
              chevronPosition="right"
              defaultValue="item-0"
            >
              {faqData.map((item, index) => (
                <Accordion.Item key={index} value={`item-${index}`} className={classes.item}>
                  <Accordion.Control className={classes.control}>{item.question}</Accordion.Control>
                  <Accordion.Panel className={classes.panel}>{item.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
} 
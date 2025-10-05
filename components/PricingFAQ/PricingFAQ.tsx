import { Container, Title, Accordion, Grid, Text, ThemeIcon, Stack, Box } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import classes from './PricingFAQ.module.css';
const faqData = [
  {
    question: "How are the fees calculated?",
    answer: "Our fees are based on your chosen plan tier - Starter, Growth, or Pro. Each plan has a fixed monthly fee and includes a set of features designed for different fund sizes and needs. The Starter plan is ideal for new funds, Growth for expanding funds, and Pro for established funds requiring advanced features."
  },
  {
    question: "What are the payment terms?",
    answer: "All plans are billed monthly with options for annual billing at a discount. We accept major credit cards, bank transfers, and electronic payment methods. Enterprise clients can arrange custom billing cycles and payment terms."
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle. When upgrading, you get immediate access to new features. There's no penalty for switching plans, and our team will help ensure a smooth transition."
  },
  {
    question: "What's included in the setup fee?",
    answer: "The one-time setup fee covers software configuration, account setup, basic data migration, and compliance integration. This includes setting up your fund dashboard, investor portal, and essential reporting templates. Enterprise plans may include additional customization during setup."
  },
  {
    question: "What kind of support do you provide?",
    answer: "Starter plans include email support with 24-hour response time. Growth plans add priority email support and scheduled consultations. Pro plans include 24/7 support, dedicated account manager, and regular strategy sessions. All clients have access to our documentation and training resources."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, our pricing is completely transparent. You pay only the monthly fee for your chosen plan. The only additional costs would be for optional services like custom development, specialized integrations, or premium features, which are clearly outlined before any commitment."
  },
  {
    question: "What features are included in each plan?",
    answer: "Starter plans include essential fund management tools, basic reporting, and investor portal. Growth adds advanced analytics, customizable reports, and API access. Pro includes everything plus white-labeling, unlimited users, custom workflows, and premium integrations. Full feature comparisons are available on our pricing page."
  },
  {
    question: "Do you offer discounts?",
    answer: "Yes, we offer a 20% discount for annual billing on all plans. Enterprise clients with multi-year commitments may qualify for additional discounts. Contact our sales team to discuss custom pricing options."
  },
  {
    question: "How does the Enterprise plan differ?",
    answer: "Enterprise plans are customized for large funds with complex needs. They include custom feature development, unlimited everything, dedicated support team, compliance consulting, and bespoke integrations. Pricing is tailored to your specific requirements."
  },
  {
    question: "What happens if my fund grows?",
    answer: "Our tiered plans are designed to scale with your fund. As you grow, you can easily upgrade to access more features and capacity. Our team will help recommend the right plan based on your evolving needs and ensure a seamless transition."
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
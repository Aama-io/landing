import { Container, Title, Accordion, Grid, Text, ThemeIcon, Stack, Box } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import classes from './PricingFAQ.module.css';
export const faqData = [
  {
    question: "How much does aama.io cost?",
    answer: "Pricing depends on how you operate. SPVs and syndicates are priced per deal — a single-asset SPV is a flat USD 4,900 to form, with annual administration scoped to your fund, and syndicate SPVs are 2.5% of the amount raised, capped between USD 3,500 and USD 10,000. Fund managers running a fund pay a monthly subscription by fund type and AUM, from USD 625/month up to USD 5,000/month. Fund administrators who need only the fund accounting engine start at USD 1,500/month for up to five client funds. Every plan also lists a one-time setup fee."
  },
  {
    question: "How much does an SPV cost?",
    answer: "A single-asset SPV is a flat USD 4,900 to form, with annual administration scoped to your fund. If you are syndicating a deal to many investors, pricing is 2.5% of the amount raised, capped between USD 3,500 and USD 10,000 — below the typical market rate. High-volume syndicate leads get volume pricing."
  },
  {
    question: "Do you offer accounting-only pricing for fund administrators?",
    answer: "Yes. Fund administration firms that need only the fund accounting engine — double-entry ledger, automated NAV, IFRS 9 / SFRS(I) 9 accounting, reconciliations and audit-ready reports — can choose a Fund Administrators plan from USD 1,500/month, priced by the number of client funds and white-labelled for your clients. The investor/LP portal is an optional add-on rather than bundled, which keeps the cost down."
  },
  {
    question: "How are the fees calculated?",
    answer: "Each plan has a fixed monthly fee (or a per-deal fee for SPVs) plus a one-time setup fee, with features scaled to your fund size and needs. Fund-manager plans scale by fund type and AUM; fund-administrator plans scale by the number of client funds; SPVs and syndicates are priced per deal."
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
    answer: "No, our pricing is completely transparent. You pay only the monthly fee (or per-deal fee) for your chosen plan, plus the one-time setup fee. The only additional costs would be optional add-ons like advanced integrations or premium features, which are clearly outlined before any commitment."
  },
  {
    question: "What features are included in each plan?",
    answer: "Starter plans include essential fund administration tools, basic reporting, and an investor portal. Growth adds advanced analytics, customizable reports, and API access. Pro includes everything plus white-labeling, unlimited users, configurable workflows, and premium integrations. Full feature comparisons are available on our pricing page."
  },
  {
    question: "Do you offer discounts?",
    answer: "Yes, we offer a 20% discount for annual billing on all plans. Enterprise clients with multi-year commitments may qualify for additional discounts. Contact our sales team to discuss custom pricing options."
  },
  {
    question: "How does the Enterprise plan differ?",
    answer: "Enterprise plans are configured for large funds with complex needs. They include configurable features, unlimited usage, a dedicated support team, compliance support, and advanced integrations. Pricing is tailored to your specific requirements."
  },
  {
    question: "What happens if my fund grows?",
    answer: "Our tiered plans are designed to scale with your fund. As you grow, you can easily upgrade to access more features and capacity. Our team will help recommend the right plan based on your evolving needs and ensure a smooth transition."
  }
];

export function PricingFAQ() {
  return (
    <div className={classes.wrapper}>
      <Container size="xl">
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
import { Container, Title, Text, List, SimpleGrid, Paper, Button, Group, Accordion } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { PageSchema } from '@/components/SEO/PageSchema';
import classes from '../styles/Legal.module.css';

const TRACKS = [
  {
    title: 'New fund or LP portal',
    time: 'About 2 weeks',
    body: 'Greenfield funds and Launch Free LP portal setups. Configuration, investor invites and first capital-call workflow — not a full historical migration.',
    steps: [
      'Kick-off and fund / vehicle parameters',
      'Chart of accounts or portal configuration',
      'User roles and branding',
      'Pilot capital call or first NAV period',
      'Go-live checklist and handover',
    ],
  },
  {
    title: 'SPV or syndicate',
    time: 'Days',
    body: 'Single-deal or syndicate vehicles under SPV Fund Management. Formation support, member onboarding and capital collection on the pay-when-you-collect path.',
    steps: [
      'Vehicle template and jurisdiction checklist',
      'Lead / member roles and carry terms',
      'KYC/AML and subscription flow',
      'Bank details and first capital call',
      'Member portal live',
    ],
  },
  {
    title: 'Fund administrator / multi-fund',
    time: '2–6 weeks',
    body: 'Studio / Practice / Firm rollouts for administrators servicing client funds. Timeline depends on client-fund count and white-label requirements.',
    steps: [
      'Workspace and client-fund segregation model',
      'Ledger templates per fund type',
      'Reporting and white-label packs',
      'Optional LP portal add-on',
      'Parallel run on a pilot client fund',
    ],
  },
  {
    title: 'Enterprise / complex migration',
    time: '8–12 weeks',
    body: 'Banks, multi-entity groups and funds with deep integrations, SSO and historical data cutover. Scoped as a project with a dedicated implementation plan.',
    steps: [
      'Discovery and integration map',
      'Data migration plan (investors, positions, GL)',
      'SSO / API / custodian connections',
      'Parallel run and reconciliation',
      'Cutover, training and hypercare',
    ],
  },
];

const FAQS = [
  {
    q: 'Why do some pages say 2 weeks and others 8–12 weeks?',
    a: 'They describe different scopes. A new fund or LP portal configuration is typically about 2 weeks. Enterprise migrations with integrations and historical cutover are typically 8–12 weeks. We state both so buyers can match the timeline to their project.',
  },
  {
    q: 'What is in the setup fee?',
    a: 'Configuration, account setup, basic data migration and compliance workflow integration — fund dashboard, investor portal templates and essential reports. Larger migrations are scoped separately.',
  },
  {
    q: 'Do you migrate existing funds?',
    a: 'Yes, as a scoped project: investor register, commitments, capital activity, positions, opening balances and documents. Steps are indicative until discovery; see the comparison claims register for open confirmation items.',
  },
  {
    q: 'Who does the work?',
    a: 'Your team owns business decisions and data sign-off. aama.io provides configuration support, training and (on higher tiers) a dedicated account manager. Enterprise projects include a named implementation lead.',
  },
];

export default function ImplementationPage() {
  return (
    <>
      <SEO
        title="Implementation & Onboarding | aama.io"
        description="Clear timelines for launching aama.io: ~2 weeks for a new fund or LP portal, days for an SPV, 2–6 weeks for fund administrators, 8–12 weeks for enterprise migrations."
        keywords="aama.io implementation, fund software onboarding, fund accounting migration, SPV onboarding, fund administrator setup"
      />
      <PageSchema
        name="Implementation and onboarding"
        description="Onboarding tracks and timelines for aama.io products."
        path="/implementation"
      />
      <PageShell>
        <div className={classes.wrapper}>
          <Container size="xl">
            <Title className={classes.title}>Implementation &amp; onboarding</Title>
            <Text className={classes.lastUpdated}>
              Timelines are typical, not guarantees. Exact dates are agreed in your statement of work.
            </Text>

            <div className={classes.content}>
              <Text mb="xl">
                aama.io is three products — Fund Accounting, Fund Administration &amp; LP Portal, and
                SPV Fund Management. Implementation length depends on which product you start with
                and whether you are configuring a new vehicle or migrating history.
              </Text>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
                {TRACKS.map((t) => (
                  <Paper key={t.title} withBorder p="lg" radius="md">
                    <Text size="xs" tt="uppercase" fw={700} c="dimmed" style={{ letterSpacing: '0.04em' }}>
                      {t.time}
                    </Text>
                    <Text fw={750} fz="lg" mt={8}>{t.title}</Text>
                    <Text size="sm" c="dimmed" mt={8} mb="md">{t.body}</Text>
                    <List size="sm" spacing={6}>
                      {t.steps.map((step) => (
                        <List.Item key={step}>{step}</List.Item>
                      ))}
                    </List>
                  </Paper>
                ))}
              </SimpleGrid>

              <Title order={2}>What we need from you</Title>
              <List mb="xl">
                <List.Item>Fund / vehicle term sheet or equivalent parameters</List.Item>
                <List.Item>Investor register export (for migrations)</List.Item>
                <List.Item>Opening balances and recent statements (for ledger cutover)</List.Item>
                <List.Item>Branding assets for white-label portal or client packs</List.Item>
                <List.Item>Named internal owner for decisions and UAT sign-off</List.Item>
              </List>

              <Title order={2}>FAQ</Title>
              <Accordion variant="separated" radius="md" mb="xl">
                {FAQS.map((f) => (
                  <Accordion.Item key={f.q} value={f.q}>
                    <Accordion.Control>{f.q}</Accordion.Control>
                    <Accordion.Panel>
                      <Text size="sm" c="dimmed">{f.a}</Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>

              <Group gap="md">
                <Button component={Link} href="/contact" rightSection={<IconArrowRight size={16} />}>
                  Plan your onboarding
                </Button>
                <Button component={Link} href="/security" variant="default">
                  Security &amp; DD pack
                </Button>
              </Group>
            </div>
          </Container>
        </div>
      </PageShell>
    </>
  );
}

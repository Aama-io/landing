import { Container, Title, Text, List, Button, Group, Anchor } from '@mantine/core';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';
import Link from 'next/link';
import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import { PageSchema } from '@/components/SEO/PageSchema';
import classes from '../styles/Legal.module.css';

const CONTROLS = [
  {
    title: 'Access control',
    items: [
      'Role-based access (RBAC) scoped by organisation, fund and function',
      'Multi-factor authentication for platform users',
      'SSO available on enterprise / Firm plans',
      'Session management and credential hygiene controls',
    ],
  },
  {
    title: 'Data protection',
    items: [
      'Encryption in transit (TLS) and at rest',
      'Logical segregation of customer data by organisation',
      'Backups with documented retention and restore procedures',
      'Singapore PDPA-oriented handling of personal data',
    ],
  },
  {
    title: 'Auditability',
    items: [
      'Time-stamped audit trail on material actions',
      'Approval workflows before posting to the ledger',
      'Source documents attachable to journal entries',
      'Exportable records for auditors and regulators',
    ],
  },
  {
    title: 'Application & operations security',
    items: [
      'Independent vulnerability assessment and penetration testing (VAPT) — summary available under NDA',
      'Dependency and infrastructure hardening practices',
      'Incident response process with customer notification as required by contract and law',
      'Availability and support commitments agreed in enterprise SLAs (not a blanket public percentage)',
    ],
  },
];

const PACK = [
  'Architecture overview (high level)',
  'Security controls summary (this page, expanded)',
  'VAPT executive summary (under NDA)',
  'Subprocessors and hosting regions',
  'Data retention and deletion outline',
  'Business continuity / DR outline (RTO/RPO by contract)',
  'Questionnaire response support (SIG / CAIQ-style, scoped)',
];

export default function SecurityPage() {
  return (
    <>
      <SEO
        title="Enterprise Security & Due Diligence | aama.io"
        description="Security controls, audit trails, VAPT under NDA, and the due-diligence pack for fund managers, administrators and enterprise buyers evaluating aama.io."
        keywords="aama.io security, fund software security, VAPT, due diligence pack, RBAC, encryption, PDPA, fund accounting security"
      />
      <PageSchema
        name="Enterprise security and due diligence"
        description="Security controls and due-diligence materials for evaluating aama.io."
        path="/security"
      />
      <PageShell>
        <div className={classes.wrapper}>
          <Container size="xl">
            <Title className={classes.title}>Enterprise security &amp; due diligence</Title>
            <Text className={classes.lastUpdated}>Last updated: November 2026</Text>

            <div className={classes.content}>
              <Text mb="xl">
                This page is the public security overview for buyers running vendor due diligence.
                It describes controls we operate today. Absolute claims (for example a published
                uptime percentage or a named certification we have not linked) are intentionally
                omitted here — enterprise commitments are written into the contract and the
                confidential pack.
              </Text>

              <Title order={2}>What we will and will not claim publicly</Title>
              <List mb="xl">
                <List.Item>
                  <b>We describe:</b> encryption, RBAC, MFA, audit trails, PDPA-oriented processing,
                  and that independent VAPT is performed.
                </List.Item>
                <List.Item>
                  <b>We do not publish:</b> a blanket &quot;SOC 2 Type II certified&quot; claim, a marketing
                  uptime percentage, or &quot;100% regulatory compliance.&quot; Regulatory obligations stay
                  with the licensed manager or administrator.
                </List.Item>
                <List.Item>
                  <b>Under NDA / contract:</b> VAPT summary, detailed architecture, subprocessors,
                  SLA numbers and recovery objectives.
                </List.Item>
              </List>

              {CONTROLS.map((section) => (
                <div key={section.title}>
                  <Title order={2}>{section.title}</Title>
                  <List mb="xl">
                    {section.items.map((item) => (
                      <List.Item key={item}>{item}</List.Item>
                    ))}
                  </List>
                </div>
              ))}

              <Title order={2}>Due-diligence pack</Title>
              <Text mb="md">
                Request the pack during a demo or via{' '}
                <Anchor component={Link} href="/contact?inquiryType=security">
                  contact
                </Anchor>
                . Typical contents:
              </Text>
              <List mb="xl">
                {PACK.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>

              <Title order={2}>Related</Title>
              <List mb="xl">
                <List.Item>
                  <Anchor component={Link} href="/compliance">Regulatory compliance posture</Anchor>
                </List.Item>
                <List.Item>
                  <Anchor component={Link} href="/privacy">Privacy Policy</Anchor>
                </List.Item>
                <List.Item>
                  <Anchor component={Link} href="/implementation">Implementation &amp; onboarding</Anchor>
                </List.Item>
              </List>

              <Group gap="md" mt="xl">
                <Button
                  component={Link}
                  href="/contact?inquiryType=security"
                  rightSection={<IconDownload size={16} />}
                >
                  Request the DD pack
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="default"
                  rightSection={<IconArrowRight size={16} />}
                >
                  Book a security walkthrough
                </Button>
              </Group>
            </div>
          </Container>
        </div>
      </PageShell>
    </>
  );
}

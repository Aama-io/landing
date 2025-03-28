import { AppShell, Container, Title, Text, List, Card, Grid, ThemeIcon, Group, Anchor } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SEO } from '@/components/SEO/SEO';
import { IconCheck, IconShield, IconUserCheck, IconLock, IconReportMoney, IconScale, IconServer } from '@tabler/icons-react';
import classes from '../styles/Legal.module.css';

export default function CompliancePage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <SEO 
        title="Regulatory Compliance | AAMA"
        description="AAMA.io is a platform developed by Uxqode Pte Ltd, enabling compliant fund managers to launch, manage, and administer funds in accordance with Singapore regulations."
        keywords="Singapore regulatory compliance, MAS compliance, fund management platform, SFA, FAA, PDPA, AML/CFT, Singapore financial regulations, Uxqode"
      />
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <div className={classes.wrapper}>
          <Container size="lg">
            <Title className={classes.title}>Regulatory Compliance</Title>
            <Text className={classes.lastUpdated}>Last updated: April 2024</Text>

            <div className={classes.content}>
              <Text mb="xl">
                AAMA.io is a platform developed by Uxqode Pte Ltd, a registered software company with the Singapore authorities. 
                We provide a technology platform that enables compliant fund managers to easily launch funds to investors, process investments, 
                and manage fund administration and accounting. Our platform is designed to support fund managers in meeting 
                their regulatory obligations while streamlining their operations.
              </Text>

              <Title order={2}>1. Our Role as a Platform Provider</Title>
              <Text mb="xl">
                As a platform provider, AAMA.io does not directly manage funds or provide financial advice. Instead, we offer technology solutions to regulated fund managers who maintain their own licenses and regulatory approvals. Our clients, the fund managers, remain responsible for their regulatory compliance, while our platform is designed to help them fulfill these obligations efficiently.
              </Text>

              <Title order={2}>2. Platform Compliance Standards</Title>
              <Text mb="md">
                AAMA.io's platform is designed to facilitate compliance with key Singapore financial regulations, including:
              </Text>
              <List mb="xl">
                <List.Item><b>Securities and Futures Act (Cap. 289) ("SFA")</b> – Supporting fund managers in meeting requirements for fund operation and investor communications</List.Item>
                <List.Item><b>Financial Advisers Act (Cap. 110) ("FAA")</b> – Enabling appropriate disclosures and documentation</List.Item>
                <List.Item><b>Personal Data Protection Act 2012 ("PDPA")</b> – Ensuring proper handling of personal data collected through our platform</List.Item>
                <List.Item><b>MAS Guidelines and Notices</b> – Incorporating features that support compliance with relevant MAS requirements</List.Item>
              </List>

              <Title order={2}>3. Technology Standards and Security</Title>
              <Text mb="md">
                As a technology provider, we adhere to high standards for platform security and reliability:
              </Text>
              <List mb="xl">
                <List.Item><b>MAS Technology Risk Management Guidelines</b> – Following best practices for technology risk management</List.Item>
                <List.Item><b>Data Protection Measures</b> – Implementing robust data protection controls</List.Item>
                <List.Item><b>System Availability</b> – Maintaining high standards for platform uptime and reliability</List.Item>
                <List.Item><b>Cybersecurity Standards</b> – Employing comprehensive security measures to protect platform and data</List.Item>
              </List>

              <Title order={2}>4. Platform Features Supporting Compliance</Title>
              <Text mb="xl">
                Our platform includes features designed to help fund managers meet their regulatory obligations:
              </Text>

              <Grid mb="xl">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Card withBorder padding="lg" radius="md">
                    <Group mb="md">
                      <ThemeIcon color="blue" size="lg" radius="md">
                        <IconUserCheck size={20} />
                      </ThemeIcon>
                      <Text fw={700}>Investor Onboarding</Text>
                    </Group>
                    <List spacing="sm">
                      <List.Item>Structured KYC/AML documentation collection</List.Item>
                      <List.Item>Accredited investor verification workflows</List.Item>
                      <List.Item>Risk profiling and suitability assessment tools</List.Item>
                      <List.Item>Digital signing of required disclosures and agreements</List.Item>
                    </List>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Card withBorder padding="lg" radius="md">
                    <Group mb="md">
                      <ThemeIcon color="blue" size="lg" radius="md">
                        <IconReportMoney size={20} />
                      </ThemeIcon>
                      <Text fw={700}>Fund Administration</Text>
                    </Group>
                    <List spacing="sm">
                      <List.Item>Automated NAV calculations and reporting</List.Item>
                      <List.Item>Subscription and redemption processing</List.Item>
                      <List.Item>Investor communications and reporting</List.Item>
                      <List.Item>Fee calculation and management</List.Item>
                    </List>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }} mt="md">
                  <Card withBorder padding="lg" radius="md">
                    <Group mb="md">
                      <ThemeIcon color="blue" size="lg" radius="md">
                        <IconLock size={20} />
                      </ThemeIcon>
                      <Text fw={700}>Data Security</Text>
                    </Group>
                    <List spacing="sm">
                      <List.Item>Encryption of sensitive data</List.Item>
                      <List.Item>Role-based access controls</List.Item>
                      <List.Item>Audit logging and monitoring</List.Item>
                      <List.Item>Secure data storage and transmission</List.Item>
                    </List>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }} mt="md">
                  <Card withBorder padding="lg" radius="md">
                    <Group mb="md">
                      <ThemeIcon color="blue" size="lg" radius="md">
                        <IconServer size={20} />
                      </ThemeIcon>
                      <Text fw={700}>Reporting</Text>
                    </Group>
                    <List spacing="sm">
                      <List.Item>Customizable regulatory reporting templates</List.Item>
                      <List.Item>Data extraction for compliance filings</List.Item>
                      <List.Item>Transaction monitoring reports</List.Item>
                      <List.Item>Audit-ready record keeping</List.Item>
                    </List>
                  </Card>
                </Grid.Col>
              </Grid>

              <Title order={2}>5. Data Protection and Privacy</Title>
              <Text mb="xl">
                As a platform that processes personal data, we adhere strictly to the Personal Data Protection Act (PDPA) of Singapore:
              </Text>
              <List mb="xl">
                <List.Item>Appointment of a Data Protection Officer (DPO) as required by the PDPA</List.Item>
                <List.Item>Implementation of comprehensive data protection policies and procedures</List.Item>
                <List.Item>Collection, use, and disclosure of personal data only with valid consent or under lawful bases</List.Item>
                <List.Item>Implementation of reasonable security arrangements to protect personal data</List.Item>
                <List.Item>Platform features that enable fund managers to comply with PDPA requirements</List.Item>
                <List.Item>Regular staff training on data protection obligations</List.Item>
              </List>

              <Title order={2}>6. Anti-Money Laundering Controls</Title>
              <Text mb="xl">
                While our clients are primarily responsible for their AML/CFT compliance, our platform includes features to support these efforts:
              </Text>
              <List mb="xl">
                <List.Item>Structured workflow for Customer Due Diligence (CDD) document collection</List.Item>
                <List.Item>Enhanced Due Diligence (EDD) capabilities for higher-risk cases</List.Item>
                <List.Item>Integration with screening services for sanctions and PEP checks</List.Item>
                <List.Item>Transaction monitoring capabilities and suspicious activity flagging</List.Item>
                <List.Item>Record keeping of all verification documents and activities</List.Item>
              </List>

              <Title order={2}>7. Client Requirements</Title>
              <Text mb="xl">
                Fund managers using our platform must:
              </Text>
              <List mb="xl">
                <List.Item>Maintain all necessary licenses and registrations required under applicable laws</List.Item>
                <List.Item>Comply with all regulatory requirements applicable to their operations</List.Item>
                <List.Item>Ensure their funds have received all necessary approvals before launch</List.Item>
                <List.Item>Maintain their own compliance programs and controls</List.Item>
                <List.Item>Use our platform in accordance with all applicable regulations</List.Item>
              </List>

              <Title order={2}>8. Security and Business Continuity</Title>
              <Text mb="xl">
                As a critical service provider to financial institutions, we maintain:
              </Text>
              <List mb="xl">
                <List.Item>Comprehensive information security management system</List.Item>
                <List.Item>Regular security testing and vulnerability assessments</List.Item>
                <List.Item>Robust business continuity and disaster recovery plans</List.Item>
                <List.Item>24/7 monitoring of platform availability and security</List.Item>
                <List.Item>Regular backups and data redundancy measures</List.Item>
              </List>

              <Title order={2}>9. Ongoing Improvements</Title>
              <Text mb="xl">
                We continuously enhance our platform to address:
              </Text>
              <List mb="xl">
                <List.Item>Changes in regulatory requirements</List.Item>
                <List.Item>Emerging industry best practices</List.Item>
                <List.Item>Client feedback and requirements</List.Item>
                <List.Item>Technological advancements in security and functionality</List.Item>
              </List>

              <Title order={2}>10. Vendor Management</Title>
              <Text mb="xl">
                For fund managers subject to MAS Guidelines on Outsourcing, we provide:
              </Text>
              <List mb="xl">
                <List.Item>Clear service level agreements</List.Item>
                <List.Item>Transparency regarding our controls and processes</List.Item>
                <List.Item>Support during regulatory examinations and audits</List.Item>
                <List.Item>Regular performance and compliance reporting</List.Item>
              </List>

              <Title order={2}>11. Contact Us</Title>
              <Text mb="xl">
                For any compliance-related questions or to learn more about how our platform can support your regulatory obligations, please contact us at <Anchor href="mailto:contact@aama.io">contact@aama.io</Anchor>.
              </Text>
            </div>
          </Container>
        </div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
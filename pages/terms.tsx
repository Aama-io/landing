import { AppShell, Container, Title, Text, List } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import classes from '../styles/Legal.module.css';

export default function TermsOfUse() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <div className={classes.wrapper}>
          <Container size="lg">
            <Title className={classes.title}>Terms of Use</Title>
            <Text className={classes.lastUpdated}>Last updated: March 2024</Text>

            <div className={classes.content}>
              <Text mb="xl">
                These Terms of Use ("Terms") govern your access to and use of AAMA.io's services. 
                By using our platform, you agree to these Terms.
              </Text>

              <Title order={2}>1. Acceptance of Terms</Title>
              <Text mb="xl">
                By accessing or using AAMA.io, you agree to be bound by these Terms and our Privacy Policy.
              </Text>

              <Title order={2}>2. User Accounts</Title>
              <Text mb="xl">
                When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account and password. AAMA.io cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
              </Text>

              <Title order={2}>3. Acceptable Use</Title>
              <Text mb="md">You agree not to engage in any of the following prohibited activities:</Text>
              <List mb="xl">
                <List.Item>Using the service for any illegal purpose or in violation of any laws</List.Item>
                <List.Item>Violating the intellectual property rights of others</List.Item>
                <List.Item>Attempting to interfere with, compromise the system integrity or security</List.Item>
                <List.Item>Engaging in any automated use of the system</List.Item>
                <List.Item>Impersonating another user or person</List.Item>
              </List>

              <Title order={2}>4. Intellectual Property</Title>
              <Text mb="xl">
                The service and all of its original content, features, and functionality are owned by AAMA.io and are protected by international copyright, trademark, and other intellectual property rights laws.
              </Text>

              <Title order={2}>5. Termination</Title>
              <Text mb="xl">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.
              </Text>

              <Title order={2}>6. Limitation of Liability</Title>
              <Text mb="xl">
                In no event shall AAMA.io, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </Text>

              <Title order={2}>7. Changes to Terms</Title>
              <Text mb="xl">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
              </Text>

              <Title order={2}>8. Contact Information</Title>
              <Text mb="xl">
                If you have any questions about these Terms, please contact us at support@aama.io.
              </Text>

              <Title order={2}>9. Governing Law</Title>
              <Text mb="xl">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </Text>

              <Title order={2}>10. Disclaimer</Title>
              <Text mb="xl">
                The service is provided on an "AS IS" and "AS AVAILABLE" basis. AAMA.io does not warrant that the service will be uninterrupted, timely, secure, or error-free.
              </Text>

             
            </div>
          </Container>
        </div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
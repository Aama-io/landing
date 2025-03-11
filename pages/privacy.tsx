import { AppShell, Container, Title, Text, List } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import classes from '../styles/Legal.module.css';

export default function PrivacyPolicy() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <div className={classes.wrapper}>
          <Container size="lg">
            <Title className={classes.title}>Privacy Policy</Title>
            <Text className={classes.lastUpdated}>Last updated: March 2024</Text>

            <div className={classes.content}>
              <Text mb="xl">
                At AAMA.io, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our platform.
              </Text>

              <Title order={2}>Information We Collect</Title>
              <List mb="xl">
                <List.Item>Personal identification information</List.Item>
                <List.Item>Transaction data</List.Item>
                <List.Item>Usage data and analytics</List.Item>
                <List.Item>Communication preferences</List.Item>
              </List>

              {/* Add more sections as needed */}
            </div>
          </Container>
        </div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
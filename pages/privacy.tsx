import { Container, Title, Text, List, Anchor, AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SEO } from '@/components/SEO/SEO';
import classes from '../styles/Legal.module.css';

export default function PrivacyPolicy() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <SEO 
        title="Privacy Policy | AAMA"
        description="AAMA.io's Privacy Policy - developed by Uxqode Pte Ltd, Our software enables fund managers to launch and manage funds while protecting personal data in compliance with Singapore's PDPA."
        keywords="privacy policy, PDPA, Singapore data protection, personal data, AAMA.io privacy, Uxqode, fund management software, data security"
      />
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <div className={classes.wrapper}>
          <Container size="lg">
            <Title className={classes.title}>Privacy Policy</Title>
            <Text className={classes.lastUpdated}>Last updated: April 2024</Text>

            <div className={classes.content}>
              <Text mb="xl">
                At AAMA.io, a software developed by Uxqode Pte Ltd, we are committed to protecting and respecting your privacy in accordance with Singapore's Personal Data Protection Act (PDPA). 
                This Privacy Policy explains how we collect, use, disclose, and protect your personal data when you use Our software or services.
                As a technology software that enables fund managers to launch and manage funds, we process data on behalf of these fund managers and their investors.
              </Text>

              <Title order={2}>1. Introduction</Title>
              <Text mb="xl">
                This Privacy Policy applies to all personal data that you may provide to AAMA.io and information we collect about you in relation to your use of Our software. By accessing Our software or using our services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your personal data as described herein.
              </Text>

              <Title order={2}>2. Our Role as a Data Processor and Controller</Title>
              <Text mb="xl">
                AAMA.io acts in two capacities with respect to personal data:
              </Text>
              <List mb="xl">
                <List.Item><b>As a Data Controller:</b> For data we collect directly from you for software access, account creation, and our direct relationship with you</List.Item>
                <List.Item><b>As a Data Processor:</b> For data we process on behalf of fund managers who use Our software to provide services to their investors</List.Item>
              </List>
              <Text mb="xl">
                This Privacy Policy primarily addresses our practices as a data controller. When we process data on behalf of fund managers, we do so according to their instructions and their own privacy policies may also apply to the processing of your data.
              </Text>

              <Title order={2}>3. Personal Data We Collect</Title>
              <Text mb="md">We may collect the following categories of personal data:</Text>
              <List mb="xl">
                <List.Item><b>Identity Information:</b> Name, NRIC/FIN/Passport number, date of birth, nationality, signature</List.Item>
                <List.Item><b>Contact Information:</b> Email address, telephone number, mailing address, business address</List.Item>
                <List.Item><b>Financial Information:</b> Bank account details, payment card information, transaction history, investment preferences, fund transfers</List.Item>
                <List.Item><b>Professional Information:</b> Job title, employer, professional qualifications, accredited investor status</List.Item>
                <List.Item><b>Technical Information:</b> IP address, login credentials, browser type, device information</List.Item>
                <List.Item><b>Usage Data:</b> Information about how you use our website, software, and services</List.Item>
                <List.Item><b>Marketing Preferences:</b> Your preferences in receiving marketing communications</List.Item>
                <List.Item><b>Communication Records:</b> Records of communications between you and AAMA.io</List.Item>
              </List>

              <Title order={2}>4. Purposes for Collection, Use and Disclosure</Title>
              <Text mb="md">We collect, use, and disclose your personal data for the following purposes:</Text>
              <List mb="xl">
                <List.Item>To establish and manage your account on Our software</List.Item>
                <List.Item>To provide and administer Our software services</List.Item>
                <List.Item>To facilitate transactions and investments between fund managers and investors</List.Item>
                <List.Item>To fulfill our contractual obligations to you and to fund managers</List.Item>
                <List.Item>To comply with legal and regulatory obligations including KYC and AML requirements</List.Item>
                <List.Item>To support fund managers in verifying investor identities and conducting background checks</List.Item>
                <List.Item>To respond to your inquiries and provide customer support</List.Item>
                <List.Item>To improve and personalize Our software and services</List.Item>
                <List.Item>To communicate important notices and updates to you</List.Item>
                <List.Item>To protect our legal rights and interests</List.Item>
                <List.Item>To detect and prevent fraud and security breaches</List.Item>
                <List.Item>To conduct market research and data analytics to improve Our software</List.Item>
              </List>

              <Title order={2}>5. Consent</Title>
              <Text mb="xl">
                By providing your personal data to AAMA.io, you consent to the collection, use, and disclosure of your personal data for the purposes set out in this Privacy Policy. You may withdraw your consent at any time by contacting us using the details provided below. However, please note that withdrawal of consent may affect our ability to provide software services to you. We will notify you of the consequences of your withdrawal of consent.
              </Text>

              <Title order={2}>6. Notification Obligation</Title>
              <Text mb="xl">
                We will notify you of the purposes for which we intend to collect, use, or disclose your personal data before such collection, use, or disclosure, unless applicable exceptions under the PDPA apply. If we intend to use or disclose your personal data for a new purpose, we will notify you and obtain your consent before doing so.
              </Text>

              <Title order={2}>7. Disclosure of Personal Data</Title>
              <Text mb="md">We may disclose your personal data to the following categories of recipients:</Text>
              <List mb="xl">
                <List.Item>Fund managers using Our software to provide services to their investors</List.Item>
                <List.Item>Our affiliated companies and business partners</List.Item>
                <List.Item>Third-party service providers who process data on our behalf</List.Item>
                <List.Item>Financial institutions and payment processors</List.Item>
                <List.Item>Professional advisors including lawyers, auditors, and insurers</List.Item>
                <List.Item>Regulatory authorities, government agencies, and law enforcement when required by law</List.Item>
                <List.Item>Potential buyers or investors in the event of a business transaction</List.Item>
              </List>
              <Text mb="xl">
                We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
              </Text>

              <Title order={2}>8. Transfer of Personal Data Outside Singapore</Title>
              <Text mb="xl">
                We may transfer your personal data to countries or territories outside Singapore for the purposes described in this Privacy Policy. When transferring personal data outside Singapore, we will take appropriate steps to ensure that the recipient provides a standard of protection to your personal data comparable to the protection under the PDPA, such as entering into contractual agreements that include appropriate safeguards.
              </Text>

              <Title order={2}>9. Data Security</Title>
              <Text mb="xl">
                We have implemented appropriate security measures to protect your personal data against unauthorized access, collection, use, disclosure, copying, modification, disposal, or similar risks. We regularly review and update these measures to maintain the integrity and confidentiality of your personal data. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
              </Text>

              <Title order={2}>10. Data Retention</Title>
              <Text mb="xl">
                We will retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. We will securely dispose of or anonymize personal data which we no longer need for any purpose. For data we process on behalf of fund managers, retention periods will be determined by their requirements and applicable regulations.
              </Text>

              <Title order={2}>11. Access and Correction</Title>
              <Text mb="xl">
                Under the PDPA, you have the right to request access to and correction of your personal data held by us. If you wish to make such a request, please contact us using the details provided below. We may charge a reasonable fee for processing your access request. We will respond to your request as soon as reasonably possible. If we are unable to provide access or make a correction within 30 days, we will inform you of the time frame within which we can respond. For personal data that we process on behalf of fund managers, we may direct your request to the relevant fund manager.
              </Text>

              <Title order={2}>12. Do Not Call (DNC) Registry</Title>
              <Text mb="xl">
                In compliance with Singapore's DNC Registry provisions, we will not send marketing messages to Singapore telephone numbers which are registered with the DNC Registry, unless we have received clear and unambiguous consent from you or we are permitted to do so under the PDPA. If you wish to opt out of receiving marketing messages from us, you can register your telephone number with the DNC Registry or contact us directly.
              </Text>

              <Title order={2}>13. Cookies and Tracking Technologies</Title>
              <Text mb="xl">
                Our software uses cookies and similar tracking technologies to enhance your browsing experience and collect information about how you use Our software. You can manage your cookie preferences through your browser settings. For more information about cookies and how we use them, please refer to our Cookie Policy.
              </Text>

              <Title order={2}>14. Third-Party Links</Title>
              <Text mb="xl">
                Our software may contain links to third-party websites and services that are not owned or controlled by Uxqode Pte Ltd or AAMA.io. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </Text>

              <Title order={2}>15. Changes to This Privacy Policy</Title>
              <Text mb="xl">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on Our software. The updated Privacy Policy will take effect from the date stated at the top of the policy. We encourage you to review this Privacy Policy periodically.
              </Text>

              <Title order={2}>16. Data Protection Officer</Title>
              <Text mb="xl">
                We have appointed a Data Protection Officer (DPO) responsible for overseeing compliance with this Privacy Policy and addressing any questions or concerns. If you have any inquiries, requests, or complaints regarding your personal data or this Privacy Policy, please contact our DPO at <Anchor href="mailto:contact@aama.io">contact@aama.io</Anchor>.
              </Text>

              <Title order={2}>17. Platform Users and Fund Managers</Title>
              <Text mb="xl">
                If you are a fund manager using Our software, you are responsible for ensuring that your collection, use, and disclosure of your investors' personal data comply with the PDPA and other applicable laws. You should provide your own privacy policy to your investors and ensure you have the necessary consents for us to process their data on your behalf. We will process such data in accordance with our agreement with you and your instructions.
              </Text>

              <Title order={2}>18. Contact Us</Title>
              <Text mb="md">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </Text>
              <Text mb="xl">
                <strong>Uxqode Pte Ltd (provider of AAMA.io)</strong><br />
                Email: <Anchor href="mailto:contact@aama.io">contact@aama.io</Anchor><br />
                Address: Singapore
              </Text>
            </div>
          </Container>
        </div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
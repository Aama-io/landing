import { AppShell, Container, Title, Text, List, Anchor } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SEO } from '@/components/SEO/SEO';
import classes from '../styles/Legal.module.css';

export default function TermsOfUse() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <SEO 
        title="Terms of Use | AAMA"
        description="AAMA.io's Terms of Use - The platform is developed by Uxqode Pte Ltd to enable compliant fund managers to launch and manage funds while meeting regulatory requirements."
        keywords="platform terms, fund management platform, Singapore laws, AAMA terms, Uxqode, software terms, user agreement"
      />
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <div className={classes.wrapper}>
          <Container size="lg">
            <Title className={classes.title}>Terms of Use</Title>
            <Text className={classes.lastUpdated}>Last updated: April 2024</Text>

            <div className={classes.content}>
              <Text mb="xl">
                These Terms of Use ("Terms") constitute a legally binding agreement between you and Uxqode Pte Ltd, 
                the owner and operator of AAMA.io ("Company," "we," "us," or "our") 
                governing your access to and use of the AAMA.io platform, website, and services (collectively, the "Services"). 
                By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
              </Text>

              <Title order={2}>1. Acceptance of Terms</Title>
              <Text mb="xl">
                By accessing or using our Services, you affirm that you are at least 18 years old, have the legal capacity to enter into these Terms, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services. If you are accessing or using our Services on behalf of a company, organization, or other entity, you represent and warrant that you have the authority to bind such entity to these Terms, in which case "you" shall refer to such entity.
              </Text>

              <Title order={2}>2. Platform Description and Role</Title>
              <Text mb="xl">
                AAMA.io is a technology platform developed by Uxqode Pte Ltd, a registered software company in Singapore. Our platform enables compliant fund managers to launch funds to investors, process investments, and manage fund administration and accounting. We do not directly manage funds, provide financial advice, or make investment decisions. We provide software tools to licensed fund managers who maintain their own regulatory approvals and compliance obligations. All investment activities conducted through our platform are the responsibility of the respective fund managers and investors.
              </Text>

              <Title order={2}>3. Singapore Law Compliance</Title>
              <Text mb="xl">
                Our Services are designed to support compliance with applicable Singapore laws and regulations, including but not limited to the Securities and Futures Act (SFA), Financial Advisers Act (FAA), Personal Data Protection Act (PDPA), and other applicable laws. You acknowledge and agree that your use of our Services is subject to compliance with these laws and regulations. As a platform user, you remain responsible for ensuring your own compliance with all applicable laws and regulations.
              </Text>

              <Title order={2}>4. Account Registration and Security</Title>
              <Text mb="xl">
                To access certain features of our Services, you may be required to create an account. When registering for an account, you must provide accurate, current, and complete information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or any other breach of security. We reserve the right to suspend or terminate your account if any information you provide is inaccurate, false, or incomplete, or if you have violated these Terms.
              </Text>

              <Title order={2}>5. User Types and Responsibilities</Title>
              <Text mb="md">Our platform serves different types of users with specific responsibilities:</Text>
              <List mb="xl">
                <List.Item><b>Fund Managers:</b> Licensed entities responsible for fund operations, investment decisions, and regulatory compliance. Fund managers must maintain all necessary licenses and approvals.</List.Item>
                <List.Item><b>Investors:</b> Individuals or entities investing in funds through the platform. Investors are responsible for their investment decisions and ensuring they meet applicable investor qualification requirements.</List.Item>
                <List.Item><b>Administrators:</b> Users who perform administrative and operational functions related to fund management.</List.Item>
              </List>

              <Title order={2}>6. Accredited Investor Status</Title>
              <Text mb="xl">
                Certain aspects of our Services may be available only to individuals or entities who qualify as "accredited investors" under Section 4A of the Securities and Futures Act (Cap. 289) of Singapore. If you are accessing features restricted to accredited investors, you represent and warrant that you meet the requirements for accredited investor status as defined under Singapore law. The fund managers utilizing our platform are responsible for verifying your accredited investor status, and you agree to provide all necessary documentation to facilitate this verification.
              </Text>

              <Title order={2}>7. Investment Risks and Disclaimer</Title>
              <Text mb="xl">
                All investments involve risk, including the possible loss of principal. The value of investments and the income derived from them may fluctuate over time. Past performance is not a reliable indicator of future results. Any projections, forecasts, or estimates displayed on our platform are provided by the respective fund managers and should not be construed as indicative of actual events that will occur. You acknowledge that AAMA.io does not provide investment advice or recommendations, and the information provided through our Services should not be construed as such. Any investment decision you make through our platform is your sole responsibility, and you should consider your investment objectives, risk tolerance, and financial circumstances before making any investment decisions.
              </Text>

              <Title order={2}>8. Permitted Use and Restrictions</Title>
              <Text mb="md">You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</Text>
              <List mb="xl">
                <List.Item>Use our Services in any way that violates any applicable law or regulation of Singapore</List.Item>
                <List.Item>Use our Services for any purpose that is prohibited by these Terms</List.Item>
                <List.Item>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of our Services</List.Item>
                <List.Item>Use any robot, spider, or other automatic device to access or use our Services</List.Item>
                <List.Item>Introduce any viruses, trojan horses, worms, logic bombs, or other harmful material</List.Item>
                <List.Item>Attempt to reverse engineer, decompile, or otherwise attempt to extract the source code of our software</List.Item>
                <List.Item>Use our Services for any illegal purpose, including money laundering or financing terrorism</List.Item>
                <List.Item>Impersonate or attempt to impersonate the Company, a Company employee, or another user</List.Item>
                <List.Item>Use our Services in any manner that could disable, overburden, damage, or impair the site</List.Item>
                <List.Item>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</List.Item>
              </List>

              <Title order={2}>9. Intellectual Property Rights</Title>
              <Text mb="xl">
                The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by Uxqode Pte Ltd, its licensors, or other providers and are protected by Singapore and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. These Terms do not grant you any rights to use the Company's name, logo, or other trademarks. You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, or transmit any material from our Services without our prior written consent.
              </Text>

              <Title order={2}>10. User Contributions</Title>
              <Text mb="xl">
                Our Services may allow you to post, submit, publish, display, or transmit content to other users. All content you contribute must comply with these Terms and must not violate any law or infringe any third-party rights. By providing any user contribution, you grant us a perpetual, non-exclusive, transferable, royalty-free, worldwide license to use, reproduce, modify, adapt, publish, translate, and distribute your content in connection with our Services. You represent and warrant that you own or control all rights in and to your user contributions and have the right to grant the license above.
              </Text>

              <Title order={2}>11. Third-Party Services and Content</Title>
              <Text mb="xl">
                Our Services may contain links to third-party websites, services, or content that are not owned or controlled by Uxqode Pte Ltd. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by or in connection with use of or reliance on any third-party content, goods, or services available through our Services.
              </Text>

              <Title order={2}>12. Platform Fees and Payment Terms</Title>
              <Text mb="xl">
                Access to and use of certain features of our platform may be subject to fees and charges. All fees are stated in the applicable subscription or service agreement and are exclusive of all taxes, including Singapore Goods and Services Tax (GST), which will be added where applicable. You agree to provide accurate and complete payment information and authorize us to charge your designated payment method for all fees incurred. All payments are non-refundable except as expressly provided in these Terms or as required by applicable Singapore law. We reserve the right to modify our fees at any time upon notice to you. Please note that any fees related to investments in funds are determined by the respective fund managers and not by AAMA.io.
              </Text>

              <Title order={2}>13. Data Processing</Title>
              <Text mb="xl">
                As a platform provider, we process data on behalf of fund managers and investors. You acknowledge that any personal data you provide may be shared with the relevant fund managers or other parties necessary for the provision of our Services. We process all data in accordance with our Privacy Policy and applicable data protection laws, including the Personal Data Protection Act (PDPA) of Singapore. When you use our platform, you authorize us to process your data as necessary to provide the Services.
              </Text>

              <Title order={2}>14. Termination</Title>
              <Text mb="xl">
                We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </Text>

              <Title order={2}>15. Disclaimer of Warranties</Title>
              <Text mb="xl">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. UXQODE PTE LTD DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES OR THE SERVERS THAT MAKE THE SERVICES AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </Text>

              <Title order={2}>16. Limitation of Liability</Title>
              <Text mb="xl">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL UXQODE PTE LTD OR ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES; (III) ANY CONTENT OBTAINED FROM THE SERVICES; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE. NOTHING IN THESE TERMS SHALL LIMIT OR EXCLUDE OUR LIABILITY FOR ANY LIABILITY WHICH CANNOT BE LIMITED OR EXCLUDED BY APPLICABLE LAW, INCLUDING LIABILITY FOR FRAUD OR FRAUDULENT MISREPRESENTATION.
              </Text>

              <Title order={2}>17. Indemnification</Title>
              <Text mb="xl">
                You agree to defend, indemnify, and hold harmless Uxqode Pte Ltd and its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Services; (ii) your violation of any term of these Terms; (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right; or (iv) any claim that your user contributions caused damage to a third party. This defense and indemnification obligation will survive these Terms and your use of the Services.
              </Text>

              <Title order={2}>18. Governing Law and Dispute Resolution</Title>
              <Text mb="xl">
                These Terms shall be governed by and construed in accordance with the laws of Singapore, without regard to its conflict of law provisions. Any dispute arising out of or in connection with these Terms, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre ("SIAC") in accordance with the Arbitration Rules of the Singapore International Arbitration Centre ("SIAC Rules") for the time being in force, which rules are deemed to be incorporated by reference in this clause. The seat of the arbitration shall be Singapore. The Tribunal shall consist of one (1) arbitrator. The language of the arbitration shall be English.
              </Text>

              <Title order={2}>19. Severability</Title>
              <Text mb="xl">
                If any provision of these Terms is held to be invalid, illegal, or unenforceable for any reason by a court or other tribunal of competent jurisdiction, such provision shall be eliminated or limited to the minimum extent necessary, and the remaining provisions of the Terms will continue in full force and effect.
              </Text>

              <Title order={2}>20. Entire Agreement</Title>
              <Text mb="xl">
                These Terms, together with the Privacy Policy and any other legal notices published by Uxqode Pte Ltd on the Services, constitute the entire agreement between you and Uxqode Pte Ltd concerning the Services and supersede all prior agreements, understandings, representations, warranties, and communications, whether written or oral.
              </Text>

              <Title order={2}>21. Changes to Terms</Title>
              <Text mb="xl">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms. If you do not agree to the new Terms, you must stop using the Services.
              </Text>

              <Title order={2}>22. Contact Information</Title>
              <Text mb="xl">
                If you have any questions about these Terms, please contact us at <Anchor href="mailto:contact@aama.io">contact@aama.io</Anchor>.
              </Text>
            </div>
          </Container>
        </div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
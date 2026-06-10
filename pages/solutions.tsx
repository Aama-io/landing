import { useEffect } from 'react';
import { Container, Title, Text, Button, Group, Accordion } from '@mantine/core';
import {
  IconUserCheck, IconSearch, IconCreditCard, IconBuildingBank, IconChartLine,
  IconArrowBackUp, IconFileReport, IconArrowRight, IconCalendarEvent, IconRocket,
  IconShield, IconSettings, IconDeviceAnalytics, IconDatabase, IconUsers, IconBriefcase,
  IconReportMoney, IconCloudComputing, IconCheck, IconArrowUp,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Cal, { getCalApi } from '@calcom/embed-react';
import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';
import s from '@/components/ui/tool.module.css';
import m from '../styles/SolutionsNew.module.css';

const heroStats = [
  { num: '40%', label: 'Lower operating cost' },
  { num: '2 weeks', label: 'Typical launch time' },
  { num: '99.9%', label: 'Platform uptime' },
];

const phaseComponents = [
  { phase: 'Onboarding', icon: IconUserCheck, components: ['Investor Portal', 'KYC Module', 'Risk Profiling'], description: 'Streamlined investor onboarding with automated KYC verification and personalized risk profiling.' },
  { phase: 'Fund Discovery', icon: IconSearch, components: ['Fund Investment Planning', 'Investor Portal'], description: 'Intuitive fund discovery tools that help investors find opportunities aligned with their goals.' },
  { phase: 'Subscription', icon: IconCreditCard, components: ['Investor Portal', 'Back Office', 'Administration Portal'], description: 'Seamless subscription with automated payment processing and real-time tracking.' },
  { phase: 'Custody & Accounting', icon: IconBuildingBank, components: ['Fund Administration & Accounting'], description: 'Secure asset custody and comprehensive fund accounting with automated NAV calculations.' },
  { phase: 'Portfolio Monitoring', icon: IconChartLine, components: ['Investor Portal', 'Fund Administration', 'Manager Portal'], description: 'Real-time portfolio monitoring with detailed performance analytics and interactive dashboards.' },
  { phase: 'Redemption', icon: IconArrowBackUp, components: ['Investor Portal', 'Administration', 'Automation'], description: 'Efficient redemption with automated processing and transparent fee calculations.' },
  { phase: 'Reporting & Compliance', icon: IconFileReport, components: ['Administration', 'Automation', 'Audit Trail'], description: 'Comprehensive reporting with regulatory compliance features and complete audit trails.' },
];

const softwareFeatures = [
  { title: 'Investor Experience', icon: IconUsers, features: ['Self-service investor portal with intuitive dashboard', 'Mobile-responsive design for on-the-go access', 'Personalized investment recommendations', 'Document storage and electronic signatures', 'Real-time portfolio performance tracking'] },
  { title: 'Fund Manager Tools', icon: IconBriefcase, features: ['Comprehensive fund setup and configuration', 'Investor relationship administration', 'Performance analytics and reporting', 'Fee administration and distribution', 'Document generation and administration'] },
  { title: 'Administration & Operations', icon: IconSettings, features: ['Automated NAV calculations', 'Subscription and redemption processing', 'Corporate actions administration', 'Cash flow reconciliation', 'Financial reporting and statements'] },
  { title: 'Compliance & Security', icon: IconShield, features: ['KYC/AML verification workflows', 'Regulatory reporting capabilities', 'Role-based access controls', 'Data encryption and security', 'Audit trails and compliance monitoring'] },
];

const integrationOptions = [
  { title: 'Banking', icon: IconBuildingBank, description: 'Connect major banks and payment processors for seamless transfers and reconciliation.' },
  { title: 'Custodian Services', icon: IconDatabase, description: 'Integrate leading custodians for secure asset administration and storage.' },
  { title: 'Analytics Platforms', icon: IconDeviceAnalytics, description: 'Connect analytics tools for enhanced reporting and data visualization.' },
  { title: 'Cloud Infrastructure', icon: IconCloudComputing, description: 'Secure cloud infrastructure for scalable, reliable platform performance.' },
];

const clientBenefits = [
  { title: 'Reduced Operational Costs', description: 'Cut operational expenses through automation of manual processes and streamlined workflows.', value: '40%', icon: IconReportMoney },
  { title: 'Faster Time to Market', description: 'Launch new funds faster with pre-configured templates and automated setup.', value: '60%', icon: IconRocket },
  { title: 'Enhanced Investor Experience', description: 'Improve investor satisfaction and retention with an intuitive portal and transparent reporting.', value: '95%', icon: IconUsers },
  { title: 'Regulatory Compliance', description: 'Stay compliant with evolving regulations through automated reporting and built-in controls.', value: '100%', icon: IconShield },
  { title: 'Scalable Operations', description: 'Scale your operations without proportionally increasing your operational team.', value: '3x', icon: IconArrowUp },
  { title: 'Data-Driven Insights', description: 'Make informed decisions with comprehensive analytics and performance dashboards.', value: '24/7', icon: IconDeviceAnalytics },
];

const faqItems = [
  { value: 'how-it-works', title: 'How does your fund administration software work?', content: 'The platform provides a comprehensive infrastructure for fund managers to launch, operate and grow their funds — from investor onboarding and KYC to NAV calculations, reporting and compliance monitoring, tailored to Singapore\'s regulatory environment.' },
  { value: 'compliance', title: 'How do you handle regulatory compliance?', content: 'MAS compliance requirements are built into the platform core, with modules for PDPA, SFA and other Singapore regulations. The system tracks regulatory changes, generates reports and ensures your operations meet applicable standards.' },
  { value: 'integration', title: 'Can I integrate with my existing systems?', content: 'Yes. The platform offers comprehensive APIs for integration with banking systems, CRM tools and accounting software, with data import/export in various formats for a smooth transition.' },
  { value: 'security', title: 'How secure is the platform?', content: 'We implement bank-grade encryption, multi-factor authentication, granular access controls, regular security audits and ongoing monitoring — meeting the highest data-protection standards for financial institutions in Singapore.' },
];

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = { initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-70px' } };

export default function SolutionsPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { styles: { branding: { brandColor: '#1f5aff' } } });
    })();
  }, []);

  return (
    <>
      <SEO
        title="Fund Administration & Accounting Software | Solutions"
        description="Fund administration and accounting software for VC/PE firms, family offices, SPV syndicates and fund administrators — covering the entire investment lifecycle from onboarding to NAV, reporting and compliance across Singapore and APAC."
        keywords="fund administration software, fund accounting software, LP portal for fund managers, investor onboarding, fund reporting, Singapore fund administration, APAC fund accounting"
      />
      <PageShell>
        {/* Hero */}
        <section className={m.hero}>
          <div className={m.heroGlow1} /><div className={m.heroGlow2} /><div className={m.heroGlow3} />
          <div className={m.heroGrid} />
          <Container size="lg" className={m.heroInner}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <span className={s.pill}>Fund administration solutions</span>
              <h1 className={m.heroTitle}>Run the entire fund lifecycle on <span className={s.accent}>one platform</span></h1>
              <p className={m.heroDesc}>
                From KYC onboarding to real-time NAV, automated compliance and a white-labeled investor portal —
                aama.io replaces the spreadsheets and disconnected tools fund managers rely on today.
              </p>
              <Group justify="center" gap="md" mt={30}>
                <Button component={Link} href="/contact" size="md" className={s.ctaBtn} rightSection={<IconArrowRight size={18} />}>Get started</Button>
                <Button component="a" href="https://cal.com/aamaio/30min" target="_blank" rel="noopener noreferrer" size="md" variant="default" leftSection={<IconCalendarEvent size={18} />}>Schedule a demo</Button>
              </Group>
            </motion.div>
            <motion.div className={m.statStrip} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease }}>
              {heroStats.map((st) => (
                <div key={st.label} className={m.stat}><div className={m.statNum}>{st.num}</div><div className={m.statLabel}>{st.label}</div></div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* Lifecycle */}
        <section className={m.section}>
          <Container size="lg">
            <motion.div className={m.sectionHead} {...reveal} transition={{ duration: 0.5, ease }}>
              <span className={m.eyebrow}>Investment lifecycle</span>
              <h2 className={m.sectionTitle}>End-to-end support, <span className={s.accent}>start to exit</span></h2>
              <p className={m.sectionDesc}>Every stage of the investor journey runs on one connected platform — no handoffs, no rekeying, no spreadsheets.</p>
            </motion.div>
            <div className={m.lifeGrid}>
              {phaseComponents.map((item, i) => (
                <motion.div key={item.phase} {...reveal} transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease }}>
                  <div className={m.lifeCard}>
                    <span className={m.lifeNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={m.lifeIcon}><item.icon size={26} stroke={1.7} /></span>
                    <div className={m.lifeTitle}>{item.phase}</div>
                    <p className={m.lifeDesc}>{item.description}</p>
                    <div className={m.chips}>{item.components.map((c) => <span key={c} className={m.chip}>{c}</span>)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Features */}
        <section className={`${m.section} ${m.sectionAlt}`}>
          <Container size="lg">
            <motion.div className={m.sectionHead} {...reveal} transition={{ duration: 0.5, ease }}>
              <span className={m.eyebrow}>Platform features</span>
              <h2 className={m.sectionTitle}>Everything a modern fund <span className={s.accent}>actually needs</span></h2>
              <p className={m.sectionDesc}>Four pillars, one platform — built for investors, managers, administrators and compliance teams alike.</p>
            </motion.div>
            <div className={m.featGrid}>
              {softwareFeatures.map((cat, i) => (
                <motion.div key={cat.title} {...reveal} transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease }}>
                  <div className={m.featCard}>
                    <div className={m.featHead}>
                      <span className={m.featIcon}><cat.icon size={24} stroke={1.7} /></span>
                      <span className={m.featTitle}>{cat.title}</span>
                    </div>
                    <ul className={m.checkList}>
                      {cat.features.map((f) => (<li key={f} className={m.checkItem}><span className={m.checkIcon}><IconCheck size={13} /></span><span>{f}</span></li>))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Dark results band */}
        <section className={m.darkBand}>
          <div className={m.darkGlow1} /><div className={m.darkGlow2} /><div className={m.darkGrid} />
          <Container size="lg">
            <motion.div className={m.darkHead} {...reveal} transition={{ duration: 0.5, ease }}>
              <span className={m.darkEyebrow}>Client outcomes</span>
              <h2 className={m.darkTitle}>Built to move the <span className={m.darkTitleAccent}>numbers that matter</span></h2>
              <p className={m.darkDesc}>Fund managers on aama.io spend less time on operations and more on returns. Here's the measurable difference.</p>
            </motion.div>
            <div className={m.benefitGrid}>
              {clientBenefits.map((b, i) => (
                <motion.div key={b.title} {...reveal} transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease }}>
                  <div className={m.benefitCard}>
                    <div className={m.benefitRow}>
                      <span className={m.benefitIcon}><b.icon size={22} stroke={1.7} /></span>
                      <span className={m.benefitNum}>{b.value}</span>
                    </div>
                    <div className={m.benefitTitle}>{b.title}</div>
                    <p className={m.benefitDesc}>{b.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Integrations */}
        <section className={m.section}>
          <Container size="lg">
            <motion.div className={m.sectionHead} {...reveal} transition={{ duration: 0.5, ease }}>
              <span className={m.eyebrow}>Integration ecosystem</span>
              <h2 className={m.sectionTitle}>Plugs into your <span className={s.accent}>existing stack</span></h2>
              <p className={m.sectionDesc}>Seamless connections with the systems you already run — no rip-and-replace.</p>
            </motion.div>
            <div className={m.intGrid}>
              {integrationOptions.map((it, i) => (
                <motion.div key={it.title} {...reveal} transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease }}>
                  <div className={m.intCard}>
                    <span className={m.intIcon}><it.icon size={26} stroke={1.7} /></span>
                    <div className={m.intTitle}>{it.title}</div>
                    <p className={m.intDesc}>{it.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className={`${m.section} ${m.sectionAlt}`}>
          <Container size="lg">
            <div className={m.sectionHead}>
              <span className={m.eyebrow}>FAQ</span>
              <h2 className={m.sectionTitle}>Questions, <span className={s.accent}>answered</span></h2>
            </div>
            <div className={m.faqWrap}>
              <Accordion variant="separated" radius="md" chevronPosition="right" classNames={{ item: m.faqItem, control: m.faqControl }}>
                {faqItems.map((item) => (
                  <Accordion.Item key={item.value} value={item.value}>
                    <Accordion.Control>{item.title}</Accordion.Control>
                    <Accordion.Panel><Text size="sm" c="dimmed">{item.content}</Text></Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        {/* Booking */}
        <section className={m.booking}>
          <Container size="md">
            <div className={m.sectionHead} style={{ marginBottom: 0 }}>
              <span className={s.pill}>Get started</span>
              <h2 className={m.sectionTitle} style={{ marginTop: 18 }}>Ready to modernize your <span className={s.accent}>fund operations?</span></h2>
              <p className={m.sectionDesc}>Book a 30-minute walkthrough and see how aama.io launches and runs funds more efficiently — with a better experience for your investors.</p>
            </div>
            <div className={m.calCard}><div className={m.calBox}><Cal calLink="aamaio/30min" style={{ width: '100%', height: '100%' }} /></div></div>
          </Container>
        </section>
      </PageShell>
    </>
  );
}

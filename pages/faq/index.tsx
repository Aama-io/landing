import Head from 'next/head';
import { Container, Title, Text } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import s from '@/components/ui/tool.module.css';
import m from '../../styles/SolutionsNew.module.css';

const SITE = 'https://aama.io';

const faqData = [
  { question: "What is aama.io's fund administration software?", answer: 'aama.io is a comprehensive fund administration platform that automates NAV calculations, compliance reporting and investor administration. It streamlines operations for fund managers while giving investors transparency and a modern experience.' },
  { question: 'How does the automated NAV calculation work?', answer: 'The platform uses structured data and real-time feeds to calculate NAV automatically, eliminating manual processes and reducing errors. The system reconciles continuously and provides an up-to-date view of each fund.' },
  { question: 'What types of funds can use the software?', answer: 'The platform supports a range of structures including VCCs and sub-funds, private equity, venture, hedge and multi-asset funds. It is designed to be flexible across different investment strategies and asset classes.' },
  { question: 'Is the platform aligned with Singapore (MAS) requirements?', answer: 'Yes. Compliance requirements are built into the platform core, with support for MAS guidelines, PDPA and SFA, plus tooling for 13O/13U tax-incentive tracking. The system helps you generate the reports regulators expect.' },
  { question: 'What security measures are in place?', answer: 'We implement bank-grade encryption, multi-factor authentication, granular role-based access controls, regular security audits and continuous monitoring — meeting the data-protection standards expected of financial institutions.' },
  { question: 'How do you handle compliance and reporting?', answer: 'The platform includes built-in compliance checks and automated reporting tools that adapt to various regulatory frameworks, with complete audit trails. We update compliance features as requirements evolve.' },
];

export default function FAQPage() {
  const title = 'Frequently Asked Questions | aama.io';
  const description = 'Answers to common questions about aama.io — fund administration software, automated NAV, supported fund types, MAS compliance, security and reporting.';
  const url = `${SITE}/faq`;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE}/product-investment-portal.png`} />
        <meta property="og:site_name" content="aama.io" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>
      <PageShell>
        <section className={s.hero}>
          <div className={s.heroGlow} />
          <Container size="lg" className={s.heroInner}>
            <span className={s.pill}>Help center</span>
            <Title className={s.heroTitle}>Frequently asked <span className={s.accent}>questions</span></Title>
            <Text className={s.heroDesc}>Everything you need to know about the aama.io platform — from NAV automation and supported fund types to MAS compliance and security.</Text>
          </Container>
        </section>

        <section className={m.section}>
          <Container size="lg">
            <div className={`${m.grid} ${m.cols2}`}>
              {faqData.map((item) => (
                <div key={item.question} className={m.card}>
                  <div className={m.cardTitle} style={{ marginTop: 0 }}>{item.question}</div>
                  <p className={m.cardDesc}>{item.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </PageShell>
    </>
  );
}

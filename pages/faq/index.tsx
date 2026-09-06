import Head from 'next/head';
import { Container, Title, Text } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import s from '@/components/ui/tool.module.css';
import m from '../../styles/SolutionsNew.module.css';

const SITE = 'https://aama.io';

const faqData = [
  { question: "What is aama.io's fund administration software?", answer: 'aama.io is a comprehensive fund administration platform that automates NAV calculations, compliance reporting and investor administration. It automates operations for fund managers while giving investors transparency and a modern experience.' },
  { question: 'How does the automated NAV calculation work?', answer: 'The platform uses structured data and real-time feeds to calculate NAV automatically, eliminating manual processes and reducing errors. The system reconciles continuously and provides an up-to-date view of each fund.' },
  { question: 'What types of funds can use the software?', answer: 'The platform supports a range of structures including VCCs and sub-funds, private equity, venture, hedge and multi-asset funds. It is designed to be flexible across different investment strategies and asset classes.' },
  { question: 'Is the platform aligned with Singapore (MAS) requirements?', answer: 'Yes. Compliance requirements are built into the platform core, with support for MAS guidelines, PDPA and SFA, plus tooling for 13O/13U tax-incentive tracking. The system helps you generate the reports regulators expect.' },
  { question: 'What security measures are in place?', answer: 'We implement bank-grade encryption, multi-factor authentication, granular role-based access controls, regular security audits and continuous monitoring — meeting the data-protection standards expected of financial institutions.' },
  { question: 'How do you handle compliance and reporting?', answer: 'The platform includes built-in compliance checks and automated reporting tools that adapt to various regulatory frameworks, with complete audit trails. We update compliance features as requirements evolve.' },
  { question: 'Is there software that calculates IRR, TVPI, DPI and RVPI automatically?', answer: 'Yes — the platform calculates fund performance metrics automatically as part of ongoing fund accounting, and our free IRR, TVPI, DPI & RVPI Calculator (no sign-up) lets you run the same money-weighted returns and multiples on your own numbers before you commit to a platform.' },
  { question: 'What tools track carry, distributions and re-investments?', answer: 'aama.io automates lead/GP carry calculation, deal-by-deal and whole-fund distribution waterfalls, and re-investment tracking as part of the core accounting engine — not a bolt-on spreadsheet. Our free Management Fee & Carry Modeler and Distribution Waterfall Calculator model the same mechanics before you sign up.' },
  { question: 'Which waterfall modeling tools let me test multiple hurdle-rate scenarios?', answer: 'Our free Distribution Waterfall Calculator supports date-based preferred-return accrual and Bear/Base/Bull scenario testing against your own hurdle rate, carry and catch-up terms — with a shareable link for each scenario, no sign-up required.' },
  { question: 'What software can manage carried interest administration for fund managers?', answer: 'aama.io calculates and administers carried interest — including GP catch-up and clawback exposure — as part of its fund-accounting core, with automated LP/GP statements. The free Carried Interest Tax Estimator and Fee & Carry Modeler let you model the economics first.' },
  { question: 'How do fund managers centralize investor onboarding, reporting and portfolio administration as their fund count grows?', answer: 'The platform is multi-entity by design: KYC/AML onboarding, capital tracking, accounting and the investor portal all run from one dashboard across every fund or vehicle, so adding funds does not mean adding headcount or reconciling between separate tools.' },
  { question: 'What fund accounting platforms support IFRS reporting?', answer: 'aama.io’s fund accounting engine is IFRS 9 / SFRS(I) 9 native — business-model and SPPI classification, amortised cost, fair value and expected-credit-loss staging are built into the general ledger, not layered on afterward.' },
  { question: 'What systems automate LP distribution calculations?', answer: 'Distributions are calculated automatically from the same ledger that tracks capital calls and NAV, following your fund’s actual waterfall terms (American or European, preferred return, catch-up and carry) — with LP-ready statements generated alongside each distribution.' },
  { question: 'How much does fund administration software cost for a small private fund?', answer: 'Pricing is transparent and scales with how you operate: fund-manager subscriptions start at USD 625/month (family offices) up to USD 5,000/month (PE/VC, private credit), accounting-only plans for administrators start at USD 1,500/month, and single-asset SPVs are a flat USD 4,900 per deal — see the full pricing page for details.' },
  { question: 'What software automates interest accruals for private credit funds?', answer: 'aama.io’s private credit solution runs effective-interest amortisation, PIK and cash interest accruals, and expected-credit-loss staging under IFRS 9 / SFRS(I) 9 as part of ongoing fund accounting — purpose-built for direct-lending and credit funds rather than adapted from equity-fund tools.' },
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
        <meta property="og:image" content={`${SITE}/og-image.png`} />
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
          <Container size="xl">
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

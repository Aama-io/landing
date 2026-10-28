import { useState } from 'react';
import {
  Accordion, Button, Container, Notification, Paper, Select, SimpleGrid, Stack, Text, TextInput, Textarea,
  ThemeIcon, Timeline,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconApi, IconArrowRight, IconBuildingBank, IconCalculator, IconCheck, IconCircleCheckFilled, IconHeartHandshake,
  IconPlugConnected, IconScale, IconSend, IconUsersGroup, IconX,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAnalytics } from '../Analytics';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import s from './Partners.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

export const PARTNER_TYPES = [
  {
    value: 'Fund-formation and corporate service firm',
    short: 'Fund-formation firms',
    icon: IconScale,
    who: 'Law firms, corporate secretaries and VCC set-up specialists who incorporate funds and SPVs.',
    together: 'You set the vehicle up. We run it afterwards, so your client leaves formation with administration, accounting and a member portal already in place.',
    fit: 'Your clients ask "who runs this now?" the week after incorporation.',
  },
  {
    value: 'Accounting or audit practice',
    short: 'Accounting practices',
    icon: IconCalculator,
    who: 'Accountants and auditors serving fund managers, family offices and SPV leads.',
    together: 'Your clients keep their books on a fund-grade ledger with NAV and IFRS-ready statements, and you work from records that are already structured for review.',
    fit: 'Clients bring you spreadsheets at year-end and you rebuild the fund from scratch.',
  },
  {
    value: 'Fund administrator',
    short: 'Fund administrators',
    icon: IconBuildingBank,
    who: 'Boutique and mid-market fund administrators who service other people’s funds.',
    together: 'Run your client funds on Fund Administration and Fund Accounting, with the investor portal under your own brand. Refer clients whose needs fall outside your service.',
    fit: 'You want modern tooling behind your service without building it.',
  },
  {
    value: 'Fintech or technology provider',
    short: 'Fintech providers',
    icon: IconPlugConnected,
    who: 'KYC, banking, custody, data, e-signature and reporting providers.',
    together: 'Integrate through our REST API, or build a joint workflow where your product handles one step and aama.io handles the fund record around it.',
    fit: 'Your customers are fund managers and you want to sit inside their operating stack.',
  },
];

const models = [
  {
    n: '01',
    icon: IconHeartHandshake,
    title: 'Referral arrangements',
    desc: 'You introduce a client who needs fund administration or accounting software. We handle the conversation and keep you informed.',
    points: ['Warm introductions, not cold lead lists', 'Referral terms agreed in writing before the first introduction', 'No exclusivity required from either side'],
  },
  {
    n: '02',
    icon: IconUsersGroup,
    title: 'Joint solutions',
    desc: 'We package your service and our platform into one offer for a defined client type, such as a first-time SPV lead or a new VCC.',
    points: ['One engagement for the client, two specialists behind it', 'Scope and responsibilities written down per offer', 'Shared content where it helps both audiences'],
  },
  {
    n: '03',
    icon: IconApi,
    title: 'Integrations',
    desc: 'Connect your product to the aama.io platform so fund data and your service move without re-keying.',
    points: ['REST API for fund, investor and commitment data', 'Scoped per use case, starting with a working conversation', 'Technical contact on our side from the first call'],
  },
];

const steps = [
  { title: 'Tell us about your firm', body: 'Use the form below. Say who your clients are and where you see the gap.' },
  { title: 'A working conversation', body: 'A call with the team to check fit on both sides. No slides required.' },
  { title: 'Agree how we work', body: 'Referral terms, joint scope or an integration plan, written down before anything starts.' },
  { title: 'Start with one client', body: 'We begin with a real introduction or a pilot, then adjust before scaling.' },
];

const faqs = [
  {
    q: 'Is there a formal partner program?',
    a: 'Not a tiered one. We do not publish commission schedules or partner levels. Each arrangement is agreed individually and put in writing, so it matches what your firm and ours can actually deliver.',
  },
  {
    q: 'Do you pay referral fees?',
    a: 'Referral terms are discussed case by case once there is a fit. We will not commit to any figure before we have spoken, and nothing is agreed verbally.',
  },
  {
    q: 'Can a fund administrator be a partner and a customer?',
    a: 'Yes. Many administrators run their own client funds on the platform and also refer clients whose needs fall outside their service. Those are two separate arrangements and are agreed separately.',
  },
  {
    q: 'What does an integration involve?',
    a: 'We expose a REST API for fund, investor and commitment data. We scope each integration around a specific use case, with a technical contact from the first call. We do not offer a self-serve marketplace today.',
  },
  {
    q: 'Do partners get access to the product?',
    a: 'Where it helps a joint offer or an integration, yes, in a demonstration or test setup agreed with you. Access is arranged per partner.',
  },
  {
    q: 'Which regions do you work in?',
    a: 'Our focus is Singapore and APAC fund managers, with support for MAS-regulated structures, VCCs and IFRS 9 / SFRS(I) 9 accounting. Partners elsewhere are welcome to ask.',
  },
];

export const PARTNER_FAQS = faqs;

export function Partners() {
  const { trackEvent } = useAnalytics();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: { name: '', email: '', company: '', partnerType: '', message: '' },
    validate: {
      name: (v) => (v.trim().length < 2 ? 'Name must be at least 2 characters' : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      partnerType: (v) => (v ? null : 'Please choose the closest fit'),
      message: (v) => (v.trim().length < 10 ? 'Tell us a little more (10 characters or more)' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setStatus(null);
      setErrorMessage(null);
      setSubmitting(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          // The "Partner:" prefix keeps partner enquiries separable from customer enquiries in the CRM.
          inquiryType: `Partner: ${values.partnerType}`,
          message: values.message,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to submit your enquiry');
      }
      trackEvent({ action: 'partner_enquiry', category: 'Partners', label: values.partnerType });
      setStatus('success');
      form.reset();
    } catch (error: any) {
      trackEvent({ action: 'partner_enquiry_error', category: 'Partners', label: 'Submission failed' });
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send your enquiry. Please try again or email contact@aama.io.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className={s.pill}><IconHeartHandshake size={14} /> Partners</span>
            <h1 className={s.title}>
              Work with aama.io to serve <span className={s.accent}>fund managers better.</span>
            </h1>
            <p className={s.subtitle}>
              Fund managers, SPV leads and family offices rely on specialists around them: the firm that forms the
              vehicle, the accountant who signs off the books, the administrator who services investors, the tools in
              between. We work with those specialists on referrals, joint solutions and integrations.
            </p>
            <div className={s.ctaRow}>
              <Button component="a" href="#partner-form" size="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>Start a conversation</Button>
              <Button component="a" href="#ways" size="md" variant="default" className={s.secondary}>How we work together</Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Who */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="xl">
          <SectionHeading
            eyebrow="Who we work with"
            title="Four kinds of partner"
            description="Each sits at a different point in a fund or SPV's life. Pick the one closest to you; we will work out the rest in a conversation."
          />
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt="xl">
            {PARTNER_TYPES.map((p, i) => (
              <Reveal key={p.short} delay={(i % 2) * 0.07}>
                <Paper withBorder radius="lg" p="xl" className={s.typeCard}>
                  <div className={s.typeHead}>
                    <ThemeIcon size={46} radius="md" variant="light"><p.icon size={24} stroke={1.7} /></ThemeIcon>
                    <h3 className={s.typeTitle}>{p.short}</h3>
                  </div>
                  <p className={s.typeWho}>{p.who}</p>
                  <div className={s.typeLabel}>Together</div>
                  <p className={s.typeText}>{p.together}</p>
                  <div className={s.typeFit}>
                    <IconCircleCheckFilled size={16} className={s.fitIcon} />
                    <span><strong>Good fit when:</strong> {p.fit}</span>
                  </div>
                </Paper>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </section>

      {/* Ways to work together */}
      <section className={s.section} id="ways">
        <Container size="lg">
          <SectionHeading
            eyebrow="Ways to work together"
            title="Three arrangements, scoped to what you can deliver"
            description="You can start with one and add others later. None of them requires exclusivity."
          />
          <div className={s.models}>
            {models.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.06}>
                <div className={s.model}>
                  <div className={s.modelNum}>{m.n}</div>
                  <div className={s.modelBody}>
                    <div className={s.modelHead}>
                      <ThemeIcon size={38} radius="md" variant="light"><m.icon size={20} stroke={1.7} /></ThemeIcon>
                      <h3 className={s.modelTitle}>{m.title}</h3>
                    </div>
                    <p className={s.modelDesc}>{m.desc}</p>
                    <ul className={s.modelList}>
                      {m.points.map((pt) => (
                        <li key={pt}><IconCheck size={15} className={s.fitIcon} stroke={2.6} /> {pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How to start */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="md">
          <SectionHeading eyebrow="How to start" title="From first message to first client" />
          <Reveal>
            <Timeline active={4} bulletSize={30} lineWidth={2} color="blue" mt="xl" className={s.timeline}>
              {steps.map((st, i) => (
                <Timeline.Item key={st.title} bullet={<span className={s.bullet}>{i + 1}</span>} title={<span className={s.stepTitle}>{st.title}</span>}>
                  <Text size="sm" c="dimmed" mt={4} lh={1.6}>{st.body}</Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className={s.section}>
        <Container size="lg">
          <div className={s.faqSplit}>
            <div className={s.faqIntro}>
              <span className={s.eyebrow}>Straight answers</span>
              <h2 className={s.h2}>What we do and do not offer</h2>
              <p className={s.lead}>
                We would rather describe the arrangement accurately than oversell it. If something here does not fit
                how your firm works, say so in the form below.
              </p>
            </div>
            <Accordion variant="contained" radius="lg" chevronPosition="left" defaultValue="faq-0" className={s.faq}>
              {faqs.map((f, i) => (
                <Accordion.Item key={f.q} value={`faq-${i}`}>
                  <Accordion.Control><span className={s.faqQ}>{f.q}</span></Accordion.Control>
                  <Accordion.Panel><span className={s.faqA}>{f.a}</span></Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* Enquiry form */}
      <section className={`${s.section} ${s.sectionMuted}`} id="partner-form">
        <Container size="sm">
          <Paper withBorder radius="xl" p="xl" className={s.formCard}>
            <h2 className={s.formTitle}>Start a conversation</h2>
            <Text c="dimmed" size="sm" ta="center" mb="xl">
              Tell us who you are and who you serve. A member of the team will reply within two business days.
            </Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                {status === 'success' && (
                  <Notification icon={<IconCheck size={20} />} color="blue" title="Thank you" onClose={() => setStatus(null)}>
                    We have your enquiry and will reply shortly.
                  </Notification>
                )}
                {status === 'error' && (
                  <Notification icon={<IconX size={20} />} color="red" title="Something went wrong" onClose={() => { setStatus(null); setErrorMessage(null); }}>
                    {errorMessage}
                  </Notification>
                )}
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  <TextInput label="Name" placeholder="Your name" required {...form.getInputProps('name')} />
                  <TextInput label="Work email" placeholder="you@firm.com" required {...form.getInputProps('email')} />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  <TextInput label="Firm" placeholder="Your firm" {...form.getInputProps('company')} />
                  <Select
                    label="Closest fit"
                    placeholder="Select one"
                    required
                    data={[...PARTNER_TYPES.map((p) => p.value), 'Other']}
                    {...form.getInputProps('partnerType')}
                  />
                </SimpleGrid>
                <Textarea
                  label="What would you like to explore?"
                  placeholder="Who your clients are, and where you see a gap we could fill together"
                  minRows={4}
                  autosize
                  required
                  {...form.getInputProps('message')}
                />
                <Button type="submit" size="md" loading={submitting} rightSection={<IconSend size={16} />} className={s.primary}>
                  Send enquiry
                </Button>
                <Text size="xs" c="dimmed" ta="center">
                  Looking for a product demo instead? <Link href="/contact">Book one here</Link>.
                </Text>
              </Stack>
            </form>
          </Paper>
        </Container>
      </section>
    </>
  );
}

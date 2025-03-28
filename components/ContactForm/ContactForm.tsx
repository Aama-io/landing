import { useState } from 'react';
import {
  Container,
  Paper,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Select,
  Text,
  Stack,
  Notification,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconX, IconMail } from '@tabler/icons-react';
import emailjs from '@emailjs/browser';
import { useAnalytics } from '../Analytics';
import classes from './ContactForm.module.css';

// Initialize EmailJS with public key
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

const INQUIRY_TYPES = [
  'Fund Management Solutions',
  'Technical Support',
  'Partnership Opportunities',
  'Investment Inquiries',
  'General Questions',
  'Other',
];

export function ContactForm() {
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const { trackEvent } = useAnalytics();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      inquiryType: '',
      message: '',
      fundSize: '',
      investmentStrategy: '',
    },
    validate: {
      name: (value: any) => (value.trim().length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value: any) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value: any) => (value && !/^\+?[\d\s-]{8,}$/.test(value) ? 'Invalid phone number' : null),
      message: (value: any) => (value.trim().length < 10 ? 'Message must be at least 10 characters' : null),
      inquiryType: (value: any) => (!value ? 'Please select an inquiry type' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: values.name,
          from_email: values.email,
          company: values.company,
          phone: values.phone,
          inquiry_type: values.inquiryType,
          message: values.message,
          fund_size: values.fundSize,
          investment_strategy: values.investmentStrategy,
        }
      );
      
      // Track successful form submission
      trackEvent({
        action: 'form_submission',
        category: 'Contact',
        label: values.inquiryType,
      });

      setStatus('success');
      form.reset();
    } catch (error) {
      // Track failed form submission
      trackEvent({
        action: 'form_submission_error',
        category: 'Contact',
        label: 'Form submission failed',
      });

      setStatus('error');
      console.error('Failed to send email:', error);
    }
  };

  return (
    <Container size="md" py="xl">
      <Paper radius="lg" p="xl" withBorder className={classes.form}>
        <Title order={2} ta="center" className={classes.formTitle}>
          Send us a Message
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb="xl">
          Fill out the form below and we'll get back to you within 24 hours
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {status === 'success' && (
              <Notification icon={<IconCheck size={20} />} color="blue" title="Success!" onClose={() => setStatus(null)}>
                Thank you for your message. We'll get back to you shortly.
              </Notification>
            )}
            
            {status === 'error' && (
              <Notification icon={<IconX size={20} />} color="red" title="Error!" onClose={() => setStatus(null)}>
                Failed to send message. Please try again or contact us directly.
              </Notification>
            )}

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="Name"
                placeholder="Your name"
                required
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                {...form.getInputProps('email')}
              />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="Company"
                placeholder="Your company name"
                {...form.getInputProps('company')}
              />
              <TextInput
                label="Phone"
                placeholder="+1 234 567 890"
                {...form.getInputProps('phone')}
              />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Select
                label="Inquiry Type"
                placeholder="Select inquiry type"
                data={INQUIRY_TYPES}
                required
                {...form.getInputProps('inquiryType')}
              />
              <Select
                label="Fund Size"
                placeholder="Select fund size"
                data={[
                  'Under $1M',
                  '$1M - $10M',
                  '$10M - $50M',
                  '$50M - $100M',
                  '$100M - $500M',
                  'Over $500M',
                ]}
                {...form.getInputProps('fundSize')}
              />
            </SimpleGrid>

            <TextInput
              label="Investment Strategy"
              placeholder="e.g., Long-term growth, Value investing, etc."
              {...form.getInputProps('investmentStrategy')}
            />

            <Textarea
              label="Message"
              placeholder="How can we help you?"
              minRows={4}
              required
              {...form.getInputProps('message')}
            />

            <Group justify="center" mt="xl">
              <Button 
                type="submit" 
                size="md" 
                className={classes.submitButton}
                leftSection={<IconMail size={20} />}
                onClick={() => {
                  // Track button click
                  trackEvent({
                    action: 'contact_form_submit_click',
                    category: 'Contact',
                  });
                }}
              >
                Send Message
              </Button>
            </Group>

            <Text size="xs" c="dimmed" ta="center" mt="sm">
              By submitting this form, you agree to our{' '}
              <Text component="a" href="/privacy" inherit variant="link">
                privacy policy
              </Text>{' '}
              and{' '}
              <Text component="a" href="/terms" inherit variant="link">
                terms of service
              </Text>
              .
            </Text>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 
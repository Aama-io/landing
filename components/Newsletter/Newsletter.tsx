import { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Image,
  Notification,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './Newsletter.module.css';
import { useCreateNewsletterSubscription } from '@/lib/api';

type Field = {
  id: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'number';
  label: string;
  placeholder: string | null;
  help: string | null;
  validation: string | null;
  width: string;
  choices: string[] | null;
  form: string;
  sort: number;
  required: boolean;
};

type NewsletterConfig = {
  id: string;
  sort: null | number;
  title: string;
  is_active: boolean;
  submit_label: string;
  on_success: 'message' | 'redirect';
  success_message: string;
  success_redirect_url: string | null;
  fields: Field[];
}

export const Newsletter: React.FC<{ config: NewsletterConfig }> = ({ config }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useCreateNewsletterSubscription({
      form: config.id,
      values: config.fields.map((field) => ({
        field: field.id,
        value: formData[field.id],
      })),
     });

    // Show success message or redirect based on config
    if (config.on_success === 'message') {
      setSubmitted(true);
    } else if (config.success_redirect_url) {
      window.location.href = config.success_redirect_url;
    }
  };

  if (!config.is_active) {
    return <Notification color="red">This form is currently inactive.</Notification>;
  }

  return (
    <Container>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>Wait a minute...</Title>
          <Text fw={500} fz="lg" mb={5}>
            Subscribe to our newsletter!
          </Text>
          <Text fz="sm" c="dimmed">
            You will never miss important product updates, latest news and community QA sessions.
            Our newsletter is once a week, every Sunday.
          </Text>

          {!submitted ? (
            <form onSubmit={handleSubmit} className={classes.controls}>
              {config.fields.map((field) => (
                <TextInput
                  key={field.id}
                  placeholder={field.label}
                  required={field.required}
                  type={field.type}
                  onChange={(event) => handleChange(field.id, event.currentTarget.value)}
                  m={10}
                />
              ))}
              <Button type="submit" color="blue" m={10}>
                {config.submit_label}
              </Button>
            </form>
          ) : (
            <Alert color="green">
              <Text>{config.success_message}</Text>
            </Alert>
          )}
        </div>
      </div>
    </Container>
  );
};

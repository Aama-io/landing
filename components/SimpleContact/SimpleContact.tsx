import React, { useState } from 'react';
import {
  Button,
  Group,
  Notification,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useCreateContactFormSubmission } from '@/lib/api';

interface Choice {
  text: string;
  value: string;
}

interface Field {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'select';
  label: string;
  placeholder?: string | null;
  required?: boolean;
  width?: string | null;
  choices?: Choice[] | null;
}

interface SimpleContactProps {
  config: {
    id: string;
    title: string;
    submit_label: string;
    fields: Field[];
    is_active: boolean;
    on_success: 'message' | 'redirect';
    success_redirect_url: string | null;
    success_message: string | null;
  };
}

export const SimpleContact: React.FC<SimpleContactProps> = ({ config }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!config?.is_active) {
    return <Notification color="red">This form is currently inactive.</Notification>;
  }

  const fields = config?.fields || [];

  const initialValues: Record<string, string> = fields.reduce(
    (acc: Record<string, string>, field) => {
      acc[field.name] = '';
      return acc;
    },
    {}
  );

  const validate: Record<string, (value: string) => string | null> = fields.reduce(
    (acc: Record<string, (value: string) => string | null>, field) => {
      if (field.required) {
        acc[field.name] = (value: string) =>
          !value || value.trim().length === 0 ? `${field.label || field.name} is required` : null;
      }
      return acc;
    },
    {}
  );

  const form: UseFormReturnType<Record<string, string>> = useForm({
    initialValues,
    validate,
  });

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'text':
        return (
          <TextInput
            key={field.id}
            label={field.label}
            placeholder={field.placeholder || ''}
            required={field.required}
            {...form.getInputProps(field.name)}
          />
        );
      case 'textarea':
        return (
          <Textarea
            key={field.id}
            label={field.label}
            placeholder={field.placeholder || ''}
            required={field.required}
            autosize
            minRows={3}
            maxRows={10}
            {...form.getInputProps(field.name)}
          />
        );
      case 'select':
        return (
          <Select
            key={field.id}
            label={field.label}
            placeholder={field.placeholder || ''}
            required={field.required}
            data={
              field.choices?.map((choice) => ({
                value: choice.value,
                label: choice.text,
              })) || []
            }
            {...form.getInputProps(field.name)}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = (formData: any) => {
    // Use formData to submit the form
    useCreateContactFormSubmission({
      form: config.id,
      values: config.fields.map((field) => ({
        field: field.id,
        value: formData[field.name],
      })),
    });

    // Show success message or redirect based on config
    if (config.on_success === 'message') {
      setSubmitted(true);
      form.reset();
    } else if (config.success_redirect_url) {
      window.location.href = config.success_redirect_url;
    }
  };

  const successMessage = config.success_message || 'The form has been submitted successfully.';

  return (
    <>
      {submitted && successMessage && (
        <Notification color="green">
          {successMessage}
        </Notification>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SimpleGrid cols={2} spacing="lg" mt="xl">
          {fields.map(renderField)}
        </SimpleGrid>
        <Group mt="xl">
          <Button type="submit">{config.submit_label || 'Submit'}</Button>
        </Group>
      </form>
    </>
  );
};

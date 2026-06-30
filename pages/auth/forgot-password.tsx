import { Container, Title } from '@mantine/core';
import AuthLayout from '@/components/AuthLayout';
import { ForgotPassword } from '@/components/Auth/ForgotPassword';
import { SEO } from '@/components/SEO/SEO';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <SEO title="Reset password | aama.io" noindex />

      <Container size={420} my={40}>
        <ForgotPassword />
      </Container>
    </AuthLayout>
  );
}

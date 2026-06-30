import { Container, Title } from '@mantine/core';
import AuthLayout from '@/components/AuthLayout';
import { RegisterForm } from '@/components/Auth/RegisterForm';
import { SEO } from '@/components/SEO/SEO';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <SEO title="Create account | aama.io" noindex />

      <Container size={420} my={40}>
        <RegisterForm />
      </Container>
    </AuthLayout>
  );
}

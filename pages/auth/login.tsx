import { Container, Title } from '@mantine/core';
import AuthLayout from '@/components/AuthLayout';
import { LoginForm } from '@/components/Auth/LoginForm';
import { SEO } from '@/components/SEO/SEO';

export default function LoginPage() {
  return (
    <AuthLayout>
      <SEO title="Sign in | aama.io" noindex />

      <Container size={420} my={40}>
        <LoginForm />
      </Container>
    </AuthLayout>
  );
}

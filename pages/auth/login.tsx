import { Container, Title } from '@mantine/core';
import AuthLayout from '@/components/AuthLayout';
import { LoginForm } from '@/components/Auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Container size={420} my={40}>
        <LoginForm />
      </Container>
    </AuthLayout>
  );
}

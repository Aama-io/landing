import { Container, Title } from '@mantine/core';
import AuthLayout from '@/components/AuthLayout';
import { RegisterForm } from '@/components/Auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Container size={420} my={40}>
        <RegisterForm />
      </Container>
    </AuthLayout>
  );
}

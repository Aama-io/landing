import { Container, Title } from '@mantine/core';
import AuthLayout from '@/components/AuthLayout';
import { ForgotPassword } from '@/components/Auth/ForgotPassword';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Container size={420} my={40}>
        <ForgotPassword />
      </Container>
    </AuthLayout>
  );
}

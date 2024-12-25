import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
  
  export function RegisterForm() {
    return (
      <Container size={420} my={120}>
        <Title ta="center" >
            Register
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{' '}
            <Anchor size="sm" href="/auth/login">
                Login
            </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="" required />
            <PasswordInput label="Password" placeholder="" required mt="md" />
            <PasswordInput label="Confirm Password" placeholder="" required mt="md" />
            <Button fullWidth mt="xl">
                Register
            </Button>
        </Paper>

      </Container>
    );
  }
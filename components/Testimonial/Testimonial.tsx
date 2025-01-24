import { SimpleGrid, Card, Text, Avatar, Title, Container, Box } from '@mantine/core';

const testimonials = [
  {
    name: 'Nizamudheen Valliyattu',
    role: 'Founder, Acadle',
    image: '/avatars/nizamudheen.png',
    testimonial:
      'I’ve tried all the competitor products before and Frill has by far the best UI/UX. The team seem to be smashing out new features every week at an impressive speed.',
  },
  {
    name: 'Eric Lonegan',
    role: 'Founder',
    image: '/avatars/eric.png',
    testimonial:
      'I tried two other tools like Frill, both of which were good enough, but what set Frill above the rest was its simple and elegant design. I’m happy I went with Frill!',
  },
  {
    name: 'Annika Hubert',
    role: 'Product Ops, Agrimaster',
    image: '/avatars/annika.png',
    testimonial:
      'We recently moved from User Voice to Frill after evaluating 16 other options. Frill has been helpful and responsive, and I highly recommend checking them out.',
  },
  {
    name: 'Andrey Kholkin',
    role: 'CEO, Weberlo',
    image: '/avatars/andrey.png',
    testimonial:
      'Minimalistic UI, great UX, very easy to use. After spending 5 minutes in the app, you can feel the quality build. Highly recommended.',
  },
  {
    name: 'Sam Hulick',
    role: 'Co-Founder, ReelCrafter',
    image: '/avatars/sam.png',
    testimonial:
      'Frill is thoughtfully designed and simple to use while offering a complex and powerful level of customizability.',
  },
  {
    name: 'Vaibhav Namburi',
    role: 'Founder, Remote Workly',
    image: '/avatars/vaibhav.png',
    testimonial:
      'I love Frill. It has absolutely changed the way we interact with our customers. It saved us a lot of money and time in guesses for next features.',
  },
];

export function Testimonial() {
  return (
    <Box py="xl" style={{ background: 'linear-gradient(180deg, #f9fafe 0%, #ffffff 100%)' }}>
      <Container size="lg">
        <Title
          ta="center"
          mb="lg"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#2c3e50',
            lineHeight: 1.4,
          }}
        >
          What Our Customers Say
        </Title>
        <SimpleGrid cols={3} spacing="lg">
          {testimonials.map((item, index) => (
            <Card
              key={index}
              shadow="md"
              radius="md"
              padding="xl"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e6e9f0',
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0px 6px 16px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.05)';
              }}
            >
              <Avatar
                src={item.image}
                radius="xl"
                size={80}
                style={{ margin: '0 auto', marginBottom: '16px' }}
              />
              <Text size="sm" color="#555" style={{ fontStyle: 'italic', marginBottom: '16px' }}>
                "{item.testimonial}"
              </Text>
              <Text fw={600} style={{ marginBottom: '4px', fontSize: '16px' }}>
                {item.name}
              </Text>
              <Text size="xs" color="dimmed">
                {item.role}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

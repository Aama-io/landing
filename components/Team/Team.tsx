import { motion } from 'framer-motion';
import { Container, Grid, Box, Text, Group, ActionIcon, Image } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons-react';
import classes from './Team.module.css';

const executives = [
  {
    name: 'Sunil Chaulagain',
    role: 'Chief Executive Officer',
    image: '/team/sunil.png',
    linkedin: 'https://linkedin.com/in/sunilchaulagain',
  },
  {
    name: 'Prashant Chaulagain',
    role: 'Chief Technology Officer',
    image: '/team/prashant.png',
    linkedin: 'https://linkedin.com/in/prashantchaulagain',
  },
];

const team = [
  {
    name: 'Pragati Adhikari',
    role: 'Chief Marketing Officer',
    image: 'https://ui-avatars.com/api/?name=Pragati+Adhikari&size=400&background=e9ecef&color=000',
    linkedin: '#',
  },
  {
    name: 'Chetana Adhikari',
    role: 'Chief Finance Officer',
    image: 'https://ui-avatars.com/api/?name=Chetana+Adhikari&size=280&background=e9ecef&color=000',
  },
  {
    name: 'Aayush Dhakal',
    role: 'Sr. Backend Developer',
    image: 'https://ui-avatars.com/api/?name=Aayush+Dhakal&size=280&background=e9ecef&color=000',
  },
  {
    name: 'Rajiv Chaulagain',
    role: 'Sr. Frontend Developer',
    image: 'https://ui-avatars.com/api/?name=Rajiv+Chaulagain&size=280&background=e9ecef&color=000',
  },
  {
    name: 'Bhupendra Nath',
    role: 'Frontend Developer',
    image: 'https://ui-avatars.com/api/?name=Bhupendra+Nath&size=280&background=e9ecef&color=000',
  },
  {
    name: 'Nirjal Wagle',
    role: 'Sr. Laravel Developer',
    image: 'https://ui-avatars.com/api/?name=Nirjal+Wagle&size=280&background=e9ecef&color=000',
  },
  {
    name: 'Sharmila KC',
    role: 'Legal Advisor',
    image: 'https://ui-avatars.com/api/?name=Sharmila+KC&size=280&background=e9ecef&color=000',
  },
  {
    name: 'Sujata Adhikari',
    role: 'Quality Analyst',
    image: 'https://ui-avatars.com/api/?name=Sujata+Adhikari&size=280&background=e9ecef&color=000',
  }
];

const TeamMember = ({ name, role, image, linkedin, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    viewport={{ once: true }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2 * index,
        ease: 'easeOut',
      },
    }}
  >
    <Box w="100%" mb="xl">
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: 'var(--mantine-shadow-xl)' }}
        transition={{ type: 'spring' }}
      >
        <Box
          pos="relative"
          w="100%"
          style={{ aspectRatio: '1/1', borderRadius: 'var(--mantine-radius-lg)' }}
          mb="lg"
        >
          <Image
            radius="lg"
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </motion.div>
      <Text fz="xl" fw="bold">
        {name}
      </Text>
      <Text fz="lg" c="dimmed">
        {role}
      </Text>
      <Group gap={0} mt="xs">
        <ActionIcon
          className={classes.actionIcon}
          variant="subtle"
          component="a"
          href={linkedin}
          target="_blank"
          size="xl"
        >
          <IconBrandLinkedin />
        </ActionIcon>
      </Group>
    </Box>
  </motion.div>
);

export function Team() {
  return (
    <Container
      size="xl"
      py={{
        base: 'calc(var(--mantine-spacing-lg) * 4)',
        xs: 'calc(var(--mantine-spacing-lg) * 5)',
        lg: 'calc(var(--mantine-spacing-lg) * 6)',
      }}
    >
      <Container size="lg">
        <Grid gutter={{ base: 0, lg: 'calc(var(--mantine-spacing-xl) * 2)' }} align="end">
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true }}
            >
              <Text className={classes.title}>Meet our team</Text>
            </motion.div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Text
              c="dimmed"
              fz="xl"
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Our philosophy is simple: bring together the brightest minds and empower them to create the future of fund management.
            </Text>
          </Grid.Col>
        </Grid>

        <Box
          mt={{
            base: 'calc(var(--mantine-spacing-xl) * 3)',
            lg: 'calc(var(--mantine-spacing-xl) * 5)',
          }}
        >
          <Grid gutter="xl">
            {executives.map((member, index) => (
              <Grid.Col span={{ base: 12, xs: 6, md: 6 }} key={member.name}>
                <TeamMember {...member} index={index} />
              </Grid.Col>
            ))}
          </Grid>

          <Grid gutter="xl" mt={50}>
            {team.map((member, index) => (
              <Grid.Col span={{ base: 12, xs: 6, md: 3 }} key={member.name}>
                <TeamMember {...member} index={index + 2} />
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Container>
    </Container>
  );
} 
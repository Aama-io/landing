import { motion, Variants } from 'framer-motion';
import { Container, Grid, Box, Text, Group, ActionIcon, Image, Badge, Divider, Paper, SimpleGrid, Tooltip, Stack } from '@mantine/core';
import { IconBrandLinkedin, IconChevronDown, IconBrandTwitter, IconMail, IconBriefcase, IconBrandGithub } from '@tabler/icons-react';
import classes from './Team.module.css';

const executives = [
  {
    name: 'Sunil Chaulagain',
    role: 'Chief Executive Officer',
    bio: 'Software engineer and systems architect with 10+ years of experience building scalable, cloud-native softwares across Australia and Southeast Asia. Experienced leader with a background in traditional finance and blockchain technology. Driving AAMA\'s vision to revolutionize fund management.',
    experience: '10+ years',
    image: '/team/sunil.png',
    linkedin: 'https://www.linkedin.com/in/schaulagain',
    email: 'sunil@aama.io',
  },
  {
    name: 'Prashant Chaulagain',
    role: 'Chief Technology Officer',
    bio: 'Experienced software engineer and blockchain expert with 8+ years of experience building scalable, cloud-native softwares across Australia and Southeast Asia. Leading AAMA\'s technical innovation and product development strategy. Experienced in building scalable, cloud-native softwares and blockchain solutions.',
    experience: '8+ years',
    image: '/team/prashant.png',
    linkedin: 'https://linkedin.com/in/erprashant2018',
    email: 'prashant@aama.io',
  },
  {
    name: 'Luis Lim',
    role: 'Chief Operations Officer',
    bio: 'Fund management and compliance expert with extensive experience in operational excellence in Singapore. Ensuring AAMA\'s processes meet industry standards while driving efficiency. Fund manager with 5+ years of experience in the financial industry working with MAS licensees.',
    experience: '5+ years',
    image: '/team/luis.jpeg',
    linkedin: 'https://www.linkedin.com/in/luislim/',
    email: 'luis@aama.io',
  }
];

const departments = [
  {
    name: 'Leadership',
    members: [
      {
        name: 'Pragati Adhikari',
        role: 'Chief Marketing Officer',
        image: 'https://ui-avatars.com/api/?name=Pragati+Adhikari&size=400&background=e9ecef&color=000',
      },
      {
        name: 'Chetana Adhikari',
        role: 'Chief Finance Officer',
        image: 'https://ui-avatars.com/api/?name=Chetana+Adhikari&size=280&background=e9ecef&color=000',
      },
    ]
  },
  {
    name: 'Engineering',
    members: [
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
        name: 'Sujata Adhikari',
        role: 'Quality Analyst',
        image: 'https://ui-avatars.com/api/?name=Sujata+Adhikari&size=280&background=e9ecef&color=000',
      },
    ]
  },
];

// Animation variants
const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Use properly typed animation variant
const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatType: "mirror" as const
  }
};

const ExecutiveCard = ({ member, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    viewport={{ once: true }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.1 * index,
        ease: 'easeOut',
      },
    }}
  >
    <Paper shadow="sm" radius="md" className={classes.executiveCard}>
      <Grid gutter={20}>
        <Grid.Col span={{ base: 12, sm: 12, md: 3 }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Box className={classes.executiveImageWrapper}>
              <div className={classes.executiveImageGradient}></div>
              <Image
                radius="md"
                src={member.image}
                alt={member.name}
                className={classes.executiveImage}
              />
            </Box>
          </motion.div>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, sm: 8, md: 9 }}>
          <Stack className={classes.executiveContent} gap={10}>
            <Group justify="space-between" wrap="nowrap">
              <Badge className={classes.executiveBadge} variant="light" color="blue" size="sm">
                {member.role}
              </Badge>
              
              {member.experience && (
                <Group gap={5} wrap="nowrap">
                  <IconBriefcase size={14} className={classes.infoIcon} />
                  <Text size="xs" c="dimmed">{member.experience}</Text>
                </Group>
              )}
            </Group>
            
            <Text className={classes.executiveName}>
              {member.name}
            </Text>
            
            <Text className={classes.executiveBio} lineClamp={3}>
              {member.bio}
            </Text>
            
            <Group gap="md">
              {member.linkedin && (
                <Tooltip label="LinkedIn" withArrow position="bottom">
                  <ActionIcon
                    className={classes.socialIcon}
                    variant="light"
                    color="blue"
                    component="a"
                    href={member.linkedin}
                    target="_blank"
                    size="md"
                    radius="xl"
                  >
                    <IconBrandLinkedin size={16} />
                  </ActionIcon>
                </Tooltip>
              )}
              
              {member.twitter && (
                <Tooltip label="Twitter" withArrow position="bottom">
                  <ActionIcon
                    className={classes.socialIcon}
                    variant="light"
                    color="blue"
                    component="a"
                    href={member.twitter}
                    target="_blank"
                    size="md"
                    radius="xl"
                  >
                    <IconBrandTwitter size={16} />
                  </ActionIcon>
                </Tooltip>
              )}
              
              {member.github && (
                <Tooltip label="GitHub" withArrow position="bottom">
                  <ActionIcon
                    className={classes.socialIcon}
                    variant="light"
                    color="dark"
                    component="a"
                    href={member.github}
                    target="_blank"
                    size="md"
                    radius="xl"
                  >
                    <IconBrandGithub size={16} />
                  </ActionIcon>
                </Tooltip>
              )}
              
              {member.email && (
                <Tooltip label="Email" withArrow position="bottom">
                  <ActionIcon
                    className={classes.socialIcon}
                    variant="light"
                    color="indigo"
                    component="a"
                    href={`mailto:${member.email}`}
                    size="md"
                    radius="xl"
                  >
                    <IconMail size={16} />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  </motion.div>
);

const TeamMember = ({ member, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    viewport={{ once: true }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.05 * index,
        ease: 'easeOut',
      },
    }}
  >
    <Paper w="100%" className={classes.teamCard} shadow="sm" radius="md">
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className={classes.teamCardInner}
      >
        <Box className={classes.teamImageWrapper}>
          <div className={classes.teamImageGradient}></div>
          <Image
            src={member.image}
            alt={member.name}
            className={classes.teamImage}
          />
        </Box>
        
        <Box className={classes.teamInfo}>
          <Text className={classes.teamName}>{member.name}</Text>
          <Text className={classes.teamRole}>{member.role}</Text>
        </Box>
      </motion.div>
    </Paper>
  </motion.div>
);

export function Team() {
  return (
    <>
      {/* Hero Section with Background Pattern */}
      <Box className={classes.heroSection}>
        <div className={classes.heroPattern}></div>
        <Container size="lg">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className={classes.heroContent}
          >
            <motion.div variants={itemVariants}>
              <Badge 
                size="lg" 
                radius="sm" 
                className={classes.heroBadge}
              >
                Our Team
              </Badge>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Text className={classes.heroTitle}>Meet the <span className={classes.highlight}>experts</span> behind our success</Text>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Text className={classes.heroDescription}>
                Our team combines deep expertise in traditional finance with cutting-edge blockchain technology
                to revolutionize fund management for the next generation.
              </Text>
            </motion.div>
            
            <motion.div 
              className={classes.scrollIndicator}
              initial={{ y: 0 }}
              animate={floatingAnimation}
            >
              <IconChevronDown size={32} />
            </motion.div>
          </motion.div>
        </Container>
      </Box>
      
      {/* Main Team Section with Background */}
      <Box className={classes.mainSection}>
        <Container size="lg" py={60}>
          {/* Founders Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Badge color="blue" size="md" radius="sm" className={classes.sectionBadge}>Founders</Badge>
            <Text className={classes.sectionTitle}>Leadership Team</Text>
            <Text c="dimmed" className={classes.sectionDescription}>
              Meet the visionaries driving our mission to transform fund management through technology
            </Text>
          </motion.div>

          <Box mt={30}>
            <SimpleGrid cols={{ base: 1, md: 1 }} spacing={20}>
              {executives.map((member, index) => (
                <ExecutiveCard key={member.name} member={member} index={index} />
              ))}
            </SimpleGrid>
          </Box>
          
          {/* Department Sections */}
          {departments.map((department, deptIndex) => (
            <Box key={department.name} mt={70}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                viewport={{ once: true }}
              >
                <Badge color="blue" variant="light" size="md" radius="sm">{department.name}</Badge>
                <Text className={classes.departmentTitle}>{department.name} Team</Text>
              </motion.div>
              
              <SimpleGrid
                cols={{ base: 1, xs: 2, md: 5 }}
                spacing={{ base: 'md', md: 'lg' }}
                mt={30}
              >
                {department.members.map((member, index) => (
                  <TeamMember 
                    key={member.name} 
                    member={member}
                    index={index} 
                  />
                ))}
              </SimpleGrid>
            </Box>
          ))}
          
        </Container>
      </Box>
    </>
  );
} 
import { motion } from 'framer-motion';
import { Container, ActionIcon, Image, Tooltip } from '@mantine/core';
import { IconBrandLinkedin, IconBrandTwitter, IconMail, IconBriefcase, IconBrandGithub } from '@tabler/icons-react';
import s from '@/components/ui/tool.module.css';
import classes from './Team.module.css';

const executives = [
  {
    name: 'Sunil Chaulagain',
    role: 'Chief Executive Officer',
    bio: 'Software engineer and systems architect with 10+ years building scalable, cloud-native platforms across Australia and Southeast Asia. Blends a background in traditional finance and blockchain to drive aama.io\'s vision for modern fund management.',
    experience: '10+ years',
    image: '/team/sunil.png',
    linkedin: 'https://www.linkedin.com/in/schaulagain',
    email: 'sunil@aama.io',
  },
  {
    name: 'Prashant Chaulagain',
    role: 'Chief Technology Officer',
    bio: 'Software engineer and blockchain expert with 8+ years building scalable, cloud-native platforms across Australia and Southeast Asia. Leads aama.io\'s technical innovation and product development strategy.',
    experience: '8+ years',
    image: '/team/prashant.png',
    linkedin: 'https://linkedin.com/in/erprashant2018',
    email: 'prashant@aama.io',
  },
  {
    name: 'Luis Lim',
    role: 'Chief Operations Officer',
    bio: 'Fund management and compliance expert with hands-on operational experience in Singapore, working alongside MAS licensees. Ensures aama.io\'s processes meet industry standards while driving efficiency.',
    experience: '5+ years',
    image: '/team/luis.jpeg',
    linkedin: 'https://www.linkedin.com/in/luislim/',
    email: 'luis@aama.io',
  },
];

const departments = [
  {
    name: 'Leadership',
    description: 'The people steering marketing, finance and growth.',
    members: [
      {
        name: 'Pragati Adhikari',
        role: 'Chief Marketing Officer',
        image: 'https://ui-avatars.com/api/?name=Pragati+Adhikari&size=400&background=eef3ff&color=1f5aff',
      },
      {
        name: 'Chetana Adhikari',
        role: 'Chief Finance Officer',
        image: 'https://ui-avatars.com/api/?name=Chetana+Adhikari&size=280&background=eef3ff&color=1f5aff',
      },
    ],
  },
  {
    name: 'Engineering',
    description: 'The team designing and building the platform every day.',
    members: [
      {
        name: 'Aayush Dhakal',
        role: 'Sr. Backend Developer',
        image: 'https://ui-avatars.com/api/?name=Aayush+Dhakal&size=280&background=eef3ff&color=1f5aff',
      },
      {
        name: 'Rajiv Chaulagain',
        role: 'Sr. Frontend Developer',
        image: 'https://ui-avatars.com/api/?name=Rajiv+Chaulagain&size=280&background=eef3ff&color=1f5aff',
      },
      {
        name: 'Nirjal Wagle',
        role: 'Sr. Laravel Developer',
        image: 'https://ui-avatars.com/api/?name=Nirjal+Wagle&size=280&background=eef3ff&color=1f5aff',
      },
      {
        name: 'Susmita Adhikari',
        role: 'Quality Analyst',
        image: 'https://ui-avatars.com/api/?name=Susmita+Adhikari&size=280&background=eef3ff&color=1f5aff',
      },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

type Executive = (typeof executives)[number];
type Member = { name: string; role: string; image: string };

function SocialLink({
  label,
  href,
  color,
  children,
}: {
  label: string;
  href: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip label={label} withArrow position="bottom">
      <ActionIcon
        className={classes.socialIcon}
        variant="light"
        color={color}
        component="a"
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        size="md"
        radius="xl"
      >
        {children}
      </ActionIcon>
    </Tooltip>
  );
}

function ExecutiveCard({ member, index }: { member: Executive; index: number }) {
  return (
    <motion.div {...reveal} transition={{ duration: 0.55, delay: index * 0.1, ease }} style={{ height: '100%' }}>
      <div className={classes.leadCard}>
        <div className={classes.leadImageWrap}>
          <Image src={member.image} alt={member.name} className={classes.leadImage} />
        </div>
        <div className={classes.leadBody}>
          <span className={classes.roleBadge}>{member.role}</span>
          <div className={classes.leadName}>{member.name}</div>
          <p className={classes.leadBio}>{member.bio}</p>
          <div className={classes.metaRow}>
            <IconBriefcase size={14} className={classes.metaIcon} />
            <span>{member.experience} experience</span>
          </div>
          <div className={classes.socialRow}>
            {member.linkedin && (
              <SocialLink label="LinkedIn" href={member.linkedin} color="blue">
                <IconBrandLinkedin size={16} />
              </SocialLink>
            )}
            {member.email && (
              <SocialLink label="Email" href={`mailto:${member.email}`} color="indigo">
                <IconMail size={16} />
              </SocialLink>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TeamMember({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div {...reveal} transition={{ duration: 0.45, delay: (index % 5) * 0.06, ease }}>
      <div className={classes.memberCard}>
        <div className={classes.avatarRing}>
          <Image src={member.image} alt={member.name} className={classes.memberAvatar} />
        </div>
        <div>
          <div className={classes.memberName}>{member.name}</div>
          <div className={classes.memberRole}>{member.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Team() {
  return (
    <section className={classes.section}>
      <Container size="lg">
        <motion.div className={classes.head} {...reveal} transition={{ duration: 0.55, ease }}>
          <span className={classes.eyebrow}>Our team</span>
          <h2 className={classes.title}>
            The people building <span className={s.accent}>aama.io</span>
          </h2>
          <p className={classes.lead}>
            A team that pairs deep fund-management and compliance experience with modern engineering — across
            Singapore, Southeast Asia and beyond.
          </p>
        </motion.div>

        {/* Leadership */}
        <div className={classes.leadGrid}>
          {executives.map((member, index) => (
            <ExecutiveCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Departments */}
        {departments.map((department) => (
          <div key={department.name}>
            <motion.div className={classes.groupHead} {...reveal} transition={{ duration: 0.5, ease }}>
              <span className={classes.groupPill}>{department.name}</span>
              <div className={classes.groupTitle}>{department.name} team</div>
              <p className={classes.groupDesc}>{department.description}</p>
            </motion.div>

            <div className={classes.teamGrid}>
              {department.members.map((member, index) => (
                <TeamMember key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

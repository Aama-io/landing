import { Container } from '@mantine/core';
import { IconBrandLinkedin, IconBriefcase, IconMail } from '@tabler/icons-react';
import Image from 'next/image';
import { Reveal } from '../ui/Reveal';
import classes from './Team.module.css';

const executives = [
  {
    name: 'Sunil Chaulagain',
    role: 'Chief Executive Officer',
    bio: 'Software engineer and systems architect with 10+ years building scalable, cloud-native platforms across Australia and Southeast Asia. Blends a background in traditional finance and blockchain to drive aama.io\'s vision for modern fund management.',
    experience: '10+ years',
    image: '/team/sunil-portrait.webp',
    linkedin: 'https://www.linkedin.com/in/schaulagain',
    email: 'sunil@aama.io',
  },
  {
    name: 'Prashant Chaulagain',
    role: 'Chief Technology Officer',
    bio: 'Software engineer and blockchain expert with 8+ years building scalable, cloud-native platforms across Australia and Southeast Asia. Leads aama.io\'s technical innovation and product development strategy.',
    experience: '8+ years',
    image: '/team/prashant-portrait.webp',
    linkedin: 'https://linkedin.com/in/erprashant2018',
    email: 'prashant@aama.io',
  },
  {
    name: 'Luis Lim',
    role: 'Chief Operations Officer',
    bio: 'Fund management and compliance expert with hands-on operational experience in Singapore, working alongside MAS licensees. Ensures aama.io\'s processes meet industry standards while driving efficiency.',
    experience: '5+ years',
    image: '/team/luis-portrait.webp',
    linkedin: 'https://www.linkedin.com/in/luislim/',
    email: 'luis@aama.io',
  },
];

const groups = [
  {
    name: 'Marketing and finance',
    description: 'Steering growth, brand and the numbers.',
    members: [
      { name: 'Pragati Adhikari', role: 'Chief Marketing Officer' },
      { name: 'Chetana Adhikari', role: 'Chief Finance Officer' },
    ],
  },
  {
    name: 'Engineering and quality',
    description: 'Designing, building and testing the platform every day.',
    members: [
      { name: 'Aayush Dhakal', role: 'Sr. Backend Developer' },
      { name: 'Rajiv Chaulagain', role: 'Sr. Frontend Developer' },
      { name: 'Nirjal Wagle', role: 'Sr. Backend Developer' },
      { name: 'Susmita Adhikari', role: 'Quality Analyst' },
    ],
  },
];

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

export function Team() {
  return (
    <section className={classes.section}>
      <Container size="xl">
        <Reveal>
          <div className={classes.head}>
            <span className={classes.eyebrow}>Our team</span>
            <h2 className={classes.title}>The people building aama.io</h2>
            <p className={classes.lead}>
              Fund management and compliance experience, paired with engineers who have built cloud platforms across
              Singapore, Australia and Southeast Asia.
            </p>
          </div>
        </Reveal>

        <div className={classes.leadGrid}>
          {executives.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} className={classes.cardWrap}>
              <article className={classes.lead3}>
                <div className={classes.portrait}>
                  <Image
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    width={640}
                    height={800}
                    sizes="(max-width: 40em) 100vw, (max-width: 64em) 50vw, 380px"
                    className={classes.portraitImg}
                  />
                  <span className={classes.exp}>
                    <IconBriefcase size={13} /> {m.experience}
                  </span>
                </div>
                <div className={classes.leadBody}>
                  <div className={classes.role}>{m.role}</div>
                  <h3 className={classes.name}>{m.name}</h3>
                  <p className={classes.bio}>{m.bio}</p>
                  <div className={classes.social}>
                    <a className={classes.socialBtn} href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}>
                      <IconBrandLinkedin size={17} />
                    </a>
                    <a className={classes.socialBtn} href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}>
                      <IconMail size={17} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {groups.map((g) => (
          <Reveal key={g.name}>
            <div className={classes.groupHead}>
              <div className={classes.groupTitle}>{g.name}</div>
              <div className={classes.groupDesc}>{g.description}</div>
            </div>
            <div className={classes.people}>
              {g.members.map((m) => (
                <div key={m.name} className={classes.person}>
                  <span className={classes.avatar} aria-hidden="true">{initials(m.name)}</span>
                  <div>
                    <div className={classes.personName}>{m.name}</div>
                    <div className={classes.personRole}>{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

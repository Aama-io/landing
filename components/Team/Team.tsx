import { useState } from 'react';
import { Container } from '@mantine/core';
import { IconBrandLinkedin, IconBriefcase, IconMail } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Reveal } from '../ui/Reveal';
import classes from './Team.module.css';

type Person = {
  name: string;
  role: string;
  group: string;
  blurb: string;
  bio?: string;
  experience?: string;
  image?: string;
  linkedin?: string;
  email?: string;
};

const GROUP_BLURB: Record<string, string> = {
  Leadership: 'Sets the direction for the product, the technology and how we run operations.',
  'Marketing and finance': 'Steering growth, brand and the numbers.',
  'Engineering and quality': 'Designing, building and testing the platform every day.',
};

const PEOPLE: Person[] = [
  {
    name: 'Sunil Chaulagain',
    role: 'Chief Executive Officer',
    group: 'Leadership',
    blurb: GROUP_BLURB.Leadership,
    bio: 'Software engineer and systems architect with 10+ years building scalable, cloud-native platforms across Australia and Southeast Asia. Blends a background in traditional finance and blockchain to drive aama.io\'s vision for modern fund management.',
    experience: '10+ years',
    image: '/team/sunil-portrait.webp',
    linkedin: 'https://www.linkedin.com/in/schaulagain',
    email: 'sunil@aama.io',
  },
  {
    name: 'Prashant Chaulagain',
    role: 'Chief Technology Officer',
    group: 'Leadership',
    blurb: GROUP_BLURB.Leadership,
    bio: 'Software engineer and blockchain expert with 8+ years building scalable, cloud-native platforms across Australia and Southeast Asia. Leads aama.io\'s technical innovation and product development strategy.',
    experience: '8+ years',
    image: '/team/prashant-portrait.webp',
    linkedin: 'https://linkedin.com/in/erprashant2018',
    email: 'prashant@aama.io',
  },
  {
    name: 'Luis Lim',
    role: 'Chief Operations Officer',
    group: 'Leadership',
    blurb: GROUP_BLURB.Leadership,
    bio: 'Fund management and compliance expert with hands-on operational experience in Singapore, working alongside MAS licensees. Ensures aama.io\'s processes meet industry standards while driving efficiency.',
    experience: '5+ years',
    image: '/team/luis-portrait.webp',
    linkedin: 'https://www.linkedin.com/in/luislim/',
    email: 'luis@aama.io',
  },
  { name: 'Pragati Adhikari', role: 'Chief Marketing Officer', group: 'Marketing and finance', blurb: GROUP_BLURB['Marketing and finance'] },
  { name: 'Chetana Adhikari', role: 'Chief Finance Officer', group: 'Marketing and finance', blurb: GROUP_BLURB['Marketing and finance'] },
  { name: 'Aayush Dhakal', role: 'Sr. Backend Developer', group: 'Engineering and quality', blurb: GROUP_BLURB['Engineering and quality'] },
  { name: 'Rajiv Chaulagain', role: 'Sr. Frontend Developer', group: 'Engineering and quality', blurb: GROUP_BLURB['Engineering and quality'] },
  { name: 'Nirjal Wagle', role: 'Sr. Laravel Developer', group: 'Engineering and quality', blurb: GROUP_BLURB['Engineering and quality'] },
  { name: 'Susmita Adhikari', role: 'Quality Analyst', group: 'Engineering and quality', blurb: GROUP_BLURB['Engineering and quality'] },
];

const GROUPS = ['Leadership', 'Marketing and finance', 'Engineering and quality'];

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

export function Team() {
  const [active, setActive] = useState(0);
  const person = PEOPLE[active];

  return (
    <section className={classes.section}>
      <Container size="xl" className={classes.inner}>
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

        <div className={classes.layout}>
          {/* Roster */}
          <div className={classes.rail} role="tablist" aria-label="Team members" aria-orientation="vertical">
            {GROUPS.map((g) => (
              <div key={g} className={classes.railGroup}>
                <div className={classes.railLabel}>{g}</div>
                <div className={classes.railItems}>
                  {PEOPLE.map((p, i) =>
                    p.group !== g ? null : (
                      <button
                        key={p.name}
                        type="button"
                        role="tab"
                        aria-selected={i === active}
                        className={classes.railItem}
                        data-active={i === active || undefined}
                        onClick={() => setActive(i)}
                      >
                        <span className={classes.railAvatar}>
                          {p.image ? (
                            <Image src={p.image} alt="" width={96} height={120} className={classes.railPhoto} />
                          ) : (
                            initials(p.name)
                          )}
                        </span>
                        <span className={classes.railText}>
                          <span className={classes.railName}>{p.name}</span>
                          <span className={classes.railRole}>{p.role}</span>
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stage */}
          <div className={classes.stage}>
            <AnimatePresence mode="wait">
              <motion.div
                key={person.name}
                className={classes.stageGrid}
                role="tabpanel"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={classes.portraitWrap}>
                  <div className={classes.portrait}>
                    {person.image ? (
                      <Image
                        src={person.image}
                        alt={`${person.name}, ${person.role}`}
                        width={640}
                        height={800}
                        sizes="(max-width: 64em) 100vw, 360px"
                        className={classes.portraitImg}
                        priority={active === 0}
                      />
                    ) : (
                      <span className={classes.monogram} aria-hidden="true">{initials(person.name)}</span>
                    )}
                    {person.experience && (
                      <span className={classes.exp}>
                        <IconBriefcase size={13} /> {person.experience}
                      </span>
                    )}
                  </div>
                </div>

                <div className={classes.info}>
                  <div className={classes.role}>{person.role}</div>
                  <h3 className={classes.name}>{person.name}</h3>
                  <p className={classes.bio}>{person.bio ?? person.blurb}</p>
                  {(person.linkedin || person.email) && (
                    <div className={classes.social}>
                      {person.linkedin && (
                        <a className={classes.socialBtn} href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`}>
                          <IconBrandLinkedin size={18} />
                        </a>
                      )}
                      {person.email && (
                        <a className={classes.socialBtn} href={`mailto:${person.email}`} aria-label={`Email ${person.name}`}>
                          <IconMail size={18} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </Container>
    </section>
  );
}

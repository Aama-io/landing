import { Container, Title, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { Persona, PERSONAS, personaMeta, toolGroupsForPersona, toolsForPersona } from '@/lib/tools';
import s from '@/components/ui/tool.module.css';
import h from './ToolsHub.module.css';
import { ToolGroups } from './ToolsHub';

export function PersonaTools({ persona }: { persona: Persona }) {
  const meta = personaMeta(persona);
  const groups = toolGroupsForPersona(persona);
  const count = toolsForPersona(persona).length;
  const others = PERSONAS.filter((p) => p.id !== persona);

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <Link href="/tools" className={h.backLink}>
            <IconArrowLeft size={15} /> All tools
          </Link>
          <span className={s.pill}>{meta.tagline} · {count} tools</span>
          <Title className={s.heroTitle}>{meta.label}</Title>
          <Text className={s.heroDesc}>{meta.blurb}</Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          <ToolGroups groups={groups} />

          <div className={h.switcher}>
            <span className={h.switcherLabel}>Not your role?</span>
            {others.map((p) => (
              <Link key={p.id} href={p.href} className={h.switchPill}>
                <p.icon size={16} stroke={1.7} /> {p.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

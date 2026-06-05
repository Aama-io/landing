import { Container, Title, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { TOOL_GROUPS, ALL_TOOLS } from '@/lib/tools';
import s from '@/components/ui/tool.module.css';
import h from './ToolsHub.module.css';

export function ToolsHub() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <span className={s.pill}>Free tools · {ALL_TOOLS.length} and counting</span>
          <Title className={s.heroTitle}>Fund tools, <span className={s.accent}>free to use</span></Title>
          <Text className={s.heroDesc}>
            A growing toolkit for fund managers, GPs and LPs — from Singapore VCC structuring to waterfalls, returns and
            LP-facing documents. No sign-up, every input shareable by link.
          </Text>
        </Container>
      </section>

      <section className={s.tool}>
        <Container size="lg">
          {TOOL_GROUPS.map((g) => (
            <div key={g.title} className={h.group}>
              <div className={h.groupHead}>
                <h2 className={h.groupTitle}>{g.title}</h2>
                <p className={h.groupBlurb}>{g.blurb}</p>
              </div>
              <div className={h.grid}>
                {g.tools.map((t) => (
                  <Link key={t.href} href={t.href} className={h.card}>
                    <span className={h.cardIcon}><t.icon size={22} stroke={1.7} /></span>
                    <div className={h.cardBody}>
                      <div className={h.cardTitle}>{t.label}</div>
                      <div className={h.cardDesc}>{t.description}</div>
                    </div>
                    <IconArrowRight size={17} className={h.cardArrow} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}

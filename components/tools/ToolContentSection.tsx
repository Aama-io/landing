import { Container } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { TOOL_CONTENT } from '@/lib/toolContent';
import { ALL_TOOLS } from '@/lib/tools';
import c from './ToolContentSection.module.css';

/**
 * Visible, crawlable explanatory content rendered below each tool: an intro,
 * a "how it works" list, an FAQ (matching the FAQPage JSON-LD) and related-tool
 * links. This is the substance search engines rank and answer engines cite.
 */
export function ToolContentSection({ slug }: { slug: string }) {
  const data = TOOL_CONTENT[slug];
  if (!data) return null;
  const related = data.related
    .map((href) => ALL_TOOLS.find((t) => t.href === href))
    .filter(Boolean) as typeof ALL_TOOLS;

  return (
    <section className={c.wrap}>
      <Container size="md">
        <div className={c.grid}>
          <div>
            <h2 className={c.h2}>About this tool</h2>
            {data.intro.map((p, i) => <p key={i} className={c.p}>{p}</p>)}

            <h2 className={c.h2}>How to use it</h2>
            <ol className={c.steps}>
              {data.how.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>

          <div>
            <h2 className={c.h2}>Frequently asked questions</h2>
            <div className={c.faqs}>
              {data.faqs.map((f) => (
                <div key={f.q} className={c.faq}>
                  <h3 className={c.q}>{f.q}</h3>
                  <p className={c.a}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className={c.related}>
            <h2 className={c.h2}>Related tools</h2>
            <div className={c.relatedGrid}>
              {related.map((t) => (
                <Link key={t.href} href={t.href} className={c.relatedCard}>
                  <span className={c.relatedIcon}><t.icon size={18} stroke={1.7} /></span>
                  <span className={c.relatedBody}>
                    <span className={c.relatedTitle}>{t.label}</span>
                    <span className={c.relatedDesc}>{t.description}</span>
                  </span>
                  <IconArrowRight size={16} className={c.relatedArrow} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

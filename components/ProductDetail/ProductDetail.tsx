import { Container, Accordion, Button } from '@mantine/core';
import { IconArrowRight, IconChevronRight, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import s from './ProductDetail.module.css';

type IconType = typeof IconCheck;

export type DetailData = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  icon: IconType;
  image: string;
  heroDescription: string;
  description: string;
  keywords: string;
  benefits: { title: string; description: string; icon: IconType }[];
  featureGroups: { title: string; description: string; items: string[] }[];
  useCases?: { title: string; description: string; metrics?: { label: string; value: string }[] }[];
  keyFeatures?: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
};

export type RelatedLink = { href: string; label: string; blurb: string; icon: IconType };

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductDetail({
  data, backHref, backLabel, related, relatedHeading,
}: {
  data: DetailData;
  backHref: string;
  backLabel: string;
  related: RelatedLink[];
  relatedHeading: string;
}) {
  const Icon = data.icon;
  return (
    <>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <div className={s.heroCopy}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <div className={s.breadcrumb}>
                <Link href={backHref} className={s.crumbLink}>{backLabel}</Link>
                <IconChevronRight size={13} className={s.crumbSep} />
                <span>{data.shortName}</span>
              </div>
              <div className={s.heroBadgeRow}>
                <span className={s.heroIcon}><Icon size={24} stroke={1.7} /></span>
                <span className={s.badge}>{data.category}</span>
              </div>
              <h1 className={s.title}>{data.name}</h1>
              <p className={s.heroDesc}>{data.heroDescription}</p>
              <div className={s.ctaRow}>
                <Button component={Link} href="/contact" size="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>Book a demo</Button>
                <Button component={Link} href="/pricing" size="md" variant="default" className={s.secondary}>View pricing</Button>
              </div>
            </motion.div>
          </div>
          <motion.div className={s.heroShot} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}>
            <div className={s.frame}>
              <div className={s.frameBar}>
                <span className={s.dot} data-c="r" /><span className={s.dot} data-c="y" /><span className={s.dot} data-c="g" />
                <span className={s.url}>app.aama.io</span>
              </div>
              <div className={s.frameBody}>
                <Image src={data.image} alt={data.name} width={1280} height={820} className={s.shot} priority />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Benefits */}
      {data.benefits.length > 0 && (
        <section className={`${s.section} ${s.sectionMuted}`}>
          <Container size="lg">
            <SectionHeading eyebrow="Why aama.io" title="Built to move your operations forward" />
            <div className={s.benefitGrid}>
              {data.benefits.map((b, i) => {
                const BIcon = b.icon;
                return (
                  <Reveal key={b.title} delay={(i % 4) * 0.07}>
                    <div className={s.benefitCard}>
                      <span className={s.benefitIcon}><BIcon size={22} stroke={1.7} /></span>
                      <div className={s.benefitTitle}>{b.title}</div>
                      <div className={s.benefitDesc}>{b.description}</div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Features */}
      <section className={s.section}>
        <Container size="lg">
          <SectionHeading eyebrow="Capabilities" title="Everything you need, in one platform" />
          <div className={s.featureGrid}>
            {data.featureGroups.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.07}>
                <div className={s.featureCard}>
                  <div className={s.featureTitle}>{f.title}</div>
                  <div className={s.featureDesc}>{f.description}</div>
                  <ul className={s.featureList}>
                    {f.items.map((it) => (
                      <li key={it}><IconCheck size={15} className={s.featureCheck} /> {it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Use cases */}
      {data.useCases && data.useCases.length > 0 && (
        <section className={`${s.section} ${s.sectionMuted}`}>
          <Container size="lg">
            <SectionHeading eyebrow="Use cases" title="How teams put it to work" />
            <div className={s.useGrid}>
              {data.useCases.map((u, i) => (
                <Reveal key={u.title} delay={(i % 3) * 0.07}>
                  <div className={s.useCard}>
                    <div className={s.useTitle}>{u.title}</div>
                    <div className={s.useDesc}>{u.description}</div>
                    {u.metrics && (
                      <div className={s.useMetrics}>
                        {u.metrics.map((m) => (
                          <div key={m.label} className={s.useMetric}>
                            <span className={s.useMetricLabel}>{m.label}</span>
                            <span className={s.useMetricValue}>{m.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Key features */}
      {data.keyFeatures && data.keyFeatures.length > 0 && (
        <section className={s.section}>
          <Container size="lg">
            <SectionHeading eyebrow="Platform" title="More of what's under the hood" />
            <div className={s.capGrid}>
              {data.keyFeatures.map((k, i) => (
                <Reveal key={k.title} delay={(i % 3) * 0.05}>
                  <div className={s.capCard}>
                    <span className={s.capIcon}><IconCheck size={14} /></span>
                    <div>
                      <div className={s.capTitle}>{k.title}</div>
                      <div className={s.capDesc}>{k.description}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="md">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <Reveal>
            <Accordion variant="separated" radius="md" chevronPosition="right" className={s.faq}>
              {data.faqs.map((item, i) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control><span className={s.faqQ}>{item.q}</span></Accordion.Control>
                  <Accordion.Panel><span className={s.faqA}>{item.a}</span></Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Reveal>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className={s.section}>
          <Container size="lg">
            <SectionHeading eyebrow="Explore" title={relatedHeading} />
            <div className={s.relatedGrid}>
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link key={r.href} href={r.href} className={s.relatedCard}>
                    <span className={s.relatedIcon}><RIcon size={20} stroke={1.7} /></span>
                    <div className={s.relatedBody}>
                      <div className={s.relatedTitle}>{r.label}</div>
                      <div className={s.relatedDesc}>{r.blurb}</div>
                    </div>
                    <IconArrowRight size={16} className={s.relatedArrow} />
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className={s.ctaSection}>
        <Container size="lg">
          <div className={s.ctaCard}>
            <div className={s.ctaGlow} />
            <h2 className={s.ctaTitle}>Ready to transform your fund operations?</h2>
            <p className={s.ctaDesc}>See aama.io run on your own structure — book a walkthrough with our team.</p>
            <div className={s.ctaRow}>
              <Button component={Link} href="/contact" size="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>Book a demo</Button>
              <Button component={Link} href="/pricing" size="md" variant="white" className={s.ctaSecondary}>View pricing</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

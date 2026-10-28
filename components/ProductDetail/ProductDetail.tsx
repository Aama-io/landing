import { useState } from 'react';
import { Container, Accordion, Button } from '@mantine/core';
import { IconArrowRight, IconChevronRight, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { AiTimeIllustration } from './AiTimeIllustration';
import s from './ProductDetail.module.css';

type IconType = typeof IconCheck;

export type AiDoc = { icon: IconType; title: string; result: string; sentence: string; bullets: string[] };

export type AiSection = {
  eyebrow: string;
  headline: string;
  subhead: string;
  results?: { title: string; text: string }[];
  docs: AiDoc[];
  mapping?: { eyebrow: string; title: string; text: string; points: string[]; loopTitle: string; loop: { label: string; text: string }[] };
  illustration?: boolean;
  steps: string[];
  note: string;
};

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
  aiSection?: AiSection;
  faqs: { q: string; a: string }[];
};

export type RelatedLink = { href: string; label: string; blurb: string; icon: IconType };

const walkthrough = [
  { title: 'Share your structure', desc: 'Your fund type, vehicles and investors' },
  { title: 'See it on your numbers', desc: 'Capital calls, accounting and reporting for your set-up' },
  { title: 'Get a plan that fits', desc: 'Pricing for your fund type, explained up front' },
];

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
  const [activeGroup, setActiveGroup] = useState(0);
  return (
    <>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroGlow} />
        <Container size="lg" className={s.heroInner}>
          <div className={s.heroCopy}>
            <div className="heroEnter">
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
            </div>
          </div>
          <div className={`${s.heroShot} heroEnter heroEnterLate`}>
            <div className={s.frame}>
              <div className={s.frameBar}>
                <span className={s.dot} data-c="r" /><span className={s.dot} data-c="y" /><span className={s.dot} data-c="g" />
                <span className={s.url}>app.aama.io</span>
              </div>
              <div className={s.frameBody}>
                <Image src={data.image} alt={data.name} width={1280} height={820} sizes="(max-width: 64em) 100vw, 640px" className={s.shot} priority />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits — a single ruled strip, not a card grid */}
      {data.benefits.length > 0 && (
        <section className={`${s.section} ${s.sectionMuted}`}>
          <Container size="xl">
            <div className={s.leftHead}>
              <span className={s.eyebrow}>Why aama.io</span>
              <h2 className={s.h2}>Built to move your operations forward</h2>
            </div>
            <div className={s.benefitStrip}>
              {data.benefits.map((b, i) => {
                const BIcon = b.icon;
                return (
                  <Reveal key={b.title} delay={(i % 4) * 0.07}>
                    <div className={s.benefitCol}>
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

      {/* Capabilities — tab rail and a detail panel */}
      <section className={s.section}>
        <Container size="xl">
          <div className={s.leftHead}>
            <span className={s.eyebrow}>Capabilities</span>
            <h2 className={s.h2}>Everything you need, in one platform</h2>
            <p className={s.lead}>{data.description}</p>
          </div>
          <div className={s.explorer}>
            <div className={s.rail} role="tablist" aria-label="Capabilities">
              {data.featureGroups.map((f, i) => (
                <button
                  key={f.title}
                  type="button"
                  role="tab"
                  id={`cap-tab-${i}`}
                  aria-selected={i === activeGroup}
                  aria-controls={i === 0 ? 'cap-panel' : `cap-panel-${i}`}
                  className={s.railItem}
                  data-active={i === activeGroup || undefined}
                  onClick={() => setActiveGroup(i)}
                >
                  <span className={s.railNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={s.railText}>
                    <span className={s.railTitle}>{f.title}</span>
                    <span className={s.railDesc}>{f.description}</span>
                  </span>
                  <IconArrowRight size={18} className={s.railArrow} />
                </button>
              ))}
            </div>

            <div className={s.panel}>
              <div className={s.panelGlow} />
              {/* Every group stays in the DOM (inactive ones are `hidden`) so crawlers and
                  answer engines read all capabilities, not just the selected tab. */}
              {data.featureGroups.map((g, gi) => (
                <div
                  key={g.title}
                  className={s.panelBody}
                  role="tabpanel"
                  id={gi === 0 ? 'cap-panel' : `cap-panel-${gi}`}
                  aria-labelledby={`cap-tab-${gi}`}
                  hidden={gi !== activeGroup}
                >
                  <div className={s.panelHead}>
                    <span className={s.panelIcon}><Icon size={22} stroke={1.7} /></span>
                    <span className={s.panelCount}>{g.items.length} capabilities</span>
                  </div>
                  <h3 className={s.panelTitle}>{g.title}</h3>
                  <p className={s.panelDesc}>{g.description}</p>
                  <ul className={s.tiles}>
                    {g.items.map((it) => (
                      <li key={it} className={s.tile}>
                        <span className={s.tileCheck}><IconCheck size={13} stroke={3} /></span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={s.panelFoot}>
                    <Link href="/contact" className={s.panelLink}>
                      See it on your own structure <IconArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* AI-assisted accounting — only on pages that supply it */}
      {data.aiSection && (
        <section className={`${s.section} ${s.sectionMuted}`} id="ai">
          <Container size="xl">
            <div className={s.leftHead}>
              <span className={s.eyebrow}>{data.aiSection.eyebrow}</span>
              <h2 className={s.h2}>{data.aiSection.headline}</h2>
              <p className={s.lead}>{data.aiSection.subhead}</p>
            </div>
            {data.aiSection.results && (
              <div className={s.resultStrip}>
                {data.aiSection.results.map((r, i) => (
                  <Reveal key={r.title} delay={i * 0.06}>
                    <div className={s.resultCol}>
                      <span className={s.resultTick}><IconCheck size={14} stroke={3} /></span>
                      <div className={s.resultTitle}>{r.title}</div>
                      <div className={s.resultText}>{r.text}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
            <div className={s.docGrid}>
              {data.aiSection.docs.map((d, i) => {
                const DIcon = d.icon;
                return (
                  <Reveal key={d.title} delay={i * 0.07}>
                    <div className={s.docCard}>
                      <span className={s.docIcon}><DIcon size={22} stroke={1.7} /></span>
                      <span className={s.docKind}>{d.title}</span>
                      <h3 className={s.docTitle}>{d.result}</h3>
                      <p className={s.docText}>{d.sentence}</p>
                      <div className={s.docListLabel}>What it reads</div>
                      <ul className={s.docList}>
                        {d.bullets.map((b) => (
                          <li key={b}><IconCheck size={15} className={s.featureCheck} /> {b}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            {data.aiSection.mapping && (
              <Reveal>
                <div className={s.mapBlock}>
                  <div className={s.mapCopy}>
                    <span className={s.mapEyebrow}>{data.aiSection.mapping.eyebrow}</span>
                    <h3 className={s.mapTitle}>{data.aiSection.mapping.title}</h3>
                    <p className={s.mapText}>{data.aiSection.mapping.text}</p>
                    <ul className={s.mapPoints}>
                      {data.aiSection.mapping.points.map((pt) => (
                        <li key={pt}><IconCheck size={15} className={s.mapCheck} /> {pt}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={s.loopCard}>
                    <div className={s.loopHead}>{data.aiSection.mapping.loopTitle}</div>
                    {data.aiSection.mapping.loop.map((l, i) => (
                      <div key={l.label} className={s.loopStep}>
                        <span className={s.loopDot}>{i + 1}</span>
                        <span className={s.loopBody}>
                          <span className={s.loopLabel}>{l.label}</span>
                          <span className={s.loopText}>{l.text}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
            {data.aiSection.illustration && <AiTimeIllustration />}
            <ol className={s.stepStrip} aria-label="How a document reaches the books">
              {data.aiSection.steps.map((st, i) => (
                <li key={st} className={s.stripStep}>
                  <span className={s.stripNum}>{i + 1}</span>
                  <span className={s.stripLabel}>{st}</span>
                </li>
              ))}
            </ol>
            <p className={s.aiNote}>{data.aiSection.note}</p>
          </Container>
        </section>
      )}

      {/* Use cases — numbered rows with metrics aligned right */}
      {data.useCases && data.useCases.length > 0 && (
        <section className={`${s.section} ${s.sectionMuted}`}>
          <Container size="xl">
            <div className={s.leftHead}>
              <span className={s.eyebrow}>Use cases</span>
              <h2 className={s.h2}>How teams put it to work</h2>
            </div>
            <div className={s.caseList}>
              {data.useCases.map((u, i) => (
                <Reveal key={u.title} delay={(i % 3) * 0.05}>
                  <div className={s.caseRow}>
                    <span className={s.caseNum}>{String(i + 1).padStart(2, '0')}</span>
                    <div className={s.caseMain}>
                      <div className={s.useTitle}>{u.title}</div>
                      <div className={s.useDesc}>{u.description}</div>
                    </div>
                    {u.metrics && (
                      <div className={s.caseMetrics}>
                        {u.metrics.map((m) => (
                          <div key={m.label} className={s.caseMetric}>
                            <span className={s.useMetricValue}>{m.value}</span>
                            <span className={s.useMetricLabel}>{m.label}</span>
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

      {/* Key features — rounded ink band */}
      {data.keyFeatures && data.keyFeatures.length > 0 && (
        <section className={s.bandSection}>
          <Container size="xl">
            <div className={s.inkCard}>
              <div className={s.inkGlow} />
              <div className={s.inkInner}>
                <span className={s.inkEyebrow}>Platform</span>
                <h2 className={s.inkTitle}>More of what&apos;s under the hood</h2>
                <div className={s.inkGrid}>
                  {data.keyFeatures.map((k) => (
                    <div key={k.title} className={s.inkItem}>
                      <span className={s.inkCheck}><IconCheck size={14} stroke={2.6} /></span>
                      <div>
                        <div className={s.inkItemTitle}>{k.title}</div>
                        <div className={s.inkItemDesc}>{k.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ — sticky intro beside the accordion */}
      <section className={`${s.section} ${s.sectionMuted}`}>
        <Container size="xl">
          <div className={s.split}>
            <div className={s.splitIntro}>
              <span className={s.eyebrow}>FAQ</span>
              <h2 className={s.h2}>Frequently asked questions</h2>
              <p className={s.lead}>
                Something else on your mind? <Link href="/contact" className={s.inlineLink}>Talk to the team</Link>.
              </p>
            </div>
            <Reveal>
              <Accordion variant="separated" radius="md" chevronPosition="right">
                {data.faqs.map((item, i) => (
                  <Accordion.Item key={i} value={`faq-${i}`}>
                    <Accordion.Control><span className={s.faqQ}>{item.q}</span></Accordion.Control>
                    <Accordion.Panel><span className={s.faqA}>{item.a}</span></Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className={s.section}>
          <Container size="xl">
            <div className={s.leftHead}>
              <span className={s.eyebrow}>Explore</span>
              <h2 className={s.h2}>{relatedHeading}</h2>
            </div>
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
        <Container size="xl">
          <div className={s.ctaCard}>
            <div className={s.ctaGlow} />
            <div className={s.ctaGrid}>
              <div className={s.ctaCopy}>
                <span className={s.ctaChip}>Book a walkthrough</span>
                <h2 className={s.ctaTitle}>See {data.shortName} running on your own structure</h2>
                <p className={s.ctaDesc}>
                  Bring your fund or vehicle and your questions. Our team will show aama.io working on your set-up,
                  not a generic demo.
                </p>
                <div className={s.ctaRow}>
                  <Button component={Link} href="/contact" size="md" radius="md" className={s.primary} rightSection={<IconArrowRight size={18} />}>Book a demo</Button>
                  <Button component={Link} href="/pricing" size="md" radius="md" variant="default" className={s.ctaGhost}>View pricing</Button>
                </div>
                <ul className={s.ctaProof}>
                  <li><IconCheck size={15} stroke={2.6} /> Shown on your own structure</li>
                  <li><IconCheck size={15} stroke={2.6} /> Pricing explained up front</li>
                  <li><IconCheck size={15} stroke={2.6} /> Singapore and APAC specialists</li>
                </ul>
              </div>

              <div className={s.ctaPanel}>
                <div className={s.ctaPanelHead}>
                  <span>Your walkthrough</span>
                  <span className={s.ctaPanelBadge}>3 steps</span>
                </div>
                {walkthrough.map((st, i) => (
                  <div key={st.title} className={s.ctaStep}>
                    <span className={s.ctaDot}>{i + 1}</span>
                    <span className={s.ctaStepBody}>
                      <span className={s.ctaStepTitle}>{st.title}</span>
                      <span className={s.ctaStepDesc}>{st.desc}</span>
                    </span>
                  </div>
                ))}
                <Link href="/emerging-managers" className={s.ctaPanelLink}>
                  Raising your first fund? See Launch Free <IconArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

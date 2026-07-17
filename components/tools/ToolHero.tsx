import { Center, Loader } from '@mantine/core';
import { TOOL_CONTENT } from '@/lib/toolContent';
import { ALL_TOOLS } from '@/lib/tools';
import c from './ToolHero.module.css';

/**
 * Server-rendered hero used as the loading state for each (client-only, `ssr: false`)
 * calculator. Because the calculator is not server-rendered, THIS is what lands in the
 * initial HTML — giving every tool a real <h1> and lead copy for search engines to
 * index and answer engines to cite, instead of a bare spinner. On the client it is
 * replaced by the interactive tool, so there is no visual duplication.
 */
export function ToolHero({ slug }: { slug: string }) {
  const data = TOOL_CONTENT[slug];
  const tool = ALL_TOOLS.find((t) => t.href === slug);

  if (!data) {
    return (
      <Center style={{ minHeight: '80vh' }}>
        <Loader color="blue" />
      </Center>
    );
  }

  return (
    <section className={c.hero}>
      <div className={c.glow} />
      <div className={c.inner}>
        <span className={c.pill}>Free tool · no signup</span>
        <h1 className={c.title}>{tool?.label ?? data.seoTitle}</h1>
        <p className={c.lead}>{data.seoDescription}</p>
        {data.intro[0] && <p className={c.intro}>{data.intro[0]}</p>}
        <Center mt="xl">
          <Loader color="blue" />
        </Center>
      </div>
    </section>
  );
}

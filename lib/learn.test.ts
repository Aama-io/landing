import { LEARN_TERMS, LEARN_TOPICS } from './learn';
import { TOOL_CONTENT } from './toolContent';
import { blogPosts } from './blogPosts';
import { SOLUTIONS } from './solutions';

const wordCount = (s: string) => s.trim().split(/\s+/).length;

describe('Learn terms', () => {
  it('has unique slugs and valid topics', () => {
    const slugs = LEARN_TERMS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    LEARN_TERMS.forEach((t) => expect(LEARN_TOPICS.map((x) => x.slug)).toContain(t.topic));
  });

  it.each(LEARN_TERMS.map((t) => [t.slug, t] as const))('%s is well-formed', (_slug, t) => {
    const words = wordCount(t.directAnswer);
    expect(words).toBeGreaterThanOrEqual(40);
    expect(words).toBeLessThanOrEqual(60);
    expect(t.description.length).toBeLessThanOrEqual(175);
    expect(t.faqs.length).toBeGreaterThanOrEqual(3);
    t.relatedTerms.forEach((r) => expect(LEARN_TERMS.map((x) => x.slug)).toContain(r));
    t.relatedTools.forEach((p) => expect(TOOL_CONTENT[p]).toBeDefined());
    t.relatedPosts.forEach((p) => expect(blogPosts.map((b) => b.slug)).toContain(p.slug));
    if (t.relatedSolution) {expect(SOLUTIONS.map((s) => s.slug)).toContain(t.relatedSolution);}
  });

  it('avoids banned marketing words', () => {
    const text = JSON.stringify(LEARN_TERMS).toLowerCase();
    ['streamline', 'seamlessly', 'robust', 'powerful'].forEach((w) => expect(text).not.toContain(w));
  });
});

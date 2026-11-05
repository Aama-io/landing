import { Container } from '@mantine/core';
import Link from 'next/link';
import s from './Compare.module.css';

/** A quiet internal-link line for comparison-minded visitors; not a call to action. */
export function CompareNote() {
  return (
    <aside className={s.inlineNote} aria-label="Comparisons">
      <Container size="xl">
        <p className={s.inlineNoteText}>
          Evaluating other platforms? See{' '}
          <Link href="/alternatives">alternatives to Carta, Juniper Square and Allvue</Link>, or read our guides to{' '}
          <Link href="/alternatives/best-fund-administration-software">fund administration software</Link> and{' '}
          <Link href="/alternatives/best-spv-administration-software">SPV administration software</Link>.
        </p>
      </Container>
    </aside>
  );
}

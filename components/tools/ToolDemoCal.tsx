import { useEffect, useRef, useState } from 'react';
import { Container } from '@mantine/core';
import Cal, { getCalApi } from '@calcom/embed-react';
import c from './ToolDemoCal.module.css';

/**
 * "Book a 30-minute demo" scheduler shown at the end of each tool page — the same
 * Cal.com embed as the contact page. It mounts only once scrolled near, so the
 * embed never slows the calculator itself.
 */
export function ToolDemoCal() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!show) {return;}
    (async () => {
      const cal = await getCalApi();
      cal('ui', { styles: { branding: { brandColor: '#0070f3' } } });
    })();
  }, [show]);

  const cal = (
    <div className={c.calBox}>
      {show && <Cal calLink="aamaio/30min" style={{ width: '100%', height: '100%' }} />}
    </div>
  );

  return (
    <section className={c.wrap} id="schedule" aria-labelledby="tool-demo-title">
      <Container size="md">
        <div className={c.card} ref={ref}>
          <h2 id="tool-demo-title" className={c.title}>Book a 30-minute demo</h2>
          <p className={c.sub}>
            Pick a time that works. We will walk through the platform on your own structure.
          </p>
          {cal}
        </div>
      </Container>
    </section>
  );
}

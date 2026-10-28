import Image from 'next/image';
import classes from './ClientLogos.module.css';

// Logo files live in public/clients (trimmed to their artwork). `show` is the rendered
// height in px, tuned per logo so wide wordmarks and stacked marks carry similar weight.
export const clients = [
  { name: 'Kumari Capital', src: '/clients/kumari-capital.png', w: 614, h: 137, show: 44 },
  { name: 'Prabhu Capital', src: '/clients/prabhu-capital.png', w: 400, h: 248, show: 56 },
  { name: 'Sanima Capital', src: '/clients/sanima-capital.png', w: 222, h: 50, show: 40 },
  { name: 'Siddhartha Capital', src: '/clients/siddhartha-capital.png', w: 330, h: 94, show: 50 },
  { name: 'LS Capital', src: '/clients/ls-capital.png', w: 440, h: 156, show: 52 },
  { name: 'Main Street Venture Capital', src: '/clients/msvc.png', w: 640, h: 123, show: 38 },
  { name: 'Astria Consulting', src: '/clients/astria-consulting.png', w: 640, h: 297, show: 64 },
];

// Two identical groups slide by half the track width, so the loop is seamless. Each group
// holds the list twice so it is wider than any common viewport.
const GROUP = [...clients, ...clients];

/** Slow, pausable carousel of client logos: uniform tiles, grayscale until hovered. */
export function ClientLogos() {
  return (
    <div className={classes.marquee}>
      <div className={classes.track}>
        {[0, 1].map((g) => (
          <div key={g} className={classes.group} aria-hidden={g === 1 || undefined}>
            {GROUP.map((c, i) => (
              <span key={`${c.name}-${i}`} className={classes.tile}>
                <Image
                  src={c.src}
                  alt={g === 0 && i < clients.length ? c.name : ''}
                  width={c.w}
                  height={c.h}
                  sizes="180px"
                  className={classes.logo}
                  style={{ height: c.show, width: 'auto' }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

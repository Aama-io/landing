import Link from 'next/link';
import classes from './Logo.module.css';

type LogoProps = {
  /** Render light text for use on dark backgrounds (e.g. CTA bands) */
  variant?: 'default' | 'light';
  href?: string | null;
  onClick?: () => void;
  /** Show "The operating layer for private capital" beside the wordmark, divider-separated */
  tagline?: boolean;
};

/**
 * aama.io brand mark — a "ledger card" tile (gradient brand tile with three
 * balance lines and a rising teal balance dot) paired with a neutral ink
 * wordmark whose dot echoes the mark's accent.
 *
 * The tagline sits inline after a divider rather than stacked underneath —
 * a five-word line has no business trying to be no wider than a seven-
 * character wordmark. It hides below the point where the full nav also
 * wants the room (see Logo.module.css).
 */
export function Logo({ variant = 'default', href = '/', onClick, tagline = true }: LogoProps) {
  const content = (
    <>
      <svg className={classes.mark} viewBox="0 0 40 40" role="img" aria-hidden>
        <defs>
          <linearGradient id="aamaTile" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a6cf0" />
            <stop offset="1" stopColor="#1450c4" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="40" height="40" rx="11" fill="url(#aamaTile)" />
        <rect x="11" y="13.5" width="13" height="3" rx="1.5" fill="#fff" opacity="0.95" />
        <rect x="11" y="20" width="18" height="3" rx="1.5" fill="#fff" opacity="0.68" />
        <rect x="11" y="26.5" width="10" height="3" rx="1.5" fill="#fff" opacity="0.46" />
        <circle cx="27.5" cy="15" r="2.8" fill="#00c896" />
      </svg>
      <span className={classes.word}>
        aama<span className={classes.dot}>.</span>io
      </span>
      {tagline ? (
        <span className={classes.taglineGroup}>
          <span className={classes.divider} aria-hidden="true" />
          <span className={classes.tagline}>The operating layer for private capital</span>
        </span>
      ) : null}
    </>
  );

  if (href === null) {
    return (
      <span className={classes.logo} data-variant={variant}>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} className={classes.logo} data-variant={variant} onClick={onClick} aria-label="aama.io home">
      {content}
    </Link>
  );
}

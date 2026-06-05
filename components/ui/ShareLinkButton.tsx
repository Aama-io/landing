import { useState } from 'react';
import { Button } from '@mantine/core';
import { IconLink, IconCheck } from '@tabler/icons-react';

/**
 * Copies the current page URL (which the host tool keeps in sync with its
 * inputs) to the clipboard, with a brief "copied" confirmation.
 */
export function ShareLinkButton({
  fullWidth,
  className,
  label = 'Copy share link',
}: {
  fullWidth?: boolean;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for non-secure contexts where the Clipboard API is unavailable.
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* give up silently */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Button
      variant="light"
      color="blue"
      fullWidth={fullWidth}
      className={className}
      onClick={copy}
      leftSection={copied ? <IconCheck size={16} /> : <IconLink size={16} />}
    >
      {copied ? 'Link copied!' : label}
    </Button>
  );
}

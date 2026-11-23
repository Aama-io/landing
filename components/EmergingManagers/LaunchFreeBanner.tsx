import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useAnalytics } from '@/components/Analytics/useAnalytics';
import s from './EmergingManagers.module.css';

/** Slim strip promoting the Launch Free offer; links to /emerging-managers. */
export function LaunchFreeBanner() {
  const { trackEvent } = useAnalytics();

  return (
    <div className={s.banner}>
      <span className={s.bannerText}>
        <strong>Founding offer: your first close, on us.</strong> The aama.io LP portal is free through your first close, and SPVs pay when they collect. Ends without notice.
      </span>
      <Link
        href="/emerging-managers"
        className={s.bannerLink}
        onClick={() =>
          trackEvent({
            action: 'launch_free_banner_click',
            category: 'launch_free',
            label: 'lp_portal',
          })
        }
      >
        Claim your spot <IconArrowRight size={15} />
      </Link>
    </div>
  );
}

import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import s from './EmergingManagers.module.css';

/** Slim strip promoting the Launch Free offer; links to /emerging-managers. */
export function LaunchFreeBanner() {
  return (
    <div className={s.banner}>
      <span className={s.bannerText}>
        <strong>Founding offer: your first close, on us.</strong> The aama.io LP portal is free through your first close. Ends without notice.
      </span>
      <Link href="/emerging-managers" className={s.bannerLink}>
        Claim your spot <IconArrowRight size={15} />
      </Link>
    </div>
  );
}

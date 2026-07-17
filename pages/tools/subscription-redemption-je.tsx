import dynamic from 'next/dynamic';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolHero } from '@/components/tools/ToolHero';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const SubscriptionRedemptionJE = dynamic(
  () => import('@/components/SubscriptionRedemptionJE/SubscriptionRedemptionJE'),
  { ssr: false, loading: () => <ToolHero slug="/tools/subscription-redemption-je" /> }
);

export default function SubscriptionRedemptionJEPage() {
  return (
    <>
      <ToolMeta slug="/tools/subscription-redemption-je" />
      <PageShell>
        <SubscriptionRedemptionJE />
        <ToolContentSection slug="/tools/subscription-redemption-je" />
      </PageShell>
    </>
  );
}

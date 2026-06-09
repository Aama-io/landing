import dynamic from 'next/dynamic';
import { Center, Loader } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import { ToolMeta } from '@/components/tools/ToolMeta';
import { ToolContentSection } from '@/components/tools/ToolContentSection';

const SubscriptionRedemptionJE = dynamic(
  () => import('@/components/SubscriptionRedemptionJE/SubscriptionRedemptionJE'),
  { ssr: false, loading: () => (<Center style={{ minHeight: '80vh' }}><Loader color="blue" /></Center>) }
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

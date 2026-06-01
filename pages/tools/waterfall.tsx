import dynamic from 'next/dynamic';
import { Center, Loader } from '@mantine/core';
import { PageShell } from '@/components/ui/PageShell';
import { SEO } from '@/components/SEO/SEO';

// Client-only — the calculator uses recharts (needs the DOM), so we skip SSR.
const WaterfallCalculator = dynamic(
  () => import('@/components/WaterfallCalculator/WaterfallCalculator'),
  {
    ssr: false,
    loading: () => (
      <Center style={{ minHeight: '80vh' }}>
        <Loader color="blue" />
      </Center>
    ),
  }
);

export default function WaterfallCalculatorPage() {
  return (
    <>
      <SEO
        title="Free Waterfall Distribution Calculator | aama.io"
        description="A free PE/VC fund waterfall calculator — model return of capital, preferred return, GP catch-up and carry split, with IRR curves, Bear/Base/Bull scenarios and GP clawback analysis."
        keywords="waterfall calculator, carried interest calculator, GP catch-up, preferred return, LP distribution, IRR, clawback, private equity, venture capital, fund waterfall"
      />
      <PageShell>
        <WaterfallCalculator />
      </PageShell>
    </>
  );
}

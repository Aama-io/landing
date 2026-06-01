import { PageShell } from '@/components/ui/PageShell';
import { AboutHero } from '../components/AboutHero/AboutHero';
import { Team } from '../components/Team/Team';
import { SEO } from '@/components/SEO/SEO';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us | aama.io"
        description="Learn about aama.io's mission to modernize fund management, the team behind the platform, and the journey so far."
        keywords="aama team, fund management team, fintech experts, fund innovation, financial technology"
      />
      <PageShell>
        <AboutHero />
        <Team />
      </PageShell>
    </>
  );
}

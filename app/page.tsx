import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import HowItWorks from '@/components/home/HowItWorks';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
    </main>
  );
}

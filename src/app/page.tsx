import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturedDrop } from "@/components/sections/FeaturedDrop";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { EditorialStrip } from "@/components/sections/EditorialStrip";
import { Manifesto } from "@/components/sections/Manifesto";
import { Lookbook } from "@/components/sections/Lookbook";
import { Waitlist } from "@/components/sections/Waitlist";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between text-bone bg-black selection:bg-red selection:text-black">
      <Hero />
      <Marquee />
      <FeaturedDrop />
      <CollectionGrid />
      <EditorialStrip />
      <Manifesto />
      <Lookbook />
      <Waitlist />
      <Footer />
    </main>
  );
}

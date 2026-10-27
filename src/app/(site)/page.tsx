import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Lab } from "@/components/sections/lab";
import { Services } from "@/components/sections/services";
import { WorkSection } from "@/components/sections/work";
import { Hero } from "@/components/hero/hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WorkSection />
      <Lab />
      <Contact />
    </>
  );
}

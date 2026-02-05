import Hero from "../components/sections/Hero";
import Statement from "../components/sections/Statement";
import Letter from "../components/sections/Letter";
import Contact from "../components/sections/Contact";
import { site } from "../content/site";

export default function Page() {
  return (
    <main>
      <Hero data={site.hero} />
      <Statement data={site.statement} />
      <Letter data={site.letter} />
      <Contact data={site.contact} />
    </main>
  );
}

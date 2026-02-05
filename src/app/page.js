import Hero from "../components/sections/Hero";
import Statement from "../components/sections/Statement";
import Letter from "../components/sections/Letter";
import Certifications from "../components/sections/Certifications";
import Workshops from "../components/sections/Workshops";
import Podcast from "../components/sections/Podcast";
import Blog from "../components/sections/Blog";
import Contact from "../components/sections/Contact";
import { site } from "../content/site";

export default function Page() {
  return (
    <>

      <main>
        <Hero data={site.hero} />
        <Statement data={site.statement} />
        <Letter data={site.letter} />

        <Certifications data={site.certifications} />
        <Workshops data={site.workshops} />
        <Podcast data={site.podcast} />
        <Blog data={site.blog} />

        <Contact data={site.contact} />
      </main>

    </>
  );
}

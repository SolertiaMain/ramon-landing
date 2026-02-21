import Hero from "../components/sections/Hero";
import Statement from "../components/sections/Statement";
import Letter from "../components/sections/Letter";
import { site } from "../content/site";

export default function Page() {
  return (
    <main>
      <Hero data={site.hero} />
      <Statement data={site.statement} />
      <Letter data={site.letter} />
      
    </main>
  );
}

<CertificationHolder
  title={cert.title}
  description={cert.description}
  href={cert.href}
  badge="Certificación"
  metaLeft="Programa profesional"
  metaRight="PDF"
  delay={idx * 120}
  mounted={mounted}
/>
import Container from "../layout/Container";

export default function Contact({ data }) {
  return (
    <section id="contacto" className="py-20 border-t scroll-mt-24">
      <Container className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{data.title}</h2>
        <p className="mt-3 opacity-80">{data.subtitle}</p>
        <div className="mt-8">
          <a href={data.button.href} className="inline-flex rounded-md bg-black px-6 py-3 text-white hover:opacity-90">
            {data.button.label}
          </a>
        </div>
      </Container>
    </section>
  );
}

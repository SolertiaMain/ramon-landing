import Container from "../layout/Container";

export default function Statement({ data }) {
  return (
    <section id="statement" className="py-16 border-y">
      <Container className="text-center">
        <p className="text-2xl sm:text-3xl font-medium tracking-tight">{data.text}</p>
        {data.author && <p className="mt-4 text-sm opacity-70">{data.author}</p>}
      </Container>
    </section>
  );
}

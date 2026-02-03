import Container from "../layout/Container";

export default function Letter({ data }) {
  return (
    <section id="carta" className="py-20 scroll-mt-24">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight">{data.title}</h2>
        <div className="mt-6 space-y-4 text-base leading-7 opacity-85">
          {data.blocks.map((b, idx) => (
            <p key={idx}>{b.text}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}

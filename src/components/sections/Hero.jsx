import Container from "../layout/Container";

export default function Hero({ data }) {
  return (
    <section id="top" className="py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">{data.name}</h1>
          <p className="mt-4 text-xl opacity-80">{data.tagline}</p>

          <div className="mt-8">
            <a href={data.cta.href} className="inline-flex rounded-md bg-black px-5 py-3 text-white hover:opacity-90">
              {data.cta.label}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border min-h-[260px] bg-gradient-to-br from-neutral-100 to-neutral-200" />
      </Container>
    </section>
  );
}

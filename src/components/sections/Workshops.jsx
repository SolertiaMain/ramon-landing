import Container from "../layout/Container";

export default function Workshops({ data }) {
  return (
    <section id="talleres" className="py-20 scroll-mt-24">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight">
          {data.title}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((it, idx) => (
            <div key={idx} className="rounded-2xl border p-5">
              <p className="font-medium">{it.title}</p>

              {it.format && (
                <p className="mt-1 text-sm opacity-70">{it.format}</p>
              )}

              {it.description && (
                <p className="mt-3 text-sm opacity-80">
                  {it.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

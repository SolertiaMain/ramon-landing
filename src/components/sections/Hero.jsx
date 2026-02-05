import Container from "../layout/Container";
import Image from "next/image";

export default function Hero({ data }) {
  return (
    <section id="top" className="relative h-screen">
      {/* Background image */}
      <Image
        src="/images/ramon.jpg"
        alt="Ramón Cuevas Martínez"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <Container className="relative z-10 flex h-full pt-124 sm:pt-128">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-white">
            Ramón Cuevas Martínez
          </h1>

          <p className="mt-4 text-xl sm:text-2xl text-white/80">
            Impulso Completo
          </p>

          <div className="mt-10">
            <a
              href={data.cta.href}
              className="inline-flex rounded-md bg-white px-6 py-3 text-black font-medium hover:opacity-90"
            >
              {data.cta.label}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

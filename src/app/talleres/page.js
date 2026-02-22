"use client";

import { useEffect, useState } from "react";
import CertificationHolder from "@/components/sections/CertificationHolder";

const TALLERES = [
  {
    title: "Taller en desarrollo",
    description:
      "Estamos preparando nuevos talleres orientados a fortalecer capacidades institucionales, habilidades estratégicas y herramientas prácticas para organizaciones públicas y privadas.",
  },
  {
    title: "Próximamente",
    description:
      "Esta sección incluirá programas formativos enfocados en liderazgo, cultura organizacional, gestión del cambio y desarrollo profesional.",
  },
  {
    title: "Formación especializada",
    description:
      "Se integrarán talleres diseñados para acompañar procesos de mejora organizacional, implementación de políticas internas y fortalecimiento de equipos de trabajo.",
  },
  {
    title: "Innovación y transformación",
    description:
      "Nuestros próximos talleres abordarán metodologías actuales para impulsar innovación, eficiencia y toma de decisiones basada en evidencia.",
  },
];

export default function TalleresPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imgOffset = Math.min(scrollY * 0.18, 95);
  const gradOffset = Math.min(scrollY * 0.30, 140);
  const darkAlpha = Math.min(0.60, 0.33 + scrollY / 1400);

  return (
    <main className="min-h-screen bg-stone-200">

      {/* HERO */}
      <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <img
          src="/images/talleres_ramon.jpg"
          alt="Talleres"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            objectPosition: "center 30%",
            transform: `translateY(${imgOffset}px) ${
              mounted ? "scale(1.05)" : "scale(1)"
            }`,
            transition: "transform 1600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${darkAlpha})` }}
        />

        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translateY(${gradOffset}px)`,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.22), rgba(0,0,0,0.00))",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-14">
          <div className="max-w-3xl">
            <h1
              className={[
                "text-4xl md:text-6xl font-semibold tracking-tight text-white",
                "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "140ms" }}
            >
              Talleres
            </h1>

            <p
              className={[
                "mt-4 text-white/85 max-w-2xl",
                "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "320ms" }}
            >
              <strong className="text-white">
                Descubre nuestros talleres.
              </strong>
              <br />
              Participa en experiencias formativas diseñadas para desarrollar
              habilidades estratégicas y generar impacto real en equipos y
              organizaciones.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">

          {TALLERES.map((taller, idx) => (
            <CertificationHolder
              key={taller.title}
              title={taller.title}
              description={taller.description}
              href="#"
              videoUrl=""
              mainImage="/images/placeholders/taller_placeholder.jpg"
              badgeTop=""
              badgeBottom=""
              badge="Taller"
              metaLeft="En preparación"
              metaRight=""
              delay={idx * 120}
              mounted={mounted}
            />
          ))}

        </div>
      </section>

    </main>
  );
}
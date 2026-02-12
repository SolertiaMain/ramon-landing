"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CERTS = [
  {
    title:
      "Consultoras y Consultores en Prácticas de Igualdad Laboral y No Discriminación",
    description:
      "Formación orientada a comprender e implementar prácticas clave de la Norma Mexicana NMX-R-025-SCFI-2015, fortaleciendo capacidades de acompañamiento y mejora en centros de trabajo.",
    href: "/files/Consult_Igualdad.pdf",
  },
  {
    title: "Consultoras y Consultores en Gestión basada en Resultados",
    description:
      "Enfoque para planear, dar seguimiento y evaluar programas y proyectos con orientación a resultados, monitoreo y evaluación, fortaleciendo la toma de decisiones y la rendición de cuentas.",
    href: "/files/Consult_Gestion.pdf",
  },
  {
    title:
      "Gestión y Acreditación Corporativa de Prácticas de Igualdad Laboral y No Discriminación",
    description:
      "Acompañamiento para preparar y certificar al centro de trabajo en la Norma Mexicana NMX-R-025-SCFI-2015, con énfasis en requisitos, evidencia y procesos de auditoría.",
    href: "/files/NoViolencia.pdf",
  },
  {
    title: "Certificación de Ombudsperson",
    description:
      "Certificación/curso especializado para fortalecer la atención imparcial de quejas y conflictos internos, promoviendo entornos laborales respetuosos y mecanismos institucionales de resolución.",
    href: "/files/Ombudsperson.pdf",
  },
];

export default function CertificacionesPage() {
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

  // Parallax + gradiente dinámico
  const imgOffset = Math.min(scrollY * 0.18, 95);
  const gradOffset = Math.min(scrollY * 0.30, 140);
  const darkAlpha = Math.min(0.60, 0.33 + scrollY / 1400);

  return (
    <main className="min-h-screen bg-stone-200">
      {/* HERO */}
      <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
        {/* Imagen: parallax + zoom */}
        <img
          src="/images/certificaciones.jpg" // <- cambia extensión si es .png / .webp
          alt="Certificaciones"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            transform: `translateY(${imgOffset}px) ${mounted ? "scale(1.05)" : "scale(1)"}`,
            transition:
              "transform 1600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* Overlay oscuro dinámico */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${darkAlpha})` }}
        />

        {/* Gradiente dinámico */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translateY(${gradOffset}px)`,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.22), rgba(0,0,0,0.00))",
          }}
        />

        {/* Texto (con delay por elemento) */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
          <div className="max-w-3xl">
            <h1
              className={[
                "text-4xl md:text-6xl font-semibold tracking-tight text-white",
                "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "140ms" }}
            >
              Certificaciones
            </h1>

            <p
              className={[
                "mt-4 max-w-2xl text-white/85",
                "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "320ms" }}
            >
              <strong className="text-white">Descubre nuestras certificaciones.</strong>
              <br />
              Encuentra una explicación breve de cada una y haz clic en el botón para conocer más información.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {CERTS.map((c, idx) => (
            <div
              key={c.title}
              className={[
                "bg-white rounded-2xl shadow-sm border border-black/5",
                "p-6 flex flex-col min-h-[240px]",
                "transition-all duration-700 ease-out",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <h2 className="text-lg font-semibold text-neutral-900">
                {c.title}
              </h2>

              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                {c.description}
              </p>

              <div className="mt-auto pt-6">
                <Link
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  Saber más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

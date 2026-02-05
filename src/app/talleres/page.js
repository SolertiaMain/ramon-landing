"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CERTS = [
  {
    title:
      "Consultoras y Consultores en Prácticas de Igualdad Laboral y No Discriminación",
    description:
      "Formación orientada a comprender e implementar prácticas clave de la Norma Mexicana NMX-R-025-SCFI-2015, fortaleciendo capacidades de acompañamiento y mejora en centros de trabajo.",
    href: "https://maxan.com.mx/servicios/cursos/induccion-a-la-norma-mexicana-nmx-r-025-scfi-2015-en-igualdad-laboral-y-no-discriminacion",
  },
  {
    title: "Consultoras y Consultores en Gestión basada en Resultados",
    description:
      "Enfoque para planear, dar seguimiento y evaluar programas y proyectos con orientación a resultados, monitoreo y evaluación, fortaleciendo la toma de decisiones y la rendición de cuentas.",
    href: "https://gobernova.com.mx/servicios/estandar-competencia/informacion-general",
  },
  {
    title:
      "Gestión y Acreditación Corporativa de Prácticas de Igualdad Laboral y No Discriminación",
    description:
      "Acompañamiento para preparar y certificar al centro de trabajo en la Norma Mexicana NMX-R-025-SCFI-2015, con énfasis en requisitos, evidencia y procesos de auditoría.",
    href: "https://gobernova.com.mx/servicios/perspectiva-genero/capacitacion/asesoria-certificacion-norma-mexicana-nmx-r-025-scfi-2015",
  },
  {
    title: "Certificación de Ombudsperson",
    description:
      "Certificación/curso especializado para fortalecer la atención imparcial de quejas y conflictos internos, promoviendo entornos laborales respetuosos y mecanismos institucionales de resolución.",
    href: "https://strapi.grupointegra.dev/uploads/CURSOS_MAXAN_2025_33f6945735.pdf",
  },
];


export default function CertificacionesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Activa animación al cargar
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-stone-200">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
          Certificaciones
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-800/80">
            <strong>Descubre nuestras certificaciones.</strong><br />
            Encuentra una explicación breve de cada una y haz clic en el botón para conocer más información.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
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
              <h2 className="text-lg font-semibold text-neutral-900">{c.title}</h2>
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

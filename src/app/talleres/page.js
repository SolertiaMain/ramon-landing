"use client";

import { useEffect, useState } from "react";
import TallerHolder from "@/components/sections/TallerHolder";

const TALLERES = [
  {
    title: "Corresponsabilidad laboral, familiar y personal",
    description:
      "Taller corporativo para impulsar prácticas de corresponsabilidad y bienestar en el entorno laboral.",
    href: "/files/talleres/TALLER_CORRESPONSABILIDAD.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "3 horas",
    metaLeft: "Taller corporativo"
  },
  {
    title: "Prevenir la violencia laboral",
    description:
      "Taller corporativo para identificar, prevenir y atender conductas de violencia laboral en el centro de trabajo.",
    href: "/files/talleres/TALLER_VIOLENCIA_LABORAL.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "6 horas",
    metaLeft: "Taller corporativo"
  },
  {
    title: "Calidad en mi trabajo y vida de calidad",
    description:
      "Conferencia para fortalecer hábitos, enfoque y bienestar: desempeño sostenible con calidad de vida.",
    href: "/files/talleres/CONFERENCIA_CALIDAD_VIDA.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "3 horas",
    metaLeft: "Conferencia corporativa"
  },
  {
    title: "Alineamiento corporativo con NMX-R-025-SCFI-2015",
    description:
      "Taller para alinear procesos y cultura organizacional con prácticas de igualdad laboral y no discriminación.",
    href: "/files/talleres/TALLER_ALINEAMIENTO_NMX025.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "6 horas",
    metaLeft: "Taller corporativo"
  },
  {
    title: "Criterios técnicos para la igualdad salarial",
    description:
      "Taller para identificar brechas salariales y diseñar estrategias de corrección con criterios técnicos y normativos.",
    href: "/files/talleres/TALLER_IGUALDAD_SALARIAL.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "6 horas",
    metaLeft: "Taller corporativo"
  },
  {
    title: "Gestión eficaz del Protocolo de violencia laboral",
    description:
      "Taller para implementar y operar protocolos internos de prevención, atención y sanción de violencia laboral.",
    href: "/files/talleres/TALLER_PROTOCOLO_VIOLENCIA.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "6 horas",
    metaLeft: "Taller corporativo"
  },
  {
    title: "Inducción a igualdad, no discriminación y atención de violencia",
    description:
      "Taller para sensibilizar, establecer criterios y promover prácticas de igualdad y no discriminación en equipos.",
    href: "/files/talleres/TALLER_INDUCCION_IGUALDAD.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "3 horas",
    metaLeft: "Taller corporativo"
  },
  {
    title: "Planes de acción para igualdad laboral y no discriminación",
    description:
      "Taller para estructurar planes de acción medibles y sostenibles alineados a metas de igualdad laboral.",
    href: "/files/talleres/TALLER_PLAN_ACCION_IGUALDAD.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "5 horas",
    metaLeft: "Taller corporativo"
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
  const gradOffset = Math.min(scrollY * 0.3, 140);
  const darkAlpha = Math.min(0.6, 0.33 + scrollY / 1400);

  return (
    <main className="min-h-screen bg-stone-200">
      {/* HERO (NO CHANGE) */}
      <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <img
          src="/images/talleres_ramon.jpg"
          alt="Talleres"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            objectPosition: "center 30%",
            transform: `translateY(${imgOffset}px) ${mounted ? "scale(1.05)" : "scale(1)"
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
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "140ms" }}
            >
              Talleres
            </h1>

            <p
              className={[
                "mt-4 text-white/85 max-w-2xl",
                "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "320ms" }}
            >
              <strong className="text-white">Descubre nuestros talleres.</strong>
              <br />
              Participa en experiencias formativas diseñadas para desarrollar
              habilidades estratégicas y generar impacto real en equipos y
              organizaciones.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO (copiado estilo Certificaciones) */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="columns-1 lg:columns-2 gap-8">
          {TALLERES.map((item, idx) => (
            <div key={item.href} className="mb-8 break-inside-avoid">
              <TallerHolder
                title={item.title}
                description={item.description}
                href={item.href}
                videoUrl={item.videoUrl}
                mainImage={item.mainImage}
                badgeTop={item.badgeTop}
                badgeBottom={item.badgeBottom}
                badge={item.badge}
                metaLeft={item.metaLeft}
                duration={item.duration}
                metaRight={item.metaRight}
                esquemaImage={item.esquemaImage}
                paraQuienImage={item.paraQuienImage}
                delay={idx * 120}
                mounted={mounted}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
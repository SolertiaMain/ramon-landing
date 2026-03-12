"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import CertificationHolder from "@/components/sections/CertificationHolder";

const CERTS = [
  {
    title:
      "Consultoras y Consultores en Prácticas de Igualdad Laboral y No Discriminación",
    description:
      "Formación orientada a comprender e implementar prácticas clave de la Norma Mexicana NMX-R-025-SCFI-2015, fortaleciendo capacidades de acompañamiento y mejora en centros de trabajo.",
    href: "/files/certificaciones/sabermas/CONSULTORASYCONSULTORESENPRACTICASDEIGUALDADLABORALYNODISCRIMINACIONI.pdf",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    mainImage: "/files/certificaciones/certificados/CONSULTORIAENPRACTICASDEIGUALDADLABORALYNODISCRIMINACION.jpeg",
    badgeTop: "/files/certificaciones/confianza/CERTIFICADOPORMAXAN.png",
    badgeBottom: "/files/certificaciones/confianza/AVALADOPORIMPULSOCOMPLETO.png",
    schemeImage: "/files/certificaciones/comofunciona/CONSULTORASYCONSULTORESENPRACTICASDEIGUALDADLABORALYNODISCRIMINACION.jpeg",
    fitImage: "/files/certificaciones/esparati/CONSULTORASYCONSULTORESENPRACTICASDEIGUALDADLABORALYNODISCRIMINACION.jpeg",
  },
  {
    title: "Consultoras y Consultores en Gestión basada en Resultados",
    description:
      "Enfoque para planear, dar seguimiento y evaluar programas y proyectos con orientación a resultados, monitoreo y evaluación, fortaleciendo la toma de decisiones y la rendición de cuentas.",
    href: "/files/certificaciones/sabermas/CONSULTORASYCONSULTORESENGESTIONYPRESUPUESTACIONBASADAENRESULTADOS.pdf",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    mainImage: "/files/certificaciones/certificados/GESTIONYPRESUPUESTACIONBASADAENRESULTADOS.jpeg",
    badgeTop: "/files/certificaciones/confianza/CERTIFICADOPORGOBERNOVA.png",
    badgeBottom: "/files/certificaciones/confianza/AVALADOPORIMPULSOCOMPLETO.png",
    schemeImage: "/files/certificaciones/comofunciona/CONSULTORASYCONSULTORESENGESTIONYPRESUPUESTACIONBASADAENRESULTADOS.jpeg",
    fitImage: "/files/certificaciones/esparati/GESTIONYPRESUPUESTACIONBASADAENRESULTADOS.jpeg",
  },
  {
    title:
      "Personas que Realizan la Implementación y Evaluación Corporativa en Prácticas de Igualdad Laboral y no Discriminación",
    description:
      "Acompañamiento para preparar y certificar al centro de trabajo en la Norma Mexicana NMX-R-025-SCFI-2015, con énfasis en requisitos, evidencia y procesos de auditoría.",
    href: "/files/certificaciones/sabermas/PERSONASQUEREALIZANLAIMPLEMENTACIONYEVALUACIONCORPORATIVA.pdf",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    mainImage: "/files/certificaciones/certificados/GESTIONYACREDITACIONCORPORATIVADEPRACTICASDEIGUALDADLABORALYNODISCRIMINACION.jpeg",
    badgeTop: "/files/certificaciones/confianza/CERTIFICADOPORMAXAN.png",
    badgeBottom: "/files/certificaciones/confianza/AVALADOPORIMPULSOCOMPLETO.png",
    schemeImage: "/files/certificaciones/comofunciona/PERSONASQUEREALIZANLAIMPLEMENTACIONYEVALUACIONCORPORATIVADEPRACTICASDEIGUALDADLABORALYNODISCRIMINACION.jpeg",
    fitImage: "/files/certificaciones/esparati/GESTIONYACREDITACIONCORPORATIVADEPRACTICASDEIGUALDADLABORALYNODISCRIMINACION.jpeg",
  },
  {
    title: "Certificación de Ombudsperson",
    description:
      "Certificación/curso especializado para fortalecer la atención imparcial de quejas y conflictos internos, promoviendo entornos laborales respetuosos y mecanismos institucionales de resolución.",
    href: "/files/certificaciones/sabermas/PARAPERSONASOMBUDSPERSON.pdf",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    mainImage: "/files/certificaciones/certificados/OMBUDSPERSON.jpeg",
    badgeTop: "/files/certificaciones/confianza/CERTIFICADOPORMAXAN.png",
    badgeBottom: "/files/certificaciones/confianza/AVALADOPORIMPULSOCOMPLETO.png",
    schemeImage: "/files/certificaciones/comofunciona/PERSONASOMBUDSPERSON.jpeg",
    fitImage: "/files/certificaciones/esparati/OMBUDSPERSON.jpeg",
  },
  {
  title:
    "Personas en Prácticas Institucionales de Gestión y Presupuestación Basada en Resultados",
 description:
    "Formación institucional para comprender y aplicar el enfoque de Gestión para Resultados y Presupuesto basado en Resultados, utilizando herramientas de planeación, monitoreo y evaluación para fortalecer la efectividad institucional.",
  href: "/files/certificaciones/sabermas/PERSONASENPRACTICASINSTITUCIONALESDEGESTIONYPRESUPUESTACIONBASADAENRESULTADOS.pdf",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  mainImage: "/files/certificaciones/certificados/PRACTICASINSTITUCIONALESDEGESTIONYPRESUPUESTACIONBASADAENRESULTADOS.jpeg",
  badgeTop: "/files/certificaciones/confianza/CERTIFICADOPORGOBERNOVA.png",
  badgeBottom: "/files/certificaciones/confianza/AVALADOPORIMPULSOCOMPLETO.png",
  schemeImage: "/files/certificaciones/comofunciona/PERSONASENPRACTICASINSTITUCIONALESDEGESTIONYPRESUPUESTACIONBASADAENRESULTADOS.jpeg",
  fitImage: "/files/certificaciones/esparati/PRACTICASINSTITUCIONALESDEGESTIONYPRESUPUESTACIONBASADAENRESULTADOS.jpeg",
},
{
  title:
    "Gestión Corporativa de Protocolo para Prevenir, Atender y Sancionar Actos de Violencia Laboral y Discriminación",
  description:
  "Certificación orientada a comprender y gestionar el Protocolo para prevenir, atender y sancionar la violencia laboral y la discriminación, promoviendo entornos seguros e incluyentes bajo un enfoque de derechos humanos.",
  href: "/files/certificaciones/sabermas/GESTIONCORPORATIVADELPROTOCOLOPARAPREVENIRATENDERYSANCIONARACTOSDEVIOLENCIALABORALYDISCRIMINACION.pdf",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
  mainImage: "/files/certificaciones/certificados/GESTIONCORPORATIVADELPROTOCOLOPARAPREVENIRATENDERYSANCIONARACTOSDEVIOLENCIALABORALYDISCRIMINACION.jpeg",
  badgeTop: "/files/certificaciones/confianza/CERTIFICADOPORMAXAN.png",
  badgeBottom: "/files/certificaciones/confianza/AVALADOPORIMPULSOCOMPLETO.png",
  schemeImage: "/files/certificaciones/comofunciona/GESTIONCORPORATIVADELPROTOCOLOPARAPREVENIRATENDERYSANCIONARACTOSDEVIOLENCIALABORALYDISCRIMINACION.jpeg",
  fitImage: "/files/certificaciones/esparati/GESTIONCORPORATIVADELPROTOCOLOPARAPREVENIRATENDERYSANCIONARACTOSDEVIOLENCIALABORALYDISCRIMINACION.jpeg",
},
];

//Smooth open + smooth close + click-outside closes reliably
function ModalShell({ open, title, children, onClose }) {
  const ANIM_MS = 320;

  const [isRendered, setIsRendered] = useState(open);
  const [isActive, setIsActive] = useState(false); // 

  useEffect(() => {
    if (open) {
      setIsRendered(true);
      return;
    }

    // exit animation
    setIsActive(false);
    const t = setTimeout(() => setIsRendered(false), ANIM_MS);
    return () => clearTimeout(t);
  }, [open]);

  useLayoutEffect(() => {
    if (!isRendered) return;

    // start from closed styles
    setIsActive(false);

    // next frame -> open styles
    const raf = requestAnimationFrame(() => {
      setIsActive(true);
    });

    return () => cancelAnimationFrame(raf);
  }, [isRendered]);

  // ESC closes
  useEffect(() => {
    if (!isRendered) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isRendered, onClose]);

  // lock scroll + prevent scrollbar jump
  useEffect(() => {
    if (!isRendered) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isRendered]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] ${isActive ? "pointer-events-auto" : "pointer-events-none"
        }`}
      aria-hidden={!isActive}
    >
      {/* overlay (click closes) */}
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-all duration-300 cursor-pointer ${isActive
          ? "bg-black/40 backdrop-blur-sm opacity-100"
          : "opacity-0"
          }`}
      />

      {/* wrapper (click outside closes) */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* panel */}
        <div
          className={`w-full max-w-5xl max-h-[85vh] sm:max-h-[88vh] rounded-2xl bg-white shadow-2xl border border-neutral-200 overflow-hidden transform transition-all duration-300 ${isActive
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-[0.985]"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-[72px] items-center justify-between gap-3 px-6 border-b border-neutral-200">
            <div className="min-w-0">
              <div className="text-xs text-neutral-500">Vista previa</div>
              <div className="text-base font-semibold text-neutral-900 truncate">
                {title}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 hover:bg-neutral-50 transition cursor-pointer"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* IMPORTANT:
              - supports normal JSX children
              - ALSO supports function-children (in case you still have one somewhere)
              - prevents "Functions are not valid as a React child"
          */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-72px)] sm:max-h-[calc(88vh-72px)]">
            {typeof children === "function" ? children({ active: isActive }) : children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificacionesPage() {
  const [mounted, setMounted] = useState(false);

  // 3 modales
  const [videoModal, setVideoModal] = useState({
    open: false,
    title: "",
    videoUrl: "",
  });
  const [schemeModal, setSchemeModal] = useState({
    open: false,
    title: "",
    schemeImage: "",
  });
  const [fitModal, setFitModal] = useState({
    open: false,
    title: "",
    fitImage: "",
  });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-stone-200">
      {/* HERO */}
      <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
        <img
          src="/images/certificaciones_ramon.jpg"
          alt="Certificaciones"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Certificaciones
            </h1>
            <p className="mt-4 text-white/85">
            <strong className="text-white">Descubre nuestras certificaciones.</strong>

               <br />
              Encuentra una explicación breve de cada una y haz clic en el botón
              para conocer más información.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CERTS.map((cert, idx) => (
            <CertificationHolder
              key={cert.title}
              title={cert.title}
              description={cert.description}
              href={cert.href}
              videoUrl={cert.videoUrl}
              schemeImage={cert.schemeImage}
              fitImage={cert.fitImage}
              mainImage={cert.mainImage}
              badgeTop={cert.badgeTop}
              badgeBottom={cert.badgeBottom}
              badge="Certificación"
              metaLeft="Programa profesional"
              metaRight="PDF"
              delay={idx * 120}
              mounted={mounted}
              onOpenVideo={({ title, videoUrl }) =>
                setVideoModal({ open: true, title, videoUrl })
              }
              onOpenScheme={({ title, schemeImage }) =>
                setSchemeModal({ open: true, title, schemeImage })
              }
              onOpenFit={({ title, fitImage }) =>
                setFitModal({ open: true, title, fitImage })
              }
            />
          ))}
        </div>
      </section>

      {/* MODAL: VIDEO */}
      <ModalShell
        open={videoModal.open}
        title={videoModal.title}
        onClose={() => setVideoModal((v) => ({ ...v, open: false }))}
      >
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 bg-black">
          <iframe
            key={videoModal.videoUrl}
            src={videoModal.videoUrl}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </ModalShell>

      {/* MODAL: CÓMO FUNCIONA (Esquema.jpeg) */}
      <ModalShell
        open={schemeModal.open}
        title={`${schemeModal.title} — ¿Cómo funciona?`}
        onClose={() => setSchemeModal((v) => ({ ...v, open: false }))}
      >
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <img
            src={schemeModal.schemeImage}
            alt="Esquema"
            className="w-full max-h-[70vh] object-contain"
          />
        </div>
      </ModalShell>

      {/* MODAL: ¿ES PARA TI? (Parati.jpeg) */}
      <ModalShell
        open={fitModal.open}
        title={`${fitModal.title} — ¿Es para ti?`}
        onClose={() => setFitModal((v) => ({ ...v, open: false }))}
      >
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <img
            src={fitModal.fitImage}
            alt="¿Es para ti?"
            className="w-full max-h-[70vh] object-contain"
          />
        </div>
      </ModalShell>
    </main>
  );
}
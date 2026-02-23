"use client";

import { useEffect, useState } from "react";
import CertificationHolder from "@/components/sections/CertificationHolder";

const SCHEME_IMAGE = "/files/certificaciones/shared/Esquema.jpeg";
const FIT_IMAGE = "/files/certificaciones/shared/Parati.jpeg";

const CERTS = [
  {
    title:
      "Consultoras y Consultores en Prácticas de Igualdad Laboral y No Discriminación",
    description:
      "Formación orientada a comprender e implementar prácticas clave de la Norma Mexicana NMX-R-025-SCFI-2015, fortaleciendo capacidades de acompañamiento y mejora en centros de trabajo.",
    href: "/files/certificaciones/CERTIFICACIÓNDECONSULTORASYCONSULTORESENPRÁCTICASDEIGUALDADLABORALYNODISCRIMINACIÓN.pdf",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    schemeImage: SCHEME_IMAGE,
    fitImage: FIT_IMAGE,
  },
  {
    title: "Consultoras y Consultores en Gestión basada en Resultados",
    description:
      "Enfoque para planear, dar seguimiento y evaluar programas y proyectos con orientación a resultados, monitoreo y evaluación, fortaleciendo la toma de decisiones y la rendición de cuentas.",
    href: "/files/certificaciones/CERTIFICACIÓNDECONSULTORASYCONSULTORESENGESTIÓNYPRESUPUESTACIÓNBASADAENRESULTADOS.pdf",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    schemeImage: SCHEME_IMAGE,
    fitImage: FIT_IMAGE,
  },
  {
    title:
      "Gestión y Acreditación Corporativa de Prácticas de Igualdad Laboral y No Discriminación",
    description:
      "Acompañamiento para preparar y certificar al centro de trabajo en la Norma Mexicana NMX-R-025-SCFI-2015, con énfasis en requisitos, evidencia y procesos de auditoría.",
    href: "/files/certificaciones/CERTIFICACIÓNDEPERSONASQUEREALIZANLAIMPLEMENTACIÓNYEVALUACIÓNCORPORATIVADEPRÁCTICASDEIGUALDADLABORALYNODISCRIMINACIÓN.pdf",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    schemeImage: SCHEME_IMAGE,
    fitImage: FIT_IMAGE,
  },
  {
    title: "Certificación de Ombudsperson",
    description:
      "Certificación/curso especializado para fortalecer la atención imparcial de quejas y conflictos internos, promoviendo entornos laborales respetuosos y mecanismos institucionales de resolución.",
    href: "/files/certificaciones/CERTIFICACIÓNPARAPERSONASOMBUDSPERSON.pdf",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    mainImage: "/images/certificaciones/certificado.png",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    schemeImage: SCHEME_IMAGE,
    fitImage: FIT_IMAGE,
  },
];

function ModalShell({ open, title, children, onClose }) {
  // ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[9999] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-all duration-300 ${
          open ? "bg-black/40 backdrop-blur-sm opacity-100" : "opacity-0"
        }`}
      />

      {/* panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-neutral-200 overflow-hidden transform transition-all duration-300 ${
            open
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-2 scale-[0.98]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-neutral-200">
            <div className="min-w-0">
              <div className="text-xs text-neutral-500">Vista previa</div>
              <div className="text-base font-semibold text-neutral-900 truncate">
                {title}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 hover:bg-neutral-50 transition"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="p-6">{children}</div>
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
              Descubre nuestras certificaciones. <br />
              Encuentra una explicación breve de cada una y haz clic en el botón
              para conocer más información.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
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
          {videoModal.open && (
            <iframe
              key={videoModal.videoUrl}
              src={videoModal.videoUrl}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>
        <div className="mt-4 text-xs text-neutral-500">
          Tip: presiona <span className="font-medium">ESC</span> para cerrar.
        </div>
      </ModalShell>

      {/* MODAL: CÓMO FUNCIONA (Esquema.jpeg) */}
      <ModalShell
        open={schemeModal.open}
        title={`${schemeModal.title} — Cómo funciona`}
        onClose={() => setSchemeModal((v) => ({ ...v, open: false }))}
      >
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {schemeModal.open && (
            <img
              src={schemeModal.schemeImage}
              alt="Esquema"
              className="w-full h-auto object-contain"
            />
          )}
        </div>
      </ModalShell>

      {/* MODAL: ¿ES PARA TI? (Parati.jpeg) */}
      <ModalShell
        open={fitModal.open}
        title={`${fitModal.title} — ¿Es para ti?`}
        onClose={() => setFitModal((v) => ({ ...v, open: false }))}
      >
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {fitModal.open && (
            <img
              src={fitModal.fitImage}
              alt="¿Es para ti?"
              className="w-full h-auto object-contain"
            />
          )}
        </div>
      </ModalShell>
    </main>
  );
}
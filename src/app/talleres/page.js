"use client";

import { useEffect, useLayoutEffect, useState } from "react"; 
import TallerHolder from "@/components/sections/TallerHolder";

const TALLERES = [
  {
    title: "Corresponsabilidad laboral, familiar y personal",
    description:
      "Taller corporativo para impulsar prácticas de corresponsabilidad y bienestar en el entorno laboral.",
    href: "/files/talleres/TALLER_CORRESPONSABILIDAD.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/talleres/TALLER_CORRESPONSABILIDAD.jpeg",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "3 horas",
    metaLeft: "Taller corporativo",
    badge: "Taller",
  },
  {
    title: "Prevenir la violencia laboral",
    description:
      "Taller corporativo para identificar, prevenir y atender conductas de violencia laboral en el centro de trabajo.",
    href: "/files/talleres/TALLER_VIOLENCIA_LABORAL.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/talleres/TALLER_VIOLENCIA_LABORAL.jpeg",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "6 horas",
    metaLeft: "Taller corporativo",
    badge: "Taller",
  },
  {
    title: "Calidad en mi trabajo y vida de calidad",
    description:
      "Conferencia para fortalecer hábitos, enfoque y bienestar: desempeño sostenible con calidad de vida.",
    href: "/files/talleres/CONFERENCIA_CALIDAD_VIDA.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/talleres/CONFERENCIA_CALIDAD_VIDA.jpeg",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "3 horas",
    metaLeft: "Conferencia corporativa",
    badge: "Conferencia", // ✅ FIX: pill says Conferencia
  },
  {
    title: "Alineamiento corporativo con NMX-R-025-SCFI-2015",
    description:
      "Taller para alinear procesos y cultura organizacional con prácticas de igualdad laboral y no discriminación.",
    href: "/files/talleres/TALLER_ALINEAMIENTO_NMX025.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/talleres/TALLER_ALINEAMIENTO_NMX025.jpeg",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "6 horas",
    metaLeft: "Taller corporativo",
    badge: "Taller",
  },
  {
    title: "Criterios técnicos para la igualdad salarial",
    description:
      "Taller para identificar brechas salariales y diseñar estrategias de corrección con criterios técnicos y normativos.",
    href: "/files/talleres/TALLER_IGUALDAD_SALARIAL.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/talleres/TALLER_IGUALDAD_SALARIAL.jpeg",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "6 horas",
    metaLeft: "Taller corporativo",
    badge: "Taller",
  },
  {
    title: "Gestión eficaz del Protocolo de violencia laboral",
    description:
      "Taller para implementar y operar protocolos internos de prevención, atención y sanción de violencia laboral.",
    href: "/files/talleres/TALLER_PROTOCOLO_VIOLENCIA.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/talleres/TALLER_PROTOCOLO_VIOLENCIA.jpeg",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "6 horas",
    metaLeft: "Taller corporativo",
    badge: "Taller",
  },
  {
    title: "Inducción a igualdad, no discriminación y atención de violencia",
    description:
      "Taller para sensibilizar, establecer criterios y promover prácticas de igualdad y no discriminación en equipos.",
    href: "/files/talleres/TALLER_INDUCCION_IGUALDAD.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/talleres/TALLER_INDUCCION_IGUALDAD.jpeg",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "3 horas",
    metaLeft: "Taller corporativo",
    badge: "Taller",
  },
  {
    title: "Planes de acción para igualdad laboral y no discriminación",
    description:
      "Taller para estructurar planes de acción medibles y sostenibles alineados a metas de igualdad laboral.",
    href: "/files/talleres/TALLER_PLAN_ACCION_IGUALDAD.pdf",
    videoUrl: "https://www.youtube.com/embed/N8yu8Xtf-VM",
    mainImage: "/images/talleres/TALLER_PLAN_ACCION_IGUALDAD.jpeg",
    badgeTop: "/images/certificaciones/certificado_por_maxan.png",
    badgeBottom: "/images/certificaciones/avalado_por_ramon.png",
    esquemaImage: "/images/talleres/esquema_TALLER.jpeg",
    paraQuienImage: "/images/talleres/paraquien_TALLER.jpeg",
    duration: "5 horas",
    metaLeft: "Taller corporativo",
    badge: "Taller",
  },
];

// ✅ Smooth open + smooth close + click-outside closes reliably
function ModalShell({ open, title, children, onClose }) {
  const ANIM_MS = 320;

  const [isRendered, setIsRendered] = useState(open);
  const [isActive, setIsActive] = useState(false); // IMPORTANT: start false so enter anim plays

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

export default function TalleresPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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
      {/* HERO */}
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
              <strong className="text-white">Descubre nuestros talleres.</strong>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TALLERES.map((item, idx) => (
            <div key={item.href}>
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
            </div>
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

      {/* MODAL: ESQUEMA */}
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

      {/* MODAL: PARA QUIÉN */}
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
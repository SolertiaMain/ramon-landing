"use client";

import Link from "next/link";

export default function CertificationHolder({
  title,
  description,
  href,
  videoUrl,

  // modales controlados por el padre
  onOpenVideo,
  onOpenScheme,
  onOpenFit,

  // assets extra
  schemeImage, // ruta a imagen (Esquema)
  fitImage, // ruta a imagen (Para ti)

  badge = "Certificación",
  metaLeft = "Programa profesional",
  metaRight = "PDF",
  delay = 0,
  mounted = true,

  mainImage,
  badgeTop,
  badgeBottom,
}) {
  // Botón: full width en mobile, ancho natural en desktop
  const baseBtn =
    "w-full md:w-auto inline-flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 bg-white transition will-change-transform";
  const hoverBtn =
    "hover:bg-neutral-50 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99]";
  const focusBtn =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* HEADER */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          {/* Imagen: mobile full width + proporción, desktop w-42 h-30 */}
          <div className="relative w-full aspect-[42/30] md:w-42 md:h-30 md:aspect-auto shrink-0">
            <div className="w-full h-full rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-white">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={`Imagen de ${title}`}
                  className="w-full h-full object-contain bg-white transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-neutral-100" />
              )}
            </div>

            {/* Badges: dentro en mobile, flotando en desktop */}
            {badgeTop && (
              <div className="absolute top-2 right-2 md:-top-2 md:-right-2 w-11 h-11 rounded-full overflow-hidden border border-white shadow-md bg-white">
                <img
                  src={badgeTop}
                  alt="Badge superior"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {badgeBottom && (
              <div className="absolute bottom-2 left-2 md:-bottom-2 md:-left-2 w-11 h-11 rounded-full overflow-hidden border border-white shadow-md bg-white">
                <img
                  src={badgeBottom}
                  alt="Badge inferior"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
              <span className="rounded-full border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-700">
                {badge}
              </span>
              <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white">
                {metaRight}
              </span>
            </div>

            <h2 className="mt-3 text-xl md:text-2xl font-semibold text-neutral-900 leading-tight">
              {title}
            </h2>

            <div className="mt-2 text-sm text-neutral-500">{metaLeft}</div>
          </div>
        </div>
      </div>

      <div className="mx-6 h-px bg-neutral-200" />

      {/* BODY */}
      <div className="p-6 pt-5">
        <p className="text-sm text-neutral-700 leading-relaxed">{description}</p>

        {/* ACTIONS: mobile stack (grid), desktop fila (flex) */}
        <div className="mt-6 grid grid-cols-1 gap-3 md:flex md:flex-wrap md:gap-3">
          {/* 1) Saber más */}
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseBtn} ${hoverBtn} ${focusBtn} group inline-flex items-center gap-2`}
          >
            Saber más
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-900 text-white text-xs transition-transform duration-200 group-hover:translate-x-[1px]">
              ↗
            </span>
          </Link>

          {/* 2) Ver video */}
          {videoUrl && (
            <button
              type="button"
              onClick={() => onOpenVideo?.({ title, videoUrl })}
              className={`${baseBtn} ${hoverBtn} ${focusBtn}`}
            >
              Ver video
            </button>
          )}

          {/* 3) Cómo funciona */}
          {schemeImage && (
            <button
              type="button"
              onClick={() => onOpenScheme?.({ title, schemeImage })}
              className={`${baseBtn} ${hoverBtn} ${focusBtn}`}
            >
              Cómo funciona
            </button>
          )}

          {/* 4) ¿Es para ti? */}
          {fitImage && (
            <button
              type="button"
              onClick={() => onOpenFit?.({ title, fitImage })}
              className={`${baseBtn} ${hoverBtn} ${focusBtn}`}
            >
              ¿Es para ti?
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
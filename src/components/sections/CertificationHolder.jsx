"use client";

import Link from "next/link";

export default function CertificationHolder({
  title,
  description,
  href,
  videoUrl,
  mainImage,
  badgeTop,
  badgeBottom,

  badge = "Certificación",
  metaLeft = "Programa profesional",
  metaRight = "PDF",

  // assets extra (modales)
  schemeImage = "",
  fitImage = "",

  delay = 0,
  mounted = true,

  // modales controlados por el padre
  onOpenVideo,
  onOpenScheme,
  onOpenFit,
}) {
  const hasVideo = typeof videoUrl === "string" && videoUrl.trim().length > 0;

  const baseBtn =
    "w-full md:w-auto inline-flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 bg-white transition will-change-transform cursor-pointer";
  const hoverBtn =
    "hover:bg-neutral-50 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99]";
  const focusBtn =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  return (
    <div
      className={`transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 p-6">
          {/* Image */}
          <div className="relative w-full sm:w-[17rem] h-[11.25rem] sm:shrink-0">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-white">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={badge}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-neutral-100" />
              )}
            </div>

            {badgeTop ? (
              <div className="absolute -top-2 -right-2 w-15 h-15 rounded-full overflow-hidden border border-white shadow-md bg-white">
                <img
                  src={badgeTop}
                  alt="Badge"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}

            {badgeBottom ? (
              <div className="absolute -bottom-2 -left-2 w-15 h-15 rounded-full overflow-hidden border border-white shadow-md bg-white">
                <img
                  src={badgeBottom}
                  alt="Badge"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>

          <div className="flex-1 min-w-0 text-center md:text-left">
            {/* Pills */}
            <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
              <span className="rounded-full border px-2.5 py-1 text-xs font-medium text-neutral-700">
                {badge}
              </span>

              <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white">
                {metaRight}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-neutral-900 break-words">
              {title}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-2 justify-center md:justify-start text-xs text-neutral-500">
              {metaLeft ? (
                <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1">
                  {metaLeft}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-neutral-200" />

        {/* BODY */}
        <div className="p-6 pt-5">
          <p className="text-sm text-neutral-700 leading-relaxed">{description}</p>

          {/* ACTIONS — ORDER FIXED (igual que TallerHolder) */}
          <div className="mt-6 grid grid-cols-1 gap-3 md:flex md:flex-wrap md:gap-3 md:justify-center">
            {/* 1) ¿Es para ti? */}
            <button
              type="button"
              onClick={() => onOpenFit?.({ title, fitImage })}
              className={`${baseBtn} ${hoverBtn} ${focusBtn}`}
            >
              ¿Es para ti?
            </button>

            {/* 2) Cómo funciona */}
            <button
              type="button"
              onClick={() => onOpenScheme?.({ title, schemeImage })}
              className={`${baseBtn} ${hoverBtn} ${focusBtn}`}
            >
              Cómo funciona
            </button>

            {/* 3) Ver video */}
            {hasVideo && (
              <button
                type="button"
                onClick={() => onOpenVideo?.({ title, videoUrl: videoUrl.trim() })}
                className={`${baseBtn} ${hoverBtn} ${focusBtn}`}
              >
                Ver video
              </button>
            )}

            {/* 4) Saber más */}
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
          </div>
        </div>
      </article>
    </div>
  );
}
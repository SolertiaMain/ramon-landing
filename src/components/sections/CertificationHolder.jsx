"use client";

import { useState } from "react";
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
  metaRight = "PDF",
  delay = 0,
  mounted = true,
}) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* HEADER */}
      <div className="flex items-start gap-4 p-6">

        {/* Icon */}
        <div className="relative w-68 h-45 shrink-0">

        {/* Imagen principal */}
        <div className="w-full h-full rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-white">
            <img
            src={mainImage}
            alt="Certificación"
            className="w-full h-full object-cover"
            />
        </div>

        {/* Badge arriba derecha */}
        <div className="absolute -top-2 -right-2 w-15 h-15 rounded-full overflow-hidden border border-white shadow-md bg-white">
            <img
            src={badgeTop}
            alt="Badge"
            className="w-full h-full object-cover"
            />
        </div>

        {/* Badge abajo izquierda */}
        <div className="absolute -bottom-2 -left-2 w-15 h-15 rounded-full overflow-hidden border border-white shadow-md bg-white">
            <img
            src={badgeBottom}
            alt="Badge"
            className="w-full h-full object-cover"
            />
        </div>

        </div>

        <div className="flex-1">
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border px-2.5 py-1 text-xs font-medium text-neutral-700">
              {badge}
            </span>

            <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white">
              {metaRight}
            </span>
          </div>

          {/* Title */}
          <h2 className="mt-3 text-lg font-semibold text-neutral-900">
            {title}
          </h2>

          {/* Meta */}
          <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500">
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-neutral-200" />

      {/* BODY */}
      <div className="p-6 pt-5">
        <p className="text-sm text-neutral-700 leading-relaxed">
          {description}
        </p>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-wrap gap-3">

          {/* VIDEO BUTTON */}
          {videoUrl && (
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition"
            >
              {open ? "Ocultar video" : "Ver video"}
            </button>
          )}

          {/* PDF BUTTON (SABER MÁS) */}
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition"
          >
            Saber más
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-neutral-900 text-white text-xs">
              ↗
            </span>
          </Link>

        </div>

        {/* VIDEO EXPANDIBLE */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            open ? "grid-rows-[1fr] mt-6" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            {videoUrl && (
              <div className="aspect-video w-full rounded-xl overflow-hidden border mt-4">
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

      </div>
    </article>
  );
}
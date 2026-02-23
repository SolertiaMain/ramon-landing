"use client";

import { useEffect, useRef, useState } from "react"; 
import Link from "next/link";


export default function TallerHolder({
    title,
    description,
    href,
    videoUrl,
    mainImage,
    badgeTop,
    badgeBottom,
    badge = "Taller",
    metaLeft = "",
    duration = "",
    metaRight = "PDF",
    esquemaImage = "",
    paraQuienImage = "",
    delay = 0,
    mounted = true,
}) {
    const [openPanel, setOpenPanel] = useState(null); // "video" | "esquema" | "paraquien" | null
    const hasVideo = typeof videoUrl === "string" && videoUrl.trim().length > 0;

    const togglePanel = (name) => {
        setOpenPanel((prev) => (prev === name ? null : name));
    };

    const FADE_MS = 180;
    const [shownPanel, setShownPanel] = useState(null);
    const [panelVisible, setPanelVisible] = useState(false);

    const panelRef = useRef(null);
    const [panelHeight, setPanelHeight] = useState(0);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const measure = () => {
            const node = panelRef.current;
            setPanelHeight(node ? node.scrollHeight : 0);
        };

        // CLOSE
        if (!openPanel) {
            setPanelVisible(false);
            setIsClosing(true);

            // keep current height, then animate to 0
            requestAnimationFrame(() => {
                measure();
                requestAnimationFrame(() => setPanelHeight(0));
            });

            const t = setTimeout(() => {
                setShownPanel(null);
                setIsClosing(false);
            }, 500);

            return () => clearTimeout(t);
        }

        // OPEN from closed
        if (!shownPanel) {
            setShownPanel(openPanel);
            setPanelVisible(true);

            // start at 0, then expand to measured
            requestAnimationFrame(() => {
                measure();
            });

            return;
        }

        // SWITCH (crossfade)
        // 1) fade out current content
        setPanelVisible(false);

        const t1 = setTimeout(() => {
            // 2) swap content
            setShownPanel(openPanel);

            // 3) measure new content + animate height
            requestAnimationFrame(() => {
                measure();
                // 4) fade in new content
                requestAnimationFrame(() => setPanelVisible(true));
            });
        }, FADE_MS);

        return () => clearTimeout(t1);
    }, [openPanel, shownPanel]);

    return (
        <article
            className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row items-start gap-4 p-6">

                {/* Icon */}
                <div className="relative w-full sm:w-[17rem] h-[11.25rem] sm:shrink-0">

                    {/* Imagen principal */}
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-white">
                        <img
                            src={mainImage}
                            alt="Taller"
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

                <div className="flex-1 min-w-0">
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
                    <h2 className="mt-3 text-lg font-semibold text-neutral-900 break-words">
                        {title}
                    </h2>

                    {/* Meta (taller vibe) */}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                        {metaLeft ? (
                            <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1">
                                {metaLeft}
                            </span>
                        ) : null}

                        {duration ? (
                            <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1">
                                Duración: {duration}
                            </span>
                        ) : null}
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
                    {hasVideo && (
                        <button
                            type="button"
                            onClick={() => togglePanel("video")}
                            className={[
                                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition cursor-pointer",
                                openPanel === "video"
                                    ? "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-900"
                                    : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
                            ].join(" ")}
                        >
                            {openPanel === "video" ? "Ocultar" : "Video"}
                        </button>
                    )}

                    {/* ESQUEMA BUTTON */}
                    <button
                        type="button"
                        onClick={() => togglePanel("esquema")}
                        className={[
                            "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition cursor-pointer",
                            openPanel === "esquema"
                                ? "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-900"
                                : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
                        ].join(" ")}
                    >
                        {openPanel === "esquema" ? "Ocultar" : "Esquema"}
                    </button>

                    {/* PARA QUIÉN BUTTON */}
                    <button
                        type="button"
                        onClick={() => togglePanel("paraquien")}
                        className={[
                            "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition cursor-pointer",
                            openPanel === "paraquien"
                                ? "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-900"
                                : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
                        ].join(" ")}
                    >
                        {openPanel === "paraquien" ? "Ocultar" : "Para quién"}
                    </button>

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

                {/* EXPANDABLE PANELS */}
                <div
                    className="transition-[height] duration-400 ease-in-out"
                    style={{
                        height: openPanel || isClosing ? `${panelHeight}px` : "0px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        className="transition-opacity duration-300 ease-in-out"
                        style={{ opacity: panelVisible ? 1 : 0 }}
                    >
                        <div ref={panelRef} className="pt-6">
                            {/* VIDEO PANEL */}
                            {shownPanel === "video" && hasVideo ? (
                                <div className="aspect-video w-full rounded-xl overflow-hidden border border-neutral-200 bg-black/5">
                                    <iframe
                                        src={videoUrl.trim()}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                </div>
                            ) : null}

                            {/* ESQUEMA PANEL */}
                            {shownPanel === "esquema" ? (
                                <div className="rounded-xl border border-neutral-200 bg-white p-4">

                                    <div className="mx-auto w-full max-w-[720px] rounded-xl overflow-hidden">
                                        <img
                                            src={esquemaImage}
                                            alt="Esquema del taller"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>
                            ) : null}
                            
                            {/* PARA QUIEN PANEL */}
                            {shownPanel === "paraquien" ? (
                                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                                    <div className="mx-auto w-full max-w-[720px] rounded-xl overflow-hidden">
                                        <img
                                            src={paraQuienImage}
                                            alt="Perfil de participantes"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

            </div>
        </article>
    );
}
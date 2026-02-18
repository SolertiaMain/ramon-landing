/**
 * HeaderSearchOverlay
 *
 * UI-only component rendered via portal.
 *
 * Responsibilities:
 * - Renders search panel and backdrop
 * - Displays input, popular searches, and dynamic results
 * - Handles user interactions (click, submit)
 * - Opens PDFs or routes internally
 *
 * Does NOT perform search logic or data filtering.
 */

"use client";

import Link from "next/link";
import { createPortal } from "react-dom";

export default function HeaderSearchOverlay({
    open,
    shouldRender,
    query,
    setQuery,
    results,
    onClose,
    onSubmit,
}) {
    if (!shouldRender) return null;

    return createPortal(
        <div
            className={`
        fixed inset-0 z-[999]
        ${open ? "pointer-events-auto" : "pointer-events-none"}
      `}
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`
                    absolute inset-0 bg-black/40
                    transition-opacity duration-300
                    ${open ? "opacity-100" : "opacity-0"}
                `}
            />

            {/* Sliding panel */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    fixed right-0 top-0 w-full
                    h-[32vh] min-h-[260px] max-h-[420px]
                    bg-white rounded-b-lg shadow-xl overflow-hidden
                    transition-transform duration-325 ease-out
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >
                <div className="h-full px-4 md:px-6 flex flex-col">
                    {/* Row: search + X */}
                    <div className="relative h-16 flex items-center">
                        <div className="mx-auto w-full max-w-[1058px]">
                            <div className="flex items-center gap-3">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        onSubmit();
                                    }}
                                    className="flex items-center h-11 rounded-full border bg-neutral-50 pr-3 w-full"
                                >
                                    {/* Search icon (submit) */}
                                    <button
                                        type="submit"
                                        aria-label="Buscar"
                                        className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
                                            <path
                                                d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>

                                    <input
                                        autoFocus={open}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        type="text"
                                        placeholder="Buscar…"
                                        className="min-w-0 w-full bg-transparent text-sm outline-none pl-2"
                                    />
                                </form>

                                {/* X */}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Cerrar búsqueda"
                                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors cursor-pointer shrink-0"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
                                        <path
                                            d="M6 6l12 12M18 6L6 18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Popular searches */}
                    <div className="mx-auto w-full max-w-[1058px]">
                        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3">
                            Búsquedas populares
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "Certificaciones", href: "/certifications" },
                                { label: "Talleres", href: "/talleres" },
                                { label: "Podcast", href: "/podcast" },
                                { label: "Blog", href: "/blog" },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-sm font-semibold transition cursor-pointer inline-block"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Results: ONLY show once user types */}
                    {query.trim().length > 0 && (
                        <div className="mx-auto w-full max-w-[1058px] mt-5 flex-1 min-h-0 overflow-y-auto pb-6">
                            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3">
                                Resultados
                            </p>

                            {results.length === 0 ? (
                                <div className="text-sm text-neutral-500">
                                    No encontramos resultados para{" "}
                                    <span className="font-semibold">“{query}”</span>.
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                        {results.map((r) => {
                                            const isPdf = (r.href || "").toLowerCase().endsWith(".pdf");

                                            const commonProps = {
                                                onClick: onClose,
                                                className:
                                                    "rounded-lg border bg-white px-3 py-2 text-sm hover:bg-neutral-50 hover:border-neutral-300 transition",
                                            };


                                            const content = (
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-neutral-800 max-w-[22ch] truncate">
                                                        {r.title}
                                                    </span>
                                                    <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                                                        {r.type}
                                                    </span>
                                                </div>
                                            );

                                            return isPdf ? (
                                                <a
                                                    key={r.id ?? r.href}
                                                    href={r.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    {...commonProps}
                                                >
                                                    {content}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={r.id ?? r.href}
                                                    href={r.href}
                                                    {...commonProps}
                                                >
                                                    {content}
                                                </Link>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

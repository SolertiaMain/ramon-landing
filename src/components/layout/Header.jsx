/**
 * Header Layout Component
 *
 * Responsibilities:
 * - Renders main navigation
 * - Controls search overlay open/close state
 * - Handles animation timing and body scroll locking
 * - Delegates search UI to HeaderSearchOverlay
 * - Delegates search logic to useHeaderSearch hook
 *
 * Does NOT contain search filtering logic or search data.
 */

"use client";

import { useEffect, useState, useRef } from "react";
import Container from "./Container";
import Link from "next/link";
import { site } from "@/content/site";

import HeaderSearchOverlay from "./header/HeaderSearchOverlay";
import { useHeaderSearch } from "./header/useHeaderSearch";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shouldRenderSearch, setShouldRenderSearch] = useState(false);

  // search engine (logic lives in the hook now)
  const { query, setQuery, results, runSearch, reset } = useHeaderSearch(searchOpen);

  const centerRef = useRef(null);
  const searchBtnRef = useRef(null);

  const nav = site.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  // keep overlay mounted long enough for exit animation
  useEffect(() => {
    if (!searchOpen && shouldRenderSearch) {
      const t = setTimeout(() => setShouldRenderSearch(false), 325);
      return () => clearTimeout(t);
    }
  }, [searchOpen, shouldRenderSearch]);

  // lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const openSearch = () => {
    setShouldRenderSearch(true);
    requestAnimationFrame(() => setSearchOpen(true));
  };

  const closeSearch = () => {
    setSearchOpen(false);
    reset();
  };

  return (
    <header
      className={`sticky top-0 z-50 transition border-b border-neutral-300 ${scrolled ? "bg-[#f4efe8]/90 backdrop-blur" : "bg-[#f4efe8]"
        }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/#top" className="font-semibold tracking-tight">
          Ramón C. Martínez
        </Link>

        <div
          ref={centerRef}
          className="hidden md:flex flex-1 h-16 items-center justify-center relative"
        >
          {/* NAV (visible when closed) */}
          <nav
            className={`
              flex h-16 items-stretch justify-center pr-10
              text-xs font-semibold tracking-widest uppercase
              transition-all duration-300 ease-out
              ${searchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
            `}
          >
            {[
              { label: "Certificaciones", href: "/certifications" },
              { label: "Talleres", href: "/talleres" },
              { label: "Podcast", href: "/podcast" },
              { label: "Blog", href: "/blog" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  group relative flex items-center h-full px-6
                  transition-colors duration-300 ease-out
                  hover:bg-black/10
                "
              >
                <span
                  className="
                    absolute top-0 left-0 h-[3px] w-full
                    bg-black opacity-0 transition-opacity duration-300 ease-out
                    group-hover:opacity-100
                  "
                />
                <span className="text-neutral-600 transition-colors duration-300 ease-out group-hover:text-black">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Search icon */}
          <button
            ref={searchBtnRef}
            type="button"
            aria-label="Buscar"
            aria-hidden={searchOpen}
            tabIndex={searchOpen ? -1 : 0}
            onClick={openSearch}
            className={`
              absolute right-0 top-1/2 -translate-y-1/2
              h-9 w-9
              inline-flex items-center justify-center
              rounded-full hover:bg-black/5 cursor-pointer
              ${searchOpen ? "opacity-0 pointer-events-none" : "opacity-100 transition"}
            `}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-80"
            >
              <path
                d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <button
          className="md:hidden rounded-md border px-3 py-2 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          Menú
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={[
          "md:hidden overflow-hidden border-t bg-white transition-all",
          open
            ? "max-h-96 opacity-100 duration-775 ease-out"
            : "max-h-0 opacity-0 duration-325 ease-linear",
        ].join(" ")}
      >
        <div
          className={[
            "transition-transform",
            open
              ? "translate-y-0 duration-400 ease-out"
              : "-translate-y-0.5 duration-150 ease-linear",
          ].join(" ")}
        >
          <Container className="py-4 flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </Container>
        </div>
      </div>

      {/* Overlay search (extracted) */}
      <HeaderSearchOverlay
        open={searchOpen}
        shouldRender={shouldRenderSearch}
        query={query}
        setQuery={setQuery}
        results={results}
        onClose={closeSearch}
        onSubmit={() => runSearch(query)}
      />
    </header>
  );
}

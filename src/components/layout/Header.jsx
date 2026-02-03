"use client";

import { useEffect, useState } from "react";
import Container from "./Container";

export default function Header({ nav, cta }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition ${scrolled ? "bg-white/80 backdrop-blur border-b" : "bg-transparent"}`}>
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">
          Ramon
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:opacity-70">
              {item.label}
            </a>
          ))}
          <a href={cta.href} className="rounded-md bg-black px-4 py-2 text-white text-sm hover:opacity-90">
            {cta.label}
          </a>
        </nav>

        <button
          className="md:hidden rounded-md border px-3 py-2 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          Menú
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t bg-white">
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
            <a
              href={cta.href}
              className="mt-2 inline-flex justify-center rounded-md bg-black px-4 py-2 text-white"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}

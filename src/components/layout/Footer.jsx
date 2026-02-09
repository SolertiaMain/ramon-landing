"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { site } from "../../content/site";
import SocialLinks from "./SocialLinks";
import { FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Para marcar "activo" en navegación cuando usas hashes (#...)
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const readHash = () => setActiveHash(window.location.hash || "");
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  const currentYear = new Date().getFullYear();

  // Color hover elegante (más “corporativo” que blanco puro)
  const hoverText = "text-stone-100";

  return (
    <footer
      ref={ref}
      className={`bg-neutral-900 text-white transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Marca */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              {site.hero.name}
            </h3>
            <p className="mt-2 text-sm text-stone-300">{site.hero.tagline}</p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>

            <ul className="space-y-2 text-sm">
              {site.nav.map((item) => {
                const isActive = activeHash === item.href;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "group relative inline-flex items-center",

                        // Color base (SIEMPRE gris)
                        "text-stone-400",

                        // Animación
                        "transition-all duration-200 ease-out",

                        // Hover / focus (temporal)
                        "hover:text-stone-100",
                        "focus-visible:text-stone-100",

                        // Accesibilidad
                        "focus-visible:outline-none",
                        "focus-visible:ring-2 focus-visible:ring-white/20",
                        "focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900",

                        // Active
                        "active:scale-[0.99]",
                      ].join(" ")}
                    >

                      {/* Indicador activo/hover (barra sutil a la izquierda) */}
                      <span
                        className={[
                          "mr-3 h-4 w-[2px] rounded-full",
                          "bg-white/0 transition-all duration-200 ease-out",
                          "group-hover:bg-white/60",
                          "group-focus-visible:bg-white/60",
                          isActive ? "bg-white/60" : "",
                        ].join(" ")}
                        aria-hidden="true"
                      />

                      <span className="transition-transform duration-200 ease-out group-hover:-translate-y-[1px] group-focus-visible:-translate-y-[1px]">
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>

            <ul className="space-y-2 text-sm">
              <li>
                {/* group => ícono + texto sincronizados */}
                <a
                  href="mailto:informes@ramoncuevas.com"
                  className={[
                    "group inline-flex items-center gap-2",

                    // Color base (NO cambia hasta hover)
                    "text-stone-400",

                    // Animación
                    "transition-all duration-200 ease-out",

                    // Hover / focus
                    "hover:text-stone-100",
                    "focus-visible:text-stone-100",

                    // Accesibilidad
                    "focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-white/20",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900",

                    // Active
                    "active:scale-[0.99]",
                  ].join(" ")}
                >
                  <FaEnvelope
                    className={[
                      "text-stone-400 text-base translate-x-[1px]",
                      "transition-all duration-200 ease-out",
                      "group-hover:text-stone-100",
                      "group-focus-visible:text-stone-100",
                      "group-hover:-translate-y-[1px]",
                      "group-focus-visible:-translate-y-[1px]",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  <span className="transition-transform duration-200 ease-out group-hover:-translate-y-[1px] group-focus-visible:-translate-y-[1px]">
                    informes@ramoncuevas.com
                  </span>
                </a>

              </li>

              <li className="pt-2">
                <SocialLinks />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-stone-500">
          © {currentYear} {site.hero.name}. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}

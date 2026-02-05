"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { site } from "../../content/site";
import SocialLinks from "./SocialLinks";
import { FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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

  const currentYear = new Date().getFullYear();

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

            <p className="mt-2 text-sm text-stone-300">
              {site.hero.tagline}
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>

            <ul className="space-y-2 text-sm text-stone-300">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>

            <ul className="space-y-2 text-sm text-stone-300">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-stone-400 text-base translate-x-[1px]" />
                <a
                  href="mailto:informes@ramoncuevas.com"
                  className="underline underline-offset-4 hover:text-white transition-colors"
                >
                  informes@ramoncuevas.com
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

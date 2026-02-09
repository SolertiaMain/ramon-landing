"use client";

import { FaLinkedin } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <a
        href="https://www.linkedin.com/in/ramón-cuevas-martínez-94a216a3/"
        target="_blank"
        rel="noopener noreferrer"
        className={[
          // Contenedor
          "group inline-flex items-center gap-2",

          // Color base
          "text-stone-300",

          // Transición general
          "transition-all duration-200 ease-out",

          // Hover / focus (texto + ícono)
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
        {/* Ícono */}
        <FaLinkedin
          className={[
            "text-xl text-stone-400",

            // Transición ícono
            "transition-all duration-200 ease-out",

            // Sync hover/focus
            "group-hover:text-stone-100",
            "group-focus-visible:text-stone-100",

            // Micro-movimiento elegante
            "group-hover:-translate-y-[1px]",
            "group-focus-visible:-translate-y-[1px]",
          ].join(" ")}
          aria-hidden="true"
        />

        {/* Texto */}
        <span
          className={[
            "transition-all duration-200 ease-out",

            // Micro-movimiento
            "group-hover:-translate-y-[1px]",
            "group-focus-visible:-translate-y-[1px]",
          ].join(" ")}
        >
          Ramón Cuevas Martínez
        </span>
      </a>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { SiSpotify, SiAmazonmusic } from "react-icons/si";

const PODCAST_PLATFORMS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/23OK9hZIRls8TqDWy5GD50?si=270ac8be568b46eb&nd=1&dlsi=54014ce4529b4b42",
    Icon: SiSpotify,
  },
  {
    label: "Amazon Music",
    href: "https://music.amazon.com.mx/podcasts/f94a74c9-0d07-48c0-8bc9-2d91d75da7a0/podcast-ramon",
    Icon: SiAmazonmusic,
  },
];

export default function PodcastPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imgOffset = Math.min(scrollY * 0.18, 95);
  const gradOffset = Math.min(scrollY * 0.3, 140);
  const darkAlpha = Math.min(0.65, 0.35 + scrollY / 1400);

  return (
    <main className="min-h-screen bg-stone-200">
      {/* HERO */}
      <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <img
          src="/images/podcast/podcast_ramon.jpg"
          alt="Podcast"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            transform: `translateY(${imgOffset}px) ${
              mounted ? "scale(1.00)" : "scale(1)"
            }`,
            transition: "transform 1600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${darkAlpha})` }}
        />

        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translateY(${gradOffset}px)`,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.25), rgba(0,0,0,0.00))",
          }}
        />

        {/* CONTENIDO HERO + ICONOS */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end justify-between gap-6 px-6 pb-14">
          <div className="max-w-3xl">
            <h1
              className={[
                "text-4xl md:text-6xl font-semibold tracking-tight text-white",
                "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "140ms" }}
            >
              Podcast
            </h1>

            <p
              className={[
                "mt-4 text-white/85 max-w-2xl",
                "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "320ms" }}
            >
              <strong className="text-white">Descubre nuestro podcast.</strong>
              <br />
             Encuentra episodios con ideas aplicables sobre trabajo, liderazgo y hábitos.
            </p>
          </div>

          {/* ICONOS HERO (Spotify + Amazon) */}
          <div
            className={[
              "ml-auto flex items-center gap-3",
              "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: "420ms" }}
          >
            {PODCAST_PLATFORMS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/25 text-white backdrop-blur hover:bg-white/20 transition-colors"
              >
                <Icon className="h-7 w-7" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN TIPO FULLFOCUS (PRIMER BLOQUE DESPUÉS DEL HERO) */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div
          className={[
            "bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden",
            "transition-all duration-700 ease-out",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          {/* Flex: en laptop (sm+) es fila -> imagen izq / texto der */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            {/* IZQUIERDA: Imagen */}
            <div className="p-7 md:p-10 sm:w-[420px] shrink-0">
              <div className="relative h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden rounded-2xl">
                <img
                  src="/images/podcast/podcast_image.jpeg"
                  alt="Podcast Ramón"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* DERECHA: Texto */}
            <div className="p-7 md:p-10 sm:pl-0">
              <p className="text-xs font-medium tracking-wider uppercase text-neutral-500">
                Podcast Ramón
              </p>

              <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
                Escúchalo en tu plataforma favorita
              </h2>

              <p className="mt-4 max-w-2xl text-sm md:text-base text-neutral-700 leading-relaxed">
                Bienvenidas y bienvenidos a mi podcast, donde en cada episodio
                reflexiono sobre diferentes temas que afectan nuestro desempeño
                laboral o condicionan nuestra vida personal y familiar.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {PODCAST_PLATFORMS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    Escuchar en {label}
                  </a>
                ))}
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                Se abrirá en una nueva pestaña.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
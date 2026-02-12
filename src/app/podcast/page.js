"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PODCAST_ITEMS = [
  {
    title: "Episodio 01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
  },
  {
    title: "Episodio 02",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
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
          src="/images/podcast_ramon.jpg"
          alt="Podcast"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            transform: `translateY(${imgOffset}px) ${
              mounted ? "scale(1.05)" : "scale(1)"
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

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-14">
          <div className="max-w-3xl">
            <h1
              className={[
                "text-4xl md:text-6xl font-semibold tracking-tight text-white",
                "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "140ms" }}
            >
              Podcast
            </h1>

            <p
              className={[
                "mt-4 text-white/85 max-w-2xl",
                "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: "320ms" }}
            >
              <strong className="text-white">Escucha nuestro podcast.</strong>
              <br />
              Bienvenidas y bienvenidos a mi podcast, donde en cada episodio
              reflexiono sobre diferentes temas que afectan nuestro desempeño
              laboral o condicionan nuestra vida personal y familiar.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {PODCAST_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className={[
                "bg-white rounded-2xl shadow-sm border border-black/5",
                "p-6 flex flex-col min-h-[240px]",
                "transition-all duration-700 ease-out",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <h2 className="text-lg font-semibold text-neutral-900">
                {item.title}
              </h2>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-auto pt-6">
                <Link
                  href={item.href}
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  Escuchar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

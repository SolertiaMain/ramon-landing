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

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-stone-200">
      {/* HERO */}
      <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <img
          src="/images/podcast.jpg"
          alt="Podcast"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative mx-auto max-w-7xl px-6 h-full flex items-end pb-14">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold text-white">
              Podcast
            </h1>
            <p className="mt-4 text-white/85">
              <strong className="text-white">Escucha nuestro podcast.</strong>
              <br />
              Explora conversaciones sobre liderazgo, estrategia y desarrollo
              profesional a través de ideas prácticas y perspectivas actuales.
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
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3",
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

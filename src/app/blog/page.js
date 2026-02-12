"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BLOG_ITEMS = [
  {
    title: "Artículo 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
  },
  {
    title: "Artículo 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
  },
];

export default function BlogPage() {
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
          src="/images/blog_ramon.jpg"
          alt="Blog"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto max-w-7xl px-6 h-full flex items-end pb-14">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold text-white">
              Blog
            </h1>
            <p className="mt-4 text-white/85">
              <strong className="text-white">Explora nuestro blog.</strong>
              <br />
              Encuentra análisis, herramientas y reflexiones orientadas al
              crecimiento profesional y al fortalecimiento del liderazgo.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {BLOG_ITEMS.map((item, idx) => (
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
                  Leer más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

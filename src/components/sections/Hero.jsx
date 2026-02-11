"use client";

import { useEffect, useState } from "react";
import Container from "../layout/Container";
import Image from "next/image";
import { heroFont } from "@/app/layout";

export default function Hero({ data }) {
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

  const imgOffset = Math.min(scrollY * 0.18, 110);
  const gradOffset = Math.min(scrollY * 0.30, 160);
  const darkAlpha = Math.min(0.62, 0.30 + scrollY / 1200);

  return (
    <section id="top" className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${imgOffset}px) ${mounted ? "scale(1.05)" : "scale(1)"}`,
          transition: "transform 1600ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <Image
          src="/images/ramon.jpg"
          alt="Ramón Cuevas Martínez"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${darkAlpha})` }}
      />

      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${gradOffset}px)`,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.22), rgba(0,0,0,0.00))",
        }}
      />

      <Container className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="w-full flex flex-col items-center">


          <h1
            className={[
              heroFont.className,
              "text-2xl sm:text-3xl font-normal tracking-[0.25em] text-white/70",
              "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "120ms" }}
          >
            - Ramón Cuevas Martínez -
          </h1>

          <div
            className={[
              heroFont.className,
              "mt-8 sm:mt-10",
              "text-white uppercase font-semibold",
              "tracking-tight whitespace-nowrap",
              "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{
              transitionDelay: "300ms",
              fontSize: "clamp(2.8rem, 6vw, 6.5rem)",
            }}
          >
            IMPULSO COMPLETO
          </div>

          <div
            className={[
              "mt-16",
              "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "500ms" }}
          >
            <a
              href={data.cta.href}
              className="inline-flex rounded-md bg-white px-6 py-3 text-black font-medium hover:opacity-90 transition-opacity"
            >
              {data.cta.label}
            </a>
          </div>

        </div>
      </Container>


    </section>
  );
}

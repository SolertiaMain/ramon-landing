"use client";

import { useEffect, useRef, useState } from "react";
import Container from "../layout/Container";
import { libreBaskerville } from "@/app/layout";
import { signatureFont } from "@/app/layout";


export default function Letter({ data }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="carta" ref={ref} className="scroll-mt-24">
      {/* BLOQUE FULL WIDTH: título + carta */}
      <div
        className={`
          w-full bg-stone-200 py-24
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      >
        <Container className="flex flex-col items-center">
          {/* SOBRE MÍ */}
          <h2
            className={`
              mb-14
              text-sm md:text-base
              tracking-[0.35em]
              uppercase
              text-neutral-500
              font-[var(--font-serif)]
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
            `}
            style={{ transitionDelay: "120ms" }}
          >
            {data.title}
          </h2>

          {/* CARTA */}
          <article
            className={`
              w-full
              max-w-5xl
              bg-white
              p-12
              border
              border-neutral-300
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
            style={{ transitionDelay: "220ms" }}
          >
            <div
              className={`
                ${libreBaskerville.className}
                space-y-6
                text-[16.5px]
                leading-[1.9]
                text-neutral-800
              `}
            >


              {data.blocks.map((block, idx) => {
                const isFirst = idx === 0;

                return (
                  <p
                    key={idx}
                    className={[
                      isFirst
                        ? "font-[var(--font-serif)] text-lg leading-8 text-neutral-800"
                        : "",
                      block.align === "right" ? "text-right" : "",
                    ].join(" ")}
                    style={{
                      marginTop: block.spacingTop || undefined,
                    }}
                  >
                    {Array.isArray(block.text)
                      ? block.text.map((seg, i) => (
                          <span
                            key={i}
                            className={[
                              seg.bold ? "font-semibold text-neutral-900" : "",
                              seg.italic ? `${signatureFont.className} text-[40px] tracking-wide` : "",
                            ].join(" ")}
                          >
                            {seg.t}
                          </span>
                        ))
                      : block.text}
                  </p>
                );
                })}

            </div>
          </article>
        </Container>
      </div>
    </section>
  );
}

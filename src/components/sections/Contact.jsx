"use client";

import { useEffect, useRef, useState } from "react";
import Container from "../layout/Container";

export default function Contact({ data }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contacto"
      ref={ref}
      className={`py-24 scroll-mt-24 bg-gradient-to-b from-white to-neutral-100 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <Container className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{data.title}</h2>
        <p className="mt-3 opacity-80">{data.subtitle}</p>
        <div className="mt-8">
          <a href={data.button.href} className="inline-flex rounded-md bg-black px-6 py-3 text-white hover:opacity-90">
            {data.button.label}
          </a>
        </div>
      </Container>
    </section>
  );
}


"use client";

import { useEffect, useState } from "react";
import { BLOG_POSTS } from "@/content/blogPosts";
import BlogCard from "@/components/BlogCard";

export default function BlogPage() {
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
  const darkAlpha = Math.min(0.6, 0.33 + scrollY / 1400);

  return (
    <main className="min-h-screen bg-stone-200">
      <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <img
          src="/images/blog_ramon.jpg"
          alt="Blog"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "center 20%",
            transform: `translateY(${imgOffset}px) ${mounted ? "scale(1.05)" : "scale(1)"
              }`,
            transition: "transform 1600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${darkAlpha})` }}
        />

        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${gradOffset}px)`,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.22), rgba(0,0,0,0.00))",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-14">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
              Blog
            </h1>
            <p className="mt-4 max-w-2xl text-white/85">
              <strong className="text-white">Explora nuestro blog.</strong>
              <br />
              Encuentra análisis, herramientas y reflexiones orientadas al
              crecimiento profesional.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
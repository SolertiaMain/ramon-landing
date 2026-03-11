"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/content/blogPosts";
import { libreBaskerville } from "@/app/layout";

export default function BlogPostPage({ params }) {
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

    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
    const post = BLOG_POSTS.find((item) => item.slug === slug);

    if (!post) {
        notFound();
    }

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
                        transition: "transform 1600ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                />

                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-14">
                    <div
                        className={`max-w-3xl transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                            }`}
                    >
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

            <section className="mx-auto max-w-5xl px-6 py-12">
                <div
                    className={`transition-all duration-700 ease-out delay-100 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        }`}
                >
                    <Link
                        href="/blog"
                        className="group inline-flex items-center rounded-full border border-black px-4 py-2 text-sm font-medium !text-black transition-all duration-150 ease-out hover:bg-black/5"
                    >
                        <span className="mr-2 transition-transform group-hover:-translate-x-1">
                            ←
                        </span>
                        Volver al blog
                    </Link>
                </div>

                <article
                    className={`mt-6 border border-neutral-300 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ease-out delay-150 ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                        }`}
                    style={{
                        backgroundColor: "#f8f5ef",
                        backgroundImage: `
                            linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(0,0,0,0.02)),
                            radial-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
                            radial-gradient(rgba(0,0,0,0.015) 1px, transparent 1px)
                            `,
                        backgroundSize: "auto, 6px 6px, 8px 8px",
                        backgroundPosition: "0 0, 0 0, 3px 3px",
                        boxShadow:
                            "0 15px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
                    }}
                >
                    <header className="border-b border-black/10 pb-8">
                        <h2 className="text-xl md:text-3xl font-semibold tracking-tight text-neutral-900 leading-snug text-center">
                            {post.title}
                        </h2>

                        <div className="mt-8 text-right text-sm text-neutral-700">
                            <p className="font-medium text-neutral-900">{post.author}</p>
                            {post.credentials?.map((line, index) => (
                                <p key={index} className="mt-1">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </header>

                    <div
                        className={`${libreBaskerville.className} mt-10 text-[16.5px] leading-[1.9] text-neutral-800 text-justify`}
                    >
                        {post.body.map((block, index) => {
                            if (block.type === "heading") {
                                return (
                                    <h3
                                        key={index}
                                        className="mt-10 mb-4 text-[1.05rem] font-semibold leading-snug text-neutral-900"
                                    >
                                        {block.text}
                                    </h3>
                                );
                            }

                            return (
                                <p key={index} className="mb-5 text-justify">
                                    {Array.isArray(block.text)
                                        ? block.text.map((part, i) => {
                                            if (typeof part === "string") return part;

                                            if (part.footnote) {
                                                return (
                                                    <sup
                                                        key={i}
                                                        className="ml-[1px] text-[0.65em] font-medium align-super"
                                                    >
                                                        {part.footnote}
                                                    </sup>
                                                );
                                            }

                                            return null;
                                        })
                                        : block.text}
                                </p>
                            );
                        })}

                        {post.footnotes?.length ? (
                            <div className="mt-12 border-t border-black/10 pt-6 text-[13px] leading-[1.7] text-neutral-600">
                                {post.footnotes.map((note, index) => (
                                    <p key={index} className="mb-3">
                                        <sup>{index + 1}</sup> {note}
                                    </p>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </article>
            </section>
        </main>
    );
}
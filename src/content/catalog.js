// src/content/catalog.js

import { BLOG_POSTS } from "@/content/blogPosts";
import { TALLERES } from "@/content/talleres";
import { CERTIFICATIONS } from "@/content/certifications";

function stripHtml(value) {
    return String(value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function blogBodyToText(body = []) {
    return body
        .map((block) => {
            if (!block) return "";
            if (typeof block.text === "string") return stripHtml(block.text);
            return "";
        })
        .filter(Boolean)
        .join(" ");
}

export const BLOG_ITEMS = BLOG_POSTS.map((post) => ({
    id: post.slug,
    title: post.title,
    subtitle: post.author || "Blog",
    description: post.excerpt || "",
    href: `/blog/${post.slug}`,
    section: "blog",
    keywords: [
        post.author,
        ...(post.credentials || []),
        post.place,
        post.date,
    ].filter(Boolean),
    bodyText: blogBodyToText(post.body),
}));

export const TALLERES_ITEMS = TALLERES.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle || item.metaLeft || "Taller",
    description: item.description || "",
    href: `/talleres#${item.id}`,
    pdfHref: item.href,
    section: "talleres",
    keywords: item.keywords || [],
    bodyText: [item.badge, item.metaLeft, item.duration].filter(Boolean).join(" "),
}));

export const CERTIFICATION_ITEMS = CERTIFICATIONS.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle || "Certificación",
    description: item.description || "",
    href: `/certifications#${item.id}`,
    pdfHref: item.href,
    section: "certificaciones",
    keywords: item.keywords || [],
    bodyText: "",
}));

export const PODCAST_PAGE = {
    id: "podcast",
    title: "Podcast",
    subtitle: "Escucha el podcast",
    description:
        "Accede al podcast en Spotify o Amazon Music desde la página oficial.",
    href: "/podcast",
    section: "podcast",
    keywords: ["spotify", "amazon music", "podcast", "ramón cuevas martínez"],
    bodyText: "",
};
/**
 * SEARCH_INDEX
 *
 * Central searchable dataset.
 *
 * Combines navigation items and content catalog
 * into a unified structure consumed by useHeaderSearch.
 *
 * Pure data layer.
 */

import { site } from "@/content/site";
import { BLOG_ITEMS, PODCAST_ITEMS, TALLERES_ITEMS, CERTS } from "@/content/catalog";

export const SEARCH_INDEX = [
    // Top-level nav is searchable
    ...site.nav.map((n) => ({
        id: `nav:${n.href}`,
        title: n.label,
        href: n.href,
        type: "Sección",
    })),

    // Certifications (PDFs)
    ...CERTS.map((c) => ({
        id: `cert:${c.id}`,
        title: c.title,         // short title for bins
        subtitle: c.subtitle,   // optional, for later UI
        href: c.href,
        type: "Certificación",
    })),

    // Blog
    ...BLOG_ITEMS.map((b) => ({
        id: `blog:${b.id}`,
        title: b.title,
        href: b.href,
        type: "Blog",
    })),

    // Podcast
    ...PODCAST_ITEMS.map((p) => ({
        id: `podcast:${p.id}`,
        title: p.title,
        href: p.href,
        type: "Podcast",
    })),

    // Talleres
    ...TALLERES_ITEMS.map((t) => ({
        id: `taller:${t.id}`,
        title: t.title,
        href: t.href,
        type: "Taller",
    })),
];

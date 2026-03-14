// src/content/searchIndex.js

import { site } from "@/content/site";
import {
    BLOG_ITEMS,
    TALLERES_ITEMS,
    CERTIFICATION_ITEMS,
    PODCAST_PAGE,
} from "@/content/catalog";

function makeSearchableText(parts) {
    return parts
        .flat()
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
}

function normalizeKey(value) {
    return String(value ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

const CONTENT_ITEMS = [
    ...CERTIFICATION_ITEMS.map((item) => ({
        ...item,
        id: `cert:${item.id}`,
        type: "Certificación",
    })),
    ...TALLERES_ITEMS.map((item) => ({
        ...item,
        id: `taller:${item.id}`,
        type: "Taller",
    })),
    ...BLOG_ITEMS.map((item) => ({
        ...item,
        id: `blog:${item.id}`,
        type: "Blog",
    })),
    {
        ...PODCAST_PAGE,
        id: "podcast:page",
        type: "Podcast",
    },
];

const contentHrefSet = new Set(CONTENT_ITEMS.map((item) => normalizeKey(item.href)));

const NAV_ITEMS = site.nav
    .filter((n) => !contentHrefSet.has(normalizeKey(n.href)))
    .map((n) => ({
        id: `nav:${n.href}`,
        title: n.label,
        subtitle: "Sección del sitio",
        description: "",
        href: n.href,
        type: "Sección",
        section: "nav",
        keywords: [n.label],
        bodyText: "",
    }));

const ALL_ITEMS = [...NAV_ITEMS, ...CONTENT_ITEMS];

export const SEARCH_INDEX = ALL_ITEMS.map((item) => ({
    ...item,
    searchableText: makeSearchableText([
        item.title,
        item.subtitle,
        item.description,
        item.type,
        item.section,
        item.keywords,
        item.bodyText,
    ]),
}));
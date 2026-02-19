/**
 * Content Catalog
 *
 * Central source of truth for site content metadata:
 * - Blog posts
 * - Podcast episodes
 * - Talleres
 * - Certifications
 *
 * Used by pages and search system.
 */

import pdfManifest from "@/content/generated/pdfs.json";

export const BLOG_ITEMS = [
    { 
        id: "Reforma a la Ley Federal del Trabajo",
        title: "Reforma a la Ley Federal del Trabajo",
        subtitle: "Prevencion y eliminación de la violencia laboral hacia las mujeres",
        href: "/files/blogs/reformaLFT.pdf" },
];

export const PODCAST_ITEMS = [
    { id: "episodio-01", title: "Episodio 01", href: "/podcast#episodio-01" },
    { id: "episodio-02", title: "Episodio 02", href: "/podcast#episodio-02" },
];

export const TALLERES_ITEMS = [
    { id: "taller-1", title: "Taller 1", href: "/talleres#taller-1" },
    { id: "taller-2", title: "Taller 2", href: "/talleres#taller-2" },
];

export const CERTS = pdfManifest.certs;


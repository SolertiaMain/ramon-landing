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

export const CERTS = [
    {
        id: "igualdad-consultoria",
        title: "Igualdad laboral (Consultoría)",
        subtitle: "Consultoras y Consultores en Prácticas de Igualdad Laboral y No Discriminación",
        href: "/files/certificaciones/CERTIFICACIÓNDECONSULTORASYCONSULTORESENPRÁCTICASDEIGUALDADLABORALYNODISCRIMINACIÓN.pdf",
    },
    {
        id: "gbr",
        title: "Gestión por resultados",
        subtitle: "Consultoras y Consultores en Gestión basada en Resultados",
        href: "/files/certificaciones/CERTIFICACIÓNDECONSULTORASYCONSULTORESENGESTIÓNYPRESUPUESTACIÓNBASADAENRESULTADOS.pdf",
    },
    {
        id: "igualdad-acreditacion",
        title: "Igualdad laboral (Acreditación)",
        subtitle: "Gestión y Acreditación Corporativa de Prácticas de Igualdad Laboral y No Discriminación",
        href: "/files/certificaciones/CERTIFICACIÓNDEPERSONASQUEREALIZANLAIMPLEMENTACIÓNYEVALUACIÓNCORPORATIVADEPRÁCTICASDEIGUALDADLABORALYNODISCRIMINACIÓN.pdf",
    },
    {
        id: "ombudsperson",
        title: "Ombudsperson",
        subtitle: "Certificación de Ombudsperson",
        href: "/files/certificaciones/CERTIFICACIÓNPARAPERSONASOMBUDSPERSON.pdf",
    },
];

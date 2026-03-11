// Copy this object, paste it into BLOG_POSTS, and fill in the fields.

export const BLOG_POST_TEMPLATE = {
    // URL slug for the article page: /blog/your-slug-here
    slug: "nombre-del-articulo",

    // Full article title
    title: "Título completo del artículo",

    // Short summary used on the blog card
    excerpt: "Resumen breve del artículo para mostrar en la tarjeta.",

    // Author name
    author: "Nombre del autor",

    // Credentials shown under the author, aligned to the right
    credentials: [
        "Primera línea de credenciales",
        "Segunda línea de credenciales",
    ],

    // Optional metadata kept for consistency
    date: "15 de enero de 2026",
    place: "Ciudad de México",

    // Main article content
    body: [
        // Section heading inside the article
        {
            type: "heading",
            text: "Subtítulo o pregunta dentro del artículo",
        },

        // Regular paragraph
        {
            type: "paragraph",
            text: "Texto normal del párrafo.",
        },

        // Paragraph with a footnote marker
        {
            type: "paragraph",
            text: [
                "Texto del párrafo antes de la nota",
                { footnote: 1 },
                ".",
            ],
        },
    ],

    // Footnotes shown at the bottom of the article
    footnotes: [
        "Texto de la nota 1.",
        "Texto de la nota 2.",
    ],
};
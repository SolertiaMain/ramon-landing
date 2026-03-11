import Link from "next/link";

export default function BlogCard({ post }) {
    return (
        <article className="rounded-[28px] border border-black/10 bg-[#f8f5ef] px-8 py-9 md:px-10 md:py-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1">
            <div className="max-w-3xl">
                <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
                    Blog
                </p>

                <h2 className="mt-4 text-2xl md:text-[2rem] font-semibold leading-[1.18] text-neutral-900">
                    {post.title}
                </h2>

                <p className="mt-5 text-[1.02rem] leading-[1.75] text-neutral-700">
                    {post.excerpt}
                </p>

                <div className="mt-6 border-t border-black/10 pt-5 text-sm text-neutral-600">
                    <p className="font-medium text-neutral-800">{post.author}</p>
                    <p className="mt-1">
                        {post.place} · {post.date}
                    </p>
                </div>

                <div className="mt-6">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="group inline-flex items-center justify-center rounded-full border border-black px-6 py-3 text-sm font-medium !text-black transition-all duration-150 ease-out hover:bg-black/5"
                    >
                        Leer artículo
                        <span className="ml-2.5 transition-transform duration-200 ease-out group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
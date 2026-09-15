import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Figtree } from "next/font/google";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { ALL_POSTS } from "@/lib/blogData";

const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const GOLD = "#B08D3F";
const GOLD_DEEP = "#8A6B2E";
const CREAM = "#FBF8F2";
const NAVY = "#0F1C2E";
const LINE = "#E8DFCB";

export function generateStaticParams() {
  return ALL_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = ALL_POSTS.find((p) => p.slug === slug);
  if (!post) return notFound();

  const related = ALL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className={figtree.className}>
      {/* Top nav / back */}
      <section className="max-w-[760px] mx-auto px-5 sm:px-6 pt-10 sm:pt-16">
        {/* <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-8 group"
          style={{ color: GOLD_DEEP }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Blogs
        </Link> */}

        <span
          className="text-xs font-bold tracking-[0.15em]"
          style={{ color: GOLD_DEEP }}
        >
          {post.category}
        </span>

        <h1
          className="mt-4 text-[28px] sm:text-[38px] md:text-[44px] font-bold leading-[1.15]"
          style={{ color: NAVY }}
        >
          {post.title}
        </h1>

        <div
          className="flex items-center gap-5 text-sm text-neutral-500 mt-6 pb-8 border-b"
          style={{ borderColor: LINE }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          )}
        </div>
      </section>

      {/* Cover image */}
      {/* <section className="max-w-[900px] mx-auto px-5 sm:px-6 mt-8">
        <div className="relative w-full h-[220px] sm:h-[340px] md:h-[420px] rounded-2xl overflow-hidden">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" />
        </div>
      </section> */}

      {/* Body */}
      <section className="max-w-[760px] mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <p className="text-lg leading-relaxed text-neutral-700 mb-6">{post.excerpt}</p>
        <div
          className="prose prose-neutral max-w-none text-[15px] leading-relaxed text-neutral-700"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-[1000px] mx-auto px-5 sm:px-6 pb-20">
          <h3 className="text-lg font-bold mb-6" style={{ color: NAVY }}>
            More from the journal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blogs/${r.slug}`}
                className="group rounded-2xl border bg-white overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                style={{ borderColor: LINE }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold tracking-wide" style={{ color: GOLD_DEEP }}>
                    {r.category}
                  </span>
                  <h4 className="mt-2 font-bold leading-snug" style={{ color: NAVY }}>
                    {r.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
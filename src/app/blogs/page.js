// src/app/blogs/page.js
'use client'

import { useRef } from "react";
import Link from "next/link";
import { Figtree } from "next/font/google";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { ALL_POSTS } from "@/lib/blogData";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

const CREAM = "#FBF8F2";
const GOLD_DEEP = "#8A6B2E";
const NAVY = "#0F1C2E";
const LINE = "#E8DFCB";

export default function BlogsPage() {
  const root = useRef(null);

  return (
    <main ref={root} className={figtree.className} style={{ backgroundColor: CREAM }}>
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[780px] flex overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 mt-3 sm:mx-4 sm:mt-4 md:mx-8 md:mt-8">
          <div
            className="hero-img flex-[1.7] relative bg-cover bg-center mr-23"
            style={{ backgroundImage: `url(/blogs.png)` }}
          />
        </div>
      </section>

      {/* Blog Cards */}
      <section className="w-full px-4 mt-10 pb-16 sm:px-6 sm:mt-14 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BlogCard({ post }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="rounded-2xl border bg-white overflow-hidden flex flex-col group cursor-pointer transition-shadow hover:shadow-md"
      style={{ borderColor: LINE }}
    >
      <div className="relative h-[200px] overflow-hidden sm:h-[190px] xl:h-[210px]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span
          className="inline-block text-[11px] font-semibold uppercase tracking-wide rounded-full px-3 py-1 mb-3 w-fit"
          style={{ backgroundColor: "#F3ECDA", color: GOLD_DEEP }}
        >
          {post.category}
        </span>
        <h3 className="text-base font-bold leading-snug mb-2" style={{ color: NAVY }}>
          {post.title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1">
          {post.excerpt}
        </p>
        <div
          className="flex items-center justify-between gap-2 mt-auto pt-3 border-t flex-wrap"
          style={{ borderColor: LINE }}
        >
          <div className="flex items-center gap-3 text-xs text-neutral-400 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
          <span
            className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#8A6B2E]"
            style={{ borderColor: GOLD_DEEP }}
          >
            <ArrowRight
              className="w-3.5 h-3.5 transition-colors group-hover:text-white"
              style={{ color: GOLD_DEEP }}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
// src/app/blogs/page.js
'use client'

import { useState, useMemo, useRef } from "react";
import { Figtree } from "next/font/google";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Grid3x3,
  Home,
  TrendingUp,
  LineChart,
  Lightbulb,
  Users,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

const CREAM = "#FBF8F2";
const GOLD = "#B08D3F";
const GOLD_DEEP = "#8A6B2E";
const NAVY = "#0F1C2E";
const LINE = "#E8DFCB";

const CATEGORIES = [
  { key: "all", label: "All", icon: Grid3x3 },
  { key: "buying-guide", label: "Buying Guide", icon: Home },
  { key: "investment", label: "Investment", icon: TrendingUp },
  { key: "market-trends", label: "Market Trends", icon: LineChart },
  { key: "home-inspiration", label: "Home Inspiration", icon: Lightbulb },
  { key: "community", label: "Community", icon: Users },
];

const POSTS = [
  {
    id: 1,
    category: "buying-guide",
    categoryLabel: "Buying Guide",
    title: "10 Things to Consider Before Buying Your First Home",
    excerpt:
      "Buying your first home is a big milestone. Here's a comprehensive guide to help you make the right choice.",
    date: "Aug 25, 2025",
    readTime: "5 min read",
    image: "/blogs/first-home.jpg",
  },
  {
    id: 2,
    category: "home-inspiration",
    categoryLabel: "Home Inspiration",
    title: "Modern Home Interior Trends for 2025",
    excerpt:
      "From minimalist designs to multi-functional spaces, explore the top interior trends shaping modern homes this year.",
    date: "Aug 18, 2025",
    readTime: "6 min read",
    image: "/blogs/interior-trends.jpg",
  },
  {
    id: 3,
    category: "investment",
    categoryLabel: "Investment",
    title: "Why Real Estate Continues to Be a Smart Investment",
    excerpt:
      "Despite market fluctuations, real estate remains one of the most reliable wealth-building options. Here's why.",
    date: "Aug 10, 2025",
    readTime: "4 min read",
    image: "/blogs/investment.jpg",
  },
  {
    id: 4,
    category: "community",
    categoryLabel: "Community",
    title: "The Importance of Gated Communities in Modern Living",
    excerpt:
      "Safety, amenities, and a better quality of life — discover why gated communities are driving today's real estate demand.",
    date: "Aug 05, 2025",
    readTime: "4 min read",
    image: "/blogs/gated-community.jpg",
  },
  {
    id: 5,
    category: "market-trends",
    categoryLabel: "Market Trends",
    title: "Chennai's Real Estate Growth: Key Areas to Watch",
    excerpt:
      "From OMR to ECR, explore the top micro-markets in Chennai that are seeing strong growth and opportunities.",
    date: "Jul 28, 2025",
    readTime: "5 min read",
    image: "/blogs/chennai-growth.jpg",
  },
  {
    id: 6,
    category: "home-inspiration",
    categoryLabel: "Lifestyle",
    title: "How the Right Home Improves Your Family's Well-Being",
    excerpt:
      "A thoughtfully designed home can positively impact your family's health, happiness, and lifestyle.",
    date: "Jul 20, 2025",
    readTime: "4 min read",
    image: "/blogs/family-wellbeing.jpg",
  },
  {
    id: 7,
    category: "buying-guide",
    categoryLabel: "Buying Guide",
    title: "Home Loan Basics: A Simple Guide for Homebuyers",
    excerpt:
      "Understand interest rates, tenure, eligibility and more to make informed decisions about your home loan.",
    date: "Jul 15, 2025",
    readTime: "6 min read",
    image: "/blogs/home-loan.jpg",
  },
  {
    id: 8,
    category: "investment",
    categoryLabel: "Sustainability",
    title: "Sustainable Living: The Future of Real Estate",
    excerpt:
      "Eco-friendly homes are not just a trend, but a responsibility. Discover how sustainable design is shaping tomorrow.",
    date: "Jul 08, 2025",
    readTime: "5 min read",
    image: "/blogs/sustainable-living.jpg",
  },
  {
    id: 9,
    category: "market-trends",
    categoryLabel: "Development",
    title: "Upcoming Infrastructure Projects in Chennai",
    excerpt:
      "New metro lines, expressways and business hubs are set to transform the city. Here's what to expect.",
    date: "Jul 01, 2025",
    readTime: "4 min read",
    image: "/blogs/infrastructure.jpg",
  },
];

const FEATURED_POST = {
  categoryLabel: "Market Trends",
  title: "The Next Wave of Real Estate Growth in Chennai",
  excerpt:
    "Explore the key factors, upcoming developments, and opportunities shaping Chennai's real estate market in 2025 and beyond.",
  date: "Sep 01, 2025",
  readTime: "6 min read",
  image: "/blogs/featured-growth.jpg",
};

const POPULAR_POSTS = [
  { title: "10 Things to Consider Before Buying Your First Home", date: "Aug 25, 2025", image: "/blogs/first-home.jpg" },
  { title: "Modern Home Interior Trends for 2025", date: "Aug 18, 2025", image: "/blogs/interior-trends.jpg" },
  { title: "Why Real Estate Continues to Be a Smart Investment", date: "Aug 10, 2025", image: "/blogs/investment.jpg" },
  { title: "Chennai's Real Estate Growth: Key Areas to Watch", date: "Jul 28, 2025", image: "/blogs/chennai-growth.jpg" },
];

export default function BlogsPage() {
  const root = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return POSTS.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main ref={root} className={figtree.className}>
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative w-full h-[220px] sm:h-[300px]  md:h-[420px] lg:h-[780px] flex overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 mt-3 sm:mx-4 sm:mt-4 md:mx-8 md:mt-8">
          <div
            className="hero-img flex-[1.7] relative bg-cover bg-center mr-10"
            style={{ backgroundImage: `url(/blogs.png)` }}
          >
          </div>
        </div>
      </section>

      {/* Filter + Search Bar */}
      <section className="w-full px-4 mt-8 sm:px-6 sm:mt-10 md:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex items-center gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:gap-6 sm:-mx-0 sm:px-0 sm:pb-1 lg:pb-0"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setCurrentPage(1);
                  }}
                  className="flex items-center gap-1.5 text-[13px] font-medium whitespace-nowrap pb-2 relative shrink-0 transition-colors sm:gap-2 sm:text-sm"
                  style={{ color: isActive ? GOLD_DEEP : "#6B7280" }}
                >
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  {cat.label}
                  {isActive && (
                    <span
                      className="absolute left-0 -bottom-[1px] h-[2px] w-full"
                      style={{ backgroundColor: GOLD_DEEP }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            className="flex items-center gap-3 rounded-full border bg-white px-4 py-2.5 w-full shrink-0 sm:px-5 sm:py-3 lg:w-[320px]"
            style={{ borderColor: LINE }}
          >
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics..."
              className="text-sm bg-transparent outline-none w-full min-w-0 placeholder:text-neutral-400"
              style={{ color: NAVY }}
            />
          </div>
        </div>
      </section>

      {/* Main content: Grid + Sidebar */}
      <section className="w-full px-4 mt-8 pb-12 sm:px-6 md:px-8 lg:px-16 lg:pb-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]">
          {/* Blog Grid */}
          <div className="min-w-0">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 text-neutral-400 text-sm">
                No articles found matching your search.
              </div>
            )}

            {/* Pagination */}
            <div className="flex flex-col items-center gap-4 mt-10 sm:flex-row sm:justify-between sm:flex-wrap">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-neutral-50 transition-colors shrink-0 sm:w-9 sm:h-9"
                  style={{ borderColor: LINE }}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" style={{ color: NAVY }} />
                </button>

                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors shrink-0 sm:w-9 sm:h-9"
                    style={{
                      backgroundColor: currentPage === page ? GOLD_DEEP : "transparent",
                      color: currentPage === page ? "#fff" : NAVY,
                      border: currentPage === page ? "none" : `1px solid ${LINE}`,
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-neutral-50 transition-colors shrink-0 sm:w-9 sm:h-9"
                  style={{ borderColor: LINE }}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" style={{ color: NAVY }} />
                </button>
              </div>

              <span className="text-sm text-neutral-500">Showing 1–9 of 42 articles</span>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            {/* Featured Post */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: GOLD_DEEP }}>
                Featured Post
              </h3>
              <div className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: LINE }}>
                <div className="relative h-[180px] sm:h-[160px]">
                  <img
                    src={FEATURED_POST.image}
                    alt={FEATURED_POST.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <span
                    className="inline-block text-[11px] font-semibold uppercase tracking-wide rounded-full px-3 py-1 mb-3"
                    style={{ backgroundColor: "#F3ECDA", color: GOLD_DEEP }}
                  >
                    {FEATURED_POST.categoryLabel}
                  </span>
                  <h4 className="text-base font-bold leading-snug mb-2" style={{ color: NAVY }}>
                    {FEATURED_POST.title}
                  </h4>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    {FEATURED_POST.excerpt}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-xs text-neutral-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {FEATURED_POST.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {FEATURED_POST.readTime}
                      </span>
                    </div>
                    <button
                      className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
                      style={{ borderColor: GOLD_DEEP }}
                    >
                      <ArrowRight className="w-3.5 h-3.5" style={{ color: GOLD_DEEP }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Posts */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: GOLD_DEEP }}>
                Popular Posts
              </h3>
              <div className="flex flex-col gap-4">
                {POPULAR_POSTS.map((post, i) => (
                  <div key={i} className="flex items-start gap-3 group cursor-pointer">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <h5
                        className="text-sm font-semibold leading-snug group-hover:underline"
                        style={{ color: NAVY }}
                      >
                        {post.title}
                      </h5>
                      <span className="flex items-center gap-1 text-xs text-neutral-400 mt-1.5">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ backgroundColor: "#F3ECDA" }}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD_DEEP }}>
                Stay Updated
              </span>
              <h4 className="text-xl font-bold leading-snug mt-2 mb-3" style={{ color: NAVY }}>
                Subscribe to Our Newsletter
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                Get the latest articles, market insights and project updates delivered to your inbox.
              </p>

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-lg border px-4 py-3 text-sm bg-white outline-none mb-3 placeholder:text-neutral-400"
                style={{ borderColor: LINE, color: NAVY }}
              />

              <button
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: GOLD_DEEP }}
              >
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function BlogCard({ post }) {
  return (
    <div
      className="rounded-2xl border bg-white overflow-hidden flex flex-col group cursor-pointer transition-shadow hover:shadow-md"
      style={{ borderColor: LINE }}
    >
      <div className="relative h-[200px] overflow-hidden sm:h-[180px] xl:h-[190px]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-1 sm:p-5">
        <span
          className="inline-block text-[11px] font-semibold uppercase tracking-wide rounded-full px-3 py-1 mb-3 w-fit"
          style={{ backgroundColor: "#F3ECDA", color: GOLD_DEEP }}
        >
          {post.categoryLabel}
        </span>
        <h3 className="text-base font-bold leading-snug mb-2" style={{ color: NAVY }}>
          {post.title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t flex-wrap" style={{ borderColor: LINE }}>
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
          <button
            className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#8A6B2E]"
            style={{ borderColor: GOLD_DEEP }}
          >
            <ArrowRight
              className="w-3.5 h-3.5 transition-colors group-hover:text-white"
              style={{ color: GOLD_DEEP }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
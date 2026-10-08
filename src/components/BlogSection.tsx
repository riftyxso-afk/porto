import React from "react";
import Image from "next/image";
import { blogPosts } from "@/data/portfolioData";
import { SectionHeader } from "./SectionDivider";
import { ArrowRight } from "lucide-react";

export function BlogSection() {
  return (
    <section className="w-full relative">
      <SectionHeader title="Blog" count={blogPosts.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
        {blogPosts.map((post, idx) => (
          <article
            key={post.id}
            className={`p-4 flex flex-col gap-3 group relative ${
              idx >= 2 ? "border-t border-zinc-200 dark:border-zinc-800" : ""
            }`}
          >
            {/* Real blog thumbnail mockup */}
            <div className="w-full h-44 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 overflow-hidden relative shadow-2xs group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-white p-4 text-center">
                  {post.title}
                </div>
              )}
            </div>

            {/* Post details */}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 pt-1 text-xs text-zinc-400 dark:text-zinc-500">
                <span>{post.date}</span>
                <span>•</span>
                <span className="font-mono">{post.tags.join(", ")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* All posts button */}
      <div className="w-full p-4 flex justify-center border-t border-zinc-200 dark:border-zinc-800">
        <a
          href="https://imsandip.in/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-colors cursor-pointer"
        >
          <span>All posts</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}

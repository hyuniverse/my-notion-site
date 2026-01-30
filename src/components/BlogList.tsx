"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList = ({ posts }: BlogListProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="writing"
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-24 py-24 md:py-32"
    >
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-12 h-px bg-border" />
          <h2 className="text-muted text-sm tracking-widest uppercase">Writing</h2>
        </div>

        <ul className="space-y-0">
          {posts.map((post, index) => (
            <li
              key={post.id}
              className={`group border-b border-border transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link
                href={`/blog/${post.id}`}
                className="flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-2 md:gap-8 hover:pl-4 transition-all duration-300"
              >
                <div className="flex-1">
                  <h3 className="text-foreground text-lg md:text-xl font-normal group-hover:text-muted-foreground transition-colors duration-300">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-muted text-sm mt-1 line-clamp-1">
                      {post.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {post.tags && post.tags.length > 0 && (
                    <div className="hidden md:flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground bg-white/5 backdrop-blur-sm px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <time className="text-muted text-sm font-mono shrink-0">
                    {post.date}
                  </time>
                  <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    &rarr;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {posts.length === 0 && (
          <p className="text-muted text-center py-12">
            No posts yet. Check back soon!
          </p>
        )}

        <div className="mt-12">
          <Link
            href="/blog"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2"
          >
            View all writing
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogList;

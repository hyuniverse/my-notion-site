import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import { getPosts } from "@/lib/notion";

export const metadata = {
  title: "Writing - Park Sehyun",
  description: "Thoughts on design, development, and building for the web.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <SmoothScroll>
      <Nav />
      <main className="pt-24 pb-16">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl">
            {/* Header */}
            <header className="mb-16">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
              >
                <span>&larr;</span>
                Home
              </Link>
              <h1 className="text-4xl md:text-5xl text-foreground mb-4">Writing</h1>
              <p className="text-muted-foreground text-lg">
                Infrequent thoughts on design and code.
              </p>
            </header>

            {/* Posts list */}
            <ul className="space-y-0">
              {posts.map((post) => (
                <li key={post.id} className="group border-b border-border">
                  <Link
                    href={`/blog/${post.id}`}
                    className="flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-2 md:gap-8 hover:pl-4 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h2 className="text-foreground text-lg md:text-xl font-normal group-hover:text-muted-foreground transition-colors duration-300">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="text-muted text-sm mt-1 line-clamp-2">
                          {post.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {post.tags && post.tags.length > 0 && (
                        <div className="hidden md:flex gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-muted bg-secondary px-2 py-1 rounded"
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
          </div>
        </div>
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}

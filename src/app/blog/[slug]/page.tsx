import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostPage, getPostMeta } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getPostMeta(slug);

  if (!meta) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${meta.title} - Park Sehyun`,
    description: meta.description || `Read ${meta.title} on Park Sehyun's blog`,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const [recordMap, meta] = await Promise.all([
      getPostPage(slug),
      getPostMeta(slug),
    ]);

    if (!recordMap || !meta) {
      notFound();
    }

    return (
      <SmoothScroll>
        <Nav />
        <main className="pt-24 pb-16">
          <article className="px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
              {/* Back link */}
              <Link
                href="/#writing"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
              >
                <span>&larr;</span>
                Back to writing
              </Link>

              {/* Header */}
              <header className="mb-12">
                <time className="text-muted text-sm font-mono">{meta.date}</time>
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-tight">
                  {meta.title}
                </h1>
                {meta.tags && meta.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <NotionRenderer recordMap={recordMap} />
              </div>
            </div>
          </article>
        </main>
        <SiteFooter />
      </SmoothScroll>
    );
  } catch (error) {
    console.error("[v0] Error loading blog post:", error);
    notFound();
  }
}

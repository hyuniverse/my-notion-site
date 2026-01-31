import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostPage, getPosts } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find(p => p.id === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Park Sehyun`,
    description: post.description || `Read ${post.title} on Park Sehyun's blog`,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // Get post info from the list
  const posts = await getPosts();
  const post = posts.find(p => p.id === slug);

  if (!post) {
    notFound();
  }

  // Try to get Notion page content
  let recordMap = null;
  let hasContent = false;
  
  // post.id가 바로 페이지 ID이므로 이를 사용
  try {
    console.log('[DEBUG] Attempting to get page content for pageId:', post.id);
    recordMap = await getPostPage(post.id);
    hasContent = true;
    console.log('[DEBUG] Successfully loaded page content');
  } catch (error) {
    console.error('[DEBUG] Error loading page content:', error);
    hasContent = false;
  }

  return (
    <SmoothScroll>
      <Nav />
      <main className="pt-24 pb-16">
        <article className="px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
            >
              <span>&larr;</span>
              Back to writing
            </Link>

            {/* Header */}
            <header className="mb-12">
              <time className="text-muted text-sm font-mono">{post.date}</time>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-tight">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {post.description}
                </p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
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
              {hasContent && recordMap ? (
                <NotionRenderer recordMap={recordMap} />
              ) : (
                <div className="text-muted-foreground">
                  <p>Unable to load article content.</p>
                  <p>This might be because the article is still being processed or the page doesn't exist as a full Notion page.</p>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}

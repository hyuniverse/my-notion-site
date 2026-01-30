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
  
  // Check if this is a mock post
  if (slug.startsWith("mock-")) {
    return <MockPostPage slug={slug} />;
  }

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

// Mock post component for demo purposes
function MockPostPage({ slug }: { slug: string }) {
  const mockPosts: Record<string, { title: string; date: string; content: string; tags: string[] }> = {
    "mock-1": {
      title: "Building Interactive Web Experiences",
      date: "2025-01-30",
      content: `
        <p>Creating engaging web experiences requires a deep understanding of both design principles and technical implementation. In this post, I'll share some techniques I've learned for building interactive interfaces that delight users.</p>
        
        <h2>The Power of Micro-interactions</h2>
        <p>Micro-interactions are subtle animations and feedback mechanisms that make interfaces feel alive. They can be as simple as a button hover effect or as complex as a drag-and-drop interface.</p>
        
        <h2>Performance Matters</h2>
        <p>No matter how beautiful your animations are, they need to run smoothly. Always prioritize performance by using CSS transforms, requestAnimationFrame, and proper optimization techniques.</p>
        
        <h2>Accessibility First</h2>
        <p>Interactive elements should be accessible to all users. This means providing proper focus states, respecting reduced motion preferences, and ensuring keyboard navigation works seamlessly.</p>
      `,
      tags: ["React", "Animation"],
    },
    "mock-2": {
      title: "The Art of Clean Code",
      date: "2025-01-25",
      content: `
        <p>Writing clean code is an art form that takes years to master. It's not just about making code work—it's about making code that others can understand, maintain, and build upon.</p>
        
        <h2>Naming Things</h2>
        <p>One of the hardest problems in computer science is naming things. Good names reveal intent and make code self-documenting.</p>
        
        <h2>Single Responsibility</h2>
        <p>Each function, each class, each module should have one reason to change. This principle keeps code focused and maintainable.</p>
        
        <h2>Refactoring is Continuous</h2>
        <p>Clean code doesn't happen in one go. It's a continuous process of improvement, guided by tests and a commitment to quality.</p>
      `,
      tags: ["TypeScript", "Best Practices"],
    },
    "mock-3": {
      title: "Next.js App Router Deep Dive",
      date: "2025-01-20",
      content: `
        <p>The App Router in Next.js represents a paradigm shift in how we build React applications. Let's explore its key features and best practices.</p>
        
        <h2>Server Components by Default</h2>
        <p>In the App Router, components are server components by default. This means better performance, smaller client bundles, and direct database access.</p>
        
        <h2>Layouts and Templates</h2>
        <p>The new routing system introduces layouts that persist across navigations and templates that re-render on every navigation.</p>
        
        <h2>Streaming and Suspense</h2>
        <p>Next.js 16 fully embraces React's streaming capabilities, allowing you to progressively render UI as data becomes available.</p>
      `,
      tags: ["Next.js"],
    },
  };

  const post = mockPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <SmoothScroll>
      <Nav />
      <main className="pt-24 pb-16">
        <article className="px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/#writing"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
            >
              <span>&larr;</span>
              Back to writing
            </Link>

            <header className="mb-12">
              <time className="text-muted text-sm font-mono">{post.date}</time>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-tight">
                {post.title}
              </h1>
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
            </header>

            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-normal
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
                prose-strong:text-foreground
                prose-code:text-foreground prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-card prose-pre:border prose-pre:border-border"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}

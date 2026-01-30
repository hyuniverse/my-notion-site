import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import NotionRenderer from "@/components/NotionRenderer";
import { getPostPage, getProjects } from "@/lib/notion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find(p => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Park Sehyun`,
    description: project.description || `View ${project.title} project details`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Get project info from the list
  const projects = await getProjects();
  const project = projects.find(p => p.id === slug);

  if (!project) {
    notFound();
  }

  // Try to get Notion page content if it's a real Notion page
  let recordMap = null;
  try {
    if (!slug.startsWith('project-')) {
      recordMap = await getPostPage(slug);
    }
  } catch (error) {
    console.log('No detailed content available for this project');
  }

  return (
    <SmoothScroll>
      <Nav />
      <main className="pt-24 pb-16">
        <article className="px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
            >
              <span>&larr;</span>
              Back to projects
            </Link>

            {/* Header */}
            <header className="mb-12">
              <time className="text-muted text-sm font-mono">{project.date}</time>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {project.description}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  View Project
                  <span>&rarr;</span>
                </a>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {recordMap ? (
                <NotionRenderer recordMap={recordMap} />
              ) : (
                <div className="text-muted-foreground">
                  <p>This project doesn't have additional detailed content.</p>
                  {project.link && (
                    <p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground underline"
                      >
                        Visit the project
                      </a>{" "}
                      to see it in action.
                    </p>
                  )}
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
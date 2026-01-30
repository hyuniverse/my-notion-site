import Link from "next/link";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import { getProjects } from "@/lib/notion";

export const metadata = {
  title: "Projects - Park Sehyun",
  description: "A collection of projects I've worked on.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

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
              <h1 className="text-4xl md:text-5xl text-foreground mb-4">Projects</h1>
              <p className="text-muted-foreground text-lg">
                A collection of projects I've worked on.
              </p>
            </header>

            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group p-6 glass-light rounded-lg hover:bg-white/10 transition-all duration-500"
                >
                  <Link href={`/projects/${project.id}`} className="block">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-foreground text-xl font-normal group-hover:text-muted-foreground transition-colors duration-300">
                        {project.title}
                      </h2>
                      <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        &rarr;
                      </span>
                    </div>
                    <time className="text-muted text-sm font-mono mb-3 block">
                      {project.date}
                    </time>
                    <p className="text-muted text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground bg-white/10 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
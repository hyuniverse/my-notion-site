"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  link?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Portfolio",
    description: "Implementing interfaces and interactions.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Tech Blog",
    description: "Thoughts on design and development.",
    tags: ["Notion API", "MDX"],
  },
];

const Projects = () => {
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
      id="projects"
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-24 py-24 md:py-32 bg-card/50"
    >
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-12 h-px bg-border" />
          <h2 className="text-muted text-sm tracking-widest uppercase">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group p-6 border border-border rounded-lg hover:border-muted-foreground transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {project.link ? (
                <Link href={project.link} className="block">
                  <ProjectContent project={project} />
                </Link>
              ) : (
                <ProjectContent project={project} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectContent = ({ project }: { project: Project }) => (
  <>
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-foreground text-lg font-normal group-hover:text-muted-foreground transition-colors duration-300">
        {project.title}
      </h3>
      {project.link && (
        <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          &nearr;
        </span>
      )}
    </div>
    <p className="text-muted text-sm mb-4">{project.description}</p>
    <div className="flex flex-wrap gap-2">
      {project.tags.map((tag) => (
        <span
          key={tag}
          className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
        >
          {tag}
        </span>
      ))}
    </div>
  </>
);

export default Projects;

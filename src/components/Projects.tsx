"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/notion";

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
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
      className="px-6 md:px-12 lg:px-24 py-24 md:py-32 glass"
    >
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-12 h-px bg-border" />
          <h2 className="text-muted text-sm tracking-widest uppercase">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group p-6 glass-light rounded-lg hover:bg-white/10 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Link href={`/projects/${project.id}`} className="block">
                <ProjectContent project={project} />
              </Link>
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
      <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        &rarr;
      </span>
    </div>
    <p className="text-muted text-sm mb-4">{project.description}</p>
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
  </>
);

export default Projects;

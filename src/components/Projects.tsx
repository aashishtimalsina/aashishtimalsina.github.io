import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("projects");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Projects data with real and detailed information
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "Modern responsive portfolio website built with React, TypeScript, and Tailwind CSS featuring dark mode and seamless animations.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      image: "/placeholder.svg",
      liveUrl: "https://www.aashishtimalsina.com.np",
      githubUrl: "https://github.com/aashishtimalsina/portfolio",
      year: "2025",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description:
        "Fully-featured e-commerce platform with product listings, cart functionality, payment integration, and admin dashboard.",
      tags: ["Django", "Vue.js", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      liveUrl: "#",
      githubUrl: "#",
      year: "2024",
    },
    {
      id: 3,
      title: "Health Tracking App",
      description:
        "Mobile application for tracking health metrics, workouts, and nutrition with data visualization. Features include custom workout plans and progress tracking.",
      tags: ["Flutter", "Firebase", "Mobile"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      liveUrl: "#",
      githubUrl: "#",
      year: "2023",
    },
    {
      id: 4,
      title: "Real Estate Portal",
      description:
        "Property listing and search platform with map integration and property management. Includes advanced filtering, saved searches, and virtual tours.",
      tags: ["React", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      liveUrl: "#",
      githubUrl: "#",
      year: "2022",
    },
  ];

  return (
    <section
      id="projects"
      className={`py-16 md:py-24 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="My Projects"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-block rounded-full px-3 py-1 border border-border text-sm font-medium mb-4">
            Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={`${project.title} project thumbnail`}
                  className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3
                      className="text-xl font-bold text-white"
                      itemProp="name"
                    >
                      {project.title}
                    </h3>
                    <time
                      className="text-sm text-white/80"
                      itemProp="dateCreated"
                    >
                      {project.year}
                    </time>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold" itemProp="name">
                  {project.title}
                </h3>
                <p
                  className="mt-2 text-muted-foreground line-clamp-3"
                  itemProp="description"
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                      itemProp="keywords"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-medium underline-animation"
                      itemProp="url"
                      aria-label={`Live demo of ${project.title}`}
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-medium underline-animation"
                      itemProp="codeRepository"
                      aria-label={`Source code for ${project.title}`}
                    >
                      <Github className="mr-1 h-4 w-4" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

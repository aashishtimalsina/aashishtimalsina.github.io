
import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with product management, cart, checkout, and payment integration.',
      tags: ['Laravel', 'React', 'MySQL', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'CRM System',
      description: 'Customer relationship management system with dashboards, contact management, and sales tracking.',
      tags: ['Django', 'Vue.js', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'Health Tracking App',
      description: 'Mobile application for tracking health metrics, workouts, and nutrition with data visualization.',
      tags: ['Flutter', 'Firebase', 'Mobile'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 4,
      title: 'Real Estate Portal',
      description: 'Property listing and search platform with map integration and property management.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  // Extract all unique tags from projects
  const allCategories = ['All', ...Array.from(new Set(projects.flatMap(project => project.tags)))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.tags.includes(selectedCategory));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding container-padding bg-secondary/30 opacity-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block rounded-full px-3 py-1 border border-border text-sm font-medium mb-4">
            My Projects
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
            Featured Work
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-accent"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group rounded-xl overflow-hidden border border-border bg-card transition-all hover:shadow-lg"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 image-loading"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.classList.remove('image-loading');
                    img.classList.add('image-loaded');
                  }}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
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
                    >
                      <Github className="mr-1 h-4 w-4" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

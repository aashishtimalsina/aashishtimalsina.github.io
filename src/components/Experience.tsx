import React, { useState, useEffect, useRef } from "react";
import { Briefcase, MapPin } from "lucide-react";

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  location: string;
}

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Minimal experience data
  const experiences: Experience[] = [
    {
      id: 1,
      role: "Senior Full Stack Developer",
      company: "Tech Innovators",
      period: "2022 - Present",
      description: "Building enterprise web apps & leading development teams",
      technologies: ["React", "Laravel", "AWS"],
      location: "Kathmandu, Nepal",
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "Digital Solutions",
      period: "2020 - 2022",
      description: "Developed scalable web applications for diverse clients",
      technologies: ["Python", "Vue.js", "APIs"],
      location: "Kathmandu, Nepal",
    },
    {
      id: 3,
      role: "Web Developer",
      company: "Freelance",
      period: "2019 - 2020",
      description: "Custom websites & WordPress solutions for businesses",
      technologies: ["PHP", "JavaScript", "WordPress"],
      location: "Remote",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
      id="experience"
      ref={sectionRef}
      className="py-16 md:py-20 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            My Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line - Only show on larger screens */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-border"></div>

            {/* Experience Items */}
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Timeline Dot - Only show on larger screens */}
                  <div className="hidden md:block absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-sm"></div>

                  {/* Content Card */}
                  <div className="md:ml-20 bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-primary font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground font-medium bg-muted px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

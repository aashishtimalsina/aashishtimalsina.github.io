
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Sample experience data
  const experiences: Experience[] = [
    {
      id: 1,
      role: 'Senior Full Stack Developer',
      company: 'Tech Innovators',
      period: '2022 - Present',
      description: [
        'Led development of enterprise-level web applications using Laravel and React',
        'Implemented CI/CD pipelines reducing deployment time by 40%',
        'Mentored junior developers and conducted code reviews',
        'Optimized database queries resulting in 30% performance improvement'
      ],
      technologies: ['Laravel', 'React', 'AWS', 'Docker', 'CI/CD']
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Digital Solutions',
      period: '2020 - 2022',
      description: [
        'Developed and maintained multiple client projects using Django and Vue.js',
        'Implemented RESTful APIs for mobile application integration',
        'Collaborated with design team to create responsive user interfaces',
        'Participated in agile development processes and sprint planning'
      ],
      technologies: ['Django', 'Vue.js', 'Python', 'JavaScript', 'RESTful APIs']
    },
    {
      id: 3,
      role: 'Junior Developer',
      company: 'Web Creations',
      period: '2019 - 2020',
      description: [
        'Assisted in the development of responsive websites for clients',
        'Built custom WordPress themes and plugins',
        'Fixed bugs and implemented new features in existing applications',
        'Participated in client meetings and requirement gathering'
      ],
      technologies: ['PHP', 'JavaScript', 'WordPress', 'HTML/CSS']
    },
  ];

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
      id="experience"
      ref={sectionRef}
      className="section-padding container-padding opacity-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block rounded-full px-3 py-1 border border-border text-sm font-medium mb-4">
            Experience
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
            Professional Journey
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-muted"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={cn(
                  "relative flex flex-col md:flex-row",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                
                {/* Content */}
                <div className={cn(
                  "ml-8 md:ml-0 md:w-[calc(50%-32px)]",
                  index % 2 === 0 ? "md:ml-auto md:mr-12" : "md:mr-auto md:ml-12"
                )}>
                  <div className="glassmorphism rounded-xl p-6 transition-all hover:shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <h3 className="font-display font-semibold text-xl">{exp.role}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <span className="inline-block rounded-full px-3 py-1 border border-border text-sm font-medium mt-2 md:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

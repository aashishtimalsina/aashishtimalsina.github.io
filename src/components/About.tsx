
import React, { useEffect, useRef } from 'react';
import { Code, Server, Layout, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

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

  const skills = [
    {
      category: 'Frontend',
      icon: <Layout className="h-6 w-6" />,
      skills: ['React', 'Vue.js', 'JavaScript/TypeScript', 'HTML/CSS', 'Tailwind CSS', 'SCSS'],
    },
    {
      category: 'Backend',
      icon: <Server className="h-6 w-6" />,
      skills: ['Laravel', 'Django', 'Fast API', 'Node.js', 'PHP', 'MySQL', 'PostgreSQL'],
    },
    {
      category: 'Mobile',
      icon: <Smartphone className="h-6 w-6" />,
      skills: ['Flutter', 'React Native', 'iOS', 'Android'],
    },
    {
      category: 'Others',
      icon: <Code className="h-6 w-6" />,
      skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'RESTful APIs', 'GraphQL'],
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding container-padding opacity-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block rounded-full px-3 py-1 border border-border text-sm font-medium mb-4">
            About Me
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
            My Journey & Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg">
              I'm Aashish Timalsina, a passionate Full Stack Developer with 4 years of experience 
              crafting web and mobile solutions. Based in Banepa, Nepal, I specialize in building 
              applications that combine elegant interfaces with powerful functionality.
            </p>
            <p>
              My journey in software development has led me through various technologies and 
              frameworks, allowing me to develop a versatile skill set across the entire development 
              stack. I'm particularly experienced in Laravel, React, Python, and mobile development.
            </p>
            <p>
              Currently, I'm focused on expanding my expertise in Flutter, Rust, and Fast API 
              while continuing to perfect my skills in my core technologies.
            </p>
            <p>
              When I'm not coding, you'll find me hiking and exploring new places, which helps 
              me maintain a fresh perspective and creative approach to problem-solving.
            </p>
            <div className="pt-4">
              <a 
                href="#contact" 
                className="animated-border-button inline-flex items-center text-primary font-medium"
              >
                Let's Connect
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skillGroup, index) => (
              <div 
                key={skillGroup.category} 
                className={cn(
                  "glassmorphism rounded-xl p-6 transition-all hover:shadow-lg",
                  "opacity-0 animate-fade-in",
                  { "animation-delay-300": index === 1 || index === 3 },
                  { "animation-delay-150": index === 2 || index === 0 }
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-secondary mr-3">
                    {skillGroup.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg">{skillGroup.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skillGroup.skills.map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

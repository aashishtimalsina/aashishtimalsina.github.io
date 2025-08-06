import React, { useState, useEffect } from "react";
import { Code, Database, Smartphone, CheckCircle } from "lucide-react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Frontend Development",
      description: "React, TypeScript, Tailwind CSS",
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "Backend Development",
      description: "Laravel, Node.js, Python, APIs",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Mobile Development",
      description: "Flutter, React Native",
    },
  ];

  const techStack = [
    "React",
    "Laravel",
    "Python",
    "JavaScript",
    "TypeScript",
    "Flutter",
  ];

  return (
    <section
      id="about"
      className={`py-20 bg-muted/30 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Full Stack Developer with 4+ years of experience building scalable
              web and mobile applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                I'm <strong>Aashish Timalsina</strong>, a passionate Full Stack
                Developer based in Kathmandu, Nepal. I specialize in creating
                modern web and mobile applications that combine great user
                experience with robust functionality.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech) => (
                  <div key={tech} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="bg-card border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    {skill.icon}
                    <div>
                      <h3 className="font-semibold mb-2">{skill.title}</h3>
                      <p className="text-muted-foreground">
                        {skill.description}
                      </p>
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
}

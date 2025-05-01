import React, { useEffect, useState } from "react";
import { CheckCircle, Code, Database, Layout } from "lucide-react";

export default function About() {
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

    const section = document.getElementById("about");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Skills with detailed descriptions for better SEO
  const skills = [
    {
      icon: <Layout className="h-10 w-10 mb-4 text-primary" />,
      title: "Frontend Development",
      description:
        "Building responsive, accessible, and performant user interfaces using React, TypeScript, and modern CSS frameworks like Tailwind CSS.",
    },
    {
      icon: <Database className="h-10 w-10 mb-4 text-primary" />,
      title: "Backend Development",
      description:
        "Creating scalable and secure server-side applications with Node.js, Laravel, Django, and RESTful API design practices.",
    },
    {
      icon: <Code className="h-10 w-10 mb-4 text-primary" />,
      title: "Mobile Development",
      description:
        "Developing cross-platform mobile applications using Flutter, React Native, and native Android development with Kotlin.",
    },
  ];

  return (
    <section
      id="about"
      className={`py-16 md:py-24 bg-muted/50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-block rounded-full px-3 py-1 border border-border text-sm font-medium mb-4">
            About Me
          </div>
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl font-display font-bold text-center"
            itemProp="name"
          >
            My Journey & Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" itemProp="mainContentOfPage">
            <p className="text-lg">
              I'm{" "}
              <span itemProp="about">
                Aashish Timalsina, a passionate Full Stack Developer with 4
                years of experience crafting web and mobile solutions. Based in
                Banepa, Nepal, I specialize in building applications that
                combine elegant interfaces with powerful functionality.
              </span>
            </p>
            <p>
              My journey in software development has led me through various
              technologies and frameworks, allowing me to develop a versatile
              skill set across the entire development stack. I'm particularly
              experienced in Laravel, React, Python, and mobile development.
            </p>
            <p>
              Beyond coding, I value clean architecture, performance
              optimization, and accessible design. I believe in creating
              solutions that not only work flawlessly but are also maintainable
              and scalable for future growth.
            </p>
            <div className="pt-4">
              <ul className="grid grid-cols-2 gap-x-2 gap-y-3">
                {[
                  "JavaScript/TypeScript",
                  "React.js",
                  "Node.js",
                  "Laravel",
                  "Python",
                  "Flutter",
                ].map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center"
                    itemProp="knowsAbout"
                  >
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6">
                Core Areas of Expertise
              </h3>
              <div className="space-y-8">
                {skills.map((skill, index) => (
                  <div key={index} itemProp="specialty">
                    <div className="flex flex-col items-center md:items-start">
                      {skill.icon}
                      <h4 className="text-lg font-medium mb-2" itemProp="name">
                        {skill.title}
                      </h4>
                      <p
                        className="text-muted-foreground text-center md:text-left"
                        itemProp="description"
                      >
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

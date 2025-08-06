import React, { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, Twitter, MapPin } from "lucide-react";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the hero section with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <span itemProp="jobTitle">Full Stack Developer</span>
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Hi, I'm{" "}
                <span className="text-primary" itemProp="name">
                  Aashish Timalsina
                </span>
              </h1>
              <p
                className="text-xl md:text-2xl text-muted-foreground mb-2"
                itemProp="description"
              >
                Building modern web & mobile solutions
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
                <MapPin className="h-4 w-4" />
                <span itemProp="addressLocality">Kathmandu, Nepal</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Get in Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/aashishtimalsina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub Profile"
                itemProp="sameAs"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/AashishTimalina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter Profile"
                itemProp="sameAs"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/aashishtimalsina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
                itemProp="sameAs"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Hidden structured data */}
          <div className="sr-only">
            <meta
              itemProp="url"
              content="https://www.aashishtimalsina.com.np"
            />
            <meta itemProp="addressRegion" content="Bagmati" />
            <meta itemProp="addressCountry" content="Nepal" />
            <span itemProp="knowsAbout">React</span>
            <span itemProp="knowsAbout">Laravel</span>
            <span itemProp="knowsAbout">Python</span>
            <span itemProp="knowsAbout">JavaScript</span>
            <span itemProp="knowsAbout">TypeScript</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

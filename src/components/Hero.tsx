import React, { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";

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
      id="hero"
      className="min-h-screen flex items-center py-16"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="inline-block rounded-full px-3 py-1 bg-primary/10 text-primary text-sm font-medium">
              <span itemProp="jobTitle">Full Stack Developer</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Hi, I'm{" "}
              <span className="text-primary" itemProp="name">
                Aashish Timalsina
              </span>
            </h1>
            <p className="text-xl text-muted-foreground" itemProp="description">
              I build exceptional digital experiences that are fast, accessible,
              and visually appealing. Specializing in modern web and mobile
              development with a focus on performance and usability.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                Contact Me
              </a>
            </div>
            <div className="pt-4 flex items-center gap-4">
              <a
                href="https://github.com/aashishtimalsina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Visit Aashish's GitHub profile"
                itemProp="sameAs"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/AashishTimalina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Visit Aashish's Twitter profile"
                itemProp="sameAs"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/aashishtimalsina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Visit Aashish's LinkedIn profile"
                itemProp="sameAs"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <meta
                itemProp="url"
                content="https://www.aashishtimalsina.com.np"
              />
              <meta itemProp="addressLocality" content="Banepa" />
              <meta itemProp="addressRegion" content="Nepal" />
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-700 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 p-2">
              <div className="w-full h-full rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src="https://avatars.githubusercontent.com/u/55835332"
                  alt="Aashish Timalsina - Full Stack Developer"
                  className="w-full h-full object-cover object-center"
                  itemProp="image"
                  loading="eager"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full grid place-items-center text-primary-foreground">
              <div className="text-center">
                <div className="text-xl font-bold">4+</div>
                <div className="text-xs">Years Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

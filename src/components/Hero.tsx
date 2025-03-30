
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-28 container-padding"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className={cn(
            'space-y-6 opacity-0',
            isLoaded && 'animate-fade-in'
          )}>
            <div className="inline-block rounded-full px-3 py-1 border border-border bg-background/50 text-sm font-medium">
              Full Stack Developer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Crafting Digital <br />
              <span className="text-primary">Experiences</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              I specialize in Laravel, React, Python, and Mobile Development, with 4 years of experience building elegant applications that solve real-world problems.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-input bg-background hover:bg-accent transition-colors font-medium"
              >
                Contact Me
              </a>
            </div>
            <div className="pt-6">
              <p className="text-sm text-muted-foreground">
                Currently open to freelance opportunities and collaboration
              </p>
            </div>
          </div>
          
          <div className={cn(
            'relative mx-auto opacity-0',
            isLoaded && 'animate-fade-in-delayed'
          )}>
            <div className="bg-gradient-to-tr from-secondary/50 to-background absolute inset-0 rounded-2xl -rotate-6"></div>
            <div className="bg-gradient-to-bl from-muted/50 to-background absolute inset-0 rounded-2xl rotate-3"></div>
            <div className="relative overflow-hidden rounded-xl border border-border shadow-lg bg-card">
              <img
                src="/lovable-uploads/96d7a9a4-ba3f-41dd-802f-7a4ec378beeb.png"
                alt="Aashish Timalsina"
                className="w-full object-cover aspect-[4/3]"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.classList.remove('image-loading');
                  img.classList.add('image-loaded');
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/10 backdrop-blur-xs"></div>
              <div className="absolute inset-0 flex items-end p-6">
                <div className="glassmorphism rounded-lg p-4 max-w-xs">
                  <p className="text-base font-medium">
                    "I believe great software is a perfect balance of performance, design, and user experience."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

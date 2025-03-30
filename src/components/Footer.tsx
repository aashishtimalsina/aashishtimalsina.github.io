
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-12 container-padding bg-card border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-display font-medium mb-2">Aashish Timalsina</h3>
            <p className="text-muted-foreground">Full Stack Developer</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Aashish Timalsina. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

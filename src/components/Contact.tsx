import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

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

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, label: 'Email', value: 'tm.aashish1@gmail.com', href: 'mailto:tm.aashish1@gmail.com' },
    { icon: <Phone className="h-5 w-5" />, label: 'Phone', value: '+977 9848077880', href: 'tel:+9779848077880' },
    { icon: <MapPin className="h-5 w-5" />, label: 'Location', value: 'Banepa, Kavre, Nepal', href: 'https://maps.google.com/?q=Banepa,Kavre,Nepal' },
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: 'GitHub', href: 'https://github.com/aashishtimalsina' },
    { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aashish-timalsina-4b8156206/' },
    { icon: <FileText className="h-5 w-5" />, label: 'Medium', href: 'https://medium.com/@tm.aashish1' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding container-padding bg-secondary/30 opacity-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block rounded-full px-3 py-1 border border-border text-sm font-medium mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
            Let's Work Together
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-lg">
              I'm currently available for freelance work and exciting collaborations. 
              If you have a project that needs my expertise, or if you just want to 
              say hello, feel free to reach out!
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div>
              <h3 className="text-lg font-display font-semibold mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glassmorphism rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-display font-semibold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center items-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

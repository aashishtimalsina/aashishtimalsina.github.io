import { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
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

    const section = document.getElementById("contact");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <section
      id="contact"
      className={`py-16 md:py-24 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-block rounded-full px-3 py-1 border border-border text-sm font-medium mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
            Contact Me
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you. Feel free to reach out using the form below or
            through my contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div
              className="flex items-start space-x-4"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground mt-1">
                  <span itemProp="addressLocality">Banepa</span>,
                  <span itemProp="addressRegion">Nepal</span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <a
                  href="mailto:contact@aashishtimalsina.com.np"
                  className="text-muted-foreground hover:text-primary transition-colors mt-1 block"
                  itemProp="email"
                >
                  contact@aashishtimalsina.com.np
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <a
                  href="tel:+9779841234567"
                  className="text-muted-foreground hover:text-primary transition-colors mt-1 block"
                  itemProp="telephone"
                >
                  +977-9841234567
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-lg p-6 shadow-sm"
              itemProp="potentialAction"
              itemScope
              itemType="https://schema.org/CommunicateAction"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-required="true"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-required="true"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors hover:bg-primary/90"
                aria-label="Send message"
              >
                Send Message
              </button>
              <meta itemProp="name" content="Contact Aashish Timalsina" />
              <meta itemProp="object" content="Contact Inquiry" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

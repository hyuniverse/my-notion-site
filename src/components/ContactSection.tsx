"use client";

import { useRef, useEffect, useState } from "react";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-24 py-24 md:py-32"
    >
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-12 h-px bg-border" />
          <h2 className="text-muted text-sm tracking-widest uppercase">Contact</h2>
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-foreground text-2xl md:text-3xl leading-relaxed mb-12">
            If you would like to discuss a project or just say hi, I&apos;m always down to chat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-muted text-sm tracking-widest uppercase mb-4">Email</h3>
              <a
                href="mailto:hyuniverse12@gmail.com"
                className="text-foreground hover:text-muted-foreground transition-colors duration-300 inline-flex items-center gap-2"
              >
                hyuniverse12@gmail.com
                <span className="text-muted-foreground">&rarr;</span>
              </a>
            </div>

            <div>
              <h3 className="text-muted text-sm tracking-widest uppercase mb-4">Social</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/hyuniverse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-muted-foreground transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    GitHub
                    <span className="text-muted-foreground">&rarr;</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://hyuniverse.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-muted-foreground transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    Blog
                    <span className="text-muted-foreground">&rarr;</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

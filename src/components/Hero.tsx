"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !titleRef.current) return;
      const scrollY = window.scrollY;
      const parallaxSpeed = 0.3;
      titleRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
      titleRef.current.style.opacity = `${1 - scrollY / 600}`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 relative"
    >
      <div ref={titleRef} className="max-w-4xl">
        <p className="text-muted-foreground text-sm md:text-base mb-4 tracking-wide">
          Good evening
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl leading-relaxed text-foreground mb-8 font-sans">
          <span className="font-serif italic text-muted-foreground">Crafting interfaces.</span>{" "}
          Building polished software and web experiences. Experimenting with magical details in
          user interfaces.
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mb-8">
          I&apos;m a developer passionate about creating accessible, pixel-perfect digital
          experiences that blend thoughtful design with robust engineering.
        </p>
        <div className="flex gap-6">
          <Link
            href="#writing"
            className="text-foreground border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-300"
          >
            Read my writing
          </Link>
          <Link
            href="#projects"
            className="text-muted-foreground border-b border-transparent pb-1 hover:border-muted-foreground transition-colors duration-300"
          >
            View projects
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-6 md:left-12 lg:left-24">
        <div className="flex flex-col items-center gap-2">
          <span className="text-muted text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-border relative overflow-hidden">
            <div className="w-full h-4 bg-muted-foreground animate-scroll-down absolute" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
